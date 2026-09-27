import { useEffect, useRef } from "react";
import { categoryMeta } from "../data/categoryMeta";
import type { Place } from "../types/place";
import { getGoogleMapsDirectionsUrl, getGoogleMapsSearchUrl } from "../utils/googleMaps";

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

export function PlaceDetails({ place, onClose }: PlaceDetailsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const category = categoryMeta[place.category];
  const googleMapsUrl = getGoogleMapsSearchUrl(place);
  const directionsUrl = getGoogleMapsDirectionsUrl(place);
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${place.name} ${place.address ?? "Chicago"}`
  )}`;

  useEffect(() => {
    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="place-details-backdrop" onClick={onClose}>
      <section
        className="place-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="place-details__close"
          onClick={onClose}
          aria-label="Close place details"
        >
          ×
        </button>
        <span className="place-details__category" style={{ color: category.color }}>
          {category.label}
        </span>
        <h2 id="place-details-title">
          {place.name}{place.recommended && <span className="place-details__recommended" title="Developer recommended" aria-label="Developer recommended"> ★</span>}
        </h2>
        <p className="place-details__description">{place.description}</p>
        {place.address && (
          <div className="place-details__address">
            <span className="place-details__label">Address</span>
            <address>{place.address}</address>
          </div>
        )}
        {place.tags && place.tags.length > 0 && (
          <ul className="place-details__tags" aria-label="Place highlights">
            {place.tags.map((tag) => (
              <li key={tag}>{tag.replaceAll("-", " ")}</li>
            ))}
          </ul>
        )}
        <div className="place-details__links">
          <a href={directionsUrl} target="_blank" rel="noreferrer" className="place-details__primary-link">
            Get directions <span aria-hidden="true">↗</span>
          </a>
          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps <span aria-hidden="true">↗</span>
          </a>
          {place.websiteUrl && (
            <a href={place.websiteUrl} target="_blank" rel="noreferrer">
              Official website <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href={googleSearchUrl} target="_blank" rel="noreferrer">
            Search for more info <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}