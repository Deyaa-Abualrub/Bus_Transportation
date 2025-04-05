const express = require("express");
const router = express.Router();
const { signup, signin, logoutUser , profile , updateProfile } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logoutUser);
router.get("/profile/:user_id", profile);  
router.put("/profile/:user_id", updateProfile); 

module.exports = router;