import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_CHART,FETCH_COIN_PAIR_DETAIL_CHART_ERROR,
FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS,SET_PRICE_CHART_VISIBILITY_FILTER_1W,
SET_PRICE_CHART_VISIBILITY_FILTER_1H} from '../actions';
import {priceHistoryOneWeek,priceHistoryOneMonth,priceHistoryOneHour} from '../constants';
import _ from "underscore";

let baseCoinPairPriceHistory = {
  histories:[],
  error:null
};

function coinPairPriceHistory(state=baseCoinPairPriceHistory,action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case FETCH_COIN_PAIR_DETAIL_CHART_ERROR:
      newState.error = action.error;
      return newState;
    case FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS:
    let previosuPriceHistoryIndex = _.findIndex(newState.histories, e => e.coinPairId == action.result.coinPairId );
      if(previosuPriceHistoryIndex >= 0){
        newState.histories[previosuPriceHistoryIndex] = action.result;
      }else{
        newState.histories.push(action.result);
      }
      return newState;
    default:
      return state;
  }
}

function visibilityFilter(state=priceHistoryOneWeek,action){
    switch (action.type) {
      case SET_PRICE_CHART_VISIBILITY_FILTER_1W:
      return priceHistoryOneWeek;
      case SET_PRICE_CHART_VISIBILITY_FILTER_1H:
      return priceHistoryOneHour;
      default:
        return state;
    }
}


function isFetching(state=false,action) {
  switch (action.type) {
    case FETCH_COIN_PAIR_DETAIL_CHART:
      return true;
    case FETCH_COIN_PAIR_DETAIL_CHART_ERROR:
    case FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  visibilityFilter,
  coinPairPriceHistory
});
