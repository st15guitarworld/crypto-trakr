import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import AddCurrencyPairDialog from './AddCurrencyPairDialog';
import LoadingPaper from './LoadingPaper';
import {ListItem,List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const addButtonStyle = {
  position:"fixed",
  bottom:"5%",
  right:"4%",
  zIndex:"10"
}

const mapStateToProps = (state,props) => {
  return {
    favoriteCoinPairs:state.favoriteCoinPairs.coins,
    isLoading:state.allExchanges.isFetching && state.allCoins.isFetching
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

let favoriteCoinPairInner = (props) => {
  return (
    <div>
      <List>
        {props.favoriteCoinPairs.map((pair,index)=>(
          <div key={index}>
          <ListItem key={index} primaryText={pair.price} secondaryText={pair.fsym+" - "+ pair.tsyms + " "+ pair.e}
            onClick={() => {props.history.push("coinDetail", {fsym:pair.fsym,e:pair.e,tsyms:pair.tsyms})}}
          />
           <Divider />
         </div>
        ))}
      </List>
      <FloatingActionButton style={addButtonStyle} onClick={() => props.openDialog()}>
       <ContentAdd />
     </FloatingActionButton>
    </div>
  );
};

class FavoriteCoinPairContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogOpen:false
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  closeDialog() {
    this.setState({dialogOpen:false})
  }
  openDialog() {
    this.setState({dialogOpen:true})
  }
  render(){
    let favoreiteCoinPairProps = {
      Target:favoriteCoinPairInner,
      openDialog: this.openDialog,
      closeDialog:this.closeDialog,
      ...this.props
    }
    let LoadingFavoriteCoinPairInner = LoadingPaper(favoreiteCoinPairProps);
    return  (
      <div>
    <AppBar title="Crypto-Trakr" className="favorite-coin-appbar" iconStyleRight={{
      margin:0
    }}>
     <AddCurrencyPairDialog closeDialog={this.closeDialog} dialogOpen={this.state.dialogOpen}/>
    </AppBar>
    {LoadingFavoriteCoinPairInner}
    </div>
    );
  }
}
const CnctedFavoriteCoinPairContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteCoinPairContainer)
export default CnctedFavoriteCoinPairContainer;
