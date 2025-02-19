import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Goku from "@/app/(helpers)/list_assets/gokultra.webp";

interface GlowImageProps {
  image: StaticImport;
  width?: number;
  height?: number;
  borderRadius?: string;
}

const GlowImage: React.FC<GlowImageProps> = ({
  image,
  width = 300,
  height = 400,
  borderRadius = "2rem",
}) => {
  const imageStyle = {
    borderRadius: borderRadius,
    overflow: "hidden",
  };

  return (
    <div className="relative flex items-center justify-center bg-transparent p-8">
      {/* Outer Glow */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(30px)",
          transform: "scale(1.2)",
          ...imageStyle,
        }}
      >
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          className="object-contain opacity-40"
          style={imageStyle}
          priority
        />
      </div>

      {/* Inner Glow */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(15px)",
          mixBlendMode: "screen",
          ...imageStyle,
        }}
      >
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          className="object-contain opacity-60"
          style={imageStyle}
          priority
        />
      </div>

      {/* Main Image */}
      <div className="relative" style={imageStyle}>
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          className="object-contain"
          style={imageStyle}
          priority
        />
      </div>
    </div>
  );
};

const MainImageBlur: React.FC = () => {
  return (
    <GlowImage image={Goku} width={300} height={400} borderRadius="2rem" />
  );
};

export default MainImageBlur;
