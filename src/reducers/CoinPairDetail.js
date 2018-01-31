import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_FULL,FETCH_COIN_PAIR_DETAIL_FULL_ERROR,
FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS} from '../actions'

let coinPairDetailDefault = {
  RAW:{},
  DISPLAY:{}
}

function coinPairDetail(state =coinPairDetailDefault,action) {
switch (action.type) {
  case FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS:
    return action.coinPairDetail;
  default:
    return state;
}
}

function isFetching(state=false,action) {
  switch (action.type) {
    case FETCH_COIN_PAIR_DETAIL_FULL:
      return true;
    case FETCH_COIN_PAIR_DETAIL_FULL_ERROR:
    case FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS:
      return false;
    default:
      return state;
  }
}
export default combineReducers({
  coinPairDetail,
  isFetching
})
