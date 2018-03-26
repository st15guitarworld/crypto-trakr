import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import AddCurrencyPairDialog from './AddCurrencyPairDialog';
import LoadingPaper from './LoadingPaper';
import {ListItem,List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PullToRefresh from './PullToRefresh';
import {refreshAllFavoriteCoinPairs,setSelectedFavoriteCoinPair,updateCoinPairFull} from './actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import _ from "underscore";
import Hammer from 'hammerjs';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';
import CCC from "./ccc-streamer-utilities";
import TabBarNav from './TabBarNav';
import CryptoSubHelper from './CryptoSubHelper';

const addButtonStyle = {
  position:"fixed",
  bottom:"12%",
  right:"7%",
  zIndex:"10"
}
const mapStateToProps = (state,props) => {
  return {
    favoriteCoinPairs:state.favoriteCoinPairDetails.coinPairDetail,
    subs:CryptoSubHelper.generateSubsFromCoinDetails(state.favoriteCoinPairDetails.coinPairDetail),
    isLoading:state.allExchanges.isFetching && state.allCoins.isFetching
  };
}

const mapDispatchToProps = dispatch => {
  return {
    refreshFavsCoinPairs:() => dispatch(refreshAllFavoriteCoinPairs()),
    selectedFavoriteCoinPair:(id) => dispatch(setSelectedFavoriteCoinPair(id)),
    updateFavoriteCoinPair:(update) => dispatch(updateCoinPairFull(update))
  };
}

class FavoriteCoinPairInner extends Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading:false,
          distanceToRefresh: 70,
          resistance: 2.5,
          pan:{
            enabled: false,
            distance: 0,
            startingPositionY: 0
          }
      };
      this._panStart = this._panStart.bind(this);
      this._panUp = this._panUp.bind(this);
      this._panEnd = this._panEnd.bind(this);
      this._panDown = this._panDown.bind(this);
  }
  _panStart(e) {
    console.log("pan start");
    let newState = _.extend({},this.state);
    newState.pan.startingPositionY = document.body.scrollTop;
    this.setState(newState,()=>{
      if (this.state.pan.startingPositionY === 0 ) {
        let newState2 = _.extend({},this.state);
        newState2.isLoading = false;
        newState2.pan.enabled=true;
        this.setState(newState2);
    }});
  }
  _panUp(e){
    console.log("pan up");
      if ( ! this.state.pan.enabled || this.state.pan.distance === 0 ) {
      return;
    }

    e.preventDefault();
      let newState = _.extend({},this.state);
    if ( this.state.pan.distance < e.distance / this.state.resistance ) {
      newState.pan.distance=0;
      this.setState(newState);
    } else {
      newState.pan.distance=e.distance / this.state.resistance;
      this.setState(newState);
    }

  }
  componentWillUpdate(nextProps,nextState){
    if(this.contentElement.style["touchAction"]){
      return;
    }
    this.h = new Hammer(this.contentElement);
    this.h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );

    this.h.on( 'panstart', this._panStart );
    this.h.on( 'pandown', this._panDown );
    this.h.on( 'panup', this._panUp );
    this.h.on( 'panend', this._panEnd );
  }
  _panEnd(e){
    console.log("pan end");
    if ( ! this.state.pan.enabled ) {
    return;
  }

  e.preventDefault();
  let newState = _.extend({},this.state);
  if(this.state.pan.distance >= this.state.distanceToRefresh){
    newState.isLoading=true;
    this.setState(newState);
  }else{
    newState.pan.distance=0;
    newState.pan.enabled=false;
    this.setState(newState);
  }
  var that = this;
  let newState2 = _.extend({},this.state);
  newState2.isLoading = false;
  newState2.pan.distance=0;
  newState2.pan.enabled = false;
  this.props.refreshFavsCoinPairs().then(()=> that.setState(newState2));
  }

  _panDown(e){
    console.log("pan down");
      if ( ! this.state.pan.enabled ) {
      return;
      }
      e.preventDefault();
      let newState = _.extend({},this.state);
      newState.pan.distance = e.distance / this.state.resistance;
      this.setState(newState);
  }
  componentDidMount(){
    if(!this.h){
      this.h = new Hammer(this.contentElement);
      this.h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );

    this.h.on( 'panstart', this._panStart );
    this.h.on( 'pandown', this._panDown );
    this.h.on( 'panup', this._panUp );
    this.h.on( 'panend', this._panEnd );
    }
  }
  render(){
    const distance = this.state.pan.distance;
    const ptrElOffsetHeight = this.ptrElement ? this.ptrElement.offsetHeight : 0;
    const percentageofLoading = Math.min(distance/this.state.distanceToRefresh * 100,100);
  return (
    <div id="FavoriteCoinPairInner" style={this.props.style}>
      <div
        style={{
          WebkitTransform:"translate3d( 0,"+(distance - ptrElOffsetHeight)+ "px,0)",
          transition:!this.state.pan.enabled && this.state.pan.distance == 0 ? "all .25s ease" : "none",
          position: "absolute",
          top: "13px",
          left: "0",
          width: "100%",
          color: "#fff",
          zIndex: "10",
          textAlign: "center",
          height: "50px"
        }}>
          <RefreshIndicator
           percentage={percentageofLoading}
           size={40}
           left={10}
           top={0}
           status={this.state.isLoading ? "loading": "ready"}
           style={{ display: 'inline-block',
                    position: 'relative'}}
          />
          </div>
      <List
        ref={(content) => { this.contentElement = ReactDOM.findDOMNode(content); }}
        style={{
          WebkitTransform: this.state.isLoading ? "translate3d( 0, 50px, 0 )" : "translate3d( 0,"+ distance + "px,0)",
          transition:!this.state.enabled && this.state.pan.distance == 0 ? "all .25s ease" : "none"
        }}
        >
        {this.props.favoriteCoinPairs.map((pair,index)=>(
          <div key={index}>
          <ListItem key={pair.id} primaryText={pair.DISPLAY.PRICE} secondaryText={pair.RAW.FROMSYMBOL+" - "+ pair.RAW.TOSYMBOL + " "+ pair.RAW.MARKET}
            onClick={() => {
              this.props.selectedFavoriteCoinPair(pair.id).then(r => this.props.history.push("coinDetail", {fsym:pair.RAW.FROMSYMBOL,e:pair.RAW.MARKET,tsyms:pair.RAW.TOSYMBOL}))
            }}
          />
           <Divider />
         </div>
        ))}
      </List>
    </div>
  );
}
}

class FavoriteCoinPairContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogOpen:false
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  componentDidMount(){
    let that =this;
    if(that.props.subs.length > 0 && !that.socket){
      that.socket = openSocket('https://streamer.cryptocompare.com/');
      that.socket.on("m",(message) => that.props.updateFavoriteCoinPair(CCC.CURRENT.unpack(message)));
    }
  }
  componentWillUnmount(){
      if(this.socket){
          this.socket.emit('SubRemove', { subs: this.props.subs } );
          this.socket.disconnect();
          this.socket = undefined;
      }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.subs.length > prevProps.subs.length){
      this.socket.emit('SubRemove', { subs: prevProps.subs } );
      this.socket.emit('SubAdd', { subs: this.props.subs } );
    }
  }
  closeDialog() {
    this.setState({dialogOpen:false})
  }
  openDialog() {
    this.setState({dialogOpen:true})
  }
  render(){
    let favoriteCoinPairProps = {
      Target:FavoriteCoinPairInner,
      openDialog: this.openDialog,
      closeDialog:this.closeDialog,
      ...this.props
    }

    return  (
      <div>
    <AppBar title="Crypto-Trakr" className="favorite-coin-appbar" iconStyleRight={{
      margin:0
    }}>
    </AppBar>
    <LoadingPaper {...favoriteCoinPairProps}/>
    <FloatingActionButton style={addButtonStyle} onClick={() => this.props.history.push("addFavoriteCurrencyPair")}>
     <ContentAdd />
   </FloatingActionButton>
    <TabBarNav {...this.props}/>
    </div>
    );
  }
}
const CnctedFavoriteCoinPairContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteCoinPairContainer)
export default CnctedFavoriteCoinPairContainer;
