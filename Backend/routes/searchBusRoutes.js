const express = require("express");
const router = express.Router();
const { searchBus } = require("../controllers/searchBusController");

router.post("/searchbus", searchBus);

module.exports = router;

