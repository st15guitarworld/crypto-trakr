import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetchCoinPairDetail, fetchCoinPairHistoryChart} from './actions';
import {connect} from 'react-redux';
import LoadingPaper from './LoadingPaper';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip
} from 'react-jsx-highstock';
import CoinDetail from './CoinDetail';

const mapStateToProps = (state,props) => {
  return {
    coinPairDetailRAW: state.coinPairDetail.coinPairDetail.RAW,
    coinPairDetailDISPLAY:state.coinPairDetail.coinPairDetail.DISPLAY,
    coinPairHistory:state.coinPairDetail.coinPairPriceHistory,
    coinPairDetail:state.coinPairDetail,
    isLoading: state.coinPairDetail.isFetching && state.coinPairDetail.coinPairPriceHistory.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCoinPairDetail:(e) => dispatch(fetchCoinPairDetail(e)),
    fetchCoinPairHistoryChart:(e,a) => dispatch(fetchCoinPairHistoryChart(e,a))
  };
}

class CoinDetailContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      fsyms: props.history.location.state.fsym,
      tsyms: props.history.location.state.tsyms,
      e:props.history.location.state.e
    }
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    this.props.fetchCoinPairDetail(this.state);
  }
  goBack(){
      if(this.props.history) {
          this.props.history.goBack();
      }
  }
  render(){
    let coinPairDetailProps = {
      Target: CoinDetail,
      tsyms: this.state.tsyms,
      ...this.props
    }
    let LoadingCoinPairDetail = LoadingPaper(coinPairDetailProps);
    return (
    <div className="coin-detail-container">
      <AppBar title={this.state.fsyms +" - "+this.state.tsyms} className="coin-detail-appbar" iconElementLeft={<IconButton onClick={this.goBack}><NavigationArrowBack /></IconButton>}>
      </AppBar>
        {LoadingCoinPairDetail}
    </div>
    )
  }
}

let cnnectedCoinDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetailContainer);

export default cnnectedCoinDetailContainer;
