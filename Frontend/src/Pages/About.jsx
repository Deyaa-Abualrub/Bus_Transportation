import about_page from "../assets/about_photo.jpg";
import { Facebook, Instagram, Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="font-sans m-0 p-0 text-gray-900 shadow-custom">
      <div className="flex flex-col lg:flex-row justify-between py-12 rounded-lg justify-center shadow-lg gap-12 mx-auto">
        {/* Text Content */}
        <div className="max-w-full lg:max-w-[60%] mb-6 lg:mb-0 ">
          <h1 className="font-bold text-4xl leading-[31px] tracking-tight mb-5">
            I'm Spencer Sharp. I live in New York City, where I design the
            future.
          </h1>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            I've loved making things for as long as I can remember, and wrote my
            first program when I was 6 years old, just two weeks after my mom
            brought home the brand new Macintosh LC 550 that I taught myself to
            type on.
          </p>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            The only thing I loved more than computers as a kid was space. When
            I was 8, I climbed the 40-foot oak tree at the back of our yard
            while wearing my older sister's motorcycle helmet, counted down from
            three, and jumped — hoping the tree was tall enough that with just a
            bit of momentum I'd be able to get to orbit.
          </p>

          <p className="text-base text-gray-500 mb-5 text-[18px]">
            I spent the next few summers indoors working on a rocket design,
            while I recovered from the multiple surgeries it took to fix my
            badly broken legs. It took nine iterations, but when I was 15 I sent
            my dad's Blackberry into orbit and was able to transmit a photo back
            down to our family computer from space.
          </p>

          <p className="text-base text-gray-500 text-[18px]">
            Today, I'm the founder of Planetaria, where we're working on
            civilian space suits and manned shuttle kits you can assemble at
            home so that the next generation of kids really can make it to orbit
            — from the comfort of their own backyards.
          </p>
        </div>

        {/* Info Content */}
        <div className="flex flex-col items-center lg:items-start gap-[30px]">
          {/* Image Content */}
          <div className="transform rotate-6 mb-12 lg:mb-0">
            <img
              src={about_page}
              alt="Astronaut"
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
                Follow on Facebook
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow on Instagram
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow on GitHub
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Follow on LinkedIn
              </span>
            </a>
            <div className="flex items-center text-gray-700 pt-3 border-t border-gray-200">
              <Mail className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">
                dyaaabualrub12@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
