
const Booking = require("../models/Booking");
const Bus = require("../models/Buses");
const stripe = require("stripe")(process.env.SECRET_STRIPE);

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
        paymentMessage = "Payment successful with Cash";
        break;
      case "credit":
        paymentMessage = "Payment successful with Credit Card";
        payment_status = "done";
        break;
      case "paypal":
        paymentMessage = "Payment successful with PayPal";
        payment_status = "done";
        break;
      default:
        return res.status(400).json({ message: "Invalid payment method" });
    }

    const newBooking = await Booking.create({
      user_id: userId,
      bus_number: busNumber,
      seat_number: seatNumber,
      payment_method: paymentMethod,
      total_price: total_price,
      payment_status: payment_status,
    });

    await Bus.update(
      { seat_available: seatAvailable },
      { where: { bus_number: busNumber } }
    );

    return res.status(200).json({
      message: paymentMessage,
      bookingId: newBooking.booking_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error processing payment and booking",
      error: error.message,
    });
  }
};

const stripeController = async (req, res) => {
  try {
    const { busRoute, busNumber, price, seatAvailable, userId, seatNumber } = req.body;

    // Save booking first (payment is considered done)
    await Booking.create({
      user_id: userId,
      bus_number: busNumber,
      seat_number: seatNumber,
      payment_method: "credit",
      total_price: price,
      payment_status: "done",
    });

    await Bus.update(
      { seat_available: seatAvailable },
      { where: { bus_number: busNumber } }
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Bus ${busNumber} - ${busRoute}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/?payment=success",
      cancel_url: "http://localhost:5173/checkout?payment=cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Stripe session creation failed" });
  }
};

module.exports = { checkoutController, stripeController };
