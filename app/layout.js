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
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.7,
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200"><rect x="80" y="60" width="640" height="1080" fill="none" stroke="#22c55e" stroke-width="3"/><line x1="80" y1="600" x2="720" y2="600" stroke="#22c55e" stroke-width="3"/><circle cx="400" cy="600" r="120" fill="none" stroke="#22c55e" stroke-width="3"/><circle cx="400" cy="600" r="8" fill="#22c55e"/><rect x="220" y="60" width="360" height="180" fill="none" stroke="#22c55e" stroke-width="3"/><rect x="300" y="60" width="200" height="72" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M300 240Q400 300 500 240" fill="none" stroke="#22c55e" stroke-width="3"/><circle cx="400" cy="204" r="6" fill="#22c55e"/><rect x="220" y="960" width="360" height="180" fill="none" stroke="#22c55e" stroke-width="3"/><rect x="300" y="1068" width="200" height="72" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M300 960Q400 900 500 960" fill="none" stroke="#22c55e" stroke-width="3"/><circle cx="400" cy="996" r="6" fill="#22c55e"/></svg>')}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
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
