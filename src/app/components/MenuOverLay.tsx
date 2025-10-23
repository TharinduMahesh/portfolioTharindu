"use client"
import Link from "next/link"

interface MenuOverLayProps {
  links: Array<{ href: string; label: string }>
  currentPath: string
  onClose: () => void
}

const MenuOverLay = ({ links, currentPath, onClose }: MenuOverLayProps) => {
  const baseClasses =
    "block py-3 px-4 text-lg rounded transition-all duration-300 font-medium tracking-wide relative text-center"
  const activeClasses = "text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text"
  const inactiveClasses =
    "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600"

  return (
    <ul className="flex flex-col gap-4 w-full max-w-xs">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onClose}
            className={`${baseClasses} ${currentPath === link.href ? activeClasses : inactiveClasses}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MenuOverLay
