import type { Place } from "../types/place";

function getPlaceQuery(place: Place): string {
  return [place.name, place.address].filter(Boolean).join(", ");
}

export function getGoogleMapsSearchUrl(place: Place): string {
  const query = encodeURIComponent(getPlaceQuery(place));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getGoogleMapsDirectionsUrl(place: Place): string {
  const destination = encodeURIComponent(getPlaceQuery(place));
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}