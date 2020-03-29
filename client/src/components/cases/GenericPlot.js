import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const lineColor = {
  Cases: "lightblue",
  Deaths: "#ff6666"
};
const GenericPlot = props => {
  const { country, name, seriesData, casesOrDeaths } = props;

  const options = {
    title: {
      text: `${casesOrDeaths}`
    },
    credits: false,
    chart: {
      zoomType: "x"
    },
    xAxis: {
      type: "datetime"
    },

    // legend: {
    //   layout: "vertical",
    //   align: "right",
    //   verticalAlign: "middle"
    // },
    plotOptions: {
      line: {
        color: lineColor[casesOrDeaths]
      }
    },
    series: [
      {
        name: casesOrDeaths,

        data: seriesData
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

  return (
    <div style={{marginTop:"20px",padding:"20px"}}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default GenericPlot;
