import { combineReducers, createStore } from 'redux';
import {FETCH_ALL_EXCHANGES,FETCH_ALL_EXCHANGES_ERROR,FETCH_ALL_EXCHANGES_SUCCESS } from '../actions'

function allExchanges(state ={},action) {
switch (action.type) {
  case FETCH_ALL_EXCHANGES_SUCCESS:
    return action.exchanges;
  default:
    return state;
}
}

function isFetching(state=false,action) {
  switch (action.type) {
    case FETCH_ALL_EXCHANGES:
      return true;
    case FETCH_ALL_EXCHANGES_ERROR:
    case FETCH_ALL_EXCHANGES_SUCCESS:
      return false;
    default:
      return state;
  }
}

let AllExchangesCombined = combineReducers({
  allExchanges,
  isFetching
});
export default AllExchangesCombined;
