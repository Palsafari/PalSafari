import React, { useMemo, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Star,
  Flame,
  Heart,
  Share2,
  MapPinned,
  PlaneTakeoff,
  SmilePlus,
  Frown,
  HandCoins,
  ChevronRight,
} from "lucide-react";
import ItineraryMap from "../components/ItineraryMap";
import { useTranslation, Trans } from "react-i18next";
import {
  safariPackages,
  hikingPackages,
  sunPackages,
  culturePackages,
  visaPolicies,
} from "../assets/assets";
import { teenDiscounts } from "../assets/assets";
import { childDiscounts } from "../assets/assets";
import AppContext from "../context/AppContext";
import CurrencyContext from "../context/CurrencyContext";

const MoreDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { userLang, userCountry } = useContext(AppContext);
  const { formatPrice } = useContext(CurrencyContext);
  const monthName = new Date().toLocaleString("default", { month: "long" });
  const location = useLocation();
  const pckg = location.state?.pckg || location.state?.tourPackage;

  {
    /* TO DO: Find the tourPackage below from an allPackages array that has already been paginated and was shown in the carousel. */
  }

  const allPackages = [
    ...safariPackages,
    ...hikingPackages,
    ...sunPackages,
    ...culturePackages,
  ];
  // Create a Map for fast lookup of packages by ID
  const allPackagesMap = useMemo(() => {
    const map = new Map();
    allPackages.forEach((pckg) => map.set(pckg.id, pckg));
    return map;
  }, [allPackages]);

  // Fast lookup using the Map
  const tourPackage = allPackagesMap.get(parseInt(id));

  if (!tourPackage)
    return <div className="m-3 p-2">{t("packageNotFound")}</div>;

  const [activeTab, setActiveTab] = useState("overviewTab");
  const [previewImages, setPreviewImages] = useState([]);
  const [previewStartIndex, setPreviewStartIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (imagesArray, startIndex) => {
    setPreviewImages(imagesArray);
    setPreviewStartIndex(startIndex);
    setIsPreviewOpen(true);
  };

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

  {
    /* Function to get itinerary elements for each day of the tour */
  }
  function getItineraryElements(tourItem) {
    const itineraryElements = [];

    for (let i = 1; i <= tourItem.num_nights; i++) {
      const dayElement = (
        <div key={i}>
          {/*Accommodation*/}
          <div className="mt-4 pb-1 md:mt-6 text-center">
            <h4 className="text-lg text-tertiary font-semibold mb-0.5 md:mb-1">
              {t("accommodationTtype")}
            </h4>
            <p className="mt-1 mb-0.5 text-gray-500">
              {tourItem.accomodation_type[i - 1][i][userLang]}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {tourItem.accomodation_media[i - 1][i]
                .slice(0, 2)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="h-10 w-16 md:h-16 md:w-24 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() =>
                      handlePreview(tourItem.accomodation_media[i - 1][i], idx)
                    }
                  />
                ))}

              {tourItem.accomodation_media[i - 1][i].length > 2 && (
                <div
                  onClick={() =>
                    handlePreview(tourItem.accomodation_media[i - 1][i], 2)
                  }
                  className="relative h-10 w-16 md:h-16 md:w-24 rounded-lg overflow-hidden cursor-pointer shadow-md"
                >
                  <img
                    src={tourItem.accomodation_media[i - 1][i][2]}
                    alt="More"
                    className="h-full w-full object-cover brightness-50 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{tourItem.accomodation_media[i - 1][i].length - 2}{" "}
                      {t("photos")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {isPreviewOpen && (
              <div
                className="fixed inset-0 z-50 bg-gray-200 flex items-center justify-center"
                onClick={() => setIsPreviewOpen(false)}
              >
                <div
                  className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] w-[350px] md:w-[500px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    initialSlide={previewStartIndex}
                    spaceBetween={10}
                    slidesPerView={1}
                    key={previewImages.join()} // force re-init when images change
                  >
                    {previewImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`Accommodation ${index}`}
                          className="rounded-md w-full h-auto object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </div>
          {/* Day title */}
          <div className="mt-5">
            <div className="flex text-xl text-tertiary font-bold">
              <div>{t("day-")}</div>
              <div>{i + 1}</div>
            </div>
          </div>
          {/* Program */}
          <p>{tourItem.daily_program[i][i + 1][userLang]}</p>

          {/* Meals */}
          <div className="mt-4 md:mt-6 text-center">
            <h4 className="text-lg text-tertiary font-semibold mb-0.5 md:mb-1">
              {t("mealsDrinks")}
            </h4>
            <div className="flex justify-center gap-4">
              {[0, 1, 2].map((mealIndex) => (
                <div key={mealIndex} className="w-16 md:w-24">
                  <p className="text-black font-semibold text-center">
                    {t(["breakfast", "lunch", "dinner"][mealIndex])}
                  </p>
                  <div>
                    <img
                      className="h-10 md:h-16 w-full rounded-md shadow-lg object-cover"
                      src={tourItem.meals_media[i][i + 1][mealIndex]}
                    />
                  </div>
                  <p className="text-xs text-gray-600 leading-tight text-center">
                    {tourItem.meals[i][i + 1][mealIndex]}
                  </p>
                </div>
              ))}
            </div>
            <p
              className={
                tourPackage.badge == "Budget"
                  ? "hidden"
                  : "text-xs text-orange-500 mt-0.5 text-center"
              }
            >
              {t("snacksBeverages")}
            </p>
          </div>
        </div>
      );

      itineraryElements.push(dayElement);
    }

    return itineraryElements;
  }

  return (
    <div className="max-w-screen-lg mx-auto pt-5 px-3 md:px-6">
      {/* Swiper Carousel */}
      <Swiper
        dir={userLang === "ar" ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-72 rounded-lg shadow-lg"
      >
        {tourPackage.media_paths.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Title */}
      <h1 className="text-2xl font-bold mt-4">{tourPackage.title[userLang]}</h1>
      <div className="w-full mt-1 pt-4 grid grid-cols-2 md:grid-cols-5 gap-2.5 md:gap-3.5 items-start">
        {/* Country */}
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${tourPackage.country_code.toLowerCase()}.png`}
            className="w-6 h-4 rounded-sm"
          />
          <p className="font-semibold text-gray-500">
            {t(tourPackage.country)}
          </p>
        </div>

        {/* Days & Nights */}
        <div className="leading-tight text-sm md:text-base">
          <div className="flex items-center gap-1">
            <div className="font-semibold">{t("days")}</div>
            <div className="font-semibold text-gray-500">
              {tourPackage.num_days}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="font-semibold">{t("nights")}</div>
            <div className="font-semibold text-gray-500">
              {tourPackage.num_nights}
            </div>
          </div>
        </div>

        {/* Minimum Guests */}
        <div className="flex items-center gap-1">
          <div className="font-semibold">{t("minGuests")}</div>
          <div className="font-semibold text-gray-500">
            {tourPackage.min_pax}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-sm md:pr-1.5 md:text-right leading-none">
          <div className="text-xs text-gray-600">{t("from")}</div>
          <div className="text-secondary font-bold text-base">
            {formatPrice(pal_price)}
          </div>
          <div className="text-xs text-gray-600">{t("onlyAtPalSafari")}</div>
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
          <p className="text-sm text-gray-500">({tourPackage.num_reviewers})</p>
        </div>
      </div>

      {/* Tabs (Scrollable on Mobile) */}
      <div className="flex overflow-x-auto border-b border-gray-300 mt-4 md:mt-6 justify-between">
        {[
          "overviewTab",
          "itineraryTab",
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
        {/*Overview Tab*/}
        {activeTab === "overviewTab" && (
          <div>
            <p>{tourPackage.description[userLang]}</p>
            <h3 className="mt-6 text-center text-lg text-tertiary font-semibold">
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
                  tourPackage.num_nights > 0 && tourPackage.badge === "Budget"
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
                  tourPackage.num_nights > 0 && tourPackage.badge === "Silver"
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
                  tourPackage.num_nights > 0 && tourPackage.badge === "Luxury"
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
                    {tourPackage.attractions[userLang]}
                  </div>
                </div>
              </li>
              <li
                className={
                  tourPackage.translation_services === true
                    ? "flex items-center"
                    : "hidden"
                }
              >
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("translationServices")}</div>
                </div>
              </li>
              <li
                className={
                  tourPackage.wifi_provided === true
                    ? "flex items-center"
                    : "hidden"
                }
              >
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("wifiProvided")}</div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">{t("youGetRefundsParagraph")}</div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-start">
                  <div>
                    <Flame className="ml-1 text-orange-600 w-5 h-5" />
                  </div>
                  <div className="ml-1">
                    {tourPackage.adult_discount_description[userLang]}
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
            <div
              className={
                tourPackage.locations.length < 2 ? "hidden" : "block h-72 w-72"
              }
            >
              <h3 className="mt-7 text-lg text-tertiary font-semibold">
                {t("itineraryMap")}
              </h3>
              <div className="mt-1">
                <ItineraryMap locations={tourPackage.locations} />
              </div>
            </div>
          </div>
        )}

        {/*Itinerary Tab*/}
        {activeTab === "itineraryTab" && (
          <div>
            {/*Guest Arrival section*/}
            <div>
              <div className="flex gap-2 items-center">
                <MapPinned className="w-5 h-6 text-orange-500" />
                <h3 className="text-xl text-tertiary font-bold">
                  {t("guestArrival")}
                </h3>
              </div>
              <ul className="mt-0.5">
                <li>{tourPackage.meeting_Up_Directions[userLang]}</li>
                {tourPackage.visa_required === false &&
                  visaPolicies[tourPackage.country]?.[userLang] && (
                    <li>{visaPolicies[tourPackage.country][userLang]}</li>
                  )}

                <li className={tourPackage.num_nights > 0 ? "block" : "hidden"}>
                  {t("delayedArrival")}
                </li>
                <li
                  className={
                    tourPackage.num_nights >= 3 &&
                    tourPackage.badge === "Luxury"
                      ? "block"
                      : "hidden"
                  }
                >
                  {t("arrivalRelax")}
                </li>
              </ul>
            </div>

            {/*Day-1 title & program*/}
            <div className="mt-5">
              <h3
                className={
                  tourPackage.num_days === 1
                    ? "block text-xl text-tertiary font-bold"
                    : "hidden"
                }
              >
                {t("daysProgram")}
              </h3>
              <div
                className={
                  tourPackage.num_days > 1
                    ? "flex text-xl text-tertiary font-bold"
                    : "hidden"
                }
              >
                <div>{t("day-")}</div>
                <div>1</div>
              </div>
            </div>
            <p>{tourPackage.daily_program[0][1][userLang]}</p>

            {/*Day-1 meals & Drinks*/}
            <div className="mt-4 md:mt-6 text-center">
              <h4 className="text-lg text-tertiary font-semibold mb-0.5 md:mb-1">
                {t("mealsDrinks")}
              </h4>

              <div className="flex justify-center gap-4">
                <div className="w-16 md:w-24">
                  <p className="text-black font-semibold text-center">
                    {t("breakfast")}
                  </p>
                  <div>
                    <img
                      className="h-10 md:h-16 w-full rounded-md shadow-lg object-cover"
                      src={tourPackage.meals_media[0][1][0]}
                    />
                  </div>
                  <p className="text-xs text-gray-600 leading-tight text-center">
                    {tourPackage.meals[0][1][0]}
                  </p>
                </div>
                <div className="w-16 md:w-24">
                  <p className="text-black font-semibold text-center">
                    {t("lunch")}
                  </p>
                  <div>
                    <img
                      className="h-10 md:h-16 w-full rounded-md shadow-lg object-cover"
                      src={tourPackage.meals_media[0][1][1]}
                    />
                  </div>
                  <p className="text-xs text-gray-600 leading-tight text-center">
                    {tourPackage.meals[0][1][1]}
                  </p>
                </div>
                <div className="w-16 md:w-24">
                  <p className="text-black font-semibold text-center">
                    {t("dinner")}
                  </p>
                  <div>
                    <img
                      className="h-10 md:h-16 w-full rounded-md shadow-lg object-cover"
                      src={tourPackage.meals_media[0][1][2]}
                    />
                  </div>
                  <p className="text-xs text-gray-600 leading-tight text-center">
                    {tourPackage.meals[0][1][2]}
                  </p>
                </div>
              </div>
              <p
                className={
                  tourPackage.badge == "Budget"
                    ? "hidden"
                    : "text-xs text-orange-500 mt-0.5 text-center"
                }
              >
                {t("snacksBeverages")}
              </p>
            </div>
            {getItineraryElements(tourPackage)}

            {/*End of Tour*/}
            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <PlaneTakeoff className="w-5 h-6 text-orange-500" />
                <h3 className="text-xl text-tertiary font-bold">
                  {t("endOfVacation")}
                </h3>
              </div>
              <div className="mt-0.5">
                <p>{t("endVacationParagraph1")}</p>
                <p>{t("endVacationParagraph2")}</p>
                <p
                  className={tourPackage.badge == "Luxury" ? "block" : "hidden"}
                >
                  {t("endVacationLuxParagraph")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/*Included Items Tab*/}
        {activeTab === "includedTab" && (
          <div className="md:flex justify-between gap-2">
            {/*Included Items*/}
            <div className="mb-5 md:mb-0 md:w-1/2 md:pr-1">
              <div className="flex gap-2 items-center">
                <SmilePlus className="w-5 h-6 text-primary" />
                <h3 className="text-lg text-tertiary font-bold">
                  {t("includedItems")}
                </h3>
              </div>
              <div className="mt-0.5">
                <ul className="list-disc ltr:pl-3 rtl:pr-3 space-y-1">
                  <li>
                    <div>
                      <div className="text-sm">
                        {t("necessaryAccommodation")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t("necessaryAccommodation1")}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">
                        {t("necessaryTransportation")}
                      </div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("driverGuide")}</div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("taxesFees")}</div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("includedPickUp")}</div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("mealsAndDrinks")}</div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("activitiesIndicated")}</div>
                      <div className="text-xs text-gray-500"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/*Excluded Items*/}
            <div className="mt-2 md:mb-0 md:w-1/2 md:pl-1">
              <div className="flex gap-2 items-center">
                <Frown className="w-5 h-6 text-red-600" />
                <h3 className="text-lg text-tertiary font-bold">
                  {t("excludedItems")}
                </h3>
              </div>
              <div className="mt-0.5">
                <ul className="list-disc ltr:pl-3 rtl:pr-3 space-y-1">
                  <li
                    className={
                      tourPackage.badge == "Luxury"
                        ? "hidden"
                        : "list-item text-sm"
                    }
                  >
                    {t("excludedAccommodation")}
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">
                        {t("excludedPersonalItems")}
                      </div>
                      <div></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("excludedTips")}</div>
                      <div className="text-xs text-gray-500">
                        {t("excludedTips2")}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="text-sm">{t("excludedAlcohol")}</div>
                      <div className="text-xs text-gray-500">
                        {t("excludedAlcohol2")}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/*Price Giude Tab*/}
        {activeTab === "priceTab" && (
          <div>
            <div className="flex gap-2 items-center">
              <HandCoins className="w-5 h-6 text-orange-500" />
              <h3 className="text-lg text-tertiary font-bold">
                {t("priceGuide")}
              </h3>
            </div>
            <p className="mt-1">{t("priceGuideIntro")}</p>
            <ul className="mt-1.5 list-disc ltr:pl-4 rtl:pr-4 space-y-1">
              <li>{t("priceGuideChildren")}</li>
              <li>{t("priceGuideTeens")}</li>
              <li>
                <Trans
                  i18nKey="priceGuideAdults"
                  components={{
                    bold: <strong className="font-semibold" />,
                  }}
                />
              </li>
              <li>{t("priceGuideMinPax")}</li>
              <li>
                <Trans
                  i18nKey="priceGuidePrice"
                  components={{
                    bold: <strong className="font-semibold" />,
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="priceGuideBNPL"
                  components={{
                    bold: <strong className="font-semibold" />,
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="priceGuideRefundPolicy"
                  components={{
                    bold: <strong className="font-semibold" />,
                  }}
                />
              </li>
            </ul>
          </div>
        )}

        {/*More Info Tab*/}
        {activeTab === "moreInfoTab" && (
          <div>
            <h3 className="mt-6 text-lg text-tertiary font-semibold">
              {t("howToBookReserve")}
            </h3>
            <div className="mt-1">
              <p>
                <Trans
                  i18nKey="howToBookIntro"
                  components={{ bold: <strong className="font-semibold" /> }}
                />
              </p>
              <ul className="mt-0.5 pl-2 space-y-2">
                <li>
                  <div className="flex items-start">
                    <div>
                      <ChevronRight className="ml-1 pt-1 text-primary w-5 h-5 ltr:ml-1 rtl:mr-1 rtl:rotate-180" />
                    </div>
                    <div className="ml-0.5">{t("howToBook2")}</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div>
                      <ChevronRight className="ml-1 pt-1 text-primary w-5 h-5 ltr:ml-1 rtl:mr-1 rtl:rotate-180" />
                    </div>
                    <div className="ml-0.5">
                      <Trans
                        i18nKey="howToBook3"
                        components={{
                          bold: <strong className="font-semibold" />,
                        }}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div>
                      <ChevronRight className="ml-1 pt-1 text-primary w-5 h-5 ltr:ml-1 rtl:mr-1 rtl:rotate-180" />
                    </div>
                    <div className="ml-0.5">
                      <Trans
                        i18nKey="howToBook4"
                        components={{
                          bold: <strong className="font-semibold" />,
                        }}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist, Share, Reserve & Booking Buttons */}
      <div className="mt-7 pb-6 flex justify-between items-center gap-4">
        {/* Wishlist */}
        <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
          <Heart className="w-7 h-7 text-primary" />
          <div className="text-xs mt-1">{t("addToWishlistBtn")}</div>
        </div>

        {/* Share */}
        <div
          className="flex flex-col mr-0.5 items-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: tourPackage.title.en,
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
        <button className="p-1 leading-tight border border-primary text-sm text-primary rounded-lg transition-transform hover:border-primary2 hover:scale-110">
          {t("reserveBtna")}
          <br />
          <span className="p-0 text-sm leading-none text-orange-500">
            {t("reserveBtnb")}
          </span>
        </button>

        {/* Book Now */}
        <button className="px-3 py-2 bg-primary text-white rounded-lg font-semibold transition-transform hover:bg-primary2 hover:scale-110">
          {t("bookNowBtn")}
        </button>
      </div>
    </div>
  );
};

export default MoreDetails;
