// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='border-t border-white/5 text-white mt-12 sm:mt-16 bg-gradient-to-b from-[#0a0a0a]/50 to-[#0a0a0a] backdrop-blur-xl relative'>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <div className='container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10'> 
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* LOGO & Description */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <Link 
                      href="/" 
                      className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-2xl sm:text-3xl">✦</span>
                      Tharindu
                    </Link>
                    <p className="text-[#ADB7BE] text-xs sm:text-sm text-center md:text-left max-w-xs">
                        Building digital experiences with passion and precision
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex gap-6 sm:gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-2 sm:mb-3 text-xs sm:text-sm">Quick Links</h4>
                        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><Link href="/#about" className="text-[#ADB7BE] hover:text-purple-400 transition-colors">About</Link></li>
                            <li><Link href="/#skills" className="text-[#ADB7BE] hover:text-purple-400 transition-colors">Skills</Link></li>
                            <li><Link href="/#projects" className="text-[#ADB7BE] hover:text-purple-400 transition-colors">Projects</Link></li>
                            <li><Link href="/#contact" className="text-[#ADB7BE] hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 text-center">
                <p className='text-[#ADB7BE] text-xs sm:text-sm'>
                    © {new Date().getFullYear()} <span className="text-white font-semibold">Tharindu Mahesh</span>. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer;