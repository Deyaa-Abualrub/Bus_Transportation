import { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Clock, Search, RefreshCcw } from "lucide-react";
import Sidebar from "../components/Sidebar"; // Assuming you have this component

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/users");
      // Filter only users with role "user"
      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Users Management
            </h1>

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <button
                onClick={fetchUsers}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCcw size={18} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-block rounded-full bg-red-100 p-3 mb-4">
                <span className="text-red-500 text-xl">!</span>
              </div>
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  User Statistics
                </h2>
                <p className="text-3xl font-bold text-blue-600">
                  {users.length} Users
                </p>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="inline-block rounded-full bg-yellow-100 p-3 mb-4">
                    <User className="text-yellow-500" size={24} />
                  </div>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "No users match your search"
                      : "No users found"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.user_id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <User size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {user.full_name}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-3 text-gray-600">
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2 text-gray-500" />
                            <span>{user.email}</span>
                          </div>

                          <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-gray-500" />
                            <span>Joined: {formatDate(user.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
