import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import Header from "./Header";
import Footer from "./Footer";
import StructuredData from "./StructuredData";
import ConnectionBanner from "./ConnectionBanner";
import ScrollProgress from "./ScrollProgress";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname || "/";
    const source = new URLSearchParams(window.location.search).get("ref") || "direct";
    base44.functions.invoke("trackSiteVisit", { page, source }).catch(() => {});
  }, [location.pathname]);

  return (
    <CurrencyProvider>
      <div className="bg-background text-foreground min-h-screen">
        <ScrollProgress />
        <StructuredData />
        <ConnectionBanner />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  );
}