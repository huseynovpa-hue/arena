"use client";

import { useState } from "react";

export default function MatchCard({ match }) {
  // Fallback defaults so it never breaks if data is missing
  const {
    league = "Super Lig",
    time = "Today · 14:25",
    countdown = "02:18:40",
    homeTeam = { name: "Fenerbahçe", logo: "/logos/fenerbahce.png" },
    awayTeam = { name: "Galatasaray", logo: "/logos/galatasaray.png" },
    status = "open", // Options: 'open', 'locked', 'finished'
    earnedPoints = 20,
    initialPrediction = null,
  } = match || {};

  // Local state for user picks
  const [homeScore, setHomeScore] = useState(initialPrediction?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(initialPrediction?.awayScore ?? 0);
  const [overUnder, setOverUnder] = useState(initialPrediction?.overUnder ?? null); // 'over' | 'under'
  const [firstToScore, setFirstToScore] = useState(initialPrediction?.firstToScore ?? null); // 'home' | 'none' | 'away'
  const [isSubmitted, setIsSubmitted] = useState(Boolean(initialPrediction));

  const isFinished = status === "finished";

  return (
    <div className="game-card overflow-hidden my-4">
      {/* 1. HEADER RIBBON */}
      <div className="game-ribbon py-2 px-4 flex items-center justify-between text-xs font-bold text-slate-300">
        <span className="text-amber-400 font-extrabold tracking-wide uppercase">
          {league}
        </span>
        <div className="flex items-center gap-2">
          <span>{time}</span>
          {countdown && status === "open" && (
            <span className="text-red-400 font-mono font-extrabold bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
              {countdown}
            </span>
          )}
          {isFinished && (
            <span className="text-emerald-400 font-extrabold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
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
              <img
                src={homeTeam.logo}
                alt={homeTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => { e.currentTarget.style.opacity = '0'; }}
              />
            </div>
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide text-center uppercase drop-shadow">
            {homeTeam.name}
          </span>
        </div>

        {/* Center Score Control */}
        <div className="flex items-center gap-2">
          {/* Home Score */}
          <div className="flex items-center gap-1">
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center"
              >
                -
              </button>
            )}
            <div className="w-10 h-11 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-center font-extrabold text-xl text-white shadow-inner">
              {homeScore}
            </div>
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setHomeScore(homeScore + 1)}
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center"
              >
                +
              </button>
            )}
          </div>

          <span className="text-slate-500 font-bold px-1 text-sm">VS</span>

          {/* Away Score */}
          <div className="flex items-center gap-1">
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center"
              >
                -
              </button>
            )}
            <div className="w-10 h-11 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-center font-extrabold text-xl text-white shadow-inner">
              {awayScore}
            </div>
            {!isSubmitted && !isFinished && (
              <button
                type="button"
                onClick={() => setAwayScore(awayScore + 1)}
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 font-bold hover:bg-slate-700 active:scale-95 transition flex items-center justify-center"
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
              <img
                src={awayTeam.logo}
                alt={awayTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => { e.currentTarget.style.opacity = '0'; }}
              />
            </div>
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide text-center uppercase drop-shadow">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* 3. EXTRA PREDICTIONS (OVER/UNDER & FIRST TEAM TO SCORE) */}
      {!isFinished && !isSubmitted && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          {/* Over / Under 2.5 */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1.5">
              Over / Under 2.5
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOverUnder("over")}
                className={`btn-outline text-xs py-2 ${
                  overUnder === "over" ? "border-emerald-500 bg-emerald-500/25 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
                }`}
              >
                Over 2.5
              </button>
              <button
                type="button"
                onClick={() => setOverUnder("under")}
                className={`btn-outline text-xs py-2 ${
                  overUnder === "under" ? "border-emerald-500 bg-emerald-500/25 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
                }`}
              >
                Under 2.5
              </button>
            </div>
          </div>

          {/* First Team to Score */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1.5">
              First Team To Score
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFirstToScore("home")}
                className={`btn-outline text-xs py-2 truncate ${
                  firstToScore === "home" ? "border-emerald-500 bg-emerald-500/25 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
                }`}
              >
                {homeTeam.name}
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("none")}
                className={`btn-outline text-xs py-2 ${
                  firstToScore === "none" ? "border-emerald-500 bg-emerald-500/25 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
                }`}
              >
                No Goal
              </button>
              <button
                type="button"
                onClick={() => setFirstToScore("away")}
                className={`btn-outline text-xs py-2 truncate ${
                  firstToScore === "away" ? "border-emerald-500 bg-emerald-500/25 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
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
              className="btn-game-green w-full py-3 text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save Prediction
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBMITTED PREDICTION SUMMARY BAR */}
      {isSubmitted && !isFinished && (
        <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs px-4">
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
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Edit Prediction"
          >
            ✏️
          </button>
        </div>
      )}

      {/* 5. FINISHED STATE / EARNED POINTS */}
      {isFinished && (
        <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-center">
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
