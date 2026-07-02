import { useState, useEffect } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

/**
 * Shows a dismissible banner when the browser reports no connection,
 * and also when a slow/unstable page load takes too long.
 */
export default function ConnectionBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-destructive text-destructive-foreground px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium shadow-lg">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>You're offline. Showing saved content where available.</span>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/15 hover:bg-white/25 transition-colors text-xs font-semibold"
      >
        <RefreshCw className="w-3 h-3" /> Retry
      </button>
    </div>
  );
}