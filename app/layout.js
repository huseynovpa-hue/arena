export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="relative min-h-screen bg-[#0b0f19] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
        {/* === ATMOSPHERIC BACKGROUND LAYER === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Tactical pitch grid pattern */}
          <div className="absolute inset-0 bg-pitch-grid opacity-30" />
          
          {/* Top Green/Emerald Stadium Glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/20 blur-[130px] rounded-full" />
          
          {/* Secondary Blue Ambient Light */}
          <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full" />
          
          {/* Accent Gold Light at Bottom Left */}
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full" />
        </div>

        {/* === MAIN CONTENT LAYER === */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
