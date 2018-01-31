import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
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

let  LoadingPaper = (Target) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {isLoading: false};
    }
    notLoading = () => {
        this.setState({isLoading: false});
    };
    isLoading = () => {
        this.setState({isLoading: true});
    };
    render(){
      if(this.state.isLoading){
          return (
            <Card  style={style}>
                <CircularProgress style={iconStyle}/>
            </Card>
          );
      }
      return (
        <Target {...this.props}
                         isLoading={this.state.isLoading}
                         notLoading={this.notLoading}
                         loading={this.isLoading}/>
      );
    }
  }
};
export default LoadingPaper;
