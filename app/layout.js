import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangWrapper } from "@/components/LangWrapper";

export const metadata = {
  title: "Arena — Football Predictions",
  description: "Predict football scores, compete weekly, win prizes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased flex flex-col bg-[#050914] text-[#f8fafc] relative overflow-x-hidden">
        {/* === 3D ESPORTS STADIUM & PITCH BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          
          {/* 1. STADIUM SKY & ARENA FLOODLIGHTS */}
          <div className="absolute inset-0 bg-[#050914]">
            {/* Center Emerald Floodlight Beam */}
            <div 
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px]"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.35) 0%, rgba(59, 130, 246, 0.18) 50%, transparent 75%)"
              }}
            />
            {/* Gold Left Spotlight */}
            <div 
              className="absolute top-0 left-0 w-[500px] h-[400px] opacity-70"
              style={{
                background: "radial-gradient(circle at 20% 10%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)"
              }}
            />
            {/* Blue Right Spotlight */}
            <div 
              className="absolute top-0 right-0 w-[500px] h-[400px] opacity-70"
              style={{
                background: "radial-gradient(circle at 80% 10%, rgba(37, 99, 235, 0.25) 0%, transparent 70%)"
              }}
            />
          </div>

          {/* 2. REAL 3D TILTING PITCH PLANE (Perspective Depth) */}
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[180vw] h-[75vh] [perspective:900px]">
            <div 
              className="w-full h-full origin-bottom transition-all duration-700"
              style={{
                transform: "rotateX(62deg)",
                background: "linear-gradient(to top, #14532d 0%, #16a34a 50%, #15803d 85%, #0f4c24 100%)",
                boxShadow: "0 -20px 60px rgba(16, 185, 129, 0.35)"
              }}
            >
              {/* Perspective Lawn Grass Stripes */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 60px, transparent 60px, transparent 120px)"
                }}
              />

              {/* Perspective Center Field Arc & Line */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[55%] h-[380px] border-2 border-white/40 rounded-t-[200px]" />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/70 shadow-[0_0_15px_#ffffff]" />
            </div>
          </div>

          {/* 3. ATMOSPHERIC HORIZON FOG (Seamlessly blends pitch into dark sky) */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, 
                  rgba(5, 9, 20, 0.92) 0%, 
                  rgba(5, 9, 20, 0.55) 30%, 
                  rgba(5, 9, 20, 0.25) 55%, 
                  rgba(5, 9, 20, 0.7) 100%
                )`
            }}
          />
        </div>

        <LangWrapper>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </LangWrapper>
      </body>
    </html>
  );
}
