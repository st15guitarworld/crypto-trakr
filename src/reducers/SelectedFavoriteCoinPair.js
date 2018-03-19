import {SET_SELECTED_FAVORITE_COIN_PAIR,RESET_SELECTED_FAVORITE_COIN_PAIR} from '../actions'

export default function selectedFavoriteCoinPair(state="",action){
  switch (action.type) {
    case SET_SELECTED_FAVORITE_COIN_PAIR:
      return action.selected + "";
    case RESET_SELECTED_FAVORITE_COIN_PAIR:
      return "";
    default:
    return state;
  }
}
