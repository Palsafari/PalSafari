import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-200 text-gray-800 font-sans max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {t("termsOfService")}
      </h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        {t("effectiveDate2")}
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section1Title2")}</h2>
          <p>{t("section1Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section2Title2")}</h2>
          <p>{t("section2Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section3Title2")}</h2>
          <p>{t("section3Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section4Title2")}</h2>
          <p>{t("section4Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section5Title2")}</h2>
          <p>{t("section5Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section6Title2")}</h2>
          <p>
            <Trans
              i18nKey="section6Text"
              t={t}
              components={{
                1: (
                  <Link
                    to="/refund-policy"
                    className="text-blue-600 hover:underline"
                  />
                ),
              }}
            />
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section7Title2")}</h2>
          <p>{t("section7Text")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("section8Title2")}</h2>
          <p>
            <Trans
              i18nKey="section8Text"
              t={t}
              components={{
                1: (
                  <a
                    href="mailto:support@palsafari.com"
                    className="text-blue-600 hover:underline"
                  />
                ),
              }}
            />
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
