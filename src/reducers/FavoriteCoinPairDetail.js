import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_FULL,FETCH_COIN_PAIR_DETAIL_FULL_ERROR,
FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS,UPDATE_COIN_PAIR_DETAIL_FULL} from '../actions';
import _ from "underscore";
import CCC from "../ccc-streamer-utilities";

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
    case UPDATE_COIN_PAIR_DETAIL_FULL:
    const {update} = action;
      if (update.PRICE) {
        let updatedCoinPairIndex = _.findIndex(newState, e => e.RAW.MARKET == update.MARKET &&
          e.RAW.FROMSYMBOL == update.FROMSYMBOL && e.RAW.TOSYMBOL == update.TOSYMBOL );
          newState[updatedCoinPairIndex].DISPLAY.PRICE = CCC.STATIC.CURRENCY.getSymbol(update.TOSYMBOL) + " " + update.PRICE;
        return newState;
      }else{
        return state;
      }
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
