import React from "react";
import { useTranslation, Trans } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl text-center font-bold mb-4">
        {t("privacyPolicy2")}
      </h1>

      <p className="mb-2">
        <div>
          <strong>{t("effectiveDate")}</strong>
        </div>
        <div>{t("theDate")}</div>
      </p>

      <p className="mb-6">
        <div>
          <strong>{t("companyName2")}</strong>
        </div>
        <div>{t("palSafari")}</div>
        <br />
        <div>
          <strong>{t("website")}</strong>
        </div>
        <div>www.palsafari.com</div>
      </p>

      <p className="mb-4">
        <Trans i18nKey="privacyIntro" components={{ strong: <strong /> }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section1Title")}</h2>
      <p className="mb-2">{t("infoCollectWhen")}</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>{t("bookTour")}</li>
        <li>{t("subscribeNewsletter")}</li>
        <li>{t("contactSupport")}</li>
      </ul>

      <p className="mb-2">{t("mayInclude")}</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>{t("fullName")}</li>
        <li>{t("emailAddress2")}</li>
        <li>{t("phoneNumber")}</li>
        <li>{t("location")}</li>
        <li>{t("paymentInfo")}</li>
        <li>{t("travelPreferences")}</li>
      </ul>

      <p className="mb-2">{t("nonPersonalInfo")}</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>{t("ipAddress")}</li>
        <li>{t("browserType")}</li>
        <li>{t("deviceInfo")}</li>
        <li>{t("pagesVisited")}</li>
        <li>{t("timeSpent")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section2Title")}</h2>
      <p className="mb-2">{t("weUseInfoTo")}</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>{t("processBookings")}</li>
        <li>{t("provideSupport")}</li>
        <li>{t("improveService")}</li>
        <li>{t("sendUpdates")}</li>
        <li>{t("personalizeTours")}</li>
        <li>{t("legalCompliance")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section3Title")}</h2>
      <p className="mb-4">
        <Trans i18nKey="notSell" components={{ strong: <strong /> }} />
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>{t("serviceProviders")}</li>
        <li>{t("tourOperators")}</li>
        <li>{t("legalBodies")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section4Title")}</h2>
      <p className="mb-4">{t("cookieText")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section5Title")}</h2>
      <p className="mb-4">{t("securityText")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section6Title")}</h2>
      <p className="mb-4">
        <Trans i18nKey="yourRightsText" components={{ strong: <strong /> }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section7Title")}</h2>
      <p className="mb-4">{t("thirdPartyText")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section8Title")}</h2>
      <p className="mb-4">{t("childrenText")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section9Title")}</h2>
      <p className="mb-4">{t("changesText")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("section10Title")}</h2>
      <p className="mb-4">{t("contactText")}</p>

      <div className="mb-4">
        <strong>{t("palSafari")}</strong>
        <br />
        {t("email")}:{" "}
        <a
          href="mailto:support@palsafari.com"
          className="text-blue-600 hover:underline"
        >
          support@palsafari.com
        </a>
        <br />
        {t("website2")}:{" "}
        <a
          href="https://www.palsafari.com"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          www.palsafari.com
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
