import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import {
  UserCheck,
  Search,
  AlertCircle,
  Phone,
  Image,
  CheckCircle,
  Clock,
  XCircle,
  X,
} from "lucide-react";
import Pagination from "./Pagination";

const DriverRequests = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewImage, setViewImage] = useState({ id: null, type: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/dashboard/driver-requests?page=${currentPage}&limit=${itemsPerPage}`
        );
        if (response.data && Array.isArray(response.data)) {
          setDrivers(response.data);
          setHasNextPage(response.data.length === itemsPerPage);
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };
    fetchDrivers();
  }, [currentPage]);

  const filteredDrivers = (drivers || []).filter(
    (driver) =>
      (driver.full_name &&
        driver.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (driver.phone_number && driver.phone_number.includes(searchTerm))
  );

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-500" size={16} />;
      case "pending":
        return <Clock className="text-amber-500" size={16} />;
      case "rejected":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-amber-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const handleViewImage = (driverId, imageType) => {
    setViewImage({ id: driverId, type: imageType });
  };

  const closeImageModal = () => {
    setViewImage({ id: null, type: null });
  };

  const handleApprove = async (driverId) => {
    try {
      await axios.put(
        `http://localhost:4000/dashboard/drivers/${driverId}/approve`
      );
      setDrivers(
        (prev) => prev.filter((d) => d.driver_id !== driverId) // حذف من القائمة بعد الموافقة
      );
    } catch (error) {
      console.error("Error approving driver:", error);
      alert("Failed to approve driver");
    }
  };

  const handleReject = async (driverId) => {
    try {
      await axios.put(
        `http://localhost:4000/dashboard/drivers/${driverId}/reject`
      );
      setDrivers(
        (prev) => prev.filter((d) => d.driver_id !== driverId) // حذف من القائمة بعد الرفض
      );
    } catch (error) {
      console.error("Error rejecting driver:", error);
      alert("Failed to reject driver");
    }
  };

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
              Driver Information
            </span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {filteredDrivers.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--primary-color)" }}>
                  <th className="p-4 text-white text-left">Driver Name</th>
                  <th className="p-4 text-white text-left">Phone Number</th>
                  <th className="p-4 text-white text-left">License Image</th>
                  <th className="p-4 text-white text-left">
                    Non-Conviction Certificate
                  </th>
                  <th className="p-4 text-white text-left">Status</th>
                  <th className="p-4 text-white text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <tr
                    key={driver.driver_id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">{driver.full_name}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2" />
                        {driver.phone_number || "Not provided"}
                      </div>
                    </td>
                    <td className="p-4">
                      {driver.license_img ? (
                        <button
                          onClick={() =>
                            handleViewImage(driver.driver_id, "license")
                          }
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <Image size={16} className="mr-1" />
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </td>
                    <td className="p-4">
                      {driver.non_conviction_img ? (
                        <button
                          onClick={() =>
                            handleViewImage(driver.driver_id, "non_conviction")
                          }
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <Image size={16} className="mr-1" />
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm flex items-center w-fit ${getStatusColor(
                          driver.status
                        )}`}
                      >
                        {getStatusIcon(driver.status)}
                        <span className="ml-1 capitalize">{driver.status}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      {driver.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(driver.driver_id)}
                            className="py-1 px-3 rounded text-white text-sm"
                            style={{ backgroundColor: "var(--primary-color)" }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(driver.driver_id)}
                            className="py-1 px-3 rounded text-white bg-red-500 hover:bg-red-600 text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
            <p className="text-xl">No drivers found</p>
          </div>
        )}

        {/* Replace the pagination with the new component */}
        {(hasNextPage || currentPage > 1) && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}

        {viewImage.id && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {viewImage.type === "license"
                    ? "Driver License"
                    : "Non-Conviction Certificate"}
                </h3>
                <button
                  onClick={closeImageModal}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
                <img
                  src={`http://localhost:4000/${
                    drivers.find((d) => d.driver_id === viewImage.id)?.[
                      viewImage.type === "license"
                        ? "license_img"
                        : "non_conviction_img"
                    ]
                  }`}
                  alt={
                    viewImage.type === "license"
                      ? "Driver License"
                      : "Non-Conviction Certificate"
                  }
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRequests;
