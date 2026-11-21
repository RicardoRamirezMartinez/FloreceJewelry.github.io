# Florece Fine Jewelry — Home | Our Story | Gold | Silver

This version preserves the original homepage colors, fonts, layout, hero, brand values and contact section. The Collections and Featured sections are removed. The original Our Story section has been moved to `our-story.html` (same text, photo and styling). The top navigation links to four separate pages, with a shopping bag icon on the right.

## Publish on GitHub Pages
Upload `index.html`, `our-story.html`, `gold.html`, `silver.html`, `bag.html`, `site.css`, `store.css`, `store.js` to the repository root. Keep `our-story.jpg` and any existing image folders. Do not upload your Stripe secret key.

## Product editing and payments
Edit `PRODUCTS` in `store.js` for names, prices and photos. The bag supports multiple items. Checkout requires your own Stripe account and a configured Cloudflare Worker. `cloudflare-worker.js` is a deployment reference, NOT a GitHub Pages file. Set the real Stripe Price IDs and Worker endpoint and configure the correct project URL. Use test mode first. Shipping, tax and verified order fulfillment must be configured before accepting real payments.
