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

      buttons: [{
          type: 'day',
          count: 1,
          text: '1D',
          events: {
            click: function() {
              const dateRange = FetchDateRangeData(this.text);
              onRangeSelected(dateRange);
              return true;  // Allow Highcharts default behavior to proceed
            }
          }
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
      }]
    },
    chart: {
      events: {
        load: function() {
          this.rangeSelector.buttons.forEach((button, index) => {
            button.element.onclick = (e) => {
              console.log("Button clicked:", button.textStr);
;
              const dateRange = FetchDateRangeData(button.textStr);
              onRangeSelected(dateRange);
            };
          });
        }
      }
    },
    series: [{
      name: 'Stock Value',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }],
    tooltip: {
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}: {point.y:.2f}'
  }
  
  };

  return (
    <HighchartsReact
      key={JSON.stringify(data)} 
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default Chart;

