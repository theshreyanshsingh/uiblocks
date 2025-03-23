"use client";

import React from "react";
import Header from "./_components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden mx-2">
      <Header />
      <div className="flex-grow min-h-0">{children}</div>
    </div>
  );
};

export default Layout;
