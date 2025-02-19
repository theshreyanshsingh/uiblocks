"use client";
import Link from "next/link";
import React from "react";
import { RiTwitterXFill } from "react-icons/ri";
import ComingSoon from "./ComingSoon";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Header = () => {
  const { data: session, status } = useSession();
  const getFirstLetterCapitalized = (name: string) =>
    name?.trim().charAt(0).toUpperCase() || "";

  return (
    <header className="bg-white p-2 sm:p-3 rounded-2xl justify-between items-center flex shadow-sm">
      <div className="flex justify-center items-center space-x-5">
        <Link href={"/"} className="justify-center items-center flex space-x-1">
          <h1 className="text-black font-semibold text-sm sm:text-lg font-sans">
            UIblocks
          </h1>

          <span className="px-2 p-1 rounded-lg justify-center items-center flex bg-gray-50 text-xs text-black font-medium font-sans">
            Beta
          </span>
        </Link>
        <Link
          href={"/components"}
          className="pn:max-sm:hidden justify-center items-center text-end space-x-2 flex text-xs font-sans font-medium text-[#949494] hover:text-black"
        >
          Components
        </Link>
        <Link
          href={"/#"}
          className="pn:max-sm:hidden justify-center items-center text-end space-x-2 flex text-xs font-sans font-medium text-[#949494] hover:text-black gap-x-2"
        >
          Templates
          <ComingSoon />
        </Link>
        {/* <Link
          href={"/pricing"}
          className="justify-center items-center text-end space-x-2 flex text-xs font-sans font-medium text-[#949494] hover:text-black"
        >
          Pricing
        </Link> */}
      </div>

      <div className="justify-center items-center flex space-x-3 w-auto">
        <Link
          href={"https://x.com/theonlyvasudev"}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <RiTwitterXFill className="text-lg text-black" />
        </Link>
        <div>|</div>
        {status === "loading" ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg text-black" />
        ) : status === "authenticated" && session?.user?.name ? (
          <button
            onClick={() => signOut()}
            className="rounded-lg p-2 px-3 text-black bg-gray-50 text-xs font-sans font-medium"
          >
            {getFirstLetterCapitalized(session.user.name)}
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="rounded-lg p-2 text-black text-xs font-sans font-medium"
          >
            Sign in
          </button>
        )}

        {/* <Link
          href={"/pricing"}
          className="hover:shadow-md rounded-xl p-2 px-3 text-black text-xs font-sans font-medium text-balance cursor-pointer bg-white shadow-sm border-[1px] border-gray-100 justify-center items-center flex gap-x-1"
        >
          Get Lifetime Deal <MdKeyboardArrowRight className="text-xs" />
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
