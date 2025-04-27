import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserCircle, FaFileInvoice, FaCar, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../Pages/Profile";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserName = localStorage.getItem("user");
    const userBookingId = localStorage.getItem("bookingId") || "";

    if (authStatus && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
      setBookingId(userBookingId);
    }

    const interval = setInterval(() => {
      const newBookingId = localStorage.getItem("bookingId") || "";
      setBookingId(newBookingId);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handelLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // لاحظ: لا تمسح bookingId
      localStorage.setItem("isAuthenticated", false);
      setIsAuthenticated(false);
      setUserName("");
      navigate("/signin");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const openProfileModal = () => {
    setIsProfileOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileOpen(false);
  };

  const updateUserName = (newName) => {
    setUserName(newName);
  };

  const handleLoginClick = () => {
    navigate("/signin"); // يوديه على تسجيل دخول مباشرة
  };

  const handleRegisterClick = () => {
    toast.info(
      <div className="role-selection">
        <p className="mb-2 font-medium">Select your role to register</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaUser className="mr-2" /> User
          </button>
          <button
            onClick={() => navigate("/driver-login")}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FaCar className="mr-2" /> Driver
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/" },
    {
      name: "Invoice",
      action: () => {
        if (!isAuthenticated) {
          navigate("/signin"); // مباشرة على تسجيل دخول بدون popup
        } else if (!bookingId) {
          toast.info("No invoice found for your account");
        } else {
          navigate(`/invoice/${bookingId}`);
        }
      },
    },
  ];

  return (
    <>
      <ToastContainer position="top-center" />
      <Disclosure as="nav" className="bg-gray-800 shadow-lg sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center ml-4">
                    <Link to="/">
                      <img
                        className="h-12 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 justify-center">
                      {navigationLinks.map((item) => (
                        <button
                          key={item.name}
                          onClick={
                            item.action
                              ? item.action
                              : () => navigate(item.path)
                          }
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-l mt-1 font-medium flex items-center"
                        >
                          {item.icon && item.icon}
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!isAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleLoginClick}
                        className="text-white m-1 px-4 py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleRegisterClick}
                        className="ml-2 text-white px-4 py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Register
                      </button>
                    </div>
                  ) : (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex items-center space-x-3 text-sm text-white bg-gray-800 p-2 rounded-full">
                          <span>{userName}</span>
                          <FaUserCircle className="w-8 h-8 text-white" />
                        </MenuButton>
                      </div>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full text-left px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        {bookingId && (
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  navigate(`/invoice/${bookingId}`)
                                }
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block w-full text-left px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <FaFileInvoice className="mr-2 inline-block" />
                                My Invoice
                              </button>
                            )}
                          </MenuItem>
                        )}
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handelLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full text-left px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Log Out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {isProfileOpen && (
        <Profile
          isOpen={isProfileOpen}
          onClose={closeProfileModal}
          onUpdateName={updateUserName}
        />
      )}
    </>
  );
}
