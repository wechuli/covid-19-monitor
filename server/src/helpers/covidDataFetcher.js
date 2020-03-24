const axios = require("axios");
const moment = require("moment");

const confirmedCasesGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const confirmedDeathsGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

function formatCSVData(responseString) {
  const formattedData = [];
  const dataToken = responseString.split(/\r?\n/);

  //get the row headers
  const rows = dataToken[0].split(",");

  //loop through the data, ignoring the first row

  for (let i = 1; i < dataToken.length; i++) {
    const element = dataToken[i].split(",");

    for (let j = 4; j < element.length; j++) {
      let data;

      let date = moment.utc(rows[j], "MM/DD/YYYY");

      if (date.isValid()) {
        data = {
          province: element[0],
          country: element[1],
          latitude: element[2],
          longitude: element[3],
          date: moment.utc(rows[j], "MM/DD/YYYY").format(),
          number: parseInt(element[j])
        };

        formattedData.push(data);
      }
    }
  }
  return formattedData;
}

async function fetchAndFormatData(url) {
  const responseString = await fetchData(url);
  return formatCSVData(responseString);
}

module.exports = {
  fetchAndFormatData,
  confirmedCasesGlobalURL,
  confirmedDeathsGlobalURL
};
