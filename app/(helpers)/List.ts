import MainToast from "../(pages)/components/[component]/_listOfComponents/Toast";
import MainText from "../(pages)/components/[component]/_listOfComponents/AnimatedText";
import MainAnimatedSocialProof from "../(pages)/components/[component]/_listOfComponents/AnimatedSocialProof";
import ButtonGroup from "../(pages)/components/[component]/_listOfComponents/ButtonGroup";
import MainHoverCard from "../(pages)/components/[component]/_listOfComponents/HoverCard";
import MainWaves from "../(pages)/components/[component]/_listOfComponents/Waves";
// import MainHorizontaltest from "../(pages)/components/[component]/_listOfComponents/HorizontalTestimonial";
// import MainVerticalTestimonials from "../(pages)/components/[component]/_listOfComponents/VerticalTestimonials";
import MainTypewriter from "../(pages)/components/[component]/_listOfComponents/Typewriter";
import MainImageReveal from "../(pages)/components/[component]/_listOfComponents/ImageReveal";
import MainScalebleImage from "../(pages)/components/[component]/_listOfComponents/ScalableImage";
import MainImageBlur from "../(pages)/components/[component]/_listOfComponents/ImageBlur";
import MainEarthGlobe from "../(pages)/components/[component]/_listOfComponents/EarthGlobe";
import MainTooltip from "../(pages)/components/[component]/_listOfComponents/Tooltip";
import MainParticleText from "../(pages)/components/[component]/_listOfComponents/ParticleText";
import MainFallingBeam from "../_components/FallingBeam";

type ComponentItem = {
  name: string;
  desc: string;
  component: React.FC;
  premium: boolean;
  codeSnippets: {
    title: string;
    code: string;
  }[];
};

const rawComponents: ComponentItem[] = [
  {
    name: "Animated Words",
    desc: "Beautiful animated words that appear and disappear.",
    premium: false,
    component: MainText,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from "react";
  import AnimatedText from './AnimatedText';
  
  const MainText: React.FC = () => {
    const words = ["awesome", "dynamic", "colorful", "innovative"];
    const colors = [
      "text-red-400",
      "text-green-500",
      "text-blue-600",
      "text-yellow-500",
    ];
  
    return (
      <div className="flex justify-center items-center h-full w-full">
        <AnimatedText text="Text Animation Looks" words={words} colors={colors} />
      </div>
    );
  };
  
  export default MainText;
  `,
      },
      {
        title: "AnimatedText.tsx",
        code: `
  import React, { useState, useEffect, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  
  interface AnimatedTextProps {
    text: string;  // Static text part
    words: string[]; // List of words to animate
    colors: string[]; // List of colors for each word
    interval?: number; // Optional interval duration (default is 1500ms)
  }
  
  const AnimatedText: React.FC<AnimatedTextProps> = ({ text, words, colors, interval = 1500 }) => {
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
                  className={\`block \${colors[index]}\`}
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
  
        {/* Simple wave shape */}
        <div className="absolute bottom-0 w-full">
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C240 200 480 150 720 200C960 250 1200 300 1440 250V400H0V250Z"
              fill="#FFA5B9"
              fillOpacity="0.6"
            />
            <path
              d="M0 300C240 250 480 200 720 250C960 300 1200 350 1440 300V400H0V300Z"
              fill="#FF8BA7"
              fillOpacity="0.4"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default AnimatedText;
  `,
      },
    ],
  },
  {
    name: "Animated Social Proof",
    desc: "Horizontally Animated Social Proof wiith framer-motion.",
    component: MainAnimatedSocialProof,
    premium: false,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from "react";
  import AnimatedSocialProof from './AnimatedSocialProof';
  
  const App = () => {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <AnimatedSocialProof />
      </div>
    );
  };
  
  export default App;
  `,
      },
      {
        title: "AnimatedSocialProof.tsx",
        code: `
  import React from "react";
  import { motion } from "framer-motion";
  import Image from "next/image";
  import {Amazon, Canva, Figma, Google, Instagram, Mailchimp, Microsft} from "../assets";
  
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
        <div className="text-white font-sans text-xl font-semibold">
          Featured in
        </div>
  
        <div className="relative w-full h-20 mt-10 bg-gray-300/80">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 h-20 w-40 bg-gradient-to-r from-[#0D1117] to-transparent z-10" />
  
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 h-20 w-40 bg-gradient-to-l from-[#0D1117] to-transparent z-10" />
  
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
                    key={\`second-\${idx}\`}
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
  `,
      },
    ],
  },
  {
    name: "Buttons",
    desc: "A Variety of Animated Buttons.",
    premium: false,
    component: ButtonGroup,
    codeSnippets: [
      {
        title: "Usage",
        code: `
    import React from "react";
    import GlowButton from './GlowButton';
    import HoverGradient from './HoverGradient';
    import GlowyButton from './GlowyButton';
    
    const ButtonGroup: React.FC = () => {
      return (
        <div className="grid grid-cols-3 gap-16">
          <GlowButton text="Glow Button" />
          
          <div className="flex justify-center items-center h-full">
            <HoverGradient text="Hover Gradient" />
          </div>
          
          <GlowyButton
            text="Glowy Button"
            gradient="bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      );
    };
    
    export default ButtonGroup;
        `,
      },
      {
        title: "GlowButton.tsx",
        code: `
    import React, { useState } from "react";
    import { motion } from "framer-motion";
    import { PiStarFourFill } from "react-icons/pi";

    const GlowButton = ({ text }: { text: string }) => {
      const [hovered, setHovered] = useState(false);

      const stars = [
        { top: "20px", left: "30px" },
        { top: "30px", left: "40px" },
        { top: "40px", left: "30px" },
      ];

      return (
        <div className="relative overflow-hidden rounded-lg">
          <div className="relative inline-flex items-center justify-center">
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative bg-[#272727] hover:bg-[#6e4fd2] text-white px-1 py-0.5 rounded-full transition-all duration-200"
            >
              <motion.div
                animate={
                  hovered
                    ? {
                        "--angle": ["0deg", "90deg", "180deg", "270deg", "360deg"],
                      }
                    : {}
                }
                transition={
                  hovered
                    ? {
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }
                    : {}
                }
                style={{
                  backgroundImage:
                    "conic-gradient(from var(--angle), transparent 70%, pink)",
                  "--angle": "0deg",
                }}
                className="px-24 py-7 rounded-full transition-all duration-200"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] hover:bg-gradient-to-b from-blue-800 to-purple-500 hover:text-white text-[#585757] px-14 py-[16px] rounded-full font-semibold font-poppins transition-all duration-200 whitespace-nowrap text-sm">
                {text}
              </div>

              <motion.div className="absolute -top-2 -left-3">
                {stars.map((position, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: hovered ? [0.5, 1, 0.5] : 1,
                      color: hovered ? "white" : "gray",
                      opacity: hovered ? 1 : 0.2,
                    }}
                    transition={{
                      repeat: hovered ? Infinity : 0,
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    initial={{ opacity: 0.5, scale: 1 }}
                    className="absolute"
                    style={{
                      ...position,
                    }}
                  >
                    <PiStarFourFill className="text-white" />
                  </motion.div>
                ))}
              </motion.div>
            </button>
          </div>
        </div>
      );
    };

    export default GlowButton;
        `,
      },
      {
        title: "HoverGradient.tsx",
        code: `
    import React from "react";

    const HoverGradient = ({ text }: { text: string }) => {
      return (
        <button className="relative px-6 py-3 rounded-full text-lg font-medium transition-all hover:opacity-90 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <span className="relative flex justify-center items-center font-sans font-semibold text-sm text-white">
            {text}
            <span className="ml-2 text-lg leading-none"></span>
          </span>
        </button>
      );
    };

    export default HoverGradient;
        `,
      },
      {
        title: "GlowyButton.tsx",
        code: `
    import React from "react";

    const GlowyButton = ({
      text,
      gradient,
    }: {
      text: string;
      gradient: string;
    }) => {
      return (
        <div className="flex items-center justify-center">
          <div className="relative inline-flex items-center justify-center">
            <motion.div
              initial={{ filter: "blur(8px)" }}
              className={\`absolute animate-pulse inset-0 \${gradient} rounded-2xl\`}
            ></motion.div>

            <div className="bg-[#080808] rounded-2xl z-10 px-8 py-4 text-white text-sm font-medium flex items-center justify-center">
              {text}
            </div>
          </div>
        </div>
      );
    };

    export default GlowyButton;
        `,
      },
    ],
  },
  {
    name: "Hover Card",
    desc: "3D hovering animated card component.",
    premium: false,
    component: MainHoverCard,
    codeSnippets: [
      {
        title: "Usage",
        code: `
    import React from "react";
    import book from "./assets/book.png";
    import HoverCard from './HoverCard';

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
      `,
      },
      {
        title: "HoverCard.tsx",
        code: `
    import React, { useState } from "react";
    import Image from "next/image";
    import { GoHeartFill } from "react-icons/go";
    import book from "@/app/(helpers)/list_assets/typewriter.png";

    const HoverCard = ({
      image,
      name,
      description,
    }: {
      image: any;
      name: string;
      description: string;
    }) => {
      const [liked, setLiked] = useState(false);
      const [rotate, setRotate] = useState({ x: 0, y: 0 });

      const toggleLike = () => {
        setLiked(!liked);
      };

      const handleMouseMove = (e: any) => {
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
              transform: \`rotateX(\${rotate.x}deg) rotateY(\${rotate.y}deg)\`,
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
                  className=\`text-2xl cursor-pointer transition-colors duration-300 \${liked ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-500"}\`
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

    export default HoverCard;
        `,
      },
    ],
  },
  {
    name: "Hover Image Reveal",
    desc: "Hover to Reveal the Image.",
    premium: false,
    component: MainImageReveal,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import ImageReveal from './ImageReveal';
  import image1 from './assets/image1';
  import image2 from './assets/image2';

  const MainImageReveal: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <ImageReveal image1={image1} image2={image2} />
      </div>
    );
  };

  export default MainImageReveal;
        `,
      },
      {
        title: "ImageReveal.tsx",
        code: `
  import React, { useRef, useState } from "react";
  import { motion } from "framer-motion";
  import Image from "next/image";

  const ImageReveal = ({ image1, image2 }: { image1: any; image2: any }) => {
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: any) => {
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
            className="object-cover rounded-2xl w-full h-full"
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              WebkitClipPath: \`circle(\${isHovering ? "50px" : "0px"} at \${mousePosition.x}px \${mousePosition.y}px)\`,
              clipPath: \`circle(\${isHovering ? "50px" : "0px"} at \${mousePosition.x}px \${mousePosition.y}px)\`,
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
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  export default ImageReveal;
        `,
      },
    ],
  },
  {
    name: "Toast",
    desc: "A Toast is a brief notification that alerts users of an action's result, such as success, error, or info. It appears briefly and automatically disappears, ensuring users stay informed without interrupting their flow. Simple, effective feedback for a seamless user experience.",
    component: MainToast,
    premium: false,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from "react";
  import Toast from './Toast';
  

  const MainToast: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("This is a success message!");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

    return (
      <div className="flex justify-center items-center">
        <button
          onClick={() => showToast("Data saved successfully!", "success")}
          className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => showToast("Something went wrong!", "error")}
          className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold mx-5"
        >
          Show Error Toast
        </button>
        <button
          onClick={() => showToast("Here's some information.", "info")}
          className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold"
        >
          Show Info Toast
        </button>

        {/* Toast Component */}
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={toastVisible}
          onClose={hideToast}
        />
      </div>
    );
  };
    `,
      },
      {
        title: "Toast.tsx",
        code: `
  import React, { useState, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { FaCheck } from "react-icons/fa";
  import { AiOutlineInfoCircle } from "react-icons/ai";
  import { IoMdClose } from "react-icons/io"; // Close icon for error toasts
import HoverCard from '@/app/component/HoverCard';
  
  type ToastProps = {
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
    onClose: () => void;
  };
  
  const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          onClose(); // Close toast after 3 seconds
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [isVisible, onClose]);
  
    const toastStyles = {
      success: "bg-white",
      error: "bg-white",
      info: "bg-white",
    };
  
    const toastVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.2, ease: "easeIn" },
      },
    };
  
    // Choose the icon based on the type
    const renderIcon = () => {
      switch (type) {
        case "success":
          return <FaCheck className="text-emerald-500 text-[12px]" />;
        case "info":
          return <AiOutlineInfoCircle className="text-black text-[14px]" />;
        case "error":
          return <IoMdClose className="text-red-400 text-[14px]" />;
        default:
          return null;
      }
    };
  
    return (
      <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50 mt-4">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className={\`px-3 bg-white border rounded-lg shadow-md p-2 max-w-xs flex items-center space-x-2 \${toastStyles[type]}\`}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className={\`flex justify-center items-center h-6 w-6 rounded-full \${toastStyles[type]}\`}
              >
                {renderIcon()}
              </div>
              <div className="flex-1">
                <span className="text-black text-sm font-sans font-medium">
                  {message}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
      `,
      },
    ],
  },
  {
    name: "Typewriter Effect",
    component: MainTypewriter,
    desc: "Animated Typewriter Effect",
    premium: false,

    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from "react";
  import Typewriter from './Typewriter';

  const MainTypewriter: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <Typewriter fullText="Typing feels way cooler now!" />
      </div>
    );
  };

  export default MainTypewriter;
      `,
      },
      {
        title: "Typewriter.tsx",
        code: `
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
      <div className="w-[600px] h-[300px] flex justify-center items-center bg-gradient-to-br from-[#fbab8d] via-[#faefcd] to-[#76dbcd] rounded-xl">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-[#FFF1E5] px-4 py-2 shadow-xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl font-poppins font-semibold text-black relative z-0"
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
  export default Typewriter;
      `,
      },
    ],
  },
  // {
  //   name: "Vertical Testimonials",
  //   premium: false,
  //   desc: "Animated vertical testimonials",
  //   component: MainVerticalTestimonials,

  //   codeSnippets: [
  //     {
  //       title: "Usage",
  //       code: `
  // import React from "react";
  // import Testimonials from './VerticalTestimonials';

  // interface Testimonial {
  //   name: string;
  //   text: string;
  // }

  // const VerticalTestimonials: Testimonial[] = [
  //   {
  //     name: "Alice Johnson",
  //     text: "Asteria UI is a game changer! Love the components.",
  //   },
  //   {
  //     name: "David Smith",
  //     text: "The UI is smooth, clean, and highly customizable!",
  //   },
  //   { name: "Sophia Lee", text: "Saves me hours of work. Highly recommend!" },
  //   { name: "John Doe", text: "Absolutely stunning design system. Great work!" },
  //   { name: "Emily Brown", text: "Perfect for my design projects. Love it!" },
  // ];

  // const MainVerticalTestimonials: React.FC = () => {
  //   return (
  //     <div className="justify-center items-center flex">
  //       <Testimonials testimonials={VerticalTestimonials} />
  //     </div>
  //   );
  // };

  // export default MainVerticalTestimonials;
  //         `,
  //     },
  //     {
  //       title: "VerticalTestimonials.tsx",
  //       code: `
  // import React from "react";
  // import { motion } from "framer-motion";

  // const columnVariants = (direction: "up" | "down") => ({
  //   animate: {
  //     translateY: direction === "up" ? [-350, 0] : [0, -350],
  //   },
  // });

  // interface Testimonial {
  //   name: string;
  //   text: string;
  // }

  // const VerticalTestimonials: React.FC<{ testimonials: Testimonial[] }> = ({
  //   testimonials,
  // }) => {
  //   return (
  //     <div className="flex flex-col items-center overflow-hidden h-[500px] w-full mt-10">
  //       <h2 className="text-white font-sans text-xl font-semibold mb-5">
  //         What People Say
  //       </h2>

  //       <div className="relative flex gap-6 w-full justify-center h-96 overflow-hidden">
  //         <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#fff] to-transparent z-10" />
  //         <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#fff] to-transparent z-10" />

  //         {[0, 1, 2, 3].map((colIdx) => (
  //           <div
  //             key={colIdx}
  //             className="w-60 flex flex-col gap-6 overflow-hidden"
  //           >
  //             <motion.div
  //               className="flex flex-col gap-6"
  //               variants={columnVariants(colIdx % 2 === 0 ? "up" : "down")}
  //               animate="animate"
  //               transition={{
  //                 duration: 20,
  //                 repeat: Infinity,
  //                 ease: "linear",
  //                 repeatType: "loop",
  //               }}
  //               style={{ willChange: "transform" }}
  //             >
  //               {testimonials.map((testimonial, idx) => (
  //                 <div
  //                   key={idx}
  //                   className="bg-gray-600 text-white p-5 rounded-lg w-auto"
  //                 >
  //                   <p className="italic">"{testimonial.text}"</p>
  //                   <p className="mt-3 text-right text-gray-400">
  //                     — {testimonial.name}
  //                   </p>
  //                 </div>
  //               ))}

  //               {testimonials.map((testimonial, idx) => (
  //                 <div
  //                   key={\`second-\${idx}\`}
  //                   className="bg-gray-800 text-white p-5 rounded-lg w-56"
  //                 >
  //                   <p className="italic">"{testimonial.text}"</p>
  //                   <p className="mt-3 text-right text-gray-400">
  //                     — {testimonial.name}
  //                   </p>
  //                 </div>
  //               ))}
  //             </motion.div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default VerticalTestimonials;
  //         `,
  //     },
  //   ],
  // },
  // {
  //   name: "Horizontal Testimonials",
  //   component: MainHorizontaltest,
  //   premium: false,
  //   desc: "Horizontally Animated Testimonials",
  //   codeSnippets: [
  //     {
  //       title: "Usage",
  //       code: `
  // import React from "react";

  // const MainHorizontaltest: React.FC = () => {
  //   const testimonials: Testimonial[] = [
  //     {
  //       name: "Alice Johnson",
  //       text: "Asteria UI has completely transformed the way I design interfaces. Highly recommended!",
  //     },
  //     {
  //       name: "David Smith",
  //       text: "The UI components are top-notch and save me so much time. Absolutely love it!",
  //     },
  //     {
  //       name: "Sophia Lee",
  //       text: "A must-have for developers and designers. The quality is simply outstanding!",
  //     },
  //     {
  //       name: "John Doe",
  //       text: "Asteria UI provides the best user experience. Great work by the team!",
  //     },
  //     {
  //       name: "Emily Brown",
  //       text: "The animations and smooth UI components are just perfect. Definitely worth it!",
  //     },
  //   ];

  //   return (
  //     <div className="justify-center items-center flex">
  //       <Horizontaltest testimonials={testimonials} />
  //     </div>
  //   );
  // };

  // export default MainHorizontaltest;
  //       `,
  //     },
  //     {
  //       title: "HorizontalTestimonials.tsx",
  //       code: `
  // import React from "react";
  // import { motion } from "framer-motion";

  // interface Testimonial {
  //   name: string;
  //   text: string;
  // }

  // const Horizontaltest: React.FC<{ testimonials: Testimonial[] }> = ({
  //   testimonials,
  // }) => {
  //   return (
  //     <div className="flex justify-center items-center flex-col overflow-hidden">
  //       <h2 className="text-white font-sans text-xl font-semibold mb-8">
  //         What People Say
  //       </h2>

  //       <div className="relative w-full overflow-hidden">
  //         <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0D1117] to-transparent z-10" />
  //         <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0D1117] to-transparent z-10" />

  //         <div className="relative overflow-hidden">
  //           <div className="flex">
  //             <motion.div
  //               className="flex gap-6 shrink-0"
  //               animate={{
  //                 translateX: [0, -1240],
  //               }}
  //               transition={{
  //                 duration: 20,
  //                 repeat: Infinity,
  //                 ease: "linear",
  //                 repeatType: "loop",
  //               }}
  //               style={{ willChange: "transform" }}
  //             >
  //               {testimonials.map((testimonial, idx) => (
  //                 <div
  //                   key={idx}
  //                   className="bg-gray-800 text-white p-5 rounded-lg w-80 shrink-0"
  //                 >
  //                   <p className="italic">"{testimonial.text}"</p>
  //                   <p className="mt-3 text-right text-gray-400">
  //                     — {testimonial.name}
  //                   </p>
  //                 </div>
  //               ))}

  //               {testimonials.map((testimonial, idx) => (
  //                 <div
  //                   key={\`second-\${idx}\`}
  //                   className="bg-gray-800 text-white p-5 rounded-lg w-80 shrink-0"
  //                 >
  //                   <p className="italic">"{testimonial.text}"</p>
  //                   <p className="mt-3 text-right text-gray-400">
  //                     — {testimonial.name}
  //                   </p>
  //                 </div>
  //               ))}
  //             </motion.div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  //       `,
  //     },
  //   ],
  // },
  {
    name: "Waves Effect",
    desc: "Animated Background waves with text",
    premium: false,
    component: MainWaves,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import Waves from './Waves';
  
  const MainWaves: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <Waves text="This is how waves look!" />
      </div>
    );
  };
  
  export default MainWaves;
        `,
      },
      {
        title: "Waves.tsx",
        code: `
  import React, { useRef, useEffect } from "react";
  import { motion } from "framer-motion";
  
  interface WavesProps {
    text: string;
  }
  
  const Waves: React.FC<WavesProps> = ({ text }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
  
      window.addEventListener("resize", updateCanvasSize);
      updateCanvasSize();
  
      const waves = [
        { amplitude: 50, frequency: 0.005, speed: 0.05, opacity: 0.7 },
        { amplitude: 40, frequency: 0.007, speed: 0.04, opacity: 0.5 },
        { amplitude: 30, frequency: 0.009, speed: 0.06, opacity: 0.3 },
        { amplitude: 45, frequency: 0.006, speed: 0.03, opacity: 0.4 },
        { amplitude: 35, frequency: 0.008, speed: 0.07, opacity: 0.6 },
      ];
  
      let animationFrame: number;
      let time = 0;
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerY = canvas.height / 2;
  
        waves.forEach((wave) => {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          gradient.addColorStop(0, \`rgba(79, 172, 254, \${wave.opacity})\`);
          gradient.addColorStop(0.5, \`rgba(180, 101, 218, \${wave.opacity})\`);
          gradient.addColorStop(1, \`rgba(79, 172, 254, \${wave.opacity})\`);
  
          ctx.beginPath();
          ctx.moveTo(0, centerY);
  
          for (let x = 0; x < canvas.width; x++) {
            const y =
              centerY +
              Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
            ctx.lineTo(x, y);
          }
  
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
  
          ctx.shadowColor = "#B465DA";
          ctx.shadowBlur = 15;
  
          ctx.stroke();
        });
  
        time += 0.05;
        animationFrame = requestAnimationFrame(animate);
      };
  
      animate();
  
      return () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", updateCanvasSize);
      };
    }, []);
  
    return (
      <div className="relative w-[1100px] h-[450px] bg-black flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            filter: "blur(1px)",
            transform: "translateZ(0)",
          }}
        />
  
        <motion.div
          className="absolute text-white text-5xl font-sans font-semibold text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="flex justify-center">{text}</div>
        </motion.div>
      </div>
    );
  };
  
  export default Waves;
        `,
      },
    ],
  },
  {
    name: "Scalable Image",
    desc: "Hover on the image to see it scale",
    premium: false,
    component: MainScalebleImage,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import ScalableImage from './ScalableImage';
  import Image from './assets';
  
  const MainScalebleImage: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <ScalableImage image={Image} />
      </div>
    );
  };
  
  export default MainScalebleImage;
        `,
      },
      {
        title: "ScalableImage.tsx",
        code: `
  import React from "react";
  import Image from "next/image";
  
  interface ScalableImageProps {
    image: string;
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
  
  export default ScalableImage;
        `,
      },
    ],
  },
  {
    name: "Glowing Image",
    desc: "Glowing Image with image itself as a background",
    premium: false,
    component: MainImageBlur,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from "react";
  import Image from './assets';
  import GlowImage from './GlowImage';
  
  const MainImageBlur: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <GlowImage 
          image={Image} 
          width={300} 
          height={400} 
          borderRadius="2rem" 
        />
      </div>
    );
  };
  
  export default MainImageBlur;
        `,
      },
      {
        title: "GlowImage.tsx",
        code: `
  import React from "react";
  import Image from "next/image";
  
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
  
  export default GlowImage;
        `,
      },
    ],
  },
  {
    name: "Rotating Earth",
    desc: "Revolving Beautiful Earth with glowy stars, try to moving it with cursor.",
    premium: false,
    component: MainEarthGlobe,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import EarthGlobe from './EarthGlobe';
  
  const MainEarthGlobe: React.FC = () => {
    return (
      <div
        style={{
          width: "50vw",
          height: "50vh",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <EarthGlobe />
      </div>
    );
  };
  
  export default MainEarthGlobe;
        `,
      },
      {
        title: "EarthGlobe.tsx",
        code: `
  import React, { useEffect, useRef } from "react";
  import * as THREE from "three";
  import texture from "@/app/(helpers)/list_assets/world.jpg";
  import {
    EffectComposer,
    RenderPass,
    UnrealBloomPass,
  } from "three/examples/jsm/Addons.js";
  
  const EarthGlobe: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (!mountRef.current) return;
  
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000015);
  
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        60,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
  
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);
  
      // Load textures
      const textureLoader = new THREE.TextureLoader();
      const earthTexture = textureLoader.load(texture.src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
      });
  
      // Create Earth with proper material settings
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 10,
        specular: new THREE.Color(0x333333),
        combine: THREE.MultiplyOperation,
      });
  
      const earth = new THREE.Mesh(geometry, material);
      scene.add(earth);
  
      // Balanced lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
  
      const mainLight = new THREE.DirectionalLight(0xffffff, 1);
      mainLight.position.set(5, 3, 5);
      scene.add(mainLight);
  
      // Subtle fill light from the opposite side
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);
  
      // Improved atmosphere effect
      const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: \`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        \`,
        fragmentShader: \`
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 0.15) * intensity;
          }
        \`,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      });
  
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
  
      // Enhanced starfield with custom shader for twinkling
      const starGeometry = new THREE.BufferGeometry();
      const starVertices: number[] = [];
      for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
  
      const starMaterial = new THREE.ShaderMaterial({
        vertexShader: \`
          varying vec3 vPosition;
          void main() {
            vPosition = position; // Pass position to fragment shader
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 2.0;
          }
        \`,
        fragmentShader: \`
          uniform float uTime;
          varying vec3 vPosition; // Receive position from vertex shader
          void main() {
            float twinkle = sin(uTime + vPosition.x * 100.0) * 0.5 + 0.5; // Use vPosition instead of position
            gl_FragColor = vec4(1.0, 1.0, 1.0, twinkle * 1.0); // Increased opacity for more glow
          }
        \`,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
  
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
  
      // Post-processing for glow effect
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
  
      // Bloom pass for Earth (increased glow)
      const earthBloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, // Increased strength for more glow
        0.4, // Increased radius for broader glow
        0.4 // Lower threshold for more sensitivity
      );
      composer.addPass(earthBloomPass);
  
      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
  
        const time = clock.getElapsedTime();
        starMaterial.uniforms.uTime.value = time; // Update star twinkling
  
        earth.rotation.y += 0.001;
        atmosphere.rotation.y += 0.001;
        composer.render();
      };
  
      // Handle window resizing
      const handleResize = () => {
        const width = mountRef.current!.clientWidth;
        const height = mountRef.current!.clientHeight;
  
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        composer.setSize(width, height);
      };
  
      // Handle mouse wheel for zoom
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        camera.position.z += event.deltaY * 0.05;
        camera.position.z = Math.max(5, Math.min(50, camera.position.z)); // Limit zoom range
      };
  
      window.addEventListener("resize", handleResize);
      window.addEventListener("wheel", handleWheel, { passive: false });
      animate();
  
      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("wheel", handleWheel);
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }, []);
  
    return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
  };
  
  export default EarthGlobe;
        `,
      },
    ],
  },
  {
    name: "Tooltip",
    desc: "Animated Tooltip, hover over it to see it in action.",
    premium: false,
    component: MainTooltip,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import Tooltip from './Tooltip';
  
  const MainTooltip: React.FC = () => {
    const images = [
      { imageUrl: "/assets/img3.jpg", text: "First Team Member", zIndex: "z-50" },
      { imageUrl: "/assets/img4.jpg", text: "Lead Designer", zIndex: "z-40" },
      { imageUrl: "/assets/img5.jpg", text: "Senior Developer", zIndex: "z-30" },
      { imageUrl: "/assets/img6.jpg", text: "Project Manager", zIndex: "z-20" },
      { imageUrl: "/assets/img7.jpg", text: "Marketing Lead", zIndex: "z-10" },
    ];
  
    return (
      <div className="justify-center items-center flex">
        <Tooltip images={images} />
      </div>
    );
  };
  
  export default MainTooltip;
        `,
      },
      {
        title: "Tooltip.tsx",
        code: `
  import React, { useState } from "react";
  import Image from "next/image";
  import { motion } from "framer-motion";
  
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
              className={\`\${index !== 0 ? "-ml-5" : ""} \${image.zIndex} relative\`}
              onMouseEnter={() => setActiveTooltip(index)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <Image
                src={image.imageUrl}
                alt={\`Profile of \${image.text}\`}
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
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-[#302f2f] text-white text-sm rounded-lg whitespace-nowrap font-sans"
                >
                  {image.text}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-[#302f2f]" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Tooltip;
        `,
      },
    ],
  },
  {
    name: "Particle Background",
    desc: "Animated Particle Background, you can push the particles around wth your cursor.",
    premium: false,
    component: MainParticleText,
    codeSnippets: [
      {
        title: "Usage",
        code: `
    import React from 'react';
    import ParticleText from './ParticleText';

    const MainParticleText: React.FC = () => {
      return (
        <div className="justify-center items-center flex">
          <ParticleText
            text1="Saas looks cool with particles"
            text2="This can be your description."
            particleCount={300}
            interactive={true}
            backgroundColor="bg-[#09090B]"
          />
        </div>
      );
    };

    export default MainParticleText;
        `,
      },
      {
        title: "ParticleText.tsx",
        code: `
  import React, { useEffect, useRef, useState } from "react";
  import { motion } from "framer-motion";

  interface ParticleProps {
    particleCount: number;
    interactive?: boolean;
    backgroundColor?: string;
    text1: string;
    text2: string;
  }

  const generateParticles = (count: number, width: number, height: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1 + 0.5, // Reduced size (0.5 to 1.5)
      speed: Math.random() * 0.5 + 0.1,
      color: "rgba(255, 255, 255, 0.7)", // Pure white with slight transparency
      direction: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
    }));
  };

  const ParticleText: React.FC<ParticleProps> = ({
    particleCount,
    interactive = true,
    backgroundColor = "bg-[#000015]",
    text1,
    text2,
  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [particles, setParticles] = useState<any[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Initialize particles on mount
    useEffect(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setParticles(generateParticles(particleCount, width, height));
      }
    }, [particleCount]);

    // Interactive mouse movement
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!interactive) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    // Particle animation logic
    const animateParticles = (particle: any) => {
      let newX = particle.x + particle.direction.x * particle.speed;
      let newY = particle.y + particle.direction.y * particle.speed;

      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || window.innerHeight;

      // Wrap around screen
      if (newX < 0) newX = width;
      if (newX > width) newX = 0;
      if (newY < 0) newY = height;
      if (newY > height) newY = 0;

      // Optional: Add slight mouse influence
      if (interactive) {
        const dx = newX - mousePosition.x;
        const dy = newY - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Particles move away from mouse within a certain radius
        if (distance < 100) {
          newX += (dx / distance) * 2;
          newY += (dy / distance) * 2;
        }
      }

      return {
        ...particle,
        x: newX,
        y: newY,
      };
    };

    // Animate particles on each frame
    useEffect(() => {
      const animationFrame = requestAnimationFrame(() => {
        setParticles((currentParticles) =>
          currentParticles.map(animateParticles)
        );
      });

      return () => cancelAnimationFrame(animationFrame);
    }, [particles, mousePosition]);

    return (
      <div
        ref={containerRef}
        className={\`w-[1000px] h-[400px] \${backgroundColor}\`}
        onMouseMove={handleMouseMove}
      >
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              x: particle.x,
              y: particle.y,
            }}
            transition={{
              duration: 0,
              type: "tween",
            }}
            style={{
              position: "absolute",
              width: particle.radius * 2,
              height: particle.radius * 2,
              borderRadius: "50%",
              backgroundColor: particle.color,
            }}
          />
        ))}

        <div className="flex-col flex justify-center items-center h-full">
          {/* Main Heading */}
          <motion.div
            className="text-6xl font-bold mb-7 font-sans text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {text1}
          </motion.div>

          {/* Subtext */}
          <motion.div
            className="text-lg font-sans text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            {text2}
          </motion.div>
        </div>
      </div>
    );
  };

  export default ParticleText;
        `,
      },
    ],
  },
  {
    name: "Falling Beams",
    desc: "Animated falling beams with text.",
    premium: false,
    component: MainFallingBeam,
    codeSnippets: [
      {
        title: "Usage",
        code: `
  import React from 'react';
  import FallingBeam from './FallingBeam';

  const MainFallingBeam: React.FC = () => {
    return (
      <div className="justify-center items-center flex">
        <FallingBeam
          text="Falling Beams"
          beamCount={100}
          backgroundColor="bg-black"
        />
      </div>
    );
  };

  export default MainFallingBeam;
      `,
      },
      {
        title: "FallingBeam.tsx",
        code: `
  import React, { useEffect, useRef, useState } from "react";
  import { motion } from "framer-motion";

  interface Beam {
    x: number;
    width: number;
    opacity: number;
    speed: number;
    delay: number;
  }

  interface FallingBeamProps {
    beamCount: number;
    backgroundColor: string;
    text: string;
  }

  const FallingBeam: React.FC<FallingBeamProps> = ({
    beamCount,
    backgroundColor,
    text,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [beams, setBeams] = useState<Beam[]>([]);

    useEffect(() => {
      if (containerRef.current) {
        const width = window.innerWidth;

        const generatedBeams: Beam[] = Array.from({ length: beamCount }, () => ({
          x: Math.random() * width,
          width: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 200 + 100,
          delay: Math.random() * 2,
        }));

        setBeams(generatedBeams);
      }
    }, [beamCount]);

    return (
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className={\`relative w-[1100px] h-[450px] \${backgroundColor}\`}
        >
          {beams.map((beam, index) => (
            <motion.div
              key={index}
              initial={{ y: -50, opacity: beam.opacity }}
              animate={{ y: "100vh", opacity: [beam.opacity, 0] }}
              transition={{
                duration: beam.speed / 100,
                delay: beam.delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              style={{
                position: "absolute",
                left: beam.x,
                width: beam.width,
                height: "50px",
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.8), rgba(255,255,255,0))",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
            />
          ))}
          <div className="flex justify-center items-center h-full text-6xl font-sans font-bold text-white">
            {text}
          </div>
        </div>
      </div>
    );
  };

  export default FallingBeam;
      `,
      },
    ],
  },
];

const components = rawComponents.sort((a, b) => a.name.localeCompare(b.name));

export default components;
