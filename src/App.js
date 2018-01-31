import React, { Component } from 'react';
import FavoriteCoinPairs from './FavoriteCoinPairs';
import PopCoinsContainer from './PopCoinsContainer';
import CoinDetail from './CoinDetail'
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
        <Route exact path="/" component={FavoriteCoinPairs}/>
        <Route path="/coinDetail" component={CoinDetail}/>
        </div>
      </Router>
    );
  }
}

export default App;
