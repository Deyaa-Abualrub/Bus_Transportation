const express = require("express");
const {
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/driver-requests", getDriverRequests);

router.get("/contact-messages", getContactMessages);

router.post("/admin/reply-message", replyToMessage); 

module.exports = router;
