import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";
import { NextPage } from "next";
import React from "react";

const layout: NextPage = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="bg-[#F7FAFC] bg-dots bg-repeat bg-contain justify-center h-screen p-4 space-y-4">
      {/* Header */}
      <div className=" w-full">
        <Header />
      </div>
      {/* Components */}
      <div className="flex sm:flex-row flex-col pn:max-sm:space-y-5">
        <div className="w-full sm:w-[14vw] sm:h-full">
          <Sidebar />
        </div>
        {/* Content below the nav */}
        <div className="flex-grow overflow-auto sm:w-[85vw]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
