const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");

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
