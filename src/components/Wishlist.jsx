import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaThumbsUp } from "react-icons/fa";
import CurrencyContext from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";
import AppContext from "../context/AppContext";
import { teenDiscounts } from "../assets/assets";
import { childDiscounts } from "../assets/assets";

const Wishlist = ({ tourPackage, userLang, userCountry }) => {
  const { t } = useTranslation();
  const { formatPrice } = useContext(CurrencyContext);
  const { setWishlist } = useContext(AppContext);
  const navigate = useNavigate();

  const monthName = new Date().toLocaleString("default", { month: "long" });
  const isLocal =
    userCountry?.toLowerCase() === tourPackage.country?.toLowerCase();
  const isHighSeason = tourPackage.high_season.includes(monthName);

  const pal_price = isLocal
    ? isHighSeason
      ? tourPackage.loc_high_season_price
      : tourPackage.loc_low_season_price
    : isHighSeason
    ? tourPackage.int_high_season_price
    : tourPackage.int_low_season_price;

  return (
    <div className="rounded-sm p-3 w-full bg-white shadow-lg overflow-x-auto scrollbar-hide flex space-x-4 rtl:space-x-reverse">
      {/* --- Tour Package Card --- */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/more-details/${tourPackage.id}`, {
            state: { tourPackage },
          });
        }}
        className="min-w-[140px] max-w-[180px] bg-gray-100 rounded-md overflow-hidden shadow-lg cursor-pointer transition flex-shrink-0 max-h-[175px]"
      >
        <div
          className="h-full overflow-y-auto scrollbar-hide"
          onClick={() => console.log("Card clicked")}
        >
          <img
            src={tourPackage.lead_img || assets.lead_img}
            alt="Tour"
            className="w-full h-[100px] object-cover rounded-t-sm"
          />

          <div className="p-0.5 space-y-1 text-sm">
            <div className="flex justify-between">
              <div className="flex rtl:space-x-reverse">
                <span className="text-[10px] pr-0.5 rtl:pl-0.5 font-semibold text-black">
                  {t("days")}
                </span>
                <span className="text-[10px] font-semibold text-gray-600">
                  {tourPackage.num_days}
                </span>
              </div>
              <div className="flex rtl:space-x-reverse">
                <span className="text-[10px] pr-0.5 rtl:pl-0.5 font-semibold text-black">
                  {t("minGuests")}
                </span>
                <span className="text-[10px] font-semibold text-gray-600">
                  {tourPackage.min_pax}
                </span>
              </div>
            </div>

            <p className="text-[12px] text-tertiary font-medium mt-0.5 leading-tight">
              {tourPackage.title?.[userLang]}
            </p>

            <div className="flex justify-between items-center mt-0.5">
              <img
                className="h-6 w-12 pb-1 object-contain"
                src={assets.review}
                alt=""
              />
              <span className="text-xs text-secondary font-semibold">
                {formatPrice(pal_price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Included Items --- */}
      <div className="min-w-[180px] max-w-[220px] bg-gray-50 rounded-lg shadow-lg p-3 flex flex-col flex-shrink-0 max-h-[175px]">
        <div>
          <h3 className="font-semibold text-center text-sm text-tertiary mb-1">
            {t("includedItems")}
          </h3>
          <div className="border-b border-secondary"></div>
        </div>

        <div className="space-y-2 mt-0.5 overflow-y-auto scrollbar-hide flex-1">
          {[
            "pickUpDropOff",
            "accommodation",
            "mealsAndDrinks",
            "translationServices",
            "wifiProvided",
            "highPriorityGuestSafety",
            "youGetRefundsParagraph",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-gray-700"
            >
              <FaCheckCircle className="text-green-600 mt-0.5 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
              <span>{t(item)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- What You Get --- */}
      <div className="min-w-[180px] max-w-[220px] bg-gray-50 rounded-lg shadow-lg p-3 flex flex-col flex-shrink-0 max-h-[175px]">
        <div>
          <h3 className="font-semibold text-center text-sm text-tertiary mb-1">
            {t("whatUget")}
          </h3>
          <div className="border-b border-secondary"></div>
        </div>
        <div className="space-y-2 mt-0.5 overflow-y-auto scrollbar-hide flex-1">
          <div className="flex items-start gap-2 text-xs text-gray-700">
            <FaThumbsUp className="text-purple-600 mt-0.5 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            <span className="break-words">
              {tourPackage.attractions?.[userLang]}
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-700">
            <FaThumbsUp className="text-purple-600 mt-0.5 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            <span className="break-words">
              {tourPackage.adult_discount_description?.[userLang]}
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-700">
            <FaThumbsUp className="text-purple-600 mt-0.5 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            <span className="break-words">
              {teenDiscounts[userLang] + " " + childDiscounts[userLang]}
            </span>
          </div>
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="min-w-[200px] max-w-[220px] bg-gray-50 rounded-lg shadow-lg p-3 flex flex-col justify-between flex-shrink-0 max-h-[175px]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book-now/${tourPackage.id}`, { state: { tourPackage } });
          }}
          className="bg-primary text-white font-semibold py-1.5 rounded-lg shadow-lg text-sm mb-2 cursor-pointer hover:scale-105 hover:bg-green-600 transition"
        >
          {t("bookNowBtn")}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/reserve-now/${tourPackage.id}`, {
              state: { tourPackage },
            });
          }}
          className="border border-primary text-primary font-semibold py-1.5 rounded-lg shadow-lg text-sm mb-2 cursor-pointer hover:scale-105 hover:bg-green-50 transition"
        >
          {t("reserveNowBtn")}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/more-details/${tourPackage.id}`, {
              state: { tourPackage },
            });
          }}
          className="bg-primary text-white font-semibold py-1.5 rounded-lg shadow-lg text-sm mb-2 cursor-pointer hover:scale-105 hover:bg-green-600 transition"
        >
          {t("moreDetBtn")}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            // Call function to remove from wishlist
            setWishlist((prev) =>
              prev.filter((item) => item.id !== tourPackage.id)
            );
          }}
          className="bg-red-500 text-white font-semibold py-1.5 rounded-lg shadow-lg text-sm cursor-pointer hover:scale-105 hover:bg-red-600 transition"
        >
          {t("removeBtn")}
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
