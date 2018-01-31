import { combineReducers, createStore } from 'redux';
import {FETCH_ALL_COINS,FETCH_ALL_COINS_ERROR,FETCH_ALL_COINS_SUCCESS } from '../actions'

let allCoinsDefault={
  error:null,
  coins:[],
  baseImageUrl:null,
  baseUrl:null
}

function allCoins(state=allCoinsDefault,action) {
  let newState = Object.assign({},state);
  switch (action.type) {
    case FETCH_ALL_COINS_ERROR:
      newState.error = action.error;
      return newState;
      break;
      case FETCH_ALL_COINS_SUCCESS:
        newState.coins = action.coins;
        newState.baseImageUrl = action.baseImageUrl;
        newState.baseUrl = action.baseUrl;
        return newState;
        break;
    default:
      return state;
  }
}

function isFetching(state=false,action) {
  switch (action.type) {
    case FETCH_ALL_COINS:
      return true;
    case FETCH_ALL_COINS_ERROR:
    case FETCH_ALL_COINS_SUCCESS:
      return false;
    default:
      return state;
  }
}

let AllCoinsCombined = combineReducers({
  allCoins,
  isFetching
});

export default AllCoinsCombined;
