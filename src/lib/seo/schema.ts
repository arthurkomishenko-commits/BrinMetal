export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BrinMetall",
    description:
      "Professional metal fabrication, welding, gates, fences, staircases and custom engineering solutions.",
    url: "https://brinmetall.vercel.app",
    telephone: "+972-55-972-2255",
    email: "info@brinmetal.co.il",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Netanya",
      addressRegion: "Center District",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.3215,
      longitude: 34.8532,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    image: "https://brinmetall.vercel.app/opengraph-image",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.3215,
        longitude: 34.8532,
      },
      geoRadius: "50000",
    },
  };
}

