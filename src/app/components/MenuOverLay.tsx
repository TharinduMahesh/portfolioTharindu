// src/components/MenuOverLay.tsx
import React from 'react';
import Link from 'next/link'; // Import Link for the Home item
import NavLink from './NavLink';

type LinkItem = {
  href: string;
  label: string;
};

type MenuOverlayProps = {
  links: LinkItem[];
  currentPath: string;
};

// Helper function for hard refresh
const forceHardRefresh = () => {
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
      window.location.reload();
  }
};

// --- STYLING LOGIC (Copied from Navbar for consistency) ---
const homeLinkBaseClasses = "block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative w-full text-center";
const homeLinkActiveClasses = "text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300";
const homeLinkInactiveClasses = "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600";
// --------------------------------------------------------

const MenuOverLay = ({ links, currentPath }: MenuOverlayProps) => {
  return (
    // FIX: Removed h-full w-full from ul to allow flex-grow in Navbar to handle dimensions
    <ul className='flex flex-col py-4 items-center space-y-4 w-full'> 
        {links.map((link) => (
             link.href === '/' ? (
                <li key={link.href} className='w-full text-center'>
                  {/* FIX: Use <Link> component */}
                  <Link
                    href="/"
                    onClick={forceHardRefresh}
                    className={`${homeLinkBaseClasses} ${
                        currentPath === '/' ? homeLinkActiveClasses : homeLinkInactiveClasses
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <NavLink
                    key={link.href}
                    href={link.href}
                    // Simple active check for full dedicated pages
                    isActive={currentPath === link.href} 
                >
                    {link.label}
                </NavLink>
              )
        ))}
    </ul>
  )
}

export default MenuOverLay;