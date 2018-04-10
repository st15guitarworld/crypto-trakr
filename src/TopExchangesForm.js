import React,{Component} from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import _ from "underscore";
import currencies,{getNameFromSymbol,getFullNameFromSymbol,convertCurrencyToCCC} from './currencies';
import {topExchangesCurrencyChange} from "./actions"

function calculateFromSyms(coins,supportedFromSyms) {
  if(coins.length == 0 || supportedFromSyms.length == 0) {
    return [];
  }

  return coins.filter((c) => supportedFromSyms.indexOf(c.Name) >=0)
}

let TopExchangesFromSymsSupported = ["BTC","ETH","XRP","LTC","EOS","DASH"]
let calculateToSyms = (fsym,exchanges,allCoins) => {
  let toSyms=[]
  for (const key of Object.keys(exchanges)) {
     let fromObj = exchanges[key];
     let fromSyms = Object.keys(fromObj);
     if(fromSyms.indexOf(fsym)>=0){
       toSyms = toSyms.concat(fromObj[fsym]);
     }
}
toSyms = Array.from(new Set(toSyms));
let cryptoCurrencies = allCoins.filter((c) => toSyms.indexOf(c.Name) >=0);
let hardCurrencies = toSyms.filter(c => getNameFromSymbol(c))
                          .map(c => convertCurrencyToCCC(c));
  return [...hardCurrencies,...cryptoCurrencies]
}

const mapStateToProps = (state,props) => {
  return {
    topExhangeCurrenciesFsym: state.topExchanges.exchangesCurrencies.fsym,
    topExhangeCurrenciesTsym: state.topExchanges.exchangesCurrencies.tsym,
    allCoins:state.allCoins.allCoins.coins,
    exchanges:state.allExchanges.allExchanges
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTopExchangesCurrencyChange:(obj) => dispatch(topExchangesCurrencyChange(obj))
  };
}

class TopExchangesForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      "fsym":props.topExhangeCurrenciesFsym,
      "tsym":props.topExhangeCurrenciesTsym,
      "fsyms":calculateFromSyms(props.allCoins,TopExchangesFromSymsSupported),
      "tsyms": calculateToSyms(props.topExhangeCurrenciesFsym,props.exchanges,props.allCoins)
    };
    this.handleFsymChange = this.handleFsymChange.bind(this);
    this.handleTsymChange = this.handleTsymChange.bind(this);
  }
  handleTsymChange(event,index){
    let selectedTSym = this.state.tsyms[index];
    let newState = Object.assign({},this.state);
    newState.tsym = selectedTSym.Name;
    let that = this;
    this.setState(newState,function(){
        let obj = {fsym:that.state.fsym,tsym:that.state.tsym};
        that.props.onTopExchangesCurrencyChange(obj);
    });
  }
  handleFsymChange(event,index){
    let selectedFSYM = this.state.fsyms[index];
    let newState = Object.assign({},this.state);
    newState.fsym = selectedFSYM.Name;
    newState.tsym = null;
    newState.tsyms = calculateToSyms(selectedFSYM.Name,this.props.exchanges,this.props.allCoins);
    this.setState(newState);
  }
  componentWillReceiveProps(nextProps,nextState){
    this.setState({
      "fsym":nextProps.topExhangeCurrenciesFsym,
      "tsym":nextProps.topExhangeCurrenciesTsym,
      "fsyms":calculateFromSyms(nextProps.allCoins,TopExchangesFromSymsSupported),
      "tsyms": calculateToSyms(nextProps.topExhangeCurrenciesFsym,nextProps.exchanges,nextProps.allCoins)
    });
  }
  render(){
  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <SelectField
        floatingLabelText="from currency"
       value={this.state.fsym}
       onChange={this.handleFsymChange}>
       {this.state.fsyms.map(f => (
         <MenuItem key={f.FullName} value={f.Name} primaryText={f.FullName} />
       )) }
      </SelectField>
      <SelectField
       floatingLabelText="to currency"
       value={this.state.tsym}
       onChange={this.handleTsymChange}>
       {this.state.tsyms.map(f => (
         <MenuItem key={f.FullName} value={f.Name} primaryText={f.FullName} />
       )) }
      </SelectField>
    </div>
  )
}
}

// You have to connect() to any reducers that you wish to connect to yourself
let CnctedTopExchangesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopExchangesForm)

export default CnctedTopExchangesForm;
