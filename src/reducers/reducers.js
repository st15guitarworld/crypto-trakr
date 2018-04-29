import { combineReducers, createStore } from 'redux';
import allCoins from './AllCoins';
import allExchanges from './AllExchanges';
import favoriteCoinPairs from './FavoriteCoinPairs';
import favoriteCoinPairDetails from './FavoriteCoinPairDetail';
import favoriteCoinPairPriceHistory from './FavoriteCoinPairPriceHistory';
import selectedFavoriteCoinPair from './SelectedFavoriteCoinPair';
import activeTabBarNav from './activeTabBarNav';
import topExchanges from './TopExchanges';
import topPairs from './TopPairs';

const rootReducer = combineReducers({
  topPairs,
  selectedFavoriteCoinPair,
  activeTabBarNav,
  allCoins,
  allExchanges,
  favoriteCoinPairDetails,
  favoriteCoinPairPriceHistory,
  topExchanges
})

export default rootReducer;
