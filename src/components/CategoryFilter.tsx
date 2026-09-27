import type { PlaceCategory } from "../types/place";
import { categoryMeta } from "../data/categoryMeta";

interface CategoryFilterProps {
  active: Set<PlaceCategory>;
  onToggle: (category: PlaceCategory) => void;
  recommendedOnly: boolean;
  onToggleRecommended: () => void;
}

export function CategoryFilter({
  active,
  onToggle,
  recommendedOnly,
  onToggleRecommended,
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`category-chip category-chip--recommended${recommendedOnly ? " category-chip--active" : ""}`}
        aria-pressed={recommendedOnly}
        onClick={onToggleRecommended}
      >
        <span aria-hidden="true">★</span> Recommended
      </button>
      {(Object.keys(categoryMeta) as PlaceCategory[]).map((category) => {
        const meta = categoryMeta[category];
        const isActive = active.has(category);
        return (
          <button
            key={category}
            className={`category-chip${isActive ? " category-chip--active" : ""}`}
            aria-pressed={isActive}
            style={{ borderColor: meta.color, color: isActive ? "#fff" : meta.color, background: isActive ? meta.color : "transparent" }}
            onClick={() => onToggle(category)}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
