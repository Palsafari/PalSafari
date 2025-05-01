import React, { useContext } from "react";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { afterLargestDiscountFraction } from "../assets/assets";

const AllSafaris = () => {
  const { userLang, userCountry } = useContext(AppContext);
  const location = useLocation();
  const safariPackages = location.state?.safariPackages || [];

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allSafarisPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {safariPackages.map((safariPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === safariPackage.country?.toLowerCase();
          const isHighSeason = safariPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? safariPackage.loc_high_season_price
              : safariPackage.loc_low_season_price
            : isHighSeason
            ? safariPackage.int_high_season_price
            : safariPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <div key={safariPackage.id}>
              <Product
                pckg={safariPackage}
                badge={safariPackage.badge}
                lead_img={safariPackage.lead_image[0]}
                num_days={safariPackage.num_days}
                country={safariPackage.country}
                title={
                  safariPackage.title[userLang] ||
                  safariPackage.title["en"] ||
                  "Untitled Safari"
                }
                pal_price={Math.ceil(pal_price)}
                listed_price={Math.ceil(listed_price)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSafaris;
