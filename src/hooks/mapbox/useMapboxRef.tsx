import { RefObject, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { mapboxToken } from 'constant';

mapboxgl.accessToken = mapboxToken;

/**
 * 返却されたRefObjectをMapboxのフックにしたい要素のref属性に設定する
 */
export const useMapboxRef = (): RefObject<HTMLDivElement> => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      if (map) {
        setMap(map);
        thisMap.resize();
        thisMap.setLayoutProperty('country-label', 'text-field', [
          'get',
          'name_ja',
        ]);
      }
    });
  }, [map, mapContainer]);

  return mapContainer;
};
