# Dominic Santiago Guevarra Portfolio

A React + Vite portfolio website with a medieval/adventure-inspired design system and handcrafted CSS.

## Features

- Single-page responsive portfolio
- Medieval / parchment visual theme
- Light and moonlit theme toggle
- Accessible semantic HTML and keyboard focus states
- SEO-ready metadata in `index.html`
- Animated section reveals with reduced-motion support
- Resume-based content structure
- Easy-to-edit data file for projects, skills, and timeline content

## Tech Stack

- React
- Vite
- Plain CSS (no Tailwind)

## Project Structure

```text
medieval-portfolio/
├── public/
│   ├── favicon.svg
│   └── og-preview.svg
├── src/
│   ├── components/
│   │   └── Section.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Content Customization

Edit `src/data/portfolioData.js` to update:

- Hero copy
- About text
- Skills
- Project cards
- Timeline entries
- Certifications
- Social links

## Contact Form Note

The current contact form uses a `mailto:` action for a zero-backend starting point. For production use, replace it with one of these:

- Formspree
- Netlify Forms
- EmailJS
- A custom Node/Express or serverless API endpoint

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify

1. Push the project to GitHub.
2. Import the repo into Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

For GitHub Pages, add a `base` path in `vite.config.js` if deploying to a project repository:

```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
});
```

Then deploy the `dist` folder with a GitHub Pages workflow or `gh-pages` package.

## Accessibility Notes

- Semantic sections and landmarks
- Skip link for keyboard users
- High-contrast interactive states
- Focus-visible styles
- Reduced motion support

## Suggested Next Improvements

- Replace placeholder project links with real URLs
- Add screenshots for each project card
- Add a downloadable PDF resume button
- Connect the contact form to a form backend
- Add analytics and structured data JSON-LD
