"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

export default function MatchCard({ match, prediction, userId, onUpdate }) {
  if (!match) return null;

  const { t } = useLang();

  // Normalize Supabase DB fields (snake_case) or standard JS object fields
  const homeTeamName = match.home_team || match.homeTeam?.name || "Home Team";
  const awayTeamName = match.away_team || match.awayTeam?.name || "Away Team";
  const homeLogo = match.home_logo || match.home_logo_url || match.homeTeam?.logo;
  const awayLogo = match.away_logo || match.away_logo_url || match.awayTeam?.logo;
  const leagueName = match.league || "Super Lig";
  
  // Kickoff calculation
  const kickoffDate = match.kick_off ? new Date(match.kick_off) : null;
  const isMatchLocked = kickoffDate ? kickoffDate.getTime() <= Date.now() : match.status === "locked" || match.status === "finished";
  const isFinished = match.status === "finished";

  // Formatted match time label
  const timeLabel = kickoffDate 
    ? `${kickoffDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${kickoffDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : match.time || "Today";

  // Form State initialized from prediction prop
  const [homeScore, setHomeScore] = useState(prediction?.home_score ?? prediction?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(prediction?.away_score ?? prediction?.awayScore ?? 0);
  const [overUnder, setOverUnder] = useState(prediction?.over_under ?? prediction?.overUnder ?? null);
  const [firstToScore, setFirstToScore] = useState(prediction?.first_to_score ?? prediction?.firstToScore ?? null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  // Sync state if prediction updates externally
  useEffect(() => {
    if (prediction) {
      setHomeScore(prediction.home_score ?? prediction.homeScore ?? 0);
      setAwayScore(prediction.away_score ?? prediction.awayScore ?? 0);
      setOverUnder(prediction.over_under ?? prediction.overUnder ?? null);
      setFirstToScore(prediction.first_to_score ?? prediction.firstToScore ?? null);
    }
  }, [prediction]);

  const hasPrediction = Boolean(prediction);
  const isFormReadonly = (hasPrediction && !isEditing) || isMatchLocked;

  // Fallback helper for club initials
  const getInitials = (name) => {
    if (!name) return "FC";
    return name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  };

  const handleSavePrediction = async () => {
    if (!userId) {
      alert("Please log in to save your prediction.");
      return;
    }
    if (!overUnder || !firstToScore) return;

    setSaving(true);

    const payload = {
      user_id: userId,
      match_id: match.id,
      home_score: homeScore,
      away_score: awayScore,
      over_under: overUnder,
      first_to_score: firstToScore,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("predictions")
      .upsert(payload, { onConflict: "user_id,match_id" });

    setSaving(false);

    if (error) {
      console.error("Failed to save prediction:", error.message);
    } else {
      setIsEditing(false);
      if (onUpdate) onUpdate();
    }
  };

  return (
    <div className="card overflow-hidden my-3 border border-slate-800 bg-slate-900/95 shadow-xl rounded-2xl">
      {/* 1. HEADER RIBBON */}
      <div className="bg-slate-950/80 py-2.5 px-4 flex items-center justify-between border-b border-slate-800 text-xs font-bold text-slate-300">
        <span className="text-amber-400 font-extrabold tracking-wide uppercase">
          {leagueName}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">{timeLabel}</span>
          {isFinished && (
            <span className="text-emerald-400 text-[10px] font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 uppercase">
              {t?.finished || "Finished"}
            </span>
          )}
          {!isFinished && isMatchLocked && (
            <span className="text-red-400 text-[10px] font-extrabold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40 uppercase">
              {t?.locked || "Locked"}
            </span>
          )}
        </div>
      </div>

      {/* 2. MATCH TEAMS & SCORE COUNTERS */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-2">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700/80 p-1 flex items-center justify-center shadow-md">
            {!imgErrors.home && homeLogo ? (
              <img
                src={homeLogo}
                alt={homeTeamName}
                className="w-10 h-10 object-contain"
                onError={() => setImgErrors((p) => ({ ...p, home: true }))}
              />
            ) : (
              <span className="font-black text-amber-400 text-xs tracking-wider">
                {getInitials(homeTeamName)}
              </span>
            )}
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-100 tracking-wide text-center uppercase">
            {homeTeamName}
          </span>
        </div>

        {/* Center Score Control */}
        <div className="flex items-center gap-2">
          {/* Home Score */}
          <div className="flex items-center gap-1">
            {!isFormReadonly && (
              <button
                type="button"
                onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg"
              >
                -
              </button>
            )}
            <div className="w-10 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-black text-2xl text-white shadow-inner">
              {homeScore}
            </div>
            {!isFormReadonly && (
              <button
                type="button"
                onClick={() => setHomeScore(homeScore + 1)}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg"
              >
                +
              </button>
            )}
          </div>

          <span className="text-slate-500 font-black px-1 text-xs">VS</span>

          {/* Away Score */}
          <div className="flex items-center gap-1">
            {!isFormReadonly && (
              <button
                type="button"
                onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg"
              >
                -
              </button>
            )}
            <div className="w-10 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-black text-2xl text-white shadow-inner">
              {awayScore}
            </div>
            {!isFormReadonly && (
              <button
                type="button"
                onClick={() => setAwayScore(awayScore + 1)}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg"
              >
                +
              </button>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700/80 p-1 flex items-center justify-center shadow-md">
            {!imgErrors.away && awayLogo ? (
              <img
                src={awayLogo}
                alt={awayTeamName}
                className="w-10 h-10 object-contain"
                onError={() => setImgErrors((p) => ({ ...p, away: true }))}
              />
            ) : (
              <span className="font-black text-amber-400 text-xs tracking-wider">
                {getInitials(awayTeamName)}
              </span>
            )}
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-100 tracking-wide text-center uppercase">
            {awayTeamName}
          </span>
        </div>
      </div>

      {/* 3. EXTRA PREDICTIONS SELECTION (EDITING OR INITIAL FORM) */}
      {!isFormReadonly && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-800 pt-3 bg-slate-950/40">
          {/* Over / Under 2.5 */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 text-center mb-2">
              Over / Under 2.5
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setOverUnder("over")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-150 border ${
                  overUnder === "over"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.35)] scale-[1.02]"
                    : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-600 shadow-sm"
                }`}
              >
                Over 2.5
              </button>
              <button
                type="button"
                onClick={() => setOverUnder("under")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-150 border ${
                  overUnder === "under"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.35)] scale-[1.02]"
                    : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-600 shadow-sm"
                }`}
              >
                Under 2.5
              </button>
            </div>
          </div>

          {/* First Team to Score */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 text-center mb-2">
              First Team To Score
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFirstToScore("home")}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all duration-150 border truncate ${
                  firstToScore === "home"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.35)] scale-[1.02]"
                    : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-600 shadow-sm"
                }`}
              >
                {homeTeamName}
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("none")}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all duration-150 border ${
                  firstToScore === "none"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.35)] scale-[1.02]"
                    : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-600 shadow-sm"
                }`}
              >
                No Goal
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("away")}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all duration-150 border truncate ${
                  firstToScore === "away"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.35)] scale-[1.02]"
                    : "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-600 shadow-sm"
                }`}
              >
                {awayTeamName}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSavePrediction}
              disabled={!overUnder || !firstToScore || saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-900/30 transition active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "SAVE PREDICTION"}
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBMITTED PREDICTION SUMMARY BAR */}
      {hasPrediction && !isEditing && (
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs px-4">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold">
            <span>{homeScore} - {awayScore}</span>
            <span>•</span>
            <span className="capitalize">{overUnder ? `${overUnder} 2.5` : ""}</span>
            <span>•</span>
            <span className="capitalize">
              {firstToScore === "home" ? homeTeamName : firstToScore === "away" ? awayTeamName : "No Goal"}
            </span>
          </div>

          {!isMatchLocked && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-600 font-bold transition flex items-center gap-1"
            >
              ✏️ {t?.edit || "Edit"}
            </button>
          )}
        </div>
      )}

      {/* 5. FINISHED MATCH STATE / POINTS */}
      {isFinished && prediction && (
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-center">
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl px-5 py-1 text-center">
            <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest block">Earned</span>
            <span className="text-sm font-black text-emerald-300">
              +{prediction.points ?? prediction.points_earned ?? 0} pts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
