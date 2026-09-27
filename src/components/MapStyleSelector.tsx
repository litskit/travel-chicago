import { mapStyles } from "../data/mapStyles";

interface MapStyleSelectorProps {
  value: string;
  onChange: (styleId: string) => void;
}

export function MapStyleSelector({ value, onChange }: MapStyleSelectorProps) {
  return (
    <select
      className="map-style-selector"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Map style"
    >
      {mapStyles.map((style) => (
        <option key={style.id} value={style.id}>
          {style.label}
        </option>
      ))}
    </select>
  );
}
