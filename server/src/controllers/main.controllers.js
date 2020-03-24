const { Client } = require("pg");
const fs = require("fs");
const {
  readCSV,
  countryFormater,
  casesFormatter
} = require("../helpers/loadContries");

const {
  StatusInternalServerError,
  StatusOK
} = require("../helpers/httpErrors");

const client = new Client();
client.connect();

// pg querie

// inster into countries table

let countriesQuery =
  "INSERT INTO country(country, latitude, longitude,name) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING ;";

let casesQuery =
  "INSERT INTO cases(country, date, cases,deaths) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING ;";

let getAllCountriesQuery = "SELECT * FROM country;";

let getCasesAndDeathsPerCountryQuery =
  "SELECT co.country,co.name, ca.cases,ca.deaths,ca.date FROM cases ca FULL JOIN country co on ca.country = co.country WHERE ca.country = $1 ORDER BY  ca.date ASC ;";

let totalCasesQuery =
  "SELECT country, MAX(number) FROM cases GROUP BY country ORDER by country";

let quickStatsQuery =
  "SELECT sum(cases.cases) total_cases,sum(cases.deaths) total_deaths,(SELECT  count(DISTINCT country) from cases) affected_countries from cases;";

let totalCasesGroupedByCountryQuery =
  "select country, sum(cases.cases) cases from cases GROUP BY country ORDER BY sum(cases.cases) DESC ;";
let totalDeathsGroupedByCountryQuery =
  "select country,sum(cases.deaths) deaths from cases GROUP BY country ORDER BY  sum(cases.deaths) DESC ;";

module.exports = {
  // refresh daily data
  async refreshData(req, res) {
    try {
      const countriesData = await readCSV(
        "server/src/data/latest.csv",
        casesFormatter
      );
      countriesData.forEach(item => {
        client
          .query(casesQuery, [item.country, item.date, item.cases, item.deaths])
          .then(() => {})
          .catch(error => {
            throw new Error(error);
          });
      });
      res.status(StatusOK).json({ message: "countries updated" });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  //refresh countries data
  async refreshCountryData(req, res) {
    try {
      const countriesData = await readCSV(
        "server/src/data/countries.csv",
        countryFormater
      );

      countriesData.forEach(item => {
        client
          .query(countriesQuery, [
            item.country,
            item.latitude,
            item.longitude,
            item.name
          ])
          .then(() => {})
          .catch(() => {
            throw new Error("SQL insert error");
          });
      });
      res.status(StatusOK).json({ message: "countries updated" });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  //   get all countries cases and deaths
  async getAllCountries(req, res) {
    try {
      const response = await client.query(getAllCountriesQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },
  async getAllCasesandDeathsByCountries(req, res) {
    const { country } = req.params;
    try {
      const response = await client.query(getCasesAndDeathsPerCountryQuery, [
        country
      ]);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  async totalCasesGroupedByCountry(req, res) {
    try {
      const response = await client.query(totalCasesGroupedByCountryQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },

  async totalDeathsGroupedByCountry(req, res) {
    try {
      const response = await client.query(totalDeathsGroupedByCountryQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  },
  async quickStats(req, res) {
    try {
      const response = await client.query(quickStatsQuery);
      res.status(StatusOK).json({ data: response.rows, error: false });
    } catch (error) {
      res.status(StatusInternalServerError).json({ error });
    }
  }
};
