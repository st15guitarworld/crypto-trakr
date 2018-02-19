import { combineReducers, createStore } from 'redux';
import {ADD_FAVORITE_COIN_PAIR,ADD_FAVORITE_COIN_PAIR_ERROR,ADD_FAVORITE_COIN_PAIR_SUCCESS} from '../actions'


let baseFavoriteCoinPair = {
  coins:[],
  error:null
};

function favoriteCoinPairs(state=baseFavoriteCoinPair,action){
let newState = JSON.parse(JSON.stringify(state));
switch (action.type) {
  case ADD_FAVORITE_COIN_PAIR_SUCCESS:
    newState.coins.push(action.coinPair);
    return newState;
  case ADD_FAVORITE_COIN_PAIR_ERROR:
    newState.error = action.error;
    return newState;
    break;
  default:
  return newState;
}
}

export default favoriteCoinPairs;
