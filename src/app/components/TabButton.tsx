
"use client";
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  active: boolean;
  selectTab: () => void; 
  children: React.ReactNode;
};

const TabButton = ({ active, selectTab, children }: Props) => {
  const buttonClasses = active
    ? 'text-white'
    : 'text-[#ADB7BE]';

  return (
    <button onClick={selectTab}>
      <p className={`mr-4 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
      {active && (
        <motion.div
          layoutId="underline"
          className="h-1 bg-purple-500 mt-1px mr-4 rounded-full "
        ></motion.div>
      )}
    </button>
  );
};

export default TabButton;