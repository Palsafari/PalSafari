import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import Product from "./Product";
import { afterLargestDiscountFraction, sunPackages } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const SandSea = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userLang, userCountry } = useContext(AppContext);

  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div
      className={
        sunPackages.length < 2 ? "hidden" : "pt-5 pb-2 rtl:space-x-reverse"
      }
    >
      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <span className="absolute px-3 text-sm md:text-lg font-medium text-tertiary -translate-x-1/2 bg-gray-200 left-1/2 leading-tight">
          {t("sunSand")}
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
          640: {
            slidesPerView: 2.4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4.2,
            spaceBetween: 25,
          },
        }}
        className="rtl:space-x-reverse"
      >
        {sunPackages.map((sunPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === sunPackage.country?.toLowerCase();
          const isHighSeason = sunPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? sunPackage.loc_high_season_price
              : sunPackage.loc_low_season_price
            : isHighSeason
            ? sunPackage.int_high_season_price
            : sunPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            <SwiperSlide key={sunPackage.id}>
              <Product
                pckg={sunPackage}
                badge={sunPackage.badge}
                lead_img={sunPackage.lead_image[0]}
                num_days={sunPackage.num_days}
                country={sunPackage.country}
                title={sunPackage.title[userLang]}
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
            className="m-2 mb-2 py-1 px-3 text-sm font-semibold text-primary hover:cursor-pointer hover:scale-110 transition-transform focus:outline-none bg-gray-200 rounded-lg border border-primary hover:bg-gray-100 hover:text-primary2"
            onClick={() => navigate("/all-suns", { state: { sunPackages } })}
          >
            {t("viewAllBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SandSea;
