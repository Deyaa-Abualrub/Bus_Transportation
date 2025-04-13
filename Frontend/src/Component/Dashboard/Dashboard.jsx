import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { Bus, Users, UserCheck, TrendingUp, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ buses: 0, drivers: 0, users: 0 });
  const [activityData, setActivityData] = useState([
    { name: "Mon", users: 10, drivers: 4 },
    { name: "Tue", users: 15, drivers: 6 },
    { name: "Wed", users: 12, drivers: 5 },
    { name: "Thu", users: 18, drivers: 7 },
    { name: "Fri", users: 20, drivers: 9 },
    { name: "Sat", users: 15, drivers: 6 },
    { name: "Sun", users: 8, drivers: 3 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="dashboard-content p-8 flex-1 overflow-auto"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--primary-color)" }}
        >
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <Bus size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Buses</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.buses}
              </p>
            </div>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <UserCheck size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Drivers</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.drivers}
              </p>
            </div>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md flex items-center">
            <div
              className="mr-4 p-3 rounded-full"
              style={{ backgroundColor: "var(--third-color)" }}
            >
              <Users size={24} style={{ color: "var(--primary-color)" }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Users</h3>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {stats.users}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Weekly Activity
              </h3>
              <TrendingUp
                size={20}
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="users"
                    stackId="a"
                    fill="var(--primary-color)"
                  />
                  <Bar
                    dataKey="drivers"
                    stackId="a"
                    fill="var(--secondary-color)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Recent Activity
              </h3>
              <Clock size={20} style={{ color: "var(--secondary-color)" }} />
            </div>
            <ul>
              <li className="py-3 border-b flex justify-between">
                <span className="text-gray-700">New driver registered</span>
                <span className="text-gray-500 text-sm">10 minutes ago</span>
              </li>
              <li className="py-3 border-b flex justify-between">
                <span className="text-gray-700">3 new user bookings</span>
                <span className="text-gray-500 text-sm">25 minutes ago</span>
              </li>
              <li className="py-3 border-b flex justify-between">
                <span className="text-gray-700">Driver request approved</span>
                <span className="text-gray-500 text-sm">1 hour ago</span>
              </li>
              <li className="py-3 border-b flex justify-between">
                <span className="text-gray-700">New contact message</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">
                  System maintenance completed
                </span>
                <span className="text-gray-500 text-sm">5 hours ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
