import { useRef } from 'react';
import L from 'leaflet';
import { MapViewState, Point } from '@/types';
import { MAP_CONFIG } from '@/constants';

interface UseLeafletMapOptions {
  onMapClick?: (point: Point) => void;
  readOnly?: boolean;
}

export function useLeafletMap({ onMapClick, readOnly = false }: UseLeafletMapOptions = {}) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const viewStateRef = useRef<MapViewState>({
    center: MAP_CONFIG.DEFAULT_CENTER,
    zoom: MAP_CONFIG.DEFAULT_ZOOM,
  });

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      MAP_CONFIG.DEFAULT_CENTER,
      MAP_CONFIG.DEFAULT_ZOOM
    );

    L.tileLayer(MAP_CONFIG.TILE_LAYER_URL, {
      attribution: MAP_CONFIG.TILE_LAYER_ATTRIBUTION,
      maxZoom: MAP_CONFIG.MAX_ZOOM,
    }).addTo(map);

    if (!readOnly && onMapClick) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        const point: Point = [e.latlng.lat, e.latlng.lng];
        const center = map.getCenter();
        viewStateRef.current = {
          center: [center.lat, center.lng],
          zoom: map.getZoom(),
        };
        onMapClick(point);
      });
    }

    map.on('moveend', () => {
      const center = map.getCenter();
      viewStateRef.current = {
        center: [center.lat, center.lng],
        zoom: map.getZoom(),
      };
    });

    mapRef.current = map;
  };

  const destroyMap = () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const restoreView = () => {
    if (mapRef.current) {
      mapRef.current.setView(viewStateRef.current.center, viewStateRef.current.zoom);
    }
  };

  const fitBounds = (points: Point[]) => {
    if (mapRef.current && points.length > 0) {
      const bounds = L.latLngBounds(points);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  return {
    mapRef,
    mapContainerRef,
    viewStateRef,
    initializeMap,
    destroyMap,
    restoreView,
    fitBounds,
  };
}
