"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { GoHeartFill } from "react-icons/go";
import book from "@/app/(helpers)/list_assets/typewriter.png";

const HoverCard = ({
  image,
  name,
  description,
}: {
  image: string | StaticImageData;
  name: string;
  description: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - card.left;
    const mouseY = e.clientY - card.top;

    const rotateX = (mouseY / card.height) * 30 - 15;
    const rotateY = (mouseX / card.width) * 30 - 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="flex justify-center items-center w-full relative">
      {/* Card Container */}
      <div
        className="rounded-xl bg-white shadow-lg p-2 w-[230px] flex flex-col justify-between transition-transform duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Image Wrapper */}
        <div className="rounded-lg border border-orange-400 relative">
          <Image
            src={image}
            alt="Asteria UI"
            className="w-full h-[230px] rounded-lg object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-2 py-4 flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-black text-sm font-medium font-sans">{name}</h3>
            {/* Heart Icon */}
            <div
              onClick={toggleLike}
              className={`text-2xl cursor-pointer transition-colors duration-300 ${
                liked
                  ? "text-red-500 scale-110"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <GoHeartFill />
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-2 font-sans line-clamp-3">
            {description}
          </p>
        </div>

        {/* Buy Now Button */}
        <div className="pb-2">
          <button className="bg-[#383838] text-white text-xs font-semibold px-4 py-2 rounded-md w-full hover:bg-black transition-all duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const MainHoverCard: React.FC = () => {
  return (
    <div className="justify-center items-center flex">
      <HoverCard
        image={book}
        name="The Monk Who Sold his Ferrari"
        description="Hover Me"
      />
    </div>
  );
};
export default MainHoverCard;
