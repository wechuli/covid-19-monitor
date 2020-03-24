const express = require("express");
const router = express.Router();

const {
  refreshCountryData,
  refreshData,
  getAllCountries,
  getAllCasesandDeathsByCountries,
  totalCasesGroupedByCountry,
  totalDeathsGroupedByCountry,
  quickStats
} = require("../controllers/main.controllers");

router.get("/refresh", refreshData);
router.get("/allcountries", getAllCountries);
router.get("/stats", quickStats);
router.get("/cases/:country", getAllCasesandDeathsByCountries);
router.get("/countryrefresh", refreshCountryData);

router.get("/casesbycountry", totalCasesGroupedByCountry);
router.get("/deathsbycountry", totalDeathsGroupedByCountry);

module.exports = router;
