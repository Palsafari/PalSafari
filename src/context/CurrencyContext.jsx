// src/context/CurrencyContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const { userCountryCode } = useContext(AppContext);
  const [exchangeRates, setExchangeRates] = useState({});
  const [userCurrency, setUserCurrency] = useState("USD");

  const accessKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  const countryToCurrency = {
    US: "USD",
    CA: "CAD",
    GB: "GBP",
    AU: "AUD",
    EU: "EUR",
    FR: "EUR",
    DE: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
    BE: "EUR",
    AT: "EUR",
    PT: "EUR",
    IE: "EUR",
    CH: "CHF",
    SE: "SEK",
    NO: "NOK",
    DK: "DKK",
    PL: "PLN",
    CZ: "CZK",
    HU: "HUF",
    RU: "RUB",
    IN: "INR",
    CN: "CNY",
    JP: "JPY",
    KR: "KRW",
    AE: "AED",
    SA: "SAR",
    EG: "EGP",
    ZA: "ZAR",
    NG: "NGN",
    KE: "KES",
    TZ: "TZS",
    UG: "UGX",
    MA: "MAD",
    DZ: "DZD",
    TN: "TND",
    IL: "ILS",
    TR: "TRY",
    BR: "BRL",
    AR: "ARS",
    MX: "MXN",
    CO: "COP",
    CL: "CLP",
    NZ: "NZD",
    ID: "IDR",
    TH: "THB",
    MY: "MYR",
    SG: "SGD",
    PH: "PHP",
    HK: "HKD",
    PK: "PKR",
    BD: "BDT",
    LK: "LKR",
    VN: "VND",
    QA: "QAR",
    KW: "KWD",
    BH: "BHD",
    OM: "OMR",
    JO: "JOD",
    LB: "LBP",
    IR: "IRR",
    SD: "SDG",
    GH: "GHS",
    CM: "XAF",
    SN: "XOF",
    CI: "XOF",
    ML: "XOF",
    BF: "XOF",
    NE: "XOF",
    BJ: "XOF",
    TG: "XOF",
    RW: "RWF",
    ET: "ETB",
    ZM: "ZMW",
    MZ: "MZN",
    BW: "BWP",
    NA: "NAD",
    MU: "MUR",
    SC: "SCR",
    MG: "MGA",
    FJ: "FJD",
    PG: "PGK",
  };

  // Step 1: Fetch exchange rates (with cache, retry once)
  const fetchRates = async (retry = false) => {
    try {
      const cachedRates = localStorage.getItem("exchangeRates");
      const lastFetch = localStorage.getItem("lastRatesFetch");
      const today = new Date().toISOString().split("T")[0];

      if (cachedRates && lastFetch === today) {
        console.log("⚡ Using cached exchange rates.");
        setExchangeRates(JSON.parse(cachedRates));
        return;
      }

      const url = `https://v6.exchangerate-api.com/v6/${accessKey}/latest/USD`;
      console.log("🔗 Fetching rates from:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("📥 API Response:", data);

      if (data && data.conversion_rates) {
        setExchangeRates(data.conversion_rates);
        localStorage.setItem(
          "exchangeRates",
          JSON.stringify(data.conversion_rates)
        );
        localStorage.setItem("lastRatesFetch", today);
      } else {
        throw new Error("Invalid exchange rate data structure");
      }
    } catch (error) {
      console.error("🔥 Error fetching rates:", error);
      if (!retry) {
        console.log("🔁 Retrying fetch once...");
        await fetchRates(true);
      } else {
        console.error("❌ Retry failed. Defaulting to USD only.");
      }
    }
  };

  // Step 2: Detect user's currency based on country
  useEffect(() => {
    const code = userCountryCode?.toUpperCase();
    const currency = countryToCurrency[code] || "USD";
    setUserCurrency(currency);
  }, [userCountryCode]);

  // Step 3: Fetch rates once on load
  useEffect(() => {
    fetchRates();
  }, []);

  // Step 4: Function to convert amount and log the exchange rate
  const convertPrice = (amount) => {
    // Log the exchange rate for the user's currency
    if (exchangeRates[userCurrency]) {
      console.log(
        `Exchange rate for ${userCurrency}: ${exchangeRates[userCurrency]}`
      );
    } else {
      console.warn(`⚠️ No exchange rate available for ${userCurrency}`);
    }

    // If userCurrency is USD or if no exchange rate is available, use USD
    if (userCurrency === "USD" || !exchangeRates[userCurrency]) {
      console.warn(
        `⚠️ No exchange rate for ${userCurrency}, using USD as fallback.`
      );
      return amount; // Return the amount as is if USD or exchange rate is missing
    }

    const rate = exchangeRates[userCurrency];
    return Math.ceil(amount * rate); // Convert price using the exchange rate
  };

  // Step 5: Function to format the amount with correct currency symbol
  const formatPrice = (amount) => {
    // If the user currency is USD or if no exchange rate available, force USD
    const shouldUseUSD = userCurrency === "USD" || !exchangeRates[userCurrency];

    const rate = exchangeRates[userCurrency];

    // If the rate is undefined, fall back to USD
    if (!rate) {
      console.warn(`⚠️ No exchange rate for ${userCurrency}, using USD.`);
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD", // fallback to USD
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currencyDisplay: "symbol",
      }).format(amount);
    }

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: shouldUseUSD ? "USD" : userCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "symbol",
    }).format(amount * rate);
  };

  return (
    <CurrencyContext.Provider
      value={{ userCurrency, convertPrice, formatPrice, exchangeRates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
