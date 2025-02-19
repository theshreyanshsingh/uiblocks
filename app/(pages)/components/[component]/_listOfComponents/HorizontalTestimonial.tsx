import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  text: string;
}

const Horizontaltest: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  return (
    <div className="flex justify-center items-center flex-col overflow-hidden">
      <h2 className="text-white font-sans text-xl font-semibold mb-8">
        What People Say
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#fff] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#fff] to-transparent z-10" />

        <div className="relative overflow-hidden">
          <div className="flex">
            <motion.div
              className="flex gap-6 shrink-0"
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
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 text-white p-5 rounded-lg w-80 shrink-0"
                >
                  <p className="italic">&quot;{testimonial.text}&quot;</p>
                  <p className="mt-3 text-right text-gray-400">
                    &mdash; {testimonial.name}
                  </p>
                </div>
              ))}

              {testimonials.map((testimonial, idx) => (
                <div
                  key={`second-${idx}`}
                  className="bg-gray-800 text-white p-5 rounded-lg w-56"
                >
                  <p className="italic">&quot;{testimonial.text}&quot;</p>
                  <p className="mt-3 text-right text-gray-400">
                    &mdash; {testimonial.name}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHorizontaltest: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Alice Johnson",
      text: "Asteria UI has completely transformed the way I design interfaces. Highly recommended!",
    },
    {
      name: "David Smith",
      text: "The UI components are top-notch and save me so much time. Absolutely love it!",
    },
    {
      name: "Sophia Lee",
      text: "A must-have for developers and designers. The quality is simply outstanding!",
    },
    {
      name: "John Doe",
      text: "Asteria UI provides the best user experience. Great work by the team!",
    },
    {
      name: "Emily Brown",
      text: "The animations and smooth UI components are just perfect. Definitely worth it!",
    },
  ];

  return (
    <div className="justify-center items-center flex overflow-hidden">
      <Horizontaltest testimonials={testimonials} />
    </div>
  );
};

export default MainHorizontaltest;
