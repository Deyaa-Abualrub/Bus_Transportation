const express = require("express");
const router = express.Router();
const {
  checkoutController,
  stripeController,
  getInvoiceById
} = require("../controllers/checkoutController");

router.post("/paycash", checkoutController);
router.post("/paypaypal", checkoutController);
router.post("/create-stripe-session", stripeController);

router.post("/invoice/:bookingId", getInvoiceById);


module.exports = router;
