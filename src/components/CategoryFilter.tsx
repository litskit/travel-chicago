import type { PlaceCategory } from "../types/place";
import { categoryMeta } from "../data/categoryMeta";

interface CategoryFilterProps {
  active: Set<PlaceCategory>;
  onToggle: (category: PlaceCategory) => void;
}

export function CategoryFilter({ active, onToggle }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      {(Object.keys(categoryMeta) as PlaceCategory[]).map((category) => {
        const meta = categoryMeta[category];
        const isActive = active.has(category);
        return (
          <button
            key={category}
            className={`category-chip${isActive ? " category-chip--active" : ""}`}
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
