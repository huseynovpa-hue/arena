"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toBakuISO } from "@/lib/utils";
import TeamSearch from "@/components/TeamSearch";

export default function AdminPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("add");
  const router = useRouter();

  // Add match state
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [league, setLeague] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weekNum, setWeekNum] = useState(1);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // Manage state
  const [matches, setMatches] = useState([]);
  const [resultMatch, setResultMatch] = useState(null);
  const [resultHome, setResultHome] = useState(0);
  const [resultAway, setResultAway] = useState(0);
  const [resultFirst, setResultFirst] = useState("home");

  useEffect(() => {
    checkAdmin();
    loadMatches();
  }, []);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    if (!data?.is_admin) { router.push("/"); return; }
    setProfile(data);
    setLoading(false);
  }

  async function loadMatches() {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("kick_off", { ascending: true });
    setMatches(data || []);
  }

  async function addMatch() {
    if (!homeTeam || !awayTeam || !date || !time) return;
    setSaving(true);
    setSuccess("");

    // Ensure week exists
    const year = new Date(`${date}T${time}`).getFullYear();
    const { data: existingWeek } = await supabase
      .from("weeks")
      .select("id")
      .eq("week_number", weekNum)
      .eq("year", year)
      .single();

    let weekId;
    if (existingWeek) {
      weekId = existingWeek.id;
    } else {
      const { data: newWeek } = await supabase
        .from("weeks")
        .insert({ week_number: weekNum, year, title: `Week ${weekNum}` })
        .select("id")
        .single();
      weekId = newWeek?.id;
    }

    const { error } = await supabase.from("matches").insert({
      week_id: weekId,
      home_team: homeTeam.name,
      home_badge: homeTeam.badge,
      away_team: awayTeam.name,
      away_badge: awayTeam.badge,
      league: league || homeTeam.league || "Football",
      kick_off: toBakuISO(date, time),
    });

    setSaving(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setSuccess("Match added!");
      setHomeTeam(null);
      setAwayTeam(null);
      setLeague("");
      setDate("");
      setTime("");
      loadMatches();
      setTimeout(() => setSuccess(""), 3000);
    }
  }

  async function deleteMatch(id) {
    if (!confirm("Delete this match?")) return;
    await supabase.from("matches").delete().eq("id", id);
    loadMatches();
  }

  async function submitResult() {
    if (!resultMatch) return;
    // Update match with result
    await supabase
      .from("matches")
      .update({
        home_score: resultHome,
        away_score: resultAway,
        first_to_score: resultFirst,
        status: "finished",
      })
      .eq("id", resultMatch.id);

    // Score all predictions
    await supabase.rpc("score_match", { match_uuid: resultMatch.id });

    setResultMatch(null);
    loadMatches();
    alert("Result saved and predictions scored!");
  }

  if (loading) return <div className="py-20 text-center text-[--muted]">Loading...</div>;

  return (
    <div className="py-4">
      <h1 className="text-lg font-black mb-4">⚙ Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-4">
        {[
          { k: "add", l: "➕ Add Match" },
          { k: "manage", l: `📋 Matches (${matches.length})` },
          { k: "results", l: "📊 Enter Results" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              tab === t.k
                ? "bg-green-500/15 border-green-500 text-green-400"
                : "border-[--border] text-[--muted]"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {/* ADD MATCH */}
      {tab === "add" && (
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-bold">🏟️ Add New Match</h2>

          <div>
            <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
              Week Number
            </label>
            <input
              type="number"
              min="1"
              value={weekNum}
              onChange={(e) => setWeekNum(parseInt(e.target.value) || 1)}
              className="input-dark w-24"
            />
          </div>

          <TeamSearch label="Home Team" selected={homeTeam} onSelect={setHomeTeam} />
          <TeamSearch label="Away Team" selected={awayTeam} onSelect={setAwayTeam} />

          {homeTeam && awayTeam && (
            <div className="flex items-center justify-center gap-4 p-4 bg-[--bg] rounded-xl border border-[--border]">
              <div className="flex items-center gap-2">
                {homeTeam.badge && <img src={homeTeam.badge} className="w-10 h-10 object-contain" />}
                <span className="font-bold text-sm">{homeTeam.name}</span>
              </div>
              <span className="text-[10px] font-extrabold text-[--muted] px-2 py-0.5 bg-[--surface] rounded">VS</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{awayTeam.name}</span>
                {awayTeam.badge && <img src={awayTeam.badge} className="w-10 h-10 object-contain" />}
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
              League / Competition
            </label>
            <input
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              placeholder={homeTeam?.league || "e.g. Premier League"}
              className="input-dark"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
                Date
              </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-dark" />
            </div>
            <div className="flex-1">
              <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
                Kick-off
              </label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-dark" />
            </div>
          </div>

          <button
            onClick={addMatch}
            disabled={!homeTeam || !awayTeam || !date || !time || saving}
            className="btn-accent w-full"
          >
            {saving ? "Adding..." : "➕ ADD MATCH"}
          </button>

          {success && (
            <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-2.5 text-center">
              ✓ {success}
            </div>
          )}
        </div>
      )}

      {/* MANAGE */}
      {tab === "manage" && (
        <div className="space-y-2">
          {matches.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-sm text-[--muted]">No matches yet. Add some!</p>
            </div>
          ) : (
            matches.map((m) => (
              <div key={m.id} className="card p-3 flex items-center gap-2.5">
                {m.home_badge && <img src={m.home_badge} className="w-6 h-6 object-contain" />}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">
                    {m.home_team} vs {m.away_team}
                  </div>
                  <div className="text-[10px] text-[--muted]">
                    {m.league} ·{" "}
                    {new Date(m.kick_off).toLocaleString("en-US", {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                    {m.status === "finished" && (
                      <span className="text-green-400 ml-1">
                        ✓ {m.home_score}-{m.away_score}
                      </span>
                    )}
                  </div>
                </div>
                {m.away_badge && <img src={m.away_badge} className="w-6 h-6 object-contain" />}
                <button onClick={() => deleteMatch(m.id)} className="btn-red">✕</button>
              </div>
            ))
          )}
        </div>
      )}

      {/* RESULTS */}
      {tab === "results" && (
        <div className="space-y-3">
          <p className="text-xs text-[--muted]">
            Select a finished match to enter the actual result. All predictions will be scored automatically.
          </p>
          {matches
            .filter((m) => m.status !== "finished")
            .map((m) => (
              <button
                key={m.id}
                onClick={() => { setResultMatch(m); setResultHome(0); setResultAway(0); setResultFirst("home"); }}
                className={`w-full card p-3 flex items-center gap-2.5 text-left transition-colors ${
                  resultMatch?.id === m.id ? "border-green-500/40" : ""
                }`}
              >
                {m.home_badge && <img src={m.home_badge} className="w-6 h-6 object-contain" />}
                <div className="flex-1">
                  <div className="text-xs font-bold">{m.home_team} vs {m.away_team}</div>
                  <div className="text-[10px] text-[--muted]">{m.league}</div>
                </div>
                {m.away_badge && <img src={m.away_badge} className="w-6 h-6 object-contain" />}
              </button>
            ))}

          {resultMatch && (
            <div className="card p-5 space-y-4 border-green-500/30">
              <h3 className="text-sm font-bold">
                Enter result: {resultMatch.home_team} vs {resultMatch.away_team}
              </h3>
              <div className="flex items-center gap-4 justify-center">
                <div className="text-center">
                  <div className="text-[10px] text-[--muted] uppercase mb-1">{resultMatch.home_team}</div>
                  <input
                    type="number" min="0" value={resultHome}
                    onChange={(e) => setResultHome(parseInt(e.target.value) || 0)}
                    className="input-dark w-16 text-center text-lg font-bold"
                  />
                </div>
                <span className="text-[--muted] font-bold">—</span>
                <div className="text-center">
                  <div className="text-[10px] text-[--muted] uppercase mb-1">{resultMatch.away_team}</div>
                  <input
                    type="number" min="0" value={resultAway}
                    onChange={(e) => setResultAway(parseInt(e.target.value) || 0)}
                    className="input-dark w-16 text-center text-lg font-bold"
                  />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[--muted] uppercase tracking-wider mb-1.5 text-center">
                  First team to score
                </div>
                <div className="flex gap-1.5 justify-center">
                  {[
                    { val: "home", label: resultMatch.home_team },
                    { val: "none", label: "No Goal" },
                    { val: "away", label: resultMatch.away_team },
                  ].map((o) => (
                    <button
                      key={o.val}
                      onClick={() => setResultFirst(o.val)}
                      className={`flex-1 max-w-[140px] py-1.5 rounded-lg text-xs font-semibold border-[1.5px] truncate ${
                        resultFirst === o.val
                          ? "bg-green-500/15 border-green-500 text-green-400"
                          : "bg-[--bg] border-[--border] text-[--muted]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={submitResult} className="btn-gold w-full">
                ✓ SAVE RESULT & SCORE PREDICTIONS
              </button>
            </div>
          )}

          {matches.filter((m) => m.status === "finished").length > 0 && (
            <>
              <h3 className="text-xs font-bold text-[--muted] mt-6">Completed</h3>
              {matches.filter((m) => m.status === "finished").map((m) => (
                <div key={m.id} className="card p-3 flex items-center gap-2.5 opacity-60">
                  <div className="flex-1">
                    <div className="text-xs font-bold">
                      {m.home_team} {m.home_score} - {m.away_score} {m.away_team}
                    </div>
                    <div className="text-[10px] text-green-400">✓ Scored</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
