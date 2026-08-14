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
      <body className="min-h-screen antialiased flex flex-col" style={{ background: "#080c16", color: "#e4e9f2" }}>
        {/* Football pitch background */}
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
            <rect x="80" y="60" width="640" height="1080" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <line x1="80" y1="600" x2="720" y2="600" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <circle cx="400" cy="600" r="120" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <circle cx="400" cy="600" r="6" fill="#22c55e" opacity="0.035"/>
            <rect x="220" y="60" width="360" height="180" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <rect x="300" y="60" width="200" height="72" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <path d="M 300 240 Q 400 300 500 240" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <circle cx="400" cy="204" r="5" fill="#22c55e" opacity="0.035"/>
            <rect x="220" y="960" width="360" height="180" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <rect x="300" y="1068" width="200" height="72" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <path d="M 300 960 Q 400 900 500 960" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.035"/>
            <circle cx="400" cy="996" r="5" fill="#22c55e" opacity="0.035"/>
          </svg>
        </div>
        <LangWrapper>
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </LangWrapper>
      </body>
    </html>
  );
}
