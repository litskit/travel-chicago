import type { PlaceCategory } from "../types/place";

export const categoryMeta: Record<PlaceCategory, { label: string; color: string }> = {
  landmark: { label: "Landmark", color: "#e63946" },
  museum: { label: "Museum", color: "#6a4c93" },
  food: { label: "Food & Drink", color: "#f4a261" },
  park: { label: "Park", color: "#2a9d8f" },
  shopping: { label: "Shopping", color: "#457b9d" },
  architecture: { label: "Architecture", color: "#8d6a9f" },
  entertainment: { label: "Entertainment", color: "#e76f51" },
};
