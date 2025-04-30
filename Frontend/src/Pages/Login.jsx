import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast"; 
import { User, Mail, Lock } from "react-feather";
import lr_video from "../assets/lr-video.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/checkoutSlice";
import {  GoogleLogin } from "@react-oauth/google";

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

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserName = localStorage.getItem("user");

    if (authStatus && storedUserName) {
      setIsRegister(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      const { token, user } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user.full_name);
      localStorage.setItem("user_id", user.user_id);

      dispatch(setUser({ username: user.full_name, user_id: user.user_id }));

      toast.success(res.data.message || "Welcome back!");

      localStorage.setItem("isAuthenticated", true);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/signup",
        formData,
        { withCredentials: true }
      );

      const { token, user } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user.full_name);
      localStorage.setItem("user_id", user.user_id);

      dispatch(setUser({ username: user.full_name, user_id: user.user_id }));

      toast.success("Registration successful. Welcome!");

      localStorage.setItem("isAuthenticated", true);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (response) => {
    if (response.error) {
      toast.error("Google Sign-In failed");
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
      toast.success("Logged in successfully!");
      // await loadUser(); 
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };





  return (
    <>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
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

              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={() => toast.error("Google login failed")}
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

              <form
                onSubmit={isRegister ? handleRegister : handleLogin}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {isRegister && (
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
                          className="w-full text-gray-900 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                          value={formData.full_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                        className="w-full text-gray-900 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
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

              <p className="text-center text-gray-600">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-[#eb2323] font-semibold"
                >
                  {isRegister ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
