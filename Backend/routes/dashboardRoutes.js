const express = require("express");
const {
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
  getUsers,
  getAllDrivers,
  getAllBuses,
  getRecentActivities,
  getWeeklyActivity,
  getBookingStatistics,
} = require("../controllers/dashboardController");
const { approveDriver, rejectDriver } = require("../controllers/driverConroller");


const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/driver-requests", getDriverRequests);

router.get("/contact-messages", getContactMessages);

router.post("/admin/reply-message", replyToMessage);

router.put("/drivers/:driverId/approve", approveDriver);
router.put("/drivers/:driverId/reject", rejectDriver);

router.get("/users", getUsers);
router.get("/drivers", getAllDrivers);
router.get("/buses", getAllBuses);

router.get("/recent-activities", getRecentActivities);
router.get("/weekly-activity", getWeeklyActivity);
router.get("/booking-statistics", getBookingStatistics);

module.exports = router;
