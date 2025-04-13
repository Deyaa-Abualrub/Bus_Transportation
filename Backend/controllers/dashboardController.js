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

const getDriverRequests = async (req, res) => {
  try {
    const requests = await Driver.findAll({
      where: { status: "pending" },
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching driver requests:", error);
    res.status(500).json({ message: "Error fetching driver requests" });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();
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

module.exports = {
  getDashboardStats,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
};
