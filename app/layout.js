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
      <body className="min-h-screen antialiased flex flex-col bg-[#0b1329] text-[#ffffff] relative">
        {/* === VIBRANT ARENA LIGHTING & STADIUM PITCH === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          
          {/* 1. Intense Top Stadium Sky & Floodlights */}
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-[#080e1e] via-[#0f1d3a] to-[#1a2d54]">
            {/* Bright Center Arena Light Beam */}
            <div 
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1000px] h-[450px]"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.6) 0%, rgba(59, 130, 246, 0.35) 45%, transparent 75%)"
              }}
            />
            {/* Warm Stadium Side Lights */}
            <div 
              className="absolute top-0 left-[-5%] w-[450px] h-[350px]"
              style={{
                background: "radial-gradient(circle at 30% 10%, rgba(245, 158, 11, 0.45) 0%, transparent 65%)"
              }}
            />
            <div 
              className="absolute top-0 right-[-5%] w-[450px] h-[350px]"
              style={{
                background: "radial-gradient(circle at 70% 10%, rgba(16, 185, 129, 0.4) 0%, transparent 65%)"
              }}
            />
          </div>

          {/* 2. Vivid Emerald Football Pitch */}
          <div className="absolute bottom-0 left-0 right-0 h-[58%] overflow-hidden">
            {/* Horizon Glow Border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/80 shadow-[0_0_20px_#ffffff]" />
            
            {/* Rich Saturated Green Field */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, #15803d 0%, #166534 50%, #14532d 100%)"
              }}
            />

            {/* Grass Pitch Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 36px, transparent 36px, transparent 72px)"
              }}
            />

            {/* Field Penalty Arc */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-2xl h-40 border-t-2 border-x-2 border-white/35 rounded-t-[60px]" />
          </div>

          {/* 3. Vignette Overlay for Readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 40%, transparent 40%, rgba(8, 14, 30, 0.65) 90%)"
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
