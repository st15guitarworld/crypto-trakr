import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import _ from "underscore";
import { connect } from 'react-redux';
import {removeFavoriteCoinPair} from './actions';
import Delete from 'material-ui/svg-icons/action/delete';

const deleteIconStyles = {
  color:"white",
  height:"30",
  width:"30",
  cursor:"pointer"
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem:(id) => dispatch(removeFavoriteCoinPair(id))
  };
}

class FavoriteCoinPairItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resistance: 2.2,
      openThreshold:-40,
      isOpen:false,
      openWidth:-70,
      pan:{
        enabled: false,
        distance: 0
      }
    }
    this.closeItem = this.closeItem.bind(this);
  }
  closeItem(){
    let newState = _.extend({},this.state);
    newState.isOpen = false;
    newState.pan.distance = 0;
    newState.pan.enabled = false;
    this.props.setChildPanning(false);
    this.setState(newState);
  }
  componentDidMount(){
    if(!this.h){
      this.h = new Hammer(this.contentElement);
      this.h.get( 'pan' ).set( { direction: Hammer.DIRECTION_HORIZONTAL } );

      this.h.on( 'panstart', (e) => {
        if(this.props.parentIsPanning && !this.state.pan.enabled) {
          this.props.setChildPanning(false);
          return;
        }
        this.props.setChildPanning(true);

        let newState2 = _.extend({},this.state);
        newState2.pan.enabled=true;
        this.setState(newState2);
      } );
     this.h.on( 'panleft', (e) => {
       if(!this.state.pan.enabled && this.props.parentIsPanning) {
         return;
       }
       let newState = _.extend({},this.state);
       newState.pan.distance = -(e.distance / this.state.resistance);
       this.setState(newState);
     } );

    this.h.on( 'panend', (e) => {
      let newState = _.extend({},this.state);
      if(this.state.pan.distance <= this.state.openThreshold) {
        newState.isOpen = true;
        newState.pan.distance = this.state.openWidth;
        newState.pan.enabled = true;
      }else {
        newState.isOpen = false;
        newState.pan.distance = 0;
        newState.pan.enabled = false;
      }
        this.setState(newState);
        this.props.setChildPanning(false);
    } );

     this.h.on( 'panright', (e) =>{
       if(this.props.parentIsPanning && !this.state.pan.enabled) {
         return;
       }
       let newState = _.extend({},this.state);
       if(this.state.isOpen){
          this.state.pan.distance+=e.distance / this.state.resistance;
       }else{
          newState.pan.distance = e.distance / this.state.resistance;
       }
       this.setState(newState);

     } );
    }
  }
  render(){
    let distance = this.state.pan.distance > 0 ? 0 : this.state.pan.distance;
    return (
      <div style={{
        position:"relative"
      }}>
      <ListItem primaryText={this.props.pair.DISPLAY.PRICE} secondaryText={this.props.pair.RAW.FROMSYMBOL+" - "+ this.props.pair.RAW.TOSYMBOL + " "+ this.props.pair.RAW.MARKET}
        ref={(content) => { this.contentElement = ReactDOM.findDOMNode(content); }}
        style={{
          position:"relative",
          WebkitTransform: "translate3d( "+ distance + "px,0,0)",
          transition:!this.state.pan.enabled && this.state.pan.distance == 0 ? "all .25s ease" : "none"
        }}
        onClick={() => {
          if(!this.state.pan.enabled){
              this.props.selectedFavoriteCoinPair(this.props.pair.id).then(r => this.props.history.push("coinDetail"))
          }
        }}

      >
      </ListItem>
      <div style={{
        height:"100%",
        width:-(distance) +"px",
        backgroundColor:"#F44336",
        position:"absolute",
        right:"0px",
        top:"0px",
        bottom:"0px",
        display:"flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Delete style={deleteIconStyles}
              onClick={() => {
                this.props.removeItem(this.props.pair.id)
              }}
      /></div>
       <Divider />
     </div>
    );
  }
}

const CnctedFavoriteCoinPairItem = connect(
  null,
  mapDispatchToProps
)(FavoriteCoinPairItem)
export default CnctedFavoriteCoinPairItem;
