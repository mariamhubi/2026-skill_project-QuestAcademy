"use client"

import { useState } from "react"
import { AccessProvider } from "@/components/access-context"
import { Navbar } from "@/components/navbar"
import { BackgroundEffects } from "@/components/background-effects"
import { useAccess } from "@/components/access-context"
import { Lock, Unlock, CheckCircle2, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function RadarVisual() {
  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-500/10 bg-[#020611] shadow-[0_0_60px_rgba(0,180,255,0.08)]">
          {/* background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,180,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,180,255,0.06),transparent_30%)]" />

          {/* subtle border glow */}
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-cyan-400/10 pointer-events-none" />

          <div className="relative z-10 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              Radar
            </h2>

            <div className="flex items-center justify-center">
              <div className="relative w-[520px] h-[520px] max-w-full aspect-square">
                {/* Main circle */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/30" />

                {/* Rings */}
                <div className="absolute inset-[14%] rounded-full border border-cyan-500/30" />
                <div className="absolute inset-[29%] rounded-full border border-cyan-500/30" />
                <div className="absolute inset-[44%] rounded-full border border-cyan-500/30" />

                {/* Cross lines */}
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-500/25" />
                <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-cyan-500/25" />

                {/* Rotating sweep wrapper */}
                <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-radar-sweep">
                  {/* Sweep cone */}
                  <div
                    className="absolute left-1/2 top-1/2 w-1/2 h-1/2 origin-top-left opacity-80"
                    style={{
                      clipPath: "polygon(0 0, 0 100%, 75% 100%)",
                      background:
                        "linear-gradient(135deg, rgba(0,180,255,0.28), rgba(0,180,255,0.06), transparent)",
                    }}
                  />

                  {/* soft sweep glow */}
                  <div
                    className="absolute left-1/2 top-1/2 w-[58%] h-[58%] rounded-full blur-2xl opacity-20"
                    style={{
                      transform: "translate(-50%, -50%)",
                      background:
                        "conic-gradient(from 0deg, rgba(0,180,255,0.35), transparent 70deg, transparent 360deg)",
                    }}
                  />
                </div>

                {/* Center glow */}
                <div className="absolute left-1/2 top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.9)]" />
                <div className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40" />

                {/* Dots */}
                <div className="absolute top-[24%] left-[58%] w-3 h-3 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                <div className="absolute top-[39%] left-[72%] w-3 h-3 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                <div className="absolute top-[64%] left-[29%] w-3 h-3 rounded-full bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.4)]" />

                {/* ambient glow */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_52%,rgba(0,180,255,0.02)_70%,transparent_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChallengeProgression() {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
  const currentChallenge = completedChallenges.length + 1
  const allComplete = completedChallenges.length === 7

  const handleChallengeClick = (id: number) => {
    if (id === currentChallenge && !completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id])
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground text-center">
        Challenge Progression
      </h3>

      {allComplete ? (
        <div className="glass rounded-xl p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-2">
            Congratulations!
          </h4>
          <p className="text-muted-foreground">
            You have completed the mission.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((id) => {
            const isCompleted = completedChallenges.includes(id)
            const isActive = id === currentChallenge
            const isLocked = id > currentChallenge

            return (
              <button
                key={id}
                onClick={() => handleChallengeClick(id)}
                disabled={isLocked || isCompleted}
                className={cn(
                  "relative w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300",
                  isCompleted &&
                    "bg-primary/20 border-2 border-primary text-primary",
                  isActive &&
                    "bg-primary/10 border-2 border-primary/70 text-foreground cursor-pointer hover:bg-primary/20 hover:scale-110",
                  isLocked &&
                    "bg-secondary/30 border border-border/50 text-muted-foreground/50 cursor-not-allowed"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-bold">{id}</span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {!allComplete && (
        <p className="text-center text-sm text-muted-foreground">
          Click challenge {currentChallenge} to complete it
        </p>
      )}
    </div>
  )
}

function RadarContent() {
  const { radarUnlocked } = useAccess()

  if (!radarUnlocked) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="glass rounded-2xl p-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Radar Locked
          </h2>
          <p className="text-muted-foreground mb-8">
            Complete the Journey steps and enter the radar code to access this
            area.
          </p>
          <Link href="/journey">
            <Button className="glow-sm gap-2">
              <Unlock className="h-4 w-4" />
              Go to Journey
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Radar */}
      <div className="animate-fade-in-up">
        <RadarVisual />
      </div>

      {/* Challenge Progression */}
      <div
        className="glass rounded-2xl p-6 sm:p-8 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <ChallengeProgression />
      </div>
    </div>
  )
}

export default function RadarPage() {
  return (
    <AccessProvider>
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <Navbar />

        <main className="relative z-10 pt-32 pb-24 px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Radar
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore the radar and complete all challenges
            </p>
          </div>

          <RadarContent />
        </main>
      </div>
    </AccessProvider>
  )
}