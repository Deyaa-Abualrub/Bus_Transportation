import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const bookingId = localStorage.getItem("bookingId");

  return (
    <footer
      className="bg-white shadow-sm m-0"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://hu.edu.jo/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              HU
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              {bookingId ? (
                <Link
                  to={`/invoice/${bookingId}`}
                  className="text-base md:text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md transition-all duration-300"
                >
                  Invoice
                </Link>
              ) : (
                <span className="text-gray-500 text-base md:text-lg px-3 py-2">
                  Invoice
                </span> // عرض النص فقط إذا لم يوجد bookingId
              )}
            </li>
            <li>
              <Link
                to="/news"
                className="text-base md:text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md transition-all duration-300"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-base md:text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-base md:text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md transition-all duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-md text-gray-500 sm:text-center dark:text-gray-400">
          Made With &lt;3 By Deya'a
        </span>
      </div>
    </footer>
  );
};

export default Footer;
