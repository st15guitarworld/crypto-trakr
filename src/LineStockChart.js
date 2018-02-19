import React,{ Component } from 'react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip
} from 'react-jsx-highstock';
import PropTypes from 'prop-types';

let LineStockChart = (props) => {
  const { min, data} = props;
  return (
    <HighchartsStockChart>
       <Chart zoomType="x" />
       <Tooltip />

       <XAxis type="datetime">
         <XAxis.Title>Time</XAxis.Title>
       </XAxis>

       <YAxis id="price"  min={min}>
         <YAxis.Title>Price</YAxis.Title>
         <SplineSeries id="profit" name="Price"
           data={data}
          />
       </YAxis>
     </HighchartsStockChart>
  );
}

LineStockChart.propTypes = {
  data: PropTypes.array,
  min: PropTypes.number
};

export default withHighcharts(LineStockChart,Highcharts);
