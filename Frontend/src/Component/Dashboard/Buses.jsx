import { useEffect, useState } from "react";
import axios from "axios";
import { Bus, Search, Loader, MapPin, Users } from "lucide-react";
import Sidebar from "../Sidebar";
import Pagination from "./Pagination";

const BusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:4000/dashboard/buses?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((res) => {
        setBuses(res.data);
        setFilteredBuses(res.data);
        setHasNextPage(res.data.length === itemsPerPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching buses:", error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    const results = buses.filter(
      (bus) =>
        bus.bus_number.toString().includes(searchTerm) ||
        bus.bus_route.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBuses(results);
  }, [searchTerm, buses]);

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <div
        className="flex-1 p-4 sm:p-6 w-full"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <Bus
              size={28}
              className="text-white p-1 rounded-md mr-3"
              style={{ backgroundColor: "var(--secondary-color)" }}
            />
            <h1
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Bus Management
            </h1>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search buses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
              style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader
              className="animate-spin"
              size={40}
              style={{ color: "var(--secondary-color)" }}
            />
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No buses found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.bus_id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={bus.bus_image}
                      alt={`Bus #${bus.bus_number}`}
                      className="h-40 sm:h-48 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg";
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 m-3 px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                      }}
                    >
                      Bus #{bus.bus_number}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: "var(--primary-color)" }}
                      >
                        {bus.bus_route.split("-")[0]}
                        <span className="mx-2">→</span>
                        {"HU"}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 text-gray-500" size={16} />
                        <span
                          className="font-medium mr-2"
                          style={{ color: "var(--primary-color)" }}
                        >
                          Seats:
                        </span>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              parseInt(bus.seat_available) > 10
                                ? "#dcfce7"
                                : parseInt(bus.seat_available) > 5
                                ? "var(--third-color)"
                                : "#fee2e2",
                            color:
                              parseInt(bus.seat_available) > 10
                                ? "#166534"
                                : parseInt(bus.seat_available) > 5
                                ? "#854d0e"
                                : "#991b1b",
                          }}
                        >
                          {bus.seat_available} available
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 text-gray-500" size={16} />
                        <span
                          className="font-medium mr-2"
                          style={{ color: "var(--primary-color)" }}
                        >
                          Route:
                        </span>
                        <span className="text-gray-600 text-xs sm:text-sm truncate">
                          {bus.bus_route}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-2">
                      <button
                        className="text-sm px-3 py-1 rounded-md w-full sm:w-auto"
                        style={{
                          backgroundColor: "var(--third-color)",
                          color: "var(--primary-color)",
                        }}
                      >
                        View Schedule
                      </button>
                      <button
                        className="text-sm px-3 py-1 rounded-md w-full sm:w-auto"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        Manage Bus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(hasNextPage || currentPage > 1) && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  hasNextPage={hasNextPage}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusesPage;
