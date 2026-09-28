# Kemmer Solutions website

Static site, no build step. Works on Vercel, Netlify or GitHub Pages as-is.

## Deploy to Vercel
1. Create a new GitHub repo and upload everything in this folder (the files, not the zip).
2. On vercel.com: Add New > Project > import the repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.

## Things to edit
- **assets/config.js** – email, phone, WhatsApp, Telegram, address, hours. Every page reads from here.
- **Product photos** – put images in `assets/img/` and register them in `KEMMER_PHOTOS` in `assets/config.js`. Brands without a photo keep their animated illustrated bottle.
- **Brands and descriptions** – `assets/data.js`. Remove a brand there and it disappears from the catalogue.
- **Jermuk formats** – the three format cards in `jermuk.html`.

## Contact form
The form opens the visitor's email app (or WhatsApp) with the enquiry filled in, so it works with no backend. If you later want messages sent straight to your inbox, sign up at formspree.io and point the form at your Formspree endpoint.

## Pages
index.html, jermuk.html, beer.html, about.html, contact.html, 404.html
