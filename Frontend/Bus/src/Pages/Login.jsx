import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { User, Mail, Lock } from "react-feather";
import lr_video from "../assets/lr-video.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("http://localhost:4000/auth/google", {
  //       withCredentials: true,
  //     });
  //     window.location.href = response.data.redirectUrl; // كفاية هذا فقط
  //   } catch (error) {
  //     alert("Google Sign-in failed");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/signup",
        formData,
        { withCredentials: true }
      );
      alert(res.data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
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
      alert(res.data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
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
                  : "Enter your credentials to continue"}
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              // onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
            >
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="w-6 h-6"
              />
              {loading ? "Loading..." : "Continue with Google"}
            </button>

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

            <form
              onSubmit={isRegister ? handleRegister : handleLogin}
              className="space-y-6"
            >
              {/* Form Fields */}
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
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
                    Email
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
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
  );
};

export default App;
