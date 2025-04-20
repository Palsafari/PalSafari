import React from "react";
import { sunPackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllSuns = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allSunsPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sunPackages.map((sunPackage) => (
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
              pal_price={
                sunPackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      sunPackage.high_season_price *
                        ((100 - sunPackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      sunPackage.low_season_price *
                        ((100 - sunPackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(sunPackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSuns;
