import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, bus } = useSelector((state) => state.checkout);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(bus.price);

  const handleSeatChange = (e) => {
    const newSeatCount = parseInt(e.target.value);
    setSeatCount(newSeatCount);
    setTotalPrice(bus.price * newSeatCount);
  };

  const handlePayment = async () => {
    const paymentData = {
      busRoute: bus.busRoute,
      busNumber: bus.busNumber,
      price: totalPrice,
      seatAvailable: bus.seatAvailable - seatCount,
      paymentMethod,
      userId: user.user_id,
      seatNumber: seatCount,
    };

    console.log(paymentData);

    try {
      let response;
      if (paymentMethod === "cash") {
        response = await axios.post(
          "http://localhost:4000/bus/paycash",
          paymentData
        );
      } else if (paymentMethod === "visa") {
        response = await axios.post(
          "http://localhost:4000/bus/payvisa",
          paymentData
        );
      } else if (paymentMethod === "credit") {
        response = await axios.post(
          "http://localhost:4000/bus/paycredit",
          paymentData
        );
      }

      Swal.fire({
        title: "Payment Successful!",
        text: response.data.message,
        icon: "success",
        confirmButtonColor: "#1f2937",
      });

      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Payment failed", error);
      Swal.fire({
        title: "Payment Failed",
        text: "There was an error with your payment. Please try again.",
        icon: "error",
        confirmButtonColor: "#fb2c36",
      });
    }
  };

  return (
    <div className="bg-[#c2545400] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--third-color)] to-[var(--primary-color)] p-6">
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-[var(--secondary-color)]">Checkout</span>{" "}
            Details
          </h2>
        </div>

        <div className="p-6 sm:p-8 bg-[#f6f3e56e]">
          {/* User Info Panel */}
          <div className="mb-8 p-4 rounded-lg bg-[var(--third-color)] border-l-4 border-[var(--primary-color)]">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[var(--text-color)]">Customer</p>
                <p className="font-bold text-[var(--primary-color)]">
                  {user.username}
                </p>
              </div>
            </div>
          </div>

          {/* Bus Info Card */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-white to-[var(--third-color)] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
              Bus Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm">Route</span>
                <span className="font-medium">{bus.busRoute}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm">
                  Bus Number
                </span>
                <span className="font-medium">{bus.busNumber}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm">
                  Price per Seat
                </span>
                <span className="font-bold text-[var(--secondary-color)]">
                  {bus.price} JD
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm">
                  Available Seats
                </span>
                <span className="font-medium">{bus.seatAvailable}</span>
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
              Select Seats
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Number of Seats
                </label>
                <input
                  type="number"
                  min="1"
                  max={bus.seatAvailable}
                  value={seatCount}
                  onChange={handleSeatChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none"
                  style={{
                    MozAppearance: "textfield", // لـ Firefox
                    WebkitAppearance: "none", // لـ Chrome و Safari
                  }}
                />
              </div>

              <div className="w-full sm:w-1/2 sm:text-right">
                <div className="mb-2">
                  <span className="text-sm text-[var(--text-color)]">
                    Price per seat:
                  </span>
                  <span className="ml-2 font-medium">{bus.price} JD</span>
                </div>
                <div className="text-2xl font-bold text-[var(--secondary-color)]">
                  Total: {Number(totalPrice).toFixed(2)} JD
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-lg border text-center transition-all flex items-center justify-center ${
                  paymentMethod === "cash"
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "bg-white text-[var(--text-color)] border-gray-300 hover:bg-gray-50"
                }`}
              >
                <i className="fa-solid fa-money-bill-wave  w-8 mr-1 align-middle"></i>{" "}
                {/* إضافة مسافة بين الأيقونة والكلمة */}
                Cash
              </button>

              <button
                onClick={() => setPaymentMethod("visa")}
                className={`p-4 rounded-lg border text-center transition-all flex items-center justify-center ${
                  paymentMethod === "visa"
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "bg-white text-[var(--text-color)] border-gray-300 hover:bg-gray-50"
                }`}
              >
                <i className="fa-brands fa-cc-visa w-8 mr-1 align-middle"></i>{" "}
                {/* إضافة مسافة بين الأيقونة والكلمة */}
                Visa Card
              </button>

              <button
                onClick={() => setPaymentMethod("credit")}
                className={`p-4 rounded-lg border text-center transition-all flex items-center justify-center ${
                  paymentMethod === "credit"
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "bg-white text-[var(--text-color)] border-gray-300 hover:bg-gray-50"
                }`}
              >
                <i className="fa-solid fa-credit-card w-8 mr-1 align-middle"></i>{" "}
                {/* إضافة مسافة بين الأيقونة والكلمة */}
                Credit Card
              </button>
            </div>
          </div>

          {/* Summary and Payment Button */}
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-[var(--text-color)]">Total Amount</p>
              <p className="text-2xl font-bold text-[var(--secondary-color)]">
                {totalPrice} JD
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={!paymentMethod}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-bold ${
                paymentMethod
                  ? "bg-[var(--secondary-color)] text-white hover:bg-[#e01c26]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
