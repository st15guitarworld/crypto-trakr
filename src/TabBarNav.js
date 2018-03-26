import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import { connect } from 'react-redux';
import {TabNavigationsToIndex, favoriteCoinPairNav,topListsNav,newsNav} from './constants'
import {setActiveTabBarNav} from "./actions";


const mapStateToProps = (state,props) => {
  return {
    tabBarActiveNav:state.activeTabBarNav
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setTabBarNav:(nav) => dispatch(setActiveTabBarNav(nav))
  };
}

class TabBarNav extends Component {
  constructor(props){
    super(props);
    this.changeActiveNav = this.changeActiveNav.bind(this);
  }
  changeActiveNav(nav){
    this.props.history.push(nav);
    this.props.setTabBarNav(nav);
  }
  render(){
    return(
    <Paper zDepth={1}>
    <BottomNavigation selectedIndex={TabNavigationsToIndex[this.props.tabBarActiveNav]} style={{
      position:"fixed",
      bottom:"0px",
      width:"100%",
      left:"0px"
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
const CnctedTabBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarNav)
export default CnctedTabBar;
