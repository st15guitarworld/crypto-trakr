import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetchCoinPairDetail} from './actions';
import {connect} from 'react-redux';
import LoadingPaper from './LoadingPaper';

const mapStateToProps = (state,props) => {
  return {
    coinPairDetailRAW: state.coinPairDetail.coinPairDetail.RAW,
    coinPairDetailDISPLAY:state.coinPairDetail.coinPairDetail.DISPLAY,
    isLoading: state.coinPairDetail.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCoinPairDetail:(e)=> dispatch(fetchCoinPairDetail(e))
  };
}

let CoinPairDetailInner = (props) => {
  return (
    <div>
    <div className="coin-detail-item">
      <p>Current Price</p>
      <h2>{props.coinPairDetailDISPLAY.PRICE}</h2>
    </div>
    <div className="coin-detail-item-container">
        <div className="coin-detail-item-container-item">
          <p>24 Hr Change</p>
          <small>{props.coinPairDetailDISPLAY.CHANGEPCT24HOUR} %</small>
        </div>
        <div className="coin-detail-item-container-item">
          <p>24 Hr Volume</p>
          <small>{props.coinPairDetailDISPLAY.TOTALVOLUME24HTO}</small>
        </div>
        <div className="coin-detail-item-container-item">
          <p> Market Cap</p>
          <small>{props.coinPairDetailDISPLAY.MKTCAP}</small>
        </div>
    </div>
    <div >

    </div>
    </div>
  );
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
    let cooinPairDetailProps = {
      Target: CoinPairDetailInner,
      tsyms: this.state.tsyms,
      ...this.props
    }
    let LoadingCoinPairDetail = LoadingPaper(cooinPairDetailProps);
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
