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
        {/* === FULL STADIUM & PITCH GRAPHIC (PURE CSS) === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          
          {/* TOP HALF: Dark Stadium Arena with Intense Warm/White Floodlights */}
          <div className="absolute top-0 left-0 right-0 h-[48%] overflow-hidden">
            {/* Dark Sky Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b101d] via-[#10192e] to-[#182848]" />

            {/* Bright Center Stadium Floodlight Beam */}
            <div 
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-90"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.45) 0%, rgba(96, 165, 250, 0.25) 40%, transparent 75%)"
              }}
            />

            {/* Stadium Lights Flare (Left and Right) */}
            <div 
              className="absolute top-4 left-[10%] w-[400px] h-[250px] opacity-70"
              style={{
                background: "radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.4) 0%, rgba(239, 68, 68, 0.2) 35%, transparent 70%)"
              }}
            />
            <div 
              className="absolute top-4 right-[10%] w-[400px] h-[250px] opacity-70"
              style={{
                background: "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
              }}
            />

            {/* Crowd Lights Grain / Dot Effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 opacity-25"
              style={{
                backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)",
                backgroundSize: "12px 12px"
              }}
            />
          </div>

          {/* BOTTOM HALF: Vivid Green Football Pitch with Lawn Stripes */}
          <div className="absolute bottom-0 left-0 right-0 h-[52%] overflow-hidden">
            {/* Pitch Horizon Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/70 shadow-[0_0_15px_#ffffff]" />

            {/* Vibrant Green Gradient Field */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, #16a34a 0%, #15803d 40%, #166534 80%, #0f5127 100%)"
              }}
            />

            {/* Horizontal Lawn Mower Stripes */}
            <div 
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, #ffffff, #ffffff 40px, transparent 40px, transparent 80px)"
              }}
            />

            {/* Pitch Markings / Penalty Area Arc */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl h-36 border-t-2 border-x-2 border-white/30 rounded-t-[50px]" />
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
