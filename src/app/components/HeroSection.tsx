// src/components/HeroSection.tsx
"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16 py-8" id="home">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 sm:col-span-7 text-center sm:text-left"
        >
          {/* 
            ADJUSTED FONT SIZES HERE:
            - text-3xl (from text-4xl): Smaller base size for mobile (30px from 36px)
            - sm:text-4xl (from sm:text-5xl): Smaller for tablet (36px from 48px)
            - lg:text-6xl (from lg:text-7xl): Slightly smaller for large screens (60px from 72px)
          */}
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Hello, I&apos;m{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Tharindu Mahesh",
                1500,
                "Web Developer",
                1500,
                "AI ML Engineer",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block"
            />
          </h1>
          {/* Paragraph text remains the same, which is a good size: 16px (base) up to 20px (lg) */}
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-8 lg:text-xl leading-relaxed">
            I&apos;m a passionate software engineer specializing in full-stack
            web development. I thrive on building scalable applications and
            crafting efficient, user-friendly interfaces that solve real-world problems.
            Let&apos;s create something impactful together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            {/* Button sizes are generally fine (text-lg is 18px), but you could reduce it to text-base if needed */}
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 hover:from-purple-700 hover:via-blue-600 hover:to-pink-600 text-white font-semibold text-lg w-full sm:w-auto transition-all duration-300 shadow-lg cursor-pointer"
              >
                Get in Touch
              </motion.button>
            </Link>

            <Link href="/your-cv.pdf" target="_blank" rel="noopener noreferrer" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-transparent border-2 border-purple-500 hover:bg-purple-500 hover:text-white text-purple-500 font-semibold text-lg w-full sm:w-auto transition-all duration-300 shadow-md cursor-pointer"
              >
                Download CV
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <div className="col-span-12 sm:col-span-5 flex justify-center sm:justify-end mt-10 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-1 w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] max-w-full"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#181818]">
              <Image
                src="/images/mahesh.png"
                alt="Hero Image"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
                width={400}
                height={400}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;