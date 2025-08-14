
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
    <div>
      <div
        className='h-52 md:h-72 rounded-t-xl relative group'
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
<div className='overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-85 transition-all duration-700'>          <Link href={gitUrl} className='h-10 w-10 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-purple-500 group/link'>
            <CodeBracketIcon className='h-6 w-6 text-[#bbadbe] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-purple-500' />
          </Link>
          <Link href={previewUrl} className='h-10 w-10 border-2 relative rounded-full border-[#ADB7BE] hover:border-purple-500 group/link'>
            <EyeIcon className='h-6 w-6 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-purple-500' />
          </Link>
        </div>
      </div>
      <div className='text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4'>
        <h5 className='text-xl font-semibold mb-2'>{title}</h5>
        <p className='text-[#ADB7BE]'>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;