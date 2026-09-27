import "leaflet/dist/leaflet.css";
import "./App.css";
import { useState } from "react";
import { Map } from "./components/Map";
import { PlaceList } from "./components/PlaceList";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchBar } from "./components/SearchBar";
import { PlaceDetails } from "./components/PlaceDetails";
import { usePlaces } from "./hooks/usePlaces";
import { defaultMapStyle } from "./data/mapStyles";
import type { Place } from "./types/place";

function App() {
  const {
    places,
    allPlaces,
    activeCategories,
    toggleCategory,
    query,
    setQuery,
    recommendedOnly,
    setRecommendedOnly,
    selectedId,
    setSelectedId,
    selectedPlace,
  } = usePlaces();
  const [mapStyleId, setMapStyleId] = useState(defaultMapStyle);
  const [focusRequest, setFocusRequest] = useState(0);
  const [detailsPlaceId, setDetailsPlaceId] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const detailsPlace = allPlaces.find((place: Place) => place.id === detailsPlaceId);

  function selectPlace(id: string) {
    setSelectedId(id);
    setFocusRequest((request) => request + 1);
    setIsSidebarExpanded(false);
  }

  return (
    <div className="app">
      <aside className={`sidebar${isSidebarExpanded ? " sidebar--expanded" : " sidebar--collapsed"}`}>
        <button
          type="button"
          className="sidebar__mobile-toggle"
          aria-expanded={isSidebarExpanded}
          onClick={() => setIsSidebarExpanded((expanded) => !expanded)}
        >
          <span className="sidebar__mobile-grip" aria-hidden="true" />
          <span className="sidebar__mobile-label">Places</span>
          <span className="sidebar__mobile-count">{places.length}</span>
          <span className="sidebar__mobile-chevron" aria-hidden="true">
            {isSidebarExpanded ? "⌄" : "⌃"}
          </span>
        </button>
        <div className="sidebar__content">
          <h1>Chicago Travel Guide</h1>
          <p className="subtitle">Bookmarked places to explore</p>
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter
            active={activeCategories}
            onToggle={toggleCategory}
            recommendedOnly={recommendedOnly}
            onToggleRecommended={() => setRecommendedOnly((value) => !value)}
          />
          <PlaceList
            places={places}
            selectedId={selectedId}
            onSelect={selectPlace}
            onViewDetails={setDetailsPlaceId}
          />
        </div>
      </aside>
      <main className="map-pane">
        <Map
          places={places}
          selectedPlace={selectedPlace}
          onSelect={selectPlace}
          focusRequest={focusRequest}
          onViewDetails={setDetailsPlaceId}
          styleId={mapStyleId}
          onStyleChange={setMapStyleId}
        />
      </main>
      {detailsPlace && (
        <PlaceDetails place={detailsPlace} onClose={() => setDetailsPlaceId(null)} />
      )}
    </div>
  );
}

export default App;

