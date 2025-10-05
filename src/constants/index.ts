// Map configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: [0, 0] as [number, number],
  DEFAULT_ZOOM: 2,
  MAX_ZOOM: 19,
  TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_LAYER_ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
} as const;

// Marker configuration
export const MARKER_CONFIG = {
  ICON_SIZE: 24,
  ICON_ANCHOR: 12,
} as const;

// Polyline configuration
export const POLYLINE_CONFIG = {
  COLOR: '#3b82f6',
  WEIGHT: 3,
  OPACITY: 0.7,
} as const;

// UI Messages
export const UI_MESSAGES = {
  MAP_LOADING: 'Carregando mapa...',
  MAP_INSTRUCTIONS: 'Clique no mapa para adicionar pontos. Os pontos serão conectados automaticamente formando uma linha.',
  DECODE_ERROR: 'Erro ao decodificar a string. Verifique se é uma polyline válida.',
  ENCODE_ERROR: 'Erro ao processar o array. Use formato: [[lat, lng], ...] ou [{lat, lng}, ...]',
} as const;

// Placeholder texts
export const PLACEHOLDERS = {
  POLYLINE_STRING: 'Ex: _p~iF~ps|U_ulLnnqC_mqNvxq`@',
  ARRAY_INPUT: 'Ex: [[38.5,-120.2],[40.7,-120.95]] ou [{"lat":38.5,"lng":-120.2}]',
} as const;