"use client"

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a15] via-[#0a1628] to-[#030508]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Radial glow top */}
      <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-gradient-radial from-[#1e40af]/20 via-transparent to-transparent blur-3xl" />
      
      {/* Radial glow bottom */}
      <div className="absolute -bottom-[30%] left-1/4 w-[80%] aspect-square rounded-full bg-gradient-radial from-[#0ea5e9]/10 via-transparent to-transparent blur-3xl" />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-primary/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}
