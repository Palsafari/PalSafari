import React, { useContext } from "react";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { afterLargestDiscountFraction } from "../assets/assets";

const AllQuicks = () => {
  const { userLang, userCountry } = useContext(AppContext);
  const location = useLocation();
  const quickPackages = location.state?.quickPackages || [];

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allQuicksPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quickPackages.map((pckg) => {
          const isLocal =
            userCountry?.toLowerCase() === pckg.country?.toLowerCase();
          const isHighSeason = pckg.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? pckg.loc_high_season_price
              : pckg.loc_low_season_price
            : isHighSeason
            ? pckg.int_high_season_price
            : pckg.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <div key={pckg.id}>
              <Product
                pckg={pckg}
                badge={pckg.badge}
                lead_img={pckg.lead_image[0]}
                num_days={pckg.num_days}
                country={pckg.country}
                title={pckg.title[userLang] || pckg.title["en"] || "Untitled"}
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

export default AllQuicks;
