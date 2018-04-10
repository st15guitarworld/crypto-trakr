import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetchOrRefreshFavoriteCoinPair, fetchCoinPairHistoryChart} from './actions';
import {connect} from 'react-redux';
import LoadingPaper from './LoadingPaper';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip
} from 'react-jsx-highstock';
import CoinDetail from './CoinDetail';
import _ from "underscore";

const mapStateToProps = (state,props) => {
  let selectedFavoriteCoinPairDetail = _.find(state.favoriteCoinPairDetails.coinPairDetail,(d)=> d.id == state.selectedFavoriteCoinPair);
  let selectedFavoriteCoinPairHistory = _.find(state.favoriteCoinPairPriceHistory.coinPairPriceHistory.histories,(h) => h.coinPairId == selectedFavoriteCoinPairDetail.id)
  return {
    coinPairDetailRAW: selectedFavoriteCoinPairDetail.RAW,
    coinPairDetailDISPLAY:selectedFavoriteCoinPairDetail.DISPLAY,
    coinPairHistory:selectedFavoriteCoinPairHistory,
    coinPairDetail:selectedFavoriteCoinPairDetail,
    visibilityFilter: state.favoriteCoinPairPriceHistory.visibilityFilter,
    isLoading: selectedFavoriteCoinPairDetail.isFetching && selectedFavoriteCoinPairHistory.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCoinPairDetail:(e,id) => dispatch(fetchOrRefreshFavoriteCoinPair(e,id)),
    fetchCoinPairHistoryChart:(e,a,id) => dispatch(fetchCoinPairHistoryChart(e,a,id))
  };
}

class CoinDetailContainer extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    //this.props.refreshCoinPairDetail(this.state,this.props.coinPairDetail.id);
  }
  goBack(){
      if(this.props.history) {
          this.props.history.goBack();
      }
  }
  render(){
    let coinPairDetailProps = {
      Target: CoinDetail,
      ...this.props
    }

    return (
    <div className="coin-detail-container">
      <AppBar title={this.props.coinPairDetailRAW.FROMSYMBOL +" - "+this.props.coinPairDetailRAW.TOSYMBOL} className="coin-detail-appbar" iconElementLeft={<IconButton onClick={this.goBack}><NavigationArrowBack /></IconButton>}>
      </AppBar>
      <LoadingPaper {...coinPairDetailProps}/>
    </div>
    )
  }
}

let cnnectedCoinDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetailContainer);

export default cnnectedCoinDetailContainer;
