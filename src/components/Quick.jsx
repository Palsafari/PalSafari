import React, { useContext, useEffect, useState } from "react";
import { safariPackages, afterLargestDiscountFraction } from "../assets/assets";
import { filterNearbyQuickPackages } from "../utils/filterNearbyQuickPackages";
import AppContext from "../context/AppContext";
import { useTranslation } from "react-i18next";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const Quick = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userLang, userCity, userCountry } = useContext(AppContext);
  const [quickPackages, setQuickPackages] = useState([]);
  const monthName = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    const load = async () => {
      if (userCity) {
        const result = await filterNearbyQuickPackages(
          userCity,
          safariPackages
        );
        setQuickPackages(result);
      }
    };
    load();
  }, [userCity]);

  if (quickPackages.length < 2) return null;

  return (
    <div className="pt-8 pb-2">
      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <span className="absolute px-3 text-sm md:text-lg font-medium text-tertiary -translate-x-1/2 bg-gray-200 left-1/2 leading-tight">
          {t("quickGetaways")}
        </span>
      </div>

      <Swiper
        dir={userLang === "ar" ? "rtl" : "ltr"}
        slidesPerView={2.2}
        spaceBetween={25}
        navigation={true}
        modules={[Navigation]}
        watchOverflow={true}
        breakpoints={{
          640: { slidesPerView: 2.4, spaceBetween: 15 },
          768: { slidesPerView: 3.2, spaceBetween: 20 },
          1024: { slidesPerView: 4.2, spaceBetween: 25 },
        }}
        className="rtl:space-x-reverse"
      >
        {quickPackages.map((quickPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === quickPackage.country?.toLowerCase();
          const isHighSeason = quickPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? quickPackage.loc_high_season_price
              : quickPackage.loc_low_season_price
            : isHighSeason
            ? quickPackage.int_high_season_price
            : quickPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            // <-- 🛠️ RETURN IT!!
            <SwiperSlide key={quickPackage.id}>
              <Product
                pckg={quickPackage}
                badge={quickPackage.badge}
                lead_img={quickPackage.lead_image[0]}
                num_days={quickPackage.num_days}
                country={quickPackage.country}
                title={quickPackage.title[userLang]}
                pal_price={Math.ceil(pal_price)}
                listed_price={Math.ceil(listed_price)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <div className="absolute bg-gray-200">
          <button
            type="button"
            onClick={() =>
              navigate("/all-quicks", { state: { quickPackages } })
            }
            className="m-2 mb-2 py-1 px-3 text-sm font-semibold text-primary hover:cursor-pointer hover:scale-110 transition-transform focus:outline-none bg-gray-200 rounded-lg border border-primary hover:bg-gray-100 hover:text-primary2"
          >
            {t("viewAllBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quick;
