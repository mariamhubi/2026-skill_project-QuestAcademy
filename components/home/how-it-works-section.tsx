"use client"

import { Users, UserCog, Headphones, Map, Puzzle, Unlock, Navigation } from "lucide-react"

const steps = [
  { icon: Users, label: "Form Your Team", description: "Gather your crew" },
  { icon: UserCog, label: "Choose Roles", description: "Pick specializations" },
  { icon: Headphones, label: "Listen to the Story", description: "Begin the narrative" },
  { icon: Map, label: "Use the Table Map", description: "Navigate challenges" },
  { icon: Puzzle, label: "Solve Challenges", description: "Apply your skills" },
  { icon: Unlock, label: "Unlock the Next Stage", description: "Progress forward" },
  { icon: Navigation, label: "Explore Real Locations", description: "Enter the world" },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-primary text-glow">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Follow the path from team formation to real-world exploration
          </p>
        </div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={step.label} className="relative group">
                {/* Step card */}
                <div 
                  className="flex flex-col items-center text-center p-6 rounded-2xl glass transition-all duration-300 hover:glow-sm hover:border-primary/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon container */}
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:glow-sm transition-all duration-300">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-sm font-semibold mb-1 text-foreground">
                    {step.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile/tablet) */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
