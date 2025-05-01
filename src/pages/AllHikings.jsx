import React, { useContext } from "react";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { afterLargestDiscountFraction } from "../assets/assets";

const AllHikings = () => {
  const { userLang, userCountry } = useContext(AppContext);
  const location = useLocation();
  const hikingPackages = location.state?.hikingPackages || [];

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allHikingsPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hikingPackages.map((hikingPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === hikingPackage.country?.toLowerCase();
          const isHighSeason = hikingPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? hikingPackage.loc_high_season_price
              : hikingPackage.loc_low_season_price
            : isHighSeason
            ? hikingPackage.int_high_season_price
            : hikingPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <div key={hikingPackage.id}>
              <Product
                pckg={hikingPackage}
                badge={hikingPackage.badge}
                lead_img={hikingPackage.lead_image[0]}
                num_days={hikingPackage.num_days}
                country={hikingPackage.country}
                title={
                  hikingPackage.title[userLang] ||
                  hikingPackage.title["en"] ||
                  "Untitled Hiking"
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

export default AllHikings;
