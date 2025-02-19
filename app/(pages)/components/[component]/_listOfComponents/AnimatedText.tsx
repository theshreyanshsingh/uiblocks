"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generalized AnimatedText component
interface AnimatedTextProps {
  text: string; // Static text part
  words: string[]; // List of words to animate
  colors: string[]; // List of colors for each word
  interval?: number; // Optional interval duration (default is 1500ms)
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  words,
  colors,
  interval = 1500,
}) => {
  const [index, setIndex] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Use effect to change index periodically based on the interval
  useEffect(() => {
    // Set interval only once when component mounts
    intervalIdRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    // Clear interval when component unmounts
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [words.length, interval]); // Only trigger effect when words or interval changes

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Text Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-5xl font-poppins font-semibold flex items-center space-x-4 px-6 py-2 rounded-md">
          {/* Static part of the text */}
          <span className="text-black py-2 rounded-md inline-block">
            {text}
          </span>

          {/* Animated part */}
          <div className="w-[200px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]} // Unique key for re-mounting animation
                className={`block ${colors[index]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
      </div>
    </div>
  );
};

const MainText: React.FC = () => {
  const words = ["nice", "colorful", "supercool", "amazing", "creative"];
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-600",
    "text-orange-500",
    "text-purple-500",
  ];

  return (
    <div className="flex justify-center items-center h-full w-full">
      <AnimatedText text="Text Animation Looks" words={words} colors={colors} />
    </div>
  );
};

export default MainText;
