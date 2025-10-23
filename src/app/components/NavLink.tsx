// src/components/NavLink.tsx
import Link from "next/link";
import React from 'react'; 

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean; 
};

const NavLink = ({ href, children, isActive }: NavLinkProps) => {
  // Base classes for consistent link appearance
  const defaultClasses = "block py-2 pl-3 pr-4 sm:text-lg rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative";

  // Attractive Styling: Gradient Underline for Active, Gradient Text for Hover
  const activeClasses = "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300";
  const inactiveClasses = "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600";

  return (
    <li>
      <Link
        href={href}
        // Combined classes for styling
        className={`${defaultClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default NavLink;