const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logoutUser,
//   googleSignin,
//   googleSigninCallback,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logoutUser);
// router.get("/google", googleSignin); // يبدأ تسجيل الدخول عبر Google
// router.get("/google/callback", googleSigninCallback); // يعالج استجابة Google

module.exports = router;
