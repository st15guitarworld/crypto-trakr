import React, { Component } from 'react';
import FavoriteCoinPairContainer from './FavoriteCoinPairContainer';
import PopCoinsContainer from './PopCoinsContainer';
import CoinDetailContainer from './CoinDetailContainer'
import AddFavoriteCurrencyPair from './AddFavoriteCurrencyPair';
import ToplistsContainer from './ToplistsContainer';
import NewsContainer from './NewsContainer';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path="/" component={FavoriteCoinPairContainer}/>
        <Route path="/coinDetail" component={CoinDetailContainer}/>
        <Route exact path="/addFavoriteCurrencyPair" component={AddFavoriteCurrencyPair}/>
        <Route exact path="/toplists" component={ToplistsContainer}/>
        <Route exact path="/news" component={NewsContainer}/>
        </div>
      </Router>
    );
  }
}

export default App;
