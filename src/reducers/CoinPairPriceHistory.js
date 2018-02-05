import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_CHART,FETCH_COIN_PAIR_DETAIL_CHART_ERROR,
FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS} from '../actions';
import {priceHistoryOneWeek,priceHistoryOneMonth,priceHistoryOneHour} from '../constants';


let baseCoinPairPriceHistory = {
  history:[],
  error:null
};

function coinPairPriceHistory(state=baseCoinPairPriceHistory,action) {
  switch (action.type) {
    case FETCH_COIN_PAIR_DETAIL_CHART_ERROR:
      state.error = action.error;
      break;
    case FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS:
      state.history = action.data;
      return state;
      break;
    default:
      return state;
  }
}

function visibilityFilter(state=priceHistoryOneWeek,action){
    switch (action.type) {
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
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  visibilityFilter,
  coinPairPriceHistory
});
