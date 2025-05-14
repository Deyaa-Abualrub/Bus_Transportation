import { useState, useRef, useEffect } from "react"; // أضف useRef و useEffect
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBookingForm } from "../redux/bookingFormSlice";
import "../Styles/BookingForm.css";

export default function BookingForm({ scrollToFrom }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchType, setSearchType] = useState("");
  const dispatch = useDispatch();

  const fromRef = useRef(null); // المرجع لحقل From

  // Scroll to "From" input when scrollToFrom is true
  useEffect(() => {
    if (scrollToFrom && fromRef.current) {
      fromRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      fromRef.current.focus();
    }
  }, [scrollToFrom]);

  const handleFromChange = (e) => {
    const newFrom = e.target.value;
    setFrom(newFrom);
    const newSearchType =
      newFrom === "hu" ? "status_change_time" : "launch_date";
    setSearchType(newSearchType);
    dispatch(setBookingForm({ from: newFrom, to, searchType: newSearchType }));
  };

  const handleToChange = (e) => {
    const newTo = e.target.value;
    setTo(newTo);
    dispatch(setBookingForm({ from, to: newTo, searchType }));
  };

  return (
    <div className="booking-form relative w-full w-3xl px-4 sm:px-6 md:w-2xl xl:w-[900px] mt-[60px] mx-auto md:relative md:left-1/2 md:transform md:-translate-x-1/2">
      <div className="form-content bg-gray-50/60 backdrop-blur-sm border-2 border-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 border-b pb-2">
          Buy Ticket
        </h3>

        {/* Changed flex direction to be column until lg breakpoint (992px+) */}
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-6 lg:space-x-8">
          <select
            ref={fromRef} // أضفنا المرجع هنا
            className="w-full lg:w-[38%] p-2 sm:p-3 bg-white border-2 border-[var(--primary-color)] rounded-md text-gray-600 text-sm sm:text-base font-medium mr-[5px] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
            value={from}
            onChange={handleFromChange}
          >
            <option value="" disabled className="text-gray-400">
              From
            </option>
            <option value="hu" className="hover:bg-[var(--primary-color)] ">
              HU
            </option>
            <option
              value="raghadan"
              className="hover:bg-[var(--primary-color)]"
            >
              Raghadan - Amman
            </option>
            <option
              value="north_complex"
              className="hover:bg-[var(--primary-color)]"
            >
              North Complex (Tabarbour) - Amman
            </option>
            <option value="zarqa" className="hover:bg-[var(--primary-color)]">
              Zarqa
            </option>
            <option
              value="al_bayader"
              className="hover:bg-[var(--primary-color)]"
            >
              Al-Bayader - Amman
            </option>
            <option value="sahab" className="hover:bg-[var(--primary-color)]">
              Sahab - Amman
            </option>
            <option
              value="nazal_district"
              className="hover:bg-[var(--primary-color)]"
            >
              Nazal District - Amman
            </option>
            <option
              value="amman_customs"
              className="hover:bg-[var(--primary-color)]"
            >
              Amman Customs
            </option>
            <option
              value="abu_nuseir"
              className="hover:bg-[var(--primary-color)]"
            >
              Abu Nuseir - Amman
            </option>
            <option
              value="al_baqaa"
              className="hover:bg-[var(--primary-color)]"
            >
              Al-Baqa'a - Amman
            </option>
            <option value="naour" className="hover:bg-[var(--primary-color)]">
              Naour - Amman
            </option>
            <option value="salt" className="hover:bg-[var(--primary-color)]">
              Salt
            </option>
            <option value="irbid" className="hover:bg-[var(--primary-color)]">
              Irbid
            </option>
            <option value="ajloun" className="hover:bg-[var(--primary-color)]">
              Ajloun
            </option>
            <option value="jerash" className="hover:bg-[var(--primary-color)]">
              Jerash
            </option>
            <option value="madaba" className="hover:bg-[var(--primary-color)]">
              Madaba
            </option>
            <option value="mafraq" className="hover:bg-[var(--primary-color)]">
              Mafraq
            </option>
          </select>

          <select
            className="w-full lg:w-[38%] p-2 sm:p-3 bg-white border-2 border-[var(--primary-color)] rounded-md text-gray-600 text-sm sm:text-base font-medium mr-[5px] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
            value={to}
            onChange={handleToChange}
          >
            <option value="" disabled className="text-gray-400">
              To
            </option>
            <option value="hu" className="hover:bg-[var(--primary-color)]">
              HU
            </option>
            <option
              value="raghadan"
              className="hover:bg-[var(--primary-color)]"
            >
              Raghadan - Amman
            </option>
            <option
              value="north_complex"
              className="hover:bg-[var(--primary-color)]"
            >
              North Complex (Tabarbour) - Amman
            </option>
            <option value="zarqa" className="hover:bg-[var(--primary-color)]">
              Zarqa
            </option>
            <option
              value="al_bayader"
              className="hover:bg-[var(--primary-color)]"
            >
              Al-Bayader - Amman
            </option>
            <option value="sahab" className="hover:bg-[var(--primary-color)]">
              Sahab - Amman
            </option>
            <option
              value="nazal_district"
              className="hover:bg-[var(--primary-color)]"
            >
              Nazal District - Amman
            </option>
            <option
              value="amman_customs"
              className="hover:bg-[var(--primary-color)]"
            >
              Amman Customs
            </option>
            <option
              value="abu_nuseir"
              className="hover:bg-[var(--primary-color)]"
            >
              Abu Nuseir - Amman
            </option>
            <option
              value="al_baqaa"
              className="hover:bg-[var(--primary-color)]"
            >
              Al-Baqa'a - Amman
            </option>
            <option value="naour" className="hover:bg-[var(--primary-color)]">
              Naour - Amman
            </option>
            <option value="salt" className="hover:bg-[var(--primary-color)]">
              Salt
            </option>
            <option value="irbid" className="hover:bg-[var(--primary-color)]">
              Irbid
            </option>
            <option value="ajloun" className="hover:bg-[var(--primary-color)]">
              Ajloun
            </option>
            <option value="jerash" className="hover:bg-[var(--primary-color)]">
              Jerash
            </option>
            <option value="madaba" className="hover:bg-[var(--primary-color)]">
              Madaba
            </option>
            <option value="mafraq" className="hover:bg-[var(--primary-color)]">
              Mafraq
            </option>
          </select>

          <div className="w-full lg:w-[20%] flex-1">
            <Link to="/searchbus" className="block w-full">
              <button className="w-full p-[10px] bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white text-sm sm:text-base font-medium rounded-md shadow-md transition-all duration-200 hover:scale-95 focus:outline-none focus:ring-opacity-50 border-2 border-gray-800 hover:border-[var(--secondary-color)]">
                Search Bus
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
