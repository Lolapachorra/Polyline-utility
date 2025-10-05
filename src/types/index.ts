// Types for coordinates and points
export type Coordinates = [number, number];
export type Point = Coordinates;

// Tab types
export type Tab = 'string' | 'array' | 'map';

// Map view state
export interface MapViewState {
  center: Coordinates;
  zoom: number;
}

// GeoJSON types
export interface GeoJSONPoint {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    index: number;
  };
}

export interface GeoJSONLineString {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties: Record<string, never>;
}

// Component props
export interface InteractiveMapProps {
  points: Point[];
  onPointsChange: (points: Point[]) => void;
}

export interface MapViewProps {
  points: Point[];
}