import { useState, useEffect } from "react";

/**
 * Image with lazy loading, async decoding, and a skeleton placeholder
 * while the image downloads. Optimized for slow connections.
 * Retries failed loads automatically (up to 2 attempts).
 *
 * Props:
 *  - eager: load immediately (above-the-fold / hero images)
 *  - priority: set fetchpriority="high" (first hero image)
 *  - skeletonClass: extra classes for the placeholder
 *  - className / style: applied to the wrapper div (positioning, opacity, etc.)
 */
export default function LazyImage({ src, alt, className, style, eager = false, priority = false, skeletonClass = "", ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  // Reset state when src changes
  useEffect(() => {
    setLoaded(false);
    setRetryCount(0);
    setImgSrc(src);
  }, [src]);

  const MAX_RETRIES = 2;

  const handleError = () => {
    if (retryCount < MAX_RETRIES) {
      // Wait a bit then retry with cache-busting query param
      const timer = setTimeout(() => {
        setRetryCount((c) => c + 1);
        setImgSrc(`${src}${src.includes("?") ? "&" : "?"}_retry=${retryCount + 1}`);
      }, 800 * (retryCount + 1));
      return () => clearTimeout(timer);
    }
  };

  const failed = retryCount >= MAX_RETRIES && !loaded;

  return (
    <div className={`relative overflow-hidden ${className || ""}`} style={style}>
      {!loaded && !failed && (
        <div className={`absolute inset-0 ${skeletonClass || "bg-muted"} animate-pulse`} />
      )}
      {failed && (
        <div className={`absolute inset-0 ${skeletonClass || "bg-muted"} flex items-center justify-center text-muted-foreground text-xs`}>
          Failed to load
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </div>
  );
}