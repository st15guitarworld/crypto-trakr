import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetchCoinPairDetail} from './actions';
import {connect} from 'react-redux';

const mapStateToProps = (state,props) => {
  return {
    coinPairDetailRAW: state.coinPairDetail.coinPairDetail.RAW,
    coinPairDetailDISPLAY:state.coinPairDetail.coinPairDetail.DISPLAY
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCoinPairDetail:(e)=> dispatch(fetchCoinPairDetail(e))
  };
}


class CoinDetail extends Component {
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
    return (
    <div className="coin-detail-container">
      <AppBar title={this.state.fsyms +" - "+this.state.tsyms} className="coin-detail-appbar" iconElementLeft={<IconButton onClick={this.goBack}><NavigationArrowBack /></IconButton>}>
      </AppBar>
      <div className="coin-detail-item">
        <p>Current Price ({this.state.tsyms})</p>
        <h2>{this.props.coinPairDetailDISPLAY.PRICE}</h2>
      </div>
      <div class="coin-detail-item-container">
          <div className="coin-detail-item-container-item">
            <p>24 Hr Change</p>
            <small>{this.props.coinPairDetailDISPLAY.CHANGEPCT24HOUR} %</small>
          </div>
          <div className="coin-detail-item-container-item">
            <p>24 Hr Volume</p>
            <small>{this.props.coinPairDetailDISPLAY.TOTALVOLUME24HTO}</small>
          </div>
          <div className="coin-detail-item-container-item">
            <p> Market Cap</p>
            <small>{this.props.coinPairDetailDISPLAY.MKTCAP}</small>
          </div>
      </div>
    </div>
    )
  }
}
let cnnectedCoinDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetail);

export default cnnectedCoinDetail;
