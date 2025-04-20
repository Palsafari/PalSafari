import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./locales/en/en.json";
import itLang from "./locales/it/it.json";
import hiLang from "./locales/hi/hi.json";
import ruLang from "./locales/ru/ru.json";
import koLang from "./locales/ko/ko.json";
import esLang from "./locales/es/es.json";
import ptLang from "./locales/pt/pt.json";
import arLang from "./locales/ar/ar.json";
import frLang from "./locales/fr/fr.json";
import jaLang from "./locales/ja/ja.json";
import deLang from "./locales/de/de.json";
import zhLang from "./locales/zh/zh.json";

const xuserLang = (navigator.language || navigator.userLanguage).split("-")[0];

const convertLang = (xtractedLang) => {
  if (xtractedLang == "zh") {
    return "zh";
  } else if (xtractedLang == "de") {
    return "de";
  } else if (xtractedLang == "ja") {
    return "ja";
  } else if (xtractedLang == "fr") {
    return "fr";
  } else if (xtractedLang == "ar") {
    return "ar";
  } else if (xtractedLang == "pt") {
    return "pt";
  } else if (xtractedLang == "es") {
    return "es";
  } else if (xtractedLang == "ko") {
    return "ko";
  } else if (xtractedLang == "ru") {
    return "ru";
  } else if (xtractedLang == "hi") {
    return "hi";
  } else if (xtractedLang == "it") {
    return "it";
  } else {
    return "en";
  }
};

const userLang = convertLang(xuserLang);

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  zh: {
    translation: zhLang,
  },

  de: {
    translation: deLang,
  },

  ja: {
    translation: jaLang,
  },

  fr: {
    translation: frLang,
  },

  ar: {
    translation: arLang,
  },

  pt: {
    translation: ptLang,
  },

  es: {
    translation: esLang,
  },

  ko: {
    translation: koLang,
  },

  ru: {
    translation: ruLang,
  },

  hi: {
    translation: hiLang,
  },

  it: {
    translation: itLang,
  },

  en: {
    translation: enLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available
    lng: userLang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
