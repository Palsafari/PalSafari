import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import MyBookings from "./pages/MyBookings";
import MyWishlist from "./pages/MyWishlist";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import HostsHome from "./pages/HostsHome";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import MoreDetails from "./pages/MoreDetails";
import ViewAll from "./pages/ViewAll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const RTL_LANGUAGES = ["ar", "he", "fa", "ps", "ur"];
  const userLang = (navigator.language || "en-US").split("-")[0];

  useEffect(() => {
    const direction = RTL_LANGUAGES.includes(userLang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", direction);
  }, [userLang]);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-wishlist" element={<MyWishlist />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/hosts" element={<HostsHome />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/more-details" element={<MoreDetails />} />
        <Route path="view-all/:category" element={<ViewAll />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
