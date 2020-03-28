// pg queries

// insert into countries table

let casesQuery =
  "INSERT INTO cases(country, date, cases,deaths) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING ;";

let insertDataQuery =
  "INSERT INTO flatdata(country, date, cases,deaths,name,countryterritorycode,population) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING ;";

let getAllCountriesQuery = "SELECT DISTINCT name,country from flatdata;";

let getCasesAndDeathsPerCountryQuery =
  "SELECT co.country,co.name, ca.cases,ca.deaths,ca.date FROM cases ca FULL JOIN country co on ca.country = co.country WHERE ca.country = $1 ORDER BY  ca.date ASC ;";

let quickStatsQuery =
  "SELECT sum(cases.cases) total_cases,sum(cases.deaths) total_deaths,(SELECT  count(DISTINCT country) from cases) affected_countries from cases;";

let totalCasesGroupedByCountryQuery =
  "select country, sum(cases.cases) cases from cases GROUP BY country ORDER BY sum(cases.cases) DESC ;";
let totalDeathsGroupedByCountryQuery =
  "select country,sum(cases.deaths) deaths from cases GROUP BY country ORDER BY  sum(cases.deaths) DESC ;";

module.exports = {
  casesQuery,
  getAllCountriesQuery,
  getCasesAndDeathsPerCountryQuery,
  quickStatsQuery,
  totalCasesGroupedByCountryQuery,
  totalDeathsGroupedByCountryQuery,
  insertDataQuery
};
