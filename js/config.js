/* =====================================================================
   SITE CONFIG — edit this file to update the website.
   Everything in [BRACKETS] is a placeholder you should replace.
   No coding needed: change the text between the quotes and save.
   ===================================================================== */

window.SITE = {
  /* ---------- Business details ---------- */
  business: {
    name: "UB Detailing",                 // [BUSINESS NAME]
    tagline: "Premium Auto Detailing",
    city: "Dallas",                       // e.g. "Houston"
    state: "TX",
    address: "Dallas, TX",
    phone: "(555) 123-4567",              // shown on the site
    phoneRaw: "+15551234567",             // used for click-to-call (digits only, with +1)
    whatsapp: "15551234567",             // WhatsApp number, digits only incl. country code
    email: "hello@ubdetailing.com",
    yearFounded: "2024",
    mobileService: true,                  // true = you also come to the customer
    // Google Maps search text used for the embedded map:
    mapQuery: "Dallas, TX",
  },

  /* ---------- Social & review links ---------- */
  links: {
    googleBusiness: "https://g.page/r/[YOUR-GOOGLE-PROFILE-ID]",
    googleReview: "https://g.page/r/[YOUR-GOOGLE-PROFILE-ID]/review",
    instagram: "https://instagram.com/ubdetailing-70",
    facebook: "https://facebook.com/[yourpage]",
    tiktok: "https://tiktok.com/@[yourhandle]",
  },

  /* ---------- Forms ----------
     To receive booking & contact requests by email, create a free form at
     https://formspree.io (or similar) and paste the endpoint URL below.
     Until then, submissions open a pre-filled WhatsApp message instead. */
  forms: {
    endpoint: "",                         // e.g. "https://formspree.io/f/abcdwxyz"
  },

  /* ---------- Promotion banner (top of page) ---------- */
  promo: {
    enabled: true,
    text: "Fall Special: 15% off any Ultimate package booked this month.",  // [PROMO TEXT]
    cta: "Claim offer",
    href: "#booking",
  },

  /* ---------- Hours (24h format "HH:MM", or null = closed) ---------- */
  hours: [
    { day: "Monday",    open: "08:00", close: "18:00" },
    { day: "Tuesday",   open: "08:00", close: "18:00" },
    { day: "Wednesday", open: "08:00", close: "18:00" },
    { day: "Thursday",  open: "08:00", close: "18:00" },
    { day: "Friday",    open: "08:00", close: "18:00" },
    { day: "Saturday",  open: "09:00", close: "16:00" },
    { day: "Sunday",    open: null,    close: null },
  ],

  /* ---------- Cities you serve (great for local SEO) ---------- */
  serviceAreas: [
    "Dallas", "Plano", "Frisco", "McKinney",
    "Allen", "Garland", "Irving", "Arlington",
  ],

  /* ---------- Appointment time slots offered in the booking form ---------- */
  timeSlots: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],

  /* ---------- Services ----------
     Set available:false to hide a service you don't offer yet.
     icon options: interior, exterior, full, deep, paint, ceramic, engine, headlight */
  services: [
    {
      id: "interior", icon: "interior", available: true,
      name: "Interior Detailing",
      price: "From $[XXX]",
      duration: "2–3 hrs",
      desc: "Vacuum, steam, and hand-wipe every surface. Leather cleaned and conditioned, glass streak-free, cabin smelling new.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=70&auto=format&fit=crop",
    },
    {
      id: "exterior", icon: "exterior", available: true,
      name: "Exterior Detailing",
      price: "From $[XXX]",
      duration: "2–3 hrs",
      desc: "Foam pre-wash, two-bucket hand wash, decontamination, wheels and tires, finished with a slick protective sealant.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=900&q=70&auto=format&fit=crop",
    },
    {
      id: "full", icon: "full", available: true,
      name: "Full Car Detailing",
      price: "From $[XXX]",
      duration: "4–5 hrs",
      desc: "Complete inside-and-out restoration. The most popular way to get your car looking showroom-ready again.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=900&q=70&auto=format&fit=crop",
    },
    {
      id: "deep-interior", icon: "deep", available: true,
      name: "Deep Interior Cleaning",
      price: "From $[XXX]",
      duration: "3–5 hrs",
      desc: "Hot-water extraction for carpets and seats, stain and odor treatment, pet hair removal. Ideal for family vehicles.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&q=70&auto=format&fit=crop",
    },
    {
      id: "engine", icon: "engine", available: true,
      name: "Engine Bay Cleaning",
      price: "From $[XXX]",
      duration: "1 hr",
      desc: "Safe degreasing and dressing of the engine bay. Cleaner looks and easier to spot leaks early.",
      image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=900&q=70&auto=format&fit=crop",
    },
  ],

  /* ---------- Packages ----------
     prices: { sedan, suv } — shown with the Sedan / SUV & Truck toggle.
     features: list of every row in the comparison table.
     includes: which rows each package includes (true / false / "text"). */
  packages: {
    features: [
      "Foam pre-wash & hand wash",
      "Wheels, tires & wheel wells",
      "Interior vacuum & wipe-down",
      "Windows inside & out",
      "Spray sealant (3 months)",
      "Leather clean & condition",
      "Carpet & seat shampoo",
      "Clay bar decontamination",
      "Engine bay cleaning",
    ],
    tiers: [
      {
        id: "basic", name: "Basic", popular: false,
        blurb: "A thorough maintenance detail to keep a well-kept car looking sharp.",
        prices: { sedan: "$[XXX]", suv: "$[XXX]" },
        duration: "~2 hrs",
        includes: [true, true, true, true, true, false, false, false, false],
      },
      {
        id: "premium", name: "Premium", popular: true,
        blurb: "Our best seller. A deep clean inside and out with added paint protection.",
        prices: { sedan: "$[XXX]", suv: "$[XXX]" },
        duration: "~4 hrs",
        includes: [true, true, true, true, true, true, true, true, false],
      },
      {
        id: "ultimate", name: "Ultimate", popular: false,
        blurb: "Showroom restoration with a complete inside-and-out transformation.",
        prices: { sedan: "$[XXX]", suv: "$[XXX]" },
        duration: "~1 day",
        includes: [true, true, true, true, "Upgraded", true, true, true, true],
      },
    ],
  },

  /* ---------- Before & After gallery ----------
     Replace with your own photos. Put images in the /images folder and
     use paths like "images/civic-before.jpg". Set sample:false once real. */
  gallery: [
    {
      title: "Full detail, BMW 7 Series", sample: true,
      before: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=70&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=70&auto=format&fit=crop",
    },
    {
      title: "Full detail, Ford Mustang", sample: true,
      before: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=70&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=70&auto=format&fit=crop",
    },
    {
      title: "Interior deep clean, Mercedes-AMG", sample: true,
      before: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=70&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=70&auto=format&fit=crop",
    },
  ],

  /* ---------- Reviews ----------
     IMPORTANT: replace these with real reviews from your Google Business
     Profile (copy the customer's first name + their words). Set
     sample:false on each once it's a real review. Sample reviews show a
     "Sample" label so visitors aren't misled. */
  reviews: [
    { name: “[Customer Name]”, rating: 5, when: “[Month Year]”, sample: true,
      text: “Paste a real Google review here.” },
    { name: “[Customer Name]”, rating: 5, when: “[Month Year]”, sample: true,
      text: “Paste a real Google review here.” },
    { name: “[Customer Name]”, rating: 5, when: “[Month Year]”, sample: true,
      text: “Paste a real Google review here.” },
  ],
  reviewSummary: { rating: "5.0", count: "[XX]" },   // your Google rating & review count

  /* ---------- FAQ (also helps Google search) ---------- */
  faq: [
    { q: "Do you come to me?", a: "Yes. We offer mobile detailing at your home or office across our service area, as well as appointments at our location. [Edit to match how you operate.]" },
    { q: "How long does a detail take?", a: "A Basic detail takes about 2 hours, Premium about 4 hours, and our Ultimate package typically takes a full day." },
    { q: "Do I need to do anything before my appointment?", a: "Just remove personal items from the cabin and trunk. If we're coming to you, we may need access to water and power. [Edit as needed.]" },
    { q: "What forms of payment do you accept?", a: "[Cash, all major cards, Zelle, Apple Pay — edit to match.]" },
  ],
};
