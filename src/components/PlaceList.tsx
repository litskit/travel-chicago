import type { Place } from "../types/place";
import { categoryMeta } from "../data/categoryMeta";

interface PlaceListProps {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function PlaceList({ places, selectedId, onSelect, onViewDetails }: PlaceListProps) {
  if (places.length === 0) {
    return <p className="place-list-empty">No places match your filters.</p>;
  }

  return (
    <ul className="place-list">
      {places.map((place) => {
        const meta = categoryMeta[place.category];
        const isSelected = place.id === selectedId;
        return (
          <li
            key={place.id}
            className={`place-list__item${isSelected ? " place-list__item--active" : ""}`}
          >
            <button
              type="button"
              className="place-list__select"
              onClick={() => onSelect(place.id)}
              aria-pressed={isSelected}
            >
              <span className="place-list__dot" style={{ background: meta.color }} />
              <span className="place-list__copy">
                <span className="place-list__name">
                  {place.name}
                  {place.recommended && (
                    <span className="place-list__recommended" aria-label="Developer recommended" title="Developer recommended">
                      ★
                    </span>
                  )}
                </span>
                <span className="place-list__desc">{place.description}</span>
              </span>
            </button>
            {isSelected && (
              <button
                type="button"
                className="place-list__details"
                onClick={() => onViewDetails(place.id)}
              >
                View details <span aria-hidden="true">→</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
