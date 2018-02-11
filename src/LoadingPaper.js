import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';

import {Card} from 'material-ui/Card';
let style = {
  position:'relative',
  width:'100%',
  height:'100%'
};
const iconStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };

let  LoadingPaper = (props) => {
      const {isLoading, Target} = props;
      if(isLoading){
          return (
            <Card  style={style}>
                <CircularProgress style={iconStyle}/>
            </Card>
          );
      }
      return (
        <Target {...props}/>
      )
    };

LoadingPaper.propTypes = {
  isLoading: PropTypes.bool,
  Target: PropTypes.element
};

export default LoadingPaper;
