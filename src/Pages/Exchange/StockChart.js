import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import HSIndicators from 'highcharts/indicators/indicators.js';
HC_more(Highcharts);
HSIndicators(Highcharts);

Highcharts.seriesTypes.column.prototype.pointAttribs = (function (func) {
  return function (point, state) {
    let attribs = func.apply(this, arguments);
    let candleSeries = this.chart.series[0];
    let candlePoint = candleSeries.points.filter(function (p) {
      return p.index == point.index;
    })[0];

    let color = candlePoint.open < candlePoint.close ? '#f0c7ce' : '#cbdef2';
    attribs.fill = color;

    return attribs;
  };
})(Highcharts.seriesTypes.column.prototype.pointAttribs);

function StockChart({ selectedCoin, selectedFakeCoin }) {
  const [options, setOptions] = useState({
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      inputEnabled: false,
      allButtonsEnabled: true,
      buttons: [
        {
          count: 1,
          type: 'minute',
          text: '1m',
        },
        {
          count: 3,
          type: 'minute',
          text: '3m',
        },
        {
          count: 1,
          type: 'hour',
          text: '1H',
        },
        {
          count: 2,
          type: 'hour',
          text: '2H',
        },
        {
          count: 1,
          type: 'day',
          text: '1D',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },
    plotOptions: {
      candlestick: {
        color: '#1763b6',
        upColor: '#e12343',
        lineColor: '#1763b6',
        upLineColor: '#e12343',
      },
    },
    chart: {
      zoomKey: 'shift',
      zoomType: 'xy',
    },
    xAxis: {
      type: 'datetime',
      skipKeyboardNavigation: true,
      crosshair: {
        label: {
          enable: true,
        },
      },
    },
    yAxis: [
      {
        title: {
          text: '',
        },
        height: '90%',
        lineWidth: 0,
        resize: {
          enabled: true,
        },
      },
      {
        title: {
          text: '',
        },
        top: '80%',
        height: '20%',
        offset: 0,
        lineWidth: 0,
        resize: {
          enabled: true,
        },
      },
    ],
    series: [
      {
        type: 'candlestick',
        name: 'candle',
        data: [],
      },
      {
        type: 'column',
        name: 'volume',
        data: [],
        yAxis: 1,
      },
    ],
  });

  useEffect(() => {
    if (selectedFakeCoin === selectedCoin) {
      fetch(`http://10.58.7.141:8000/orders/reports/${selectedCoin}`)
        .then((res) => res.json())
        .then((res) => {
          let ohlc = [];
          let volume = [];
          res.report_data.map((data) => {
            ohlc.push([
              data.reported_time,
              Number(data.opening_price),
              Number(data.high_price),
              Number(data.low_price),
              Number(data.closing_price),
            ]);
            volume.push([data.reported_time, Number(data.transaction_volume)]);
          });
          setOptions({
            series: [
              {
                type: 'candlestick',
                id: 'candle',
                data: ohlc,
              },
              {
                type: 'column',
                data: volume,
              },
              {
                type: 'sma',
                linkedTo: 'candle',
                color: '#ff7530',
                lineWidth: 1,
                params: {
                  period: 15,
                },
                marker: {
                  enabled: false,
                },
              },
              {
                type: 'sma',
                linkedTo: 'candle',
                color: '#5cc492',
                lineWidth: 1,
                params: {
                  period: 50,
                },
                marker: {
                  enabled: false,
                },
              },
            ],
          });
        });
    } else {
      fetch(
        `http://localhost:3000/data/Main/stockMockData_${selectedFakeCoin}.json`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          let ohlc = [];
          let volume = [];
          res.data.map((data) => {
            ohlc.push([
              Date.parse(data.date),
              Number(data.open),
              Number(data.high),
              Number(data.low),
              Number(data.closing_price),
            ]);
            volume.push([Date.parse(data.date), Number(data.volume)]);
          });
          setOptions({
            series: [
              {
                type: 'candlestick',
                id: 'candle',
                data: ohlc,
              },
              {
                type: 'column',
                data: volume,
              },
              {
                type: 'sma',
                linkedTo: 'candle',
                color: '#ff7530',
                lineWidth: 1,
                params: {
                  period: 15,
                },
                marker: {
                  enabled: false,
                },
              },
              {
                type: 'sma',
                linkedTo: 'candle',
                color: '#5cc492',
                lineWidth: 1,
                params: {
                  period: 50,
                },
                marker: {
                  enabled: false,
                },
              },
            ],
          });
        });
    }
  }, [selectedCoin, selectedFakeCoin]);

  return (
    <HighchartsReact
      constructorType={'stockChart'}
      highcharts={Highcharts}
      options={options}
    />
  );
}
export default StockChart;
