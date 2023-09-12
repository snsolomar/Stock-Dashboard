import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import FetchDateRangeData from '../constants/FetchDateRangeData';


const Chart = ({ data, chartTitle = 'Price Chart', onRangeSelected }) => {

  const options = {
    title: {
      text: chartTitle
    },
    rangeSelector: {
      selected: 1,
      buttons: [{
          type: 'day',
          count: 1,
          text: '1D',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('1D');
                  onRangeSelected(dateRange);
                  return false; // prevents the default behavior
              }
          }
      }, {
          type: 'day',
          count: 5,
          text: '5D',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('5D');
                  onRangeSelected(dateRange);
                  return false;
              }
          }
      }, {
          type: 'month',
          count: 1,
          text: '1M',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('1M');
                  onRangeSelected(dateRange);
                  return false;
              }
          }
      }, {
          type: 'month',
          count: 6,
          text: '6M',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('6M');
                  onRangeSelected(dateRange);
                  return false;
              }
          }
      }, {
          type: 'year',
          count: 1,
          text: '1Y',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('1Y');
                  onRangeSelected(dateRange);
                  return false;
              }
          }
      }, {
          type: 'year',
          count: 5,
          text: '5Y',
          events: {
              click: function() {
                  const dateRange = FetchDateRangeData('5Y');
                  onRangeSelected(dateRange);
                  return false;
              }
          }
      }]
    },
    series: [{
      name: 'Stock Value',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  };

  return (
    <HighchartsReact 
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default Chart;


