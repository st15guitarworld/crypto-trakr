import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TabBarNav from './TabBarNav';
import {Tabs, Tab} from 'material-ui/Tabs';
import TopExchanges from "./TopExchanges";
import TopPairs from "./TopPairs";

class TopListsInner extends Component {
  render(){
    return (
      <Tabs>
  <Tab label="Exchanges" >
    <TopExchanges />
  </Tab>
  <Tab label="Pairs" >
    <TopPairs/>
  </Tab>
</Tabs>
    );
  }
}

export default class ToplistsContainer extends Component {
render(){
  return (
    <div>
      <AppBar title="TopLists" showMenuIconButton={false}/>
      <TopListsInner />
      <TabBarNav {...this.props}/>
    </div>
  );
}
}
