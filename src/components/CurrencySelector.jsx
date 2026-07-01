import { useCurrency } from "@/lib/CurrencyContext";

const CURRENCIES = ["KES", "USD", "EUR", "GBP"];

export default function CurrencySelector({ className = "" }) {
  const { currency, changeCurrency } = useCurrency();
  return (
    <select
      value={currency}
      onChange={(e) => changeCurrency(e.target.value)}
      className={`bg-secondary text-foreground text-xs font-bold rounded-lg border border-border/50 px-2.5 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary transition-colors hover:bg-primary/10 ${className}`}
      aria-label="Select currency"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}