const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");
const { Client } = require("pg");

function readCSV(filePath, dataFormater) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", data => {
        results.push(dataFormater(data));
      })
      .on("error", err => reject(err))
      .on("end", () => resolve(results));
  });
}

function countryFormater(data) {
  return data;
}

// DateRep,Day,Month,Year,Cases,Deaths,Countries and territories,GeoId
// date: moment.utc(rows[j], "MM/DD/YYYY").format(),

function casesFormatter(data) {
  return {
    country: data["GeoId"],
    date: moment.utc(data["DateRep"], "DD/MM/YYYY").format(),
    cases: data["Cases"],
    deaths: data["Deaths"]
  };
}

module.exports = {
  readCSV,
  countryFormater,
  casesFormatter
};

const client = new Client();
client.connect();

// let countriesQuery =
//   "INSERT INTO country(country, latitude, longitude,name) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING ;";

// readCSV("../data/countries.csv", countryFormater).then(data =>
//   data.forEach(item => {
//     client.query(countriesQuery, [
//       item.country,
//       item.latitude,
//       item.longitude,
//       item.name
//     ]);
//   })
// );

// readCSV("../data/latest.csv", casesFormatter).then(data =>
//   console.log(data.slice(0, 10))
// );
