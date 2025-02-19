"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Amazon from "../../../../(helpers)/list_assets/amazon.svg";
import Canva from "../../../../(helpers)/list_assets/Canva.svg";
import Figma from "../../../../(helpers)/list_assets/Figma.svg";
import Google from "../../../../(helpers)/list_assets/Google.svg";
import Instagram from "../../../../(helpers)/list_assets/Instagram.svg";
import Mailchimp from "../../../../(helpers)/list_assets/Mailchimp.svg";
import Microsoft from "../../../../(helpers)/list_assets/Microsoft.svg";

interface Logo {
  src: string;
  alt: string;
}

interface SocialproofProps {
  logos: Logo[];
}

const AnimatedSocialproof: React.FC<SocialproofProps> = ({ logos }) => {
  return (
    <div className="flex justify-center items-center flex-col overflow-hidden">
      <div className="text-black font-sans text-xl font-semibold">
        Featured in
      </div>

      <div className="relative w-full h-20 mt-10 ">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 h-20 w-40 bg-gradient-to-r from-[#fff] to-transparent z-10" />

        {/* Right fade mask */}
        <div className="absolute right-0 top-0 h-20 w-40 bg-gradient-to-l from-[#fff] to-transparent z-10" />

        {/* Scrolling content */}
        <div className="relative overflow-hidden">
          <div className="flex">
            {/* Scrolling animation */}
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{
                translateX: [0, -1240],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{ willChange: "transform" }}
            >
              {/* Render logos */}
              {logos.map((logo, idx) => (
                <div key={idx} className="w-40 h-40 shrink-0 rounded-lg">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className="object-contain w-20 h-20"
                    width={80}
                    height={80}
                  />
                </div>
              ))}

              {/* Duplicate for seamless infinite scroll */}
              {logos.map((logo, idx) => (
                <div
                  key={`second-${idx}`}
                  className="w-40 h-40 shrink-0 rounded-lg"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className="object-contain w-20 h-20"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainAnimatedSocialProof: React.FC = () => {
  const logos = [
    { src: Amazon, alt: "Amazon" },
    { src: Canva, alt: "Canva" },
    { src: Figma, alt: "Figma" },
    { src: Google, alt: "Google" },
    { src: Instagram, alt: "Instagram" },
    { src: Mailchimp, alt: "Mailchimp" },
    { src: Microsoft, alt: "Microsoft" },
  ];
  return (
    <div className="justify-center items-center flex overflow-hidden">
      <AnimatedSocialproof logos={logos} />
    </div>
  );
};

export default MainAnimatedSocialProof;
