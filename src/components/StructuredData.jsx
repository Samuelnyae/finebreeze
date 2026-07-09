import { useEffect } from "react";

/**
 * Injects Schema.org JSON-LD structured data for the Hotel/LocalBusiness.
 * Helps Google display rich snippets (star ratings, location, contact info).
 */
export default function StructuredData() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "Fine Breeze Hotel & Restaurant",
      description:
        "Luxury hotel and restaurant in Voi, Taita Taveta County, Kenya. Offering comfortable rooms, fine dining, and event hosting with warm Kenyan hospitality.",
      starRating: { "@type": "Rating", ratingValue: "4.9" },
      telephone: ["+254714447638", "+254701734251"],
      email: "fynbriz@gmail.com",
      url: window.location.origin,
      image: "https://media.base44.com/images/public/6a430e1bc280ec2de39f8442/b7041c0be_02538d30c_generated_image.png",
      priceRange: "KES",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Voi",
        addressRegion: "Taita Taveta County",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -3.3969,
        longitude: 38.5788,
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
        { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = "hotel-structured-data";
    document.head.appendChild(script);

    return () => {
      document.getElementById("hotel-structured-data")?.remove();
    };
  }, []);

  return null;
}