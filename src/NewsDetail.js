import React,{ Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AppBar from 'material-ui/AppBar';
export default class NewsDetail extends Component {
  render(){
    return(
    <div style={{
      height:"100%",
      width:"100%"
    }}>
      <AppBar title="" iconElementLeft={<IconButton onClick={() => this.props.history.goBack() }><NavigationArrowBack /></IconButton>}>
      </AppBar>
      <iframe style={{
        height:"100%",
        width:"100%"
      }}
      src={this.props.location.state.url}></iframe>
    </div>
  )
  }
}
