/**
 * Decodifica uma string polyline encoded em um array de coordenadas [lat, lng]
 * Algoritmo compatível com o formato do Google Maps Polyline
 */
export function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;

    // Decodifica latitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    // Decodifica longitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

/**
 * Codifica um array de coordenadas [lat, lng] em uma string polyline
 */
export function encodePolyline(points: [number, number][]): string {
  let encoded = '';
  let prevLat = 0;
  let prevLng = 0;

  for (const [lat, lng] of points) {
    const lat5 = Math.round(lat * 1e5);
    const lng5 = Math.round(lng * 1e5);

    const dlat = lat5 - prevLat;
    const dlng = lng5 - prevLng;

    prevLat = lat5;
    prevLng = lng5;

    encoded += encodeValue(dlat);
    encoded += encodeValue(dlng);
  }

  return encoded;
}

function encodeValue(value: number): string {
  let encoded = '';
  let v = value < 0 ? ~(value << 1) : value << 1;

  while (v >= 0x20) {
    encoded += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
    v >>= 5;
  }

  encoded += String.fromCharCode(v + 63);
  return encoded;
}

/**
 * Converte coordenadas [lat, lng] para formato GeoJSON Point
 */
export function toGeoJSONPoints(points: [number, number][]) {
  return points.map(([lat, lng], index) => ({
    type: 'Feature' as const,
    properties: { index },
    geometry: {
      type: 'Point' as const,
      coordinates: [lng, lat], // GeoJSON usa [lng, lat]
    },
  }));
}

/**
 * Converte coordenadas para GeoJSON LineString
 */
export function toGeoJSONLineString(points: [number, number][]) {
  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: points.map(([lat, lng]) => [lng, lat]), // GeoJSON usa [lng, lat]
    },
  };
}
