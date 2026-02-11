export interface Pandal {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image: string; // URL to image
  distance?: string; // Calculated later (e.g., "1.2 km")
}