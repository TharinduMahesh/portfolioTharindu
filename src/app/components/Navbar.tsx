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
  { href: "/#skills", label: "Skills" },
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
  const [, setIsScrolledToTop] = useState(true)
  const [activeHash, setActiveHash] = useState<string>("")

  useEffect(() => {
    setIsOpen(false)

    const handleScroll = () => {
      setIsScrolledToTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Track active section on the home page using IntersectionObserver and hash changes
  useEffect(() => {
    if (typeof window === "undefined") return
    // Initialize from current hash
    setActiveHash(window.location.hash || "")

    if (pathname !== "/") return

    const sections = ["#about", "#skills", "#projects", "#contact"]
      .map((sel) => document.querySelector<HTMLElement>(sel))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))
        if (visible.length > 0) {
          const id = visible[0].target.id
          if (id) setActiveHash(`#${id}`)
        } else {
          // If none visible, consider we're at the top (Home)
          if (window.scrollY < 100) setActiveHash("")
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sections.forEach((el) => observer.observe(el))

    const onHashChange = () => setActiveHash(window.location.hash || "")
    window.addEventListener("hashchange", onHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Close mobile menu with Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-purple-500/5 h-20 md:h-24 flex items-center transition-all duration-300">
        <div className="flex items-center justify-between w-full px-6 md:px-12 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 flex-shrink-0 flex items-center gap-2"
            onClick={forceHardRefresh}
          >
            <span className="text-3xl md:text-4xl">✦</span>
            Tharindu
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block" id="navbar">
            <ul className="flex flex-row space-x-2 lg:space-x-4">
              {navLinks.map((link) => {
                const isHome = link.href === "/"
                const isActiveNonRoot = !isHome && activeHash !== "" && link.href === `/${activeHash}`
                const isActiveHome = isHome && pathname === "/" && activeHash === ""
                const isActive = isHome ? isActiveHome : isActiveNonRoot

                return (
                  <NavLink key={link.href} href={link.href} isActive={isActive}>
                    {link.label}
                  </NavLink>
                )
              })}
            </ul>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-pink-400 group-hover:scale-110 transition-transform" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#121212] bg-opacity-98 pt-20 md:hidden overflow-y-auto">
          <div className="flex flex-col items-center justify-start py-8 px-4">
            <MenuOverLay
              links={navLinks}
              currentPath={`${pathname}${activeHash}`}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
