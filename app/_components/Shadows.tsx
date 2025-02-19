"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type ShadowyStructureProps = {
  isVisible: boolean;
};

const ShadowyStructure: React.FC<ShadowyStructureProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-black/50 via-gray-900/40 to-transparent shadow-[100px_0_150px_50px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
};

export default ShadowyStructure;
