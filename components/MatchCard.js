"use client";
import { useState } from "react";
import Countdown from "./Countdown";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

function TeamLogo({ src, size = 36 }) {
  const [err, setErr] = useState(false);
  if (!src || err)
    return (
      <div
        className="rounded-full bg-[--surface] flex items-center justify-center text-[--muted]"
        style={{ width: size, height: size, fontSize: size * 0.45 }}
      >
        ⚽
      </div>
    );
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="object-contain"
      onError={() => setErr(true)}
    />
  );
}

function ScoreBtn({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={disabled || value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded-md bg-[--card] border border-[--border] text-[--muted] text-base font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </button>
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-extrabold transition-colors ${
          disabled
            ? "bg-[--surface] border-2 border-[--border] text-[--muted]"
            : "bg-[--bg] border-2 border-green-500 text-white"
        }`}
      >
        {value}
      </div>
      <button
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-md bg-[--card] border border-[--border] text-[--muted] text-base font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}

export default function MatchCard({ match, prediction, userId, onUpdate }) {
  const [homeScore, setHomeScore] = useState(prediction?.home_score ?? 0);
  const [awayScore, setAwayScore] = useState(prediction?.away_score ?? 0);
  const [firstToScore, setFirstToScore] = useState(prediction?.first_to_score ?? null);
  const [locked, setLocked] = useState(!!prediction);
  const [saving, setSaving] = useState(false);

  const isExpired = new Date(match.kick_off).getTime() <= Date.now();
  const isLocked = locked || isExpired;
  const canLock = !isLocked && firstToScore !== null && userId;

  const total = homeScore + awayScore;
  const overUnder = total > 2.5 ? "Over" : "Under";
  const diff = homeScore - awayScore;
  const { day, time } = formatDate(match.kick_off);

  async function lockPrediction() {
    if (!canLock) return;
    setSaving(true);
    const { error } = await supabase.from("predictions").upsert(
      {
        user_id: userId,
        match_id: match.id,
        home_score: homeScore,
        away_score: awayScore,
        first_to_score: firstToScore,
      },
      { onConflict: "user_id,match_id" }
    );
    setSaving(false);
    if (!error) {
      setLocked(true);
      onUpdate?.();
    } else {
      alert("Failed to save: " + error.message);
    }
  }

  const ftsOptions = [
    { val: "home", label: match.home_team },
    { val: "none", label: "No Goal" },
    { val: "away", label: match.away_team },
  ];

  return (
    <div
      className={`card transition-colors ${
        locked ? "border-green-500/25" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[--surface] border-b border-[--border]">
        <span className="text-[10px] text-[--muted] font-semibold">
          {match.league}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[--muted]">
            {day} · {time}
          </span>
          <Countdown kickoff={match.kick_off} />
        </div>
      </div>

      <div className="p-3.5">
        {/* Teams + Score */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 flex items-center justify-end gap-2">
            <span className="text-sm font-bold text-right">{match.home_team}</span>
            <TeamLogo src={match.home_badge} size={36} />
          </div>

          <ScoreBtn value={homeScore} onChange={setHomeScore} disabled={isLocked} />
          <div className="text-[10px] font-extrabold text-[--muted] px-1 py-0.5 bg-[--bg] rounded">
            VS
          </div>
          <ScoreBtn value={awayScore} onChange={setAwayScore} disabled={isLocked} />

          <div className="flex-1 flex items-center gap-2">
            <TeamLogo src={match.away_badge} size={36} />
            <span className="text-sm font-bold">{match.away_team}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-1.5 mt-3.5 justify-center flex-wrap">
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">O/U 2.5</div>
            <div className={`text-[13px] font-bold ${overUnder === "Over" ? "text-green-400" : "text-blue-400"}`}>
              {overUnder} ({total})
            </div>
          </div>
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Diff</div>
            <div className="text-[13px] font-bold text-purple-400">
              {diff > 0 ? "+" : ""}{diff}
            </div>
          </div>
          <div className="bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-center">
            <div className="text-[9px] text-[--muted] uppercase tracking-wider">Max</div>
            <div className="text-[13px] font-bold text-amber-400">45 pts</div>
          </div>
          {prediction?.points != null && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1.5 text-center">
              <div className="text-[9px] text-green-400 uppercase tracking-wider">Earned</div>
              <div className="text-[13px] font-bold text-green-400">{prediction.points} pts</div>
            </div>
          )}
        </div>

        {/* First to Score */}
        <div className="mt-3">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1.5">
            First team to score
          </div>
          <div className="flex gap-1.5 justify-center">
            {ftsOptions.map((o) => (
              <button
                key={o.val}
                disabled={isLocked}
                onClick={() => setFirstToScore(o.val)}
                className={`flex-1 max-w-[140px] py-1.5 px-1 rounded-lg text-[11px] font-semibold border-[1.5px] transition-all truncate ${
                  firstToScore === o.val
                    ? "bg-green-500/15 border-green-500 text-green-400"
                    : "bg-[--bg] border-[--border] text-[--muted]"
                } disabled:cursor-not-allowed`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lock button */}
        {!locked && (
          <button
            disabled={!canLock || saving}
            onClick={lockPrediction}
            className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              canLock
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:brightness-110"
                : "bg-[--surface] border border-[--border] text-[--muted] cursor-not-allowed"
            }`}
          >
            {saving
              ? "Saving..."
              : isExpired
              ? "⏱ MATCH STARTED"
              : !userId
              ? "Sign in to predict"
              : canLock
              ? "🔒 LOCK PREDICTION"
              : "Select first to score to lock"}
          </button>
        )}

        {locked && (
          <div className="mt-3 py-2 rounded-xl text-center bg-green-500/10 border border-green-500/25 text-green-400 text-[11px] font-bold tracking-wide">
            ✓ LOCKED — {homeScore} : {awayScore} · First:{" "}
            {firstToScore === "home"
              ? match.home_team
              : firstToScore === "away"
              ? match.away_team
              : "No Goal"}
          </div>
        )}
      </div>
    </div>
  );
}
