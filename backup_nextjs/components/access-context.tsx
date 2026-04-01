"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessContextType {
  journeyUnlocked: boolean
  radarUnlocked: boolean
  unlockJourney: (code: string) => boolean
  unlockRadar: (code: string) => boolean
}

const AccessContext = createContext<AccessContextType | undefined>(undefined)

export function AccessProvider({ children }: { children: ReactNode }) {
  const [journeyUnlocked, setJourneyUnlocked] = useState(false)
  const [radarUnlocked, setRadarUnlocked] = useState(false)

  useEffect(() => {
    const journeyStored = localStorage.getItem("questacademy-journey")
    const radarStored = localStorage.getItem("questacademy-radar")
    if (journeyStored === "true") setJourneyUnlocked(true)
    if (radarStored === "true") setRadarUnlocked(true)
  }, [])

  const unlockJourney = (code: string): boolean => {
    if (code.toLowerCase() === "journey") {
      setJourneyUnlocked(true)
      localStorage.setItem("questacademy-journey", "true")
      return true
    }
    return false
  }

  const unlockRadar = (code: string): boolean => {
    if (code.toLowerCase() === "radar") {
      setRadarUnlocked(true)
      localStorage.setItem("questacademy-radar", "true")
      return true
    }
    return false
  }

  return (
    <AccessContext.Provider value={{ journeyUnlocked, radarUnlocked, unlockJourney, unlockRadar }}>
      {children}
    </AccessContext.Provider>
  )
}

export function useAccess() {
  const context = useContext(AccessContext)
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider")
  }
  return context
}
