import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import MyBookings from "./pages/MyBookings";
import MyWishlist from "./pages/MyWishlist";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Hosts from "./pages/Hosts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsOfService from "./pages/TermsOfService";
import AllQuicks from "./pages/AllQuicks";
import AllNearbys from "./pages/AllNearbys";
import AllHikings from "./pages/AllHikings";
import AllSafaris from "./pages/AllSafaris";
import AllSuns from "./pages/AllSuns";
import AllCultures from "./pages/AllCultures";
import MoreDetails from "./pages/MoreDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyProfile from "./pages/MyProfile";
import MyReservations from "./pages/MyReservations";
import BookNow from "./pages/BookNow";
import ReserveNow from "./pages/ReserveNow";

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
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-wishlist" element={<MyWishlist />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/hosts" element={<Hosts />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/more-details" element={<MoreDetails />} />
        <Route path="/all-quicks" element={<AllQuicks />} />
        <Route path="all-nearbys" element={<AllNearbys />} />
        <Route path="/all-safaris" element={<AllSafaris />} />
        <Route path="/all-hikings" element={<AllHikings />} />
        <Route path="/all-suns" element={<AllSuns />} />
        <Route path="/all-cultures" element={<AllCultures />} />
        <Route path="/more-details/:id" element={<MoreDetails />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/book-now/:id" element={<BookNow />} />
        <Route path="/reserve-now" element={<ReserveNow />} />
        <Route path="/reserve-now/:id" element={<ReserveNow />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
