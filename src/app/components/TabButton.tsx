"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
};

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }: Props) => {
  const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";

  return (
    <button onClick={selectTab} className="relative">
      <p className={`mr-4 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>

      {/* Animated underline */}
      <motion.div
        variants={variants}
        animate={active ? "active" : "default"}
        className="h-1 bg-purple-500 mt-[1px] mr-4 rounded-full"
      />
    </button>
  );
};

export default TabButton;
