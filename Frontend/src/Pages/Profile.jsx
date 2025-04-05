import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  // Get the user_id from localStorage
  const userId = localStorage.getItem("user_id");

  // Fetch user data when the modal is opened
  useEffect(() => {
    if (isOpen && userId) {
      axios
        .get(`http://localhost:4000/auth/profile/${userId}`)
        .then((response) => {
          setUser(response.data.user);
          setFormData({
            full_name: response.data.user.full_name,
            email: response.data.user.email,
            password: "",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOpen, userId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/auth/profile/${userId}`, formData)
      .then((response) => {
        alert(response.data.message);
        setUser(response.data.user); // Update user data in UI
      })
      .catch((error) => {
        alert("Error updating profile");
      });
  };

  if (!isOpen) return null; // Don't display if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with enhanced blur effect */}
      <div
        className="fixed inset-0  backdrop-blur-md"
        onClick={onClose}
        style={ {backgroundColor: "#000000", opacity: 0.7 }}
      />

      {/* Modal with improved styling */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl z-50 max-w-md w-full transform transition-all duration-300">
        {/* Header with accent color */}
        <div
          className="flex justify-between items-center p-4"
          style={{ background: "var(--primary-color, #1f2937)" }}
        >
          <h2 className="text-white font-bold text-xl">Profile Settings</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* User Profile Content */}
        {!user ? (
          <div className="flex justify-center items-center p-12">
            <div
              className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
              style={{ borderTopColor: "var(--secondary-color, #fb2c36)" }}
            ></div>
          </div>
        ) : (
          <>
            <div
              className="text-center py-6 relative"
              style={{ background: "var(--third-color, #e8dbb1c8)" }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div
                  className="absolute top-6 left-6 w-12 h-12 rounded-full"
                  style={{ background: "var(--secondary-color, #fb2c36)" }}
                ></div>
                <div
                  className="absolute bottom-6 right-6 w-16 h-16 rounded-full"
                  style={{ background: "var(--primary-color, #1f2937)" }}
                ></div>
              </div>

              {/* Profile picture with improved styling */}
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://placekitten.com/300/300"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 right-3 bg-white rounded-full p-1 shadow-md z-20">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{ background: "var(--secondary-color, #fb2c36)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* User name with better typography */}
              <h2
                className="mt-4 text-2xl font-bold relative z-10"
                style={{
                  color: "var(--primary-color, #1f2937)",
                }}
              >
                {user.full_name}
              </h2>
            </div>

            {/* Form with improved styling */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="relative">
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-bold"
                  style={{ color: "var(--primary-color, #1f2937)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 transition-all duration-200 focus:outline-none"
                  style={{
                    border: "2px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    color: "var(--primary-color, #1f2937)",
                    focusRing: "var(--secondary-color, #fb2c36)",
                  }}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold"
                  style={{ color: "var(--primary-color, #1f2937)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 transition-all duration-200 focus:outline-none"
                  style={{
                    border: "2px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    color: "var(--primary-color, #1f2937)",
                    focusRing: "var(--secondary-color, #fb2c36)",
                  }}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold"
                  style={{ color: "var(--primary-color, #1f2937)" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 transition-all duration-200 focus:outline-none"
                  style={{
                    border: "2px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    color: "var(--primary-color, #1f2937)",
                    focusRing: "var(--secondary-color, #fb2c36)",
                  }}
                />
                <div className="absolute right-4 top-10 text-gray-400 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, var(--secondary-color, #fb2c36) 0%, #ff6b61 100%)`,
                    color: "white",
                    boxShadow: "0 4px 15px rgba(251, 44, 54, 0.3)",
                  }}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
