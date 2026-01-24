// src/components/AboutSection.tsx
"use client";

import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { motion } from 'framer-motion'; // Import motion for animation

// Corrected TabData structure
const TAB_DATA = [
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-5 space-y-3 text-lg'>
        <li className='text-gray-300'>
          <span className='text-white font-semibold'>B.Sc. (Hons) in Information Technology</span><br/>
          University of Moratuwa <span className='text-purple-400'>(2023 - Present)</span><br/>
          <span className='text-sm text-gray-400'>GPA: 3.47/4.0</span>
        </li>
        <li className='text-gray-300'>
          <span className='text-white font-semibold'>GCE Advanced Level - Physical Science</span><br/>
          Kegalu Vidyalaya, Kegalle <span className='text-purple-400'>(2021)</span><br/>
          <span className='text-sm text-gray-400'>Combined Mathematics: B | Physics: B | Chemistry: B | Z-Score: 1.657</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Achievements',
    id: 'achievements',
    content: (
      <ul className='list-disc pl-5 space-y-2 text-base'>
        <li className='text-gray-300'>SpiritX 2025 - Inter-University Development Competition</li>
        <li className='text-gray-300'>Xcelerate 2025 - Team Innovexa (MoraSpirit 360)</li>
        <li className='text-gray-300'>MoraXtreme 9.0 (2024) - Coding Competition Participant</li>
        <li className='text-gray-300'>Committee Member - NFB Championship 2024 (IEEE)</li>
        <li className='text-gray-300'>Volleyball Champion - Freshers&apos; Meet 2023</li>
        <li className='text-gray-300'>FIT CodeRush 2023 - INTECS</li>
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
  const [tab, setTab] = useState('education');
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
              I am a third-year IT undergraduate at the University of Moratuwa with a strong passion for 
              Artificial Intelligence and Machine Learning. I specialize in developing intelligent, scalable 
              applications using cutting-edge AI technologies including RAG systems, LangChain, LangGraph, 
              and LLMs. My expertise spans full-stack development with React, Next.js, Python, and FastAPI, 
              combined with deep learning frameworks for building autonomous multi-agent systems, conversational 
              AI chatbots, and neural network architectures. I&apos;m driven to create innovative solutions that 
              leverage AI to solve real-world problems and deliver exceptional user experiences.
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