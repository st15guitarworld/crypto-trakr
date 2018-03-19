import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_FULL,FETCH_COIN_PAIR_DETAIL_FULL_ERROR,
FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS} from '../actions';
import _ from "underscore";
let coinPairDetailDefault = {

}

function coinPairDetail(state =[],action) {
  let newState = JSON.parse(JSON.stringify(state));
switch (action.type) {
  case FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS:
  let previosuCoinDetailIndex = _.findIndex(newState, e=> e.id == action.coinPairDetail.id );
  if(previosuCoinDetailIndex >=0){
    newState[previosuCoinDetailIndex] = action.coinPairDetail;
  }else{
    newState.push(action.coinPairDetail);
  }
    return newState;
    break;
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
