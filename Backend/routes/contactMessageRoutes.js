const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/contactMessageControllers");

router.post("/contact", createMessage);

router.get("/contact/getmessages", getMessages);

module.exports = router;
