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

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/signin";

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
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
