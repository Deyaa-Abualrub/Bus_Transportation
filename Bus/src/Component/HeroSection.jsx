import hero_section from "../assets/hero_section.jpg";
import BookingForm from "./BookingForm";

export default function HeroSection() {
  return (
    <section
      className="hero-section bg-cover bg-center text-center h-[80vh] flex items-center justify-center relative text-white"
      style={{ backgroundImage: `url(${hero_section})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="hero w-[600px] max-w-full p-8 rounded-lg relative z-10">
        <div className="qoute text-3xl font-bold mb-5">
          We Are Best <span className="text-gray-800">Bus Charter</span> Service
          In The World
        </div>
        <p className="text-lg leading-relaxed mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
          aspernatur magni quisquam beatae eveniet porro ea voluptatum placeat
          id! Assumenda aperiam provident odio at, repudiandae ipsum similique!
          Quam, voluptatem quasi.
        </p>
        <button className="bg-gray-800 text-white px-6 py-3 text-lg rounded-md transition duration-300 hover:bg-red-500">
          <a href="#">Get Started</a>
        </button>

        <BookingForm></BookingForm>
      </div>
    </section>
  );
}
