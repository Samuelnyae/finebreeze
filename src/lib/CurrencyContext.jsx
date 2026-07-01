import { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const CurrencyContext = createContext(null);

const FALLBACK_RATES = { KES: 1, USD: 0.0078, EUR: 0.0072, GBP: 0.0061 };

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => localStorage.getItem("fb_currency") || "KES");
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    base44.functions.invoke("getExchangeRates", {})
      .then((res) => {
        if (res.data?.rates) setRates(res.data.rates);
      })
      .catch(() => {});
  }, []);

  const changeCurrency = (c) => {
    setCurrency(c);
    localStorage.setItem("fb_currency", c);
  };

  const formatPrice = (kesAmount) => {
    const rate = rates[currency] || 1;
    const converted = kesAmount * rate;
    if (currency === "KES") return `KES ${Math.round(converted).toLocaleString()}`;
    return `${currency} ${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}