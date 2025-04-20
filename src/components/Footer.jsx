import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer>
      <div className="md:flex md:justify-between pt-3 mt-4 md:mt-8 mb-0.5 md:mb-3 font-medium md:font-bold text-tertiary rtl:space-x-reverse">
        <ul
          onClick={() => navigate("/about-us")}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          {t("aboutUs")}
        </ul>
        <ul
          onClick={() => navigate("/contact-us")}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          {t("contactUs")}
        </ul>
        <ul
          onClick={() => navigate("/hosts")}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          {t("hosts")}
        </ul>
        <ul
          onClick={() => navigate("/privacy-policy")}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          {t("privacyPolicy")}
        </ul>
        <ul
          onClick={() => navigate("/terms-of-service")}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          {t("termsAndConditions")}
        </ul>
      </div>
      <div>
        <hr className="mt-1 md:mt-2 border-secondary" />
        <div className="flex mt-0.5 md:mt-2 mb-0.5 md:mb-2 justify-center rtl:space-x-reverse">
          <p>{t("copyright")}</p>
          <p className="ml-0.5 md:ml-1 mr-0.5 md:mr-1">
            {new Date().getFullYear()}
          </p>
          <p>{t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
