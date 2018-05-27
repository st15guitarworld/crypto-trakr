import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

let style = {
  position:'absolute',
  width:'100%',
  height:'100%',
  zIndee
};
const iconStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };

let Loader = ({isLoading})=> {
    if(!isLoading){return null;}

    return (
      <Card  style={style}>
          <CircularProgress style={iconStyle}/>
      </Card>
    );
}
