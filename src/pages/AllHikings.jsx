import React from "react";
import { hikingPackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllHikings = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allHikingsPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hikingPackages.map((hikingPackage) => (
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
                "Untitled Safari"
              }
              pal_price={
                hikingPackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      hikingPackage.high_season_price *
                        ((100 - hikingPackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      hikingPackage.low_season_price *
                        ((100 - hikingPackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(hikingPackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHikings;
