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
              Best Transport Service for Al-Hashamieh University
            </h3>
            <p className="text-base mb-2">
              We provide comfortable and safe transportation for all students,
              ensuring punctuality and reliability.
            </p>
            <a href="#" className="text-white font-bold">
              View Projects →
            </a>
          </div>
        </div>

        <div className="flex-1 bg-gray-800 text-white p-10 rounded-xl">
          <h2 className="text-4xl font-bold">Why Choose Hekaya Transport</h2>
          <h4 className="text-xl mt-4">
            Providing Reliable University Bus Services Since{" "}
            <strong>2014</strong>
          </h4>
          <p className="text-base text-gray-400 mt-4">
            We are committed to offering safe, comfortable, and timely bus
            services for students of Al-Hoshamieh University. With a fleet of
            well-maintained buses, we ensure that every student reaches their
            destination on time.
          </p>

          <div className="flex gap-8 mt-8 justify-around">
            <div className="text-center">
              <span className="text-4xl text-red-600">🚌</span>
              <h3 className="text-3xl mt-2">30 +</h3>
              <p className="text-base text-gray-400 mt-2">Buses Available</p>
            </div>

            <div className="text-center">
              <span className="text-4xl text-red-600">🏆</span>
              <h3 className="text-3xl mt-2">10,000 +</h3>
              <p className="text-base text-gray-400 mt-2">Satisfied Students</p>
            </div>

            <div className="text-center">
              <span className="text-4xl text-red-600">👥</span>
              <h3 className="text-3xl mt-2">100 +</h3>
              <p className="text-base text-gray-400 mt-2">Dedicated Staff</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
