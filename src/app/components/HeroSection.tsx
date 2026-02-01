// src/components/HeroSection.tsx
"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 relative" id="home">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 sm:col-span-7 text-center sm:text-left"
        >
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          >          </motion.div> */}

          <h1 className="text-white mb-4 sm:mb-6 text-3xl sm:text-5xl lg:text-7xl leading-tight lg:leading-tight font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient">
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
              className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            />
          </h1>
          <p className="text-[#ADB7BE] text-sm sm:text-base lg:text-lg mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto sm:mx-0 px-2 sm:px-0">
            A passionate software engineer specializing in full-stack
            web development. Building scalable applications and
            crafting efficient, user-friendly interfaces that solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start px-2 sm:px-0">
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50 text-white font-bold text-sm sm:text-base w-full sm:w-auto transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get in Touch
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>

            <Link href="/tharindu_mahesh.pdf" download="tharindu_mahesh.pdf" target="_blank" rel="noopener noreferrer" passHref>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/5 border-2 border-purple-500/50 backdrop-blur-sm hover:bg-purple-500/10 hover:border-purple-400 text-white font-bold text-sm sm:text-base w-full sm:w-auto transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <div className="col-span-12 sm:col-span-5 flex justify-center sm:justify-end mt-8 sm:mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-1 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[480px] lg:h-[480px] max-w-full shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border-4 border-white/5">
              <Image
                src="/images/mahesh.png"
                alt="Hero Image"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover hover:scale-110 transition-transform duration-500"
                width={450}
                height={450}
                priority
              />
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full blur-md animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </motion.div>
        </div>
      </div>
    </section>


  );
};

export default HeroSection;