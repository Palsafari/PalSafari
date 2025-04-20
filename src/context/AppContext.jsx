import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Get the user's language from the browser
  const [xuserLang, setXuserLang] = useState(
    (navigator.language || navigator.userLanguage).split("-")[0]
  );

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

  useEffect(() => {
    localStorage.setItem("userLang", userLang);
    setXuserLang(userLang);
  }, [xuserLang, userLang]);

  return (
    <AppContext.Provider value={{ userLang }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
