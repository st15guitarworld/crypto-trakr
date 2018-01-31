import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import fetch from 'cross-fetch';
import {CoinCompareBaseUrl,HisToHour} from './constants';
import Highcharts from 'highcharts';
import moment from 'moment';
import LoadingPaper from './LoadingPaper';
import {Card,CardHeader,CardMedia} from 'material-ui/Card';

function currencyFormat (num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

class PopCoinCard extends Component{
  constructor(props){
    super(props);
    this.state = {
        loading:true,
        currency:"USD",
        data:[],
        lastUpdated:null
    };
    this.constructOptions = this.constructOptions.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.constructChart=this.constructChart.bind(this);
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    this.setState({loading:true});
    let options = this.constructOptions();
    fetch(CoinCompareBaseUrl+HisToHour+"?"+options)
    .then(response => response.json(),  error => console.log('An error occurred.', error))
    .then(json => this.constructChart(json.Data))
  }
  constructChart(json){
    this.setState({loading:false,lastUpdated:Date.now()});
    let seriesData = json.map((data)=> [data.time,data.close])
    var minimumValue = json.reduce((a,b)=> a.close<b.close ? a.close : b.close);
    if(!this.state.loading)
    var myChart = Highcharts.chart(this.props.coin.Name+"-chart", {
        chart: {
            type: 'area',
            margin: [0, 0, 0, 0]
        },
        title: {
            text: ''
        },
        xAxis: {
          visible:false
        },
        tooltip: {
        crosshairs: [true],
        formatter: function() {
          var date = moment.unix(this.x).format("MMM D HH:mm");
          var price = currencyFormat(this.y);
          return date +"<br/>" +"<b>"+price+"</b>"
    }
      },
        plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
        yAxis: {
          min:minimumValue - 50,
          visible:false
        },
        series: [{
            showInLegend: false,
            data:seriesData
        }]
    });
  }
  constructOptions() {
    var u = new URLSearchParams();
    u.append('fsym', this.props.coin.Name);
    u.append('tsym', this.state.currency);
    u.append('limit',23);
    return u.toString();
  }

  render(){
    let title = this.props.coin.Name+" - "+ this.state.currency;
    let updatedTime = moment(this.state.lastUpdated).fromNow();
    return (
      <GridTile key={this.props.coin.Name} style={{
        position:'relative'
      }}>
                <LoadingPaper loading={this.state.loading}>
                  <span>{title}</span>
                    <div id={this.props.coin.Name+"-chart"} className="small-chart"></div>
                    <div>
                      <span>{updatedTime}</span>
                    </div>
                </LoadingPaper>
              </GridTile>
    );
  }
}
export default PopCoinCard;
