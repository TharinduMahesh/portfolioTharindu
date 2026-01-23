
"use client";
import React from 'react';

type Props = {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
};

const ProjectTag = ({ name, onClick, isSelected }: Props) => {
  const buttonStyles = isSelected
    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
    : 'bg-white/5 border-white/10 text-[#ADB7BE] hover:border-purple-500/50 hover:text-white hover:bg-white/10';

  return (
    <button
      className={`${buttonStyles} rounded-xl border-2 px-6 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;