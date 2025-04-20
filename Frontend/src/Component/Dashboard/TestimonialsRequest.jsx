import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Sidebar from "../Sidebar";


const TestimonialsRequests = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4000/dashboard/testimonials"
      );
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/dashboard/testimonials/${id}/status`,
        {
          status,
        }
      );
      fetchTestimonials();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: rating }, (_, i) => (
      <FaStar key={i} className="text-yellow-500" />
    ));

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" >
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div
          className="p-6 h-full overflow-auto"
          style={{ backgroundColor: "var(--third-color)" }}
        >
          <div className="mb-8">
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Testimonials Review
            </h2>
            <p className="text-gray-600 mt-2">
              Manage customer testimonials and approve or reject submissions
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2"
                style={{ borderColor: "var(--secondary-color)" }}
              ></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">
                No testimonials to review at this time.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead style={{ backgroundColor: "var(--primary-color)" }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials.map((t) => (
                    <tr key={t.testimonial_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">
                          {t.User?.full_name || "Anonymous"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">{renderStars(t.rating)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md italic">
                          {t.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusBadgeClass(
                            t.status
                          )}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              updateStatus(t.testimonial_id, "approved")
                            }
                            className="px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                              backgroundColor: "var(--primary-color)",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(t.testimonial_id, "rejected")
                            }
                            className="px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                              backgroundColor: "var(--secondary-color)",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsRequests;
