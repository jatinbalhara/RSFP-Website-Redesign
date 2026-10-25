# RSFP Organic Himachal: website

The new website for RSFP Organic Himachal (RS Food Products, Sanet). Built with Next.js, following the brand book and catalog in `../Brand Book and Catalog`.

## Run it on your computer

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. A yellow strip at the top lists anything that's still a placeholder (it only shows in dev, never on the live site).

To check the production build: `npm run build` then `npm start`.

## Change business details (phone, address, FSSAI, sizes…)

Everything lives in **`site.config.ts`**. Lines marked `⚠ PLACEHOLDER` are not confirmed yet. When you confirm one, change the value and delete its line from the `unconfirmed` list at the bottom of the file.

## Change products or prices

Edit **`data/products.json`** (same format as the catalog's products.json). `"sale_inr": null` shows "Price on WhatsApp". Product photos are in `public/images/products/<slug>-600.webp` (cards) and `-1200.webp` (product page).

## How ordering works right now

1. People add jars to a basket (kept only in their own browser).
2. On the basket page they fill in name, phone, address and PIN.
3. "Send order on WhatsApp" opens WhatsApp with the whole order typed out, to the number in `site.config.ts`.

Every product also has a direct "Order this on WhatsApp" button, and there's a floating WhatsApp button on every page. The contact form also just writes a WhatsApp message. No personal data is stored by the website.

## Pages

| Page | File |
| --- | --- |
| Home (hero, seasonal shelf, categories, story, favourites, how to order) | `app/page.tsx` |
| Shop with category filter | `app/shop/page.tsx` |
| Product page | `app/shop/[slug]/page.tsx` |
| Our story | `app/our-story/page.tsx` |
| Contact + FAQ | `app/contact/page.tsx` |
| Basket + WhatsApp checkout | `app/basket/page.tsx`, `components/BasketView.tsx` |

Colours and fonts are at the top of `app/globals.css`. The seasonal shelf on the home page follows the month list in `site.config.ts` → `seasons`.

## Supabase (later)

Not connected yet. `supabase/schema.sql` is a draft of the `products` and `orders` tables with Row Level Security. When the Supabase project exists, copy `.env.example` to `.env.local`, fill it in, and change the two functions at the bottom of `lib/products.ts` to read from Supabase. Pages won't need to change.

## Security notes (full pass planned later)

- Basic security headers are set in `next.config.ts`.
- No secrets in the code. Never commit `.env.local` or put the Supabase service role key in a `NEXT_PUBLIC_` variable.
- Form input is length-limited and only ever URL-encoded into a WhatsApp link.
- Still to do: Content-Security-Policy, server-side order validation and rate limiting once orders go into Supabase.
