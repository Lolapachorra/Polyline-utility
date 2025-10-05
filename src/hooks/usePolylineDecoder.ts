import { useState } from 'react';
import { decodePolyline } from '@/utils/polyline';
import { Point } from '@/types';
import { UI_MESSAGES } from '@/constants';

export function usePolylineDecoder() {
  const [encodedString, setEncodedString] = useState('');
  const [decodedPoints, setDecodedPoints] = useState<Point[]>([]);
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setError('');
      const points = decodePolyline(encodedString);
      setDecodedPoints(points);
    } catch {
      setError(UI_MESSAGES.DECODE_ERROR);
      setDecodedPoints([]);
    }
  };

  const handleClear = () => {
    setEncodedString('');
    setDecodedPoints([]);
    setError('');
  };

  const handleSwapLatLng = () => {
    const swapped = decodedPoints.map(([lat, lng]) => [lng, lat] as Point);
    setDecodedPoints(swapped);
  };

  const handleUnescapeString = () => {
    try {
      const unescaped = JSON.parse(`"${encodedString}"`);
      setEncodedString(unescaped);
    } catch {
      const unescaped = encodedString.replace(/\\\\/g, '\\');
      setEncodedString(unescaped);
    }
  };

  return {
    encodedString,
    setEncodedString,
    decodedPoints,
    error,
    handleDecode,
    handleClear,
    handleSwapLatLng,
    handleUnescapeString,
  };
}
