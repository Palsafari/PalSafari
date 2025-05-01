import React, { useContext } from "react";
import Wishlist from "../components/Wishlist.jsx";
import AppContext from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { wishList } from "../assets/assets.js";

const MyWishlist = () => {
  const { t } = useTranslation();
  const { userLang, userCountry } = useContext(AppContext);

  return (
    <div className="pt-6 pb-10 px-4 rtl:space-x-reverse">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-tertiary mb-8">
        {t("wishListPageTitle")}
      </h1>

      {wishList.length === 0 ? (
        <p className="text-center text-gray-500 text-sm md:text-base">
          {t("noItemWishlist")}
        </p>
      ) : (
        <div className="space-y-6 md:flex md:flex-col md:items-center">
          {wishList.map((tourPackage, index) => (
            <Wishlist
              key={index}
              tourPackage={tourPackage}
              userLang={userLang}
              userCountry={userCountry}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
