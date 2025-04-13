import { Link } from "react-router-dom";
import {
  Home,
  UserCheck,
  MessageSquare,
  LogOut,
  BarChart2,
} from "lucide-react";

const Sidebar = () => {
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
        <li className="mt-6 pt-6 border-t border-gray-700">
          <Link
            to="/signin"
            className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
