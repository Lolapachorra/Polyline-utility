"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapViewProps } from "@/types";
import { useLeafletMap } from "@/hooks/useLeafletMap";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { useMapPolyline } from "@/hooks/useMapPolyline";

export default function MapView({ points }: MapViewProps) {
  const { mapRef, mapContainerRef, initializeMap, destroyMap, fitBounds } =
    useLeafletMap({
      readOnly: true,
    });

  const { addMarkers } = useMapMarkers({
    interactive: false,
  });

  const { updatePolyline } = useMapPolyline();

  useEffect(() => {
    initializeMap();
    return () => destroyMap();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (points.length === 0) {
      map.setView([0, 0], 2);
      return;
    }

    addMarkers(map, points);
    updatePolyline(map, points);
    fitBounds(points);
  }, [points, addMarkers, updatePolyline, fitBounds]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
    />
  );
}
