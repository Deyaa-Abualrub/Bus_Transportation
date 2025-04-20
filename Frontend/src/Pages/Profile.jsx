import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  CalendarDays,
  Clock,
  Star,
  Edit,
  MapPin,
  Bus,
  CreditCard,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [bookings, setBookings] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsTotalPages, setBookingsTotalPages] = useState(1);
  const [testimonialsPage, setTestimonialsPage] = useState(1);
  const [testimonialsTotalPages, setTestimonialsTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchBookings(1);
      fetchTestimonials(1);
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:4000/auth/profile/${userId}`
      );
      setUser(res.data.user);
      setFormData({
        full_name: res.data.user.full_name,
        email: res.data.user.email,
        password: "",
      });
    } catch (err) {
      toast.error("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async (page) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:4000/auth/profile/${userId}/bookings?page=${page}`
      );
      setBookings(Array.isArray(res.data.bookings) ? res.data.bookings : []);
      setBookingsPage(res.data.currentPage);
      setBookingsTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTestimonials = async (page) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:4000/auth/profile/${userId}/testimonials?page=${page}`
      );
      setTestimonials(
        Array.isArray(res.data.testimonials) ? res.data.testimonials : []
      );
      setTestimonialsPage(res.data.currentPage);
      setTestimonialsTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/auth/profile/${userId}`,
        formData
      );
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleBookingPageChange = (newPage) => {
    if (newPage > 0 && newPage <= bookingsTotalPages) {
      fetchBookings(newPage);
    }
  };

  const handleTestimonialPageChange = (newPage) => {
    if (newPage > 0 && newPage <= testimonialsTotalPages) {
      fetchTestimonials(newPage);
    }
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? "bg-[var(--third-color)] text-[var(--primary-color)] font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--secondary-color)]"></div>
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <User
            size={48}
            className="mx-auto mb-4 text-[var(--primary-color)]"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600">
            Unable to load your profile information
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-6xl mx-auto p-4">
        <div
          className="relative rounded-xl overflow-hidden mb-8 shadow-lg"
          style={{
            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
            height: "220px",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/api/placeholder/1200/220')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="absolute -bottom-16 left-8 bg-white p-2 rounded-full shadow-lg border-4 border-white">
            <div
              className="rounded-full bg-gray-100 flex items-center justify-center overflow-hidden"
              style={{ width: "120px", height: "120px" }}
            >
              <User size={64} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 px-4 md:flex md:justify-between md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary-color)]">
              {user.full_name}
            </h1>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin size={18} className="mr-2" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex mb-6 overflow-x-auto bg-white rounded-lg shadow p-1">
          <button
            className={`flex items-center px-5 py-3 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-[var(--third-color)] text-[var(--primary-color)] font-medium shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} className="mr-2" />
            <span>Profile</span>
          </button>
          <button
            className={`flex items-center px-5 py-3 rounded-lg transition ${
              activeTab === "bookings"
                ? "bg-[var(--third-color)] text-[var(--primary-color)] font-medium shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <Bus size={18} className="mr-2" />
            <span>Bookings</span>
          </button>
          <button
            className={`flex items-center px-5 py-3 rounded-lg transition ${
              activeTab === "testimonials"
                ? "bg-[var(--third-color)] text-[var(--primary-color)] font-medium shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("testimonials")}
          >
            <Star size={18} className="mr-2" />
            <span>Testimonials</span>
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Edit
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Update Profile
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)] outline-none transition"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)] outline-none transition"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)] outline-none transition"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center shadow-md hover:shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Bookmark
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Your Bookings
              </h2>
            </div>

            <div className="p-6">
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bus size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No bookings found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="bg-[var(--third-color)] h-14 w-14 rounded-lg flex items-center justify-center mr-4">
                            <Bus
                              size={28}
                              className="text-[var(--primary-color)]"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg text-[var(--primary-color)]">
                              {booking.bus_number}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Seat: {booking.seat_number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg text-[var(--secondary-color)]">
                            ${booking.total_price.toFixed(2)}
                          </span>
                          <div className="flex items-center text-sm text-gray-500 mt-1 justify-end">
                            <CreditCard size={14} className="mr-1" />
                            <span>{booking.payment_method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t flex items-center text-sm text-gray-500">
                        <CalendarDays size={14} className="mr-1" />
                        <span>
                          {new Date(booking.created_at).toLocaleDateString()}
                        </span>
                        <Clock size={14} className="mr-3 ml-3" />
                        <span>
                          {new Date(booking.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {bookingsTotalPages > 1 && (
                <Pagination
                  currentPage={bookingsPage}
                  totalPages={bookingsTotalPages}
                  onPageChange={handleBookingPageChange}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Star
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Your Testimonials
              </h2>
            </div>

            <div className="p-6">
              {testimonials.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Star size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No testimonials found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              size={18}
                              fill={
                                idx < t.rating
                                  ? "var(--secondary-color)"
                                  : "transparent"
                              }
                              stroke={
                                idx < t.rating
                                  ? "var(--secondary-color)"
                                  : "gray"
                              }
                              className="mr-1"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-auto">
                          {new Date(t.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-lg font-medium">
                        {t.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {testimonialsTotalPages > 1 && (
                <Pagination
                  currentPage={testimonialsPage}
                  totalPages={testimonialsTotalPages}
                  onPageChange={handleTestimonialPageChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
