import { combineReducers, createStore } from 'redux';
import {FETCH_NEWS_FEED_AND_CATEGORIES,FETCH_NEWS_FEED_AND_CATEGORIES_S,FETCH_NEWS_FEED_AND_CATEGORIES_E} from '../actions'

let base= {
  error:null,
  categories:[],
  feeds:[]
}
let feedsAndCategories = (state=base,action) => {
let newState = Object.assign({},state);
switch (action.type) {
  case FETCH_NEWS_FEED_AND_CATEGORIES_S:
    newState.categories = action.data.Categories;
    newState.feeds = action.data.Feeds;
    return newState;
  default:
    return state;
}
}

function isFetching(state=false,action) {
  switch (action.type) {
    case FETCH_NEWS_FEED_AND_CATEGORIES:
      return true;
    case FETCH_NEWS_FEED_AND_CATEGORIES_S:
    case FETCH_NEWS_FEED_AND_CATEGORIES_E:
      return false;
    default:
      return state;
  }
}
export default combineReducers({
  feedsAndCategories,
  isFetching
});
