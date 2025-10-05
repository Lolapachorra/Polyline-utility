import { useRef, useCallback } from 'react';
import L from 'leaflet';
import { Point } from '@/types';
import { MARKER_CONFIG } from '@/constants';

interface UseMapMarkersOptions {
  onDeletePoint?: (index: number) => void;
  interactive?: boolean;
}

export function useMapMarkers({ onDeletePoint, interactive = false }: UseMapMarkersOptions = {}) {
  const markersRef = useRef<L.Marker[]>([]);

  const createIcon = useCallback((number: number) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div>${number}</div>`,
      iconSize: [MARKER_CONFIG.ICON_SIZE, MARKER_CONFIG.ICON_SIZE],
      iconAnchor: [MARKER_CONFIG.ICON_ANCHOR, MARKER_CONFIG.ICON_ANCHOR],
    });
  }, []);

  const createPopupContent = useCallback(
    (point: Point, index: number) => {
      const container = document.createElement('div');
      container.style.fontFamily = 'monospace';
      container.style.fontSize = '12px';
      container.innerHTML = `
        <div>
          <strong>Ponto ${index + 1}</strong><br/>
          Lat: ${point[0].toFixed(6)}<br/>
          Lng: ${point[1].toFixed(6)}
        </div>
      `;

      if (interactive && onDeletePoint) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.style.cssText = `
          margin-top: 8px;
          padding: 4px 8px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          width: 100%;
        `;
        deleteButton.onmouseover = () => {
          deleteButton.style.backgroundColor = '#dc2626';
        };
        deleteButton.onmouseout = () => {
          deleteButton.style.backgroundColor = '#ef4444';
        };
        deleteButton.onclick = () => onDeletePoint(index);

        container.appendChild(deleteButton);
      }

      return container;
    },
    [interactive, onDeletePoint]
  );

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, []);

  const addMarkers = useCallback(
    (map: L.Map, points: Point[]) => {
      clearMarkers();

      points.forEach((point, index) => {
        const marker = L.marker(point, { icon: createIcon(index + 1) }).addTo(map);
        marker.bindPopup(createPopupContent(point, index));
        markersRef.current.push(marker);
      });
    },
    [clearMarkers, createIcon, createPopupContent]
  );

  return {
    markersRef,
    clearMarkers,
    addMarkers,
  };
}
