import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import GenericPlot from "./GenericPlot";

const Cases = props => {
  const { country, name } = props;
  const [caseData, setCaseData] = useState([]);
  const [deathsData, setDeathsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/data/cases/${country}`);     
      let caseSeries = [];
      let deathSeries = [];

      response.data.data.forEach(item => {
        const date = Date.parse(item["date"]);
        const cases = item["cases"];
        const deaths = item["deaths"];

        caseSeries.push([date, cases]);
        deathSeries.push([date, deaths]);
      });

      setCaseData(caseSeries);
      setDeathsData(deathSeries);
    }
    fetchData();
  }, [country]);

  return (
    <div>
      <Row>
        <Col span={12}>
          <GenericPlot
            name={name}
            seriesData={caseData}
            casesOrDeaths="Cases"
          />
        </Col>
        <Col span={12}>
          <GenericPlot
            name={name}
            seriesData={deathsData}
            casesOrDeaths="Deaths"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Cases;
