"use client";

export default function RulesPage() {
  const scoring = [
    { label: "Correct Score", pts: 15, desc: "Exact home & away score match", icon: "🎯", color: "#22c55e" },
    { label: "Goal Difference", pts: 10, desc: "Correct margin between teams", icon: "📐", color: "#3b82f6" },
    { label: "Correct Result", pts: 5, desc: "Right outcome: Home Win, Draw, or Away Win", icon: "✅", color: "#06b6d4" },
    { label: "Home Score", pts: 5, desc: "Home team goals correct", icon: "🏠", color: "#8b5cf6" },
    { label: "Away Score", pts: 5, desc: "Away team goals correct", icon: "✈️", color: "#a855f7" },
    { label: "Over / Under 2.5", pts: 5, desc: "Your O/U pick matches the actual total goals", icon: "📊", color: "#f59e0b" },
    { label: "First to Score", pts: 5, desc: "Which team scores first", icon: "⚡", color: "#ef4444" },
  ];

  const rules = [
    "10 football matches are selected each week by the organizer.",
    "You must predict the exact score, choose Over or Under 2.5 goals, and select which team scores first.",
    "Over/Under 2.5 is your own choice — you can predict 2-1 but still pick Under if you believe the match could go differently.",
    "Predictions can be edited anytime before kick-off. Once the match starts, they lock automatically.",
    "Correct Result means you predicted the right outcome (Home Win / Draw / Away Win), even if the exact score is wrong.",
    "Points are cumulative — weekly scores roll into your monthly and all-time total.",
    "Weeks run Monday to Sunday. Months follow the calendar. A week that crosses two months (e.g. Aug 31 – Sep 6) may count in one week but split across two months — so weekly and monthly standings can differ.",
    "Weekly prizes go to the top 3 predictors. Monthly prizes to the top 10.",
    "In case of a tie, the player who locked predictions earlier wins.",
    "Maximum possible: 50 points per game, 500 points per week.",
  ];

  return (
    <div className="py-4 space-y-4">
      <h1 className="text-lg font-black">📋 Rules & Scoring</h1>

      {/* Points Breakdown */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[--border]">
          <span className="text-sm font-bold">Points Breakdown</span>
          <span className="text-xs font-bold text-amber-400">Max 50 pts / game</span>
        </div>
        {scoring.map((s, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-[--border] last:border-0">
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold">{s.label}</div>
              <div className="text-[10px] text-[--muted]">{s.desc}</div>
            </div>
            <div className="text-sm font-extrabold px-3 py-1 rounded-md"
              style={{ backgroundColor: s.color + "20", color: s.color }}>
              +{s.pts}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3 bg-[--surface] border-t border-[--border]">
          <span className="text-xs font-bold text-amber-400">🏆 Weekly Maximum (10 games)</span>
          <span className="text-lg font-black text-amber-400">500 pts</span>
        </div>
      </div>

      {/* Example */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">💡 Example</h3>
        <div className="bg-[--bg] rounded-xl p-3.5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[--muted]">Your prediction:</span>
            <span className="font-bold">Arsenal 2 — 1 Chelsea · Over 2.5 · First: Arsenal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[--muted]">Actual result:</span>
            <span className="font-bold">Arsenal 2 — 1 Chelsea · Total: 3 · First: Arsenal</span>
          </div>
          <div className="border-t border-[--border] pt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-[--muted]">Correct Score (2-1 = 2-1) ✓</span>
              <span className="text-green-400">+15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Goal Diff (+1 = +1) ✓</span>
              <span className="text-green-400">+10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Correct Result (Home = Home) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Home Score (2 = 2) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Away Score (1 = 1) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">O/U 2.5 (Over = Over, total 3) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">First to Score (Arsenal = Arsenal) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between border-t border-[--border] pt-2 font-bold">
              <span>Total — PERFECT SCORE! 🎯</span>
              <span className="text-green-400">50 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">📌 Tournament Rules</h3>
        <div className="space-y-0">
          {rules.map((r, i) => (
            <div key={i} className="flex gap-2.5 py-2 border-b border-[--border] last:border-0">
              <span className="w-5 h-5 rounded-md bg-green-500/10 flex items-center justify-center text-[10px] font-extrabold text-green-400 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-xs text-[--muted] leading-relaxed">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
