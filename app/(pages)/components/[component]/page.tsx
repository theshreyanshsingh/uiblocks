"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MdOpenInFull } from "react-icons/md";
import { codeColorize } from "@/app/(helpers)/codeColorize";
import MainToast from "./_listOfComponents/Toast";
import components from "@/app/(helpers)/List";
import { useSession } from "next-auth/react";

const page = () => {
  const { status } = useSession();

  const path = usePathname();

  const regex = /\/components\/([^/]+)/;
  const match = path?.match(regex);
  const slug = match ? match[1] : null;

  const [select, setSelect] = useState<string>("Usage");

  const List = components.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <div className="h-full w-full sm:px-2 space-x-2 justify-evenly items-center flex sm:flex-row flex-col pn:max-sm:space-y-5">
      {List?.component ? (
        <>
          {/* Center - Preview */}
          <div className="flex flex-col h-full bg-white rounded-xl p-6 w-full sm:w-[52vw]">
            {/* Head */}
            <div className="space-y-7">
              <div className="flex  justify-start items-center w-full">
                <h2 className="text-black text-xl font-sans font-semibold">
                  {List?.name}
                </h2>
              </div>
              <p className="text-[#949494] text-sm font-sans font-medium">
                {List?.desc}
              </p>
            </div>

            {/* Component */}
            <div className="flex-grow flex justify-center items-center p-4">
              <List.component />
            </div>
          </div>

          {/* Right - Code */}
          <div className="flex flex-col justify-start items-start h-full w-full sm:w-[30vw] bg-white rounded-xl p-4 space-y-5">
            {/* Head */}
            <div className="flex justify-start items-start w-full">
              <h2 className="text-black text-xl font-sans font-semibold">
                Code
              </h2>
            </div>

            {/* Code Snippets */}
            <div className="space-y-5 w-full">
              {/* Buttons */}
              <div className="flex justify-start items-center space-x-2 ">
                {List?.codeSnippets.map((code) => (
                  <div key={code.title}>
                    <button
                      onClick={() => setSelect(code.title)}
                      className={`p-1 px-3 rounded-lg text-black text-sm font-sans font-medium transition-all duration-300 ease-in-out ${
                        select === code.title
                          ? "bg-black text-white"
                          : "bg-gray-50"
                      }`}
                    >
                      {code.title}
                    </button>
                  </div>
                ))}
              </div>

              {/* Code Display */}

              <div className="relative">
                {/* Blur */}
                {status === "loading" ||
                  (status === "unauthenticated" && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-xl z-10 justify-center items-center flex">
                      <div className="text-white text-sm font-sans font-semibold">
                        Sign in to get the code
                      </div>
                    </div>
                  ))}
                {List?.codeSnippets.map((code) =>
                  select === code.title ? (
                    <div key={code.title} className=" h-[74vh] mt-3">
                      {codeColorize(code.code)}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-black font-sans font-semibold text-xl">
          No such component available!
        </div>
      )}
    </div>
  );
};

export default page;
