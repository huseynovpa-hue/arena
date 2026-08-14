import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ARENA",
  description: "Football Predictions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 w-full flex-1 py-4">
              {children}
            </main>
            <footer className="border-t border-[--border] mt-12 py-6 bg-[#0b0f19]/50 text-center text-xs text-[--muted]">
              © {new Date().getFullYear()} ARENA. All rights reserved.
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
