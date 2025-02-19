"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";

// ** GlowButton Component **
const GlowButton = ({ text }: { text: string }) => {
  const [hovered, setHovered] = useState(false);

  const stars = [
    { top: "20px", left: "30px" },
    { top: "30px", left: "40px" },
    { top: "40px", left: "30px" },
  ];

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative inline-flex items-center justify-center">
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative bg-[#272727] hover:bg-[#6e4fd2] text-white px-1 py-0.5 rounded-full transition-all duration-200"
        >
          <motion.div
            animate={
              hovered
                ? {
                    ["--angle" as string]: [
                      "0deg",
                      "90deg",
                      "180deg",
                      "270deg",
                      "360deg",
                    ],
                  }
                : {}
            }
            transition={
              hovered
                ? {
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }
                : {}
            }
            style={{
              backgroundImage:
                "conic-gradient(from var(--angle), transparent 70%, pink)",
              ["--angle" as string]: "0deg",
            }}
            className="px-24 py-7 rounded-full transition-all duration-200"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] hover:bg-gradient-to-b from-blue-800 to-purple-500 hover:text-white text-[#585757] px-14 py-[16px] rounded-full font-semibold font-poppins transition-all duration-200 whitespace-nowrap text-sm">
            {text}
          </div>

          <motion.div className="absolute -top-2 -left-3">
            {stars.map((position, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: hovered ? [0.5, 1, 0.5] : 1,
                  color: hovered ? "white" : "gray",
                  opacity: hovered ? 1 : 0.2,
                }}
                transition={{
                  repeat: hovered ? Infinity : 0,
                  duration: 1,
                  delay: index * 0.2,
                }}
                initial={{ opacity: 0.5, scale: 1 }}
                className="absolute"
                style={{
                  ...position,
                }}
              >
                <PiStarFourFill className="text-white" />
              </motion.div>
            ))}
          </motion.div>
        </button>
      </div>
    </div>
  );
};

// ** HoverButton Component **
const HoverGradient = ({ text }: { text: string }) => {
  return (
    <button className="relative px-6 py-3 rounded-full text-lg font-medium transition-all hover:opacity-90 group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <span className="relative flex justify-center items-center font-sans font-semibold text-sm text-white">
        {text}
        <span className="ml-2 text-lg leading-none"></span>
      </span>
    </button>
  );
};

// ** GlowyButton Component **
const GlowyButton = ({
  text,
  gradient,
}: {
  text: string;
  gradient: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <motion.div
          initial={{ filter: "blur(8px)" }}
          className={`absolute animate-pulse inset-0 ${gradient} rounded-2xl`}
        ></motion.div>

        <div className="bg-[#080808] rounded-2xl z-10 px-8 py-4 text-white text-sm font-medium flex items-center justify-center">
          {text}
        </div>
      </div>
    </div>
  );
};

// ** ButtonGroup Component to Render All Buttons **
const ButtonGroup: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-16">
      <GlowButton text="Glow Button" />
      <div className="flex justify-center items-center h-full ">
        <HoverGradient text="Glow Button" />
      </div>
      <GlowyButton
        text="Gradient Button"
        gradient="bg-gradient-to-r from-blue-500 to-purple-600"
      />
    </div>
  );
};

export default ButtonGroup;
