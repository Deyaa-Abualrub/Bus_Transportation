const express = require("express");
const {
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
  getUsers,
  getAllDrivers,
  getAllBuses,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/driver-requests", getDriverRequests);

router.get("/contact-messages", getContactMessages);

router.post("/admin/reply-message", replyToMessage);

router.get("/users", getUsers);
router.get("/drivers", getAllDrivers);
router.get("/buses", getAllBuses);

module.exports = router;
