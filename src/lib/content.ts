export const site = {
  name: "Melbourne CBD Real Estate",
  tagline: "Commercial Property Specialists",
  phone: "(03) 8676 0400",
  phoneHref: "tel:+61386760400",
  email: "admin@melbournecbdrealestate.com.au",
  address: "Ground Floor, 365 Little Collins Street, Melbourne VIC 3000",
  trustLine:
    "Trusted specialists in commercial sales, leasing and property management across Melbourne's CBD and surrounding areas.",
};

/** Cinematic sequence — dusk CBD → interiors → settle on skyline */
export const heroImages = [
  {
    id: "0",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    alt: "City skyline at dusk",
  },
  {
    id: "20",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Glass towers against sky",
  },
  {
    id: "60",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    alt: "Commercial office interior",
  },
  {
    id: "80",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
    alt: "Urban street with towers",
  },
  {
    id: "100",
    src: "/hero/office-interior.jpg",
    alt: "Executive commercial office interior",
  },
];

export const preloaderLines = [
  "Winning is a habit.",
  "Timing shapes value.",
  "Clarity closes deals.",
  "Local insight wins.",
  "Execution over noise.",
  "Mandates, not listings.",
  "CBD specialists.",
  "Results compound.",
];

export const finalLines = [
  "Buy with confidence.",
  "Lease with strategy.",
  "Sell with precision.",
  "Manage with care.",
  "Appraise with clarity.",
  "Advise with integrity.",
  "Act with urgency.",
  "Stay CBD-focused.",
];

export const testimonials = [
  {
    name: "Khaled Wahab",
    initial: "K",
    color: "#8B5E3C",
    quote:
      "Amazing to work with. Lachlan is very helpful. Helped me find an office just the way I wanted it. From start to finish he was professional and friendly.",
  },
  {
    name: "iWISE Education",
    initial: "i",
    color: "#1E5A8A",
    title: "Exceptional Service and Professionalism",
    quote:
      "I had a fantastic experience with Lachlan at Melbourne CBD Real Estate. The team is highly professional.",
  },
  {
    name: "Nathalie Marguerite",
    initial: "N",
    color: "#C45C7A",
    quote:
      "I’ve been a long-term tenant at 365 Little Collins and the support from Lachlan and the whole team has always been incredible. As a solo entrepreneur, it really feels like I have a team on my side.",
  },
  {
    name: "Phillip Anderson",
    initial: "P",
    color: "#4A5568",
    quote:
      "Lachlan is a great agent to deal with — approachable, attentive, and easy to contact. He understands our business needs well. As a long-term tenant at 365 Little Collins St, I’ve had nothing but a positive experience.",
  },
  {
    name: "Hardeep Ghattor",
    initial: "H",
    color: "#D4537E",
    quote:
      "Melbourne CBD Real Estate were really easy to deal with. Big thanks to Lachlan — he helped me find the right office without any stress. Super helpful, quick to respond, and actually listened to what I needed.",
  },
  {
    name: "Krishan Pietersz",
    initial: "K",
    color: "#6B4C9A",
    quote:
      "We’ve just moved into 365 Building and had a great experience working with Lachlan. Smooth process from start to finish.",
  },
];

export const navItems = [
  {
    label: "Buy",
    href: "#properties",
    items: [] as { label: string; href: string; benefit: string }[],
  },
  {
    label: "Lease",
    href: "#lease",
    items: [
      {
        label: "Lease With Us",
        href: "#services-lease",
        benefit: "Protect asset performance",
      },
      {
        label: "Properties for Lease",
        href: "#properties",
        benefit: "Find ready-to-occupy space",
      },
      {
        label: "Book an Appraisal",
        href: "#appraisal",
        benefit: "Know your rental value",
      },
    ],
  },
  {
    label: "Sell",
    href: "#sell",
    items: [
      {
        label: "Sell With Us",
        href: "#services-sell",
        benefit: "Commission-ready mandate",
      },
      {
        label: "Request Appraisal",
        href: "#appraisal",
        benefit: "Get a clear price band",
      },
    ],
  },
  {
    label: "More",
    href: "#more",
    items: [
      {
        label: "Our People",
        href: "#team",
        benefit: "Meet local specialists",
      },
      {
        label: "Contact Us",
        href: "#contact",
        benefit: "Speak with the team",
      },
      {
        label: "About Us",
        href: "#about",
        benefit: "15 years in the CBD",
      },
      {
        label: "Latest News",
        href: "#news",
        benefit: "Market notes & updates",
      },
    ],
  },
];

export const properties = [
  {
    title: "Little Collins St",
    suburb: "Melbourne CBD",
    type: "For sale",
    address: "4.03/365 Little Collins Street Melbourne",
    area: "47.38m²",
    priceHint: "From $485,000",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    variant: "overlay" as const,
  },
  {
    title: "Queen Street",
    suburb: "Melbourne CBD",
    type: "For lease",
    address: "Level 8/180 Queen Street Melbourne",
    area: "112.00m²",
    priceHint: "Guide $1.1m–$1.2m",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    variant: "overlay" as const,
  },
  {
    title: "Collins Street",
    suburb: "Melbourne CBD",
    type: "For sale",
    address: "Suite 12/55 Collins Street Melbourne",
    area: "68.50m²",
    priceHint: "From $720,000",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    variant: "overlay" as const,
  },
  {
    title: "Bourke Street",
    suburb: "Melbourne CBD",
    type: "For lease",
    address: "Level 3/250 Bourke Street Melbourne",
    area: "94.20m²",
    priceHint: "From $850/m²",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80",
    variant: "overlay" as const,
  },
];

export const teamMembers = [
  {
    name: "Lachlan Vella",
    role: "Sales & Leasing",
    phone: "(03) 8676 0400",
    email: "admin@melbournecbdrealestate.com.au",
    bio: "Commercial sales and leasing specialist focused on Melbourne CBD mandates — timing, buyers, and clean execution.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Loren Adami",
    role: "Administrator / Property Management",
    phone: "(03) 8676 0400",
    email: "admin@melbournecbdrealestate.com.au",
    bio: "Keeps ownership and tenancy running smoothly — coordination, care, and day-to-day property management.",
    image: "/team/loren-adami.png",
  },
  {
    name: "Daniel Telfer",
    role: "Sales & Leasing",
    phone: "(03) 8676 0400",
    email: "admin@melbournecbdrealestate.com.au",
    bio: "Negotiates commercial outcomes across sales and leasing with a CBD-first market view.",
    image: "/team/daniel-telfer.png",
  },
  {
    name: "John Collings",
    role: "Trust Accountant",
    phone: "(03) 8676 0400",
    email: "admin@melbournecbdrealestate.com.au",
    bio: "Trust accounting with precision — compliance, clarity, and confidence for every transaction.",
    image: "/team/john-collings.png",
  },
];
