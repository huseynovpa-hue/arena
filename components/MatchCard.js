"use client";

import { useState } from "react";

export default function MatchCard({ match }) {
  if (!match) return null;

  const {
    id = "1",
    league = "Super Lig",
    time = "Today · 14:25",
    countdown = null,
    homeTeam = { name: "Fenerbahçe", logo: "/logos/fenerbahce.png" },
    awayTeam = { name: "Galatasaray", logo: "/logos/galatasaray.png" },
    status = "open", // 'open' | 'locked' | 'finished'
    earnedPoints = 0,
    initialPrediction = null,
  } = match;

  const [homeScore, setHomeScore] = useState(initialPrediction?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(initialPrediction?.awayScore ?? 0);
  const [overUnder, setOverUnder] = useState(initialPrediction?.overUnder ?? null);
  const [firstToScore, setFirstToScore] = useState(initialPrediction?.firstToScore ?? null);
  const [isSubmitted, setIsSubmitted] = useState(Boolean(initialPrediction));
  const [imgErrors, setImgErrors] = useState({});

  const isFinished = status === "finished";

  // Helper for team initials fallback if image path is missing
  const getInitials = (name) => {
    if (!name) return "FC";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  };

  const handleImageError = (teamKey) => {
    setImgErrors((prev) => ({ ...prev, [teamKey]: true }));
  };

  return (
    <div className="game-card overflow-hidden my-5">
      {/* 1. HEADER RIBBON */}
      <div className="game-ribbon py-2 px-4 flex items-center justify-between text-xs font-bold text-slate-300">
        <span className="text-amber-400 font-extrabold tracking-wide uppercase">
          {league}
        </span>
        <div className="flex items-center gap-2">
          <span>{time}</span>
          {countdown && status === "open" && (
            <span className="text-red-400 font-mono font-extrabold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
              {countdown}
            </span>
          )}
          {isFinished && (
            <span className="text-emerald-400 font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 uppercase">
              Finished
            </span>
          )}
        </div>
      </div>

      {/* 2. MATCH TEAMS & SCORE COUNTERS */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-2">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="game-badge-frame">
            <div className="game-badge-inner">
              {!imgErrors.home && homeTeam.logo ? (
                <img
                  src={homeTeam.logo}
                  alt={homeTeam.name}
                  className="w-10 h-10 object-contain"
                  onError={() => handleImageError("home")}
                />
              ) : (
                <span className="font-black text-amber-400 text-sm tracking-wider">
                  {getInitials(homeTeam.name)}
                </span>
              )}
            </div>
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide text-center uppercase drop-shadow">
            {homeTeam.name}
          </span>
        </div>

        {/* Center Score Controls */}
        <div className="flex items-center gap-2">
          {/* Home Score */}
          <div className="flex items-center gap-1">
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg shadow-md"
              >
                -
              </button>
            )}
            <div className="w-11 h-12 rounded-xl bg-slate-950 border border-slate-600 flex items-center justify-center font-black text-2xl text-white shadow-inner">
              {homeScore}
            </div>
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setHomeScore(homeScore + 1)}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg shadow-md"
              >
                +
              </button>
            )}
          </div>

          <span className="text-slate-400 font-black px-1 text-xs">VS</span>

          {/* Away Score */}
          <div className="flex items-center gap-1">
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg shadow-md"
              >
                -
              </button>
            )}
            <div className="w-11 h-12 rounded-xl bg-slate-950 border border-slate-600 flex items-center justify-center font-black text-2xl text-white shadow-inner">
              {awayScore}
            </div>
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setAwayScore(awayScore + 1)}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center text-lg shadow-md"
              >
                +
              </button>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="game-badge-frame">
            <div className="game-badge-inner">
              {!imgErrors.away && awayTeam.logo ? (
                <img
                  src={awayTeam.logo}
                  alt={awayTeam.name}
                  className="w-10 h-10 object-contain"
                  onError={() => handleImageError("away")}
                />
              ) : (
                <span className="font-black text-amber-400 text-sm tracking-wider">
                  {getInitials(awayTeam.name)}
                </span>
              )}
            </div>
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide text-center uppercase drop-shadow">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* 3. EXTRA PREDICTIONS (OVER/UNDER & FIRST TO SCORE) */}
      {!isFinished && !isSubmitted && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-700/60 pt-3 bg-slate-900/40">
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
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.4)] scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-sm"
                }`}
              >
                Over 2.5
              </button>
              <button
                type="button"
                onClick={() => setOverUnder("under")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-150 border ${
                  overUnder === "under"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.4)] scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-sm"
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
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.4)] scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-sm"
                }`}
              >
                {homeTeam.name}
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("none")}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all duration-150 border ${
                  firstToScore === "none"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.4)] scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-sm"
                }`}
              >
                No Goal
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("away")}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all duration-150 border truncate ${
                  firstToScore === "away"
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.4)] scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-sm"
                }`}
              >
                {awayTeam.name}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsSubmitted(true)}
              disabled={!overUnder || !firstToScore}
              className="btn-game-green w-full py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save Prediction
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBMITTED PREDICTION SUMMARY BAR */}
      {isSubmitted && !isFinished && (
        <div className="p-3 bg-slate-950/90 border-t border-slate-700 flex items-center justify-between text-xs px-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span>{homeScore}:{awayScore}</span>
            <span>•</span>
            <span className="capitalize">{overUnder ? `${overUnder} 2.5` : ""}</span>
            <span>•</span>
            <span className="capitalize">
              {firstToScore === "home" ? homeTeam.name : firstToScore === "away" ? awayTeam.name : "No Goal"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition border border-slate-600"
            title="Edit Prediction"
          >
            ✏️
          </button>
        </div>
      )}

      {/* 5. FINISHED MATCH STATE */}
      {isFinished && (
        <div className="p-3 bg-slate-950/90 border-t border-slate-700 flex items-center justify-center">
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl px-5 py-1 text-center">
            <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest block">Earned</span>
            <span className="text-sm font-black text-emerald-300">
              +{earnedPoints} pts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
