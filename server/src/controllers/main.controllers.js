const { Client } = require("pg");
const fs = require("fs");
const moment = require("moment");

const {
  StatusInternalServerError,
  StatusOK
} = require("../helpers/httpErrors");

const { fetchAndFormatData } = require("../helpers/covidDataFetcher");

// queries
const {
  insertDataQuery,
  getAllCountriesQuery,
  getCasesAndDeathsPerCountryPerDateQuery,
  quickStatsQuery,
  totalDeathsAndCasesGroupedByCountryQuery,
  getUniqueDatesQuery
} = require("../helpers/dataQueries");

const client = new Client();
client.connect();

module.exports = {
  // refresh daily data - inneficcinet query
  async refreshData(req, res) {
    req.setTimeout(5000000);
    try {
      const data = await fetchAndFormatData();

      for (let i = 0; i < data.length; i++) {
        await client.query(insertDataQuery, [
          data[i].country,
          data[i].date,
          data[i].cases,
          data[i].deaths,
          data[i].name,
          data[i].countryterritorycode,
          data[i].population
        ]);
      }
      res.status(StatusOK).json({ message: "data updated" });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  // more efficient data refresh - works on the assumption that data is updated only once - from European agency
  async refreshDataEfficient(req, res) {
    try {
      const data = await fetchAndFormatData();

      // query the db for unuique dates
      const response = await client.query(getUniqueDatesQuery);

      const lookupDates = {};
      response.rows.forEach((row, index) => {
        lookupDates[
          moment(row.date)
            .utc()
            .format()
        ] = true;
      });

      const uniqueNewEntries = [];
      data.forEach(item => {
        if (!lookupDates[item.date.toString()]) {
          uniqueNewEntries.push(item);
        }
        return;
      });

      // insert the new entries in the db
      for (let i = 0; i < uniqueNewEntries.length; i++) {
        await client.query(insertDataQuery, [
          data[i].country,
          data[i].date,
          data[i].cases,
          data[i].deaths,
          data[i].name,
          data[i].countryterritorycode,
          data[i].population
        ]);
      }

      res.status(StatusOK).json({
        uniqueData: uniqueNewEntries,
        message: "data succeffully updated",
        error: false
      });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error: error.message });
    }
  },

  //  get all countries affected (name, country code)
  async getAllCountries(req, res) {
    try {
      const response = await client.query(getAllCountriesQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },
  // quick stats about the number of countries affetced and total cases
  async quickStats(req, res) {
    try {
      const response = await client.query(quickStatsQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  //  get per country Info
  async getAllCasesandDeathsByCountry(req, res) {
    const { country } = req.params;
    try {
      const response = await client.query(
        getCasesAndDeathsPerCountryPerDateQuery,
        [country]
      );
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },
  //  get per country Info
  async getTotalCasesAndDeathsGroupedByCountry(req, res) {
    try {
      const response = await client.query(
        totalDeathsAndCasesGroupedByCountryQuery
      );
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  }
};
