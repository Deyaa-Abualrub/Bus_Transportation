import { useEffect, useState } from "react";
import axios from "axios";
import { Bus, Users, UserCheck } from "lucide-react";
import statistic_image from "../assets/statistic_image.avif";

const Statistic = () => {
  const [stats, setStats] = useState({ buses: 0, drivers: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      className="py-14 px-4 bg-cover bg-center relative mt-16"
      style={{ backgroundImage: `url(${statistic_image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 text-center mb-10">
        <h2
          className="text-3xl font-bold"
          style={{ color: "var(--third-color)" }}
        >
          Trusted Transport Stats
        </h2>
        <p className="text-gray-200 mt-2 text-sm max-w-xl mx-auto">
          A glimpse at our network’s strength — safe, reliable, and trusted by
          many
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
        <div
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex items-center border-l-4"
          style={{ borderLeftColor: "var(--secondary-color)" }}
        >
          <div className="mr-5 p-4 rounded-full bg-white bg-opacity-10">
            <Bus size={36} style={{ color: "var(--secondary-color)" }} />
          </div>
          <div>
            <p
              className="text-4xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              {stats.buses}
            </p>
            <h3 className="text-lg font-medium text-gray-100">Modern Buses</h3>
            <p className="text-sm text-gray-300">Serving campuses daily</p>
          </div>
        </div>

        <div
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex items-center border-l-4"
          style={{ borderLeftColor: "var(--secondary-color)" }}
        >
          <div className="mr-5 p-4 rounded-full bg-white bg-opacity-10">
            <UserCheck size={36} style={{ color: "var(--secondary-color)" }} />
          </div>
          <div>
            <p
              className="text-4xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              {stats.drivers}
            </p>
            <h3 className="text-lg font-medium text-gray-100">
              Expert Drivers
            </h3>
            <p className="text-sm text-gray-300">Trained & safety certified</p>
          </div>
        </div>

        <div
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex items-center border-l-4"
          style={{ borderLeftColor: "var(--secondary-color)" }}
        >
          <div className="mr-5 p-4 rounded-full bg-white bg-opacity-10">
            <Users size={36} style={{ color: "var(--secondary-color)" }} />
          </div>
          <div>
            <p
              className="text-4xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              {stats.users}
            </p>
            <h3 className="text-lg font-medium text-gray-100">Happy Users</h3>
            <p className="text-sm text-gray-300">Students & faculty onboard</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
