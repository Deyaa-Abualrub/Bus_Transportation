import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setBusDetails } from "../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";
import BookingForm from "../Component/BookingForm";
import { toast } from "react-hot-toast";

const SearchBus = () => {
  const [buses, setBuses] = useState([]);
  const { from, to, searchType } = useSelector((state) => state.bookingForm);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/bus/searchbus",
          {
            from,
            to,
            searchType,
          },
          {
            withCredentials: true,
          }
        );
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, [from, to, searchType]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:4000/bus/check", {
          withCredentials: true,
        });

        if (res.status !== 200) throw new Error();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to continue.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleBooking = (bus) => {
    dispatch(
      setBusDetails({
        busRoute: bus.bus_route,
        busNumber: bus.bus_number,
        price: bus.price,
        seatAvailable: bus.seat_available,
      })
    );

    // التوجيه إلى صفحة checkout بعد التحديث
    navigate("/checkout");
  };

  return (
    <div className="container-bus p-6 sm:p-8 rounded-xl shadow-lg mx-auto my-8 w-11/12 sm:w-4/5 border border-gray-100 bg-gradient-to-r from-white to-[var(--third-color)] bg-opacity-30">
      {/* Header with accent line */}
      <div className="relative mb-[-20px]">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)]">
          Bus Search Results
        </h3>
        <div className="absolute w-20 h-1 bg-[var(--primary-color)] bottom-0 left-0 mt-1"></div>
      </div>

      {/* Booking Form */}
      <div className="mb-8">
        <BookingForm />
      </div>

      {/* Bus Cards */}
      <div className="space-y-6">
        {buses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white bg-opacity-80 rounded-lg border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[var(--secondary-color)] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-[var(--secondary-color)] text-lg">
              No buses found for the selected route.
            </p>
            <button className="mt-4 bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
              Try Different Route
            </button>
          </div>
        ) : (
          Array.isArray(buses) &&
          buses.map((bus, index) => (
            <div
              key={index}
              className="bus-card flex flex-col lg:flex-row p-5 rounded-xl shadow-md border-l-4 border-[var(--primary-color)] hover:shadow-lg transition-all duration-300 bg-gradient-to-l from-white to-[var(--third-color)] bg-opacity-80"
            >
              {/* Bus Image with status badge */}
              <div className="relative mb-4 lg:mb-0 lg:mr-6 max-w-full">
                <img
                  src={
                    "https://themeenergy.com/themes/html/transfers/images/uploads/bus.jpg"
                  }
                  alt="Bus"
                  className="bus-image w-full lg:w-48 h-40 object-cover rounded-md shadow-md"
                />
                <div className="absolute top-2 right-2 bg-[var(--secondary-color)] text-white text-xs px-2 py-1 rounded-full">
                  Available
                </div>
              </div>

              {/* Bus Information */}
              <div className="bus-info flex-1">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[var(--primary-color)] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-lg font-bold text-[var(--secondary-color)]">
                    Route: {bus.bus_route}
                  </p>
                </div>
                <div className="flex items-center text-[var(--text-color)] text-sm mb-1 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-[var(--secondary-color)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {searchType === "launch_date"
                    ? `Launch Date: ${bus.launch_date}`
                    : `Status Change Date: ${bus.status_change_time}`}
                </div>
                <div className="flex items-center text-[var(--text-color)] text-sm font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-[var(--secondary-color)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Bus Number: {bus.bus_number}
                </div>
              </div>

              {/* Price and Seats with visual indicators */}
              <div className="details flex justify-between lg:justify-center items-center lg:flex-col flex-1 mt-4 lg:mt-0 border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
                <div className="price-tag bg-white bg-opacity-80 px-4 py-2 rounded-lg mr-2 xl:mr-0 lg:mb-2 w-full text-center shadow-sm">
                  <span className="text-sm text-[var(--text-color)]">
                    Price
                  </span>
                  <p className="font-bold text-lg text-[var(--primary-color)]">
                    ${bus.price} JD
                  </p>
                </div>
                <div className="seats-tag bg-white bg-opacity-80 px-4 py-2 rounded-lg w-full text-center shadow-sm">
                  <span className="text-sm text-[var(--text-color)]">
                    Available
                  </span>
                  <p className="font-medium">
                    <span className="text-lg font-bold text-[var(--primary-color)]">
                      {bus.seat_available}
                    </span>
                    <span className="text-sm text-[var(--text-color)]">
                      {" "}
                      seats
                    </span>
                  </p>
                </div>
              </div>

              {/* View Seats Button */}
              <div className="view-seats flex justify-center items-center mt-4 lg:mt-0 lg:ml-4">
                <button
                  onClick={() => handleBooking(bus)} // هنا نضيف الـ dispatch
                  className="w-full lg:w-auto bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <span>Booking Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBus;
