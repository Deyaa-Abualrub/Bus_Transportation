import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DriverLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4000/bus/auth/driver/signin",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // لتمكين ارسال الكوكيز مع الطلب
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Sign In Successful!",
          text: "You have successfully signed in.",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--secondary-color)",
        }).then(() => {
          // Redirect to home or dashboard
          navigate("/");
        });
      } else {
        setMessage(`Error: ${response.data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      setMessage("Error connecting to server");
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "var(--secondary-color)",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: `var(--third-color)` }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Banner */}
          <div
            className="w-full md:w-1/3 p-8 text-white flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)`,
            }}
          >
            <div>
              <div className="text-center md:text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto md:mx-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <h2 className="mt-6 text-2xl font-bold">Driver Sign In</h2>
                <p className="mt-2 text-sm opacity-80">
                  Welcome back! Please sign in to continue
                </p>
              </div>

              <div className="mt-8 hidden md:block">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm">Professional Support</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm">Flexible Schedule</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm">Great Earnings</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 hidden md:block">
              <p className="text-sm opacity-70">Don't have an account?</p>
              <Link to="/driver-register">
                <button className="mt-2 w-full py-2 px-4 border border-white border-opacity-50 rounded-md text-sm font-medium transition-all duration-200">
                  Register Now
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg font-bold text-gray-900">
                Sign In to Your Account
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: errors.email
                        ? "var(--secondary-color)"
                        : "inherit",
                      focusRing: "var(--primary-color)",
                    }}
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email?.type === "required" && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Email is required
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Invalid email address
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: errors.password
                        ? "var(--secondary-color)"
                        : "inherit",
                      focusRing: "var(--primary-color)",
                    }}
                    {...register("password", { required: true })}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password?.type === "required" && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Password is required
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  style={{ color: "var(--primary-color)" }}
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Keep me signed in
                </label>
              </div>

              {/* Status Message */}
              {message && (
                <div
                  className={`p-3 rounded-md ${
                    message.includes("Error") ? "bg-red-50" : "bg-green-50"
                  }`}
                  style={{
                    color: message.includes("Error")
                      ? "var(--secondary-color)"
                      : "green",
                    borderLeft: `4px solid ${
                      message.includes("Error")
                        ? "var(--secondary-color)"
                        : "green"
                    }`,
                  }}
                >
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:opacity-90 focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    boxShadow: "0 4px 6px rgba(251, 44, 54, 0.15)",
                  }}
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>

              <div className="block md:hidden text-center mt-6">
                <p className="text-sm text-gray-500">Don't have an account?</p>
                <Link to="/driver-register">
                  <button
                    href="#"
                    className="mt-2 inline-block font-medium"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Register Now
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
