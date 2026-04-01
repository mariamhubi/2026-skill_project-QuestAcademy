"use client"

import { useState } from "react"
import { AccessProvider } from "@/components/access-context"
import { Navbar } from "@/components/navbar"
import { BackgroundEffects } from "@/components/background-effects"
import { useAccess } from "@/components/access-context"
import { 
  Users, 
  UserCog, 
  BookOpen, 
  Swords, 
  Puzzle, 
  Navigation,
  Lock,
  CheckCircle2,
  Unlock,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const stages = [
  { 
    id: 1, 
    icon: Users, 
    label: "Team Formation", 
    description: "Form your team and assign initial roles to each member"
  },
  { 
    id: 2, 
    icon: UserCog, 
    label: "Role Selection", 
    description: "Choose your specialization and background traits"
  },
  { 
    id: 3, 
    icon: BookOpen, 
    label: "Story Begins", 
    description: "The narrative unfolds and your mission is revealed"
  },
  { 
    id: 4, 
    icon: Swords, 
    label: "Challenge", 
    description: "Face obstacles and puzzles that test your skills"
  },
  { 
    id: 5, 
    icon: Puzzle, 
    label: "Puzzle Progress", 
    description: "Work together to solve complex problems"
  },
  { 
    id: 6, 
    icon: Navigation, 
    label: "Exploration", 
    description: "The real-world adventure phase begins"
  },
]

function JourneyContent() {
  const { journeyUnlocked, unlockRadar, radarUnlocked } = useAccess()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showRadarModal, setShowRadarModal] = useState(false)
  const [radarCode, setRadarCode] = useState("")
  const [radarError, setRadarError] = useState(false)
  const [radarSuccess, setRadarSuccess] = useState(false)

  const currentStep = completedSteps.length + 1
  const explorationUnlocked = completedSteps.includes(5)

  const handleStepClick = (stepId: number) => {
    if (stepId === currentStep && !completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleRadarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = unlockRadar(radarCode)
    if (result) {
      setRadarSuccess(true)
      setRadarError(false)
      setTimeout(() => {
        setShowRadarModal(false)
        setRadarSuccess(false)
        setRadarCode("")
      }, 1000)
    } else {
      setRadarError(true)
    }
  }

  if (!journeyUnlocked) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="glass rounded-2xl p-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Journey Locked
          </h2>
          <p className="text-muted-foreground mb-8">
            Enter the access code on the home page to unlock your adventure journey.
          </p>
          <Link href="/">
            <Button className="glow-sm gap-2">
              <Unlock className="h-4 w-4" />
              Enter Access Code
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Intro */}
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Click each step to progress through your adventure. Complete all steps to unlock the exploration phase.
      </p>

      {/* Journey Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {stages.map((stage, index) => {
          const isCompleted = completedSteps.includes(stage.id)
          const isActive = stage.id === currentStep
          const isLocked = stage.id > currentStep

          return (
            <button
              key={stage.id}
              onClick={() => handleStepClick(stage.id)}
              disabled={isLocked || isCompleted}
              className={cn(
                "relative glass rounded-xl p-6 text-left transition-all duration-300 animate-fade-in-up group",
                isCompleted && "border-primary/50 bg-primary/5",
                isActive && "border-primary/70 cursor-pointer hover:border-primary hover:bg-primary/10 hover:scale-[1.02]",
                isLocked && "opacity-50 cursor-not-allowed"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step number badge */}
              <div className={cn(
                "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"
              )}>
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : stage.id}
              </div>

              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                isCompleted ? "bg-primary/20 text-primary" : isActive ? "bg-primary/10 text-primary" : "bg-secondary/50 text-muted-foreground"
              )}>
                {isLocked ? <Lock className="h-5 w-5" /> : <stage.icon className="h-5 w-5" />}
              </div>

              {/* Content */}
              <h3 className={cn(
                "font-semibold mb-2 transition-colors",
                isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {stage.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-primary/50 ring-offset-2 ring-offset-background pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* Exploration Button */}
      {explorationUnlocked && (
        <div className="text-center animate-fade-in-up">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <Navigation className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Exploration Phase Ready</h3>
            <p className="text-muted-foreground text-sm mb-6">
              You have completed all preparation steps. Enter the radar code to begin real-world exploration.
            </p>
            {radarUnlocked ? (
              <Link href="/radar">
                <Button className="glow-md gap-2 w-full">
                  <Navigation className="h-4 w-4" />
                  Open Radar
                </Button>
              </Link>
            ) : (
              <Button 
                className="glow-md gap-2 w-full"
                onClick={() => setShowRadarModal(true)}
              >
                <Lock className="h-4 w-4" />
                Enter Exploration Phase
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Progress</span>
          <div className="flex gap-1.5">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  completedSteps.includes(stage.id) ? "bg-primary" : "bg-secondary"
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{completedSteps.length}/{stages.length}</span>
        </div>
      </div>

      {/* Radar Code Modal */}
      <Dialog open={showRadarModal} onOpenChange={setShowRadarModal}>
        <DialogContent className="glass-strong border-border/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">Enter Radar Code</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Enter the exploration code to access the radar and map.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRadarSubmit} className="space-y-4 mt-4">
            <Input
              value={radarCode}
              onChange={(e) => {
                setRadarCode(e.target.value)
                setRadarError(false)
              }}
              placeholder="Enter radar code..."
              className="text-center text-lg py-6 bg-secondary/50 border-border/30 focus:border-primary"
              autoFocus
            />
            {radarError && (
              <div className="flex items-center justify-center gap-2 text-destructive text-sm">
                <XCircle className="h-4 w-4" />
                <span>Invalid code</span>
              </div>
            )}
            {radarSuccess && (
              <div className="flex items-center justify-center gap-2 text-primary text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Radar unlocked!</span>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full glow-sm"
              disabled={!radarCode.trim() || radarSuccess}
            >
              Unlock Radar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function JourneyPage() {
  return (
    <AccessProvider>
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <Navbar />
        <main className="relative z-10 pt-32 pb-32 px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-primary text-glow">Journey</span>
            </h1>
          </div>
          <JourneyContent />
        </main>
      </div>
    </AccessProvider>
  )
}
