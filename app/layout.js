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
      <body className="min-h-screen antialiased flex flex-col bg-[#060a12] text-[#f1f5f9] relative">
        {/* === ESPORTS STADIUM BACKGROUND (PURE CSS & SVG) === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          
          {/* 1. Top Floodlight Arena Glow */}
          <div 
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[500px]"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.35) 0%, rgba(59, 130, 246, 0.18) 45%, transparent 75%)"
            }}
          />

          {/* 2. Side Stadium Light Beams */}
          <div 
            className="absolute top-1/4 -left-32 w-[600px] h-[600px]"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 65%)"
            }}
          />
          <div 
            className="absolute top-1/3 -right-32 w-[600px] h-[600px]"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 65%)"
            }}
          />

          {/* 3. Subtle Grass Pitch Mesh Texture at the Bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[45%] opacity-20"
            style={{
              background: "linear-gradient(to top, rgba(16, 185, 129, 0.4) 0%, transparent 100%)",
              maskImage: "linear-gradient(to top, black, transparent)"
            }}
          />

          {/* 4. Tactical Pitch Lines Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
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
