import React from "react";
import { Plus } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mt-2 bg-tertiary rounded-2xl">
        <div className="p-2 md:p-3">
          <p className="font-semibold text-gray-300">{t("fewHighlights")}</p>
          <div className="flex justify-between pt-1 mt-1 md:pt-3 gap-3">
            <div>
              <div className="flex">
                <p className="font-bold text-white">{t("millionPeople")}</p>
                <Plus className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-xs md:text-sm mt-1.5 text-gray-300">
                {t("millionPeople2")}
              </p>
            </div>
            <div className="pl-1">
              <div>
                <div className="flex">
                  <div className="flex pr-0.5">
                    <p className="font-bold text-white">102</p>
                    <Plus className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="font-bold text-white">{t("countries")}</p>
                </div>
                <p className="text-xs md:text-sm mt-1.5 text-gray-300">
                  {t("countries2")}
                </p>
              </div>
            </div>
            <div className="pl-1">
              <div>
                <div className="flex">
                  <div className="flex pr-0.5">
                    <p className="font-bold text-white">6</p>
                    <Plus className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="font-bold text-white">{t("years")}</p>
                </div>
                <p className="text-xs md:text-sm mt-1.5 text-gray-300">
                  {t("years2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-gray-700 font-semibold text-center">
        {t("whatWeDo")}
      </div>
      <div className="mt-2 text-gray-600 text-center text-sm">
        {t("whatWeDo2")}
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-7 pt-3.5 gap-4">
        <img
          className="w-full h-40 md:max-w-[300px] rounded-lg"
          src={assets.christ_of_abyss}
          alt=""
        />
        <div className="flex flex-col justify-center items-center text-center gap-1 md:gap-2 md:w-2/3">
          <p className="text-sm text-gray-600 font-semibold italic">
            {t("unique")}
          </p>
          <p className="text-xs text-gray-500 md:mt-2">{t("unique2")}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-6 pt-3 gap-4">
        <img
          className="block md:hidden w-full h-40 md:max-w-[300px] rounded-lg"
          src={assets.cave_swimming}
          alt=""
        />
        <div className="flex flex-col justify-center items-center text-center gap-1 md:gap-2 md:w-2/3">
          <p className="text-sm text-gray-600 font-semibold italic">
            {t("fun")}
          </p>
          <p className="text-xs text-gray-500 md:mt-2">{t("fun2")}</p>
        </div>
        <img
          className="hidden md:block w-full h-40 md:max-w-[300px] object-cover rounded-lg"
          src={assets.cave_swimming}
          alt=""
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-7 pt-3.5 gap-4">
        <img
          className="w-full h-40 md:max-w-[300px] object-cover rounded-lg"
          src={assets.palawan_4}
          alt=""
        />
        <div className="flex flex-col justify-center items-center text-center gap-1 md:gap-2 md:w-2/3">
          <p className="text-sm text-gray-600 font-semibold italic">
            {t("affordable")}
          </p>
          <p className="text-xs text-gray-500 md:mt-2">{t("affordable2")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
