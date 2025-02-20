"use client";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import components from "../(helpers)/List";
import { usePathname, useRouter } from "next/navigation";

const Sidebar: NextPage = () => {
  const path = usePathname();
  const router = useRouter();

  const parts = path.split("/");

  const spaceIndex = parts.indexOf("components");
  const slugName = parts[spaceIndex + 1];

  //pushing to component
  useEffect(() => {
    if (!slugName) {
      router.push(
        `/components/${components[0].name.toLowerCase().replace(/\s+/g, "-")}`
      );
    }
  }, [slugName, router]);

  return (
    <div className="sm:h-full justify-start items-center flex">
      <div className="flex flex-row sm:flex-col items-start justify-between sm:h-full rounded-xl pb-4 pt-2 px-3 sm:p-7 w-full bg-white space-y-3 ">
        <div className="w-full h-full pn:max-sm:hidden">
          <h2 className="text-xs text-black font-sans font-semibold whitespace-nowrap">
            All Components
          </h2>
        </div>
        <div className="flex flex-row sm:flex-col items-start justify-start overflow-y-auto sm:max-h-[80vh] flex-grow w-full scrollbar-hide gap-x-3">
          {components.map((c, i) => {
            return (
              <Link
                href={`/components/${c.name
                  .toLocaleLowerCase()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                key={i}
                className={`hover:text-black text-[#949494] text-xs font-sans font-medium sm:py-2 p-2
                 whitespace-nowrap ${
                   c.name.toLowerCase().replace(/\s+/g, "-") === slugName
                     ? "bg-gray-100 rounded-xl text-center p-2"
                     : null
                 }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
