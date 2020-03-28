const axios = require("axios");
const moment = require("moment");

const dataURL =
  "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";
async function fetchRawJSONData(url) {
  try {
    const response = await axios.get(url);
    return response.data.records;
  } catch (error) {
    throw new Error(error);
  }
}

function formatJSONData(dataArray) {
  const formattedData = dataArray.map(record => {
    return {
      country: record["geoId"],
      date: moment.utc(record["dateRep"], "DD/MM/YYYY").format(),
      cases: parseInt(record["cases"]) ? parseInt(record["cases"]) : 0,
      deaths: parseInt(record["deaths"]) ? parseInt(record["deaths"]) : 0,
      name: record["countriesAndTerritories"],
      countryterritorycode: record["countryterritoryCode"],
      population: parseInt(record["popData2018"])
        ? parseInt(record["popData2018"])
        : 0
    };
  });
  return formattedData;
}

async function fetchAndFormatData() {
  try {
    const data = await fetchRawJSONData(dataURL);
    const formattedData = formatJSONData(data);
    return formattedData;
  } catch (error) {
    throw new Error(err);
  }
}

module.exports = {
  fetchAndFormatData
};
