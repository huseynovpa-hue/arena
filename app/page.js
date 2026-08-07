"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentWeek, formatWeekRange } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import MatchCard from "@/components/MatchCard";
import ShareCard from "@/components/ShareCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(true);

  const current = getCurrentWeek();
  const { t } = useLang();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from("profiles").select("username").eq("id", data.user.id).single()
          .then(({ data: p }) => { if (p) setProfile(p); });
      }
    });
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
                  {isCur ? `📍 ${t.currentWeek}` : `Week ${w.week_number}`} — {formatWeekRange(w.week_number, w.year)}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Monthly prize banner */}
      {weeks.length > 0 && (
        <div className="card p-2.5 mb-3" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(34,197,94,0.06))" }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400">🏆 {t.monthlyPrizes}</span>
            <div className="flex gap-2 text-[10px] font-bold">
              <span className="text-amber-400">🥇 20 AZN</span>
              <span className="text-slate-400">🥈 15 AZN</span>
              <span className="text-orange-600">🥉 10 AZN</span>
            </div>
          </div>
          <div className="text-[9px] text-[--muted] mt-1">{t.prizesActivate}</div>
        </div>
      )}

      {/* Progress bar */}
      {matches.length > 0 && (
        <div className="card p-3.5 mb-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs font-bold mb-1.5">
              {isCurrentWeek ? `📍 ${t.currentWeek}` : `Week ${selectedWeekInfo?.week_number || ""}`}
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
              {openCount > 0 && <span className="text-[--muted]">{openCount} {t.open}</span>}
              {lockedCount === matches.length && matches.length > 0 && <span className="text-green-400">{t.allLocked}</span>}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-green-400">{lockedCount}</div>
            <div className="text-[7px] text-[--muted] uppercase tracking-wider">of {matches.length}</div>
          </div>
        </div>
      )}

      {/* Share button — show when there are scored predictions */}
      {matches.length > 0 && Object.values(predictions).some(p => p.points != null) && (
        <button onClick={() => setShowShare(true)}
          className="w-full mb-4 py-2.5 rounded-xl text-xs font-bold border border-[--border] text-[--muted] hover:border-green-500/50 hover:text-green-400 transition-all flex items-center justify-center gap-2">
          {t.shareMyScore}
        </button>
      )}

      {/* Share modal */}
      {showShare && (
        <ShareCard
          weekLabel={isCurrentWeek ? t.currentWeek : `Week ${selectedWeekInfo?.week_number || ""}`}
          matches={matches}
          predictions={predictions}
          username={profile?.username}
          onClose={() => setShowShare(false)}
        />
      )}

      {/* No weeks at all */}
      {weeks.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">⚽</div>
          <h3 className="text-lg font-bold mb-1.5">{t.noMatchesYet}</h3>
          <p className="text-xs text-[--muted]">The admin will add this week&#39;s matches soon. Check back later!</p>
        </div>
      )}

      {/* No matches in selected week */}
      {weeks.length > 0 && matches.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">📋</div>
          <h3 className="text-lg font-bold mb-1.5">{t.noMatchesThisWeek}</h3>
          <p className="text-xs text-[--muted]">{t.noMatchesThisWeekDesc}</p>
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
