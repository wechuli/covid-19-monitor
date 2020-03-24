// const { Client } = require("pg");
// const fs = require("fs");
// const {
//   confirmedCasesGlobalURL,
//   confirmedDeathsGlobalURL,
//   fetchAndFormatData
// } = require("../helpers/covidDataFetcher");
// const {
//   StatusInternalServerError,
//   StatusOK
// } = require("../helpers/httpErrors");

// const client = new Client();
// client.connect();

// // pg querie

// // inster into countries table

// let countriesQuery =
//   "INSERT INTO country(name, latitude, longitude) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING ;";

// let casesQuery =
//   "INSERT INTO cases(province,country,date,number) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING";

// let deathQuery =
//   "INSERT INTO deaths(province,country,date,number) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING";

// let getAllCountriesQuery = "SELECT * FROM country;";

// let getCasesPerCountryQuery = "SELECT * FROM cases WHERE country = $1";
// let getDeathPerDeathQuery = "SELECT * FROM deaths WHERE country = $1";
// let totalCasesQuery =
//   "SELECT country, MAX(number) FROM cases GROUP BY country ORDER by country";

// let quickStatsQuery =
//   "SELECT sum(cases.cases) total_cases,sum(cases.deaths) total_deaths,(SELECT  count(DISTINCT country) from cases) affected_countries from cases;";

// module.exports = {
//   async refreshData(req, res) {
//     try {
//       const casesData = await fetchAndFormatData(confirmedCasesGlobalURL);
//       const deathData = await fetchAndFormatData(confirmedDeathsGlobalURL);

//       await insertToDB(casesData, casesQuery);
//       await insertToDB(deathData, deathQuery);
//       res.status(StatusOK).json({ message: "Data updated" });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   },
//   async getAllCountries(req, res) {
//     try {
//       const response = await client.query(getAllCountriesQuery);
//       res.status(StatusOK).json({ data: response.rows, error: false });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   },
//   async getAllCasesByCountries(req, res) {
//     const { country } = req.params;
//     try {
//       const response = await client.query(getCasesPerCountryQuery, [country]);
//       res.status(StatusOK).json({ data: response.rows, error: false });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   },

//   async getAllDeathsByCountries(req, res) {
//     const { country } = req.params;
//     try {
//       const response = await client.query(getDeathPerDeathQuery, [country]);
//       res.status(StatusOK).json({ data: response.rows, error: false });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   },

//   async totalCasesByCountry(req, res) {
//     try {
//       const response = await client.query(totalCasesQuery);
//       res.status(StatusOK).json({ data: response.rows, error: false });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   },

//   async quickStats(req, res) {
//     try {
//       const response = await client.query(quickStatsQuery);
//       res.status(StatusOK).json({ data: response.rows, error: false });
//     } catch (error) {
//       res.status(StatusInternalServerError).json({ error });
//     }
//   }
// };

// async function insertToDB(data, query) {
//   try {
//     for (let i = 0; i < data.length; i++) {
//       let countryValues = [
//         data[i]["country"],
//         data[i]["latitude"],
//         data[i]["longitude"]
//       ];
//       let dataValues = [
//         data[i]["province"],
//         data[i]["country"],
//         data[i]["date"],
//         data[i]["number"]
//       ];
//       await client.query(countriesQuery, countryValues);
//       await client.query(query, dataValues);
//     }
//     return true;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
