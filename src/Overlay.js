import React,{ Component } from 'react';
import PropTypes from 'prop-types';

let isOpen = true;
class Overlay extends Component {
  render(){
    return (
      <div style ={{
        backgroundColor: "rgba(0, 0, 0, 0.54)",
        position: "fixed",
        height: "100%",
        width: "100%";
        top: "0px",
        zIndex:"1200",
        left: this.props.isOpen ? "0px" : "-100%",
        opacity: this.props.isOpen ? "1" : "0" ,
        transition: this.props.isOpen ? "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms" : "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 400ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
        pointerEvents : this.props.isOpen ? "auto" : "none",
      }} onClick = {this.props.close} >
      </div>
    );
  }
}
Overlay.propTypes = = {
  isOpen: PropTypes.bool,
  close: PropTypes.function
};
