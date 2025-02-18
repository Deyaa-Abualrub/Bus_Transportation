import '../Styles/ServicesSecion.css'

export default function ServicesSection  ()  {
    return (
      <section className="services-section" id="services">
        <h2>
          Our <span>Services</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
  
        <div className="services-grid">
          <div className="service-card">
            <i className="service-icon">🛡️</i>
            <h3 className="service-title">Safety Guarantee</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
  
          <div className="service-card featured-service">
            <i className="service-icon">🏷️</i>
            <h3 className="service-title">Discount & Promo</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
  
          <div className="service-card">
            <i className="service-icon">👨‍💼</i>
            <h3 className="service-title">Professional Staff</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
  
          <div className="service-card">
            <i className="service-icon">⏰</i>
            <h3 className="service-title">Schedule On Time</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
  
          <div className="service-card">
            <i className="service-icon">📱</i>
            <h3 className="service-title">Online Booking</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
  
          <div className="service-card">
            <i className="service-icon">📞</i>
            <h3 className="service-title">24/7 Support</h3>
            <p className="service-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="service-link">
              Read More →
            </a>
          </div>
        </div>
      </section>
    );
  };