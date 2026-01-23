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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="my-16 py-8 sm:py-12" 
    >
      <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 p-[2px] shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500">
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl py-10 px-6 sm:px-12 backdrop-blur-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievementList.map((achievement, index) => {
              const numericValue = parseInt(achievement.value.replace(/\D/g, ""), 10);
              const postfix = achievement.value.replace(/\d+/g, "");
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col justify-center items-center text-center group relative"
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-105"></div>
                  
                  <div className="relative">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent flex items-baseline justify-center mb-2">
                      <AnimatedNumbers
                        key={isInView ? "numbers-active" : "numbers-inactive"} 
                        animateToNumber={numericValue}
                        fontStyle={{ fontSize: 'inherit', fontWeight: 900 }}
                        locale="en-US"
                      />
                      <span className="ml-1 text-4xl sm:text-5xl text-purple-400">{postfix}</span> 
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-3 rounded-full"></div>
                    <p className="text-[#ADB7BE] text-sm sm:text-base font-semibold tracking-wide uppercase">{achievement.metric}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementSection;