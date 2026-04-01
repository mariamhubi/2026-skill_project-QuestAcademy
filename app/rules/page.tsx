"use client"

import { AccessProvider } from "@/components/access-context"
import { Navbar } from "@/components/navbar"
import { BackgroundEffects } from "@/components/background-effects"
import { 
  Users, 
  UserCog, 
  Palette, 
  Swords, 
  Puzzle, 
  Lightbulb, 
  TrendingUp,
  Map,
  Sparkles,
  Search,
  Zap,
  HelpCircle,
  Flag,
  Navigation,
  CheckCircle2
} from "lucide-react"

const rulesSections = [
  {
    title: "Team Setup",
    icon: Users,
    items: [
      "Players work together in teams",
      "A teacher guides the experience",
      "A table map is used for navigation",
    ],
  },
  {
    title: "Roles",
    icon: UserCog,
    items: [
      "Each player chooses a specialization",
      "Multiple players can share roles",
    ],
  },
  {
    title: "Backgrounds",
    icon: Palette,
    items: [
      "Each role has unique backgrounds",
      "Backgrounds provide useful traits",
    ],
  },
  {
    title: "Player Actions",
    icon: Swords,
    items: [
      "Attack: Engage with challenges",
      "Inspect: Examine clues",
      "Boost: Enhance team abilities",
    ],
  },
  {
    title: "Encounters",
    icon: Puzzle,
    items: [
      "Puzzles and bosses await",
      "Teamwork is required to succeed",
    ],
  },
  {
    title: "Hints",
    icon: Lightbulb,
    items: [
      "Limited hints per stage",
      "Use when the team is stuck",
    ],
  },
  {
    title: "Progression",
    icon: TrendingUp,
    items: [
      "First stage happens at the table",
      "Next stage unlocks after completion",
      "Final phase includes movement",
    ],
  },
]

export default function RulesPage() {
  return (
    <AccessProvider>
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <Navbar />
        <main className="relative z-10 pt-32 pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Game <span className="text-primary text-glow">Rules</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Quick reference for gameplay mechanics
              </p>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rulesSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/5 animate-fade-in-up group"
                  style={{ animationDelay: `${sectionIndex * 0.05}s` }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                      <section.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-base font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  {/* Rules List */}
                  <ul className="space-y-2.5">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground">
                Ready? Enter your access code on the{" "}
                <a href="/" className="text-primary hover:underline transition-colors">
                  home page
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </AccessProvider>
  )
}
