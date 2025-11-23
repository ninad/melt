# Melt

A modern, offline-friendly breathwork experience. Melt ships as a progressive web app (PWA) and is preconfigured to wrap with Capacitor so you can deliver the same experience to iOS, Android, and desktop.

## Getting started

1. Serve the site locally:
   ```bash
   npx http-server . -p 4173 -c-1
   ```
   Then open http://localhost:4173.
2. Add Melt to your home screen to test the offline PWA experience.

## Customizing breath patterns
- Choose "Custom" from the pattern dropdown to set inhale/hold/exhale durations.
- The visualization and countdown update instantly as you adjust values.

## Shipping to mobile with Capacitor
1. Install dependencies (requires Node 18+):
   ```bash
   npm install
   ```
2. Initialize Capacitor platforms (run inside this directory):
   ```bash
   npx cap add ios
   npx cap add android
   ```
3. Build & sync the web assets into the native shells:
   ```bash
   npx cap sync
   ```
4. Open the native projects to run on devices or emulators:
   ```bash
   npx cap open ios
   npx cap open android
   ```

The Capacitor config points to the existing static files, so you can iterate on the web UI and ship the same build to mobile stores.
