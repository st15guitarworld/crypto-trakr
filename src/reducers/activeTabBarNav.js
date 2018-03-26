import {SET_ACTIVE_TAB_BAR_NAV} from '../actions'

export default function activeTabBarNav(state ="", action) {
  switch (action.type) {
    case SET_ACTIVE_TAB_BAR_NAV:
      return action.nav;
    default:
      return state;
  }
}
