import React, { Component } from 'react';
import FavoriteCoinPairContainer from './FavoriteCoinPairContainer';
import PopCoinsContainer from './PopCoinsContainer';
import CoinDetailContainer from './CoinDetailContainer'
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
        </div>
      </Router>
    );
  }
}

export default App;
