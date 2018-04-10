import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TabBarNav from './TabBarNav';
import {Tabs, Tab} from 'material-ui/Tabs';
import TopExchanges from "./TopExchanges";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class TopListsInner extends Component {
  render(){
    return (
      <Tabs>
  <Tab label="Exchanges" >
    <TopExchanges />
  </Tab>
  <Tab label="Pairs" >
    <div>
      <h2 style={styles.headline}>Tab Two</h2>
      <p>
        This is another example tab.
      </p>
    </div>
  </Tab>
  {/* <Tab
    label="Top Coins by Total Volume"
    data-route="/home"
    onActive={handleActive}
  >
    <div>
      <h2 style={styles.headline}>Tab Three</h2>
      <p>
        This is a third example tab.
      </p>
    </div>
  </Tab> */}
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
