import about_photo from "../assets/about_photo.jpg";
import about_photo_small from "../assets/about_photo_small.jpg";
import { Link } from "react-router-dom";

export default function ShuttleSection() {
  return (
    <section className="shuttle-container flex flex-col md:flex-row items-center justify-center py-16 gap-12 max-w-5xl mx-auto">
      <div className="shuttle-content max-w-md text-center md:text-left">
        <h4 className="title text-primary text-lg font-bold mb-2">
          University Shuttle Service
        </h4>
        <h2 className="heading text-3xl font-semibold mb-5 text-black">
          Over <span className="highlight text-primary">10 Years</span> of
          Reliable <span className="underline text-secondary">Bus Service</span>
        </h2>
        <p className="description text-gray-600 leading-relaxed mb-5">
          Convenient, affordable, and sustainable transportation for students,
          faculty, and staff. Providing reliable service every day across the
          campus and beyond.
        </p>
        <ul className="features-list grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 font-bold">
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Safe, On-Time Rides
          </li>
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Comfortable & Spacious Buses
          </li>
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Budget-Friendly Fares
          </li>
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Environmentally Friendly
          </li>
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Efficient Routes & Timely Service
          </li>
          <li className="feature-item flex items-center gap-3">
            <span className="text-xl">✔</span> Easy Access to Schedules
          </li>
        </ul>

        <button className="btn inline-block text-white px-6 py-3 rounded-md hover:bg-[#eb2323] font-bold mt-5 bg-gray-800">
          <Link to="/about">Learn More</Link>
        </button>
      </div>

      <div className="shuttle-images relative max-w-md mt-8 md:mt-0">
        <div className="main-image-wrapper relative rounded-lg overflow-hidden">
          <img
            src={about_photo}
            alt="Bus Image"
            className="image w-full rounded-lg"
          />
          <div className="experience-badge absolute bottom-5 left-5 bg-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 text-primary">
            <span className="icon text-xl">🏆</span>
            <span className="number text-lg font-bold text-gray-800">10 +</span>
            <p className="font-bold text-black">Years of Service</p>
          </div>
        </div>
        <div className="overlay-wrapper absolute top-1/2 transform -translate-y-1/2 right-0 lg:right-[-20px] border-4 border-white rounded-lg overflow-hidden shadow-md">
          <img
            src={about_photo_small}
            alt="Passenger in Bus"
            className="overlay-image w-[120px] md:w-[150px] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
