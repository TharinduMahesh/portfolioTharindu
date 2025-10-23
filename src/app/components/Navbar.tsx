"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverLay from "./MenuOverLay"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
]

const forceHardRefresh = () => {
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    window.location.reload()
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isScrolledToTop, setIsScrolledToTop] = useState(true)

  const baseClasses =
    "block py-2 pl-3 pr-4 sm:text-lg rounded md:p-0 transition-all duration-300 font-medium tracking-wide relative"
  const activeClasses =
    "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-300"
  const inactiveClasses =
    "text-[#ADB7BE] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600"

  useEffect(() => {
    setIsOpen(false)

    const handleScroll = () => {
      setIsScrolledToTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-95 backdrop-blur-sm shadow-xl h-20 md:h-24 flex items-center transition-shadow duration-300">
        <div className="flex items-center justify-between w-full px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:drop-shadow-lg transition-all duration-300 flex-shrink-0"
            onClick={forceHardRefresh}
          >
            PortFolio.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block" id="navbar">
            <ul className="flex flex-row space-x-8">
              {navLinks.map((link) =>
                link.href === "/" ? (
                  <li key={link.href}>
                    <Link
                      href="/"
                      onClick={forceHardRefresh}
                      className={`${baseClasses} ${pathname === "/" ? activeClasses : inactiveClasses}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <NavLink key={link.href} href={link.href} isActive={pathname === link.href}>
                    {link.label}
                  </NavLink>
                ),
              )}
            </ul>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition-colors duration-200 group flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-pink-500 group-hover:text-white transition-colors" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-purple-400 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#121212] bg-opacity-98 pt-20 md:hidden overflow-y-auto">
          <div className="flex flex-col items-center justify-start py-8 px-4">
            <MenuOverLay links={navLinks} currentPath={pathname} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
