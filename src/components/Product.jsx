import React from "react";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

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

  const ribbonColor = (badge) => {
    if (badge == "Budget") {
      return "#009dff";
    } else if (badge == "Silver") {
      return "#8F00FF";
    } else {
      return "#ff9100";
    }
  };

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 769) navigate(`/product/${pckg.id}`);
      }}
      className="bg-white inline-block md:ml-0.5 p-1 rounded-lg shadow-lg cursor-pointer md:cursor-default transition duration-150 ease-in-out active:scale-[0.98] active:bg-gray-100"
    >
      <Badge.Ribbon text={t(badge)} color={ribbonColor(badge)}>
        <div>
          <img
            className="h-[110px] md:h-[130px] w-[150px] md:w-[180px] rounded-t-lg object-cover"
            src={lead_img}
            alt="product image"
          />
        </div>
        <div className="mt-1 flex justify-between items-start">
          <div className="flex flex-row">
            <div className="text-xs text-gray-900 md:font-semibold">
              {t("days")}
            </div>
            <div className="text-xs text-gray-700 ml-0.5">{num_days}</div>
          </div>
          <div className="text-xs text-gray-900">{t(country)}</div>
          <div>
            <img
              className="h-6 w-12 pb-2 md:pb-1 object-contain"
              src={assets.review}
              alt=""
            />
          </div>
        </div>
        <div className="w-[150px] md:w-[180px] text-sm md:font-semibold text-black leading-none">
          {title}
        </div>
        <div className="flex justify-between mt-1 md:mt-3">
          <div className="justify-start leading-none">
            <span className="text-xs text-gray-600 md:text-gray-800 leading-none block">
              {t("from")}
            </span>
            <span className="text-sm md:text-base text-secondary font-bold leading-none block">
              ${pal_price}
            </span>
            <span className="text-xs text-gray-600 md:text-gray-800 leading-none block">
              {t("withPalSafari")}
            </span>
          </div>
          <div className="justify-end leading-tight">
            <span className="text-xs text-gray-600 md:text-gray-800 leading-tight block">
              {t("listed")}
            </span>
            <span className=" text-gray-600 md:text-gray-800 line-through blocspan">
              ${listed_price}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/product/${pckg.id}`)}
          className="hidden md:block bg-primary text-white font-semibold py-0.5 md:py-1 w-full rounded-lg mt-2 transition-transform hover:scale-105 hover:bg-primary2"
        >
          MORE DETAILS
        </button>
      </Badge.Ribbon>
    </div>
  );
};

export default Product;
