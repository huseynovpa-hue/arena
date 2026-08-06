"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentWeek, formatWeekRange } from "@/lib/utils";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  const current = getCurrentWeek();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    loadWeeks();
  }, []);

  useEffect(() => {
    if (selectedWeek !== null) loadMatches();
  }, [selectedWeek]);

  useEffect(() => {
    if (user && matches.length > 0) loadPredictions();
  }, [user, matches]);

  async function loadWeeks() {
    const { data } = await supabase.from("weeks").select("*")
      .order("year", { ascending: false }).order("week_number", { ascending: false });
    const wks = data || [];
    setWeeks(wks);

    // Default to current week, or latest week if current doesn't exist
    const cur = wks.find(w => w.week_number === current.week && w.year === current.year);
    setSelectedWeek(cur?.id || wks[0]?.id || null);
    setLoading(false);
  }

  async function loadMatches() {
    if (!selectedWeek) { setMatches([]); return; }
    const { data } = await supabase
      .from("matches").select("*")
      .eq("week_id", selectedWeek)
      .order("kick_off", { ascending: true });
    setMatches(data || []);
  }

  async function loadPredictions() {
    if (!user) return;
    const matchIds = matches.map(m => m.id);
    if (matchIds.length === 0) { setPredictions({}); return; }
    const { data } = await supabase
      .from("predictions").select("*")
      .eq("user_id", user.id)
      .in("match_id", matchIds);
    const map = {};
    (data || []).forEach(p => map[p.match_id] = p);
    setPredictions(map);
  }

  const lockedCount = Object.keys(predictions).length;
  const now = Date.now();
  const missedCount = matches.filter(m => new Date(m.kick_off).getTime() <= now && !predictions[m.id]).length;
  const openCount = matches.filter(m => new Date(m.kick_off).getTime() > now && !predictions[m.id]).length;

  // Find selected week info
  const selectedWeekInfo = weeks.find(w => w.id === selectedWeek);
  const isCurrentWeek = selectedWeekInfo && selectedWeekInfo.week_number === current.week && selectedWeekInfo.year === current.year;

  if (loading) {
    return <div className="text-center py-20 text-[--muted]">Loading...</div>;
  }

  return (
    <div className="py-4">
      {/* Week selector */}
      {weeks.length > 0 && (
        <div className="mb-4">
          <select
            value={selectedWeek || ""}
            onChange={e => { setSelectedWeek(parseInt(e.target.value)); setPredictions({}); }}
            className="input-dark w-full text-sm font-semibold cursor-pointer"
          >
            {weeks.map(w => {
              const isCur = w.week_number === current.week && w.year === current.year;
              return (
                <option key={w.id} value={w.id}>
                  {isCur ? "📍 Current Week" : `Week ${w.week_number}`} — {formatWeekRange(w.week_number, w.year)}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Progress bar */}
      {matches.length > 0 && (
        <div className="card p-3.5 mb-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs font-bold mb-1.5">
              {isCurrentWeek ? "📍 Current Week" : `Week ${selectedWeekInfo?.week_number || ""}`}
            </div>
            <div className="h-1.5 rounded-full bg-[--surface] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{ width: `${matches.length > 0 ? (lockedCount / matches.length) * 100 : 0}%` }}
              />
            </div>
            <div className="flex gap-3 mt-1.5 text-[10px]">
              <span className="text-green-400 font-semibold">✓ {lockedCount} locked</span>
              {missedCount > 0 && <span className="text-red-400 font-semibold">✕ {missedCount} missed</span>}
              {openCount > 0 && <span className="text-[--muted]">{openCount} open</span>}
              {lockedCount === matches.length && matches.length > 0 && <span className="text-green-400">All locked! Good luck 🍀</span>}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-green-400">{lockedCount}</div>
            <div className="text-[7px] text-[--muted] uppercase tracking-wider">of {matches.length}</div>
          </div>
        </div>
      )}

      {/* No weeks at all */}
      {weeks.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">⚽</div>
          <h3 className="text-lg font-bold mb-1.5">No matches yet</h3>
          <p className="text-xs text-[--muted]">The admin will add this week&#39;s matches soon. Check back later!</p>
        </div>
      )}

      {/* No matches in selected week */}
      {weeks.length > 0 && matches.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">📋</div>
          <h3 className="text-lg font-bold mb-1.5">No matches this week</h3>
          <p className="text-xs text-[--muted]">Try selecting a different week from the dropdown above.</p>
        </div>
      )}

      {/* Match list */}
      {matches.length > 0 && (
        <div className="flex flex-col gap-3">
          {matches.map(m => (
            <MatchCard
              key={m.id}
              match={m}
              prediction={predictions[m.id]}
              userId={user?.id}
              onUpdate={loadPredictions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
