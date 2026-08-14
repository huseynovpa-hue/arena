"use client";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

function TeamLogo({ src, size = 36 }) {
  const [err, setErr] = useState(false);
  if (!src || err)
    return (<div className="rounded-full bg-[--surface] flex items-center justify-center text-[--muted]" style={{ width: size, height: size, fontSize: size * 0.45 }}>⚽</div>);
  return <img src={src} alt="" width={size} height={size} className="object-contain" onError={() => setErr(true)} />;
}

function ScoreBtn({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-1.5">
      <button 
        disabled={disabled || value <= 0} 
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 font-bold flex items-center justify-center hover:bg-slate-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        −
      </button>
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black transition-all ${
        disabled 
          ? "bg-slate-900/40 border border-slate-800 text-slate-500" 
          : "bg-slate-950/90 border-2 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
      }`}>
        {value}
      </div>
      <button 
        disabled={disabled} 
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 font-bold flex items-center justify-center hover:bg-slate-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
  const [overUnder, setOverUnder] = useState(prediction?.over_under ?? null);
  const [saved, setSaved] = useState(!!prediction);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isExpired, setIsExpired] = useState(new Date(match.kick_off).getTime() <= Date.now());
  const { t, lang } = useLang();

  useEffect(() => {
    if (prediction) {
      setHomeScore(prediction.home_score ?? 0); setAwayScore(prediction.away_score ?? 0);
      setFirstToScore(prediction.first_to_score ?? null); setOverUnder(prediction.over_under ?? null);
      setSaved(true); setEditing(false);
    }
  }, [prediction]);

  useEffect(() => {
    if (isExpired) return;
    const check = setInterval(() => {
      if (new Date(match.kick_off).getTime() <= Date.now()) { setIsExpired(true); setEditing(false); clearInterval(check); }
    }, 1000);
    return () => clearInterval(check);
  }, [match.kick_off, isExpired]);

  const isFinished = match.status === "finished";
  const isInputDisabled = (saved && !editing) || isExpired;
  const canSave = firstToScore !== null && overUnder !== null && userId;
  const { day, time } = formatDate(match.kick_off, { ...t, _lang: lang });

  let statusLabel = null;
  if (isFinished) statusLabel = { text: `${t.finishedResult} — ${match.home_score} : ${match.away_score}`, color: "text-green-400", bg: "bg-green-500/10 border-green-500/25" };
  else if (isExpired) statusLabel = { text: t.inProgress, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" };

  async function savePrediction() {
    if (!canSave) return; setSaving(true);
    const { error } = await supabase.from("predictions").upsert(
      { user_id: userId, match_id: match.id, home_score: homeScore, away_score: awayScore, first_to_score: firstToScore, over_under: overUnder },
      { onConflict: "user_id,match_id" }
    );
    setSaving(false);
    if (!error) { setSaved(true); setEditing(false); onUpdate?.(); } else alert("Failed: " + error.message);
  }

  const ftsOptions = [{ val: "home", label: match.home_team }, { val: "none", label: t.noGoal }, { val: "away", label: match.away_team }];
  const ftsLabel = firstToScore === "home" ? match.home_team : firstToScore === "away" ? match.away_team : firstToScore === "none" ? t.noGoal : "—";
  const ouLabel = overUnder === "over" ? t.over : overUnder === "under" ? t.under : "—";

  return (
    <div className={`card transition-colors ${saved && !editing ? "border-green-500/25" : ""}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[--surface] border-b border-[--border] gap-2">
        <span className="text-[10px] text-[--muted] font-semibold truncate">{match.league}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-[--muted] hidden sm:inline">{day} · {time}</span>
          <span className="text-[10px] text-[--muted] sm:hidden">{time}</span>
          {!isFinished && <Countdown kickoff={match.kick_off} />}
          {isFinished && <span className="text-[11px] font-bold text-green-400">{t.finished}</span>}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <TeamLogo src={match.home_badge} size={28} />
            <span className="text-xs sm:text-sm font-bold truncate">{match.home_team}</span>
          </div>
          <span className="text-[9px] font-extrabold text-[--muted] px-1.5 mx-1">VS</span>
          <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
            <span className="text-xs sm:text-sm font-bold truncate text-right">{match.away_team}</span>
            <TeamLogo src={match.away_badge} size={28} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
          <ScoreBtn value={homeScore} onChange={setHomeScore} disabled={isInputDisabled} />
          <span className="text-[--muted] font-extrabold text-sm">—</span>
          <ScoreBtn value={awayScore} onChange={setAwayScore} disabled={isInputDisabled} />
        </div>
        {prediction?.points != null && (
          <div className="flex justify-center mb-2.5">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-1.5 text-center">
              <div className="text-[9px] text-green-400 uppercase tracking-wider">{t.earned}</div>
              <div className="text-[14px] font-bold text-green-400">{prediction.points} pts</div>
            </div>
          </div>
        )}
        {!saved && isExpired && (
          <div className="flex justify-center mb-2.5">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-1.5 text-center">
              <div className="text-[9px] text-red-400 uppercase tracking-wider">{t.noPrediction}</div>
              <div className="text-[13px] font-bold text-red-400">{t.missedLabel}</div>
            </div>
          </div>
        )}
        <div className="mt-2.5">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1">{t.overUnder}</div>
          <div className="flex gap-1.5 justify-center">
            {[{ val: "over", label: t.over }, { val: "under", label: t.under }].map((o) => (
              <button key={o.val} disabled={isInputDisabled} onClick={() => setOverUnder(o.val)}
                className={`flex-1 max-w-[160px] py-1.5 px-2 rounded-lg text-[11px] font-semibold border-[1.5px] transition-all ${
                  overUnder === o.val ? o.val === "over" ? "bg-green-500/15 border-green-500 text-green-400" : "bg-blue-500/15 border-blue-500 text-blue-400" : "bg-[--bg] border-[--border] text-[--muted]"
                } disabled:cursor-not-allowed`}>{o.label}</button>
            ))}
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1">{t.firstToScore}</div>
          <div className="flex gap-1 sm:gap-1.5 justify-center">
            {ftsOptions.map((o) => (
              <button key={o.val} disabled={isInputDisabled} onClick={() => setFirstToScore(o.val)}
                className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] sm:text-[11px] font-semibold border-[1.5px] transition-all truncate ${
                  firstToScore === o.val ? "bg-green-500/15 border-green-500 text-green-400" : "bg-[--bg] border-[--border] text-[--muted]"
                } disabled:cursor-not-allowed`}>{o.label}</button>
            ))}
          </div>
        </div>
        {saved && !editing && (
          <div className="mt-2.5 py-2 px-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between gap-2">
            <span className="text-blue-400 text-[10px] sm:text-[11px] font-bold truncate">
              {prediction?.home_score}:{prediction?.away_score} · {ouLabel} · {ftsLabel}
            </span>
            {!isExpired && (
              <button onClick={() => setEditing(true)}
                className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-1 rounded-lg hover:bg-amber-500/25 shrink-0">✏️</button>
            )}
          </div>
        )}
        {editing && (
          <div className="mt-2.5 flex gap-2">
            <button onClick={() => { if(prediction){setHomeScore(prediction.home_score??0);setAwayScore(prediction.away_score??0);setFirstToScore(prediction.first_to_score??null);setOverUnder(prediction.over_under??null);} setEditing(false); }}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-[--border] text-[--muted]">{t.cancel}</button>
            <button onClick={savePrediction} disabled={!canSave || saving}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white disabled:opacity-40">
              {saving ? t.saving : t.saveChanges}</button>
          </div>
        )}
        {!saved && !isExpired && (
          <button 
            disabled={!canSave || saving} 
            onClick={savePrediction}
            className={`w-full mt-3 py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
              canSave 
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] hover:scale-[1.01] active:scale-[0.98]" 
                : "bg-slate-900/50 border border-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {saving ? (
              t.saving
            ) : !userId ? (
              t.signInToPredict
            ) : canSave ? (
              <>
                <span>🔒</span>
                <span>{t.lockPrediction}</span>
              </>
            ) : (
              t.selectToLock
            )}
          </button>
        )}
        {statusLabel && (
          <div className={`mt-2 py-2 rounded-xl text-center border text-[11px] font-bold tracking-wide ${statusLabel.bg} ${statusLabel.color}`}>{statusLabel.text}</div>
        )}
      </div>
    </div>
  );
}
