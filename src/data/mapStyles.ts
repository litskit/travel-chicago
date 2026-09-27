export interface MapStyleOption {
  id: string;
  label: string;
}

// MapTiler raster tile styles: https://api.maptiler.com/maps/{id}/{z}/{x}/{y}.png?key=...
export const mapStyles: MapStyleOption[] = [
  { id: "streets-v4", label: "Streets" },
  { id: "aquarelle-v4", label: "Aquarelle" },
  { id: "aquarelle-v4-dark", label: "Aquarelle (Dark)" },
  { id: "backdrop-v4", label: "Backdrop" },
  { id: "backdrop-v4-dark", label: "Backdrop (Dark)" },
  { id: "base-v4", label: "Base" },
  { id: "base-v4-dark", label: "Base (Dark)" },
  { id: "dataviz-v4", label: "Dataviz" },
  { id: "dataviz-v4-dark", label: "Dataviz (Dark)" },
  { id: "landscape-v4", label: "Landscape" },
  { id: "landscape-v4-dark", label: "Landscape (Dark)" },
  { id: "ocean-v4", label: "Ocean" },
  { id: "ocean-v4-dark", label: "Ocean (Dark)" },
  { id: "openstreetmap", label: "OpenStreetMap" },
  { id: "openstreetmap-dark", label: "OpenStreetMap (Dark)" },
  { id: "outdoor-v4", label: "Outdoor" },
  { id: "outdoor-v4-dark", label: "Outdoor (Dark)" },
  { id: "hybrid-v4", label: "Satellite Hybrid" },
  { id: "hybrid-v4-dark", label: "Satellite Hybrid (Dark)" },
  { id: "satellite-v4", label: "Satellite Plain" },
  { id: "satellite-v4-dark", label: "Satellite Plain (Dark)" },
  { id: "streets-v4-dark", label: "Streets (Dark)" },
  { id: "toner-v2", label: "Toner" },
  { id: "topo-v4", label: "Topo" },
  { id: "topo-v4-dark", label: "Topo (Dark)" },
  { id: "winter-v4", label: "Winter" },
  { id: "winter-v4-dark", label: "Winter (Dark)" },
];

export const defaultMapStyle = mapStyles[0].id;
