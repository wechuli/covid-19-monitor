const { Client } = require("pg");
const fs = require("fs");
const {
  confirmedCasesGlobalURL,
  confirmedDeathsGlobalURL,
  fetchAndFormatData
} = require("../helpers/covidDataFetcher");
const {
  StatusInternalServerError,
  StatusOK
} = require("../helpers/httpErrors");

const client = new Client();
client.connect();

// pg querie

// inster into countries table

let countriesQuery =
  "INSERT INTO country(name, latitude, longitude) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING ;";

let casesQuery =
  "INSERT INTO cases(province,country,date,number) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING";

let deathQuery =
  "INSERT INTO deaths(province,country,date,number) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING";

module.exports = {
  async refreshData(req, res) {
    try {
      const casesData = await fetchAndFormatData(confirmedCasesGlobalURL);
      const deathData = await fetchAndFormatData(confirmedDeathsGlobalURL);

      await insertToDB(casesData, casesQuery);
      await insertToDB(deathData, deathQuery);
      res.status(StatusOK).json({ message: "Data updated" });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  }
};

async function insertToDB(data, query) {
  try {
    for (let i = 0; i < data.length; i++) {
      let countryValues = [
        data[i]["country"],
        data[i]["latitude"],
        data[i]["longitude"]
      ];
      let dataValues = [
        data[i]["province"],
        data[i]["country"],
        data[i]["date"],
        data[i]["number"]
      ];
      await client.query(countriesQuery, countryValues);
      await client.query(query, dataValues);
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
data = {
  province: "",
  country: "Albania",
  latitude: "41.1533",
  longitude: "20.1683",
  date: "2020-02-28T00:00:00Z",
  number: 0
};
