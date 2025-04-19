const express = require("express");
const router = express.Router();
const {
  checkoutController,
  stripeController,
} = require("../controllers/checkoutController");

router.post("/paycash", checkoutController);
router.post("/paypaypal", checkoutController);
router.post("/create-stripe-session", stripeController);

module.exports = router;
