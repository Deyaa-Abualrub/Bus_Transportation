const Booking = require("../models/Booking");
const Bus = require("../models/Buses");
const User = require("../models/User");
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
      numberOfSeats, // عدد الكراسي الذي تم حجزها
    } = req.body;

    let total_price = price;

    // تطبيق الخصم إذا كان عدد الكراسي 5 أو أكثر
    if (numberOfSeats >= 5) {
      total_price = price - 0.1 * numberOfSeats; // خصم 0.1 لكل كرسي
    }

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
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      message: "Error processing payment and booking",
      error: error.message,
    });
  }
};

const stripeController = async (req, res) => {
  try {
    const { busRoute, busNumber, price, seatAvailable, userId, seatNumber } =
      req.body;

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

const getInvoiceById = async (req, res) => {
  const { bookingId } = req.params;
  const { from, to, searchType } = req.body;

  if (!from || !to || !searchType) {
    return res.status(400).json({ message: "Invalid search parameters" });
  }

  try {
    // First, get the booking with user information
    const booking = await Booking.findOne({
      where: { booking_id: bookingId },
      include: [{ model: User, attributes: ["full_name"] }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Now get the bus information using bus_number from booking
    const bus = await Bus.findOne({
      where: { bus_number: booking.bus_number },
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus information not found" });
    }

    // Determine which time field to use based on searchType
    let timeValue;
    if (searchType === "launch_date") {
      timeValue = bus.launch_date;
    } else if (searchType === "status_change_time") {
      timeValue = bus.status_change_time;
    }

    const invoiceData = {
      booking_id: booking.booking_id,
      user_name: booking.User.full_name,
      bus_number: booking.bus_number,
      seat_number: booking.seat_number,
      payment_method: booking.payment_method,
      total_price: booking.total_price,
      created_at: booking.created_at,
      time: timeValue,
      from: from,
      to: to,
    };

    res.status(200).json(invoiceData);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Failed to load invoice" });
  }
};

module.exports = { checkoutController, stripeController, getInvoiceById };
