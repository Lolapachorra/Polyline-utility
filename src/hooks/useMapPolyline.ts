import { useRef, useCallback } from 'react';
import L from 'leaflet';
import { Point } from '@/types';
import { POLYLINE_CONFIG } from '@/constants';

export function useMapPolyline() {
  const polylineRef = useRef<L.Polyline | null>(null);

  const clearPolyline = useCallback(() => {
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }
  }, []);

  const updatePolyline = useCallback(
    (map: L.Map, points: Point[]) => {
      clearPolyline();

      if (points.length > 1) {
        polylineRef.current = L.polyline(points, {
          color: POLYLINE_CONFIG.COLOR,
          weight: POLYLINE_CONFIG.WEIGHT,
          opacity: POLYLINE_CONFIG.OPACITY,
        }).addTo(map);
      }
    },
    [clearPolyline]
  );

  return {
    polylineRef,
    clearPolyline,
    updatePolyline,
  };
}
