export type PlaceCategory =
  | "landmark"
  | "museum"
  | "food"
  | "park"
  | "shopping"
  | "architecture"
  | "entertainment";

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  description: string;
  address?: string;
  tags?: string[];
  websiteUrl?: string;
}
