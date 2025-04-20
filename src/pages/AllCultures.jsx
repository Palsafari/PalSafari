import React from "react";
import { culturePackages } from "../assets/assets";
import Product from "../components/Product";
import { t } from "i18next";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const AllCultures = () => {
  const { userLang } = useContext(AppContext);
  return (
    <div className="mt-3 pt-5 pb-2 rtl:space-x-reverse">
      <h1 className="text-xl md:text-2xl text-tertiary text-center font-bold mb-8">
        {t("allCulturesPageTitle")}
      </h1>

      <div className="pt-2 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {culturePackages.map((culturePackage) => (
          <div key={culturePackage.id}>
            <Product
              pckg={culturePackage}
              badge={culturePackage.badge}
              lead_img={culturePackage.lead_image[0]}
              num_days={culturePackage.num_days}
              country={culturePackage.country}
              title={
                culturePackage.title[userLang] ||
                culturePackage.title["en"] ||
                "Untitled Safari"
              }
              pal_price={
                culturePackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      culturePackage.high_season_price *
                        ((100 - culturePackage.discount.percentage) / 100)
                    )
                  : Math.ceil(
                      culturePackage.low_season_price *
                        ((100 - culturePackage.discount.percentage) / 100)
                    )
              }
              listed_price={Math.ceil(culturePackage.high_season_price * 1.56)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCultures;
