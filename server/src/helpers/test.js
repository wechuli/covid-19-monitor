const axios = require("axios");
const moment = require("moment");

const confirmedCasesGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const confirmedDeathsGlobalURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

axios
  .get(confirmedCasesGlobalURL)
  .then(response => {
    const individualentries = [];
    const alldata = response.data.split(/\r?\n/);

    //get the rows
    const rows = alldata[0].split(",");

    //loop through the data

    for (let i = 1; i < alldata.length; i++) {
      const element = alldata[i].split(",");

      for (let m = 4; m < element.length; m++) {
        const data = {
          [rows[0]]: element[0],
          [rows[1]]: element[1],
          [rows[2]]: element[2],
          [rows[3]]: element[3],
          date: moment.utc(rows[m], "MM/DD/YYYY").format(),
          number: parseInt(element[m])
        };
        individualentries.push(data);
      }
    }
    console.log(individualentries.slice(100, 127));
  })
  .catch(error => console.log(error));
