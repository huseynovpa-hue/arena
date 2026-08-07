"use client";
import { useLang } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h1 className="text-lg font-black mb-6">{t.aboutTitle}</h1>

      <div className="card p-5 space-y-5">
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">⚽ {t.aboutWhat}</h2>
          <p className="text-xs text-[--muted] leading-relaxed">{t.aboutWhatDesc}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">🎯 {t.aboutHow}</h2>
          <p className="text-xs text-[--muted] leading-relaxed">{t.aboutHowDesc}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">💡 {t.aboutWhy}</h2>
          <p className="text-xs text-[--muted] leading-relaxed">{t.aboutWhyDesc}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">👋 {t.aboutTeam}</h2>
          <p className="text-xs text-[--muted] leading-relaxed">{t.aboutTeamDesc}</p>
        </div>
      </div>

      <h2 className="text-lg font-black mt-8 mb-4">{t.contactTitle}</h2>

      <div className="card p-5 space-y-4">
        <p className="text-xs text-[--muted] leading-relaxed">{t.contactDesc}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">📧</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">{t.contactEmail}</div>
              <a href="mailto:khannhuseyn@gmail.com" className="text-sm font-semibold text-green-400 hover:underline">khannhuseyn@gmail.com</a>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">📍</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">{t.contactLocation}</div>
              <span className="text-sm font-semibold text-[--text]">Baku, Azerbaijan</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">💬</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">{t.contactSocial}</div>
              <span className="text-sm text-[--muted]">{t.contactComingSoon}</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[--muted] text-center pt-2 border-t border-[--border]">{t.contactResponse}</p>
      </div>
    </div>
  );
}
