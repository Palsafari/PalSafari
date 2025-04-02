import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Flame, Heart, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { safariPackages } from "../assets/assets";
import { teenDiscounts } from "../assets/assets";
import { childDiscounts } from "../assets/assets";
import AppContext from "../context/AppContext";

const MoreDetails = () => {
  const { id } = useParams();
  const safariPackage = safariPackages.find((pckg) => pckg.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("overviewTab");
  const { userLang } = useContext(AppContext);
  const { t } = useTranslation();
  return (
    <div className="max-w-screen-lg mx-auto pt-5 px-3 md:px-6">
      {/* Lead Image */}
      <img
        src={safariPackage.lead_image[0]}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold mt-4">
        {safariPackage.title[userLang]}
      </h1>
      <div className="w-full mt-1 pt-4 grid grid-cols-2 md:grid-cols-5 gap-2.5 md:gap-3.5 items-start">
        {/* Country */}
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${safariPackage.country_code.toLowerCase()}.png`}
            className="w-6 h-4 rounded-sm"
          />
          <p className="font-semibold text-gray-500">
            {t(safariPackage.country)}
          </p>
        </div>

        {/* Days & Nights */}
        <div className="leading-tight text-sm md:text-base">
          <div className="flex items-center gap-1">
            <div className="font-semibold">{t("days")}</div>
            <div className="font-semibold text-gray-500">
              {safariPackage.num_days}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="font-semibold">{t("nights")}</div>
            <div className="font-semibold text-gray-500">
              {safariPackage.num_nights}
            </div>
          </div>
        </div>

        {/* Minimum Guests */}
        <div className="flex items-center gap-1">
          <div className="font-semibold">{t("minGuests")}</div>
          <div className="font-semibold text-gray-500">
            {safariPackage.min_pax}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-sm md:pr-1.5 md:text-right">
          <div className="text-sm text-gray-600">{t("from")}</div>
          <div className="text-secondary font-bold text-lg">
            ${safariPackage.low_season_price}
          </div>
          <div className="text-sm text-gray-600">{t("onlyAtPalSafari")}</div>
        </div>

        {/* Star Rating */}
        <div className="flex items-start gap-1 col-span-1">
          <div className="flex gap-1">
            {/* 4 fully filled stars */}
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
              />
            ))}

            {/* Half-filled star */}
            <div className="relative w-4 h-4">
              {/* Full gray star (background) */}
              <Star
                className="absolute w-4 h-4 text-gray-300"
                fill="currentColor"
              />
              {/* Half yellow star (foreground) */}
              <div className="absolute w-1/2 h-full overflow-hidden">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            ({safariPackage.num_reviewers})
          </p>
        </div>
      </div>

      {/* Tabs (Scrollable on Mobile) */}
      <div className="flex overflow-x-auto border-b border-gray-300 mt-4 md:mt-6 justify-between">
        {[
          "overviewTab",
          "itineratyTab",
          "includedTab",
          "priceTab",
          "moreInfoTab",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap hover:cursor-pointer transition-transform px-3 py-2 font-semibold ${
              activeTab === tab
                ? "border-b-4 md:border-b-2 border-secondary text-tertiary"
                : "text-gray-500"
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/*Tab Contents*/}
      <div className="p-4 bg-gray-100 mt-2 rounded-lg">
        {/*Description Tab*/}
        {activeTab === "overviewTab" && (
          <div>
            <p>{safariPackage.description[userLang]}</p>
            <h3 className="mt-6 text-lg font-semibold underline decoration-gray-500">
              {t("whatUget")}
            </h3>
            <ul className="list-none mt-1">
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("pickUpDropOff")}</div>
                </div>
              </li>
              <li
                className={
                  safariPackage.badge === "Budget"
                    ? "flex items-center"
                    : "hidden"
                }
              >
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("budgetAccommodation")}</div>
                </div>
              </li>
              <li
                className={
                  safariPackage.badge === "Silver"
                    ? "flex items-center"
                    : "hidden"
                }
              >
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("silverAccommodation")}</div>
                </div>
              </li>
              <li
                className={
                  safariPackage.badge === "Luxury"
                    ? "flex items-center"
                    : "hidden"
                }
              >
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("luxuryAccommodation")}</div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">
                    {safariPackage.attractions[userLang]}
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">
                    {safariPackage.adult_discount_description[userLang]}
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">
                    {teenDiscounts[userLang] + " " + childDiscounts[userLang]}
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("highPriorityGuestSafety")}</div>
                </div>
              </li>
            </ul>
          </div>
        )}

        {/*Itinerary Tab*/}
        {activeTab === "itineratyTab" && (
          <div>
            <h3 className="text-lg font-bold">Itinerary</h3>
          </div>
        )}

        {/*Included Items Tab*/}
        {activeTab === "includedTab" && (
          <div>
            <h3 className="text-lg font-bold">Included Items</h3>
          </div>
        )}

        {/*Price Giude Tab*/}
        {activeTab === "priceTab" && (
          <div>
            <h3 className="text-lg font-bold">Price Guide</h3>
          </div>
        )}

        {/*More Info Tab*/}
        {activeTab === "moreInfoTab" && (
          <div>
            <h3 className="text-lg font-bold">Additional Information</h3>
          </div>
        )}
      </div>

      {/* Wishlist, Share, Reserve & Booking Buttons */}
      <div className="mt-7 pb-6 flex justify-between items-center space-x-4">
        {/* Wishlist */}
        <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
          <Heart className="w-7 h-7 text-primary" />
          <div className="text-xs mt-1">{t("addToWishlistBtn")}</div>
        </div>

        {/* Share */}
        <div
          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: safariPackage.title.en,
                  text: "Check out this amazing safari package!",
                  url: window.location.href,
                })
                .catch((error) => console.log("Sharing failed:", error));
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
        >
          <Share2 className="w-7 h-7 text-primary" />
          <div className="text-xs mt-1">{t("shareBtn")}</div>
        </div>

        {/* Reserve */}
        <button className="p-1 leading-tight cursor-pointer border border-primary text-sm text-primary rounded-lg transition-transform hover:border-primary2 hover:scale-110">
          {t("reserveBtna")}
          <br />
          <span className="p-0 text-sm leading-none text-orange-500">
            {t("reserveBtnb")}
          </span>
        </button>

        {/* Book Now */}
        <button className="px-3 py-2 cursor-pointer bg-primary text-white rounded-lg font-semibold transition-transform hover:bg-primary2 hover:scale-110">
          {t("bookNowBtn")}
        </button>
      </div>
    </div>
  );
};

export default MoreDetails;
