import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const successGreenColor = "#28a745";

// Custom SweetAlert styling with CSS variables
const customSweetAlertStyle = {
  "--swal2-background": "#fff",
  "--swal2-confirm-button-background": successGreenColor,
  "--swal2-title-color": "var(--primary-color)",
  "--swal2-content-color": "var(--text-color)",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/bus/contact",
        formData
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: successGreenColor,
          background: "#fff",
          iconColor: successGreenColor,
          customClass: {
            popup: "sweet-alert-popup",
            title: "sweet-alert-title",
            confirmButton: "sweet-alert-confirm-button",
            content: "sweet-alert-content",
          },
          showClass: {
            popup: "animate__animated animate__fadeIn",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut",
          },
          didOpen: () => {
            // تطبيق المتغيرات CSS المخصصة على الـ SweetAlert
            const popup = Swal.getPopup();
            Object.entries(customSweetAlertStyle).forEach(([prop, value]) => {
              popup.style.setProperty(prop, value);
            });
          },
        });

        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      // عرض رسالة خطأ باستخدام SweetAlert2 (نحتفظ باللون الأحمر للخطأ)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response
          ? error.response.data.error || "Something went wrong."
          : "Server error. Please try again later.",
        confirmButtonText: "OK",
        confirmButtonColor: "var(--secondary-color)", 
        background: "#fff",
        iconColor: "var(--secondary-color)",
        customClass: {
          popup: "sweet-alert-popup",
          title: "sweet-alert-title",
          confirmButton: "sweet-alert-confirm-button",
          content: "sweet-alert-content",
        },
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          const errorStyle = {
            ...customSweetAlertStyle,
            "--swal2-confirm-button-background": "var(--secondary-color)",
          };
          Object.entries(errorStyle).forEach(([prop, value]) => {
            popup.style.setProperty(prop, value);
          });
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full max-w-7xl mx-auto my-10 bg-[var(--third-color)] rounded-2xl shadow-2xl overflow-hidden"
      style={{
        "--primary-color": "#1f2937",
        "--secondary-color": "#fb2c36",
        "--third-color": "#e8dbb1c8",
        "--text-color": "#333",
        "--second-text-color": "#bbb",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center p-10 bg-[var(--primary-color)] text-white rounded-t-2xl"
      >
        <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
          Contact Us
        </h1>
        <p className="text-lg text-gray-300">
          We're here to assist you with all your transportation inquiries
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
          <div className="mb-6 p-6 border-l-4 border-[var(--secondary-color)] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[var(--secondary-color)] font-semibold mb-2">
              🕒 Working Hours
            </h3>
            <p className="text-gray-700">Sunday to Thursday</p>
            <p className="text-gray-700">8:00 AM - 4:00 PM</p>
          </div>

          <div className="mb-6 p-6 border-l-4 border-[var(--secondary-color)] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[var(--secondary-color)] font-semibold mb-2">
              📞 Contact Information
            </h3>
            <p className="text-gray-700">Phone: +962-5-3903333</p>
            <p className="text-gray-700">Email: huniv@hu.edu.jo</p>
          </div>

          <div className="p-6 border-l-4 border-[var(--secondary-color)] bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl text-[var(--secondary-color)] font-semibold mb-2">
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
          <h2 className="text-3xl text-[var(--primary-color)] font-bold mb-6 text-center">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg text-[var(--primary-color)] font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] transition"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-lg text-[var(--primary-color)] font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] transition"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-lg text-[var(--primary-color)] font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] transition"
                placeholder="Enter your message"
                rows="4"
                required
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-[var(--secondary-color)] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#c71f1f] transition-all"
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
          className="w-full h-full border border-[var(--primary-color)] rounded-b-2xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.755871138239!2d36.18331018483494!3d32.102883081180764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b73d1eb51be21%3A0xc4daca834a1e6988!2z2KfZhNis2KfZhdi52Kkg2KfZhNmH2KfYtNmF2YrYqQ!5e0!3m2!1sar!2sjo!4v1739862400973!5m2!1sar!2sjo"
          allowFullScreen="" // بعرض الماب بشكل كامل ب تاب جديدة
          loading="lazy" // تحميل الخريطة بشكل بطيئ
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}
