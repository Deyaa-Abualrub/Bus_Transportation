const Booking = require("../models/Booking");
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

    const total_price = price;

    console.log("Received payment data:", req.body);

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

    if (seatAvailable <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    let paymentMessage;
    let payment_status = "pending";

    switch (paymentMethod) {
      case "cash":
        console.log("Processing payment with Cash");
        paymentMessage = "Payment successful with Cash";
        break;

      case "credit":
        console.log("Processing payment with Credit Card");
        paymentMessage = "Payment successful with Credit Card";
        payment_status = "done";
        break;

      case "paypal":
        console.log("Payment confirmed via PayPal frontend");
        paymentMessage = "Payment successful with PayPal";
        payment_status = "done";
        break;

      default:
        return res.status(400).json({ message: "Invalid payment method" });
    }

    // Save booking to database
    const newBooking = await Booking.create({
      user_id: userId,
      bus_number: busNumber,
      seat_number: seatNumber,
      payment_method: paymentMethod,
      total_price: total_price,
      payment_status: payment_status,
    });

    // Update bus seat availability
    await Bus.update(
      { seat_available: seatAvailable },
      { where: { bus_number: busNumber } }
    );

    return res.status(200).json({
      message: paymentMessage,
      bookingId: newBooking.booking_id,
    });
  } catch (error) {
    console.error("Error during payment and booking:", error);
    return res.status(500).json({
      message: "Error processing payment and booking",
      error: error.message,
    });
  }
};

module.exports = checkoutController;
