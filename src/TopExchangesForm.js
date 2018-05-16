import React,{Component} from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import _ from "underscore";
import currencies,{getNameFromSymbol,getFullNameFromSymbol,convertCurrencyToCCC} from './currencies';
import {topExchangesCurrencyChange} from "./actions"
import RaisedButton from 'material-ui/RaisedButton';

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
    this.setState(newState);
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
      padding:"0px 15px",
      display:"relative",
      height: "100%",
      overflow: "hidden"
    }}>
      <SelectField
        floatingLabelText="From Currency"
       value={this.state.fsym}
       fullWidth={true}
       onChange={this.handleFsymChange}>
       {this.state.fsyms.map(f => (
         <MenuItem key={f.FullName} value={f.Name} primaryText={f.FullName} />
       )) }
      </SelectField>
      <SelectField
       floatingLabelText="To Currency"
       value={this.state.tsym}
       fullWidth={true}
       onChange={this.handleTsymChange}>
       {this.state.tsyms.map(f => (
         <MenuItem key={f.FullName} value={f.Name} primaryText={f.FullName} />
       )) }
      </SelectField>
      <RaisedButton style = {{
        position:"absolute",
        bottom:"20px",
        left:"0px",
        right:"0px"
      }} label="Set Filters" primary={true} disabled={!this.state.fsym || !this.state.tsym}
      onClick={() => this.props.onTopExchangesCurrencyChange({fsym:this.state.fsym,tsym:this.state.tsym}).then(this.props.close)}
    />
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
