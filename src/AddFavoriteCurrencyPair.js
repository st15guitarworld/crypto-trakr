import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import currencies,{getNameFromSymbol,getFullNameFromSymbol} from './currencies';
import {fetchOrRefreshFavoriteCoinPair} from './actions';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import {connect} from 'react-redux';

const mapStateToProps = (state,props) => {
  return {
    exchanges:state.allExchanges.allExchanges,
    exchangeNames:Object.keys(state.allExchanges.allExchanges),
    allCoins:state.allCoins.allCoins.coins
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewFavoriteCoinPair:(e)=> dispatch(fetchOrRefreshFavoriteCoinPair(e))
  };
}

class AddFavoriteCurrencyPair extends Component {
  constructor(props){
    super(props);
    this.state = {
      exchange:null,
      fromSyms:[],
      toSyms:[],
      fromSym:{
        value:null,
        error:false,
        errorText:"Invalid From Currency"
      },
      toSym:{
        value:null,
        error:false,
        errorText:"Select a To Currency"
      }
    };
    this.handlePairAdded = this.handlePairAdded.bind(this);
    this.handlePairCanceled = this.handlePairCanceled.bind(this);
    this.handleNewFromPairRequest = this.handleNewFromPairRequest.bind(this);
    this.resetToSym = this.resetToSym.bind(this);
    this.resetFromSym = this.resetFromSym.bind(this);
    this.validate = this.validate.bind(this);
    this.handleExchangeUpdate = this.handleExchangeUpdate.bind(this);
    this.handleFromSymUpdate = this.handleFromSymUpdate.bind(this);
    this.handleToSymUpdate = this.handleToSymUpdate.bind(this);
  }
  validate(){
    let validated = true;
      if(this.state.fromSym.value == null){
        this.setState({fromSym:{error:true}});
        validated = false;
      }
      if (this.state.toSym.value == null) {
        this.setState({toSym:{error:true}});
        validated = false;
      }
      console.log(validated);
      return validated;
  }
  resetFromSym(){
    this.setState({fromSyms:[]});
    this.setState({fromSym:{value:null}});
  }
  resetToSym(){
    this.setState({toSyms:[]});
    this.setState({toSym:{value:null}});
  }
  handleNewFromPairRequest(searchString,dataSource){
    this.resetToSym();
    let index = dataSource.findIndex((e)=> e.FullName == searchString);
    if (index >= 0) {
      this.setState({fromSym:{value:dataSource[index].Name}});
      this.props.onFromPairSelected({fsym:dataSource[index].Name});
    }
  }
  handlePairAdded(){
    let validated = this.validate();
    if(validated){
      this.props.addNewFavoriteCoinPair({fsyms:this.state.fromSym.value,
                                        tsyms:this.state.toSym.value,
                                        e:this.state.exchange
    });
    this.handlePairCanceled();
    }
  }
  handlePairCanceled(){
    this.resetFromSym();
    this.resetToSym();
    this.props.history.goBack();
  }
  handleExchangeUpdate(event,index){
      let searchExchange = this.props.exchangeNames[index];
      this.setState({exchange:searchExchange});
      let fromTickers = Object.keys(this.props.exchanges[searchExchange]);
      let fromSyms = this.props.allCoins.filter((c) => fromTickers.indexOf(c.Name) >=0)
      this.setState({fromSyms:fromSyms});
  }
  handleToSymUpdate(event,index) {
    let searchToSym = this.state.toSyms[index].Name;
    this.setState({toSym:{value:searchToSym}});
  }
  handleFromSymUpdate(event,index){
      let searchFromSym = this.state.fromSyms[index].Name;
      this.setState({fromSym:{value:searchFromSym}},() => {
        let rawFromCurrencies = this.props.exchanges[this.state.exchange][this.state.fromSym.value];
        if(rawFromCurrencies){
          let hardCurrencyToSyms = rawFromCurrencies.filter((c) => getNameFromSymbol(c))
                                                    .map((c)=> ({FullName:getFullNameFromSymbol(c),Name:c}));
          let cryptoToSyms = this.props.allCoins.filter((c) => rawFromCurrencies.indexOf(c.Name) >=0)
          let toSyms = [...hardCurrencyToSyms,...cryptoToSyms]
          this.setState({toSyms:toSyms})
        }
      });
  }
  render(){
    return (
      <div>
      <AppBar title="Add Favorite Currency Pair" iconElementLeft={<IconButton onClick={() => this.props.history.goBack() }><NavigationArrowBack /></IconButton>}>
      </AppBar>
      <div style={{
        padding:"10px 15px"
      }}>
      <SelectField
        value={this.state.exchange}
        floatingLabelText="Exchanges"
        fullWidth={true}
        onChange={this.handleExchangeUpdate}
        >
        {this.props.exchangeNames.map(e => (
            <MenuItem key={e} value={e} primaryText={e} />
          ))}
        </SelectField>
        <SelectField
            value={this.state.fromSym.value}
            floatingLabelText="From Currency"
            onChange={this.handleFromSymUpdate}
            fullWidth={true}
            //errorText={this.state.fromSym.error ? this.state.fromSym.errorText : null}
            >
              {this.state.fromSyms.map(f => (
                  <MenuItem key={f.Name} value={f.Name} primaryText={f.FullName} />
                ))}
      </SelectField>
      <SelectField
        value={this.state.toSym.value}
        floatingLabelText="To Currency"
        fullWidth={true}
        onChange={this.handleToSymUpdate}
        >
          {this.state.toSyms.map(f => (
              <MenuItem key={f.Name} value={f.Name} primaryText={f.FullName} />
            ))}
      </SelectField>
      <RaisedButton label="Submit" primary={true} style={{
        margin:"15px 0px"
      }}
      onClick={this.handlePairAdded}
    />
      </div>
    </div>
    );
  }
}
const CnctedCmpt = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFavoriteCurrencyPair)
export default CnctedCmpt;
