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
    <div className="overflow-hidden rounded-xl">
      <div
        ref={containerRef}
        className={`relative pn:max-sm:w-[400px] w-[1000px] h-[450px] ${backgroundColor}`}
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
        <div className="flex justify-center items-center h-full text-xl sm:text-6xl font-sans font-bold text-white">
          {text}
        </div>
      </div>
    </div>
  );
};

const MainFallingBeam: React.FC = () => {
  return (
    <div className="justify-center items-center flex rounded-xl overflow-hidden h-full w-full">
      <FallingBeam
        text="Falling Beams"
        beamCount={100}
        backgroundColor="bg-black"
      />
    </div>
  );
};

export default MainFallingBeam;
