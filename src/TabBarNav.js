import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import {TabNavigationsToIndex, favoriteCoinPairNav,topListsNav,newsNav} from './constants'
import {setActiveTabBarNav} from "./actions";

export default class TabBarNav extends Component {
  constructor(props){
    super(props);
    this.changeActiveNav = this.changeActiveNav.bind(this);
  }
  changeActiveNav(nav){
    this.props.history.push(nav);
    //this.props.setTabBarNav(nav);
  }
  render(){
    return(
    <Paper zDepth={1}>
    <BottomNavigation selectedIndex={TabNavigationsToIndex[this.props.location.pathname.substring(1)]} style={{
      position:"fixed",
      bottom:"0px",
      width:"100%",
      left:"0px",
      right:"0px"
    }}>
      <BottomNavigationItem
        label="Favorite Pairs"
        icon={<ActionList />}
        onClick={() => this.changeActiveNav(favoriteCoinPairNav)}
      />
      <BottomNavigationItem
        label="Toplists"
        icon={<ActionAssessment />}
        onClick={() => this.changeActiveNav(topListsNav)}
      />
      <BottomNavigationItem
        label="News"
        icon={<ActionLanguage />}
        onClick={() => this.changeActiveNav(newsNav)}
      />
    </BottomNavigation>
  </Paper>
);
  }
}
