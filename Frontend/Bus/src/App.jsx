import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/Component/Navbar";
import Footer from "../src/Component/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

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
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
