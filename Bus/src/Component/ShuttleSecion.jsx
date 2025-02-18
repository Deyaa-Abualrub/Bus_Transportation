import about_photo from "../assets/about_photo.jpg";
import about_photo_small from "../assets/about_photo_small.jpg";
import { Link } from "react-router-dom";

export default function ShuttleSection() {
  return (
    <section className="shuttle-container flex flex-col md:flex-row items-center justify-center py-16 gap-12 max-w-5xl mx-auto">
      <div className="shuttle-content max-w-md">
        <h4 className="title text-primary text-lg font-bold mb-2">
          About Shuttle
        </h4>
        <h2 className="heading text-3xl font-semibold mb-5 text-black">
          More Than <span className="highlight text-primary">25 Years</span> We
          Provide
          <span className="underline text-secondary">Bus Charter</span> Service
          For You
        </h2>
        <p className="description text-gray-600 leading-relaxed mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo.
        </p>
        <ul className="features-list flex flex-wrap gap-5 text-gray-800 font-bold">
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ Brilient Client Service
          </li>
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ 24/7 Support
          </li>
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ Free Consultations
          </li>
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ User Experience
          </li>
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ Big Data & Analytics
          </li>
          <li className="feature-item flex items-center gap-2 w-[45%]">
            ✔ Quick Tips and Advice
          </li>
        </ul>
        <button className="btn inline-block text-white px-6 py-3 rounded-md hover:bg-[#eb2323] font-bold mt-5 bg-gray-800">
          <Link to="/about">More Details</Link>
        </button>
      </div>

      <div className="shuttle-images relative max-w-md">
        <div className="main-image-wrapper relative rounded-lg overflow-hidden">
          <img
            src={about_photo}
            alt="Bus Image"
            className="image w-full rounded-lg"
          />
          <div className="experience-badge absolute bottom-5 left-5 bg-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 text-primary">
            <span className="icon text-xl">🏆</span>
            <span className="number text-lg font-bold text-gray-800">25 +</span>
            <p className="font-bold text-black">Years Experience</p>
          </div>
        </div>
        <div className="overlay-wrapper absolute top-1/2 transform -translate-y-1/2 right-[-30px] border-4 border-white rounded-lg overflow-hidden shadow-md">
          <img
            src={about_photo_small}
            alt="Passenger in Bus"
            className="overlay-image w-[150px] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
