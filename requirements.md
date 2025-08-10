**Build a single-page React site that runs beautifully on iPhone 12 (390×844 CSS px) and deploys on GitHub Pages.**
Use **React + Vite** (no external UI libraries, no font/CDN). Keep it lightweight, accessible, and animated only with transforms/opacity.

## Project & tooling

* Stack: **React + Vite** (JavaScript), CSS Modules or scoped CSS.
* Vite config: `base: './'` so all asset URLs are **relative** (works under subpaths on GitHub Pages).
* No runtime deps beyond React/ReactDOM. No router needed (single route).
* Output must be a static site in `/dist` (suitable for GitHub Pages).
* Include these files at repo root:

  * `index.html` (Vite template),
  * `vite.config.js` (with `base:'./'`),
  * `src/` (all code),
  * `README.md` (“Deploying on GitHub Pages” steps),
  * `404.html` that redirects to `index.html` (safety for Pages).
* Provide either:

  * **npm script**: `"deploy": "vite build && gh-pages -d dist"` (include `gh-pages` devDep), **or**
  * **GitHub Actions** workflow `.github/workflows/pages.yml` that builds and deploys `/dist` to Pages.

## Meta & layout constraints (iPhone 12 first)

* In `index.html`:

  * `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
  * `<meta name="robots" content="noindex">`
* Respect safe areas with `padding-top/bottom: env(safe-area-inset-*)`.
* Use `min-height: 100dvh` with `100vh` fallback to handle Safari UI bars.
* Minimum tap target size **44×44px**.
* System font stack only (SF Pro on iOS), no external fonts.

## Visual theme (Dreamy Night — our default)

* Background: deep navy → indigo gradient.
* Accent: warm rose `#FF5A8A`.
* Stars/lines: cool white with soft glow; active elements use the accent.
* Cards: blurred-glass bottom sheets; 90% width; high contrast; large corners (16–20px).

## Content (exact copy we finalized)

Use this JSON (embed in code) and map A1/A2/A3/A4 to each A in order:

```json
{
  "letters": ["A","P","A","R","A","N","J","I","T","H","A"],
  "quotes": {
    "A1": "As stars scatter, my thoughts settle on you.",
    "P": "Promise me more ordinary days made magic.",
    "A2": "Always, your laugh redraws my sky.",
    "R": "Right here, I find my north.",
    "A3": "All my quiet hours learn your name.",
    "N": "Near or far, your light finds me.",
    "J": "Just one look, and night brightens.",
    "I": "In small moments, we become huge.",
    "T": "Tonight is ours; tomorrow can wait.",
    "H": "Hand in hand, through every season.",
    "A4": "Always and again—happy birthday, Aparanjitha."
  },
  "finaleNote": "Under this little sky we made, I wish you a year of easy laughter, brave dreams, and every good thing finding you. Happy birthday, Aparanjitha."
}
```

## Experience flow (must match)

1. **Arrival**

   * Calm starfield. Centered helper text: **“Tap a star to begin.”**
   * First **A** letter’s first star has a faint pulse.

2. **Guided path (per star)**

   * Tapping the **correct next star** draws a glowing line from the previous star (400–600ms) and opens a **starlight card** (bottom sheet) with that letter’s quote.
   * Card auto-dismisses after \~4s or on swipe-down/tap outside.
   * Tapping a **wrong star** twinkles it briefly and shows helper text **“Almost—try the glowing star.”** The correct next star pulses for \~800ms.

3. **Progress ribbon**

   * Tiny ribbon at top: `A • P • A • R • A • N • J • I • T • H • A` with the **active letter** glowing.
   * When a letter completes, give that glyph a steady highlight in the ribbon.

4. **Midpoint spark**

   * After finishing **N**, trigger one **shooting star** (800–1200ms, subtle).

5. **Finale**

   * Completing the last **A** reveals the full **A P A R A N J I T H A** constellation glowing together.
   * Show a finale card with `finaleNote` and two buttons:

     * **Replay the stars** (restart guided sequence)
     * **Save as wallpaper** (render/export; details below)
   * After finale, enable **Free roam**: tapping any completed letter’s stars replays its quote.

## Starfield & letter paths (performance-friendly)

* Background stars: **150–200** points, two sizes, \~30% twinkle via opacity sine wave (use `requestAnimationFrame`).
* One performant layer (Canvas or WebGL optional; Canvas is fine).
* Letter paths: **6–10 stars per letter** forming simple, readable glyphs sized to **70–80%** of viewport width, vertically centered, respecting safe-area padding.
* Current letter’s stars are brighter; the **next** target star has a soft periodic pulse.
* Lines: 2–3px with outer glow using the accent color.

## Components (clean separation)

* `<StarfieldCanvas />` — draws background stars + twinkle + shooting star.
* `<LetterPath />` — computes & renders star coordinates + handles “which star is next”.
* `<QuoteCard />` — accessible bottom sheet that shows the letter’s quote; 1–2 text lines; 16–18px.
* `<ProgressRibbon />` — renders the `A • P • …` glyphs with active/complete states.
* `<Finale />` — shows name constellation + finale note + buttons (Replay / Save as wallpaper).
* `<HelperText />` — aria-live region for inline hints (“Tap a star to begin.” / “Almost—…”).

## Accessibility & reduced motion (required)

* Real `<button>`s for interactive stars; labels like **“Letter P, star 2 of 7.”**
* Focus styles visible; keyboard operable on desktop.
* `prefers-reduced-motion: reduce`:

  * Disable twinkle and parallax; replace line-draw with instant connect + fade.
  * Provide a visible **Next** button to progress through stars/letters without animation.
* High contrast; body text 16–18px.

## Microcopy (use verbatim)

* Onboarding: **“Tap a star to begin.”**
* Wrong tap: **“Almost—try the glowing star.”**
* Finale buttons: **“Replay the stars”**, **“Save as wallpaper”**.

## State & persistence

* Use React state + `useReducer` or Context; no external state libs.
* Track: current letter index, current star index, completion flags.
* Persist progress in `localStorage` (resume on refresh).
* After finale completion, store a flag to unlock **Free roam**.

## Wallpaper export (implement carefully)

* On **Save as wallpaper**, render an **offscreen canvas 1170×2532** (iPhone 12 native).
* Draw the same gradient background + the full name constellation (stars + connecting lines) centered.
* Footer caption (tiny): **“Made for Aparanjitha • {current year}”**.
* Export as PNG; on iOS Safari, show preview image in a modal with instructions: “Long-press → Add to Photos” if download isn’t automatic.

## Performance & quality bars

* Total shipped assets (HTML/CSS/JS) **< 3 MB**.
* Animations only on `opacity`/`transform`; throttle with `requestAnimationFrame`.
* Lighthouse mobile targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
* Avoid layout thrash; precompute letter star coordinates once.

## Testing checklist (must pass)

* No horizontal scroll at **390×844**; safe-area paddings respected (notch/home bar).
* Tap targets ≥ 44×44px.
* Wrong-tap feedback + helper text works.
* Reduced-motion mode works (fade-only + Next button).
* Progress ribbon accurately reflects active/completed letters.
* Finale shows constellation, note, and working **Replay**/**Save as wallpaper**.
* Free roam replays quotes for completed letters.
* Works when served under a subpath (because Vite `base:'./'`).
* `404.html` exists and redirects to index (defensive for Pages).

## README.md (include)

Add a “Deploying on GitHub Pages” section with:

1. **Push** code to `main`.
2. Enable **Settings → Pages → Source: GitHub Actions** (or set Pages to deploy from `/docs` if you prefer copying `/dist` → `/docs`).
3. If using the provided Actions workflow, push to `main` and wait for publish; visit `https://<user>.github.io/<repo>/`.
4. If using `gh-pages` script: run `npm run deploy` to push `/dist` to the `gh-pages` branch and enable Pages from that branch.