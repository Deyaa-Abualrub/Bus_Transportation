import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/Component/Navbar";
import Footer from "../src/Component/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SearchBus from "./Pages/SearchBus";
import Checkout from "./Pages/Checkout";
import DriverRegister from "./Component/DriverRegister";
import DriverLogin from "./Component/DriverLogin";
import Profile from "./Pages/Profile";
import Dashboard from "./Component/Dashboard/Dashboard";
import DriverRequests from "./Component/Dashboard/DriverRequest";
import ContactMessages from "./Component/Dashboard/ContactMessage";
import UsersPage from "./Component/Dashboard/Users";
import DriversPage from "./Component/Dashboard/Drivers";
import BusesPage from "./Component/Dashboard/Buses";
import TestimonialsRequests from "./Component/Dashboard/TestimonialsRequest";

function App() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/signin" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/driver-requests" ||
    location.pathname === "/contact-messages" ||
    location.pathname === "/users" ||
    location.pathname === "/drivers" ||
    location.pathname === "/testimonials-requests" ||
    location.pathname === "/buses";

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/searchbus" element={<SearchBus />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/driver-requests" element={<DriverRequests />} />
        <Route path="/contact-messages" element={<ContactMessages />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route
          path="/testimonials-requests"
          element={<TestimonialsRequests />}
        />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
