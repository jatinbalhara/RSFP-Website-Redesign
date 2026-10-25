/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one place to change business details.
 * ─────────────────────────────────────────────────────────────
 *
 *  Anything marked  ⚠ PLACEHOLDER  has NOT been confirmed yet.
 *  When you confirm a value:
 *    1. change it here,
 *    2. remove its key from `unconfirmed` at the bottom.
 *
 *  While `unconfirmed` still has entries, `npm run dev` shows a
 *  yellow strip at the top of every page listing them. It never
 *  shows on the live (production) site.
 */

export const site = {
  brand: "RSFP Organic Himachal",
  company: "RS Food Products",
  founder: "Neelam Verma",
  founderShort: "Neelam ji",
  tagline: "घर का स्वाद, पहाड़ों से",
  taglineEn: "The taste of home, from the hills.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rsfporganichaimachal.com",

  contact: {
    // ⚠ PLACEHOLDER: number taken from the old posters, not confirmed.
    // Digits only, with country code, no + or spaces. Used for WhatsApp links.
    whatsapp: "919805222182",
    // ⚠ PLACEHOLDER: how the number is shown to people.
    phoneDisplay: "+91 98052 22182",
    // ⚠ PLACEHOLDER: used for tel: links.
    phoneTel: "+919805222182",
    // ⚠ PLACEHOLDER: no real email known yet. Leave "" to hide it.
    email: "",
    // ⚠ PLACEHOLDER: from the Orange Squash poster. Other posters disagree.
    address: {
      line1: "RS Food Products",
      line2: "Village Sanet, P.O. Mamligh",
      district: "District Solan",
      state: "Himachal Pradesh",
      pin: "", // ⚠ PLACEHOLDER: PIN code unknown
    },
    // ⚠ PLACEHOLDER: when Neelam ji usually answers.
    hours: "Mon–Sat, 9 am – 7 pm",
    // ⚠ PLACEHOLDER: Google Maps link. Leave "" to hide the map button.
    mapsUrl: "",
  },

  // ⚠ PLACEHOLDER: website badge says 10018022008334, jar labels show a different number.
  fssai: "10018022008334",

  // Leave a link "" to hide that icon.
  social: {
    instagram: "", // ⚠ PLACEHOLDER
    facebook: "", // ⚠ PLACEHOLDER
    youtube: "", // ⚠ PLACEHOLDER
  },

  // ⚠ PLACEHOLDER: jar / bottle sizes by category. A size set on a single
  // product in data/products.json (anything other than "TBC") wins over these.
  sizeByCategory: {
    Pickles: "Jar size to be confirmed",
    "Squash & Sharbat": "Bottle size to be confirmed",
    "Sweet Things": "Pack size to be confirmed",
  } as Record<string, string>,

  ordering: {
    // ⚠ PLACEHOLDER: delivery and payment wording shown on the basket page.
    deliveryNote:
      "We pack every order by hand and send it across India. Neelam ji will message you with the delivery charge and payment details (UPI or bank transfer) before sending.",
    // ⚠ PLACEHOLDER
    dispatchTime: "Usually packed within 2–3 days",
  },

  /**
   * Seasonal shelf on the home page. Months are 1–12.
   * Taken from the brand book; change freely.
   */
  seasons: [
    { slug: "buransh-sharbat", months: [3, 4, 5], note: "Buransh flowers are picked off the trees in spring." },
    { slug: "lasoda-pickle", months: [5, 6], note: "Lasoda lasts only a few weeks of early summer." },
    { slug: "lingad-pickle", months: [7, 8, 9], note: "Lingad is foraged in the monsoon." },
    { slug: "galgal-pickle", months: [11, 12, 1, 2, 3], note: "Galgal is sun-dried every winter." },
    { slug: "mango-pickle", months: [5, 6, 7], note: "Made with the summer's raw mangoes." },
    { slug: "amla-pickle", months: [10, 11, 12, 1], note: "Jangli amla ripens in late autumn." },
  ],
} as const;

/** Keys of things that still need confirming. Remove a line once it's confirmed. */
export const unconfirmed: string[] = [
  "Phone / WhatsApp number",
  "Address and PIN code",
  "FSSAI licence number",
  "Jar and bottle sizes",
  "Prices for Karela, Mango, Green Chilli, Kathal, Buransh, Jam and Petha",
  "Email, opening hours, social links",
  "Delivery and payment wording",
];
