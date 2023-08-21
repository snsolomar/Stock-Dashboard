import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const Chart = ({ data, chartTitle = 'Input Stock Name' }) => {
  const options = {
    title: {
      text: chartTitle
    },
    rangeSelector: {
      selected: 1,
      buttons: [{
          type: 'day',
          count: 1,
          text: '1D'
      }, {
          type: 'day',
          count: 5,
          text: '5D'
      }, {
          type: 'month',
          count: 1,
          text: '1M'
      }, {
          type: 'month',
          count: 6,
          text: '6M'
      }, {
          type: 'year',
          count: 1,
          text: '1Y'
      }, {
          type: 'year',
          count: 5,
          text: '5Y'
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

  return <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
  />;
}


export default Chart
