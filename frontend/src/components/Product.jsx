import React from "react";
import { Badge } from "antd";
//import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";
import { t } from "i18next";

const Product = () => {
  //const { t } = useTranslation();

  return (
    <div className="bg-white inline-block md:ml-0.5 p-0.5 md:p-1 rounded-lg shadow-md">
      <Badge.Ribbon text={t("Budget")} color="#8F00FF">
        <div>
          <img
            className="h-[110px] md:h-[130px] w-[150px] md:w-[180px] rounded-t-lg object-cover"
            src={assets.header_img}
            alt="product image"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row">
            <div className="text-xs text-gray-900 md:font-semibold">
              {t("days")}
            </div>
            <div className="text-xs text-gray-700 ml-0.5">3</div>
          </div>
          <div className="text-xs text-gray-900">{t("Tanzania")}</div>
          <div>
            <img className="h-6 w-12 object-cover" src={assets.review} alt="" />
          </div>
        </div>
        <div className="w-[150px] md:w-[180px] text-sm md:font-semibold text-black leading-none">
          We will need to display titles dynamically.
        </div>
        <div className="flex justify-between mt-1 md:mt-3">
          <div className="justify-start space-y-0">
            <span className="text-xs text-gray-600 md:text-gray-800 leading-none block">
              {t("from")}
            </span>
            <span className="text-sm md:text-base text-secondary font-bold leading-none block">
              $800
            </span>
            <span className="text-xs text-gray-600 md:text-gray-800 leading-none block">
              {t("withPalSafari")}
            </span>
          </div>
          <div className="justify-end">
            <span className="text-xs text-gray-600 md:text-gray-800 leading-tight block">
              {t("listed")}
            </span>
            <span className=" text-gray-600 md:text-gray-800 line-through blocspan">
              $1250
            </span>
          </div>
        </div>
        <button className="bg-primary text-white font-semibold py-0.5 md:py-1 w-full rounded-lg mt-2 hover:bg-primary2 hover:cursor-pointer">
          MORE DETAILS
        </button>
      </Badge.Ribbon>
    </div>
  );
};

export default Product;
