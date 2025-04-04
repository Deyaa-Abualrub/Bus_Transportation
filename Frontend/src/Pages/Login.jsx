import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { User, Mail, Lock } from "react-feather";
import lr_video from "../assets/lr-video.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/checkoutSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // استيراد GoogleOAuthProvider

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      return newFormData;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const { token, user } = res.data; // التأكد من أن user يتضمن full_name
      localStorage.setItem("authtoken", token); // تخزين التوكن
      localStorage.setItem("user", user.full_name); // تخزين الاسم في localStorage

      setLoading(false);

      // تحديث الـ state للـ Redux
      dispatch(setUser({ username: user.full_name })); // هنا يتم تخزين الاسم في الـ Redux store

      Swal.fire({
        title: "Welcome back!",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#1f2937",
      });

      navigate("/"); // إعادة التوجيه بعد تسجيل الدخول الناجح

      // تحديث حالة التوثيق في الـ localStorage
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error occurred",
        text: error.response?.data?.message || "Login failed",
        icon: "error",
        confirmButtonColor: "#eb2323",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      const { token } = res.data; // استخراج التوكن وبيانات المستخدم
      localStorage.setItem("authtoken", token);
      localStorage.setItem("user", formData.full_name);

      setLoading(false);
      Swal.fire({
        title: "Welcome to the app!",
        text: "Registration successful.",
        icon: "success",
        confirmButtonColor: "#1f2937",
      });

      // تحديث الـ state للـ Redux
      dispatch(setUser({ username: formData.full_name }));

      Swal.fire({
        title: "Are you a user or a driver?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "User",
        cancelButtonText: "Driver",
        confirmButtonColor: "#1f2937",
        cancelButtonColor: "#eb2323",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "You are selected as a user!",
            icon: "success",
            confirmButtonColor: "#1f2937",
          });
          navigate("/"); // Redirect to home page if "User" is selected
        } else if (result.isDismissed) {
          Swal.fire({
            title: "You are selected as a driver!",
            icon: "success",
            confirmButtonColor: "#1f2937",
          });
        }
      });

      // تحديث حالة التوثيق في الـ localStorage
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error occurred",
        text: error.response?.data?.message || "Registration failed",
        icon: "error",
        confirmButtonColor: "#eb2323",
      });
    }
  };

  const handleGoogleSignIn = async (response) => {
    if (response.error) {
      // استخدام SweetAlert بدلاً من toast
      Swal.fire({
        icon: "error",
        title: "Google Sign-In failed",
        text: "Please try again.",
      });
      return;
    }

    setLoading(true);
    try {
      const { credential } = response;
      const res = await axios.post(
        "http://localhost:4000/auth/google",
        { token: credential },
        { withCredentials: true }
      );

      // استخدام SweetAlert بدلاً من toast
      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        text: "Welcome back!",
      });
      navigate("/");
    } catch (error) {
      console.error(error);

      // استخدام SweetAlert بدلاً من toast
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Something went wrong, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="695978598356-18ind1j88lblsb7egq7repemgsuebjtj.apps.googleusercontent.com">
      {" "}
      {/* Wrap components with GoogleOAuthProvider */}
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Video Section */}
          <div className="hidden md:block md:w-1/2 relative">
            <video
              src={lr_video}
              alt="Luxury Villa"
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/30">
              <h2 className="text-4xl font-bold mb-6">
                {isRegister ? "Start Your Journey" : "Welcome Back"}
              </h2>
              <p className="text-lg opacity-90">
                {isRegister
                  ? "Create your account and join our community today."
                  : "Sign in to access your personalized experience."}
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {isRegister ? "Create Account" : "Sign In"}
                </h3>
                <p className="text-gray-600">
                  {isRegister
                    ? "Fill in your details to get started"
                    : "Enter your details to continue"}
                </p>
              </div>

              {/* Google Sign In Button */}
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={() => Swal.error("Google login failed")}
                useOneTap
                render={(renderProps) => (
                  <button
                    {...renderProps}
                    className="w-full bg-blue-500 text-white py-3 rounded-md flex items-center justify-center gap-3 font-medium hover:bg-blue-600 transition-colors duration-300 mt-4"
                  >
                    <img
                      src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                      alt="Google"
                      className="w-6 h-6"
                    />
                    Continue with Google
                  </button>
                )}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <form
                onSubmit={isRegister ? handleRegister : handleLogin}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {isRegister && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            name="full_name"
                            type="text"
                            required
                            className="w-full text-gray-900 text-custom-gray pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300 "
                            placeholder="Enter your full name"
                            value={formData.full_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full  text-gray-900 text-custom-gray pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        name="password"
                        type="password"
                        required
                        className="w-full text-gray-900 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#eb2323] text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#eb2323] transition-all duration-300"
                >
                  {loading
                    ? "Loading..."
                    : isRegister
                    ? "Create Account"
                    : "Sign In"}
                </button>
              </form>

              {/* Toggle Link */}
              <p className="text-center text-gray-600">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-[#eb2323] font-semibold hover:text-[#eb2323] transition-colors duration-300"
                >
                  {isRegister ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
