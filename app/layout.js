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
      <body className="min-h-screen antialiased flex flex-col bg-[#070b15] text-[#f8fafc] relative">
        {/* === EMBEDDED HIGH-DEF VECTOR STADIUM BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <svg 
            className="w-full h-full object-cover" 
            viewBox="0 0 1440 900" 
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Sky & Stadium Base */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a1122" />
                <stop offset="50%" stopColor="#132247" />
                <stop offset="100%" stopColor="#1a3365" />
              </linearGradient>

              {/* Floodlight Beam Glows */}
              <radialGradient id="centerLight" cx="50%" cy="10%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="sideLightLeft" cx="15%" cy="15%" r="45%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="sideLightRight" cx="85%" cy="15%" r="45%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Stadium Stands Arc */}
              <linearGradient id="standsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.95" />
              </linearGradient>

              {/* 3D Grass Pitch Gradient */}
              <linearGradient id="pitchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="35%" stopColor="#16a34a" />
                <stop offset="70%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#0b4620" />
              </linearGradient>

              {/* Vignette Overlay */}
              <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                <stop offset="40%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#050811" stopOpacity="0.75" />
              </radialGradient>
            </defs>

            {/* 1. Sky */}
            <rect width="1440" height="900" fill="url(#skyGrad)" />

            {/* 2. Floodlight Rays */}
            <rect width="1440" height="500" fill="url(#centerLight)" />
            <rect width="1440" height="500" fill="url(#sideLightLeft)" />
            <rect width="1440" height="500" fill="url(#sideLightRight)" />

            {/* Light Beams */}
            <polygon points="150,50 0,550 500,550" fill="#ffffff" opacity="0.08" />
            <polygon points="1290,50 940,550 1440,550" fill="#ffffff" opacity="0.08" />

            {/* 3. Stadium Crowd Stands (Curved Silhouette) */}
            <path d="M -100 480 Q 720 400 1540 480 L 1540 550 L -100 550 Z" fill="url(#standsGrad)" />
            
            {/* Stadium Roof Lights */}
            <line x1="100" y1="420" x2="1340" y2="420" stroke="#64748b" strokeWidth="2" opacity="0.3" />
            <circle cx="200" cy="420" r="4" fill="#ffffff" opacity="0.9" />
            <circle cx="230" cy="420" r="4" fill="#ffffff" opacity="0.9" />
            <circle cx="260" cy="420" r="4" fill="#ffffff" opacity="0.9" />
            <circle cx="1180" cy="420" r="4" fill="#ffffff" opacity="0.9" />
            <circle cx="1210" cy="420" r="4" fill="#ffffff" opacity="0.9" />
            <circle cx="1240" cy="420" r="4" fill="#ffffff" opacity="0.9" />

            {/* 4. Curved Perspective Pitch */}
            <path d="M -200 900 L -100 520 Q 720 450 1540 520 L 1640 900 Z" fill="url(#pitchGrad)" />

            {/* Pitch Horizon Line */}
            <path d="M -100 520 Q 720 450 1540 520" stroke="#ffffff" strokeWidth="2" opacity="0.6" fill="none" />

            {/* Perspective Pitch Lines */}
            <path d="M 320 540 Q 720 490 1120 540 L 1220 700 Q 720 630 220 700 Z" stroke="#ffffff" strokeWidth="2" opacity="0.25" fill="none" />
            <ellipse cx="720" cy="510" rx="180" ry="40" stroke="#ffffff" strokeWidth="2" opacity="0.2" fill="none" />

            {/* 5. Vignette Overlay */}
            <rect width="1440" height="900" fill="url(#vignette)" />
          </svg>
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
