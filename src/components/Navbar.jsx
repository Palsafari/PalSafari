import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(true); // set true temporarily for testing
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  const handleLogout = () => {
    setToken(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center mb-1 md:mb-4 lg:mb-7 mx-auto sm:p-1.5 md:p-4 border-b border-secondary rtl:space-x-reverse">
      <a href="https://palsafari.com/">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          className="w-40 md:w-48 lg:w-56 xl:w-64 h-auto cursor-pointer outline-none focus:outline-none"
          alt="logo"
        />
      </a>
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {token ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img
              className="w-6 md:w-7 rounded-full border-tertiary p-1 border-2"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img
              className="w-3 h-auto"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />
          </div>
        ) : (
          <button
            onClick={() => navigate("/log-in")}
            type="button"
            className="px-2 py-0 md:px-4 md:py-2 lg:px-6 lg:py-3 text-sm md:text-base lg:text-lg text-white bg-primary cursor-pointer hover:bg-primary2 hover:scale-105 transition-transform font-medium rounded-lg text-center"
          >
            {t("logInBtn")}
          </button>
        )}

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 z-20 min-w-30 text-base font-medium text-gray-600 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
            <p
              onClick={() => handleMenuItemClick("my-profile")}
              className="hover:text-primary2 hover:font-bold cursor-pointer"
            >
              {t("profile")}
            </p>
            <p
              onClick={() => handleMenuItemClick("my-wishlist")}
              className="hover:text-primary2 hover:font-bold cursor-pointer"
            >
              {t("wishList")}
            </p>
            <p
              onClick={() => handleMenuItemClick("my-reservations")}
              className="hover:text-primary2 hover:font-bold cursor-pointer"
            >
              {t("reservations")}
            </p>
            <p
              onClick={() => handleMenuItemClick("my-bookings")}
              className="hover:text-primary2 hover:font-bold cursor-pointer"
            >
              {t("bookings")}
            </p>
            <p
              onClick={handleLogout}
              className="hover:text-primary hover:font-bold cursor-pointer"
            >
              {t("logOut")}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
