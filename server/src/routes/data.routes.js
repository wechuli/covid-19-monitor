const express = require("express");
const router = express.Router();

const { refreshData } = require("../controllers/data.controllers");

router.get("/refresh", refreshData);

module.exports = router;
