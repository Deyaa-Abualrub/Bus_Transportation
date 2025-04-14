const express = require("express");
const {
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
  getUsers
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/driver-requests", getDriverRequests);

router.get("/contact-messages", getContactMessages);

router.post("/admin/reply-message", replyToMessage); 

router.get("/users", getUsers);

module.exports = router;
