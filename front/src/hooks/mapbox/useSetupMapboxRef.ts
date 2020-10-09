import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { mapboxToken } from 'constant';
import { mapboxRefState } from '../../recoil-atoms/map';

mapboxgl.accessToken = mapboxToken;

/**
 * 返却されたRefObjectをMapboxのフックにしたい要素のref属性に設定する
 */
export const useSetUpMapboxRef = (): [
  mapboxgl.Map | null,
  RefObject<HTMLDivElement>,
  () => void,
] => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const setMapboxRef = useSetRecoilState(mapboxRefState);
  const mapContainer = useRef<HTMLDivElement>(null);

  const getMapRef = useCallback(() => {
    return map;
  }, [map]);

  const setUpMap = useCallback(() => {
    if (map || !mapContainer.current) {
      return;
    }
    const thisMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ringoku/ckfc9dq5v3oyj19p3t8qp97n9', // stylesheet location
      center: [139.767125, 35.681236],
      zoom: 15,
    });
    thisMap.addControl(new mapboxgl.GeolocateControl());
    const control = new MapboxGeocoder({
      accessToken: mapboxToken,
      mapboxgl,
      marker: false,
      placeholder: '市区町村名や観光名所名を入力してください',
    }).setLanguage('ja');
    thisMap.addControl(control);

    thisMap.on('load', () => {
      if (thisMap) {
        setMap(thisMap);
        thisMap.resize();
        thisMap.setLayoutProperty('country-label', 'text-field', [
          'get',
          'name_ja',
        ]);
      }
    });
  }, [map, setMap, mapContainer]);

  useEffect(() => {
    setMapboxRef({ ref: getMapRef });
  }, [getMapRef, setMapboxRef]);

  return [map, mapContainer, setUpMap];
};
