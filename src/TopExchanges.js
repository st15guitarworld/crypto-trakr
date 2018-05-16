import React, {Component} from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';
import {fetchTopExchanges} from "./actions";
import TableBuilder from "./TableBuilder";
import CCC from "./ccc-streamer-utilities";
import TopExchangesForm from "./TopExchangesForm";
import FilterList from 'material-ui/svg-icons/content/filter-list';
import FlatButton from 'material-ui/FlatButton';
import ScrollUp from './ScrollUp.js';

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
  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterIsOpen = false;
    this.closeFilters = this.closeFilters.bind(this);
  }
  closeFilters() {
    this.setState({filterIsOpen:false});
  }
  componentWillMount(){
    this.props.fetchTheTopExchanges();
  }
  render(){

    return (
      <div>
        <FlatButton
      icon={<FilterList/>}
      style={{
        float:"right"
      }}
      onClick={()=> this.setState({filterIsOpen:true})}
    />
      {/* <TopExchangesForm /> */}
      <div style={{clear:"both"}}>
      {TableBuilder.buildSimpleTable(this.props.data)}
      </div>
      <ScrollUp isOpen={this.state.filterIsOpen} title="Filters" close={this.closeFilters}>
        <TopExchangesForm close={this.closeFilters}/>
     </ScrollUp>
      </div>
    );

  }
}

let cnnectedTopExchanges = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopExchanges);

export default cnnectedTopExchanges;
