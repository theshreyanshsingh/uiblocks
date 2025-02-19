"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TracingBeam = () => {
  const { scrollYProgress } = useScroll();

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-red-300 w-full p-6 overflow-auto h-[100%] text-white text-3xl font-markazi flex relative">
      <div className=" w-1 h-1 bg-white rounded-full fixed  shadow-2xl">
        <motion.div
          className="bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] w-[1.5px] fixed  top-0  rounded-full "
          style={{ height: beamHeight }}
          // initial={{ filter: "blur(10px)" }}
        />
      </div>

      <div className="w-full ">
        <h1 className="text-4xl mb-4 font-semibold">
          The Last Train to Tomorrow
        </h1>
        <p className="leading-relaxed w-[800px] text-[17px]">
          "Step into an innovative browsing experience with our Tracing Beam
          component, where every scroll is more than just a simple action—it
          becomes a journey. Picture a radiant beam of light tracing its path as
          you glide down the page, revealing new layers of content with each
          move. The smooth and seamless animation gives the illusion that the
          beam is following you, guiding your exploration as if you're
          navigating a futuristic world. But it’s not just about aesthetics;
          it’s about interaction and engagement. As you scroll, the beam
          responds to your movements in real-time, making every transition feel
          like a new discovery. It brings the page to life in a way that
          enhances the narrative, making you feel connected to the content in a
          truly immersive manner. Whether you're uncovering hidden sections,
          exploring detailed information, or simply scrolling through your
          favorite content, the Tracing Beam ensures that your experience is as
          dynamic as it is engaging. It’s designed not just to attract
          attention, but to guide and direct users with purpose. The beam’s
          responsive nature makes each scroll feel intentional, a natural part
          of the user’s journey across the page. As you explore, you’ll notice
          how the beam adapts its behavior—sometimes speeding up, sometimes
          slowing down, all depending on the user's interaction. This subtlety
          is what makes the experience feel so fluid and intuitive. Imagine the
          impact it could have in a storytelling context. Instead of traditional
          scroll bars or static text, the Tracing Beam makes every interaction
          an active part of the narrative. It beckons the user to keep going,
          inviting them to explore deeper, providing a sense of curiosity and
          excitement as they scroll. This component doesn’t just serve a
          functional purpose; it creates an emotional connection, drawing users
          in as they journey through your site. Each scroll is a moment of
          discovery, and the beam is there to lead the way. From a design
          perspective, it’s an element that blends seamlessly into any layout,
          with its minimalist aesthetic ensuring that it doesn’t overpower the
          content but still manages to captivate. Whether it’s guiding the user
          through a product showcase, helping them navigate a blog, or enhancing
          the flow of a landing page, the Tracing Beam adapts to the content
          around it. It's not just a decoration; it's a fully integrated part of
          your website’s experience, designed to enhance engagement and keep
          users interested. With the Tracing Beam, your content will come alive
          in ways users haven’t experienced before, adding an interactive layer
          that’s impossible to ignore. It’s not just a component—it’s an
          experience that transforms the way users interact with your site,
          making each scroll feel like part of a continuous adventure."
        </p>
      </div>
    </div>
  );
};

export default TracingBeam;
