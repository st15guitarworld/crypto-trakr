import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchTopPairs} from './actions';
import CCC from "./ccc-streamer-utilities";
import TableBuilder from "./TableBuilder";

function topPairsRawToDisplay(pairs) {
  return pairs.map(pair => ({
    "Coin" : pair.CoinInfo.FullName,
    "Volume 24H" : pair.ConversionInfo.TotalVolume24H
  }))
}

const mapStateToProps = (state,props) => {
  return {
    data: topPairsRawToDisplay(state.topPairs.topPairs)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTheTopExchanges:() => dispatch(fetchTopPairs())
  };
}


class TopPairs extends Component {
  componentWillMount(){
      this.props.fetchTheTopExchanges();
  }
  render(){
    return TableBuilder.buildSimpleTable(this.props.data);
  }
}

let cnnectedTopPairs = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPairs);

export default cnnectedTopPairs;
