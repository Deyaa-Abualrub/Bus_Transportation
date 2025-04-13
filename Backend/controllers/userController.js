const Joi = require("joi");
const User = require("../models/User");
const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

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
        user_id: newUser.user_id, // إرجاع الـ user_id هنا
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role, // إرجاع الـ role مع بيانات المستخدم
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
  res.clearCookie("authtoken");
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

    // إذا كان هناك تغيير في كلمة المرور، نقوم بتشفيرها
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

module.exports = {
  signup,
  signin,
  logoutUser,
  profile,
  updateProfile,
};
