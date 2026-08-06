"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentWeek, formatWeekRange } from "@/lib/utils";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "month", "week"
  const [noResults, setNoResults] = useState(null); // null, "none", "pending"
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [selectedWeek, setSelectedWeek] = useState(null);

  const current = getCurrentWeek();

  useEffect(() => { loadWeeks(); loadLeaderboard(); }, []);
  useEffect(() => { loadLeaderboard(); }, [filter, selectedMonth, selectedWeek]);

  async function loadWeeks() {
    const { data } = await supabase.from("weeks").select("*")
      .order("year", { ascending: false }).order("week_number", { ascending: false });
    setWeeks(data || []);
    // Default to current week
    if (data && data.length > 0) {
      const cur = data.find(w => w.week_number === current.week && w.year === current.year);
      setSelectedWeek(cur?.id || data[0].id);
    }
  }

  async function loadLeaderboard() {
    setLoading(true);

    const { data: allProfiles } = await supabase
      .from("profiles").select("id, username, avatar_url");
    if (!allProfiles) { setPlayers([]); setLoading(false); return; }

    if (filter === "all") {
      const { data } = await supabase.from("leaderboard").select("*");
      setPlayers(data || []);
      setNoResults(null);
      setLoading(false);
      return;
    }

    let matchIds = [];
    let hasFinished = false;

    if (filter === "month") {
      const [year, month] = selectedMonth.split("-");
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();
      const { data: matches } = await supabase
        .from("matches").select("id, status")
        .gte("kick_off", startDate).lte("kick_off", endDate);
      matchIds = (matches || []).map(m => m.id);
      hasFinished = (matches || []).some(m => m.status === "finished");
    } else if (filter === "week" && selectedWeek) {
      const { data: matches } = await supabase
        .from("matches").select("id, status").eq("week_id", selectedWeek);
      matchIds = (matches || []).map(m => m.id);
      hasFinished = (matches || []).some(m => m.status === "finished");
    }

    if (matchIds.length === 0) {
      setPlayers([]);
      setNoResults("none");
      setLoading(false);
      return;
    }

    if (!hasFinished) {
      setPlayers([]);
      setNoResults("pending");
      setLoading(false);
      return;
    }

    setNoResults(null);

    const { data: preds } = await supabase
      .from("predictions").select("user_id, points")
      .in("match_id", matchIds).not("points", "is", null);

    const userMap = {};
    (preds || []).forEach(p => {
      if (!userMap[p.user_id]) userMap[p.user_id] = { total: 0, count: 0 };
      userMap[p.user_id].total += p.points || 0;
      userMap[p.user_id].count += 1;
    });

    const result = allProfiles.map(p => ({
      id: p.id,
      username: p.username,
      avatar_url: p.avatar_url,
      total_points: userMap[p.id]?.total || 0,
      total_predictions: userMap[p.id]?.count || 0,
      accuracy: userMap[p.id]?.count > 0
        ? ((userMap[p.id].total / (userMap[p.id].count * 50)) * 100).toFixed(1)
        : "0.0",
      perfect_scores: 0,
    })).sort((a, b) => b.total_points - a.total_points || a.username.localeCompare(b.username));

    setPlayers(result);
    setLoading(false);
  }

  const medals = ["🥇", "🥈", "🥉"];
  const rankBg = ["bg-amber-500/5", "bg-slate-400/5", "bg-orange-700/5"];

  const months = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
  }

  return (
    <div className="py-4">
      <h1 className="text-lg font-black mb-4">🏆 Leaderboard</h1>

      {/* Main filters */}
      <div className="flex gap-1.5 mb-3">
        {["all", "weekly", "month"].map(f => (
          <button key={f} onClick={() => setFilter(f === "weekly" ? "week" : f)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              (f === "weekly" ? "week" : f) === filter
                ? f === "all" ? "bg-green-500/15 border-green-500 text-green-400"
                  : f === "weekly" ? "bg-blue-500/15 border-blue-500 text-blue-400"
                  : "bg-amber-500/15 border-amber-500 text-amber-400"
                : "border-[--border] text-[--muted]"
            }`}>
            {f === "all" ? "All Time" : f === "weekly" ? "Weekly" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Month picker */}
      {filter === "month" && (
        <div className="mb-3">
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}
            className="input-dark w-auto pr-8 text-xs cursor-pointer" style={{ maxWidth: 200 }}>
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Week picker */}
      {filter === "week" && (
        <div className="mb-3">
          {weeks.length === 0 ? (
            <p className="text-xs text-[--muted]">No weeks found.</p>
          ) : (
            <select value={selectedWeek || ""} onChange={e => setSelectedWeek(parseInt(e.target.value))}
              className="input-dark w-auto pr-8 text-xs cursor-pointer" style={{ maxWidth: 280 }}>
              {weeks.map(w => {
                const isCurrent = w.week_number === current.week && w.year === current.year;
                return (
                  <option key={w.id} value={w.id}>
                    {isCurrent ? "📍 Current Week" : `Week ${w.week_number}`} — {formatWeekRange(w.week_number, w.year)}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      )}

      {/* Prize banner for monthly view */}
      {filter === "month" && (
        <div className="card p-3 mb-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(34,197,94,0.06))" }}>
          <span className="text-xs font-bold text-amber-400">🏆 Monthly Prizes</span>
          <div className="flex gap-3 text-[11px] font-bold">
            <span className="text-amber-400">🥇 20 AZN</span>
            <span className="text-slate-400">🥈 15 AZN</span>
            <span className="text-orange-600">🥉 10 AZN</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-[--muted]">Loading...</div>
      ) : players.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">{noResults === "pending" ? "⏳" : "🏆"}</div>
          <h3 className="text-lg font-bold mb-1.5">
            {noResults === "pending" ? "Results are on the way" : "No matches found"}
          </h3>
          <p className="text-xs text-[--muted]">
            {noResults === "pending"
              ? "Standings will be available once match results are entered."
              : filter === "month" ? "No matches were played in this month."
              : filter === "week" ? "No matches in this week."
              : "Players will appear here once they register."}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="flex items-center px-4 py-2.5 bg-[--surface] border-b border-[--border] text-[9px] text-[--muted] uppercase tracking-wider font-bold">
            <span className="w-10">#</span>
            <span className="flex-1">Player</span>
            {filter === "month" && <span className="w-16 text-right">Prize</span>}
            <span className="w-16 text-right">Preds</span>
            <span className="w-16 text-right">Acc.</span>
            <span className="w-20 text-right">Points</span>
          </div>
          {players.map((p, i) => {
            const prizeLabels = ["20 AZN", "15 AZN", "10 AZN"];
            const prizeColors = ["text-amber-400", "text-slate-300", "text-orange-500"];
            return (
            <div key={p.id} className={`flex items-center px-4 py-2.5 border-b border-[--border] last:border-0 ${i < 3 ? rankBg[i] || "" : ""}`}>
              <span className="w-10">
                {i < 3 ? <span className="text-lg">{medals[i]}</span> : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[--surface] text-[11px] font-bold text-[--muted]">{i + 1}</span>
                )}
              </span>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[--surface] flex items-center justify-center text-xs shrink-0">
                  {p.avatar_url ? <img src={p.avatar_url} alt="" className="w-full h-full object-cover" /> : "👤"}
                </div>
                <div className={`text-sm font-bold truncate ${i === 0 && p.total_points > 0 ? "text-amber-400" : ""}`}>{p.username}</div>
              </div>
              {filter === "month" && (
                <span className="w-16 text-right">
                  {i < 3 && p.total_points > 0 ? (
                    <span className={`text-[11px] font-bold ${prizeColors[i]}`}>{prizeLabels[i]}</span>
                  ) : <span className="text-[11px] text-[--muted]">—</span>}
                </span>
              )}
              <span className="w-16 text-right text-xs text-[--muted]">{p.total_predictions}</span>
              <span className="w-16 text-right text-xs text-green-400">{p.accuracy}%</span>
              <span className="w-20 text-right text-sm font-extrabold text-green-400">{p.total_points}</span>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
