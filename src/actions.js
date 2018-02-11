import fetch from 'cross-fetch';
import {CoinCompareBaseUrl,CoinList,CryptoSortOrderAttribute,
price,AllExchanges,priceMultiFull,priceHistoryOneWeek,HisToHour} from './constants';
import Highcharts from 'highcharts';
import {buildURLParameters} from './buildURLParameters';
export const FETCH_ALL_COINS = 'FETCH_ALL_COINS';
export const FETCH_ALL_COINS_ERROR='FETCH_ALL_COINS_ERROR';
export const FETCH_ALL_COINS_SUCCESS='FETCH_ALL_COINS_SUCCESS';

export const FETCH_CURRENT_NEW_COIN_PAIRS="FETCH_CURRENT_NEW_COIN_PAIRS";
export const FETCH_CURRENT_NEW_COIN_PAIRS_ERROR="FETCH_CURRENT_NEW_COIN_PAIRS_ERROR";
export const FETCH_CURRENT_NEW_COIN_PAIRS_SUCCESS="FETCH_CURRENT_NEW_COIN_PAIRS_SUCCESS";
export const RESET_CURRENT_NEW_COIN_PAIRS="RESET_CURRENT_NEW_COIN_PAIRS";

export const ADD_FAVORITE_COIN_PAIR ="ADD_FAVORITE_COIN_PAIR";
export const ADD_FAVORITE_COIN_PAIR_ERROR = "ADD_FAVORITE_COIN_PAIR_ERROR";

export const FETCH_ALL_EXCHANGES = 'FETCH_ALL_EXCHANGES';
export const FETCH_ALL_EXCHANGES_ERROR='FETCH_ALL_EXCHANGES_ERROR';
export const FETCH_ALL_EXCHANGES_SUCCESS='FETCH_ALL_EXCHANGES_SUCCESS';

export const FETCH_COIN_PAIR_DETAIL_FULL = "FETCH_COIN_PAIR_DETAIL_FULL";
export const FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS = "FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS";
export const FETCH_COIN_PAIR_DETAIL_FULL_ERROR = "FETCH_COIN_PAIR_DETAIL_FULL_ERROR";

export const FETCH_COIN_PAIR_DETAIL_CHART = "FETCH_COIN_PAIR_DETAIL_CHART";
export const FETCH_COIN_PAIR_DETAIL_CHART_ERROR = "FETCH_COIN_PAIR_DETAIL_CHART_ERROR";
export const FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS = "FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS";

export function fetchPairCoinDetailChart(){
  return {
    type:FETCH_COIN_PAIR_DETAIL_CHART
  }
}

export function fetchCoinPairDetailChartError(error){
  return {
    type:FETCH_COIN_PAIR_DETAIL_CHART_ERROR,
    error:error
  }
}

export function fetchCoinPairDetailChartSuccess(data){
  return {
    type:FETCH_COIN_PAIR_DETAIL_CHART_SUCCESS,
    data:data
  }
}

export function fetchCoinPairDetailFull(){
  return {
    type:FETCH_COIN_PAIR_DETAIL_FULL
  }
}

export function fetchCoinPairDetailFullSuccess(coinPairDetail){
  return {
    type:FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS,
    coinPairDetail:coinPairDetail
  }
}

export function fetchCoinPairDetailFullError(error){
  return {
    type:FETCH_COIN_PAIR_DETAIL_FULL_SUCCESS,
    error:error
  }
}

export function addFavoriteCoinPair(coinPair){
  return {
    type: ADD_FAVORITE_COIN_PAIR,
    coinPair
  }
}

function fetchAllCoinsAction(){
  return {
     type: FETCH_ALL_COINS
  }
}
function fetchAllCoinsError(error){
  return {
     type: FETCH_ALL_COINS_ERROR,
     error:error
  }
}
function fetchAllCoinsSuccess(returned){
  return {
     type: FETCH_ALL_COINS_SUCCESS,
     coins:returned.coins,
     baseImageUrl:returned.baseImageUrl,
     baseUrl:returned.baseUrl,
     lastDateRecieved:new Date()
  }
}
function fetchAllExchangesAction(){
  return {
     type: FETCH_ALL_EXCHANGES
  }
}
function fetchAllExchangesActionError(error){
  return {
     type: FETCH_ALL_EXCHANGES_ERROR,
     error:error
  }
}
function fetchAllExchangesActionSuccess(returned){
  return {
     type: FETCH_ALL_EXCHANGES_SUCCESS,
     exchanges:returned
  }
}

function fetchCurrentNewCoinPairAction(){
  return {
     type: FETCH_CURRENT_NEW_COIN_PAIRS
  }
}
function fetchCurrentNewCoinPairActionError(error){
  return {
     type: FETCH_CURRENT_NEW_COIN_PAIRS_ERROR,
     error:error
  }
}
function fetchCurrentNewCoinPairActionSuccess(returned){
  return {
     type: FETCH_CURRENT_NEW_COIN_PAIRS_SUCCESS,
     pairs:returned.pairs,
  }
}

export function resetCurrentNewCoinPairAction(){
  return {
     type: RESET_CURRENT_NEW_COIN_PAIRS
  }
}

let coinSort = (a,b) => {
  return a[CryptoSortOrderAttribute] - b[CryptoSortOrderAttribute]
}

export function fetchAllCoins() {
  return function (dispatch) {
      dispatch(fetchAllCoinsAction());

      return fetch(CoinCompareBaseUrl + CoinList)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => dispatch(fetchAllCoinsError(error))
      )
      .then(json =>{
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        let arr = Object.keys(json.Data).map((key)=> json.Data[key]);
        arr.sort(coinSort);
        let returnedObj = {
          coins:arr,
          baseImageUrl:json.BaseImageUrl,
          baseUrl:json.BaseLinkUrl
        }
        dispatch(fetchAllCoinsSuccess(returnedObj))
      }
      )
  }
}

export function fetchAllExchanges(){
  return function (dispatch){
      dispatch(fetchAllExchangesAction());
      return fetch(CoinCompareBaseUrl + AllExchanges)
      .then(response => response.json(),error => dispatch(fetchAllExchangesActionError(error)))
      .then(json => dispatch(fetchAllExchangesActionSuccess(json)))
  }
}
/**
 * idObj = {
 fromSym,
 tSym,
 e
}
 */
export function fetchAndAddFavoriteCoinPairPrice(idObj) {
  return function(dispatch){
    return fetch(CoinCompareBaseUrl + price + "?"+buildURLParameters(idObj))
    .then(
      response => response.json(),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => dispatch(fetchCurrentNewCoinPairActionError(error))
    )
    .then(json => {
      let result = {
        price:json[idObj.tsyms],
        e:idObj.e,
        fsym:idObj.fsym,
        tsyms:idObj.tsyms,
      };
      console.log(result);
      dispatch(addFavoriteCoinPair(result));
    })
  }
}
/**
 * idObj = {
 fromSym,
 tSym,
 e
}
 */
export function fetchCoinPairDetail(obj) {
  return function(dispatch,getState){
    const { coinPairDetail } = getState();
    dispatch(fetchCoinPairDetailFull());
    return fetch(CoinCompareBaseUrl + priceMultiFull + "?" + buildURLParameters(obj))
           .then(response => response.json(),
            error => dispatch(fetchCoinPairDetailFullError(error))
          ).then(
            json => {
              let result = {
                RAW:json.RAW[obj.fsyms][obj.tsyms],
                DISPLAY:json.DISPLAY[obj.fsyms][obj.tsyms]
              }
              dispatch(fetchCoinPairDetailFullSuccess(result))
              let msg = {fsym:obj.fsyms,tsym:obj.tsyms,e:obj.e};
              dispatch(fetchCoinPairHistoryChart(msg,coinPairDetail.coinPairPriceHistory.visibilityFilter))
            })
  }
}

function fetchCoinPairHistoryOneWeek(idObj){
  let argumentState = Object.assign({},idObj);
  argumentState.aggregate=1;
  argumentState.limit=168;
  argumentState.tryConversion=false;

  return function(dispatch) {
    return fetch(CoinCompareBaseUrl + HisToHour + "?" + buildURLParameters(argumentState))
          .then(response => response.json())
          .then(json => {
              dispatch(fetchCoinPairDetailChartSuccess(json.Data));
          })
  }
}


export function fetchCoinPairHistoryChart(idObj,visibilityFilter){
  switch (visibilityFilter) {
    case priceHistoryOneWeek:
      return fetchCoinPairHistoryOneWeek(idObj);
      break;
    default:
      return fetchCoinPairHistoryOneWeek(idObj);
  }
}
