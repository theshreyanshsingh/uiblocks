'use client';

import { NextPage } from 'next';
import React from 'react';
import { SandpackCodeEditor, SandpackFileExplorer } from '@codesandbox/sandpack-react';

const WebEditor: NextPage = () => {
  return (
    <div className="flex-grow w-full h-full overflow-hidden flex flex-col">
      <SandpackCodeEditor
        // closableTabs
        initMode="user-visible"
        showRunButton={false}
        showInlineErrors
        showLineNumbers
        showTabs
        className="h-full"
      />
      <SandpackFileExplorer />
    </div>
  );
};

export default WebEditor;
