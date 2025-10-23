// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    // Outer container with reduced opacity background and a full-width gradient border at the top
    <footer className='border-t border-purple-500/30 text-white mt-12 bg-[#121212] bg-opacity-80 backdrop-blur-sm'>
        
        {/*
          This div creates the top gradient line, sitting right below the border-t.
          Height: 1px, Full Width, Gradient Background.
        */}
        <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

        {/* Inner Content - The 'container' classes from layout.tsx ensure it aligns with the main content */}
        {/* We use px-4 and mx-auto here *only* to ensure alignment if this component is used outside the main layout div */}
        <div className='container mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row justify-between items-center'> 
            
            {/* LOGO - Use the same gradient text as the Navbar for consistency */}
            <Link 
              href="/" 
              className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-0 hover:drop-shadow-lg transition-all duration-300"
            >
              PortFolio.
            </Link>

            {/* Copyright */}
            <p className='text-slate-400 text-sm'>
                &copy; {new Date().getFullYear()} All rights reserved. Developed by Tharindu Mahesh.
            </p>
        </div>
    </footer>
  )
}

export default Footer;