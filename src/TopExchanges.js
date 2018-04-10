import React, {Component} from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';
import {fetchTopExchanges} from "./actions";
import TableBuilder from "./TableBuilder";
import CCC from "./ccc-streamer-utilities";
import TopExchangesForm from "./TopExchangesForm";

function topExchangesRawToDisplay(exhanges) {
  return exhanges.map(exchange => ({
    "Exchange" : exchange.MARKET,
    "Volume 24H" : CCC.STATIC.CURRENCY.getSymbol(exchange.TOSYMBOL) + " " + CCC.STATIC.UTIL.reduceFloatVal(exchange.VOLUME24HOUR),
    "Volume 24H To": CCC.STATIC.CURRENCY.getSymbol(exchange.TOSYMBOL) + " " +CCC.STATIC.UTIL.reduceFloatVal(exchange.VOLUME24HOURTO)
  }))
}

const mapStateToProps = (state,props) => {
  return {
    data: topExchangesRawToDisplay(state.topExchanges.topExchanges)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTheTopExchanges:() => dispatch(fetchTopExchanges())
  };
}

class TopExchanges extends Component {
  componentWillMount(){
    this.props.fetchTheTopExchanges();
  }
  render(){

    return (
      <div>
      <TopExchangesForm />
      {TableBuilder.buildSimpleTable(this.props.data)}
      </div>
    );

  }
}

let cnnectedTopExchanges = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopExchanges);

export default cnnectedTopExchanges;
