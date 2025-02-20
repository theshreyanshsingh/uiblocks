"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({ fullText }: { fullText: string }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText((prevText) => fullText.slice(0, prevText.length + 1));
      }, 200);
    } else if (isTyping && text.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } else if (!isTyping) {
      timeout = setTimeout(() => {
        setText("");
        setIsTyping(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping, fullText]);

  return (
    <div className="w-full px-2 h-[300px] flex justify-center items-center bg-gradient-to-br from-[#fbab8d] via-[#faefcd] to-[#76dbcd] rounded-xl">
      <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-[#FFF1E5] px-4 py-2 shadow-xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-xl sm:text-4xl font-poppins font-semibold text-black relative z-0"
        >
          {text}
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="text-orange-500 text-4xl z-50"
        >
          |
        </motion.span>
      </div>
    </div>
  );
};

const MainTypewriter: React.FC = () => {
  return (
    <div className="justify-center items-center flex w-full">
      <Typewriter fullText="Typing feels way cooler now!" />
    </div>
  );
};

export default MainTypewriter;
