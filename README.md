# Chicago Travel Guide

A searchable, interactive map of places to visit in Chicago. Browse attractions by category, search by name or tag, and select a place from the sidebar or map to focus its marker and open a placard. Each placard links to Google Maps, and the details view includes the address, description, highlights, and any available external links.

## Features

- Interactive Leaflet map with color-coded place markers.
- Sidebar search and category filters.
- Synchronized selection between the sidebar and map; selecting a place flies to its marker and opens its map placard.
- Place details with address, description, tags, Google Maps search/directions, and optional official website links.
- Optional MapTiler map styles, with OpenStreetMap tiles as the fallback.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 8 requirement).
- npm.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

### Map tiles

The app works without an API key and uses OpenStreetMap tiles by default. To enable the selectable MapTiler styles, copy `.env.example` to `.env` and replace the placeholder with your MapTiler key:

```env
VITE_MAPTILER_KEY=your_maptiler_key_here
```

Restart the development server after changing environment variables. Do not commit a private API key.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint. |

## Updating places

Edit `src/data/places.ts` to add or update locations. Each place uses the `Place` type in `src/types/place.ts` and includes an `id`, `name`, `category`, `lat`, `lng`, and `description`. The address, tags, and official website URL are optional. Coordinates position the marker in this app; Google Maps links search by the place name and address.

Available categories are defined in `src/types/place.ts`, with display labels and marker colors in `src/data/categoryMeta.ts`.

## Tech stack

React, TypeScript, Vite, Leaflet, and React Leaflet.
