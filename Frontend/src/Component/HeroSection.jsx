import hero_section from "../assets/hero_section.jpg";
import BookingForm from "./BookingForm";

export default function HeroSection() {
  return (
    <section
      className="hero-section bg-cover bg-center text-center h-[80vh] flex items-center justify-center relative text-white pt-[60px]"
      style={{ backgroundImage: `url(${hero_section})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="hero w-[600px] max-w-full p-8 rounded-lg relative z-10">
        <div className="qoute text-3xl font-bold mb-5">
          Your{" "}
          <span className="text-[var(--primary-color)]">Fastest Route</span> To
          Hashemite University
        </div>
        <p className="text-lg leading-relaxed mb-5 font-semibold tracking-wide">
          From your doorstep to campus – smooth, on-time rides across Jordan.
          Focus on your studies, we'll handle the journey.
        </p>
        <button
          className=" text-white px-5 py-3 rounded-md  bg-[var(--primary-color)]
                         shadow-lg transition duration-300 hover:bg-[var(--secondary-color)]
                         transform hover:scale-95 mb-8"
        >
          <a
            href="#"
            className="font-medium text-base md:text-lg flex items-center"
          >
            <span>Get Started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </button>

        <BookingForm></BookingForm>
      </div>
    </section>
  );
}
