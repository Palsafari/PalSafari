import React from "react";
import { safariPackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllSafaris = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allSafarisPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {safariPackages.map((safariPackage) => (
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
              pal_price={
                safariPackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      safariPackage.high_season_price *
                        ((100 - safariPackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      safariPackage.low_season_price *
                        ((100 - safariPackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(safariPackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSafaris;
