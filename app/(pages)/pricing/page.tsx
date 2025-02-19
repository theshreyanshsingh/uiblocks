import Header from "@/app/_components/Header";
import { NextPage } from "next";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineSafety } from "react-icons/ai";
import ComingSoon from "@/app/_components/ComingSoon";
const page: NextPage = () => {
  const points = [
    { text: "6+ new animated components, every week" },
    { text: "Access to available features today + available in future" },
    { text: "3+ templates, every month", coming: true },
    { text: "AI based component editor", coming: true },
    { text: "Commercial liscense" },
    { text: "Priority Email support" },
  ];

  return (
    <div className="h-screen w-full p-4 px-[20%] bg-[#F7FAFC] bg-dots bg-repeat bg-contain justify-center">
      <Header />

      <section className="justify-center items-center h-[80%] w-full p-2 flex flex-col space-y-5">
        {/* Why buy */}
        <h2 className="text-balance text-black font-sans font-semibold text-4xl"></h2>

        <div className="w-[70%] bg-white rounded-2xl h-[70vh] justify-between items-center flex p-5 flex-col">
          <div className=" h-full p-2 items-start justify-start flex flex-col">
            <div className="space-y-7">
              <p className="text-xl font-sans font-semibold text-black">
                Lifetime Access
              </p>
              <p className="text-black font-sans font-semibold text-sm">
                Entrepreneur&rsquo;s Special •
                <span className="text-violet-500 animate-pulse">
                  {" 91 spots left"}
                </span>{" "}
                then prices will jump to $199 after deal ends
              </p>
              <div className="justify-center items-start flex flex-col space-y-2">
                <div className="justify-center items-end flex space-x-3">
                  <p className="text-black font-sans font-bold text-5xl">
                    $109
                  </p>
                  <p className="text-[#949494] line-through font-sans font-semibold text-3xl">
                    $199
                  </p>
                </div>
                <p className="text-black text-xs font-sans font-semibold">
                  one-time payment
                </p>
              </div>
              <p className="text-[#949494] text-sm font-sans font-medium text-balance">
                Build stunning apps with our components and templates, built
                with Tailwind CSS and Framer Motion
              </p>
            </div>
            <div className="grid grid-cols-2 gap-14 my-12">
              {points.map((p, i) => (
                <div
                  key={i}
                  className="justify-start items-center flex space-x-2"
                >
                  <FaCheck className="text-violet-500 text-lg" />
                  <p className="text-black text-sm font-sans font-medium">
                    {p.text}
                  </p>
                  {p.coming && <ComingSoon />}
                </div>
              ))}
            </div>
          </div>
          <div className=" h-full items-center justify-evenly flex flex-col space-y-3 d">
            <div className="flex justify-center items-center space-x-2 text-black text-sm font-sans font-medium">
              <AiOutlineSafety className="text-xl text-emerald-500" /> Secure
              checkout
            </div>
            <button className="hover:shadow-md px-4 p-3 bg-black items-center justify-center flex rounded-2xl text-white text-sm font-sans font-semibold">
              Get Lifetime Access Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
