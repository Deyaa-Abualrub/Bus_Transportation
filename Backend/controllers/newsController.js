const { Op, fn, col, literal } = require("sequelize");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Driver = require("../models/Driver");
const Bus = require("../models/Buses");

exports.getNews = async (req, res) => {
  try {
    const previousMonthStart = new Date();
    previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
    previousMonthStart.setDate(1);
    previousMonthStart.setHours(0, 0, 0, 0);

    const previousMonthEnd = new Date(previousMonthStart);
    previousMonthEnd.setMonth(previousMonthEnd.getMonth() + 1);

    const topUserLastMonthData = await Booking.findOne({
      attributes: [
        "user_id",
        [fn("COUNT", col("seat_number")), "seat_count"],
      ],
      where: {
        created_at: {
          [Op.between]: [previousMonthStart, previousMonthEnd],
        },
      },
      group: ["Booking.user_id", "User.user_id"],
      order: [[literal("seat_count"), "DESC"]],
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
      ],
    });

    const topUser =
      topUserLastMonthData && topUserLastMonthData.User
        ? {
            user_id: topUserLastMonthData.user_id,
            full_name: topUserLastMonthData.User.full_name,
            totalSeats: topUserLastMonthData.dataValues.seat_count,
          }
        : null;

    const newDriver = await Driver.findOne({
      where: { status: "approved" },
      order: [["driver_id", "DESC"]],
      attributes: ["driver_id", "full_name"],
      include: [
        {
          model: Bus,
          as: "bus",
          attributes: ["bus_route", "bus_id"],
        },
      ],
    });

    const newBus = await Bus.findOne({
      order: [["bus_id", "DESC"]],
      attributes: ["bus_number", "route_id", "bus_route", "bus_image"],
    });

    // 🧾 خصم ثابت
    const friendOffer = { discount: 0.1 };

    res.status(200).json({
      newDriver,
      newBus,
      topUser,
      friendOffer,
    });
  } catch (error) {
    console.error("Error in getNews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
