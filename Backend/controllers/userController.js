const Joi = require("joi");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Testimonial = require("../models/Testimonials");
const Bus = require("../models/Buses");
const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = Joi.object({
  full_name: Joi.string()
    .regex(/^\S+\s+\S+\s+\S+\s+\S+$/)
    .message("Full name must have at least 4 words")
    .required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { full_name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role: "user", // تأكد من تعيين دور المستخدم هنا إذا لم يكن موجودًا في الـ Request
    });

    const token = jwt.sign(
      { userId: newUser.user_id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        user_id: newUser.user_id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signup failed", error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Signin attempt with email:", email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error);
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).json({ message: "Logged out successfully" });
};

const profile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { full_name, email, password } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const region = req.query.region;

    console.log("Fetching bookings for user:", user_id, "region:", region);

    const whereClause = { user_id };

    const includeOptions = [
      {
        model: Bus,
        as: "bus",
        attributes: ["bus_number", "bus_route"],
      },
    ];

    if (region) {
      includeOptions[0].where = { bus_route: region };
    }

    const { count, rows } = await Booking.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      bookings: rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

const getUserTestimonials = async (req, res) => {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Testimonial.findAndCountAll({
      where: { user_id },
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      testimonials: rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching testimonials", error: error.message });
  }
};

module.exports = {
  signup,
  signin,
  logoutUser,
  profile,
  updateProfile,
  getUserBookings,
  getUserTestimonials,
};
