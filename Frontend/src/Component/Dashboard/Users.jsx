import { useEffect, useState } from "react";
import axios from "axios";
import { User, Search, Users, Loader } from "lucide-react";
import Sidebar from "../Sidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/dashboard/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

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
            <Users
              size={28}
              className="text-white p-1 rounded-md mr-3"
              style={{ backgroundColor: "var(--secondary-color)" }}
            />
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Users Management
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
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

        {/* Loading or Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader
              className="animate-spin"
              size={40}
              style={{ color: "var(--secondary-color)" }}
            />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <>
            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="h-3"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="rounded-full p-2 mr-3"
                        style={{ backgroundColor: "var(--third-color)" }}
                      >
                        <User className="text-gray-800" size={20} />
                      </div>
                      <h2 className="text-lg font-semibold">
                        {user.full_name}
                      </h2>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center text-sm">
                        <span
                          className="font-medium mr-2"
                          style={{ color: "var(--primary-color)" }}
                        >
                          Email:
                        </span>
                        <span className="text-gray-600">{user.email}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <span
                          className="font-medium mr-2"
                          style={{ color: "var(--primary-color)" }}
                        >
                          Joined:
                        </span>
                        <span className="text-gray-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <button
                        className="text-sm px-3 py-1 rounded"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-6 text-sm text-gray-500 text-right">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
