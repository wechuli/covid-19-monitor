import React, { useState, useEffect } from "react";
import {} from "antd";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const Cases = props => {
  const { country } = props;
  const [caseData, setCaseData] = useState({ country: "", series: [] });
  const [deathsData, setDeathsData] = useState({ country: "", series: [] });

  const options = {
    title: {
      text: `Cases and Deaths from Covid-19 in ${country}`
    },
    credits: false,
    chart: {
      zoomType: "x"
    },
    xAxis:{
      type:'datetime'
    },
    
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    series: [
      {
        name: "cases",
        // type:"area",
        data: caseData.series
      },
      {
        name: "deaths",
        type:"area",
        data: deathsData.series
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/data/cases/${country}`
      );
      console.log("i was here");
      let caseSeries = [];
      let deathSeries = [];

      response.data.data.forEach(item => {
            const date = Date.parse(item["date"]);
        const cases = item["cases"];
        const deaths = item["deaths"];

        caseSeries.push([date, cases]);
        deathSeries.push([date, deaths]);
      });

      setCaseData({ country: "Italy", series: caseSeries });
      setDeathsData({ country: "Italy", series: deathSeries });
    }
    fetchData();
  }, [country]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}        
        options={options}
      />
    </div>
  );
};

export default Cases;
