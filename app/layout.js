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
      <body className="min-h-screen antialiased flex flex-col bg-[#070a12] text-[#f1f5f9]">
        {/* === ATMOSPHERIC BACKGROUND LAYER === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Subtle Tactical Grid Lines */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "32px 32px"
            }}
          />

          {/* Top Center Emerald Field Floodlight */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[140px] rounded-full" />

          {/* Mid-Right Blue Ambient Glow */}
          <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-blue-600/10 blur-[150px] rounded-full" />

          {/* Bottom-Left Gold Spotlight */}
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full" />
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
