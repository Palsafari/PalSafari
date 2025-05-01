import React, { useContext } from "react";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { afterLargestDiscountFraction } from "../assets/assets";

const AllSuns = () => {
  const { userLang, userCountry } = useContext(AppContext);
  const location = useLocation();
  const sunPackages = location.state?.sunPackages || [];

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allSunsPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sunPackages.map((sunPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === sunPackage.country?.toLowerCase();
          const isHighSeason = sunPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? sunPackage.loc_high_season_price
              : sunPackage.loc_low_season_price
            : isHighSeason
            ? sunPackage.int_high_season_price
            : sunPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <div key={sunPackage.id}>
              <Product
                pckg={sunPackage}
                badge={sunPackage.badge}
                lead_img={sunPackage.lead_image[0]}
                num_days={sunPackage.num_days}
                country={sunPackage.country}
                title={
                  sunPackage.title[userLang] ||
                  sunPackage.title["en"] ||
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

export default AllSuns;
