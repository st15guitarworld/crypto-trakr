import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import _ from 'underscore';

export default class PullToRefresh extends Component {
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
    let loadingPromise = this.props.LoadingFunc();
    loadingPromise.then(()=> that.setState(newState2));
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

    render(){
      const {ContentEl,contentElDomNode ,PtrEl,ptrElDomNode} = this.props;
      const distance = this.state.pan.distance;
      const ptrElOffsetHeight = this.ptrElement ? this.ptrElement.offsetHeight : 0;
      const percentageofLoading = Math.min(distance/this.state.distanceToRefresh * 100,100);
      return (
        <div className="refresh-pullable-container">
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
          <ContentEl
            {...this.props.neededProps}
            ref={(content) => { this.contentElement = ReactDOM.findDOMNode(content); }}
            style={{
              WebkitTransform: this.state.isLoading ? "translate3d( 0, 50px, 0 )" : "translate3d( 0,"+ distance + "px,0)",
              transition:!this.state.enabled && this.state.pan.distance == 0 ? "all .25s ease" : "none"
            }}
          />
        </div>
      )
    }
}


PullToRefresh.propTypes = {
  ContentEl: PropTypes.func,
  LoadingFunc:PropTypes.func
  };
