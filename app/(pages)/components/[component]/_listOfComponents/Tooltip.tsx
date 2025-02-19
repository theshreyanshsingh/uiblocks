"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "@/app/(helpers)/list_assets/img3.jpg";
import image2 from "@/app/(helpers)/list_assets/img4.jpg";
import image3 from "@/app/(helpers)/list_assets/img5.jpg";
import image4 from "@/app/(helpers)/list_assets/img6.jpg";
import image5 from "@/app/(helpers)/list_assets/img7.jpg";

interface ImageProps {
  imageUrl: string;
  text: string;
  zIndex: string;
}

interface TooltipProps {
  images: ImageProps[];
}

const Tooltip: React.FC<TooltipProps> = ({ images }) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <div className="p-8">
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${index !== 0 ? "-ml-5" : ""} ${image.zIndex} relative`}
            onMouseEnter={() => setActiveTooltip(index)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <Image
              src={image.imageUrl}
              alt={`Profile of ${image.text}`}
              width={80}
              height={70}
              className="rounded-full border-2 border-white shadow-lg"
            />
            {activeTooltip === index && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.6,
                }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-[#302f2f] text-white text-sm rounded-lg whitespace-nowrap font-sans "
              >
                {image.text}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-[#302f2f] "></div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MainTooltip: React.FC = () => {
  const images = [
    { imageUrl: image1.src, text: "First Team Member", zIndex: "z-50" },
    { imageUrl: image2.src, text: "Lead Designer", zIndex: "z-40" },
    { imageUrl: image3.src, text: "Senior Developer", zIndex: "z-30" },
    { imageUrl: image4.src, text: "Project Manager", zIndex: "z-20" },
    { imageUrl: image5.src, text: "Marketing Lead", zIndex: "z-10" },
  ];

  return (
    <div className="flex justify-center items-center h-full  -mt-20">
      <div className="  flex justify-center items-center mx-44 space-x-32">
        <Tooltip images={images} />
      </div>
    </div>
  );
};

export default MainTooltip;
