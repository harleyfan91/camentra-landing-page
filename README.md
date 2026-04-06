<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Brand alignment

Camentra is a **Brand Alchemy LLC** product. This landing page follows the parent marketing brand: typography (Inter + Source Serif 4, display weight rules), Tailwind **gray-*** neutrals, shared design tokens, modal scrim, and the β△ mark pattern.

- **Canonical reference:** [Brand source of truth](https://github.com/YOUR_ORG/YOUR_UMBRELLA_REPO/blob/main/docs/BRAND_SOURCE_OF_TRUTH.md). Substitute your org and umbrella repo name, or open that file in your local clone of the parent marketing repository.
- **Tokens:** [`public/brand-tokens.css`](public/brand-tokens.css) is copied from the umbrella repo’s `public/brand-tokens.css`; re-sync when tokens change (see the comment at the top of that file). Detailed typography, grays, buttons, and UI rules live in the umbrella’s `docs/BRAND_GUIDELINES.md`.

**Intentional exceptions:** Product-specific assets and copy (e.g. app icon, hero device mockup and video, Camentra messaging) are owned by this product; they are not required to match parent imagery, as long as they stay within the shared type and neutral palette rules above.

View your app in AI Studio: https://ai.studio/apps/drive/1yOusxmlMO8Q5NOEaEGRsBm5c2Un8mABn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. **Launch waitlist (optional):** To collect emails in the hero without opening the user’s mail app, add `VITE_WAITLIST_FORM_ACTION` to `.env.local` with a JSON-capable form endpoint (for example a [Formspree](https://formspree.io) form URL). The app sends `POST` JSON `{ "email": "…" }`. If unset, submit opens a prefilled `mailto:` to `support@camentra.com`.
4. Run the app:
   `npm run dev`
