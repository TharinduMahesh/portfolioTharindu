// src/components/AboutSection.tsx

"use client";

import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';

// Corrected TabData structure
const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className='list-disc pl-2'>
        <li>Node.js</li>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Express</li>
        <li>MongoDB</li>
      </ul>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-2'>
        <li>Bachelor of Science in Computer Science, XYZ University</li>
        <li>Master of Science in Software Engineering, ABC University</li>
      </ul>
    ),
  },
  {
    title: 'Certification',
    id: 'certification',
    content: (
      <ul className='list-disc pl-2'>
        <li>Certified Full Stack Developer</li>
        <li>React.js Certification</li>
        <li>Node.js Certification</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  // Find the content of the currently active tab
  const activeTabContent = TAB_DATA.find((t) => t.id === tab)?.content;

  return (
    <section className="text-white" id="about">
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image
          src="/images/about.jpg"
          alt="About Me Image"
          width={500}
          height={500}
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold mb-4 text-white'>About Me</h2>
          <p className='text-base lg:text-lg'>
            I am a software engineer with a passion for building scalable web
            applications. I specialize in full-stack development, focusing on
            creating efficient and user-friendly interfaces. With a strong
            foundation in both front-end and back-end technologies, I strive to
            deliver high-quality solutions that meet the needs of users and
            businesses alike.
          </p>

          {/* Container for the Tab Buttons */}
          <div className='flex flex-row justify-start mt-8'>
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

          {/* Container for the Tab Content (displayed BELOW the buttons) */}
          <div className="mt-8">
            {activeTabContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;