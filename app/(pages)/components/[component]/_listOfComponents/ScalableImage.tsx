import React from "react";
import Image from "next/image";
import Goku from "@/app/(helpers)/list_assets/gokultra.webp";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ScalableImageProps {
  image: StaticImport;
}

const ScalableImage: React.FC<ScalableImageProps> = ({ image }) => {
  return (
    <div className="w-60 h-72 rounded-md overflow-hidden">
      <div className="rounded-md w-full h-full z-50 transform transition-transform duration-700 ease-in-out hover:scale-150">
        <Image
          src={image}
          alt=""
          className="object-cover w-full h-full rounded-md"
          width={240}
          height={288}
          priority
        />
      </div>
    </div>
  );
};

const MainScalebleImage: React.FC = () => {
  return (
    <div className="justify-center items-center flex">
      <ScalableImage image={Goku} />
    </div>
  );
};

export default MainScalebleImage;
