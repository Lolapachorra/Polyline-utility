"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Tab } from "@/types";
import { usePolylineDecoder } from "@/hooks/usePolylineDecoder";
import { usePolylineEncoder } from "@/hooks/usePolylineEncoder";
import { useInteractiveMap } from "@/hooks/useInteractiveMap";
import { useClipboard } from "@/hooks/useClipboard";
import { toGeoJSONPoints, toGeoJSONLineString } from "@/utils/polyline";
import { UI_MESSAGES, PLACEHOLDERS } from "@/constants";
import TabButton from "../molecules/TabButton";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import CodeBlock from "../atoms/CodeBlock";
import InfoBox from "../atoms/InfoBox";
import MapControls from "../molecules/MapControls";
import { useTranslations } from "next-intl";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
      <p className="text-slate-500 dark:text-slate-400">
        {UI_MESSAGES.MAP_LOADING}
      </p>
    </div>
  ),
});

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
      <p className="text-slate-500 dark:text-slate-400">
        {UI_MESSAGES.MAP_LOADING}
      </p>
    </div>
  ),
});

export default function PolylineDecoder() {
  const [activeTab, setActiveTab] = useState<Tab>("string");
  const { copyToClipboard } = useClipboard();
  const t = useTranslations();
  // String → Pontos
  const {
    encodedString,
    setEncodedString,
    decodedPoints,
    error,
    handleDecode,
    handleClear,
    handleSwapLatLng,
    handleUnescapeString,
  } = usePolylineDecoder();

  // Array → Polyline
  const {
    arrayInput,
    setArrayInput,
    arrayPoints,
    encodedPolyline,
    arrayError,
    handleEncodeArray,
    handleClearArray,
    handleSwapArrayLatLng,
  } = usePolylineEncoder();

  // Mapa Interativo
  const {
    mapPoints,
    mapEncodedPolyline,
    handleMapPointsChange,
    handleClearMapPoints,
    handleClosePolygon,
  } = useInteractiveMap();

  const geoJSONPoints = toGeoJSONPoints(decodedPoints);
  const geoJSONString = JSON.stringify(
    { type: "FeatureCollection", features: geoJSONPoints },
    null,
    2
  );

  const geoJSONLineString = toGeoJSONLineString(arrayPoints);
  const lineStringJSON = JSON.stringify(geoJSONLineString, null, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {t('app.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t('app.subtitle')}
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <TabButton
              active={activeTab === "string"}
              onClick={() => setActiveTab("string")}
            >
              {t('tabs.stringToPoints')}
            </TabButton>
            <TabButton
              active={activeTab === "array"}
              onClick={() => setActiveTab("array")}
            >
              {t('tabs.arrayToPolyline')}
            </TabButton>
            <TabButton
              active={activeTab === "map"}
              onClick={() => setActiveTab("map")}
            >
              {t('tabs.interactiveMap')}
            </TabButton>
          </div>

          <div className="p-6">
            {activeTab === "string" && (
              <div className="space-y-6">
                <TextArea
                  label={t('labels.polylineInput')}
                  value={encodedString}
                  onChange={(e) => setEncodedString(e.target.value)}
                  placeholder={PLACEHOLDERS.POLYLINE_STRING}
                  className="h-32"
                  error={error}
                />

                <div className="flex gap-3 flex-wrap">
                  <Button onClick={handleDecode} disabled={!encodedString}>
                    {t('buttons.decode')}
                  </Button>
                  <Button
                    variant="purple"
                    onClick={handleUnescapeString}
                    disabled={!encodedString}
                    title="Remove escapes de JSON (\\, \\u003d, etc.)"
                  >
                    {t('buttons.removeEscapes')}
                  </Button>
                  <Button variant="secondary" onClick={handleClear}>
                    {t('buttons.clear')}
                  </Button>
                </div>

                {decodedPoints.length > 0 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t('labels.mapVisualization')}
                      </label>
                      <MapView points={decodedPoints} />
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {decodedPoints.length} {t('labels.pointsVisualized')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <CodeBlock
                        label={`${t('labels.coordinates')} [lat, lng]:`}
                        onCopy={() =>
                          copyToClipboard(
                            JSON.stringify(decodedPoints, null, 2)
                          )
                        }
                        actions={
                          <button
                            onClick={handleSwapLatLng}
                            className="text-xs px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                            title={t('buttons.invertLatLng')}
                          >
                            ⇄ {t('buttons.invertLatLng')}
                          </button>
                        }
                      >
                        {JSON.stringify(decodedPoints, null, 2)}
                      </CodeBlock>

                      <CodeBlock
                        label="GeoJSON Points:"
                        onCopy={() => copyToClipboard(geoJSONString)}
                      >
                        {geoJSONString}
                      </CodeBlock>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "array" && (
              <div className="space-y-6">
                <TextArea
                  label={t('labels.arrayInput')}
                  value={arrayInput}
                  onChange={(e) => setArrayInput(e.target.value)}
                  placeholder={PLACEHOLDERS.ARRAY_INPUT}
                  className="h-32"
                  error={arrayError}
                />

                <div className="flex gap-3 flex-wrap">
                  <Button onClick={handleEncodeArray} disabled={!arrayInput}>
                    {t('buttons.encode')}
                  </Button>
                  <Button variant="secondary" onClick={handleClearArray}>
                    {t('buttons.clear')}
                  </Button>
                </div>

                {arrayPoints.length > 0 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t('labels.mapVisualization')}
                      </label>
                      <MapView points={arrayPoints} />
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {arrayPoints.length} {t('labels.pointsVisualized')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <CodeBlock
                        label={`${t('labels.polyline')} ${t('buttons.encode')}:`}
                        onCopy={() => copyToClipboard(encodedPolyline)}
                        actions={
                          <button
                            onClick={handleSwapArrayLatLng}
                            className="text-xs px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                            title={t('buttons.invertLatLng')}
                          >
                            ⇄ {t('buttons.invertLatLng')}
                          </button>
                        }
                      >
                        {encodedPolyline}
                      </CodeBlock>

                      <CodeBlock
                        label="GeoJSON LineString:"
                        onCopy={() => copyToClipboard(lineStringJSON)}
                      >
                        {lineStringJSON}
                      </CodeBlock>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "map" && (
              <div className="space-y-6">
                <InfoBox>
                  <strong>💡 {t('labels.howToUse')}</strong> {t('labels.mapInstructions')}
                </InfoBox>

                <div>
                  <MapControls
                    pointsCount={mapPoints.length}
                    onClose={handleClosePolygon}
                    onClear={handleClearMapPoints}
                  />
                  <InteractiveMap
                    points={mapPoints}
                    onPointsChange={handleMapPointsChange}
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {mapPoints.length} {t('labels.pointsAdded')}
                  </p>
                </div>

                {mapPoints.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock
                      label={`${t('labels.coordinates')} [lat, lng]:`}
                      height="h-64"
                      onCopy={() =>
                        copyToClipboard(JSON.stringify(mapPoints, null, 2))
                      }
                    >
                      {JSON.stringify(mapPoints, null, 2)}
                    </CodeBlock>

                    <CodeBlock
                      label={`${t('labels.polyline')} ${t('buttons.encode')}:`}
                      height="h-64"
                      onCopy={() => copyToClipboard(mapEncodedPolyline)}
                    >
                      {mapEncodedPolyline}
                    </CodeBlock>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>
            {t('footer.developedWith')}
          </p>
        </footer>
      </div>
    </div>
  );
}
