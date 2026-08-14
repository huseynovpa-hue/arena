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
        {/* === STADIUM PHOTO BACKGROUND === */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/stadium.jpg')" }}
          aria-hidden="true"
        />
        {/* Dark overlay — keeps text/buttons readable over the photo */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,21,0.88) 0%, rgba(7,11,21,0.82) 40%, rgba(7,11,21,0.92) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Extra vignette so edges stay dark and content pops in the center */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
          aria-hidden="true"
        />

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
