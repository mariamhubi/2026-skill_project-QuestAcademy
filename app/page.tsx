"use client"

import { AccessProvider } from "@/components/access-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { RolesSection } from "@/components/home/roles-section"
import { BackgroundsSection } from "@/components/home/backgrounds-section"
import { BackgroundEffects } from "@/components/background-effects"

export default function HomePage() {
  return (
    <AccessProvider>
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <HowItWorksSection />
          <RolesSection />
          <BackgroundsSection />
        </main>
      </div>
    </AccessProvider>
  )
}
