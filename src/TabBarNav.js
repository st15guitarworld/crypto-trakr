import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionLanguage from 'material-ui/svg-icons/action/language';

export default class TabBarNav extends Component {
  render(){
    return(
    <Paper zDepth={1}>
    <BottomNavigation selectedIndex={0} style={{
      position:"fixed",
      bottom:"0px",
      width:"100%",
      left:"0px"
    }}>
      <BottomNavigationItem
        label="Favorite Pairs"
        icon={<ActionList />}
        // onClick={() => this.select(0)}
      />
      <BottomNavigationItem
        label="Toplists"
        icon={<ActionAssessment />}
        // onClick={() => this.select(1)}
      />
      <BottomNavigationItem
        label="Latest News"
        icon={<ActionLanguage />}
        // onClick={() => this.select(2)}
      />
    </BottomNavigation>
  </Paper>
);
  }
}
