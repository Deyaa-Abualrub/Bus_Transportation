import { Link } from "react-router-dom";
import {
  Home,
  UserCheck,
  MessageSquare,
  LogOut,
  BarChart2,
  Users,
  Bus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className="sidebar text-white w-64 h-screen p-5"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <BarChart2 className="mr-2" />
        Dashboard
      </h2>
      <ul>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <Home className="mr-2" size={18} />
            Home
          </Link>
        </li>

        <li className="mb-2">
          <Link
            to="/driver-requests"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <UserCheck className="mr-2" size={18} />
            Driver Requests
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/contact-messages"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <MessageSquare className="mr-2" size={18} />
            Contact Messages
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/users"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <Users className="mr-2" size={18} />
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/drivers"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <UserCheck className="mr-2" size={18} />
            Drivers
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/buses"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <Bus className="mr-2" size={18} />
            Buses
          </Link>
        </li>
        <li className="mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all w-full text-left"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
