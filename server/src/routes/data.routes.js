const express = require("express");
const router = express.Router();

const {
  refreshData,
  getAllCountries,
  quickStats,
  getAllCasesandDeathsByCountry,
  getTotalCasesAndDeathsGroupedByCountry,
  refreshDataEfficient
} = require("../controllers/main.controllers");

router.get("/refresh", refreshDataEfficient);
router.get("/allcountries", getAllCountries);
router.get("/stats", quickStats);
router.get("/cases/:country", getAllCasesandDeathsByCountry);
router.get("/casesbycountry", getTotalCasesAndDeathsGroupedByCountry);

module.exports = router;
