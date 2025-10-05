"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { InteractiveMapProps, Point } from "@/types";
import { useLeafletMap } from "@/hooks/useLeafletMap";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { useMapPolyline } from "@/hooks/useMapPolyline";

export default function InteractiveMap({
  points,
  onPointsChange,
}: InteractiveMapProps) {
  const pointsRef = useRef<Point[]>([]);

  const handleMapClick = (point: Point) => {
    const newPoints = [...pointsRef.current, point];
    onPointsChange(newPoints);
  };

  const handleDeletePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i !== index);
    onPointsChange(newPoints);
  };

  const { mapRef, mapContainerRef, initializeMap, destroyMap, restoreView } =
    useLeafletMap({
      onMapClick: handleMapClick,
      readOnly: false,
    });

  const { addMarkers } = useMapMarkers({
    onDeletePoint: handleDeletePoint,
    interactive: true,
  });

  const { updatePolyline } = useMapPolyline();

  useEffect(() => {
    initializeMap();
    return () => destroyMap();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    addMarkers(mapRef.current, points);
    updatePolyline(mapRef.current, points);
    restoreView();
    pointsRef.current = points;
  }, [points, addMarkers, updatePolyline, restoreView]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
    />
  );
}
