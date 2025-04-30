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
    toast.info(
      <div className="role-selection">
        <p className="mb-2 font-medium">Select your role to login</p>
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
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/" },
    {
      name: "Invoice",
      action: () => {
        if (!isAuthenticated) {
          navigate("/signin");
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
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Logo & Brand */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto sm:h-12"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>

                  {/* Desktop Navigation Links */}
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 mt-1">
                      {navigationLinks.map((item) => (
                        <button
                          key={item.name}
                          onClick={
                            item.action
                              ? item.action
                              : () => navigate(item.path)
                          }
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm md:text-base font-medium flex items-center"
                        >
                          {item.icon && item.icon}
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auth Buttons (Desktop only) / User Menu */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!isAuthenticated ? (
                    <div className="hidden sm:flex items-center space-x-2">
                      <button
                        onClick={handleLoginClick}
                        className="text-white text-sm md:text-base m-1 px-3 py-1.5 md:px-4 md:py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleRegisterClick}
                        className="ml-1 md:ml-2 text-white text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Register
                      </button>
                    </div>
                  ) : (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex items-center space-x-2 md:space-x-3 text-sm text-white bg-gray-800 p-2 rounded-full">
                          <span className="hidden md:inline">{userName}</span>
                          <FaUserCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
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

            {/* Mobile Navigation Menu */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 mb-3 border-b border-gray-700 pb-3">
                    <button
                      onClick={handleLoginClick}
                      className="text-white text-base px-3 py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300 w-full text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="text-white text-base px-3 py-2 bg-[#eb2323] rounded-md hover:bg-red-700 transition duration-300 w-full text-center"
                    >
                      Register
                    </button>
                  </div>
                )}

                {navigationLinks.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    onClick={
                      item.action ? item.action : () => navigate(item.path)
                    }
                    className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                {isAuthenticated && (
                  <div className="border-t border-gray-700 mt-3 pt-3">
                    <div className="px-3 text-base font-medium text-gray-300">
                      {userName}
                    </div>
                    <Disclosure.Button
                      as="button"
                      onClick={() => navigate("/profile")}
                      className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                    >
                      Your Profile
                    </Disclosure.Button>
                    {bookingId && (
                      <Disclosure.Button
                        as="button"
                        onClick={() => navigate(`/invoice/${bookingId}`)}
                        className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                      >
                        <FaFileInvoice className="mr-2 inline-block" />
                        My Invoice
                      </Disclosure.Button>
                    )}
                    <Disclosure.Button
                      as="button"
                      onClick={handelLogout}
                      className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                    >
                      Log Out
                    </Disclosure.Button>
                  </div>
                )}
              </div>
            </DisclosurePanel>
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
