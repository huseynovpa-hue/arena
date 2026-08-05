"use client";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

function TeamLogo({ src, size = 36 }) {
  const [err, setErr] = useState(false);
  if (!src || err)
    return (
      <div className="rounded-full bg-[--surface] flex items-center justify-center text-[--muted]"
        style={{ width: size, height: size, fontSize: size * 0.45 }}>⚽</div>
    );
  return <img src={src} alt="" width={size} height={size} className="object-contain" onError={() => setErr(true)} />;
}

function ScoreBtn({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-1">
      <button disabled={disabled || value <= 0} onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded-md bg-[--card] border border-[--border] text-[--muted] text-base font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">−</button>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-extrabold transition-colors ${
        disabled ? "bg-[--surface] border-2 border-[--border] text-[--muted]" : "bg-[--bg] border-2 border-green-500 text-white"
      }`}>{value}</div>
      <button disabled={disabled} onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-md bg-[--card] border border-[--border] text-[--muted] text-base font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">+</button>
    </div>
  );
}

export default function MatchCard({ match, prediction, userId, onUpdate }) {
  const [homeScore, setHomeScore] = useState(prediction?.home_score ?? 0);
  const [awayScore, setAwayScore] = useState(prediction?.away_score ?? 0);
  const [firstToScore, setFirstToScore] = useState(prediction?.first_to_score ?? null);
  const [overUnder, setOverUnder] = useState(prediction?.over_under ?? null);
  const [saved, setSaved] = useState(!!prediction);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (prediction) {
      setHomeScore(prediction.home_score ?? 0);
      setAwayScore(prediction.away_score ?? 0);
      setFirstToScore(prediction.first_to_score ?? null);
      setOverUnder(prediction.over_under ?? null);
      setSaved(true);
      setEditing(false);
    }
  }, [prediction]);

  const isExpired = new Date(match.kick_off).getTime() <= Date.now();
  const isFinished = match.status === "finished";
  const isInputDisabled = (saved && !editing) || isExpired;
  const canSave = firstToScore !== null && overUnder !== null && userId;

  const total = homeScore + awayScore;
  const diff = homeScore - awayScore;
  const { day, time } = formatDate(match.kick_off);

  const hasChanges = saved && (
    homeScore !== prediction?.home_score ||
    awayScore !== prediction?.away_score ||
    firstToScore !== prediction?.first_to_score ||
    overUnder !== prediction?.over_under
  );

  let statusLabel = null;
  if (isFinished) {
    statusLabel = { text: `✅ Finished — ${match.home_score} : ${match.away_score}`, color: "text-green-400", bg: "bg-green-500/10 border-green-500/25" };
  } else if (isExpired) {
    statusLabel = { text: "⏳ In progress — awaiting results", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" };
  }

  async function savePrediction() {
    if (!canSave) return;
    setSaving(true);
    const { error } = await supabase.from("predictions").upsert(
      { user_id: userId, match_id: match.id, home_score: homeScore, away_score: awayScore, first_to_score: firstToScore, over_under: overUnder },
      { onConflict: "user_id,match_id" }
    );
    setSaving(false);
    if (!error) { setSaved(true); setEditing(false); onUpdate?.(); }
    else alert("Failed to save: " + error.message);
  }

  function startEditing() { if (!isExpired) setEditing(true); }

  function cancelEdit() {
    if (prediction) {
      setHomeScore(prediction.home_score ?? 0);
      setAwayScore(prediction.away_score ?? 0);
      setFirstToScore(prediction.first_to_score ?? null);
      setOverUnder(prediction.over_under ?? null);
    }
    setEditing(false);
  }

  const ftsOptions = [
    { val: "home", label: match.home_team },
    { val: "none", label: "No Goal" },
    { val: "away", label: match.away_team },
  ];
  const ftsLabel = firstToScore === "home" ? match.home_team : firstToScore === "away" ? match.away_team : firstToScore === "none" ? "No Goal" : "—";
  const ouLabel = overUnder === "over" ? "Over 2.5" : overUnder === "under" ? "Under 2.5" : "—";

  return (
    <div className={`card transition-colors ${saved && !editing ? "border-green-500/25" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[--surface] border-b border-[--border]">
        <span className="text-[10px] text-[--muted] font-semibold">{match.league}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[--muted]">{day} · {time}</span>
          {!isFinished && <Countdown kickoff={match.kick_off} />}
          {isFinished && <span className="text-[11px] font-bold text-green-400">FINISHED</span>}
        </div>
      </div>

      <div className="p-3.5">
        {/* Teams + Score */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 flex items-center justify-end gap-2">
            <span className="text-sm font-bold text-right">{match.home_team}</span>
            <TeamLogo src={match.home_badge} size={36} />
          </div>
          <ScoreBtn value={homeScore} onChange={setHomeScore} disabled={isInputDisabled} />
          <div className="text-[10px] font-extrabold text-[--muted] px-1 py-0.5 bg-[--bg] rounded">VS</div>
          <ScoreBtn value={awayScore} onChange={setAwayScore} disabled={isInputDisabled} />
          <div className="flex-1 flex items-center gap-2">
            <TeamLogo src={match.away_badge} size={36} />
            <span className="text-sm font-bold">{match.away_team}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-1.5 mt-3.5 justify-center flex-wrap">
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Diff</div>
            <div className="text-[13px] font-bold text-purple-400">{diff > 0 ? "+" : ""}{diff}</div>
          </div>
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Result</div>
            <div className="text-[13px] font-bold text-cyan-400">{diff > 0 ? "Home" : diff < 0 ? "Away" : "Draw"}</div>
          </div>
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Total</div>
            <div className="text-[13px] font-bold text-amber-400">{total} goals</div>
          </div>
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Max</div>
            <div className="text-[13px] font-bold text-amber-400">50 pts</div>
          </div>
          {prediction?.points != null && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1.5 text-center">
              <div className="text-[9px] text-green-400 uppercase tracking-wider">Earned</div>
              <div className="text-[13px] font-bold text-green-400">{prediction.points} pts</div>
            </div>
          )}
        </div>

        {/* Over / Under 2.5 selection */}
        <div className="mt-3">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1.5">Over / Under 2.5 goals</div>
          <div className="flex gap-1.5 justify-center">
            {[{ val: "over", label: "Over 2.5" }, { val: "under", label: "Under 2.5" }].map((o) => (
              <button key={o.val} disabled={isInputDisabled} onClick={() => setOverUnder(o.val)}
                className={`flex-1 max-w-[160px] py-1.5 px-2 rounded-lg text-[11px] font-semibold border-[1.5px] transition-all ${
                  overUnder === o.val
                    ? o.val === "over"
                      ? "bg-green-500/15 border-green-500 text-green-400"
                      : "bg-blue-500/15 border-blue-500 text-blue-400"
                    : "bg-[--bg] border-[--border] text-[--muted]"
                } disabled:cursor-not-allowed`}>{o.label}</button>
            ))}
          </div>
        </div>

        {/* First to Score */}
        <div className="mt-3">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1.5">First team to score</div>
          <div className="flex gap-1.5 justify-center">
            {ftsOptions.map((o) => (
              <button key={o.val} disabled={isInputDisabled} onClick={() => setFirstToScore(o.val)}
                className={`flex-1 max-w-[140px] py-1.5 px-1 rounded-lg text-[11px] font-semibold border-[1.5px] transition-all truncate ${
                  firstToScore === o.val ? "bg-green-500/15 border-green-500 text-green-400" : "bg-[--bg] border-[--border] text-[--muted]"
                } disabled:cursor-not-allowed`}>{o.label}</button>
            ))}
          </div>
        </div>

        {/* Saved prediction display + edit button */}
        {saved && !editing && (
          <div className="mt-3 py-2 px-3 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between">
            <span className="text-blue-400 text-[11px] font-bold">
              🔒 {prediction?.home_score} : {prediction?.away_score} · {ouLabel} · First: {ftsLabel}
            </span>
            {!isExpired && (
              <button onClick={startEditing}
                className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg hover:bg-amber-500/25 transition-colors">
                ✏️ Edit
              </button>
            )}
          </div>
        )}

        {/* Editing: save/cancel */}
        {editing && (
          <div className="mt-3 flex gap-2">
            <button onClick={cancelEdit}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-[--border] text-[--muted] hover:text-[--text] transition-colors">
              Cancel
            </button>
            <button onClick={savePrediction} disabled={!canSave || saving}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:brightness-110 disabled:opacity-40">
              {saving ? "Saving..." : "💾 SAVE CHANGES"}
            </button>
          </div>
        )}

        {/* First-time lock */}
        {!saved && !isExpired && (
          <button disabled={!canSave || saving} onClick={savePrediction}
            className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              canSave ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:brightness-110" : "bg-[--surface] border border-[--border] text-[--muted] cursor-not-allowed"
            }`}>
            {saving ? "Saving..." : !userId ? "Sign in to predict" : canSave ? "🔒 LOCK PREDICTION" : "Select O/U and first to score to lock"}
          </button>
        )}

        {/* Match status */}
        {statusLabel && (
          <div className={`mt-2 py-2 rounded-xl text-center border text-[11px] font-bold tracking-wide ${statusLabel.bg} ${statusLabel.color}`}>
            {statusLabel.text}
          </div>
        )}
      </div>
    </div>
  );
}
