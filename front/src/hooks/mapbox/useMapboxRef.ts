import { useRecoilValue } from 'recoil';
import { mapboxRefState } from 'recoil-atoms/map';

export const useMapboxRef = () => {
  const refWrapper = useRecoilValue(mapboxRefState);
  if (!refWrapper) {
    return null;
  }
  const ref = refWrapper.ref();

  return ref;
};
