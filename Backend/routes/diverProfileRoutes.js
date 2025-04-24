const express = require("express");
const router = express.Router();
const {
  getDriverProfile,
  updateBusStatusByDriver,
  updateDriverInfo,
} = require("../controllers/driverProfileController");

router.get("/profile/:driver_id", getDriverProfile);
router.put("/bus-status/:driver_id", updateBusStatusByDriver);
router.put("/update/:driver_id", updateDriverInfo);


module.exports = router;
