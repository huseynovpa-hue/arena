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
      <body className="min-h-screen antialiased flex flex-col bg-[#050811] text-[#f8fafc] relative">
        {/* === PROFESSIONAL STADIUM BACKGROUND LAYER === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* 1. Base Stadium Photo with Subtle Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter blur-[3px]"
            style={{
              backgroundImage: `url('/stadium.jpg'), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />

          {/* 2. Dark Vignette & Atmospheric Glow Mask */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 15%, rgba(16, 185, 129, 0.18) 0%, transparent 60%),
                radial-gradient(circle at 50% 50%, rgba(5, 8, 17, 0.78) 0%, rgba(5, 8, 17, 0.94) 85%),
                linear-gradient(to bottom, rgba(5, 8, 17, 0.88) 0%, rgba(5, 8, 17, 0.65) 40%, rgba(5, 8, 17, 0.98) 100%)
              `
            }}
          />

          {/* 3. Subtle Emerald Top Floodlight Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-36 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
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
