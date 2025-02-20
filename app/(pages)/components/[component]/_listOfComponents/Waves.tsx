"use client";
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
        gradient.addColorStop(0, `rgba(79, 172, 254, ${wave.opacity})`);
        gradient.addColorStop(0.5, `rgba(180, 101, 218, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(79, 172, 254, ${wave.opacity})`);

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
        className="absolute text-white text-2xl text-balance sm:text-5xl font-sans font-semibold text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex justify-center">{text}</div>
      </motion.div>
    </div>
  );
};

const MainWaves: React.FC = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden rounded-xl">
      <Waves text="This is how waves look!" />
    </div>
  );
};

export default MainWaves;
