import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
class ScrollUp extends Component {
render(){
  return (
    <div  id ="filter" style ={{
      position : "fixed",
      width:"100%",
      height:"100%",
      zIndex:"1200",
      backgroundColor:"white",
      top: this.props.isOpen ? "0px" : "100%",
      transition: "all .6s cubic-bezier(0, 1, 0.5, 1)"
    }} >
    <Toolbar style={{
      backgroundColor:"white"
    }}>
        <ToolbarGroup firstChild={true}>
          <IconButton onClick = {this.props.close}><Close /></IconButton>
          <ToolbarTitle text={this.props.title}/>
        </ToolbarGroup>
    </Toolbar>
    {this.props.children}
    </div>
  );
}
}

ScrollUp.propTypes = {
  isOpen: PropTypes.bool,
  title:PropTypes.string,
  close: PropTypes.function
};
export default ScrollUp;
