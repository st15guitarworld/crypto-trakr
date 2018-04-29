import { combineReducers } from 'redux';
import {SET_TOP_TO_PAIR,FETCH_TOP_PAIRS_SUCCESS} from "../actions";
let defaultTopTpPair = "USD";

function topToPair(state=defaultTopTpPair,action){
  switch (action.type) {
    case SET_TOP_TO_PAIR:
      return action.data;
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

function topPairs(state=[],action){
  switch (action.type) {
    case FETCH_TOP_PAIRS_SUCCESS:
      return action.data;
    default:
      return state;
      }
}

let TopPairsCombined = combineReducers({
  topToPair,
  topPairs,
  isFetching
});

export default TopPairsCombined;
