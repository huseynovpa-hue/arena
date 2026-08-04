"use client";

export default function RulesPage() {
  const scoring = [
    { label: "Correct Score", pts: 15, desc: "Exact home & away score match", icon: "🎯", color: "text-green-400" },
    { label: "Goal Difference", pts: 10, desc: "Correct margin between teams", icon: "📐", color: "text-blue-400" },
    { label: "Home Score", pts: 5, desc: "Home team goals correct", icon: "🏠", color: "text-purple-400" },
    { label: "Away Score", pts: 5, desc: "Away team goals correct", icon: "✈️", color: "text-purple-400" },
    { label: "Over / Under 2.5", pts: 5, desc: "Correct total goals threshold", icon: "📊", color: "text-amber-400" },
    { label: "First to Score", pts: 5, desc: "Which team scores first", icon: "⚡", color: "text-red-400" },
  ];

  const rules = [
    "10 football matches are selected each week by the organizer.",
    "You must predict the exact score and select which team scores first.",
    "Predictions lock automatically when the match kicks off — no changes after that.",
    "Over/Under 2.5 is automatically calculated from your predicted score.",
    "Points are cumulative — weekly scores roll into your monthly and all-time total.",
    "Weekly prizes go to the top 3 predictors. Monthly prizes to the top 10.",
    "In case of a tie, the player who locked predictions earlier wins.",
    "Maximum possible: 45 points per game, 450 points per week.",
  ];

  return (
    <div className="py-4 space-y-4">
      <h1 className="text-lg font-black">📋 Rules & Scoring</h1>

      {/* Points Breakdown */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[--border]">
          <span className="text-sm font-bold">Points Breakdown</span>
          <span className="text-xs font-bold text-amber-400">Max 45 pts / game</span>
        </div>
        {scoring.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 border-b border-[--border] last:border-0"
          >
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold">{s.label}</div>
              <div className="text-[10px] text-[--muted]">{s.desc}</div>
            </div>
            <div
              className={`text-sm font-extrabold px-2.5 py-0.5 rounded-md bg-current/10 ${s.color}`}
              style={{ backgroundColor: "currentColor", WebkitBackgroundClip: "unset" }}
            >
              <span className={s.color}>+{s.pts}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3 bg-[--surface] border-t border-[--border]">
          <span className="text-xs font-bold text-amber-400">🏆 Weekly Maximum (10 games)</span>
          <span className="text-lg font-black text-amber-400">450 pts</span>
        </div>
      </div>

      {/* Example */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">💡 Example</h3>
        <div className="bg-[--bg] rounded-xl p-3.5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[--muted]">Your prediction:</span>
            <span className="font-bold">Arsenal 2 — 1 Chelsea</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[--muted]">Actual result:</span>
            <span className="font-bold">Arsenal 2 — 0 Chelsea</span>
          </div>
          <div className="border-t border-[--border] pt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-[--muted]">Correct Score (2-1 ≠ 2-0)</span>
              <span className="text-red-400">+0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Goal Diff (+1 ≠ +2)</span>
              <span className="text-red-400">+0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Home Score (2 = 2) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">Away Score (1 ≠ 0)</span>
              <span className="text-red-400">+0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">O/U 2.5 (Over = Under)</span>
              <span className="text-red-400">+0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[--muted]">First to Score (Arsenal = Arsenal) ✓</span>
              <span className="text-green-400">+5</span>
            </div>
            <div className="flex justify-between border-t border-[--border] pt-2 font-bold">
              <span>Total</span>
              <span className="text-green-400">10 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">📌 Tournament Rules</h3>
        <div className="space-y-0">
          {rules.map((r, i) => (
            <div
              key={i}
              className="flex gap-2.5 py-2 border-b border-[--border] last:border-0"
            >
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
