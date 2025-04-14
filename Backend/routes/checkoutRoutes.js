const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/paycash", checkoutController);  
router.post("/payvisa", checkoutController);  
router.post("/paycredit", checkoutController);  

module.exports = router;

