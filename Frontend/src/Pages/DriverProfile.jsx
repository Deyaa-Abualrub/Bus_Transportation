import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Key,
  Calendar,
  Mail,
  Truck,
  Check,
  LogOut,
  Edit,
  Save,
  X,
} from "lucide-react";

const DriverProfile = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    old_password: "",
    new_password: "",
  });

  const statusLabels = {
    1: "Available",
    2: "On Route",
    3: "Available In HU",
    4: "Inactive",
  };

  const fetchDriver = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/driver/profile/${driverId}`
      );
      setDriver(res.data);
      setCurrentStatus(res.data.bus?.status);
      setFormData({
        full_name: res.data.full_name,
        phone_number: res.data.phone_number,
        old_password: "",
        new_password: "",
      });
    } catch (err) {
      toast.error("Failed to fetch driver data", { id: "fetch-error" });
    }
  };

  const updateBusStatus = async (status) => {
    if (currentStatus === status) return; // Prevent unnecessary updates

    const toastId = "status-update";
    try {
      await axios.put(`http://localhost:4000/driver/bus-status/${driverId}`, {
        status,
        fromStatus: currentStatus,
      });

      toast.success(`Status updated: ${statusLabels[status]}`, { id: toastId });
      setCurrentStatus(status);
    } catch (err) {
      toast.error("Error updating bus status", { id: toastId });
    }
  };

  const updateDriverInfo = async () => {
    try {
      await axios.put(
        `http://localhost:4000/driver/update/${driverId}`,
        formData
      );
      toast.success("Profile updated successfully", { id: "profile-update" });
      setEditMode(false);
      fetchDriver();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        id: "profile-error",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to logout", { id: "logout-error" });
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    // Reset form if cancelling edit
    if (editMode) {
      setFormData({
        full_name: driver.full_name,
        phone_number: driver.phone_number,
        old_password: "",
        new_password: "",
      });
    }
  };

  useEffect(() => {
    fetchDriver();
  }, [driverId]);

  return (
    <div
      className="min-h-screen py-4 px-4 sm:py-6 md:py-8"
      style={{
        "--primary-color": "#1f2937",
        "--secondary-color": "#fb2c36",
        "--third-color": "#e8dbb1c8",
        backgroundColor: "var(--third-color)",
      }}
    >
      <Toaster />
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Profile Image - Responsive layout */}
          <div
            className="p-4 sm:p-6 relative"
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1">
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--secondary-color)" }}
                    >
                      <User size={32} color="white" />
                    </div>
                  </div>
                </div>
                <div className="ml-0 sm:ml-6 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold">
                    {driver?.full_name || "Driver"}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start mt-1">
                    <Phone size={16} className="mr-2" />
                    <span>{driver?.phone_number || "No phone number"}</span>
                  </div>
                  <p className="opacity-75 flex items-center justify-center sm:justify-start mt-1">
                    <Mail size={16} className="mr-2" />
                    {driver?.email || "loading@email.com"}
                  </p>
                  <div
                    className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    <Truck size={14} className="mr-1" />
                    Bus: {driver?.bus?.bus_number || "Unassigned"}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center  py-2 px-4 rounded-lg transition-all duration-200 hover:bg-opacity-80 sm:mx-0 mx-auto"
                style={{ backgroundColor: "var(--secondary-color)" }}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6">
            {!driver ? (
              <div className="flex justify-center py-12">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{ borderColor: "var(--secondary-color)" }}
                ></div>
              </div>
            ) : (
              <div>
                {/* Member Since Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 mb-6 rounded-lg bg-gray-50">
                  <Calendar
                    size={20}
                    className="mb-2 sm:mb-0 mr-0 sm:mr-3"
                    style={{ color: "var(--primary-color)" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p
                      className="font-medium"
                      style={{ color: "var(--primary-color)" }}
                    >
                      {new Date(driver.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Bus Status Section */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-lg border border-gray-100 bg-gray-50">
                  <h2
                    className="text-lg sm:text-xl font-medium mb-3 sm:mb-4"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Bus Status
                  </h2>

                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        Current Status:
                      </span>
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-lg text-white"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        <Truck size={16} className="mr-2" />
                        {statusLabels[currentStatus] || "Unknown"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-md font-medium mb-3"
                      style={{ color: "var(--primary-color)" }}
                    >
                      Update Status
                    </h3>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => updateBusStatus(Number(key))}
                          className="flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                          style={{
                            backgroundColor:
                              currentStatus === Number(key)
                                ? "var(--secondary-color)"
                                : "var(--primary-color)",
                            color: "white",
                            opacity: currentStatus === Number(key) ? 1 : 0.8,
                          }}
                        >
                          {currentStatus === Number(key) && (
                            <Check size={16} className="mr-1" />
                          )}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h2
                      className="text-lg sm:text-xl font-medium"
                      style={{ color: "var(--primary-color)" }}
                    >
                      Profile Information
                    </h2>
                    <button
                      onClick={toggleEditMode}
                      className="flex items-center justify-center p-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: editMode
                          ? "gray"
                          : "var(--secondary-color)",
                        color: "white",
                      }}
                    >
                      {editMode ? (
                        <>
                          <X size={18} className="mr-1" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit size={18} className="mr-1" />
                          Edit
                        </>
                      )}
                    </button>
                  </div>

                  {/* Edit Mode Form */}
                  {editMode ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      {/* Left column - Personal info */}
                      <div className="space-y-4 sm:space-y-5">
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--primary-color)" }}
                          >
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User
                                size={18}
                                style={{ color: "var(--primary-color)" }}
                              />
                            </div>
                            <input
                              type="text"
                              value={formData.full_name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  full_name: e.target.value,
                                })
                              }
                              className="w-full py-2 sm:py-3 pl-10 pr-3 border rounded-lg"
                              style={{ borderColor: "var(--primary-color)" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--primary-color)" }}
                          >
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone
                                size={18}
                                style={{ color: "var(--primary-color)" }}
                              />
                            </div>
                            <input
                              type="text"
                              value={formData.phone_number}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone_number: e.target.value,
                                })
                              }
                              className="w-full py-2 sm:py-3 pl-10 pr-3 border rounded-lg"
                              style={{ borderColor: "var(--primary-color)" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right column - Password */}
                      <div className="space-y-4 sm:space-y-5 mt-4 md:mt-0">
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--primary-color)" }}
                          >
                            Current Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key
                                size={18}
                                style={{ color: "var(--primary-color)" }}
                              />
                            </div>
                            <input
                              type="password"
                              value={formData.old_password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  old_password: e.target.value,
                                })
                              }
                              className="w-full py-2 sm:py-3 pl-10 pr-3 border rounded-lg"
                              style={{ borderColor: "var(--primary-color)" }}
                              placeholder="Enter current password"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--primary-color)" }}
                          >
                            New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key
                                size={18}
                                style={{ color: "var(--primary-color)" }}
                              />
                            </div>
                            <input
                              type="password"
                              value={formData.new_password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  new_password: e.target.value,
                                })
                              }
                              className="w-full py-2 sm:py-3 pl-10 pr-3 border rounded-lg"
                              style={{ borderColor: "var(--primary-color)" }}
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={updateDriverInfo}
                        className="w-full md:col-span-2 py-2 sm:py-3 mt-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center"
                        style={{ backgroundColor: "var(--secondary-color)" }}
                      >
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    /* Non-edit mode - Just show basic info without fields */
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="mb-1 text-gray-500 text-sm">
                        You can edit your profile information by clicking the
                        Edit button.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
