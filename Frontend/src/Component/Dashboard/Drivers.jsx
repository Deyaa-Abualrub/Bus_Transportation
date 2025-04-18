import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { UserCheck, Search, Loader } from "lucide-react";

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/dashboard/drivers")
      .then((res) => {
        setDrivers(res.data);
        setFilteredDrivers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = drivers.filter(
      (driver) =>
        driver.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (driver.phone_number && driver.phone_number.includes(searchTerm))
    );
    setFilteredDrivers(results);
  }, [searchTerm, drivers]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="flex-1 overflow-auto p-6"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <UserCheck
              size={28}
              className="text-white p-1 rounded-md mr-3"
              style={{ backgroundColor: "var(--secondary-color)" }}
            />
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Drivers Management
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: "#f9fafb",
                borderColor: "#e5e7eb",
                focusRing: "var(--primary-color)",
              }}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Table Container with Shadow */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader
                className="animate-spin"
                size={40}
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
          ) : filteredDrivers.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No drivers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr style={{ backgroundColor: "var(--primary-color)" }}>
                    <th className="px-6 py-3 text-left text-white font-semibold">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-white font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-white font-semibold">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-white font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrivers.map((driver, index) => (
                    <tr
                      key={driver.driver_id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 font-medium">
                        {driver.full_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {driver.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {driver.phone_number || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: "var(--third-color)",
                            color: "var(--primary-color)",
                          }}
                        >
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="mt-4 text-sm text-gray-500 text-right">
          Showing {filteredDrivers.length} of {drivers.length} drivers
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
