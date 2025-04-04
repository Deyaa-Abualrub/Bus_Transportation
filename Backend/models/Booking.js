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

    // Start the payment process based on the payment method
    let paymentMessage;
    if (paymentMethod === "cash") {
      console.log("Processing payment with Cash");
      paymentMessage = "Payment successful with Cash";

      // Create a new booking in the database
      const newBooking = await Booking.create({
        user_id: userId,
        bus_id: busNumber,
        seat_number: seatNumber,
      });

      // Decrease the available seats for the bus
      await Bus.update(
        { seat_available: seatAvailable - 1 },
        { where: { bus_number: busNumber } }
      );

      // Respond with the success message and the booking ID
      return res.status(200).json({
        message: paymentMessage,
        bookingId: newBooking.booking_id,
      });
    } else if (paymentMethod === "visa" || paymentMethod === "credit") {
      console.log(`Processing payment with ${paymentMethod}`);
      paymentMessage = `Payment successful with ${paymentMethod}`;

      // Add similar logic for Visa and Credit (Optional)
      return res.status(200).json({
        message: paymentMessage,
        bookingId: null,
      });
    } else {
      return res.status(400).json({ message: "Invalid payment method" });
    }
  } catch (error) {
    console.error("Error during payment and booking:", error);
    return res
      .status(500)
      .json({ message: "Error processing payment and booking" });
  }
};

module.exports = checkoutController;
