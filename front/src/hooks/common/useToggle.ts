import { useCallback, useState } from 'react';

export const useToggle = (init = false): readonly [boolean, () => void] => {
  const [toggle, setToggle] = useState(init);
  const changeToggle = useCallback(() => {
    setToggle((t) => !t);
  }, [setToggle]);

  return [toggle, changeToggle] as const;
};
