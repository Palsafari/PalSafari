import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import Product from "./Product";
import {
  afterLargestDiscountFraction,
  assets,
  culturePackages,
} from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Cultures = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { userLang } = useContext(AppContext);

  return (
    <div
      className={
        culturePackages.length < 2 ? "hidden" : "pt-5 pb-2 rtl:space-x-reverse"
      }
    >
      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-secondary border-0" />
        <span className="absolute px-3 text-sm md:text-lg font-medium text-tertiary -translate-x-1/2 bg-gray-200 left-1/2 leading-tight">
          {t("culturesFaith")}
        </span>
      </div>
      <Swiper
        slidesPerView={2.2}
        spaceBetween={25}
        navigation={true}
        modules={[Navigation]}
        watchOverflow={true}
        breakpoints={{
          640: {
            // Small screens (mobile)
            slidesPerView: 2.4, // Slightly smaller preview
            spaceBetween: 15, // Reduce spacing on small screens
          },
          768: {
            // Tablets
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1024: {
            // Larger screens
            slidesPerView: 4.2,
            spaceBetween: 25,
          },
        }}
        className="rtl:space-x-reverse"
      >
        {culturePackages.map((culturePackage) => (
          <SwiperSlide key={culturePackage.id}>
            <Product
              pckg={culturePackage}
              badge={culturePackage.badge || "AFFORDABLE"}
              lead_img={culturePackage.lead_image[0] || assets.lead_img}
              num_days={culturePackage.num_days || 1}
              country={culturePackage.country || "International"}
              title={
                culturePackage.title[userLang] ||
                "Exciting PalSafari destination"
              }
              pal_price={
                culturePackage.high_season.includes(
                  new Date().toLocaleString("en-US", { month: "long" })
                )
                  ? Math.ceil(
                      (culturePackage.high_season_price || 200) *
                        ((100 - (culturePackage.discount.percentage || 5)) /
                          100)
                    )
                  : Math.ceil(
                      (culturePackage.low_season_price || 150) *
                        ((100 - (culturePackage.discount.percentage || 5)) /
                          100)
                    )
              }
              listed_price={Math.ceil(
                (culturePackage.high_season_price || 200) *
                  (afterLargestDiscountFraction || 1)
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <div className="absolute bg-gray-200">
          <button
            type="button"
            className=" m-2 mb-2 py-1 px-3 text-sm font-semibold text-primary hover:cursor-pointer hover:scale-110 transition-transform focus:outline-none bg-gray-200 rounded-lg border border-primary hover:bg-gray-100 hover:text-primary2"
            onClick={() => navigate("/all-cultures")}
          >
            {t("viewAllBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cultures;
