import { useRef, useState, useEffect } from "react";
import hero_section from "../assets/hero_section.jpg";
import BookingForm from "./BookingForm";

export default function HeroSection() {
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const bookingRef = useRef(null);

  const handleGetStartedClick = () => {
    setScrollTrigger(true);
  };

  // Reset scroll trigger after scrolling is done
  useEffect(() => {
    if (scrollTrigger) {
      const timeout = setTimeout(() => setScrollTrigger(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [scrollTrigger]);

  return (
    <section
      className="hero-section bg-cover bg-center text-center min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-center relative text-white pt-16 md:pt-20 lg:pt-24 pb-8"
      style={{ backgroundImage: `url(${hero_section})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="hero w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg relative z-10">
          <div className="quote text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-5">
            Your{" "}
            <span className="text-[var(--primary-color)]">Fastest Route</span>{" "}
            To Hashemite University
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-5 font-semibold tracking-wide max-w-lg mx-auto">
            From your doorstep to campus – smooth, on-time rides across Jordan.
            Focus on your studies, we'll handle the journey.
          </p>

          <button
            onClick={handleGetStartedClick}
            className="text-white px-4 py-3 rounded-md bg-[var(--primary-color)]
                      shadow-lg transition duration-300 hover:bg-[var(--secondary-color)]
                      transform hover:scale-95 mb-6 md:mb-4 w-auto"
          >
            <span className="font-medium text-lg flex items-center justify-center">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div className="w-full max-w-md mx-auto" ref={bookingRef}>
            <BookingForm scrollToFrom={scrollTrigger} />
          </div>
        </div>
      </div>
    </section>
  );
}
