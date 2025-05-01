import React, { useContext } from "react";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { afterLargestDiscountFraction } from "../assets/assets"; // make sure this is available

const AllCultures = () => {
  const { userLang, userCountry } = useContext(AppContext);
  const location = useLocation();
  const culturePackages = location.state?.culturePackages || [];

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allCulturesPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {culturePackages.map((culturePackage) => {
          const isLocal =
            userCountry?.toLowerCase() ===
            culturePackage.country?.toLowerCase();
          const isHighSeason = culturePackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? culturePackage.loc_high_season_price
              : culturePackage.loc_low_season_price
            : isHighSeason
            ? culturePackage.int_high_season_price
            : culturePackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <div key={culturePackage.id}>
              <Product
                pckg={culturePackage}
                badge={culturePackage.badge}
                lead_img={culturePackage.lead_image[0]}
                num_days={culturePackage.num_days || 1}
                country={culturePackage.country}
                title={
                  culturePackage.title[userLang] ||
                  culturePackage.title["en"] ||
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

export default AllCultures;
