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
      <body className="min-h-screen antialiased flex flex-col bg-[#070b14] text-[#f1f5f9] relative">
        {/* === STADIUM LIGHTING & PITCH BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* 1. Tactical Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px"
            }}
          />

          {/* 2. Top Stadium Center Emerald Pitch Floodlight */}
          <div 
            className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1000px] h-[550px]"
            style={{
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(5, 150, 105, 0.12) 45%, rgba(7, 11, 20, 0) 75%)",
            }}
          />

          {/* 3. Blue Side Spotlight */}
          <div 
            className="absolute top-1/3 -right-36 w-[650px] h-[650px]"
            style={{
              background: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(7, 11, 20, 0) 70%)",
            }}
          />

          {/* 4. Amber/Gold Bottom Spotlight */}
          <div 
            className="absolute -bottom-28 -left-28 w-[650px] h-[650px]"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(7, 11, 20, 0) 70%)",
            }}
          />

          {/* 5. Subtle Pitch Center Circle Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.07] border-2 border-emerald-400 rounded-full flex items-center justify-center">
            <div className="w-[200px] h-[200px] border-2 border-emerald-400 rounded-full" />
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
