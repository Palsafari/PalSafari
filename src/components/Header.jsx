import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 md:mt-6 flex flex-col justify-center bg-tertiary rounded-2xl gap-4 px-5 md:px-8 lg:px-17 py-4 md:py-[3vw] rtl:space-x-reverse">
      <p className="text-xl md:text-3xl lg:text-4xl text-center text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
        {t("headerMessageTitle")}
      </p>
      <p className="text-white text-sm lg:text-base text-center font-light">
        {t("headerMessageParagraph")}
      </p>
    </div>
  );
};

export default Header;
