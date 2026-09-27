import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Place } from "../types/place";
import { categoryMeta } from "../data/categoryMeta";
import { MapStyleSelector } from "./MapStyleSelector";
import { getGoogleMapsSearchUrl } from "../utils/googleMaps";

const CHICAGO_CENTER: [number, number] = [41.8781, -87.6298];
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

function makeIcon(color: string, isSelected: boolean) {
  return L.divIcon({
    className: "place-marker",
    html: `<span style="background:${color}" class="place-marker__dot${isSelected ? " place-marker__dot--selected" : ""}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

type MarkerRefs = { current: Record<string, L.Marker | undefined> };

function FocusSelectedPlace({
  place,
  focusRequest,
  markerRefs,
}: {
  place: Place | undefined;
  focusRequest: number;
  markerRefs: MarkerRefs;
}) {
  const map = useMap();
  useEffect(() => {
    if (!place) return;

    const marker = markerRefs.current[place.id];
    if (!marker) return;

    const target = L.latLng(place.lat, place.lng);
    const openPopup = () => marker.openPopup();
    if (map.getCenter().equals(target) && map.getZoom() === 15) {
      openPopup();
      return;
    }

    map.once("moveend", openPopup);
    map.flyTo(target, 15, { duration: 0.75 });
    return () => {
      map.off("moveend", openPopup);
    };
  }, [place, focusRequest, markerRefs, map]);
  return null;
}

interface MapProps {
  places: Place[];
  selectedPlace: Place | undefined;
  onSelect: (id: string) => void;
  onViewDetails: (id: string) => void;
  focusRequest: number;
  styleId: string;
  onStyleChange: (styleId: string) => void;
}

export function Map({
  places,
  selectedPlace,
  onSelect,
  onViewDetails,
  focusRequest,
  styleId,
  onStyleChange,
}: MapProps) {
  const markerRefs = useRef<Record<string, L.Marker | undefined>>({});

  return (
    <div className="map-wrapper">
      <div className="map-style-control">
        <MapStyleSelector value={styleId} onChange={onStyleChange} />
      </div>
      <MapContainer
        center={CHICAGO_CENTER}
        zoom={12}
        className="map-container"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            MAPTILER_KEY
              ? `https://api.maptiler.com/maps/${styleId}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          tileSize={MAPTILER_KEY ? 512 : 256}
          zoomOffset={MAPTILER_KEY ? -1 : 0}
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            ref={(marker) => {
              if (marker) markerRefs.current[place.id] = marker;
              else delete markerRefs.current[place.id];
            }}
            position={[place.lat, place.lng]}
            icon={makeIcon(categoryMeta[place.category].color, place.id === selectedPlace?.id)}
            eventHandlers={{ click: () => onSelect(place.id) }}
          >
            <Popup>
              <div className="map-place-popup">
                <strong className="map-place-popup__name">
                  {place.name}{place.recommended && <span className="map-place-popup__recommended" title="Developer recommended" aria-label="Developer recommended"> ★</span>}
                </strong>
                <p className="map-place-popup__description">{place.description}</p>
                {place.address && (
                  <p className="map-place-popup__address">{place.address}</p>
                )}
                <div className="map-place-popup__actions">
                  <a
                    href={getGoogleMapsSearchUrl(place)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Maps ↗
                  </a>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClickCapture={() => onViewDetails(place.id)}
                  >
                    View details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <FocusSelectedPlace
          place={selectedPlace}
          focusRequest={focusRequest}
          markerRefs={markerRefs}
        />
      </MapContainer>
    </div>
  );
}

