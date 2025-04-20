const Testimonial = require("../models/Testimonials");
const User = require("../models/User");

const getApprovedTestimonials = async (req, res) => {
  try {
    console.log("🔍 Fetching approved testimonials...");
    const testimonials = await Testimonial.findAll({
      where: { status: "approved" },
      include: {
        model: User,
        as: "User", 
        attributes: ["full_name"],
      },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(testimonials);
  } catch (err) {
    console.error("❌ Error in getApprovedTestimonials:", err);
    res
      .status(500)
      .json({ message: "Error fetching testimonials", error: err.message });
  }
};

console.log("Testimonial associations:", Object.keys(Testimonial.associations));

const createTestimonial = async (req, res) => {
  try {
    const { user_id, message, rating } = req.body;
    const newTestimonial = await Testimonial.create({
      user_id,
      message,
      rating,
      status: "pending",
    });
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: "Error creating testimonial", error: err });
  }
};

module.exports = {
  getApprovedTestimonials,
  createTestimonial,
};
