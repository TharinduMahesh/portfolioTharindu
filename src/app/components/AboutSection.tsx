// src/components/AboutSection.tsx
"use client";

import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { motion } from 'framer-motion'; // Import motion for animation

// Corrected TabData structure
const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      // Enhanced list styling for better readability and spacing
      <ul className='list-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-lg'>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>Node.js</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>React</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>Next.js</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>TypeScript</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>Tailwind CSS</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>Express</li>
        <li className='bg-[#181818] p-2 rounded-lg hover:text-purple-400 transition-colors'>MongoDB</li>
      </ul>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-5 space-y-3 text-lg'>
        <li className='text-gray-300'>Bachelor of Science in Computer Science, <span className='text-white font-semibold'>XYZ University</span> (2018 - 2022)</li>
        <li className='text-gray-300'>Master of Science in Software Engineering, <span className='text-white font-semibold'>ABC University</span> (2022 - Present)</li>
      </ul>
    ),
  },
  {
    title: 'Certification',
    id: 'certification',
    content: (
      <ul className='list-disc pl-5 space-y-3 text-lg'>
        <li className='text-gray-300'>Certified Full Stack Developer <span className='text-purple-400'>[View Credential]</span></li>
        <li className='text-gray-300'>React.js Certification <span className='text-purple-400'>[View Credential]</span></li>
        <li className='text-gray-300'>Node.js Certification <span className='text-purple-400'>[View Credential]</span></li>
      </ul>
    ),
  },
];

// Animation variants for the tab content
const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};


const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const activeTabContent = TAB_DATA.find((t) => t.id === tab)?.content;

  return (
    // Added margin-y for separation and ID for navigation
    <section className="text-white my-12" id="about">
      {/* Outer gradient wrapper for the attractive border effect */}
      <div className="rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-[2px]">
        {/* Inner div for the actual content, acting as the background */}
        <div className='bg-[#121212] rounded-xl md:grid md:grid-cols-2 gap-8 items-center p-8 xl:gap-16 sm:p-12'> {/* Reduced inner padding for consistency */}
          
          {/* IMAGE BLOCK */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/about.jpg"
              alt="About Me Image"
              width={500}
              height={500}
              className='rounded-xl shadow-2xl'
            />
          </motion.div>

          {/* TEXT/CONTENT BLOCK */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className='mt-8 md:mt-0 text-left flex flex-col h-full'
          >
            <h2 className='text-4xl font-bold mb-6 text-white'>About Me</h2>
            <p className='text-lg text-[#ADB7BE] leading-relaxed mb-6'>
              I am a software engineer with a passion for building scalable web
              applications. I specialize in full-stack development, focusing on
              creating efficient and user-friendly interfaces. With a strong
              foundation in both front-end and back-end technologies, I strive to
              deliver high-quality solutions that meet the needs of users and
              businesses alike.
            </p>

            {/* Container for the Tab Buttons */}
            <div className='flex flex-row justify-start mt-4 border-b border-[#33353F]'> {/* Added bottom border for separation */}
              {TAB_DATA.map((tabItem) => (
                <TabButton
                  key={tabItem.id}
                  selectTab={() => handleTabChange(tabItem.id)}
                  active={tab === tabItem.id}
                >
                  {tabItem.title}
                </TabButton>
              ))}
            </div>

            {/* Container for the Tab Content with Animation */}
            {/* Note: Key is used to force remount/re-run of the animation */}
            <motion.div
                key={tab} 
                variants={contentVariants}
                initial="initial"
                animate="animate"
                className="mt-6 min-h-[150px]" // Min-height prevents layout shift when changing tabs
            >
              {activeTabContent}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;