import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CreditCard,
  Bus,
  CalendarDays,
  Clock,
  User,
  MapPin,
} from "lucide-react";
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
        // Make sure we're sending the required data in the request body
        const res = await axios.post(
          `http://localhost:4000/bus/invoice/${bookingId}`,
          {
            from,
            to,
            searchType,
          }
        );
        setBooking(res.data);
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
            <MapPin className="mr-2 text-[var(--secondary-color)]" size={20} />
            <span className="font-medium">Route:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.from} to {booking.to}
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
            <span className="font-medium">Departure Time:</span>
            <span className="ml-2 font-semibold text-black">
              {booking.time
                ? new Date(booking.time).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Time not available"}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              (
              {searchType === "launch_date"
                ? "Launch Time"
                : "Status Change Time"}
              )
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
