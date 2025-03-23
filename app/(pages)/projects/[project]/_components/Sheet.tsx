// app/_sub-components/Sheet.tsx
'use client';

import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WebEditor from './_sub-components/WebEditor';
import Canvas from './_sub-components/Canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { SandpackLayout, SandpackProvider } from '@codesandbox/sandpack-react';
import SubHeader from './SubHeader';
// import EditableCanvas from './_sub-components/EditableCanvas';
import { DefaultReactFiles, Deps, DevDeps } from '@/app/config/AiConfig';

const Sheet: NextPage = () => {
  const { mode } = useSelector((state: RootState) => state.projectOptions);
  // const [splitWidth, setSplitWidth] = useState(50);
  // const isResizing = useRef(false);
  const { files } = useSelector((state: RootState) => state.projectFiles);
  // const handleMouseMove = (e: MouseEvent) => {
  //   if (!isResizing.current) return;
  //   const newWidth = (e.clientX / window.innerWidth) * 100;
  //   if (newWidth > 20 && newWidth < 80) setSplitWidth(newWidth);
  // };

  // const handleMouseUp = () => {
  //   console.log(splitWidth);

  //   isResizing.current = false;
  //   document.body.style.userSelect = ''; // ✅ Restore selection
  //   document.removeEventListener('mousemove', handleMouseMove);
  //   document.removeEventListener('mouseup', handleMouseUp);
  // };

  // const handleMouseDown = () => {
  //   isResizing.current = true;
  //   document.body.style.userSelect = 'none';
  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  // };

  const [fil, setFil] = useState<unknown>();

  useEffect(() => {
    if (files) {
      setFil({ ...DefaultReactFiles, ...files });
    }
  }, [files]);

  return (
    <div className="flex flex-col flex-grow h-[calc(100vh-50px)] bg-[#141415] overflow-hidden">
      <AnimatePresence mode="wait">
        <SandpackProvider
          autoFocus
          options={{
            initMode: 'immediate',
            autoReload: true,
            autorun: true,
            externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'],
          }}
          suppressHydrationWarning
          suppressContentEditableWarning
          template={'react'}
          files={fil ? { ...DefaultReactFiles, ...fil } : DefaultReactFiles}
          theme="dark"
          customSetup={{ dependencies: Deps, devDependencies: DevDeps }}
        >
          <SandpackLayout className="h-[94vh] w-full">
            <div
              // key={mode}
              // exit={{ x: mode === 'edit' ? '100%' : '-100%', opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              // initial={{ x: mode === 'edit' ? '-100%' : '100%', opacity: 0 }}
              // transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col flex-grow overflow-hidden h-full"
            >
              <div className="h-full" style={{ display: mode === 'edit' ? 'block' : 'none' }}>
                {/* <EditableCanvas /> */}
                <SubHeader />
                <Canvas />
              </div>
              <div className="h-full" style={{ display: mode === 'code' ? 'block' : 'none' }}>
                <WebEditor />
              </div>

              <div className="h-full w-full flex" style={{ display: mode === 'split' ? 'flex' : 'none' }}>
                <div style={{ width: `50%`, height: '100%' }}>
                  <SubHeader />
                  <Canvas />
                </div>
                <div style={{ width: `50%`, height: '100%' }}>
                  <WebEditor />
                </div>
              </div>
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </AnimatePresence>
    </div>
  );
};

export default Sheet;
