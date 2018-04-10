import { combineReducers } from 'redux';
import {FETCH_TOP_EXCHANGES,FETCH_TOP_EXCHANGES_SUCCESS,SET_TOP_EXCHANGES_CURRENCIES} from "../actions";
/*
The currency pairs used to calculate the top exchanges by volume.
(the maximum character length for both fsym and tsym is 10)
*/
let defaultCurrencies = {
  fsym:"BTC",
  tsym:"USD"
}

function exchangesCurrencies(state=defaultCurrencies,action){
  switch (action.type) {
    case SET_TOP_EXCHANGES_CURRENCIES:
    let newState = Object.assign({},state);
    newState.fsym = action.fsym;
    newState.tsym = action.tsym;
    return newState;
    default:
      return state;
  }
}

function isFetching(state=false,action) {
  switch (action.type) {
    case "expression":
      break;
    default:
      return state;
  }
}

function topExchanges(state=[],action){
  switch (action.type) {
    case FETCH_TOP_EXCHANGES_SUCCESS:
      return action.data;
    default:
      return state;
      }
}

let TopExchangesCombined = combineReducers({
  topExchanges,
  exchangesCurrencies,
  isFetching
});

export default TopExchangesCombined;
