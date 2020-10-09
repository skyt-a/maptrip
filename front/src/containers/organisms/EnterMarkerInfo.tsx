import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  MapViewMode,
  mapViewModeState,
  markerRefState,
} from 'recoil-atoms/map';
import styled from 'styled-components';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import marked from 'marked';
import highlight from 'highlightjs';
import 'highlightjs/styles/docco.css';
import { Button, TextField } from '@material-ui/core';
import { useToggle } from 'hooks/common/useToggle';
import { useMutation } from 'react-query';
import { localEndPoint } from 'constant';
import request from 'graphql-request';
import { createPost } from 'gen/graphql-client-query';

// delete file name
marked.setOptions({
  highlight: (code, lang) =>
    highlight.highlightAuto(code, [lang.split(':')[0]]).value,
});

const EnterMarkerInfo = () => {
  const [title, setTitle] = useState('');
  const [mapViewMode, setMapViewMode] = useRecoilState(mapViewModeState);
  const [markdown, setMarkdown] = useState('');
  const [isPreview, setIsPreview] = useToggle(false);
  const markerRef = useRecoilValue(markerRefState);
  const [longitude, latitude] = useMemo(() => {
    const { lng, lat } = markerRef?.ref()?.getLngLat() ?? {};

    return [lng, lat];
  }, [markerRef]);
  const [mutate] = useMutation(async () => {
    const post = await request(localEndPoint, createPost, {
      title,
      content: markdown,
      authorId: 1,
      longitude,
      latitude,
    });
    console.log(post);

    return post;
  });
  const onClickConfirm = useCallback(async () => {
    await mutate();
  }, [mutate]);

  if (mapViewMode !== MapViewMode.EnterMarkerInfo) {
    return null;
  }

  return (
    <Wrapper>
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトルを入力してください"
      />
      <MarkdownWrapper>
        {!isPreview ? (
          <StyledSimpleMDE value={markdown} onChange={(e) => setMarkdown(e)} />
        ) : (
          <Preview dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
        )}
        <Button onClick={setIsPreview}>
          {isPreview ? 'プレビューを閉じる' : 'プレビューを表示する'}
        </Button>
      </MarkdownWrapper>
      <Button onClick={onClickConfirm}>確定</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40vw;
  background-color: #fff;
  z-index: 10;
  text-align: left;
  padding: 8px 16px;
`;

const MarkdownWrapper = styled.div`
  padding-top: 16px;
`;

const StyledSimpleMDE = styled(SimpleMDE)`
  text-align: left;
`;

const Preview = styled.div`
  text-align: left;
`;

export default EnterMarkerInfo;
