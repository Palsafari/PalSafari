import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const AppProvider = ({ children }) => {
  const [userCity, setUserCity] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [userCountryCode, setUserCountryCode] = useState(null);
  const [xuserLang, setXuserLang] = useState(
    (navigator.language || navigator.userLanguage).split("-")[0]
  );
  const rawUserLang = xuserLang;

  const convertLang = (extractedLang) => {
    const supported = [
      "zh",
      "de",
      "ja",
      "fr",
      "ar",
      "pt",
      "es",
      "ko",
      "ru",
      "hi",
      "it",
    ];
    return supported.includes(extractedLang) ? extractedLang : "en";
  };

  const userLang = convertLang(xuserLang);

  useEffect(() => {
    localStorage.setItem("userLang", userLang);
    setXuserLang(userLang);
  }, [xuserLang, userLang]);

  useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        const res = await axios.get("https://api.geoapify.com/v1/ipinfo", {
          params: { apiKey: GEOAPIFY_API_KEY },
        });

        const city = res.data.city?.name;
        const country = res.data.country?.name;
        const countryCode = res.data.country?.iso_code;

        if (city) setUserCity(city);
        if (country) setUserCountry(country);
        if (countryCode) setUserCountryCode(countryCode);

        // Save to cache
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            city,
            country,
            countryCode,
            fetchedAt: new Date().toISOString(),
          })
        );
      } catch (err) {
        console.error("IP geolocation error:", err);
      }
    };

    const cachedLocation = localStorage.getItem("userLocation");

    if (cachedLocation) {
      const { city, country, countryCode, fetchedAt } =
        JSON.parse(cachedLocation);

      // Check if cached data is less than 84 hours old
      const isFresh =
        fetchedAt && new Date() - new Date(fetchedAt) < 84 * 60 * 60 * 1000;

      if (isFresh) {
        if (city) setUserCity(city);
        if (country) setUserCountry(country);
        if (countryCode) setUserCountryCode(countryCode);
        return; // Use cached data
      }
    }

    // Otherwise fetch new data
    getLocationFromIP();
  }, []);

  return (
    <AppContext.Provider
      value={{ rawUserLang, userLang, userCity, userCountry, userCountryCode }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
