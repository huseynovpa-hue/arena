"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

export default function MatchCard({ match, userId, userPrediction, onPredictionSaved }) {
  const { t } = useLang();
  const [homeScore, setHomeScore] = useState(userPrediction?.home_score ?? 0);
  const [awayScore, setAwayScore] = useState(userPrediction?.away_score ?? 0);
  const [firstToScore, setFirstToScore] = useState(userPrediction?.first_to_score ?? "none");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isFinished = match?.status === "finished";
  const kickOffDate = new Date(match?.kick_off);
  const isLocked = isFinished || new Date() > kickOffDate;

  useEffect(() => {
    if (userPrediction) {
      setHomeScore(userPrediction.home_score ?? 0);
      setAwayScore(userPrediction.away_score ?? 0);
      setFirstToScore(userPrediction.first_to_score ?? "none");
    }
  }, [userPrediction]);

  async function handleSave() {
    if (!userId || isLocked) return;
    setSaving(true);
    setSaved(false);

    const predictionData = {
      user_id: userId,
      match_id: match.id,
      home_score: parseInt(homeScore) || 0,
      away_score: parseInt(awayScore) || 0,
      first_to_score: firstToScore,
    };

    const { error } = await supabase
      .from("predictions")
      .upsert(predictionData, { onConflict: "user_id,match_id" });

    setSaving(false);
    if (!error) {
      setSaved(true);
      if (onPredictionSaved) onPredictionSaved();
      setTimeout(() => setSaved(false), 2500);
    } else {
      alert("Error saving prediction: " + error.message);
    }
  }

  const formattedDate = kickOffDate.toLocaleDateString("en-US", {
    timeZone: "Asia/Baku",
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = kickOffDate.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Baku",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="card p-4 my-4 max-w-xl mx-auto space-y-4 border border-[--border] bg-[--surface]">
      {/* League & Kickoff Header */}
      <div className="flex items-center justify-between text-xs text-[--muted] pb-2 border-b border-[--border]">
        <span className="font-bold tracking-wider uppercase text-green-400">
          {match?.league || "Football"}
        </span>
        <div className="flex items-center gap-1.5 font-medium">
          <span>📅 {formattedDate}</span>
          <span>•</span>
          <span className="text-[--text] font-bold">{formattedTime} (Baku)</span>
        </div>
      </div>

      {/* Teams and Inputs */}
      <div className="grid grid-cols-3 items-center gap-2 py-2">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center gap-2">
          {match?.home_badge ? (
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <img
                src={match.home_badge}
                alt={match.home_team}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#0b0f19] flex items-center justify-center text-lg font-black text-[--text]">
              {match?.home_team?.[0]}
            </div>
          )}
          <span className="font-extrabold text-xs sm:text-sm text-[--text] line-clamp-1">{match?.home_team}</span>
        </div>

        {/* Score Inputs */}
        <div className="flex flex-col items-center justify-center gap-1">
          {isFinished ? (
            <div className="bg-[#0b0f19] px-3 py-1.5 rounded-xl border border-green-500/30 text-center">
              <div className="text-xl font-black text-green-400">
                {match.home_score} - {match.away_score}
              </div>
              <span className="text-[9px] uppercase font-bold text-green-500 tracking-wider">Final</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="20"
                disabled={isLocked}
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="w-11 h-11 text-center text-lg font-black input-dark rounded-xl"
              />
              <span className="text-[--muted] font-extrabold text-base">:</span>
              <input
                type="number"
                min="0"
                max="20"
                disabled={isLocked}
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="w-11 h-11 text-center text-lg font-black input-dark rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center gap-2">
          {match?.away_badge ? (
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <img
                src={match.away_badge}
                alt={match.away_team}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#0b0f19] flex items-center justify-center text-lg font-black text-[--text]">
              {match?.away_team?.[0]}
            </div>
          )}
          <span className="font-extrabold text-xs sm:text-sm text-[--text] line-clamp-1">{match?.away_team}</span>
        </div>
      </div>

      {/* First Team to Score Selector */}
      {!isFinished && (
        <div className="pt-2">
          <div className="text-[10px] text-[--muted] uppercase tracking-wider font-bold mb-2 text-center">
            {t?.firstToScore || "First Team to Score"}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "home", label: match?.home_team },
              { id: "none", label: t?.noGoal || "No Goal" },
              { id: "away", label: match?.away_team },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={isLocked}
                onClick={() => setFirstToScore(option.id)}
                className={`btn-3d-option text-xs truncate ${firstToScore === option.id ? "active" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      {!isLocked && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-3d-accent w-full text-xs uppercase tracking-wider font-extrabold mt-2 py-2.5"
        >
          {saving ? "Saving..." : saved ? "✓ Saved!" : userPrediction ? "Update Prediction" : "Save Prediction"}
        </button>
      )}
    </div>
  );
}
