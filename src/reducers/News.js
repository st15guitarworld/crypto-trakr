import { combineReducers, createStore } from 'redux';
import {FETCH_NEWS_FEED_AND_CATEGORIES,FETCH_NEWS_FEED_AND_CATEGORIES_S,FETCH_NEWS_FEED_AND_CATEGORIES_E,
FETCH_NEWS,FETCH_NEWS_SUCCESS,FETCH_NEWS_ERROR} from '../actions'

function news(state=[],action){
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

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


function isNewsFetching(state=false,action) {
  switch (action.type) {
    case FETCH_NEWS:
      return true;
    case FETCH_NEWS_SUCCESS:
    case FETCH_NEWS_ERROR:
      return false;
    default:
      return state;
  }
}

function isNewsAndCategoriesFetching(state=false,action) {
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
let newsandCategories = combineReducers({
  feedsAndCategories,
  isNewsAndCategoriesFetching
});

let theNews = combineReducers({
  news,
  isNewsFetching
})
export default combineReducers({
  newsandCategories,
  theNews
})
