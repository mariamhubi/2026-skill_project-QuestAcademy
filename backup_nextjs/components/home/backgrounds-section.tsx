"use client"

import { Layers, UserCircle, Sparkles } from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Multiple Instances",
    description: "Each role can appear multiple times in your team",
  },
  {
    icon: UserCircle,
    title: "Unique Backgrounds",
    description: "Players choose different backgrounds for variety",
  },
  {
    icon: Sparkles,
    title: "Special Traits",
    description: "Backgrounds give your character unique abilities",
  },
]

export function BackgroundsSection() {
  return (
    <section className="relative py-32 px-6 pb-48">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Character <span className="text-primary text-glow">Backgrounds</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Make your character unique with different backgrounds and traits
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-8 text-center transition-all duration-300 hover:glow-sm hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 mb-6 group-hover:glow-sm transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visual illustration */}
        <div className="mt-16 relative">
          <div className="glass rounded-2xl p-8 border-primary/20">
            <div className="flex flex-wrap justify-center gap-4">
              {["Academic", "Field Agent", "Prodigy", "Veteran", "Rookie"].map((bg, i) => (
                <div
                  key={bg}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {bg}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Example backgrounds for each role
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
