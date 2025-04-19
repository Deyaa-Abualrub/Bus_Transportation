import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import {
  Bus,
  Users,
  UserCheck,
  TrendingUp,
  Clock,
  Plus,
  X,
  Upload,
  CheckCircle,
  XCircle,
  Clock3,
  BookOpen,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ buses: 0, drivers: 0, users: 0 });
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [busImage, setBusImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [seats, setSeats] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/dashboard/weekly-activity"
        );
        setActivityData(res.data);
      } catch (err) {
        console.error("Error fetching weekly activity:", err);
      }
    };

    fetchActivityData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookingStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/booking-statistics"
        );
        setBookingStats(response.data);
      } catch (error) {
        console.error("Error fetching booking statistics:", error);
      }
    };

    fetchBookingStats();
  }, []);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/dashboard/recent-activities"
        );
        setRecentActivities(res.data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchRecentActivities();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          text: "Image size must be less than 5MB",
          type: "error",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        setMessage({
          text: "Please select an image file only",
          type: "error",
        });
        return;
      }

      setBusImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage({ text: "", type: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!busImage) {
      setMessage({
        text: "Please select a bus image",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("busImage", busImage);
    formData.append("seats", seats);
    formData.append("area", area);

    try {
      await axios.post("http://localhost:4000/bus/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        text: "Bus added successfully!",
        type: "success",
      });

      setTimeout(() => {
        setBusImage(null);
        setImagePreview(null);
        setSeats("");
        setArea("");
        setMessage({ text: "", type: "" });
        setShowPopup(false);

        fetchStatsAfterAddingBus();
      }, 1500);
    } catch (error) {
      console.error("Error adding bus:", error);
      setMessage({
        text:
          error.response?.data?.error ||
          "An error occurred while adding the bus",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsAfterAddingBus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching updated stats:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="dashboard-content p-8 flex-1 overflow-auto"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            Dashboard Overview
          </h1>
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <Plus size={20} className="mr-2" />
            Add Bus
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <Bus size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Buses</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.buses}
              </p>
            </div>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <UserCheck size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Drivers</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.drivers}
              </p>
            </div>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <Users size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Users</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.users}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Stats Cards */}
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Booking Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
              <div
                className="mr-4 p-3 rounded-full"
                style={{ backgroundColor: "var(--third-color)" }}
              >
                <BookOpen size={24} style={{ color: "var(--primary-color)" }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Total Bookings</h3>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  {bookingStats.total}
                </p>
              </div>
            </div>

            <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
              <div
                className="mr-4 p-3 rounded-full"
                style={{ backgroundColor: "var(--third-color)" }}
              >
                <Clock3 size={24} style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Pending</h3>
                <p className="text-3xl font-bold text-amber-500">
                  {bookingStats.pending}
                </p>
              </div>
            </div>

            <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
              <div
                className="mr-4 p-3 rounded-full"
                style={{ backgroundColor: "var(--third-color)" }}
              >
                <CheckCircle size={24} style={{ color: "#10B981" }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Approved</h3>
                <p className="text-3xl font-bold text-green-500">
                  {bookingStats.approved}
                </p>
              </div>
            </div>

            <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
              <div
                className="mr-4 p-3 rounded-full"
                style={{ backgroundColor: "var(--third-color)" }}
              >
                <XCircle size={24} style={{ color: "#EF4444" }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Rejected</h3>
                <p className="text-3xl font-bold text-red-500">
                  {bookingStats.rejected}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Weekly Activity
              </h3>
              <TrendingUp
                size={20}
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="users"
                    stackId="a"
                    fill="var(--primary-color)"
                  />
                  <Bar
                    dataKey="drivers"
                    stackId="a"
                    fill="var(--secondary-color)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Recent Activity
              </h3>
              <Clock size={20} style={{ color: "var(--secondary-color)" }} />
            </div>
            <ul>
              {recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className={`py-3 ${
                    index !== recentActivities.length - 1 ? "border-b" : ""
                  } flex justify-between`}
                >
                  <span className="text-gray-700">{activity.message}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(activity.time).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popup Form */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-70"
              onClick={() => setShowPopup(false)}
            ></div>
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md mx-4">
              <div className="flex justify-between items-center p-5 border-b">
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Add New Bus
                </h3>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5">
                {message.text && (
                  <div
                    className={`mb-4 p-3 rounded-md ${
                      message.type === "error"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Bus Image
                  </label>
                  <div
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                    style={{
                      borderColor: imagePreview
                        ? "var(--primary-color)"
                        : "#d1d5db",
                    }}
                    onClick={() => document.getElementById("busImage").click()}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Bus Preview"
                          className="mx-auto max-h-40 rounded"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Click to change the image
                        </p>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload
                          className="mx-auto mb-2"
                          style={{ color: "var(--primary-color)" }}
                        />
                        <p className="text-gray-500">
                          Click to upload a bus image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Max size: 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="busImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="w-full p-3 bg-white border-2 rounded-md text-gray-600 focus:outline-none focus:ring-1 transition-all"
                    style={{ borderColor: "var(--primary-color)" }}
                    placeholder="Enter number of seats"
                    min="1"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    Area
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-3 bg-white border-2 rounded-md text-gray-600 text-base font-medium focus:outline-none focus:ring-1 transition-all"
                    style={{ borderColor: "var(--primary-color)" }}
                    required
                  >
                    <option value="" disabled className="text-gray-400">
                      Select Area
                    </option>
                    <option value="raghadan">Raghadan - Amman</option>
                    <option value="north_complex">
                      North Complex (Tabarbour) - Amman
                    </option>
                    <option value="zarqa">Zarqa</option>
                    <option value="al_bayader">Al-Bayader - Amman</option>
                    <option value="sahab">Sahab - Amman</option>
                    <option value="nazal_district">
                      Nazal District - Amman
                    </option>
                    <option value="amman_customs">Amman Customs</option>
                    <option value="abu_nuseir">Abu Nuseir - Amman</option>
                    <option value="al_baqaa">Al-Baqa'a - Amman</option>
                    <option value="naour">Naour - Amman</option>
                    <option value="salt">Salt</option>
                    <option value="irbid">Irbid</option>
                    <option value="ajloun">Ajloun</option>
                    <option value="jerash">Jerash</option>
                    <option value="madaba">Madaba</option>
                    <option value="mafraq">Mafraq</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 mt-2 rounded-md text-white font-medium transition duration-300 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[var(--secondary-color)]"
                  }`}
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  {loading ? "Adding..." : "Add Bus"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
