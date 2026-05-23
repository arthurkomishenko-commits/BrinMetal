interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BrinMetallll",
    description:
      "Professional metal fabrication, welding, gates, fences, staircases and custom engineering solutions.",
    url: "https://brinmetal.co.il",
    telephone: "+972-00-000-0000",
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
    image: "https://brinmetal.co.il/images/og-image.jpg",
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

export function generateServiceSchema(service: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "LocalBusiness",
      name: "BrinMetallll",
      url: "https://brinmetal.co.il",
    },
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
