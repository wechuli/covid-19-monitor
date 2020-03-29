// pg queries

// insert data into the table
let insertDataQuery =
  "INSERT INTO flatdata(country, date, cases,deaths,name,countryterritorycode,population) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING ;";

// select every country affetced
let getAllCountriesQuery = "SELECT DISTINCT name,country from flatdata;";

//quickstats
let quickStatsQuery =
  "SELECT sum(cases) total_cases,sum(deaths) total_deaths,(SELECT count(DISTINCT country) from flatdata) affected_countries from flatdata;";

// total cases and deaths grouped by country
let totalDeathsAndCasesGroupedByCountryQuery =
  "SELECT country,name,sum(deaths) deaths,sum(cases) cases from flatdata GROUP BY country, name ORDER BY sum(cases) desc,sum(deaths) desc;";

// cases and deaths for specific country grouped by the date
let getCasesAndDeathsPerCountryPerDateQuery =
  "SELECT country,name,cases,deaths,date from flatdata WHERE country=$1 ORDER BY date asc";

// get unique dates from db

let getUniqueDatesQuery = "SELECT DISTINCT date from flatdata;";

module.exports = {
  insertDataQuery,
  getAllCountriesQuery,
  getCasesAndDeathsPerCountryPerDateQuery,
  quickStatsQuery,
  totalDeathsAndCasesGroupedByCountryQuery,
  getUniqueDatesQuery
};
