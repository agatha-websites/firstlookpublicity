# First Look Publicity – Sample Site

Static marketing site inspired by the First Look Publicity homepage, rebuilt with **vanilla HTML, CSS, and JavaScript** and refined with a more modern, responsive UI.

This project is designed so you can easily swap in your own assets (especially images) and deploy as a simple static site.

## Structure

- `index.html` – main single-page layout with sections:
  - Hero
  - Who We Work With
  - What We Do
  - Why First Look Publicity
  - Process
  - Call-To-Action
  - Contact
- `styles.css` – styling, including:
  - Dark, editorial-inspired visual style
  - Responsive grid layout
  - Sticky, mobile-friendly navigation
  - Section and card styling, contact form styling
- `script.js` – small enhancements:
  - Mobile nav toggle
  - Smooth scrolling to sections
  - Reveal-on-scroll animations
  - Year auto-update and demo contact form handling
- `package.json` – minimal metadata and a simple `start` script.

## Running locally

From the `firstlook-publicity` directory:

```bash
npm install  # installs 'serve' the first time it's needed when you run 'npm run start'
npm run start
```

Then open the printed URL (usually `http://localhost:3000` or similar) in your browser.

You can also open `index.html` directly in a browser without any tooling; the `package.json` is only for convenience.

## Customizing images

All images are currently **placeholders**:

- Hero image: `https://via.placeholder.com/640x420.png?text=Press+Coverage+Placeholder`

Replace the `src` values in `index.html` with your own uploads or CDN URLs. The layout will automatically adapt as long as you keep roughly similar aspect ratios.

## Notes

- The contact form is **non-functional** and intentionally blocked from submitting to a backend. Replace it with your own form handler, form provider, or API endpoint when you're ready.
- The content and layout are meant as a learning/demo replica and can be further adapted to match your brand.


