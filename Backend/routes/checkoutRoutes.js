const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/paycash", checkoutController);  // الدفع نقدي
router.post("/payvisa", checkoutController);  // الدفع بالفيزا
router.post("/paycredit", checkoutController);  // الدفع باستخدام بطاقة الائتمان

module.exports = router;

