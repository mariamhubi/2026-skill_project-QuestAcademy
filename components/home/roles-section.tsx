"use client"

import { FlaskConical, Wrench, Calculator, Code, Atom } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  {
    icon: FlaskConical,
    name: "Chemist",
    subtitle: "Master of reactions and compounds",
    color: "emerald",
  },
  {
    icon: Wrench,
    name: "Engineer",
    subtitle: "Builder and problem solver",
    color: "amber",
  },
  {
    icon: Calculator,
    name: "Mathematician",
    subtitle: "Numbers reveal the truth",
    color: "blue",
  },
  {
    icon: Code,
    name: "Programmer",
    subtitle: "Logic flows through code",
    color: "cyan",
  },
  {
    icon: Atom,
    name: "Physicist",
    subtitle: "Understanding forces and motion",
    color: "indigo",
  },
]

const colorStyles: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  emerald: {
    bg: "group-hover:bg-emerald-500/10",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    icon: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/20",
  },
  amber: {
    bg: "group-hover:bg-amber-500/10",
    border: "border-amber-500/20 group-hover:border-amber-500/40",
    icon: "text-amber-400",
    glow: "group-hover:shadow-amber-500/20",
  },
  blue: {
    bg: "group-hover:bg-blue-500/10",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    icon: "text-blue-400",
    glow: "group-hover:shadow-blue-500/20",
  },
  cyan: {
    bg: "group-hover:bg-cyan-500/10",
    border: "border-cyan-500/20 group-hover:border-cyan-500/40",
    icon: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/20",
  },
  indigo: {
    bg: "group-hover:bg-indigo-500/10",
    border: "border-indigo-500/20 group-hover:border-indigo-500/40",
    icon: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/20",
  },
}

export function RolesSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Choose Your <span className="text-primary text-glow">Role</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Each role brings unique abilities to help your team
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((role, index) => {
            const styles = colorStyles[role.color]
            
            return (
              <div
                key={role.name}
                className={cn(
                  "group relative rounded-xl border bg-background/50 backdrop-blur-sm p-5 transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg cursor-default",
                  styles.border,
                  styles.bg,
                  styles.glow
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={cn(
                  "w-11 h-11 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 transition-colors",
                  "group-hover:bg-background/80",
                  styles.icon
                )}>
                  <role.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {role.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {role.subtitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
