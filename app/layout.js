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
        {/* === VISIBLE STADIUM AMBIENT BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-15" 
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
              backgroundSize: "28px 28px"
            }}
          />

          {/* Top Emerald Stadium Light */}
          <div 
            className="absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[450px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(16, 185, 129, 0) 70%)",
            }}
          />

          {/* Mid-Right Blue Ambient Glow */}
          <div 
            className="absolute top-1/4 -right-24 w-[550px] h-[550px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)",
            }}
          />

          {/* Bottom-Left Gold Glow */}
          <div 
            className="absolute -bottom-20 -left-20 w-[550px] h-[550px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 70%)",
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
