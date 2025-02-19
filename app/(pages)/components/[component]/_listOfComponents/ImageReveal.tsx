"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Goku from "../../../../(helpers)/list_assets/goku.webp";
import GokuUltra from "../../../../(helpers)/list_assets/gokultra.webp";

const ImageReveal = ({
  image1,
  image2,
}: {
  image1: string | StaticImageData;
  image2: string | StaticImageData;
}) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const rect = (
      containerRef.current as HTMLDivElement
    ).getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.div className="flex justify-center items-center">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl w-[300px] h-[420px] shadow-2xl"
      >
        <Image
          src={image1}
          alt="image"
          className="object-contain rounded-2xl w-full h-full"
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            WebkitClipPath: `circle(${isHovering ? "50px" : "0px"} at ${
              mousePosition.x
            }px ${mousePosition.y}px)`,
            clipPath: `circle(${isHovering ? "50px" : "0px"} at ${
              mousePosition.x
            }px ${mousePosition.y}px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
        >
          <Image
            src={image2}
            alt="image"
            className="w-full h-full object-contain rounded-2xl "
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MainImageReveal: React.FC = () => {
  return (
    <div className="justify-center items-center flex">
      <ImageReveal image1={Goku} image2={GokuUltra} />
    </div>
  );
};

export default MainImageReveal;
