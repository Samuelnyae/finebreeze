import { useState } from "react";

/**
 * Image with lazy loading, async decoding, and a skeleton placeholder
 * while the image downloads. Optimized for slow connections.
 *
 * Props:
 *  - eager: load immediately (above-the-fold / hero images)
 *  - priority: set fetchpriority="high" (first hero image)
 *  - skeletonClass: extra classes for the placeholder
 *  - className / style: applied to the wrapper div (positioning, opacity, etc.)
 */
export default function LazyImage({ src, alt, className, style, eager = false, priority = false, skeletonClass = "", ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ""}`} style={style}>
      {!loaded && !error && (
        <div className={`absolute inset-0 ${skeletonClass || "bg-muted"} animate-pulse`} />
      )}
      {error && (
        <div className={`absolute inset-0 ${skeletonClass || "bg-muted"} flex items-center justify-center text-muted-foreground text-xs`}>
          Failed to load
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : "auto"}
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </div>
  );
}