import { combineReducers, createStore } from 'redux';












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
