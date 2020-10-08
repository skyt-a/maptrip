import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  mapboxRefState,
  MapViewMode,
  mapViewModeState,
} from 'recoil-atoms/map';

export const usePutMarkerOnMapbox = () => {
  const mapboxRef = useRecoilValue(mapboxRefState);
  const markerRef = useRef<mapboxgl.Marker>();
  const mapViewMode = useRecoilValue(mapViewModeState);
  const onPutMarker = useCallback(
    (e) => {
      if (mapViewMode !== MapViewMode.PutMarker) {
        return;
      }
      console.log(e);
    },
    [mapViewMode],
  );
  useEffect(() => {
    if (!mapboxRef) {
      return;
    }
    mapboxRef.on('click', 'places', onPutMarker);
    mapboxRef.on('click', onPutMarker);
  }, [mapboxRef, onPutMarker]);
};
