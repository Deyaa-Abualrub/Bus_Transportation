import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DriverRegistr = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [licenseFile, setLicenseFile] = useState(null);
  const [nonConvictionFile, setNonConvictionFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("full_name", data.full_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone_number", data.phone_number);

      if (licenseFile) {
        formData.append("license_img", licenseFile);
      }

      if (nonConvictionFile) {
        formData.append("non_conviction_img", nonConvictionFile);
      }

      const response = await axios.post(
        "http://localhost:4000/bus/auth/driver/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Show success alert
        Swal.fire({
          title: "Registration Successful!",
          text: "You have successfully registered as a driver.",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--secondary-color)",
        }).then(() => {
          // Redirect to home page
          navigate("/");
        });
      } else {
        setMessage(`Error: ${response.data.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage(
        `Error: ${
          error.response?.data?.message || "Error connecting to server"
        }`
      );
      console.error("Error submitting form:", error);
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
                <h2 className="mt-6 text-2xl font-bold">Driver Registration</h2>
                <p className="mt-2 text-sm opacity-80">
                  Join our platform and start your journey with us
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
              <p className="text-sm opacity-70">Already have an account?</p>
              <Link to="/driver-login">
                <button className="mt-2 w-full py-2 px-4 border border-white border-opacity-50 rounded-md text-sm font-medium transition-all duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-2/3 p-8">
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg font-bold text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please fill in all required fields
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
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
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: errors.full_name
                        ? "var(--secondary-color)"
                        : "inherit",
                      focusRing: "var(--primary-color)",
                    }}
                    {...register("full_name", { required: true })}
                  />
                </div>
                {errors.full_name && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    This field is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        borderColor: errors.phone_number
                          ? "var(--secondary-color)"
                          : "inherit",
                        focusRing: "var(--primary-color)",
                      }}
                      {...register("phone_number", { pattern: /^[0-9+\s-]+$/ })}
                    />
                  </div>
                  {errors.phone_number && (
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--secondary-color)" }}
                    >
                      Invalid phone number
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
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
                    {...register("password", { required: true, minLength: 6 })}
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
                {errors.password?.type === "minLength" && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Document Uploads
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please upload clear images of your documents
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* License Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Image
                  </label>
                  <div
                    className="mt-1 flex justify-center items-center px-4 py-4 border-2 border-dashed rounded-md transition-colors duration-200"
                    style={{
                      borderColor: licenseFile
                        ? "var(--primary-color)"
                        : "rgb(209, 213, 219)",
                      backgroundColor: licenseFile
                        ? "rgba(232, 219, 177, 0.1)"
                        : "white",
                      height: "120px",
                    }}
                  >
                    <div className="space-y-1 text-center">
                      {licenseFile ? (
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            style={{ color: "var(--primary-color)" }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p
                            className="mt-1 text-xs font-medium truncate"
                            style={{ color: "var(--primary-color)" }}
                          >
                            {licenseFile.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-10 w-10 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="license-file-upload"
                              className="relative cursor-pointer rounded-md font-medium"
                              style={{ color: "var(--secondary-color)" }}
                            >
                              <span>Upload</span>
                              <input
                                id="license-file-upload"
                                name="license_img"
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  setLicenseFile(e.target.files[0])
                                }
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Non-Conviction Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Non-Conviction Certificate
                  </label>
                  <div
                    className="mt-1 flex justify-center items-center px-4 py-4 border-2 border-dashed rounded-md transition-colors duration-200"
                    style={{
                      borderColor: nonConvictionFile
                        ? "var(--primary-color)"
                        : "rgb(209, 213, 219)",
                      backgroundColor: nonConvictionFile
                        ? "rgba(232, 219, 177, 0.1)"
                        : "white",
                      height: "120px",
                    }}
                  >
                    <div className="space-y-1 text-center">
                      {nonConvictionFile ? (
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            style={{ color: "var(--primary-color)" }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p
                            className="mt-1 text-xs font-medium truncate"
                            style={{ color: "var(--primary-color)" }}
                          >
                            {nonConvictionFile.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-10 w-10 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="non-conviction-file-upload"
                              className="relative cursor-pointer rounded-md font-medium"
                              style={{ color: "var(--secondary-color)" }}
                            >
                              <span>Upload</span>
                              <input
                                id="non-conviction-file-upload"
                                name="non_conviction_img"
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  setNonConvictionFile(e.target.files[0])
                                }
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                  {loading ? "Processing..." : "Complete Registration"}
                </button>
              </div>

              <div className="block md:hidden text-center mt-6">
                <p className="text-sm text-gray-500">
                  Already have an account?
                </p>
                <Link to="/driver-login">
                  <button
                    className="mt-2 inline-block font-medium"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    Sign In
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

export default DriverRegistr;
