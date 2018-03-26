import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TabBarNav from './TabBarNav';

export default class ToplistsContainer extends Component {
render(){
  return (
    <div>
      <AppBar title="TopLists"/>
      <TabBarNav {...this.props}/>
    </div>
  );
}
}
