import React, { useContext } from "react";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CurrencyContext from "../context/CurrencyContext";
import AppContext from "../context/AppContext";

const Product = ({
  pckg,
  badge,
  lead_img,
  num_days,
  country,
  title,
  pal_price,
  listed_price,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formatPrice } = useContext(CurrencyContext);
  const { userLang } = useContext(AppContext);

  const ribbonColor = (b) =>
    b === "Budget" ? "#009dff" : b === "Silver" ? "#8F00FF" : "#ff9100";

  return (
    <div
      onClick={() =>
        window.innerWidth < 769 &&
        navigate(`/more-details/${pckg.id}`, { state: { pckg } })
      }
      className="bg-white inline-block p-1 rounded-lg shadow-lg cursor-pointer md:cursor-default transition-transform active:scale-[0.98] "
      dir={userLang === "ar" || userLang === "he" ? "rtl" : "ltr"}
    >
      <Badge.Ribbon text={t(badge)} color={ribbonColor(badge)}>
        <img
          className="h-[110px] md:h-[130px] w-[150px] md:w-[180px] rounded-t-lg object-cover"
          src={lead_img}
          alt=""
        />

        {/* Days + Reviews */}
        <div className="mt-1 flex justify-between items-start rtl:flex-row-reverse">
          <div className="flex items-center text-xs">
            <span className="font-semibold">{t("days")}</span>
            <span className="ml-1">{num_days}</span>
          </div>
          <div className="text-xs">{t(country)}</div>
          <img
            className="h-6 w-12 pb-2 object-contain"
            src={assets.review}
            alt=""
          />
        </div>

        {/* Title */}
        <div className="w-[150px] md:w-[180px] text-sm font-semibold text-black leading-none">
          {title}
        </div>

        {/* Prices */}
        <div className="flex justify-between mt-1 md:mt-3 rtl:flex-row-reverse">
          {/* PalSafari price */}
          <div className="leading-none text-left rtl:text-right">
            <div className="text-xs text-gray-600">{t("from")}</div>
            <div className="text-xs text-secondary font-semibold">
              {formatPrice(pal_price)}
            </div>
            <div className="text-xs text-gray-600">{t("withPalSafari")}</div>
          </div>

          {/* Listed price */}
          <div className="text-right leading-none rtl:text-left">
            <div className="text-xs text-gray-600">{t("listed")}</div>
            <div className="text-xs line-through text-gray-600 mt-0">
              {formatPrice(listed_price)}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            navigate(`/more-details/${pckg.id}`, { state: { pckg } })
          }
          className="hidden md:block bg-primary text-white font-semibold py-1 w-full rounded-lg mt-2 cursor-pointer hover:scale-105 transition"
        >
          {t("moreDetBtn")}
        </button>
      </Badge.Ribbon>
    </div>
  );
};

export default Product;
