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

  // Table headers configuration for both table and cards
  const tableHeaders = [
    { key: "full_name", label: "Driver Name" },
    {
      key: "phone_number",
      label: "Phone Number",
      render: (driver) => (
        <div className="flex items-center">
          <Phone size={16} className="mr-2" />
          {driver.phone_number || "Not provided"}
        </div>
      ),
    },
    {
      key: "license_img",
      label: "License Image",
      render: (driver) =>
        driver.license_img ? (
          <button
            onClick={() => handleViewImage(driver.driver_id, "license")}
            className="text-blue-500 hover:underline flex items-center"
          >
            <Image size={16} className="mr-1" />
            View
          </button>
        ) : (
          <span className="text-gray-400">Not provided</span>
        ),
    },
    {
      key: "non_conviction_img",
      label: "Non-Conviction Certificate",
      render: (driver) =>
        driver.non_conviction_img ? (
          <button
            onClick={() => handleViewImage(driver.driver_id, "non_conviction")}
            className="text-blue-500 hover:underline flex items-center"
          >
            <Image size={16} className="mr-1" />
            View
          </button>
        ) : (
          <span className="text-gray-400">Not provided</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (driver) => (
        <span
          className={`px-3 py-1 rounded-full text-sm flex items-center w-fit ${getStatusColor(
            driver.status
          )}`}
        >
          {getStatusIcon(driver.status)}
          <span className="ml-1 capitalize">{driver.status}</span>
        </span>
      ),
    },
    { key: "actions", label: "Actions" },
  ];

  // Render action buttons for both table and cards
  const renderActions = (driver) => {
    if (driver.status === "pending") {
      return (
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
      );
    }
    return null;
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
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--primary-color)" }}>
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="p-4 text-white text-left">
                        {header.label}
                      </th>
                    ))}
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
                              handleViewImage(
                                driver.driver_id,
                                "non_conviction"
                              )
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
                          <span className="ml-1 capitalize">
                            {driver.status}
                          </span>
                        </span>
                      </td>
                      <td className="p-4">{renderActions(driver)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (visible only on mobile) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {filteredDrivers.map((driver, index) => (
                <div
                  key={driver.driver_id}
                  className="relative rounded-lg shadow-md p-6 mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: "#fff",
                    border: `2px solid var(--primary-color)`,
                  }}
                >
                  {/* Decorative accent */}
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  ></div>

                  {/* Driver number badge */}
                  <div
                    className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "white",
                    }}
                  >
                    #{index + 1}
                  </div>

                  {/* Driver info */}
                  <div className="mt-4">
                    <div className="mb-4">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Driver Name
                      </p>
                      <p
                        className="font-bold text-lg mt-1"
                        style={{ color: "var(--primary-color)" }}
                      >
                        {driver.full_name}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Email
                      </p>
                      <p className="text-sm font-medium mt-1 break-all">
                        {driver.email}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Phone
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {driver.phone_number || (
                          <span className="opacity-50">N/A</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className="px-3 py-1 text-xs font-bold rounded-full"
                      style={{
                        backgroundColor: "var(--secondary-color)",
                        color: "white",
                      }}
                    >
                      Active
                    </span>

                    {/* Add any action buttons here if needed */}
                  </div>
                </div>
              ))}
            </div>
          </>
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
