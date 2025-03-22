import waiting_bus from "../assets/waiting_bus.jpg";

export default function WhyChooseUsSection() {
  return (
    <section className="flex justify-center items-center py-8 mb-16">
      <div className="flex max-w-screen-xl gap-1 flex-col gap-5 sm:flex-row sm:gap-1">
        <div className="relative flex-1 sm:mb-12">
          <img
            src={waiting_bus}
            alt="Bus Travelers"
            className="w-full rounded-xl"
          />
          <div className="absolute bottom-[-100px] left-10 bg-gray-800 text-white p-6 rounded-md max-w-[400px] ">
            <h3 className="text-xl font-semibold mb-2">
              We Provide Best Bus For You
            </h3>
            <p className="text-base mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-white font-bold">
              View Projects →
            </a>
          </div>
        </div>

        <div className="flex-1 bg-gray-800 text-white p-10 rounded-xl">
          <h2 className="text-4xl font-bold">Why Choose Us</h2>
          <h4 className="text-xl mt-4">
            We Are Experts In
            <span className="border-b-4 border-red-600">Bus Charter</span>{" "}
            Company Since <strong>1997</strong>
          </h4>
          <p className="text-base text-gray-400 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo.
          </p>

          <div className="flex gap-8 mt-8 justify-around">
            <div className="text-center">
              <span className="text-4xl text-red-600">🚌</span>
              <h3 className="text-3xl mt-2">25 +</h3>
              <p className="text-base text-gray-400 mt-2">Buses Ready</p>
            </div>

            <div className="text-center">
              <span className="text-4xl text-red-600">🏆</span>
              <h3 className="text-3xl mt-2">2,640 +</h3>
              <p className="text-base text-gray-400 mt-2">Satisfied Customer</p>
            </div>

            <div className="text-center">
              <span className="text-4xl text-red-600">👥</span>
              <h3 className="text-3xl mt-2">75 +</h3>
              <p className="text-base text-gray-400 mt-2">Professional Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
