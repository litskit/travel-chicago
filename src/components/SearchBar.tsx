interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Search bookmarked places..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
