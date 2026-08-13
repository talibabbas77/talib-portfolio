export type GlobalMarker = {
  id: string;
  label: string;
  niche: string;
  /** [longitude, latitude] for geo libraries */
  coordinates: [number, number];
  home?: boolean;
};

/** Remote collaboration footprint - aligned with the home globe. */
export const GLOBAL_MARKERS: GlobalMarker[] = [
  {
    id: "lahore",
    label: "Lahore",
    niche: "Home base",
    coordinates: [74.3587, 31.5204],
    home: true,
  },
  {
    id: "karachi",
    label: "Karachi",
    niche: "Regional clients",
    coordinates: [67.0011, 24.8607],
  },
  {
    id: "dubai",
    label: "Dubai",
    niche: "E-commerce & Shopify",
    coordinates: [55.2708, 25.2048],
  },
  {
    id: "riyadh",
    label: "Riyadh",
    niche: "Product builds",
    coordinates: [46.6753, 24.7136],
  },
  {
    id: "london",
    label: "London",
    niche: "Web apps & APIs",
    coordinates: [-0.1278, 51.5074],
  },
  {
    id: "berlin",
    label: "Berlin",
    niche: "Startups & MVPs",
    coordinates: [13.405, 52.52],
  },
  {
    id: "amsterdam",
    label: "Amsterdam",
    niche: "SaaS teams",
    coordinates: [4.9041, 52.3676],
  },
  {
    id: "paris",
    label: "Paris",
    niche: "Product UI",
    coordinates: [2.3522, 48.8566],
  },
  {
    id: "nyc",
    label: "New York",
    niche: "SaaS & product",
    coordinates: [-74.006, 40.7128],
  },
  {
    id: "sf",
    label: "San Francisco",
    niche: "Product engineering",
    coordinates: [-122.4194, 37.7749],
  },
  {
    id: "toronto",
    label: "Toronto",
    niche: "CRM & automation",
    coordinates: [-79.3832, 43.6532],
  },
  {
    id: "chicago",
    label: "Chicago",
    niche: "Internal tools",
    coordinates: [-87.6298, 41.8781],
  },
  {
    id: "sao-paulo",
    label: "São Paulo",
    niche: "Marketplace work",
    coordinates: [-46.6333, -23.5505],
  },
  {
    id: "singapore",
    label: "Singapore",
    niche: "AI integrations",
    coordinates: [103.8198, 1.3521],
  },
  {
    id: "tokyo",
    label: "Tokyo",
    niche: "Web platforms",
    coordinates: [139.6503, 35.6762],
  },
  {
    id: "sydney",
    label: "Sydney",
    niche: "Remote product work",
    coordinates: [151.2093, -33.8688],
  },
  {
    id: "mumbai",
    label: "Mumbai",
    niche: "Client delivery",
    coordinates: [72.8777, 19.076],
  },
  {
    id: "lagos",
    label: "Lagos",
    niche: "Growth products",
    coordinates: [3.3792, 6.5244],
  },
];

export const HOME_MARKER = GLOBAL_MARKERS[0];
