# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This is a Firebase-hosted static website for Oberon Logistics, a Landstar BCO specializing in Capacity Operations. The project consists of:

- **Frontend**: Static HTML/CSS/JS in `public/` folder (Bootstrap 5)
- **Backend**: Firebase Cloud Functions in `functions/` folder
- **Hosting**: Firebase Hosting with automatic deployments via GitHub Actions

## Architecture

### Frontend (`public/`)
- `index.html` - Main landing page with lead capture form
- `jobs.html` - Careers page with job inquiry form
- `carriers/index.html` - Carrier FAQ page
- `css/style.css` - Custom styles
- `js/contactform.js` - Form submission handler with duplicate submission prevention

### Backend (`functions/`)
- `index.js` - Contains `processFormLead` HTTPS function that:
  - Validates reCAPTCHA tokens (score threshold: 0.2)
  - Writes leads to Google Sheets (Leads tab)
  - Requires Firebase config secrets: `service_account`, `sheets.id`, `recaptcha.key`

## Common Commands

```bash
# Install dependencies
cd functions && npm install

# Run Firebase emulators (functions only)
cd functions && npm run serve

# Deploy only Cloud Functions
cd functions && npm run deploy

# Deploy hosting
firebase deploy --only hosting

# View function logs
cd functions && npm run logs
```

## Key Implementation Details

- Form uses reCAPTCHA v3 with site key `6LcAKMgbAAAAAI1v-qN1hMhcgiv--3ka-sU5vsaZ`
- Backend URL is hardcoded in contactform.js: `https://us-central1-oberonlogistics-2a5d9.cloudfunctions.net/api/leads`
- Lead form has client-side duplicate submission guard (`contactFormSubmitted` flag)
- Google Sheets appends to range `Leads!A2:F`
- Node.js version: 14 (configured in functions/package.json)

## User Preferences

- When creating commits, use Co-Authored-By with the current model name (e.g., "Co-Authored-By: Claude with grok-code-fast-1" or "Co-Authored-By: Claude with minimax-m2.5")
