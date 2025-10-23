// src/components/MenuOverLay.tsx
import React from 'react';
import NavLink from './NavLink';

type LinkItem = {
  href: string;
  label: string;
};

type MenuOverlayProps = {
  links: LinkItem[];
  currentPath: string;
};

const MenuOverLay = ({ links, currentPath }: MenuOverlayProps) => {
  // Define the common styling for the Home link
  const homeLinkBaseClasses = "block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative";
  const homeLinkActiveClasses = "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300";
  const homeLinkInactiveClasses = "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600";

  return (
    <ul className='flex flex-col py-4 items-center'>
        {links.map((link) => (
             link.href === '/' ? (
                <li key={link.href} className='w-full text-center'>
                  <a
                    href="/"
                    onClick={() => window.location.reload()}
                    className={`${homeLinkBaseClasses} ${
                        currentPath === '/' ? homeLinkActiveClasses : homeLinkInactiveClasses
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <NavLink
                    key={link.href}
                    href={link.href}
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