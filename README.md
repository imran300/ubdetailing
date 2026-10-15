# UB Detailing website

A fast, single-page website for a premium car detailing business. Plain HTML, CSS and JavaScript: no build step, no framework. It runs on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or regular web hosting).

## Preview it on your computer

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Updating content (no coding needed)

Almost everything lives in **`js/config.js`**. Open it, change the text between the quotes, save, and refresh.

| What | Where in `js/config.js` |
|---|---|
| Business name, phone, WhatsApp, email, address, city | `business` |
| Google Business Profile, Instagram, Facebook, TikTok | `links` |
| Promotion banner at the top of the page | `promo` (set `enabled: false` to hide it) |
| Opening hours | `hours` |
| Cities you serve | `serviceAreas` |
| Services, prices, photos (hide one with `available: false`) | `services` |
| Basic / Premium / Ultimate packages and comparison | `packages` |
| Before & after photos | `gallery` |
| Google reviews | `reviews` and `reviewSummary` |
| FAQ | `faq` |
| Booking time slots | `timeSlots` |

Anything in `[BRACKETS]` is a placeholder you still need to replace.

### Things to edit directly in `index.html`

Search for `[` to find them:

- The `<title>`, `description`, and social-sharing (`og:`) tags at the top. These are what Google shows in search results.
- The **structured data** block (`application/ld+json`) under the `<head>`. Match it to your real name, phone, address, and hours.
- The About Us story text.
- The numbers in the stats strip below the hero (e.g. "1000+ vehicles detailed").

Also replace `[yourdomain]` in `robots.txt` and `sitemap.xml`.

## Adding your own photos

1. Put photos in the `images/` folder, e.g. `images/tahoe-before.jpg` and `images/tahoe-after.jpg`.
2. In `js/config.js` → `gallery`, set `before: "images/tahoe-before.jpg"`, `after: "images/tahoe-after.jpg"`, and `sample: false`.
3. Take before and after photos from the **same angle and distance** so the slider lines up.

Tip: resize photos to about 1600px wide and compress them (e.g. squoosh.app) to keep the site fast.

The current stock photos come from Unsplash (free for commercial use). Replace them with photos of your own work as soon as you can; real photos build far more trust.

## Reviews: keep them real

The sample reviews are clearly labelled "Sample" on the site. Replace them with real reviews copied from your Google Business Profile and set `sample: false`. Never publish made-up reviews: it violates FTC rules and Google's policies.

## Receiving bookings and quote requests

Out of the box, when someone submits the booking or quote form, the site opens WhatsApp with their details pre-filled so they can send it to you.

To get submissions **by email** instead:

1. Create a free form at [formspree.io](https://formspree.io) (or a similar service).
2. Copy the form endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `forms.endpoint` in `js/config.js`.

## Local SEO checklist

- [ ] Claim and complete your **Google Business Profile**, with the same name, phone, and address as the website.
- [ ] Fill in the `<title>`, description, and structured data with your real city.
- [ ] List every city you serve in `serviceAreas`.
- [ ] Ask every happy customer for a Google review (the "Leave us a review" link goes straight there).
- [ ] Submit `sitemap.xml` in Google Search Console after the site goes live.
- [ ] Consider adding one page per city (e.g. "Car Detailing in Katy, TX") once the main site is live.
