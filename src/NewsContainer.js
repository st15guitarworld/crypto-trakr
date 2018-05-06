import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TabBarNav from './TabBarNav';

export default class NewsContainer extends Component {
render(){
  return (
    <div style={{
      height: document.body.scrollHeight - 120 + "px",
      overflow:"scroll"
    }}>
      <AppBar title="News" showMenuIconButton={false}/>
      <TabBarNav {...this.props}/>
    </div>
  );
}
}
