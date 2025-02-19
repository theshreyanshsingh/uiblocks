"use client";
import React from "react";
import { motion } from "framer-motion";

const ComingSoon: React.FC = () => {
  return (
    <motion.span
      className="text-[10px] font-sans justify-center items-center flex font-semibold"
      style={{
        background: "linear-gradient(90deg, #ffffff, #949494, #ffffff)",
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0%",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      animate={{
        backgroundPosition: "-100% 0%",
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "linear",
      }}
    >
      Coming Soon
    </motion.span>
  );
};

export default ComingSoon;
