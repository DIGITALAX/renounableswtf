import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGarmentsInfoById } from '@selectors/token.uri.info.selectors';

export const useTokenInfo = (tokenUri, deps) => {
  const storeInfo = useSelector(getGarmentsInfoById(tokenUri));
  const [info, setInfo] = useState(storeInfo);
  const dispatch = useDispatch();


  useEffect(() => {
    let isMounted = true;

    if (!tokenUri || String(tokenUri).search(/^http/) === -1) {
      return () => {};
    }

    fetch(tokenUri)
      .then((response) => response.text())
      .then((infoResponse) => {
        try {
          const jsonInfo = JSON.parse(infoResponse);

          if (!jsonInfo || !jsonInfo.image || !jsonInfo.name) {
            throw new Error('Invalid json info');
          }

          if (isMounted) {
            setInfo(jsonInfo);
          }
        } catch (e) {
          console.error('[INFO] Invalid tokenUri', tokenUri);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return info;
};
