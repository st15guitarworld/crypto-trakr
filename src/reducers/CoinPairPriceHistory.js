import { combineReducers, createStore } from 'redux';
import {FETCH_COIN_PAIR_DETAIL_CHART,FETCH_COIN_PAIR_DETAIL_CHART_ERROR,
FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS,SET_PRICE_CHART_VISIBILITY_FILTER_1W,
SET_PRICE_CHART_VISIBILITY_FILTER_1H} from '../actions';
import {priceHistoryOneWeek,priceHistoryOneMonth,priceHistoryOneHour} from '../constants';


let baseCoinPairPriceHistory = {
  data:[],
  lineData:[],
  error:null
};

function coinPairPriceHistory(state=baseCoinPairPriceHistory,action) {
  let newState = Object.assign({});
  switch (action.type) {
    case FETCH_COIN_PAIR_DETAIL_CHART_ERROR:
      newState.error = action.error;
      return newState;
    case FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS:
      newState.data = action.data;
      newState.lineData = action.lineData;
      return newState;
      break;
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
