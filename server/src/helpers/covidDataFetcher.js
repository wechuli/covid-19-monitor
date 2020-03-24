const axios = require("axios");
const fs = require("fs");
const http = require("http");

const csv = require("csv-parser");

const confirmedCasesGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const confirmedDeathsGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

async function fetchCSVData(url) {
  try {
    const rawData = await axios.get(url);
    return rawData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

function readCSV(csvData) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvData)
      .pipe(csv())
      .on("data", data => {
        results.push(dataFormatter(data));
      })
      .on("error", err => reject(err))
      .on("end", () => resolve(results));
  });
}

const file = fs.createWriteStream("../data/confirmed.csv");
const fileD = fs.createWriteStream("../data/deaths.csv");

function dataFormatter(data) {
  return {
    ProvinceOrState: data["Province/State"],
    Country: data["Country/Region"],
    Latitude: data.Lat,
    Longitude: data.Long
  };
}

fetchCSVData(confirmedCasesGlobalURL).then(data => {
  console.log(typeof data);
  console.log(data.slice(0, 100));
});

// readCSV(confirmedCasesGlobalURL)
//   .then(response => response[0])
//   .catch(error => console.log(error));
