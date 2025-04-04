const Booking = require("../models/Booking");
const User = require("../models/User");
const Bus = require("../models/Buses");

const checkoutController = async (req, res) => {
  try {
    const {
      busRoute,
      busNumber,
      price,
      seatAvailable,
      paymentMethod,
      userId,
      seatNumber,
    } = req.body;

    if (
      !busRoute ||
      !busNumber ||
      !price ||
      !seatAvailable ||
      !paymentMethod ||
      !userId ||
      !seatNumber
    ) {
      return res
        .status(400)
        .json({ message: "Invalid payment or booking details" });
    }

    // Check if the seat is available
    if (seatAvailable <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    let paymentMessage;
    if (paymentMethod === "cash") {
      console.log("Processing payment with Cash");
      paymentMessage = "Payment successful with Cash";
    } else if (paymentMethod === "visa") {
      console.log("Processing payment with Visa");
      paymentMessage = "Payment successful with Visa";
    } else if (paymentMethod === "credit") {
      console.log("Processing payment with Credit Card");
      paymentMessage = "Payment successful with Credit Card";
    } else {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Create a new booking in the database
    const newBooking = await Booking.create({
      user_id: userId,
      bus_id: busNumber, // Assuming bus_id corresponds to busNumber
      seat_number: seatNumber,
    });

    // Decrease the available seats for the bus
    await Bus.update(
      { seat_available: seatAvailable - 1 },
      { where: { bus_number: busNumber } }
    );

    return res.status(200).json({
      message: paymentMessage,
      bookingId: newBooking.booking_id,
    });
  } catch (error) {
    console.error("Error during payment and booking:", error);
    return res
      .status(500)
      .json({ message: "Error processing payment and booking" });
  }
};

module.exports = checkoutController;
