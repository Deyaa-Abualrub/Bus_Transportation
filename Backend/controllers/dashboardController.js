const Bus = require("../models/Buses");
const Driver = require("../models/Driver");
const User = require("../models/User");
const ContactMessage = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getDashboardStats = async (req, res) => {
  try {
    const busesCount = await Bus.count();
    const driversCount = await Driver.count();
    const usersCount = (await User.count()) - 1;

    res.status(200).json({
      buses: busesCount,
      drivers: driversCount,
      users: usersCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

const getAllDrivers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const drivers = await Driver.findAll({
      where: {
        status: "approved",
      },
      attributes: ["driver_id", "full_name", "email", "phone_number"],
      limit,
      offset,
    });

    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Error fetching drivers" });
  }
};

const getAllBuses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // إضافة pagination
  const offset = (page - 1) * limit;

  try {
    const buses = await Bus.findAll({
      attributes: [
        "bus_id",
        "bus_number",
        "seat_available",
        "bus_image",
        "bus_route",
      ],
      limit,
      offset,
    });
    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Error fetching buses" });
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // إضافة pagination
  const offset = (page - 1) * limit;

  try {
    const users = await User.findAll({
      where: {
        isdeleted: false,
      },
      attributes: ["user_id", "full_name", "email", "role", "created_at"],
      limit,
      offset,
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getDriverRequests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const requests = await Driver.findAll({
      where: { status: "pending" },
      limit,
      offset,
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching driver requests:", error);
    res.status(500).json({ message: "Error fetching driver requests" });
  }
};

const getContactMessages = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // إضافة pagination
  const offset = (page - 1) * limit;

  try {
    const messages = await ContactMessage.findAll({
      limit,
      offset,
    });
    console.log("Fetched contact messages:", messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Error fetching contact messages" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const replyToMessage = async (req, res) => {
  const { email, replyMessage } = req.body;

  if (!email || !replyMessage) {
    return res
      .status(400)
      .json({ message: "Email and reply message are required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_NODEMAILER,
    to: email,
    subject: "Reply to Your Contact Message",
    text: replyMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error sending reply:", error);
    return res.status(500).json({ message: "Error sending reply email" });
  }
};

// Export them
module.exports = {
  getUsers,
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
  getAllDrivers,
  getAllBuses,
};
