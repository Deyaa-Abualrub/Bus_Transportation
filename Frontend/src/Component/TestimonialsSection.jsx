import client_section from '../assets/client_section.jpg'

export default function TestimonialsSection () {
    return (
      <section
        className="our-testimonials text-center py-24 bg-cover bg-center relative z-[-1]"
        style={{ backgroundImage: `url(${client_section})` }}
      >
        <p className="text-white">Our Testimonial</p>
        <h2 className="text-4xl text-white">
          What Our <span className="font-bold text-red-600">Clients</span> Say
        </h2>
        <p className="text-white mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
  
        <div className="testimonials flex justify-center gap-5 mt-12 flex-wrap">
          <div className="testimonial-card bg-white text-black p-8 rounded-lg w-72 shadow-md text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
            <div className="stars text-yellow-500 text-xl">★★★★★</div>
            <div className="profile flex items-center mt-4">
              <img
                src="profile1.jpg"
                alt="Bennett Miller"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="profile-info font-bold">
                <span className="name block">Bennett Miller</span>
                <span className="role text-gray-500 text-sm">IT Programmer</span>
              </div>
            </div>
          </div>
  
          <div className="testimonial-card bg-white text-black p-8 rounded-lg w-72 shadow-md text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
            <div className="stars text-yellow-500 text-xl">★★★★★</div>
            <div className="profile flex items-center mt-4">
              <img
                src="profile2.jpg"
                alt="Laura Ferguson"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="profile-info font-bold">
                <span className="name block">Laura Ferguson</span>
                <span className="role text-gray-500 text-sm">Designer</span>
              </div>
            </div>
          </div>
  
          <div className="testimonial-card bg-white text-black p-8 rounded-lg w-72 shadow-md text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
            <div className="stars text-yellow-500 text-xl">★★★★★</div>
            <div className="profile flex items-center mt-4">
              <img
                src="profile3.jpg"
                alt="Fred Rodriquez"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="profile-info font-bold">
                <span className="name block">Fred Rodriquez</span>
                <span className="role text-gray-500 text-sm">
                  Project Manager
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div>
      </section>
    );
  };
  