// src/components/AchievementSection.tsx
"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), { ssr: false });

const achievementList = [
  { metric: "Projects", value: "20+", postfix: "+" },
  { metric: "Users", value: "10+", postfix: "+" },
  { metric: "Awards", value: "5+", postfix: "+" },
  { metric: "Experience", value: "2+ Years", postfix: " Years" },
];

// Animation variants for the stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for individual items (fade-in and slight lift)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AchievementSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    // REMOVED: px-8 xl:gap-16 xl:px-16. This div now spans the full width 
    // of the container set in layout.tsx. Adjusted padding to my-12 for vertical separation.
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="my-12 py-8 sm:py-16" 
    >
      {/* 
        Inner Wrapper with Gradient Border. 
        Note: The p-1 gives the border width.
      */}
      <div className="rounded-xl bg-gradient-to-br from-blue-600 via-purple-700 to-pink-500 p-[2px]">
        {/* 
          Content Wrapper: bg-[#121212] provides the inner color.
          Added more padding inside to space content away from the border.
          Adjusted the flex layout for better spacing control on small screens.
        */}
        <div className="bg-[#121212] rounded-xl py-8 px-4 sm:px-8 flex flex-wrap justify-between">
          {achievementList.map((achievement, index) => {
            const numericValue = parseInt(achievement.value.replace(/\D/g, ""), 10);
            const postfix = achievement.value.replace(/\d+/g, "");
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                // Tailwind classes for responsive spacing and center alignment
                className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 my-4 p-2 text-center"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-white flex items-baseline">
                  <AnimatedNumbers
                    key={isInView ? "numbers-active" : "numbers-inactive"} 
                    animateToNumber={numericValue}
                    fontStyle={{ fontSize: 40, color: "#fff" }}
                    locale="en-US"
                  />
                  {/* Applied smaller font size on postfix for better visual balance */}
                  <span className="ml-1 text-3xl sm:text-4xl">{postfix}</span> 
                </h2>
                <p className="text-[#ADB7BE] text-base sm:text-lg mt-1">{achievement.metric}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementSection;