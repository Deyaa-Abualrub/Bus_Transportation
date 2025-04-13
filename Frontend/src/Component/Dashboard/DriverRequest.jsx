import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { UserCheck, Search, AlertCircle } from "lucide-react";

const DriverRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/driver-requests"
        );
        if (response.data && Array.isArray(response.data)) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching driver requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (driverId) => {
    try {
      await axios.post(
        `http://localhost:4000/admin/approve-driver/${driverId}`
      );
      setRequests(requests.filter((req) => req.driverId !== driverId));
    } catch (error) {
      console.error("Error approving driver:", error);
    }
  };

  const filteredRequests = (requests || []).filter(
    (request) =>
      (request.fullName && request.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.email && request.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="dashboard-content p-8 flex-1 overflow-auto"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="flex items-center">
              <UserCheck className="mr-2" />
              Driver Requests
            </span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search drivers..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--primary-color)" }}>
                  <th className="p-4 text-white text-left">Driver Name</th>
                  <th className="p-4 text-white text-left">Email</th>
                  <th className="p-4 text-white text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.driverId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{request.fullName}</td>
                    <td className="p-4">{request.email}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleApprove(request.driverId)}
                        className="flex items-center py-2 px-4 rounded text-white transition-colors"
                        style={{ backgroundColor: "var(--secondary-color)" }}
                      >
                        <UserCheck className="mr-2" size={16} />
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <AlertCircle
              size={48}
              className="mx-auto mb-4"
              style={{ color: "var(--primary-color)" }}
            />
            <p className="text-xl">No driver requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRequests;
