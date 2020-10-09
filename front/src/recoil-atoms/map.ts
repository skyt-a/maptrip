import { atom } from 'recoil';

export const MapViewMode = {
  Init: "INIT",
  PutMarker: "PUT_MARKER",
  EnterMarkerInfo: "ENTER_MARKER_INFO"
} as const;

type MapViewModeValue = typeof MapViewMode[keyof typeof MapViewMode];

export const mapViewModeState = atom<MapViewModeValue>({
  key: 'mapViewModeState',
  default: MapViewMode.Init,
});

export const mapboxRefState = atom<{ ref: () => (mapboxgl.Map | null)}>({
  key: 'mapboxRefState',
  default: { ref: () => null },
});

export const markerRefState = atom<{ ref: () => (mapboxgl.Marker | null)}>({
  key: 'markerRefState',
  default: { ref: () => null },
});