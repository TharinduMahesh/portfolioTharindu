
"use client";
import React from 'react';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
};

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }: Props) => {
  return (
    <div className="group rounded-2xl overflow-hidden bg-gradient-to-br from-[#181818] to-[#0a0a0a] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
      <div
        className='h-52 md:h-64 relative overflow-hidden'
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60'></div>
        <div className='overlay absolute inset-0 bg-gradient-to-br from-purple-900/90 to-pink-900/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm'>
          <Link href={gitUrl} className='group/link'>
            <div className='h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 hover:border-purple-400 hover:scale-110 transition-all duration-300 flex items-center justify-center'>
              <CodeBracketIcon className='h-7 w-7 text-white' />
            </div>
          </Link>
          <Link href={previewUrl} className='group/link'>
            <div className='h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-pink-500/30 hover:border-pink-400 hover:scale-110 transition-all duration-300 flex items-center justify-center'>
              <EyeIcon className='h-7 w-7 text-white' />
            </div>
          </Link>
        </div>
      </div>
      <div className='text-white py-6 px-5'>
        <h5 className='text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300'>{title}</h5>
        <p className='text-[#ADB7BE] text-sm leading-relaxed'>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;