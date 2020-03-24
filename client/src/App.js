import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, Spin } from "antd";
import Statistics from "./components/statistics/Statistics";
import Cases from "./components/cases/Cases";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);

  const { Title, Text } = Typography;

  //fetch starts
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:7493/api/data/stats");
      setData(response.data.data);
    }
    fetchData();
  }, []);

  //fetch all countries

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:7493/api/data/allcountries"
      );
      setCountries(response);
    }
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <div className="container">
        <Title level={3}>Covid-19 Monitoring Tool</Title>
        <Text>
          Find Below some simple analysis of the coronavirus statistics. The
          data is updated every day
        </Text>
        <Title level={4}>Summary Statistics</Title>
        {data.length === 0 || countries.length == 0 ? (
          <div className="spiner">
            <Spin size="large" />
          </div>
        ) : (
          <Statistics data={data} countries={countries} />
        )}

        <Cases />
      </div>
    </>
  );
}

export default App;
