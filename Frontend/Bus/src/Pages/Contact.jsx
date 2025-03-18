"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // تحديث القيم عند إدخال البيانات
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4000/bus/contact",
        formData
      );

      if (response.status === 201) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || "Something went wrong.");
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full max-w-7xl mx-auto my-10 bg-[#e8dbb1c8] rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center p-10 bg-[#1f2937] text-white rounded-t-2xl"
      >
        <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
          Contact Us
        </h1>
        <p className="text-lg text-gray-300">
          We’re here to assist you with all your transportation inquiries
        </p>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col md:flex-row min-h-[700px]">
        {/* Contact Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:flex-1 p-10 flex flex-col justify-center bg-white"
        >
          <div className="mb-6 p-6 border-l-4 border-[#eb2323] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[#eb2323] font-semibold mb-2">
              🕒 Working Hours
            </h3>
            <p className="text-gray-700">Sunday to Thursday</p>
            <p className="text-gray-700">8:00 AM - 4:00 PM</p>
          </div>

          <div className="mb-6 p-6 border-l-4 border-[#eb2323] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[#eb2323] font-semibold mb-2">
              📞 Contact Information
            </h3>
            <p className="text-gray-700">Phone: +962-5-3903333</p>
            <p className="text-gray-700">Email: huniv@hu.edu.jo</p>
          </div>

          <div className="p-6 border-l-4 border-[#eb2323] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[#eb2323] font-semibold mb-2">
              📍 Address
            </h3>
            <p className="text-gray-700">The Hashemite University</p>
            <p className="text-gray-700">Zarqa, Jordan</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:flex-1 p-10 bg-gray-50 flex flex-col justify-center"
        >
          <h2 className="text-3xl text-[#1f2937] font-bold mb-6 text-center">
            Send Us a Message
          </h2>
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg text-[#1f2937] font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb2323] transition"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-lg text-[#1f2937] font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb2323] transition"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-lg text-[#1f2937] font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb2323] transition"
                placeholder="Enter your message"
                rows="4"
                required
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-[#eb2323] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#c71f1f] transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full h-[400px]"
      >
        <iframe
          className="w-full h-full border border-[#1f2937] rounded-b-2xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.755871138239!2d36.18331018483494!3d32.102883081180764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b73d1eb51be21%3A0xc4daca834a1e6988!2z2KfZhNis2KfZhdi52Kkg2KfZhNmH2KfYtNmF2YrYqQ!5e0!3m2!1sar!2sjo!4v1739862400973!5m2!1sar!2sjo"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}
