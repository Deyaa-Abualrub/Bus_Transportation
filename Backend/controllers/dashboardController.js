const Bus = require("../models/Buses");
const Driver = require("../models/Driver");
const User = require("../models/User");
const ContactMessage = require("../models/Contact");
const Booking = require("../models/Booking");
const Testimonial = require("../models/Testimonials");
const nodemailer = require("nodemailer");
const { Op, fn, col, literal } = require("sequelize");
require("dotenv").config();

const getDashboardStats = async (req, res) => {
  try {
    const busesCount = await Bus.count();
    const driversCount = await Driver.count({
      where: { status: "approved" },
    });
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

const getRecentActivities = async (req, res) => {
  try {
    const recentDriver = await Driver.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["full_name", "created_at"],
    });

    const approvedDriver = await Driver.findOne({
      where: { status: "approved" },
      order: [["updated_at", "DESC"]],
      attributes: ["full_name", "updated_at"],
    });

    const recentBookings = await Booking.findAll({
      limit: 3,
      order: [["created_at", "DESC"]],
      attributes: ["booking_id", "created_at"],
    });

    const recentMessage = await ContactMessage.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["name", "created_at"],
    });

    const activities = [];

    if (recentDriver) {
      activities.push({
        message: `New driver registered (${recentDriver.full_name})`,
        time: recentDriver.created_at,
      });
    }

    if (recentBookings && recentBookings.length > 0) {
      activities.push({
        message: `${recentBookings.length} new user bookings`,
        time: recentBookings[0].created_at,
      });
    }

    if (approvedDriver) {
      activities.push({
        message: `Driver request approved (${approvedDriver.full_name})`,
        time: approvedDriver.updated_at,
      });
    }

    if (recentMessage) {
      activities.push({
        message: `New contact message from ${recentMessage.name}`,
        time: recentMessage.created_at,
      });
    }

    // Example of system maintenance event (you can replace or remove this)
    activities.push({
      message: "System activity check completed",
      time: new Date(),
    });

    // Sort by latest
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Error fetching recent activities" });
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
const getWeeklyActivity = async (req, res) => {
  try {
    // احصل على البيانات لآخر 7 أيام
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);

    // جلب عدد المستخدمين لكل يوم
    const usersData = await User.findAll({
      attributes: [
        [fn("DATE", col("created_at")), "date"],
        [fn("COUNT", "*"), "count"],
      ],
      where: {
        created_at: {
          [Op.between]: [lastWeek, today],
        },
        isdeleted: false,
      },
      group: [fn("DATE", col("created_at"))],
      order: [[literal("date"), "ASC"]],
    });

    // جلب عدد السائقين لكل يوم
    const driversData = await Driver.findAll({
      attributes: [
        [fn("DATE", col("created_at")), "date"],
        [fn("COUNT", "*"), "count"],
      ],
      where: {
        created_at: {
          [Op.between]: [lastWeek, today],
        },
      },
      group: [fn("DATE", col("created_at"))],
      order: [[literal("date"), "ASC"]],
    });

    const response = {};

    // دمج البيانات
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      response[key] = { name: key, users: 0, drivers: 0 };
    }

    usersData.forEach((item) => {
      const key = item.dataValues.date;
      if (response[key]) response[key].users = item.dataValues.count;
    });

    driversData.forEach((item) => {
      const key = item.dataValues.date;
      if (response[key]) response[key].drivers = item.dataValues.count;
    });

    res.status(200).json(Object.values(response));
  } catch (error) {
    console.error("Error fetching weekly activity:", error);
    res.status(500).json({ message: "Error fetching weekly activity" });
  }
};
const getBookingStatistics = async (req, res) => {
  try {
    const total = await Booking.count();

    const pending = await Driver.count({
      where: { status: "pending" },
    });

    const approved = await Driver.count({
      where: { status: "approved" },
    });

    const rejected = await Driver.count({
      where: { status: "rejected" },
    });

    res.status(200).json({
      total,
      pending,
      approved,
      rejected,
    });
  } catch (error) {
    console.error("Error fetching booking statistics:", error);
    res.status(500).json({ message: "Error fetching booking statistics" });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      include: {
        model: User,
        as: "User",
        attributes: ["full_name"],
      },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Error fetching testimonials" });
  }
};

const updateTestimonialStatus = async (req, res) => {
  const { testimonialId } = req.params;
  const { status } = req.body;

  try {
    const testimonial = await Testimonial.findByPk(testimonialId);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

    testimonial.status = status;
    await testimonial.save();

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update testimonial status" });
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
  getRecentActivities,
  getWeeklyActivity,
  getBookingStatistics,
  getDriverRequests,
  getContactMessages,
  replyToMessage,
  getAllDrivers,
  getAllBuses,
  getAllTestimonials,
  updateTestimonialStatus
};
