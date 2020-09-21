import { useMapboxRef } from 'hooks/mapbox/useMapboxRef';
import React, { FC } from 'react';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
/**
 * マップ画面
 */
const Map: FC<unknown> = () => {
  const ref = useMapboxRef();

  return <MapDiv ref={ref} />;
};

export default Map;

const MapDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;
