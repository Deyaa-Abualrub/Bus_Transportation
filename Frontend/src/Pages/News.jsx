import { useEffect, useState } from "react";
import news1 from "../assets/news1.jpg"; // Hero section
import news2 from "../assets/news2.jpg"; // Card 1 - New Routes
import news3 from "../assets/news3.jpg"; // Card 2 - Safety
import news4 from "../assets/news4.jpg"; // Card 3 - Summer Schedule
import news5 from "../assets/news5.jpg"; // New Bus Section
import news6 from "../assets/news6.jpg"; // Gallery 1
import news8 from "../assets/news8.jpg"; // Gallery 3
import news9 from "../assets/news9.jpg"; // Gallery 4
import news10 from "../assets/news10.jpg"; // Friends Offer
import news11 from "../assets/news11.jpg"; // Final Section
import friends_travel from "../assets/friends_travel.jpg"; // Friends travel image
import { Link } from "react-router-dom";

export default function News() {
  const [topUser, setTopUser] = useState(null);
  const [newDriver, setNewDriver] = useState(null);
  const [newBus, setNewBus] = useState(null);
  const [friendOffer, setFriendOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/bus/news");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setTopUser(data.topUser);
        setNewDriver(data.newDriver);
        setNewBus(data.newBus);
        setFriendOffer(data.friendOffer);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err.message);
        setError("Failed to load news data. Please try again later.");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto"
            style={{ borderColor: "var(--secondary-color)" }}
          />
          <p className="mt-4 text-lg" style={{ color: "var(--third-color)" }}>
            Loading news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 rounded-lg max-w-4xl mx-auto mt-8"
        style={{ backgroundColor: "var(--secondary-color)", opacity: 0.2 }}
      >
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--secondary-color)" }}
        >
          Error
        </h2>
        <p style={{ color: "var(--text-color)" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#e9e5dd" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Our Latest News
          </h1>
          <p className="text-lg" style={{ color: "var(--secondary-color)" }}>
            Stay updated with the latest from our bus service
          </p>
        </div>
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden h-64 mb-12">
          <img
            src={news1}
            alt="Bus fleet"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center"
            style={{ backgroundColor: "var(--overlay-color)" }}
          >
            <div className="text-white p-8">
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--third-color)" }}
              >
                Ride in Comfort
              </h2>
              <p
                className="text-xl"
                style={{ color: "var(--second-text-color)" }}
              >
                Discover our modern fleet of buses
              </p>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Top User */}
          <div
            className="rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: "var(--primary-color)",
              borderLeft: "4px solid var(--secondary-color)",
            }}
          >
            <div
              className="p-4"
              style={{ backgroundColor: "var(--secondary-color)" }}
            >
              <h3 className="text-xl font-bold text-white">
                Most Valued Customer (Last Month)
              </h3>
            </div>
            <div className="p-6">
              {topUser ? (
                <div className="flex items-center">
                  <div
                    className="rounded-full p-4 mr-4"
                    style={{ backgroundColor: "var(--third-color)" }}
                  >
                    👤
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold"
                      style={{ color: "var(--third-color)" }}
                    >
                      {topUser.full_name}
                    </h4>
                    <p style={{ color: "#ffe" }}>
                      {topUser.totalSeats} seats booked last month
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--second-text-color)" }}>
                  No data available
                </p>
              )}
            </div>
          </div>

          {/* Newest Driver */}
          <div
            className="rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: "var(--third-color)",
              borderLeft: "4px solid var(--third-color)",
            }}
          >
            <div
              className="p-4"
              style={{ backgroundColor: "var(--secondary-color)" }}
            >
              <h3 className="text-xl font-bold" style={{ color: "#ffe" }}>
                Newest Driver
              </h3>
            </div>
            <div className="p-6">
              {newDriver ? (
                <div className="flex items-center">
                  <div
                    className="rounded-full p-4 mr-4"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    🧑‍✈️
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold"
                      style={{ color: "var(--primary-color)" }}
                    >
                      {newDriver.full_name}
                    </h4>
                    <p style={{ color: "var(--secondary-color)" }}>
                      Bus Route: {newDriver.bus?.bus_route || "Not assigned"}
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--second-text-color)" }}>
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
        {/* News Cards */}
        <div className="mb-12">
          <h3
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            Latest From Our Fleet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: news2,
                title: "New Routes Added",
                desc: "Explore our expanded service area",
              },
              {
                img: news3,
                title: "Safety Features",
                desc: "Learn about our commitment to safety",
              },
              {
                img: news4,
                title: "Summer Schedules",
                desc: "Updated times for the season",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div
                  className="p-4"
                  style={{ backgroundColor: "var(--secondary-color)" }}
                >
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#ffe" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* New Bus */}
        <div
          className="rounded-lg shadow-lg overflow-hidden mb-12"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={news5}
                alt="New bus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div
                className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "#fff",
                }}
              >
                NEW ADDITION
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--third-color)" }}
              >
                Latest Bus to Join Our Fleet
              </h3>
              {newBus ? (
                <>
                  <div className="mb-4">
                    <div
                      className="text-sm"
                      style={{ color: "var(--second-text-color)" }}
                    >
                      Bus Number
                    </div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "var(--third-color)" }}
                    >
                      {newBus.bus_number}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div
                      className="text-sm"
                      style={{ color: "var(--second-text-color)" }}
                    >
                      Route
                    </div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "var(--third-color)" }}
                    >
                      {newBus.bus_route || "Not assigned"}
                    </div>
                  </div>
                  <ul
                    className="list-disc list-inside text-sm mt-2"
                    style={{ color: "var(--third-color)" }}
                  >
                    <li>Air conditioning</li>
                    <li>Comfortable seating</li>
                    <li>USB charging ports</li>
                    <li>Free WiFi</li>
                  </ul>
                </>
              ) : (
                <p style={{ color: "var(--second-text-color)" }}>
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[news6, news8, news11, news10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
        {/* Friend Offer */}
        <div
          className="rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundColor: "var(--primary-color)",
            border: "2px solid var(--secondary-color)",
          }}
        >
          <div className="md:flex items-center">
            <div className="md:w-1/3 p-8">
              <img
                src={friends_travel}
                alt="Friends traveling"
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h3
                className="text-3xl font-bold mb-4"
                style={{ color: "var(--third-color)" }}
              >
                Friends Travel Special Offer
              </h3>
              <p
                className="text-xl mb-6"
                style={{ color: "var(--second-text-color)" }}
              >
                Book 5 seats with your friends and get a discount of 10 cents
                per seat.
              </p>
              {friendOffer && (
                <div
                  className="p-3 rounded-lg inline-block"
                  style={{
                    backgroundColor: "var(--third-color)",
                    color: "var(--primary-color)",
                  }}
                >
                  Current discount: JD {friendOffer.discount} per seat
                </div>
              )}

              <Link to="/" className="mt-3 inline-block">
                <button
                  className="px-3 py-3 font-semibold text-lg rounded-lg shadow-lg hover:opacity-90 transition duration-300 ease-in-out ml-4"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--third-color)",
                  }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Final Section */}
        <div className="mt-8 rounded-lg shadow-lg overflow-hidden max-w-6xl">
          <div className="flex flex-col md:flex-row">
            {/* Info Section */}
            <div
              className="md:w-1/2 p-8"
              style={{
                backgroundColor: "var(secondary-color)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-4 text-white"
                style={{ color: "#e8dbb1c8" }}
              >
                University Transport
              </h3>
              <ul className="space-y-3 text-lg" style={{ color: "#bbb" }}>
                <li>• Daily shuttle service to/from Hashemite University</li>
                <li>• Extra trips during exam periods</li>
                <li>• New real-time bus tracking app</li>
              </ul>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 h-80">
              <img
                src={news9}
                alt="Hikaya Transport Services"
                className="w-full h-full object-cover"
                style={{
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
