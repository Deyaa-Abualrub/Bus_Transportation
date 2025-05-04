import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  UserCheck,
  MessageSquare,
  LogOut,
  BarChart2,
  Users,
  Bus,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile when component mounts and on window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div
        className="lg:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md cursor-pointer"
        onClick={toggleSidebar}
        style={{
          backgroundColor: isOpen ? "var(--secondary-color)" : "white",
          color: isOpen ? "white" : "var(--primary-color)",
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Sidebar Overlay (only on mobile when sidebar is open) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`sidebar text-white fixed top-0 left-0 z-20 h-screen transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-0`}
        style={{
          backgroundColor: "var(--primary-color)",
          width: isOpen ? "240px" : "0",
          minWidth: isOpen ? "240px" : "0",
        }}
      >
        <div className="p-5 h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <BarChart2 className="mr-2" />
            Dashboard
          </h2>
          <ul>
            <li className="mb-2">
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <Home className="mr-2" size={18} />
                Home
              </Link>
            </li>

            <li className="mb-2">
              <Link
                to="/driver-requests"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <UserCheck className="mr-2" size={18} />
                Driver Requests
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact-messages"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <MessageSquare className="mr-2" size={18} />
                Contact Messages
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/users"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <Users className="mr-2" size={18} />
                Users
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/drivers"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <UserCheck className="mr-2" size={18} />
                Drivers
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/buses"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <Bus className="mr-2" size={18} />
                Buses
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/testimonials-requests"
                className="flex items-center py-2 px-3 rounded hover:bg-opacity-20 hover:bg-[var(--secondary-color)] transition-all"
                onClick={handleLinkClick}
              >
                <FileText className="mr-2" size={18} />
                Testimonials Requests
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
      </div>
    </>
  );
};

export default Sidebar;
