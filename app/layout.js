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
      <body className="min-h-screen antialiased flex flex-col bg-[#080d1a] text-[#f1f5f9] relative">
        {/* === BRIGHT STADIUM & GREEN PITCH BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* 1. Top Stadium Sky & Floodlights */}
          <div 
            className="absolute top-0 left-0 right-0 h-[48%]"
            style={{
              background: `
                radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.35) 0%, transparent 45%),
                radial-gradient(circle at 80% 15%, rgba(255, 255, 255, 0.35) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 35%, rgba(59, 130, 246, 0.35) 0%, transparent 65%),
                linear-gradient(to bottom, #070d1d 0%, #0e1935 55%, #182848 100%)
              `
            }}
          >
            {/* Illuminated Crowd & Stadium Lights Texture */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-28 opacity-45"
              style={{
                backgroundImage: `radial-gradient(circle, #f59e0b 1px, transparent 1.5px), radial-gradient(circle, #60a5fa 1px, transparent 1.5px)`,
                backgroundSize: "14px 14px, 22px 22px",
                backgroundPosition: "0 0, 7px 7px"
              }}
            />
          </div>

          {/* 2. Bottom Vivid Green Football Pitch */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[55%]"
            style={{
              background: `
                linear-gradient(to bottom, rgba(22, 163, 74, 0.95) 0%, rgba(21, 128, 61, 0.98) 45%, rgba(20, 83, 45, 1) 100%)
              `
            }}
          >
            {/* Alternating Pitch Lawn Grass Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, #ffffff, #ffffff 42px, transparent 42px, transparent 84px)`
              }}
            />

            {/* Glowing White Field Horizon Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-2xl h-28 border-t-2 border-x-2 border-white/25 rounded-t-3xl" />
          </div>
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
