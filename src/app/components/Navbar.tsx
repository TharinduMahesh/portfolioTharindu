// src/components/Navbar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverLay from './MenuOverLay';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label : 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  // --- STYLING LOGIC ---
  const baseClasses = "block py-2 pl-3 pr-4 sm:text-lg rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative";
  const activeClasses = "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300";
  const inactiveClasses = "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600";
  // ---------------------

  useEffect(() => {
    // Close mobile menu on path change
    setIsOpen(false);
    
    // Logic to determine scroll position
    const handleScroll = () => {
      setIsScrolledToTop(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  
  // *** CRITICAL MOBILE FIX: Scroll Lock ***
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-95 backdrop-blur-sm shadow-xl h-20 md:h-24 flex items-center transition-shadow duration-300'> 
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 w-full">
        {/* LOGO LINK - Forces Hard Refresh */}
        <a 
          href="/" 
          className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:drop-shadow-lg transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          PortFolio.
        </a>
        
        {/* Mobile Menu Button */}
        <div className='mobile-menu block md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition-colors duration-200 group"
          >
            {isOpen 
              ? <XMarkIcon className='h-6 w-6 text-pink-500 group-hover:text-white transition-colors' /> 
              : <Bars3Icon className='h-6 w-6 text-purple-400 group-hover:text-white transition-colors' />}
          </button>
        </div>
        
        {/* Desktop Menu */}
        <div className='menu hidden md:block md:w-auto' id='navbar'>
          <ul className="flex p-4 md:p-0 flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              link.href === '/' ? (
                <li key={link.href}>
                  <a
                    href="/"
                    onClick={() => window.location.reload()}
                    className={`${baseClasses} ${pathname === '/' ? activeClasses : inactiveClasses}`}
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={pathname === link.href}
                >
                  {link.label}
                </NavLink>
              )
            ))}
          </ul>
        </div>
      </div>
      
      {/* 
        *** MOBILE MENU OVERLAY: The definitive fix for full screen on mobile ***
        Key: fixed inset-0 z-[60] for full screen coverage above everything.
      */}
      {isOpen && (
        <div className='fixed inset-0 z-[60] bg-[#121212] flex flex-col transition-opacity duration-300 ease-in-out'> 
            {/* Header for Close Button/Logo - Solid background and fixed height */}
            <div className='flex justify-between items-center px-4 h-20 md:h-24 bg-[#121212] shadow-lg'> 
                 {/* Re-display the logo */}
                 <a 
                    href="/" 
                    className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                    onClick={() => { setIsOpen(false); window.location.reload(); }}
                 >
                    PortFolio.
                </a>
                <button onClick={() => setIsOpen(false)} className='text-white p-2'>
                    <XMarkIcon className='h-8 w-8 text-pink-500 hover:text-white' />
                </button>
            </div>
            
            {/* Menu Links Area - Fills the rest of the screen and centers content */}
            <div className="flex-grow overflow-y-auto flex items-center justify-center">
               <MenuOverLay links={navLinks} currentPath={pathname} /> 
            </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;