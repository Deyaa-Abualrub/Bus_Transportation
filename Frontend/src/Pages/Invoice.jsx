import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCard, Bus, CalendarDays, Clock, User } from "lucide-react";

const Invoice = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/bus/invoice/${bookingId}`
        );
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--secondary-color)]"></div>
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Invoice not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6">
          Booking Invoice
        </h2>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="mr-2 text-[var(--secondary-color)]" size={20} />
            <span className="font-medium">Customer:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.user_name}
            </span>
          </div>

          <div className="flex items-center">
            <Bus className="mr-2 text-[var(--secondary-color)]" size={20} />
            <span className="font-medium">Bus Number:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.bus_number}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">Seats:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.seat_number}
            </span>
          </div>

          <div className="flex items-center">
            <CreditCard
              className="mr-2 text-[var(--secondary-color)]"
              size={20}
            />
            <span className="font-medium">Payment Method:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.payment_method}
            </span>
          </div>

          <div className="flex items-center">
            <CalendarDays
              className="mr-2 text-[var(--secondary-color)]"
              size={20}
            />
            <span className="font-medium">Date:</span>
            <span className="ml-2 font-semibold text-black">
              {new Date(booking.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center">
            <Clock className="mr-2 text-[var(--secondary-color)]" size={20} />
            <span className="font-medium">Time:</span>
            <span className="ml-2 font-semibold text-black">
              {new Date(booking.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="mt-6 p-4 bg-[var(--third-color)] rounded-lg text-center">
            <p className="text-lg font-bold text-[var(--primary-color)]">
              Total Paid: {booking.total_price} JD
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--secondary-color)] text-white py-2 px-6 rounded-lg hover:bg-opacity-90 shadow"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
