import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <header className="flex justify-between  items-center mb-1 md:mb-4 lg:mb-7 mx-auto sm:p-1.5 md:p-4 border-b border-secondary rtl:space-x-reverse">
      <a href="https://palsafari.com/">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          className="w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
          alt=""
        />
      </a>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-6 md:w-7 rounded-full border-tertiary p-1 border-2"
              src={assets.profile_pic}
              alt=""
            />
            <img className="w-3 h-auto" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-30 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-primary2 hover:font-bold cursor-pointer"
                >
                  {t("profile")}
                </p>
                <p
                  onClick={() => navigate("my-wishlist")}
                  className="hover:text-primary2 hover:font-bold cursor-pointer"
                >
                  {t("wishList")}
                </p>
                <p
                  onClick={() => navigate("my-reservations")}
                  className="hover:text-primary2 hover:font-bold cursor-pointer"
                >
                  {t("reservations")}
                </p>
                <p
                  onClick={() => navigate("my-bookings")}
                  className="hover:text-primary2 hover:font-bold cursor-pointer"
                >
                  {t("bookings")}
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-primary hover:font-bold cursor-pointer"
                >
                  {t("logOut")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/log-in")}
            type="button"
            className="px-2 py-0 md:px-4 md:py-2 lg:px-6 lg:py-3 text-sm md:text-base lg:text-lg text-white bg-primary cursor-pointer hover:bg-primary2 hover:scale-105 transition-transform font-medium rounded-lg text-center "
          >
            {t("logInBtn")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
