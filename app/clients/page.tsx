"use client"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-[#9c2d40]/20 to-[#9c2d40]/5 rounded-3xl flex items-center justify-center mb-8 relative group">
        <div className="absolute inset-0 bg-[#9c2d40]/10 rounded-3xl blur-xl transition-all duration-500"></div>
        <div className="text-4xl relative z-10">✨</div>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-[#9c2d40] to-[#9c2d40]/60 bg-clip-text text-transparent">
        Empty Canvas
      </h2>
      
      <p className="text-muted-foreground max-w-sm mb-8">
        This page has been cleared. It's ready for you to start building something amazing.
      </p>
      
      <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#9c2d40]/20 to-transparent rounded-full overflow-hidden">
        <div className="h-full w-full bg-[#9c2d40]/10 animate-pulse"></div>
      </div>
    </div>
  )
}
