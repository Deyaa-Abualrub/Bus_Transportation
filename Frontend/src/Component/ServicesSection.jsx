import "../Styles/ServicesSecion.css";

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <h2>
        Our <span>Services</span>
      </h2>
      <p>
        We offer reliable and safe transport services to ensure smooth and
        timely journeys for students of Al-Hoshamieh University.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <i className="service-icon text-5xl">🚍</i>
          <h3 className="service-title">Safety Guarantee</h3>
          <p className="service-description">
            Our buses are regularly inspected and maintained to ensure the
            highest safety standards for our students.
          </p>
        </div>

        <div className="service-card featured-service">
          <i className="service-icon text-5xl">🎉</i>
          <h3 className="service-title">Discount & Promo</h3>
          <p className="service-description">
            We offer special discounts and promotional offers for students,
            making transportation affordable for everyone.
          </p>
        </div>

        <div className="service-card">
          <i className="service-icon text-5xl">👨‍✈️</i>
          <h3 className="service-title">Professional Drivers</h3>
          <p className="service-description">
            Our drivers are highly trained professionals who ensure a
            comfortable and secure ride for all passengers.
          </p>
        </div>

        <div className="service-card">
          <i className="service-icon text-5xl">⏳</i>
          <h3 className="service-title">On-Time Schedule</h3>
          <p className="service-description">
            We prioritize punctuality, ensuring that students arrive on time for
            classes and events without delays.
          </p>
        </div>

        <div className="service-card">
          <i className="service-icon text-5xl">📲</i>
          <h3 className="service-title">Easy Online Booking</h3>
          <p className="service-description">
            Book your seat online with our easy-to-use platform and enjoy a
            hassle-free travel experience.
          </p>
        </div>

        <div className="service-card">
          <i className="service-icon text-5xl">📞</i>
          <h3 className="service-title">24/7 Support</h3>
          <p className="service-description">
            Our customer support team is available 24/7 to assist you with any
            inquiries or issues related to your transport needs.
          </p>
        </div>
      </div>
    </section>
  );
}
