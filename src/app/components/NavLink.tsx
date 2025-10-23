"use client"
import Link from "next/link"
import type React from "react"

interface NavLinkProps {
  href: string
  isActive: boolean
  children: React.ReactNode
}

const NavLink = ({ href, isActive, children }: NavLinkProps) => {
  const baseClasses =
    "block py-2 pl-3 pr-4 sm:text-lg rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative"
  const activeClasses =
    "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300"
  const inactiveClasses =
    "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600"

  return (
    <li>
      <Link href={href} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        {children}
      </Link>
    </li>
  )
}

export default NavLink
