import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddCurrencyPairDialog from './AddCurrencyPairDialog';
import {CoinCompareBaseUrl,priceMultiFull} from './constants';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import LoadingPaper from './LoadingPaper';
import {List, ListItem} from 'material-ui/List';
import fetch from 'cross-fetch';
import {buildURLParameters} from './buildURLParameters';
import {Link} from 'react-router-dom'

const iconInnerStyles = {
  marginRight: 24,
  height:'60',
  height:'60',
  color:'white'
}
const iconStyle = {
  width: 60,
  height: 60,
  margin:0
}

const addButtonStyle = {
  position:"fixed",
  bottom:"5%",
  right:"4%",
  zIndex:"10"
}

function buildLoadedFavoriteCoinPair(data,favoriteCoinPair){
  let fromSym = Object.keys(data.RAW)[0]
  let toSym = Object.keys(data.RAW[fromSym])[0];
  let rootData = data.RAW[fromSym][toSym];
  return {
    exchange:rootData.MARKET,
    fromSym:rootData.FROMSYMBOL,
    toSym:rootData.TOSYMBOL,
    price:rootData.PRICE
  }
}
const mapStateToProps = (state,props) => {
  return {
    favoriteCoinPairs:state.favoriteCoinPairs.coins
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}
class FavoriteCoinPairs extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogOpen:false
    };
    this.closeDialog = this.closeDialog.bind(this);
  }
  closeDialog() {
    this.setState({dialogOpen:false})
  }
  render(){
    return  (
      <div>
    <AppBar title="Crypto-Trakr" className="favorite-coin-appbar" iconStyleRight={{
      margin:0
    }}>
    <AddCurrencyPairDialog closeDialog={this.closeDialog} dialogOpen={this.state.dialogOpen}/>
    </AppBar>
    <List>

      {this.props.favoriteCoinPairs.map((pair,index)=>(
        <div key={index}>
        <ListItem key={index} primaryText={pair.price} secondaryText={pair.fsym+" - "+ pair.tsyms + " "+ pair.e}
          onClick={() => {this.props.history.push("coinDetail", {fsym:pair.fsym,e:pair.e,tsyms:pair.tsyms})}}
        />
         <Divider />
       </div>
      ))}
    </List>
    <FloatingActionButton style={addButtonStyle} onClick={() => this.setState({dialogOpen:true})}>
     <ContentAdd />
   </FloatingActionButton>
    </div>
    );
  }
}
const CnctedFavoriteCoinPairs = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteCoinPairs)
export default CnctedFavoriteCoinPairs;
