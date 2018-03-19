import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetchCoinPairDetail} from './actions';
import LoadingPaper from './LoadingPaper';
import LineStockChart from './LineStockChart';
import _ from 'underscore';

class CoinDetail extends Component {
  constructor(props){
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.onRangeSelect = this.onRangeSelect.bind(this);
  }
  onRangeSelect(visibilityFilter){
    let idObj = {
    fsym:this.props.coinPairDetailRAW.FROMSYMBOL,
    tsym:this.props.coinPairDetailRAW.TOSYMBOL,
    e:this.props.coinPairDetailRAW.MARKET};

    this.props.fetchCoinPairHistoryChart(idObj, visibilityFilter,this.props.coinPairDetail.id + "");
  }
  renderChart(){
    if(!_.isEmpty(this.props.coinPairHistory.lineData)){
     let minimumValueOfChart =_.min(this.props.coinPairHistory.lineData,(a)=> a[1]);
    return <LineStockChart min={minimumValueOfChart[1]} data={this.props.coinPairHistory.lineData}/>;
   }
  }
  render(){
    let activeItem = this.props.visibilityFilter;
    return (
      <div>
      <div className="coin-detail-item">
        <p>Current Price</p>
        <h2>{this.props.coinPairDetailDISPLAY.PRICE}</h2>
      </div>
      <div className="coin-detail-item-container">
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
      <div className="coin-detail-chart">
               <ul className="coin-detail-chart-range-selector">
                <li
                  className={"1H" == activeItem ? "coin-detail-chart-range-item active":"coin-detail-chart-range-item"}
                  onClick={() => this.onRangeSelect("1H")}
                  >1H</li>
                <li
                  onClick={() => this.onRangeSelect("1W")}
                    className={"1W" == activeItem ? "coin-detail-chart-range-item active":"coin-detail-chart-range-item"}
                  >1W</li>
                <li
                      className={"1M" == activeItem ? "coin-detail-chart-range-item active":"coin-detail-chart-range-item"}
                >1M</li>
                <li
                      className={"1Y" == activeItem ? "coin-detail-chart-range-item active":"coin-detail-chart-range-item"}
                  >1Y</li>
              </ul>
        {this.renderChart()}
      </div>
      </div>
      );
  }
}
export default CoinDetail;
