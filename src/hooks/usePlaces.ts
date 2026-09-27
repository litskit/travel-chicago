import { useMemo, useState } from "react";
import { places } from "../data/places";
import type { Place, PlaceCategory } from "../types/place";

export function usePlaces() {
  const [activeCategories, setActiveCategories] = useState<Set<PlaceCategory>>(
    new Set()
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recommendedOnly, setRecommendedOnly] = useState(false);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        activeCategories.size === 0 || activeCategories.has(place.category);
      const matchesRecommendation = !recommendedOnly || place.recommended === true;
      const matchesQuery =
        query.trim() === "" ||
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesRecommendation && matchesQuery;
    });
  }, [activeCategories, query, recommendedOnly]);

  const selectedPlace: Place | undefined = places.find((p) => p.id === selectedId);

  function toggleCategory(category: PlaceCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  return {
    places: filteredPlaces,
    allPlaces: places,
    activeCategories,
    toggleCategory,
    query,
    setQuery,
    recommendedOnly,
    setRecommendedOnly,
    selectedId,
    setSelectedId,
    selectedPlace,
  };
}
