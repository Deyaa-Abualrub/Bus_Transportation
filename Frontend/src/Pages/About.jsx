import about_page from "../assets/about_photo.jpg";
import { Facebook, Instagram, Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="font-sans m-0 p-0 text-gray-900 shadow-custom">
      <div className="flex flex-col lg:flex-row justify-between py-12 rounded-lg justify-center shadow-lg gap-12 mx-auto px-4 sm:px-6">
        {/* Text Content */}
        <div className="max-w-full lg:max-w-[60%] mb-6 lg:mb-0">
          <h1 className="font-bold text-4xl leading-[42px] tracking-tight mb-6 mt-4">
            Welcome to <span className="text-primary">Hashemite University</span>{" "}
            Transportation Services
          </h1>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            At Hashemite University, we are proud to offer a variety of
            transportation services to make your campus life more accessible and
            convenient. Whether you're heading to class, attending an event, or
            returning home, our bus service is here to ensure that your journey
            is smooth and timely.
          </p>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            Our fleet of modern buses is equipped with the latest technology and
            features to provide a comfortable and efficient ride. With dedicated
            routes that cover all major areas of the university and surrounding
            locations, getting around has never been easier.
          </p>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            We understand the importance of punctuality, and our transportation
            service is designed to get you to your destination on time, every
            time. Whether you're catching an early class or need a late-night
            ride, our services are available throughout the day to meet your
            needs.
          </p>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            As part of our commitment to sustainability, we are constantly
            working on making our transportation services more environmentally
            friendly. By reducing carbon emissions and offering efficient,
            eco-conscious solutions, we are helping contribute to a greener,
            cleaner campus.
          </p>

          <p className="text-base text-gray-500 text-[18px]">
            Join us in making your campus commute easier and more enjoyable. We
            are always striving to enhance our services to meet the evolving
            needs of the Hashemite University community.
          </p>

          <p className="text-base text-gray-500 text-[18px]">
            Your feedback is essential to us. We encourage you to share your
            thoughts and suggestions to help us continue to improve our
            services.
          </p>
        </div>

        {/* Info Content */}
        <div className="flex flex-col items-center lg:items-start gap-[30px]">
          {/* Image Content */}
          <div className="transform rotate-6 mb-12 lg:mb-0">
            <img
              src={about_page}
              alt="University Shuttle"
              className="w-[250px] transform rotate-6 rounded-lg"
            />
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-3">
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow Us on Facebook
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow Us on Instagram
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow Us on GitHub
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow Us on LinkedIn
              </span>
            </a>
            <div className="flex items-center text-gray-700 pt-3 border-t border-gray-200">
              <Mail className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">
                transportation@hu.edu.jo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
