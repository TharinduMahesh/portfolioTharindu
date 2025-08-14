"use client"
import Link from 'next/link'
import React ,{ useState} from 'react'
import NavLink from './NavLink'
import { Bars3Icon,XMarkIcon } from '@heroicons/react/16/solid'
import MenuOverLay from './MenuOverLay'

const navLinks = [
  { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-90'>
     <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href="/" className="text-2xl md:text-5xl text-white font-semibold">
        Logo
        </Link>
        <div className='mobile-menu block md:hidden'>
            {
                !isOpen ? (
                    <button onClick={() => setIsOpen(true)} 
                    className=" flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover: border-white">
                        <Bars3Icon className='h-5'/></button>
                ) : (
                    <button onClick={() => setIsOpen(false)} 
                    className=" flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover: border-white">
                        <XMarkIcon className='h-5'/></button>
                )
            }
        </div>
        <div className='menu hidden md:block md:w-auto ' id='navbar'>
            <ul className="flex p-4 md:p-0 flex-row md:space-x-8 mt-0">
                {navLinks.map((link) => (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                ))}
            </ul>
        </div>
     </div>
     {isOpen && (
        <div className='mobile-menu-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-20'>
            <div className='flex justify-end p-4'>
                <button onClick={() => setIsOpen(false)} className='text-white'>
                    <XMarkIcon className='h-6 w-6' />
                </button>
            </div>
            <MenuOverLay links={navLinks} />
        </div>
     )}
    </nav>
  )
}

export default Navbar
