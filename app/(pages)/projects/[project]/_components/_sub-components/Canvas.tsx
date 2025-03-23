'use client';

import React, { useEffect, useState } from 'react';
import { SandpackPreview, useSandpackClient } from '@codesandbox/sandpack-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
// import InteractiveWrapper from './InteractiveWrapper';

const Canvas = () => {
  const { responsive } = useSelector((state: RootState) => state.projectOptions);
  const { listen } = useSandpackClient();
  const [iframeStyle, setIframeStyle] = useState({ width: '100%', height: '100%' });

  useEffect(() => {
    const updateIframeStyle = (width: number | null, height: number | null) => {
      setIframeStyle({
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      });
    };
    console.log(iframeStyle);
    const unsubscribe = listen((message) => {
      if (message.type === 'resize') {
        const { height } = message;
        updateIframeStyle(null, height);
      }
    });

    if (responsive === 'mobile') {
      updateIframeStyle(375, 667); // mobile
    } else {
      updateIframeStyle(null, null); // desktop
    }

    return () => {
      unsubscribe();
    };
  }, [responsive, iframeStyle]);

  return (
    <div className="bg-gray-100 w-full h-full overflow-auto scrollbar-hide flex flex-col justify-center items-center">
      <div className="rounded-none shadow-lg overflow-hidden h-full w-full scrollbar-hide">
        <SandpackPreview
          className="h-[97%] w-full border-none bg-transparent rounded-none scrollbar-hide "
          showNavigator={false}
          showOpenInCodeSandbox={false}
          showRestartButton={false}
          showRefreshButton={false}
        />
      </div>
    </div>
  );
};

export default Canvas;
