import React, { FC, useEffect } from 'react';
import { useSetUpMapboxRef } from 'hooks/mapbox/useSetupMapboxRef';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapMenu from 'presentations/organisms/MapMenu';
import { usePutMarkerOnMapbox } from 'hooks/mapbox/usePutMarkerOnMapbox';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { request, gql } from 'graphql-request';
import EnterMarkerInfo from 'containers/organisms/EnterMarkerInfo';

const endpoint = 'http://localhost:4000/graphql';

/**
 * マップ画面
 */
const Map: FC<unknown> = () => {
  const [map, ref, setUpMap] = useSetUpMapboxRef();
  const cache = useQueryCache();
  useEffect(() => {
    setUpMap();
  }, [map, ref]);

  usePutMarkerOnMapbox();

  return (
    <>
      <MapDiv ref={ref} />
      <MapMenu />
      <EnterMarkerInfo />
    </>
  );
};

export default Map;

const MapDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;
