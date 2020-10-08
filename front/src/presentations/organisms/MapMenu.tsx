import React, { useCallback } from 'react';
import MTButton from 'presentations/atoms/Button';
import { useRecoilState } from 'recoil';
import { MapViewMode, mapViewModeState } from 'recoil-atoms/map';
import styled from 'styled-components';

const MapMenu: React.FC<unknown> = () => {
  const [viewMode, setViewMode] = useRecoilState(mapViewModeState);
  const onClickPosting = useCallback(() => {
    setViewMode(MapViewMode.PutMarker);
  }, [setViewMode]);
  if (viewMode !== MapViewMode.Init) {
    return null;
  }

  return (
    <Wrapper>
      <MTButton color="primary" variant="contained" onClick={onClickPosting}>
        ブログを投稿する
      </MTButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  z-index: 2;
`;

export default MapMenu;
