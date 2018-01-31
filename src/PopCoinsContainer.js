import React from 'react';
import {GridList} from 'material-ui/GridList';
import { connect } from 'react-redux';
import PopCoinCard from './PopCoinCard';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 1000,
    height: 600,
    overflowY: 'auto',
    marginTop:'15px'
  },
};

let getPopularCoins = (allCoins)=> {
  if(allCoins.length <= 0){
    return [];
  }
  return allCoins.slice(0,4);
};

const mapStateToProps = state => {
  return {
    popularCoins:getPopularCoins(state.coins)
  }
}

const mapDispatchToProps = dispatch => {
  return {};
}

let PopCoinsContainer = (props) => (
  <div style={styles.root}>
   <GridList
     cellHeight={170}
     style={styles.gridList}
     cols={4}
   >{props.popularCoins.map((coin)=>(
     <PopCoinCard coin={coin}/>
   ))}
   </GridList>
</div>
);

const CnctedPopCoinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCoinsContainer)
export default CnctedPopCoinsContainer;
