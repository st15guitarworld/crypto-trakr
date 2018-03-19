import { combineReducers, createStore } from 'redux';
import allCoins from './AllCoins';
import allExchanges from './AllExchanges';
import favoriteCoinPairs from './FavoriteCoinPairs';
import favoriteCoinPairDetails from './FavoriteCoinPairDetail';
import favoriteCoinPairPriceHistory from './FavoriteCoinPairPriceHistory';
import selectedFavoriteCoinPair from './SelectedFavoriteCoinPair';
const rootReducer = combineReducers({
  selectedFavoriteCoinPair,
  allCoins,
  allExchanges,
  favoriteCoinPairDetails,
  favoriteCoinPairPriceHistory
})

export default rootReducer;
