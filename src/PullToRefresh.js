import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import RefreshIndicator from 'material-ui/RefreshIndicator';

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
      this.setState({pan:{startingPositionY: document.body.scrollTop}},()=>{
        if ( this.state.pan.startingPositionY === 0 ) {
          this.setState({isLoading:false,pan:{enabled: true}});
        }
      });
    }
    _panUp(e){
      console.log("pan up");
        if ( ! this.state.pan.enabled || this.state.pan.distance === 0 ) {
  			return;
  		}

  		e.preventDefault();

  		if ( this.state.pan.distance < e.distance / this.state.resistance ) {
  			this.setState({pan:{distance: 0,enabled:false}});
  		} else {
  			this.setState({pan:{distance: e.distance / this.state.resistance,enabled:true}});
  		}

    }
    _panEnd(e){
      console.log("pan end");
      if ( ! this.state.pan.enabled ) {
			return;
		}

		e.preventDefault();

    if(e.distance >= this.state.distanceToRefresh){
      this.setState({isLoading:true});
    }else{
      this.setState({pan:{distance:0,enabled:false}});
    }
    var that = this;
    let loadingPromise = this.props.LoadingFunc();
    loadingPromise.then(()=> that.setState({isLoading:false,pan:{distance:0,enabled:false}}));
    }

    _panDown(e){
      console.log("pan down");
        if ( ! this.state.pan.enabled ) {
  			return;
  		  }
        e.preventDefault();
        this.setState({pan:{distance: e.distance / this.state.resistance,enabled:true}});
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
      if(nextState.pan.enabled ||  this.state.pan.distance > 0){
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
              transform:"translate3d( 0,"+(distance - ptrElOffsetHeight)+ "px,0)",
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
              transform: this.state.isLoading ? "translate3d( 0, 50px, 0 )" : "translate3d( 0,"+ distance + "px,0)",
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
