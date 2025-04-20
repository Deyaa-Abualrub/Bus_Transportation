const express = require('express');
const router = express.Router();
const {getApprovedTestimonials , createTestimonial} = require('../controllers/testimonialsController');

router.get('/testimonials', getApprovedTestimonials);
router.post('/testimonials', createTestimonial);

module.exports = router;