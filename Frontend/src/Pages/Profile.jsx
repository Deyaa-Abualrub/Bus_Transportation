import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  CalendarDays,
  Clock,
  Star,
  Edit2,
  Save,
  MapPin,
  Bus,
  CreditCard,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Menu,
  Filter,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    currentPassword: "", // إضافة كلمة المرور الحالية
  });
  const [bookings, setBookings] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsTotalPages, setBookingsTotalPages] = useState(1);
  const [testimonialsPage, setTestimonialsPage] = useState(1);
  const [testimonialsTotalPages, setTestimonialsTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState({
    full_name: false,
    email: false,
    password: false,
    currentPassword: false, // إضافة للتحكم في تعديل كلمة المرور الحالية
  });
  const [regions] = useState([
    "raghadan",
    "north_complex ",
    "zarqa",
    "al_bayader",
    "sahab",
    "nazal district",
    "customs",
    "abu_nuseir",
    "al_baqaa",
    "naour",
    "salt",
    "irbid",
    "ajloun",
    "jerash",
    "madaba",
    "mafraq",
  ]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

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
        currentPassword: "", // إضافة كلمة المرور الحالية في البداية
      });
    } catch (err) {
      toast.error("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async (page, region = selectedRegion) => {
    try {
      setIsLoading(true);
      let url = `http://localhost:4000/auth/profile/${userId}/bookings?page=${page}`;

      if (region) {
        url += `&region=${region}`;
      }

      const res = await axios.get(url);
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
      // التحقق من كلمة المرور الحالية
      if (formData.password && !formData.currentPassword) {
        return toast.error("Please enter your current password.");
      }

      // إرسال البيانات لتحديث الملف
      const data = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password ? formData.password : undefined,
        currentPassword: formData.currentPassword,
      };

      const response = await axios.put(
        `http://localhost:4000/auth/profile/${userId}`,
        data
      );

      toast.success("Profile updated successfully");
      fetchProfile();
      setIsEditing({
        full_name: false,
        email: false,
        password: false,
        currentPassword: false, // غلق التعديل بعد حفظ التغييرات
      });
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleFieldEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const applyFilter = () => {
    fetchBookings(1, selectedRegion);
    setFilterOpen(false);
  };

  const clearFilter = () => {
    setSelectedRegion("");
    fetchBookings(1, "");
    setFilterOpen(false);
  };

  const handleBookingPageChange = (newPage) => {
    if (newPage > 0 && newPage <= bookingsTotalPages) {
      fetchBookings(newPage, selectedRegion);
    }
  };

  const handleTestimonialPageChange = (newPage) => {
    if (newPage > 0 && newPage <= testimonialsTotalPages) {
      fetchTestimonials(newPage);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
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
          {(() => {
            // For small screens, show fewer pagination buttons
            const pageButtons = [];
            const visiblePages = window.innerWidth < 640 ? 3 : 5;

            let startPage = Math.max(
              1,
              currentPage - Math.floor(visiblePages / 2)
            );
            let endPage = Math.min(totalPages, startPage + visiblePages - 1);

            if (endPage - startPage + 1 < visiblePages) {
              startPage = Math.max(1, endPage - visiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              pageButtons.push(
                <button
                  key={i}
                  onClick={() => onPageChange(i)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === i
                      ? "bg-[var(--third-color)] text-[var(--primary-color)] font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i}
                </button>
              );
            }

            return pageButtons;
          })()}
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
        <div className="text-center p-6 md:p-8 rounded-lg bg-white shadow-md w-full max-w-md mx-4">
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
    <div className="min-h-screen bg-gray-50 pb-6 md:pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative rounded-xl overflow-hidden mb-6 md:mb-8 shadow-lg"
          style={{
            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
            height: "180px",
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

          <div className="absolute -bottom-16 left-4 md:left-8 bg-white p-2 rounded-full shadow-lg border-4 border-white">
            <div
              className="rounded-full bg-gray-100 flex items-center justify-center overflow-hidden"
              style={{ width: "100px", height: "100px" }}
            >
              <User size={54} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="pt-5 pb-4 md:pt-4 md:pb-6 px-4 md:flex md:justify-between md:items-end">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">
              {user.full_name}
            </h1>
            <div className="flex items-center text-gray-600 mt-2 text-sm md:text-base">
              <MapPin size={16} className="mr-2" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow"
          >
            <span className="flex items-center text-[var(--primary-color)]">
              {activeTab === "profile" && <User size={18} className="mr-2" />}
              {activeTab === "bookings" && <Bus size={18} className="mr-2" />}
              {activeTab === "testimonials" && (
                <Star size={18} className="mr-2" />
              )}
              <span className="font-medium capitalize">{activeTab}</span>
            </span>
            <Menu size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mb-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "profile"
                    ? "bg-[var(--third-color)] text-[var(--primary-color)]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("profile")}
              >
                <User size={18} className="mr-2" />
                <span>Profile</span>
              </button>
              <button
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "bookings"
                    ? "bg-[var(--third-color)] text-[var(--primary-color)]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("bookings")}
              >
                <Bus size={18} className="mr-2" />
                <span>Bookings</span>
              </button>
              <button
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "testimonials"
                    ? "bg-[var(--third-color)] text-[var(--primary-color)]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("testimonials")}
              >
                <Star size={18} className="mr-2" />
                <span>Testimonials</span>
              </button>
            </div>
          </div>
        )}

        <div className="hidden md:flex mb-6 overflow-x-auto bg-white rounded-lg shadow p-1">
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
            <div className="p-4 md:p-6 border-b">
              <h2 className="text-lg md:text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Edit2
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Update Profile
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 space-y-4 md:space-y-6"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-medium text-gray-700">
                    Full Name
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit("full_name")}
                    className="text-[var(--secondary-color)] hover:text-opacity-80 flex items-center text-sm"
                  >
                    {isEditing.full_name ? (
                      <Save size={16} className="mr-1" />
                    ) : (
                      <Edit2 size={16} className="mr-1" />
                    )}
                    {isEditing.full_name ? "Save" : "Edit"}
                  </button>
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={!isEditing.full_name}
                  className={`w-full p-3 border border-gray-300 rounded-lg ${
                    isEditing.full_name
                      ? "focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)]"
                      : "bg-gray-50"
                  } outline-none transition`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-medium text-gray-700">
                    Email
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit("email")}
                    className="text-[var(--secondary-color)] hover:text-opacity-80 flex items-center text-sm"
                  >
                    {isEditing.email ? (
                      <Save size={16} className="mr-1" />
                    ) : (
                      <Edit2 size={16} className="mr-1" />
                    )}
                    {isEditing.email ? "Save" : "Edit"}
                  </button>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing.email}
                  className={`w-full p-3 border border-gray-300 rounded-lg ${
                    isEditing.email
                      ? "focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)]"
                      : "bg-gray-50"
                  } outline-none transition`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-medium text-gray-700">
                    Current Password
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit("currentPassword")}
                    className="text-[var(--secondary-color)] hover:text-opacity-80 flex items-center text-sm"
                  >
                    {isEditing.currentPassword ? (
                      <Save size={16} className="mr-1" />
                    ) : (
                      <Edit2 size={16} className="mr-1" />
                    )}
                    {isEditing.currentPassword ? "Save" : "Edit"}
                  </button>
                </div>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={!isEditing.currentPassword}
                  placeholder="Enter your current password"
                  className={`w-full p-3 border border-gray-300 rounded-lg ${
                    isEditing.currentPassword
                      ? "focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)]"
                      : "bg-gray-50"
                  } outline-none transition`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit("password")}
                    className="text-[var(--secondary-color)] hover:text-opacity-80 flex items-center text-sm"
                  >
                    {isEditing.password ? (
                      <Save size={16} className="mr-1" />
                    ) : (
                      <Edit2 size={16} className="mr-1" />
                    )}
                    {isEditing.password ? "Save" : "Edit"}
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing.password}
                  placeholder="Leave blank to keep current password"
                  className={`w-full p-3 border border-gray-300 rounded-lg ${
                    isEditing.password
                      ? "focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)]"
                      : "bg-gray-50"
                  } outline-none transition`}
                />
              </div>

              <div className="pt-2 md:pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center shadow-md hover:shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
            <div className="p-4 md:p-6 border-b flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Bookmark
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Your Bookings
              </h2>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center text-[var(--secondary-color)] hover:text-opacity-80 text-sm font-medium"
              >
                <Filter size={16} className="mr-1" />
                Filter
              </button>
            </div>

            {filterOpen && (
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="mb-4 md:mb-0 flex-grow">
                    <label className="block font-medium text-sm text-gray-700 mb-1">
                      Filter by Region
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--third-color)] focus:border-[var(--third-color)] outline-none"
                    >
                      <option value="">All Regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={applyFilter}
                      className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-opacity-90"
                    >
                      Apply
                    </button>
                    <button
                      onClick={clearFilter}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 md:p-6">
              {selectedRegion && (
                <div className="mb-4">
                  <div className="inline-flex items-center bg-[var(--third-color)] text-[var(--primary-color)] px-3 py-1 rounded-full text-sm">
                    <span className="mr-2">Region: {selectedRegion}</span>
                    <button
                      onClick={clearFilter}
                      className="hover:text-opacity-80"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}

              {bookings.length === 0 ? (
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <Bus size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No bookings found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <div className="bg-[var(--third-color)] h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center mr-3 md:mr-4 shrink-0">
                            <Bus
                              size={24}
                              className="text-[var(--primary-color)]"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-base md:text-lg text-[var(--primary-color)]">
                              {booking.bus_number}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                              Seat: {booking.seat_number}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                              Region: {booking.bus?.bus_route || "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="sm:text-right mt-2 sm:mt-0">
                          <span className="font-bold text-base md:text-lg text-[var(--secondary-color)]">
                            ${booking.total_price.toFixed(2)}
                          </span>
                          <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1 sm:justify-end">
                            <CreditCard size={14} className="mr-1" />
                            <span>{booking.payment_method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t flex flex-wrap items-center text-xs md:text-sm text-gray-500">
                        <div className="flex items-center mr-4 mb-1 sm:mb-0">
                          <CalendarDays size={14} className="mr-1" />
                          <span>
                            {new Date(booking.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>
                            {new Date(booking.created_at).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
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
            <div className="p-4 md:p-6 border-b">
              <h2 className="text-lg md:text-xl font-semibold text-[var(--primary-color)] flex items-center">
                <Star
                  size={20}
                  className="mr-2 text-[var(--secondary-color)]"
                />
                Your Testimonials
              </h2>
            </div>

            <div className="p-4 md:p-6">
              {testimonials.length === 0 ? (
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <Star size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No testimonials found</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-lg p-4 md:p-5 border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                        <div className="flex mb-2 sm:mb-0">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              size={16}
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
                        <span className="text-xs md:text-sm text-gray-500 sm:ml-auto">
                          {new Date(t.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-base md:text-lg font-medium">
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
