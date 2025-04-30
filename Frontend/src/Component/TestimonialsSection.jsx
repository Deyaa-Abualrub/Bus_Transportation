import { useEffect, useState } from "react";
import axios from "axios";
import client_section from "../assets/client_section.jpg";
import { FaUserCircle, FaStar } from "react-icons/fa";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ message: "", rating: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    primary: "#1f2937",
    secondary: "#fb2c36",
    third: "#e8dbb1c8",
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) =>
        testimonials.length > 0 ? (prev + 1) % testimonials.length : 0
      );
    }, 5000); // كل 5 ثوانٍ

    return () => clearInterval(interval);
  }, [testimonials]);

  const fetchTestimonials = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/bus/testimonials")
      .then((res) => {
        setTestimonials(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("user_id");
      if (!userId) return alert("User not logged in");

      await axios.post("http://localhost:4000/bus/testimonials", {
        ...formData,
        user_id: userId,
      });

      alert("Thank you! Your testimonial is submitted for review.");
      setShowForm(false);
      setFormData({ message: "", rating: 0 });
      fetchTestimonials();
    } catch (err) {
      alert("Failed to submit testimonial.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderStars = (rating) =>
    Array.from({ length: rating }, (_, i) => (
      <FaStar key={i} style={{ color: colors.secondary }} />
    ));

  const getVisibleTestimonials = () => {
    const total = testimonials.length;
    if (total <= 3) return testimonials;

    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(visibleIndex + i) % total]);
    }
    return result;
  };

  return (
    <section
      className="our-testimonials text-center py-24 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${client_section})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 text-white px-4 md:px-12 lg:px-24">
        <p className="font-semibold text-lg">Our Testimonial</p>
        <h2 className="text-4xl mt-2">
          What Our <span className="text-red-600 font-bold">Clients</span> Say
        </h2>
        <p className="mt-4 max-w-xl mx-auto">
          Real feedback from our valued customers who have experienced our
          services firsthand.
        </p>

        <div className="testimonials flex justify-center gap-6 mt-12 flex-wrap">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.testimonial_id}
                className={`testimonial-card p-6 rounded-lg w-80 shadow-lg text-left transition-transform duration-300 ${
                  index === 1 ? "scale-110 z-20" : "scale-95 opacity-80"
                } bg-[#e8dbb1c8] text-[#1f2937]`}
              >
                {/* صورة المستخدم + الاسم */}
                <div className="profile flex items-center mb-4">
                  <FaUserCircle className="text-4xl mr-4" />
                  <div className="profile-info">
                    <span className="block font-bold text-lg">
                      {testimonial.User?.full_name || "Anonymous"}
                    </span>
                  </div>
                </div>

                {/* النجوم */}
                <div className="stars text-lg flex mb-2">
                  {renderStars(testimonial.rating)}
                </div>

                {/* الرسالة */}
                <p className="italic text-sm opacity-90">
                  {testimonial.message}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-10 px-8 py-3 rounded-lg transition-colors font-semibold shadow-md bg-red-600 text-white"
        >
          Add Your Testimonial
        </button>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="p-8 rounded-lg w-96 max-w-full mx-4 shadow-2xl relative bg-white border-t-4 border-red-600">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-2xl font-bold text-[#1f2937]"
              >
                ×
              </button>
              <h3 className="text-2xl mb-6 font-bold text-center text-[#1f2937]">
                Share Your Experience
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-left mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full p-3 border rounded-lg border-[#e8dbb1c8] bg-[#f9f7f1] text-[#1f2937]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-left mb-1">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={parseInt(formData.rating) === star}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <FaStar
                          className="text-2xl"
                          style={{
                            color:
                              parseInt(formData.rating) >= star
                                ? "#fb2c36"
                                : "#d1d5db",
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg transition-colors w-full font-semibold mt-6 bg-[#1f2937] text-white"
                >
                  Submit Testimonial
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
