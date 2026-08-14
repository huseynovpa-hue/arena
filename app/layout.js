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
        {/* === REAL STADIUM BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Main Stadium Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
            style={{
              /* Uses local public/stadium.jpg first, falls back to high-res stadium photo */
              backgroundImage: `url('/stadium.jpg'), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />

          {/* Lighting Glow & Vignette (Enhances brightness at lights, adds depth to edges) */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
                linear-gradient(to bottom, rgba(7, 11, 20, 0.25) 0%, rgba(7, 11, 20, 0.55) 60%, rgba(7, 11, 20, 0.85) 100%)
              `
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
