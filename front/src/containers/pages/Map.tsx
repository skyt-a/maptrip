import { useMapboxRef } from 'hooks/mapbox/useMapboxRef';
import React, { FC } from 'react';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapMenu from 'presentations/organisms/MapMenu';
import { usePutMarkerOnMapbox } from 'hooks/mapbox/usePutMarkerOnMapbox';
import { useQuery, useMutation, useQueryCache } from 'react-query'
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:4000/graphql";

/**
 * マップ画面
 */
const Map: FC<unknown> = () => {
  const ref = useMapboxRef();
  const cache = useQueryCache();
  const todosQuery = useQuery('todos', async() => {
    const posts = await request(endpoint, gql`
      query getUser {
        users {
          id
          name
          email
        }
      }
    `)
    console.log(posts)
    return posts
  })

  usePutMarkerOnMapbox();

  return (
    <>
      <MapDiv ref={ref} />
      <MapMenu />
    </>
  );
};

export default Map;

const MapDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;
