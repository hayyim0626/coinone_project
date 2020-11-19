import React, { useState, useEffect } from 'react';
import MainChart from './ChartComponent/MainChart';
import ChartNav from './ChartComponent/ChartNav';
import { wallstreetApi } from '../../../Config';

const Chart = () => {
  const SORT_MAPPER = {
    0: '#거래량많은',
    1: '#급등하는',
    2: '#급락하는',
    3: '#최근상장',
  };

  const [chartList, setChartList] = useState([]);
  const [navColor, setNavColor] = useState(SORT_MAPPER[0]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    let chartHistory = [];
    await fetch(`${wallstreetApi}/products`)
      .then((res) => res.json())
      .then(async (res) => {
        for (let i = 0; i <= 1; i++) {
          chartHistory[i] = {
            data: await fetch(
              `${wallstreetApi}/orders/reports/${res.message[i].product_id}`
            )
              .then((res) => res.json())
              .then((res) => res.report_data),
            coinName: res.message[i].abbreviation_name,
            present: res.message[i].price_now.toLocaleString(),
            upDown: res.message[i].change,
            volume: Math.floor(res.message[i].traded_money),
            id: res.message[i].product_id,
          };
        }
      });
    for (let i = 1; i <= 19; i++) {
      await fetch(`/data/Main/stockMockData_${i}.json`)
        .then((res) => res.json())
        .then((res) => {
          chartHistory[i + 1] = {
            data: res.data,
            coinName: res.data[res.data.length - 1].Name,
            present: res.data[
              res.data.length - 1
            ].closing_price.toLocaleString(),
            upDown:
              ((res.data[res.data.length - 100].closing_price -
                res.data[res.data.length - 190].closing_price) /
                res.data[100].closing_price) *
              100,
            volume: res.data[res.data.length - 1].volume,
            id: res.data[0].product_id,
          };
        });
    }
    setChartList(chartHistory.sort((a, b) => b.volume - a.volume));
  };

  const clickBtn = (e) => {
    setNavColor(e.target.id);
    changeList(e.target.id);
  };

  const changeList = (id) => {
    if (id === SORT_MAPPER[0]) {
      setChartList([...chartList].sort((a, b) => b.volume - a.volume));
    }

    if (id === SORT_MAPPER[1]) {
      setChartList([...chartList].sort((a, b) => b.upDown - a.upDown));
    }
    if (id === SORT_MAPPER[2]) {
      setChartList([...chartList].sort((a, b) => a.upDown - b.upDown));
    }
    if (id === SORT_MAPPER[3]) {
      setChartList(
        [...chartList].sort(function (a, b) {
          if (a.coinName > b.coinName) return 1;
          if (a.coinName < b.coinName) return -1;
          return 0;
        })
      );
    }
  };

  return (
    <>
      <ChartNav
        navColor={navColor}
        clickBtn={clickBtn}
        sortMapper={SORT_MAPPER}
      />
      <MainChart chartList={chartList} />
    </>
  );
};

export default Chart;
