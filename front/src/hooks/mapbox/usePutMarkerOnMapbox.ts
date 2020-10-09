import { useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  markerRefState,
  MapViewMode,
  mapViewModeState,
} from 'recoil-atoms/map';
import { useMapboxRef } from './useMapboxRef';

export const usePutMarkerOnMapbox = () => {
  const mapboxRef = useMapboxRef();
  const [mapViewMode, setMapViewMode] = useRecoilState(mapViewModeState);
  const setMarkerRef = useSetRecoilState(markerRefState);
  const onPutMarker = useCallback(
    (e) => {
      if (mapViewMode !== MapViewMode.PutMarker || !mapboxRef) {
        return;
      }
      const { lng, lat } = e.lngLat;
      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapboxRef);
      mapboxRef.flyTo({
        center: [lng, lat],
        duration: 400,
        zoom: 20,
        // @ts-ignore paddingプロパティが存在しないと怒られるので
        padding: {
          right: window.innerWidth * 0.4,
        },
      });
      setMarkerRef({ ref: () => marker });
      setMapViewMode(MapViewMode.EnterMarkerInfo);
    },
    [mapViewMode, mapboxRef, setMapViewMode, setMarkerRef],
  );
  useEffect(() => {
    if (!mapboxRef) {
      return;
    }
    mapboxRef.on('click', 'places', onPutMarker);
    mapboxRef.on('click', onPutMarker);

    return () => {
      if (!mapboxRef) {
        return;
      }
      mapboxRef.off('click', 'places', onPutMarker);
      mapboxRef.off('click', onPutMarker);
    };
  }, [mapboxRef, onPutMarker]);
};
