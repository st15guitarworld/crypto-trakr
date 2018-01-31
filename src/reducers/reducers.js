import { combineReducers, createStore } from 'redux';
import allCoins from './AllCoins';
import allExchanges from './AllExchanges';
import favoriteCoinPairs from './FavoriteCoinPairs';
import coinPairDetail from './CoinPairDetail';

const rootReducer = combineReducers({
  allCoins,
  allExchanges,
  favoriteCoinPairs,
  coinPairDetail
})

export default rootReducer;
