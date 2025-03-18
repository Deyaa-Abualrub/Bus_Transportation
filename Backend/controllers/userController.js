const Joi = require("joi");
const User = require("../models/User");
const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const JWT_SECRET = process.env.JWT_SECRET || "your_JWT_SECRET";

// ✅ تعريف مخطط التحقق باستخدام Joi مع الشروط المطلوبة
const signupSchema = Joi.object({
  full_name: Joi.string()
    .regex(/^\S+\s+\S+\s+\S+\s+\S+$/) // التأكد أن الاسم يحتوي على 4 مقاطع على الأقل مفصولة بمسافة
    .message("Full name must have at least 4 words")
    .required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8) // الطول الأدنى 8 أحرف
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) // يجب أن تحتوي على حرف صغير وكبير ورقم
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
    // ✅ التحقق من البيانات قبل تنفيذ أي عملية
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
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
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
    // ✅ التحقق من البيانات باستخدام Joi
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("authtoken");
  return res.status(200).json({ message: "Logged out successfully" });
};

// const googleSignin = (req, res, next) => {
//   passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
// };


// const googleSigninCallback = (req, res, next) => {
//   passport.authenticate("google", { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(500).json({ message: "Google authentication failed" });
//     }

//     const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("authToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 3600000,
//     });

//     return res.redirect(`http://localhost:5173?token=${token}`);
//   })(req, res, next);
// };


module.exports = {
  signup,
  signin,
  logoutUser,
  // googleSignin,
  // googleSigninCallback,
};
