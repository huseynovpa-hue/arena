"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const langContext = useLang();
  const lang = langContext?.lang || "en";
  const setLang = langContext?.setLang || (() => {});
  const t = langContext?.t || {};

  const navLinks = [
    { href: "/", label: t?.matches || "Matches", icon: "⚽" },
    { href: "/leaderboard", label: t?.leaderboard || "Leaderboard", icon: "🏆" },
    { href: "/about", label: t?.about || "About", icon: "ℹ️" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-[--border]">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">⚽</span>
          <span className="font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
            ARENA
          </span>
        </Link>

        {/* Links & Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1">
          <nav className="flex items-center gap-1 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                    isActive
                      ? "bg-green-500/15 text-green-400 border border-green-500/30"
                      : "text-[--muted] hover:text-[--text] hover:bg-white/5"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setLang(lang === "en" ? "az" : "en")}
            className="btn-3d-surface !px-2 !py-1 !text-[10px] uppercase tracking-wide font-extrabold shrink-0"
          >
            🌐 {lang === "en" ? "AZ" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
