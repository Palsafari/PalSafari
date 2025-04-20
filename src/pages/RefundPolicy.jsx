import React from "react";
import { useTranslation, Trans } from "react-i18next";

const RefundPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-200 text-gray-800 font-sans max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {t("title3")}
      </h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        {t("effectiveDate3")}
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("overviewTitle")}</h2>
          <p>{t("overviewText")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("cancellationTitle")}
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t("refundRule1")}</li>
            <li>{t("refundRule2")}</li>
            <li>{t("refundRule3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("requestTitle")}</h2>
          <p>
            <Trans
              i18nKey="requestText"
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

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("nonRefundableTitle")}
          </h2>
          <p>{t("nonRefundableIntro")}</p>
          <ul className="list-disc pl-5 mt-2">
            <li>{t("nonRefundable1")}</li>
            <li>{t("nonRefundable2")}</li>
            <li>{t("nonRefundable3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("updatesTitle")}</h2>
          <p>{t("updatesText")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("helpTitle")}</h2>
          <p>
            <Trans
              i18nKey="helpText"
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

export default RefundPolicy;
