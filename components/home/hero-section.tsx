"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAccess } from "@/components/access-context"
import { Rocket, BookOpen, CheckCircle2, XCircle, Lock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [showModal, setShowModal] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { journeyUnlocked, unlockJourney, unlockRadar } = useAccess()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const journeyResult = unlockJourney(code)
    const radarResult = unlockRadar(code)
    
    if (journeyResult) {
      setSuccess(true)
      setSuccessMessage("Journey unlocked!")
      setError(false)
      setTimeout(() => {
        setShowModal(false)
        setSuccess(false)
        setCode("")
      }, 1500)
    } else if (radarResult) {
      setSuccess(true)
      setSuccessMessage("Radar unlocked!")
      setError(false)
      setTimeout(() => {
        setShowModal(false)
        setSuccess(false)
        setCode("")
      }, 1500)
    } else {
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">STEM Team Experience</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">Learning</span>{" "}
          <span className="text-primary text-glow">Adventure</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up text-balance" style={{ animationDelay: '0.2s' }}>
          A mission where science, logic, and teamwork guide your path.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {journeyUnlocked ? (
            <Link href="/journey">
              <Button size="lg" className="glow-md gap-2 px-8 py-6 text-lg">
                <Rocket className="h-5 w-5" />
                Start Journey
              </Button>
            </Link>
          ) : (
            <Button 
              size="lg" 
              className="glow-md gap-2 px-8 py-6 text-lg"
              onClick={() => setShowModal(true)}
            >
              <Lock className="h-5 w-5" />
              Enter Access Code
            </Button>
          )}
          <Link href="/rules">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 px-8 py-6 text-lg border-border/50 hover:bg-secondary/50"
            >
              <BookOpen className="h-5 w-5" />
              View Rules
            </Button>
          </Link>
        </div>

        {/* Status indicator */}
        {journeyUnlocked && (
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary animate-fade-in-up">
            <CheckCircle2 className="h-4 w-4" />
            <span>Journey Access Granted</span>
          </div>
        )}
      </div>

      {/* Access Code Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="glass-strong border-border/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Enter Access Code</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Enter the code provided by your teacher to unlock features.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(false)
              }}
              placeholder="Enter code..."
              className="text-center text-lg py-6 bg-secondary/50 border-border/30 focus:border-primary"
              autoFocus
            />
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>Codes: <span className="text-primary/70">journey</span> or <span className="text-primary/70">radar</span></p>
            </div>
            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive text-sm">
                <XCircle className="h-4 w-4" />
                <span>Invalid access code</span>
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center gap-2 text-primary text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>{successMessage}</span>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full glow-sm py-6 text-lg"
              disabled={!code.trim() || success}
            >
              Unlock Access
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
