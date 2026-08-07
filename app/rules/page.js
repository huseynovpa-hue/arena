"use client";
import { useLang } from "@/lib/i18n";

export default function RulesPage() {
  const { t } = useLang();

  const scoring = [
    { label: t.correctScore, pts: 15, desc: t.correctScoreDesc, icon: "🎯", color: "#22c55e" },
    { label: t.goalDifference, pts: 10, desc: t.goalDifferenceDesc, icon: "📐", color: "#3b82f6" },
    { label: t.correctResult, pts: 5, desc: t.correctResultDesc, icon: "✅", color: "#06b6d4" },
    { label: t.homeScore, pts: 5, desc: t.homeScoreDesc, icon: "🏠", color: "#8b5cf6" },
    { label: t.awayScore, pts: 5, desc: t.awayScoreDesc, icon: "✈️", color: "#a855f7" },
    { label: t.overUnderRule, pts: 5, desc: t.overUnderRuleDesc, icon: "📊", color: "#f59e0b" },
    { label: t.firstToScoreRule, pts: 5, desc: t.firstToScoreRuleDesc, icon: "⚡", color: "#ef4444" },
  ];

  const rules = [t.rule1, t.rule2, t.rule3, t.rule4, t.rule5, t.rule6, t.rule7, t.rule8, t.rule9];

  return (
    <div className="py-4 space-y-4">
      <h1 className="text-lg font-black">📋 {t.rulesAndScoring}</h1>

      {/* Monthly Prizes */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-[--border]" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(34,197,94,0.08))" }}>
          <span className="text-sm font-bold">🏆 {t.prizeMonthlyTitle}</span>
        </div>
        <div className="p-4">
          <div className="flex gap-2 justify-center mb-4">
            {[
              { place: t.prizeSecond, prize: "15", emoji: "🥈", color: "#94a3b8", size: "h-28" },
              { place: t.prizeFirst, prize: "20", emoji: "🥇", color: "#f59e0b", size: "h-36" },
              { place: t.prizeThird, prize: "10", emoji: "🥉", color: "#b45309", size: "h-24" },
            ].map((p, i) => (
              <div key={i} className={`flex-1 flex flex-col items-center justify-end ${p.size}`}>
                <span className="text-2xl mb-1">{p.emoji}</span>
                <span className="text-lg font-black" style={{ color: p.color }}>{p.prize} AZN</span>
                <span className="text-[10px] text-[--muted] font-semibold">{p.place}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-[11px] text-[--muted] border-t border-[--border] pt-3">
            {t.prizeDesc}<br/>
            {t.prizePayment}<br/>
            <span className="text-amber-400 font-semibold">{t.prizesActivate}</span>
          </div>
        </div>
      </div>

      {/* Points Breakdown */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[--border]">
          <span className="text-sm font-bold">{t.pointsBreakdown}</span>
          <span className="text-xs font-bold text-amber-400">{t.maxPerGame}</span>
        </div>
        {scoring.map((s, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-[--border] last:border-0">
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold">{s.label}</div>
              <div className="text-[10px] text-[--muted]">{s.desc}</div>
            </div>
            <div className="text-sm font-extrabold px-3 py-1 rounded-md" style={{ backgroundColor: s.color + "20", color: s.color }}>
              +{s.pts}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3 bg-[--surface] border-t border-[--border]">
          <span className="text-xs font-bold text-amber-400">🏆 {t.weeklyMax}</span>
          <span className="text-lg font-black text-amber-400">500 pts</span>
        </div>
      </div>

      {/* Example */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">💡 {t.example}</h3>
        <div className="bg-[--bg] rounded-xl p-3.5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[--muted]">{t.yourPredictionLabel}</span>
            <span className="font-bold">Arsenal 2 — 1 Chelsea · {t.over} · First: Arsenal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[--muted]">{t.actualResult}</span>
            <span className="font-bold">Arsenal 2 — 1 Chelsea · Total: 3 · First: Arsenal</span>
          </div>
          <div className="border-t border-[--border] pt-2 space-y-1">
            <div className="flex justify-between"><span className="text-[--muted]">{t.correctScore} (2-1 = 2-1) ✓</span><span className="text-green-400">+15</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.goalDifference} (+1 = +1) ✓</span><span className="text-green-400">+10</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.correctResult} (Home = Home) ✓</span><span className="text-green-400">+5</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.homeScore} (2 = 2) ✓</span><span className="text-green-400">+5</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.awayScore} (1 = 1) ✓</span><span className="text-green-400">+5</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.overUnderRule} ({t.over} = {t.over}) ✓</span><span className="text-green-400">+5</span></div>
            <div className="flex justify-between"><span className="text-[--muted]">{t.firstToScoreRule} (Arsenal = Arsenal) ✓</span><span className="text-green-400">+5</span></div>
            <div className="flex justify-between border-t border-[--border] pt-2 font-bold"><span>{t.totalPerfect}</span><span className="text-green-400">50 pts</span></div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">📌 {t.tournamentRules}</h3>
        <div className="space-y-0">
          {rules.map((r, i) => (
            <div key={i} className="flex gap-2.5 py-2 border-b border-[--border] last:border-0">
              <span className="w-5 h-5 rounded-md bg-green-500/10 flex items-center justify-center text-[10px] font-extrabold text-green-400 shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-xs text-[--muted] leading-relaxed">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
