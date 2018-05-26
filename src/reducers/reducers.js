import { combineReducers, createStore } from 'redux';
import allCoins from './AllCoins';
import allExchanges from './AllExchanges';
import favoriteCoinPairs from './FavoriteCoinPairs';
import favoriteCoinPairDetails from './FavoriteCoinPairDetail';
import favoriteCoinPairPriceHistory from './FavoriteCoinPairPriceHistory';
import selectedFavoriteCoinPair from './SelectedFavoriteCoinPair';
import topExchanges from './TopExchanges';
import news from './News';
import topPairs from './TopPairs';

const rootReducer = combineReducers({
  topPairs,
  selectedFavoriteCoinPair,
  allCoins,
  allExchanges,
  favoriteCoinPairDetails,
  favoriteCoinPairPriceHistory,
  topExchanges,
  news
})

export default rootReducer;
