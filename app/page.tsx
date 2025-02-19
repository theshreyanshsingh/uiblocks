import React from "react";
import Header from "./_components/Header";
import { SiTailwindcss } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEnter } from "react-icons/ai";
import { BiLogoTypescript } from "react-icons/bi";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen w-full p-4  bg-[#F7FAFC] bg-dots bg-repeat bg-contain justify-center sm:px-[20%]">
      <Header />

      <main className="p-2 justify-center items-center flex flex-col h-[80%] mt-5 w-full">
        <section className="justify-between items-center flex flex-col h-full space-y-12">
          <div className="justify-evenly items-center flex flex-col h-full ">
            <div className="justify-center items-center flex space-y-9 flex-col">
              {/* Offer */}
              {/* <div className="max-w-4xl border-[1px] border-gray-100 bg-white px-3 p-2 rounded-xl justify-center items-center flex text-[#949494] text-sm shadow-sm font-sans font-medium gap-x-2">
                Entrepreneur's Special : Only{" "}
                <span className="text-black">$109</span> for all components for
                lifetime
                <span className=" animate-pulse">{"  •  "}</span>
                <span className="justify-center items-center gap-x-1 flex text-black">
                  Ends in 2d 23h 33m 01s
                  <MdKeyboardArrowRight className="text-sm" />
                </span>
              </div> */}
              <h1 className="font-sans font-bold text-balance text-2xl sm:text-7xl text-black text-center">
                Plug. <span className="text-violet-500">Play. </span> <br />
                Stunning UI in Seconds.
              </h1>
              <p className="font-sans font-medium text-sm sm:text-lg text-[#949494] text-balance text-center">
                Because building amazing UIs should be exciting, not exhausting.
                <br /> Get{" "}
                <span className="text-black">
                  7 mind-blowing, animated component
                </span>{" "}
                every week to supercharge your design workflow!
              </p>
              {/* Why us */}
              <div className="justify-between items-center flex sm:flex-row flex-col pn:max-sm:space-y-2 w-auto sm:space-x-7">
                <p className="text-black font-sans font-medium text-sm justify-center items-center flex gap-x-2">
                  <FaCheck className="text-emerald-500" /> 7 new Components
                  every week!
                </p>
                <p className="text-black font-sans font-medium text-sm  justify-center items-center flex gap-x-2">
                  <FaCheck className="text-emerald-500" /> 100% Responsive &
                  Typesafe
                </p>
                <p className="text-black font-sans font-medium text-sm  justify-center items-center flex gap-x-2">
                  <FaCheck className="text-emerald-500" /> Animated with Framer
                </p>
              </div>
              {/* Button */}
              <div className=" justify-center items-center flex space-x-5">
                <Link
                  href={"/components"}
                  className="p-2 px-3 justify-center items-center flex bg-black rounded-xl text-white text-xs font-semibold gap-x-2"
                >
                  Explore components
                </Link>
                {/* <button className="p-2 px-3 justify-center items-center flex bg-white rounded-xl text-black text-xs font-medium">
                  Request a component
                </button> */}
              </div>
            </div>
          </div>
          {/* Built with */}
          <div className="justify-center items-center flex flex-col space-y-4">
            <p className="font-sans font-medium text-sm text-[#949494] text-balance text-center">
              Built with
            </p>
            <div className="justify-center items-center flex space-x-5">
              <p className="font-sans font-medium text-sm gap-x-2 text-black flex justify-center items-center p-2 rounded-lg">
                <BiLogoTypescript className="text-[#3278C6] text-lg" />
                Typescript
              </p>
              <p className="font-sans font-medium text-sm gap-x-2 text-black flex justify-center items-center p-2 rounded-lg">
                <SiTailwindcss className="text-[#00BCFF] text-sm" />
                Tailwind
              </p>
              <p className="ffont-sans font-medium text-sm gap-x-2 text-black flex justify-center items-center p-2 rounded-lg">
                <TbBrandFramerMotion className="text-[#F4E91A] text-sm" />
                Motion
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
