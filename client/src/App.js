import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, Spin, Select } from "antd";
import Statistics from "./components/statistics/Statistics";
import Cases from "./components/cases/Cases";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const { Option } = Select;

  const { Title, Text } = Typography;

  //fetch starts
  useEffect(() => {
    handleChange("KE");
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
      setCountries(response.data);
    }
    fetchData();
  }, []);

  const handleChange = value => {
    setSelectedCountry(value);
  };
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
          <div>
            <Statistics data={data} />
          </div>
        )}

        <Title level={4}>Cases and Deaths Per Country</Title>

        {countries.length === 0 ? (
          <div className="spiner">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <Select
              style={{ width: "25%", margin: "20 0" }}
              onChange={handleChange}
              tokenSeparators={[","]}
              defaultValue={["Kenya"]}
            >
              {countries.data.map(item => (
                <Option key={item.country}>{item.name}</Option>
              ))}
            </Select>

            <Cases country={selectedCountry} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
