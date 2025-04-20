import React from "react";
import { quickPackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllQuicks = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allQuicksPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quickPackages.map((quickPackage) => (
          <div key={quickPackage.id}>
            <Product
              pckg={quickPackage}
              badge={quickPackage.badge}
              lead_img={quickPackage.lead_image[0]}
              num_days={quickPackage.num_days}
              country={quickPackage.country}
              title={quickPackage.title[userLang]}
              pal_price={
                quickPackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      quickPackage.high_season_price *
                        ((100 - quickPackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      quickPackage.low_season_price *
                        ((100 - quickPackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(quickPackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuicks;
