"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAccess } from "./access-context"
import { Atom, Lock } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", protectedKey: null },
  { name: "Rules", href: "/rules", protectedKey: null },
  { name: "Journey", href: "/journey", protectedKey: "journey" as const },
  { name: "Radar", href: "/radar", protectedKey: "radar" as const },
]

export function Navbar() {
  const pathname = usePathname()
  const { journeyUnlocked, radarUnlocked } = useAccess()

  const isItemLocked = (protectedKey: string | null) => {
    if (protectedKey === "journey") return !journeyUnlocked
    if (protectedKey === "radar") return !radarUnlocked
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-strong mx-auto mt-4 max-w-4xl rounded-full px-4 sm:px-8 py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-all duration-300 hover:text-primary group"
          >
            <Atom className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-180" />
            <span className="hidden sm:inline">QuestAcademy</span>
          </Link>

          {/* Nav Links */}
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const isLocked = isItemLocked(item.protectedKey)

              return (
                <li key={item.name}>
                  <Link
                    href={isLocked ? "#" : item.href}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-3 sm:px-5 py-2 text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "text-primary-foreground bg-primary shadow-lg shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                      isLocked && "opacity-40 cursor-not-allowed"
                    )}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    {isLocked && <Lock className="h-3 w-3" />}
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}
