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
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../Pages/Profile"; // We'll create this component

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile modal

  // قراءة بيانات المستخدم من localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserName = localStorage.getItem("user");

    if (authStatus && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const handelLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("authtoken");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", false);
      setIsAuthenticated(false);
      setUserName("");
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to open profile modal
  const openProfileModal = () => {
    setIsProfileOpen(true);
  };

  // Function to close profile modal
  const closeProfileModal = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center ml-4 ">
                <img alt="Your Company" src={logo} className="h-12 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 justify-center">
                  {/* Add navigation links */}
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about" },
                    { name: "Contact", path: "/contact" },
                    { name: "Services", path: "/" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white text-l mt-1"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white text-l mt-1",
                        "rounded-md px-3 py-2 font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Add buttons only if the user is not logged in */}
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => navigate("/signin")}
                    className="text-white m-1 px-4 py-2 bg-[#eb2323] rounded-md hover:bg-red-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signin")}
                    className="ml-2 text-white px-4 py-2 bg-[#eb2323] rounded-md hover:bg-red-700"
                  >
                    Register
                  </button>
                </>
              )}

              {/* If the user is authenticated */}
              {isAuthenticated && (
                <>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex items-center space-x-3 text-sm text-white bg-gray-800 p-2 rounded-full">
                        <span>{userName}</span>
                        <FaUserCircle className="w-8 h-8 text-white" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
                    >
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={openProfileModal}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block w-full text-left px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </button>
                        )}
                      </MenuItem>
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
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Services", path: "/" },
            ].map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                to={item.path}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Profile Modal */}
      {isProfileOpen && (
        <Profile isOpen={isProfileOpen} onClose={closeProfileModal} />
      )}
    </>
  );
}
