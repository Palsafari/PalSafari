import React from "react";
import { longDayPackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllNearbys = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allNearbysPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {longDayPackages.map((longDayPackage) => (
          <div key={longDayPackage.id}>
            <Product
              pckg={longDayPackage}
              badge={longDayPackage.badge}
              lead_img={longDayPackage.lead_image[0]}
              num_days={longDayPackage.num_days}
              country={longDayPackage.country}
              title={longDayPackage.title[userLang]}
              pal_price={
                longDayPackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      longDayPackage.high_season_price *
                        ((100 - longDayPackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      longDayPackage.low_season_price *
                        ((100 - longDayPackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(longDayPackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNearbys;
