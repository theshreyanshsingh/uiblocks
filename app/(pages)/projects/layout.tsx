import Sidebar from "../../_components/Sidebar";
import React from "react";
import Chat from "./[project]/_components/_sub-components/Chat";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex justify-between bg-[#0A0A0D]">
      {/* Sidebar */}
      <Sidebar />
      {/* Preview/Code/split */}
      {/* File */}
      {/* Variants */}
      {/* Drag & drop */}
      {children}
      {/* Chat */}
      <Chat />
    </div>
  );
};

export default Layout;
