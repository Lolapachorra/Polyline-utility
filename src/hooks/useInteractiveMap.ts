import { useState } from 'react';
import { encodePolyline } from '@/utils/polyline';
import { Point } from '@/types';

export function useInteractiveMap() {
  const [mapPoints, setMapPoints] = useState<Point[]>([]);
  const [mapEncodedPolyline, setMapEncodedPolyline] = useState('');

  const handleMapPointsChange = (points: Point[]) => {
    setMapPoints(points);
    if (points.length > 0) {
      const encoded = encodePolyline(points);
      setMapEncodedPolyline(encoded);
    } else {
      setMapEncodedPolyline('');
    }
  };

  const handleClearMapPoints = () => {
    setMapPoints([]);
    setMapEncodedPolyline('');
  };

  const handleClosePolygon = () => {
    if (mapPoints.length > 0) {
      const firstPoint = mapPoints[0];
      const lastPoint = mapPoints[mapPoints.length - 1];

      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        const closedPoints = [...mapPoints, firstPoint];
        setMapPoints(closedPoints);
        const encoded = encodePolyline(closedPoints);
        setMapEncodedPolyline(encoded);
      }
    }
  };

  return {
    mapPoints,
    mapEncodedPolyline,
    handleMapPointsChange,
    handleClearMapPoints,
    handleClosePolygon,
  };
}
