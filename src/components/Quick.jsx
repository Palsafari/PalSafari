import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import Product from "./Product";

const Quick = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-8 pb-2 rtl:space-x-reverse">
      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-secondary border-0" />
        <span className="absolute px-3 text-sm md:text-lg font-medium text-tertiary -translate-x-1/2 bg-gray-200 left-1/2 leading-tight">
          {t("quickGetaways")}
        </span>
      </div>

      <div className="inline-flex items-center justify-center w-full rtl:space-x-reverse">
        <hr className="w-full h-px my-8 bg-gray-400 border-0" />
        <div className="absolute bg-gray-200">
          <button
            type="button"
            onClick={() => navigate("/all-quicks")}
            className=" m-2 mb-2 py-1 px-3 text-sm font-semibold text-primary hover:cursor-pointer hover:scale-110 transition-transform focus:outline-none bg-gray-200 rounded-lg border border-primary hover:bg-gray-100 hover:text-primary2"
          >
            {t("viewAllBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quick;
