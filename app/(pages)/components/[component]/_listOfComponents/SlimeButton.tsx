// components/FireText.tsx

"use client";
import { motion } from "framer-motion";

interface FireTextProps {
  children: React.ReactNode;
}

const FireText: React.FC<FireTextProps> = ({ children }) => {
  return (
    <div className="relative inline-block">
      {/* Fire SVG (placed behind the text) */}
      <motion.svg
        className="absolute -top-2 -left-2 w-16 h-16" // Adjust size and positioning as needed
        viewBox="0 0 24 24" // Adjust viewBox if your SVG has different dimensions
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // Animation variants
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.8 },
          visible: {
            opacity: [0.5, 1, 0.5], // Flicker effect
            y: [20, 0, -10], // Move up and down
            scale: [0.8, 1.2, 0.8], // Pulsate
            rotate: [0, 5, -5, 0], // Slight rotation
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {/* Placeholder for your Fire SVG path data */}
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 11.39 6.19 13.47 8 14.74C8.34 14.97 8.55 15.3 8.65 15.65L9.85 18.65C10.24 19.43 11.07 20 12 20C12.93 20 13.76 19.43 14.15 18.65L15.35 15.65C15.45 15.3 15.66 14.97 16 14.74C17.81 13.47 19 11.39 19 9C19 5.13 15.87 2 12 2ZM12 18C11.45 18 10.9 17.55 10.9 17L9.65 14C9.14 13.3 8.39 12.42 8 11.43C7.61 10.44 7 9.74 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 9.74 16.39 10.44 16 11.43C15.61 12.42 14.86 13.3 14.35 14L13.1 17C13.1 17.55 12.55 18 12 18Z"
          fill="url(#fieryGradient)" // Reference the gradient
        />
        <path
          d="M12,6 C10.895,6 10,6.895 10,8 C10,9.105 10.895,10 12,10 C13.105,10 14,9.105 14,8 C14,6.895 13.105,6 12,6 Z"
          fill="url(#fieryGradient)"
        />

        {/* Define the gradient within the SVG */}
        <defs>
          <linearGradient id="fieryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#FFD700", stopOpacity: 1 }}
            />{" "}
            {/* Gold */}
            <stop
              offset="50%"
              style={{ stopColor: "#FF4500", stopOpacity: 1 }}
            />{" "}
            {/* Orangered */}
            <stop
              offset="100%"
              style={{ stopColor: "#8B0000", stopOpacity: 1 }}
            />{" "}
            {/* Darkred */}
          </linearGradient>
        </defs>
      </motion.svg>

      {/* The actual text */}
      <span>{children}</span>
    </div>
  );
};

export default FireText;
