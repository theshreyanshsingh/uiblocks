"use client";
import React, { useEffect, useState } from "react";

type TimerProps = {
  time: number; // Total time in milliseconds (e.g., 3 days)
};

const Timer: React.FC<TimerProps> = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="text-black text-sm font-sans font-medium">
      {"   " + formatTime(timeLeft)}
      {timeLeft <= 0 && <h3>The timer has ended!</h3>}
    </div>
  );
};

export default Timer;
