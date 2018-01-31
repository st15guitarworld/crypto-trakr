import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/reducers.js';
import {fetchAllCoins,fetchAllExchanges} from './actions';
import {loadState,saveState} from './localStorage'

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() function
  )
)
store.subscribe(()=>{
  console.log(store.getState());
  saveState({
    "favoriteCoinPairs":store.getState().favoriteCoinPairs
  })
})

const MyApp = () => (
   <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
   </Provider>
);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();

store.dispatch(fetchAllCoins())
store.dispatch(fetchAllExchanges())
