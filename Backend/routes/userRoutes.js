const express = require("express");
const router = express.Router();
const { signup, signin, logoutUser , profile , updateProfile ,getUserBookings , getUserTestimonials } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logoutUser);
router.get("/profile/:user_id", profile);  
router.get("/profile/:user_id/bookings", getUserBookings);  
router.get("/profile/:user_id/testimonials", getUserTestimonials);  
router.put("/profile/:user_id/", updateProfile); 

module.exports = router;