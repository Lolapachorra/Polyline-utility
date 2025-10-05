import { useState } from "react";
import { encodePolyline } from "@/utils/polyline";
import { Point } from "@/types";
import { UI_MESSAGES } from "@/constants";

export function usePolylineEncoder() {
  const [arrayInput, setArrayInput] = useState("");
  const [arrayPoints, setArrayPoints] = useState<Point[]>([]);
  const [encodedPolyline, setEncodedPolyline] = useState("");
  const [arrayError, setArrayError] = useState("");

  const handleEncodeArray = () => {
    try {
      setArrayError("");
      const parsed = JSON.parse(arrayInput);

      let points: Point[] = [];

      if (Array.isArray(parsed)) {
        if (
          parsed.length > 0 &&
          Array.isArray(parsed[0]) &&
          parsed[0].length === 2
        ) {
          points = parsed as Point[];
        } else if (parsed.length > 0 && typeof parsed[0] === "object") {
          points = parsed.map((p) => {
            if ("lat" in p && "lng" in p) return [p.lat, p.lng];
            if ("latitude" in p && "longitude" in p)
              return [p.latitude, p.longitude];
            if ("coordinates" in p && Array.isArray(p.coordinates)) {
              return [p.coordinates[1], p.coordinates[0]];
            }
            throw new Error("Formato não reconhecido");
          });
        }
      }

      if (points.length === 0) {
        throw new Error("Nenhum ponto válido encontrado");
      }

      setArrayPoints(points);
      const encoded = encodePolyline(points);
      setEncodedPolyline(encoded);
    } catch {
      setArrayError(UI_MESSAGES.ENCODE_ERROR);
      setArrayPoints([]);
      setEncodedPolyline("");
    }
  };

  const handleClearArray = () => {
    setArrayInput("");
    setArrayPoints([]);
    setEncodedPolyline("");
    setArrayError("");
  };

  const handleSwapArrayLatLng = () => {
    const swapped = arrayPoints.map(([lat, lng]) => [lng, lat] as Point);
    setArrayPoints(swapped);
    const encoded = encodePolyline(swapped);
    setEncodedPolyline(encoded);
  };

  return {
    arrayInput,
    setArrayInput,
    arrayPoints,
    encodedPolyline,
    arrayError,
    handleEncodeArray,
    handleClearArray,
    handleSwapArrayLatLng,
  };
}
