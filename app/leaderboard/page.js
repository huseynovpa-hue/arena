"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("total_points", { ascending: false })
      .limit(50);
    setPlayers(data || []);
    setLoading(false);
  }

  if (loading) {
    return <div className="py-20 text-center text-[--muted]">Loading...</div>;
  }

  const medals = ["🥇", "🥈", "🥉"];
  const rankBg = [
    "bg-amber-500/5",
    "bg-slate-400/5",
    "bg-orange-700/5",
  ];

  return (
    <div className="py-4">
      <h1 className="text-lg font-black mb-4">🏆 Leaderboard</h1>

      {players.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-lg font-bold mb-1.5">No scores yet</h3>
          <p className="text-xs text-[--muted]">
            The leaderboard will populate after match results are entered.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Header */}
          <div className="flex items-center px-4 py-2.5 bg-[--surface] border-b border-[--border] text-[9px] text-[--muted] uppercase tracking-wider font-bold">
            <span className="w-10">#</span>
            <span className="flex-1">Player</span>
            <span className="w-16 text-right">Preds</span>
            <span className="w-16 text-right">Acc.</span>
            <span className="w-20 text-right">Points</span>
          </div>

          {players.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center px-4 py-2.5 border-b border-[--border] last:border-0 ${
                i < 3 ? rankBg[i] : ""
              }`}
            >
              {/* Rank */}
              <span className="w-10">
                {i < 3 ? (
                  <span className="text-lg">{medals[i]}</span>
                ) : (
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[--surface] text-[11px] font-bold text-[--muted]"
                  >
                    {i + 1}
                  </span>
                )}
              </span>

              {/* Player */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-bold truncate ${
                    i === 0 ? "text-amber-400" : ""
                  }`}
                >
                  {p.username}
                </div>
                {p.perfect_scores > 0 && (
                  <span className="text-[10px] text-green-400">
                    🎯 {p.perfect_scores} perfect
                  </span>
                )}
              </div>

              {/* Stats */}
              <span className="w-16 text-right text-xs text-[--muted]">
                {p.total_predictions}
              </span>
              <span className="w-16 text-right text-xs text-green-400">
                {p.accuracy}%
              </span>
              <span className="w-20 text-right text-sm font-extrabold text-green-400">
                {p.total_points}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
