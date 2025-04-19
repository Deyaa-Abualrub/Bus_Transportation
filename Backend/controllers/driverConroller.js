const Driver = require("../models/Driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cookieParser = require("cookie-parser");
const Bus = require("../models/Buses");

exports.signinDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { driver_id: driver.driver_id, email: driver.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authtoken", token, {
      httpOnly: true,
      maxAge: 3600 * 1000, // 1 ساعة
    });

    return res.status(200).json({
      message: "Login successful",
      driver: {
        driver_id: driver.driver_id,
        full_name: driver.full_name,
        email: driver.email,
      },
    });
  } catch (error) {
    console.error("Error logging in driver:", error);
    res.status(500).json({ message: "Error logging in driver", error });
  }
};

exports.registerDriver = async (req, res) => {
  try {
    const schema = Joi.object({
      full_name: Joi.string().min(3).max(255).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .pattern(/@driver\.com$/, "must end with @driver.com")
        .required(),
      password: Joi.string().min(6).max(255).required(),
      phone_number: Joi.string()
        .pattern(/^07\d{8}$/, "must start with 07 and be 10 digits long")
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    console.log(req.body);
    console.log(req.files);

    const { full_name, email, password, phone_number } = req.body;

    const existingDriver = await Driver.findOne({ where: { email } });
    if (existingDriver) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const license_img = req.files["license_img"]
      ? req.files["license_img"][0].path
      : null;
    const non_conviction_img = req.files["non_conviction_img"]
      ? req.files["non_conviction_img"][0].path
      : null;

    const newDriver = await Driver.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
      license_img,
      non_conviction_img,
    });

    const token = jwt.sign(
      { driver_id: newDriver.driver_id, email: newDriver.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authtoken", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: "Driver registered successfully",
      driver: newDriver,
    });
  } catch (error) {
    console.error("Error registering driver:", error);
    res.status(500).json({ message: "Error registering driver", error });
  }
};

exports.approveDriver = async (req, res) => {
  const { driverId } = req.params;

  try {
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const availableBus = await Bus.findOne({ where: { driver_id: null } });
    if (!availableBus) {
      return res.status(400).json({ message: "No available bus found" });
    }

    driver.status = "approved";
    driver.bus_id = availableBus.bus_id;
    await driver.save();

    availableBus.driver_id = driver.driver_id;
    await availableBus.save();

    res.status(200).json({ message: "Driver approved and assigned to a bus" });
  } catch (error) {
    console.error("Error approving driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.rejectDriver = async (req, res) => {
  const { driverId } = req.params;

  try {
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    driver.status = "rejected";
    driver.isdeleted = true;
    await driver.save();

    res.status(200).json({ message: "Driver rejected and marked as deleted" });
  } catch (error) {
    console.error("Error rejecting driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

