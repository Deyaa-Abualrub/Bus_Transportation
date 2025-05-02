import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCard, Bus, User, Receipt, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const Invoice = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { from, to, searchType } = useSelector((state) => state.bookingForm);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.post(
          `http://localhost:4000/bus/invoice/${bookingId}`,
          {
            from,
            to,
            searchType,
          }
        );
        setBooking(res.data);
        localStorage.setItem("bookingId", bookingId);
      } catch (err) {
        console.error("Failed to fetch invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, from, to, searchType]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--secondary-color)]"></div>
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-4 sm:p-8 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
          <p className="text-lg sm:text-xl text-gray-600 mb-4">
            Invoice not found.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--secondary-color)] text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-opacity-90 shadow flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-4 md:px-6">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto">
        {/* Header */}
        <div className="bg-[var(--primary-color)] text-white p-4 sm:p-6 rounded-t-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <Receipt className="mr-2 sm:mr-3" size={24} />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Booking Invoice</h2>
            </div>
          </div>
          <div className="px-2 sm:px-3 py-1 bg-[var(--secondary-color)] rounded-md text-xs sm:text-sm font-semibold">
            Confirmed
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-b-xl shadow-lg">
          {/* Customer Info */}
          <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center mb-2 sm:mb-3">
              <User
                className="mr-2 text-[var(--secondary-color)]"
                size={18}
                sm:size={20}
              />
              <h3 className="font-semibold text-[var(--primary-color)] text-sm sm:text-base">
                Customer Details
              </h3>
            </div>
            <p className="text-gray-700 font-medium ml-6 sm:ml-7 text-sm sm:text-base">
              {booking.user_name}
            </p>
          </div>

          {/* Journey Details */}
          <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center mb-2 sm:mb-3">
              <Bus
                className="mr-2 text-[var(--secondary-color)]"
                size={18}
                sm:size={20}
              />
              <h3 className="font-semibold text-[var(--primary-color)] text-sm sm:text-base">
                Journey Details
              </h3>
            </div>

            <div className="ml-6 sm:ml-7 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Bus Number:</span>
                <span className="font-medium text-gray-800">
                  {booking.bus_number}
                </span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Route:</span>
                <span className="font-medium text-gray-800">
                  {booking.from} to {booking.to}
                </span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Seat Number:</span>
                <span className="font-medium text-gray-800">
                  {booking.seat_number}
                </span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-800">
                  {new Date(booking.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Departure Time:</span>
                <span className="font-medium text-gray-800">
                  {booking.time
                    ? new Date(booking.time).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Time not available"}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center mb-2 sm:mb-3">
              <CreditCard
                className="mr-2 text-[var(--secondary-color)]"
                size={18}
                sm:size={20}
              />
              <h3 className="font-semibold text-[var(--primary-color)] text-sm sm:text-base">
                Payment Details
              </h3>
            </div>

            <div className="ml-6 sm:ml-7 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium text-gray-800">
                  {booking.payment_method}
                </span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-800">
                  {new Date(booking.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-[var(--third-color)] p-3 sm:p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-[var(--primary-color)] font-semibold text-sm sm:text-base">
                Total Amount
              </span>
              <span className="text-lg sm:text-xl font-bold text-[var(--primary-color)]">
                {booking.total_price} JD
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </button>

            <button
              onClick={() => window.print()}
              className="bg-[var(--secondary-color)] text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg hover:bg-opacity-90 shadow text-sm sm:text-base w-full sm:w-auto"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
