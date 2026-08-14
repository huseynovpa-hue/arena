"use client";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageProvider, useLang } from "@/lib/i18n";

function NavContent({ children }) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { href: "/", label: t.matches || "Matches", icon: "⚽" },
    { href: "/leaderboard", label: t.leaderboard || "Leaderboard", icon: "🏆" },
    { href: "/about", label: t.about || "About", icon: "ℹ️" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-[--border]">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:scale-110">⚽</span>
            <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
              ARENA
            </span>
          </Link>

          {/* Navigation & Language Picker */}
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-green-500/15 text-green-400 border border-green-500/30 shadow-[0_2px_10px_rgba(34,197,94,0.15)]"
                        : "text-[--muted] hover:text-[--text] hover:bg-white/5"
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === "en" ? "az" : "en")}
              className="btn-3d-surface !px-2.5 !py-1 !text-[11px] uppercase tracking-wide font-extrabold"
            >
              🌐 {lang === "en" ? "AZ" : "EN"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 w-full flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[--border] mt-12 py-6 bg-[#0b0f19]/50">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-[--muted]">
          <p>© {new Date().getFullYear()} ARENA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <NavContent>{children}</NavContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
