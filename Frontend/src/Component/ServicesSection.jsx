import React from "react";
import {
  ShieldCheck,
  Gift,
  Users,
  Clock,
  Smartphone,
  HeadphonesIcon,
} from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="bg-gray-100 py-16 px-4" id="services">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our{" "}
          <span
            className="text-red-600"
            style={{ color: "var(--secondary-color)" }}
          >
            Services
          </span>
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          We offer reliable and safe transport services to ensure smooth and
          timely journeys for students of Al-Hoshamieh University.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            style={{ borderTop: "3px solid var(--primary-color)" }}
          >
            <div className="flex justify-center mb-4">
              <ShieldCheck
                size={48}
                style={{ color: "var(--primary-color)" }}
              />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Safety Guarantee
            </h3>
            <p className="text-gray-600 text-center">
              Our buses are regularly inspected and maintained to ensure the
              highest safety standards for our students.
            </p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 transform scale-105 transition-transform duration-300 hover:scale-110"
            style={{
              borderTop: "3px solid var(--secondary-color)",
              background:
                "linear-gradient(to bottom right, white, var(--third-color))",
            }}
          >
            <div className="flex justify-center mb-4">
              <Gift size={48} style={{ color: "var(--secondary-color)" }} />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--secondary-color)" }}
            >
              Discount & Promo
            </h3>
            <p className="text-gray-700 text-center">
              We offer special discounts and promotional offers for students,
              making transportation affordable for everyone.
            </p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            style={{ borderTop: "3px solid var(--primary-color)" }}
          >
            <div className="flex justify-center mb-4">
              <Users size={48} style={{ color: "var(--primary-color)" }} />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Professional Drivers
            </h3>
            <p className="text-gray-600 text-center">
              Our drivers are highly trained professionals who ensure a
              comfortable and secure ride for all passengers.
            </p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            style={{ borderTop: "3px solid var(--primary-color)" }}
          >
            <div className="flex justify-center mb-4">
              <Clock size={48} style={{ color: "var(--primary-color)" }} />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              On-Time Schedule
            </h3>
            <p className="text-gray-600 text-center">
              We prioritize punctuality, ensuring that students arrive on time
              for classes and events without delays.
            </p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            style={{ borderTop: "3px solid var(--primary-color)" }}
          >
            <div className="flex justify-center mb-4">
              <Smartphone size={48} style={{ color: "var(--primary-color)" }} />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Easy Online Booking
            </h3>
            <p className="text-gray-600 text-center">
              Book your seat online with our easy-to-use platform and enjoy a
              hassle-free travel experience.
            </p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            style={{ borderTop: "3px solid var(--primary-color)" }}
          >
            <div className="flex justify-center mb-4">
              <HeadphonesIcon
                size={48}
                style={{ color: "var(--primary-color)" }}
              />
            </div>
            <h3
              className="text-xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              24/7 Support
            </h3>
            <p className="text-gray-600 text-center">
              Our customer support team is available 24/7 to assist you with any
              inquiries or issues related to your transport needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
