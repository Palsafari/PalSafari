import React, { useContext, useEffect, useState } from "react";
import { safariPackages, afterLargestDiscountFraction } from "../assets/assets";
import { filterNearbyLongPackages } from "../utils/filterNearbyLongPackages";
import AppContext from "../context/AppContext";
import { useTranslation } from "react-i18next";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const Nearby = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [nearbyPackages, setnearbyPackages] = useState([]);
  const { userLang, userCity, userCountry } = useContext(AppContext);
  const monthName = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    const fetchNearbyLong = async () => {
      const result = await filterNearbyLongPackages(userCity, safariPackages);
      setnearbyPackages(result);
    };

    if (userCity) {
      fetchNearbyLong();
    }
  }, [userCity]);

  if (nearbyPackages.length < 2) return null;

  return (
    <div className={nearbyPackages.length < 2 ? "hidden" : "pt-5 pb-2"}>
      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <span className="absolute px-3 text-sm md:text-lg font-medium text-tertiary -translate-x-1/2 bg-gray-200 left-1/2 leading-tight">
          {t("nearbyAttractions")}
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
        {nearbyPackages.map((nearbyPackage) => {
          const isLocal =
            userCountry?.toLowerCase() === nearbyPackage.country?.toLowerCase();
          const isHighSeason = nearbyPackage.high_season.includes(monthName);

          const pal_price = isLocal
            ? isHighSeason
              ? nearbyPackage.loc_high_season_price
              : nearbyPackage.loc_low_season_price
            : isHighSeason
            ? nearbyPackage.int_high_season_price
            : nearbyPackage.int_low_season_price;

          const listed_price = pal_price * afterLargestDiscountFraction;

          return (
            // <--- YOU NEED THIS RETURN!!!
            <SwiperSlide key={nearbyPackage.id}>
              <Product
                pckg={nearbyPackage}
                badge={nearbyPackage.badge}
                lead_img={nearbyPackage.lead_image[0]}
                num_days={nearbyPackage.num_days}
                country={nearbyPackage.country}
                title={nearbyPackage.title[userLang]}
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
              navigate("/all-nearbys", { state: { nearbyPackages } })
            }
            className=" m-2 mb-2 py-1 px-3 text-sm font-semibold text-primary hover:cursor-pointer hover:scale-110 transition-transform focus:outline-none bg-gray-200 rounded-lg border border-primary hover:bg-gray-100 hover:text-primary2"
          >
            {t("viewAllBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nearby;
