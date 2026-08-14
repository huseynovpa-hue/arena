"use client";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

function TeamLogo({ src, size = 52 }) {
  const [err, setErr] = useState(false);
  const wrapStyle = {
    width: size,
    height: size,
    background: "radial-gradient(circle at 35% 30%, #1e2942, #0a0f1c 75%)",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.5)",
  };
  if (!src || err)
    return (
      <div
        className="rounded-full border-2 border-amber-400/70 flex items-center justify-center text-[--muted]"
        style={{ ...wrapStyle, fontSize: size * 0.4 }}
      >
        ⚽
      </div>
    );
  return (
    <div
      className="rounded-full border-2 border-amber-400/70 overflow-hidden flex items-center justify-center"
      style={wrapStyle}
    >
      <img
        src={src}
        alt=""
        width={size * 0.72}
        height={size * 0.72}
        className="object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
        onError={() => setErr(true)}
      />
    </div>
  );
}

// Shared style for "unselected" pill/segment buttons (O/U, First-to-Score).
// Lighter background + outer shadow (not inset) so they read as raised, clickable
// surfaces instead of sinking into the card. Hover/active handled via Tailwind
// classes since inline `style` always wins over Tailwind for the same property.
const unselectedBtnStyle = {
  background: "linear-gradient(180deg, #202c47, #121a2e)",
  border: "1px solid rgba(148,163,184,0.28)",
  color: "var(--muted)",
  boxShadow: "0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
};
const unselectedBtnClass =
  "transition-all duration-150 hover:brightness-125 hover:border-slate-300/40 hover:-translate-y-px active:translate-y-0 active:brightness-95";

function ScoreBtn({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        disabled={disabled || value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-slate-200 font-bold flex items-center justify-center active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 hover:brightness-125 hover:-translate-y-px"
        style={{
          background: "linear-gradient(180deg, #263449, #121b2e)",
          boxShadow:
            "0 4px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        −
      </button>
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black transition-all ${
          disabled ? "text-slate-500" : "text-white"
        }`}
        style={
          disabled
            ? {
                background: "linear-gradient(180deg, #0f172a, #0a0f1c)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
                border: "1px solid rgba(51,65,85,0.4)",
              }
            : {
                background: "linear-gradient(180deg, #0f2f26, #06120e)",
                boxShadow:
                  "0 4px 10px rgba(16,185,129,0.25), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5)",
                border: "1.5px solid #10b981",
              }
        }
      >
        {value}
      </div>
      <button
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-slate-200 font-bold flex items-center justify-center active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 hover:brightness-125 hover:-translate-y-px"
        style={{
          background: "linear-gradient(180deg, #263449, #121b2e)",
          boxShadow:
            "0 4px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
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
    <div
      className="rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg, #17203a 0%, #0b1120 55%, #080c17 100%)",
        border: saved && !editing ? "1px solid rgba(16,185,129,0.35)" : "1px solid rgba(148,163,184,0.12)",
        boxShadow:
          "0 14px 30px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* League / status banner */}
      <div
        className="flex items-center justify-between px-3 py-2.5 gap-2"
        style={{
          background: "linear-gradient(180deg, rgba(245,158,11,0.14), rgba(245,158,11,0.02))",
          borderBottom: "1px solid rgba(148,163,184,0.12)",
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        <span className="text-[10px] text-amber-300 font-bold truncate flex items-center gap-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          🏆 {match.league}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-[--muted] hidden sm:inline">{day} · {time}</span>
          <span className="text-[10px] text-[--muted] sm:hidden">{time}</span>
          {!isFinished && <Countdown kickoff={match.kick_off} />}
          {isFinished && <span className="text-[11px] font-bold text-green-400">{t.finished}</span>}
        </div>
      </div>

      <div className="p-3.5">
        {/* Team row */}
        <div className="flex items-center justify-between mb-3.5 px-1">
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <TeamLogo src={match.home_badge} size={52} />
            <span className="text-[11px] sm:text-xs font-bold truncate text-center max-w-[90px]">{match.home_team}</span>
          </div>
          <span
            className="text-[11px] font-extrabold text-amber-400 px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: "linear-gradient(180deg, #1e293b, #0a0f1c)",
              boxShadow: "0 3px 6px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.06)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            VS
          </span>
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <TeamLogo src={match.away_badge} size={52} />
            <span className="text-[11px] sm:text-xs font-bold truncate text-center max-w-[90px]">{match.away_team}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3.5">
          <ScoreBtn value={homeScore} onChange={setHomeScore} disabled={isInputDisabled} />
          <span className="text-[--muted] font-extrabold text-sm">—</span>
          <ScoreBtn value={awayScore} onChange={setAwayScore} disabled={isInputDisabled} />
        </div>

        {prediction?.points != null && (
          <div className="flex justify-center mb-2.5">
            <div
              className="rounded-lg px-4 py-1.5 text-center"
              style={{
                background: "linear-gradient(180deg, rgba(16,185,129,0.16), rgba(16,185,129,0.04))",
                border: "1px solid rgba(16,185,129,0.35)",
                boxShadow: "0 3px 8px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
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
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1.5">{t.overUnder}</div>
          <div className="flex gap-1.5 justify-center">
            {[{ val: "over", label: t.over }, { val: "under", label: t.under }].map((o) => (
              <button
                key={o.val}
                disabled={isInputDisabled}
                onClick={() => setOverUnder(o.val)}
                className={`flex-1 max-w-[160px] py-1.5 px-2 rounded-lg text-[11px] font-semibold disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:translate-y-0 ${
                  overUnder === o.val ? "transition-all" : unselectedBtnClass
                }`}
                style={
                  overUnder === o.val
                    ? {
                        background:
                          o.val === "over"
                            ? "linear-gradient(180deg, rgba(16,185,129,0.22), rgba(16,185,129,0.05))"
                            : "linear-gradient(180deg, rgba(59,130,246,0.22), rgba(59,130,246,0.05))",
                        border: o.val === "over" ? "1.5px solid #10b981" : "1.5px solid #3b82f6",
                        color: o.val === "over" ? "#34d399" : "#60a5fa",
                        boxShadow:
                          o.val === "over"
                            ? "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
                            : "0 4px 12px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }
                    : unselectedBtnStyle
                }
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2.5">
          <div className="text-[9px] text-[--muted] uppercase tracking-wider text-center mb-1.5">{t.firstToScore}</div>
          <div className="flex gap-1 sm:gap-1.5 justify-center">
            {ftsOptions.map((o) => (
              <button
                key={o.val}
                disabled={isInputDisabled}
                onClick={() => setFirstToScore(o.val)}
                className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] sm:text-[11px] font-semibold truncate disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:translate-y-0 ${
                  firstToScore === o.val ? "transition-all" : unselectedBtnClass
                }`}
                style={
                  firstToScore === o.val
                    ? {
                        background: "linear-gradient(180deg, rgba(16,185,129,0.22), rgba(16,185,129,0.05))",
                        border: "1.5px solid #10b981",
                        color: "#34d399",
                        boxShadow: "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }
                    : unselectedBtnStyle
                }
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {saved && !editing && (
          <div
            className="mt-2.5 py-2 px-2.5 rounded-xl flex items-center justify-between gap-2"
            style={{
              background: "linear-gradient(180deg, rgba(59,130,246,0.14), rgba(59,130,246,0.03))",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <span className="text-blue-400 text-[10px] sm:text-[11px] font-bold truncate">
              {prediction?.home_score}:{prediction?.away_score} · {ouLabel} · {ftsLabel}
            </span>
            {!isExpired && (
              <button
                onClick={() => setEditing(true)}
                className="text-[10px] font-bold text-amber-400 px-2 py-1 rounded-lg shrink-0 transition-all duration-150 hover:brightness-125 hover:-translate-y-px"
                style={{
                  background: "linear-gradient(180deg, rgba(245,158,11,0.22), rgba(245,158,11,0.08))",
                  border: "1px solid rgba(245,158,11,0.45)",
                  boxShadow: "0 3px 8px rgba(245,158,11,0.15)",
                }}
              >
                ✏️
              </button>
            )}
          </div>
        )}

        {editing && (
          <div className="mt-2.5 flex gap-2">
            <button
              onClick={() => { if(prediction){setHomeScore(prediction.home_score??0);setAwayScore(prediction.away_score??0);setFirstToScore(prediction.first_to_score??null);setOverUnder(prediction.over_under??null);} setEditing(false); }}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-200 transition-all duration-150 hover:brightness-125 hover:-translate-y-px"
              style={{
                background: "linear-gradient(180deg, #263449, #121b2e)",
                border: "1px solid rgba(148,163,184,0.3)",
                boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
              }}
            >
              {t.cancel}
            </button>
            <button
              onClick={savePrediction}
              disabled={!canSave || saving}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-40 transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
              style={{
                background: "linear-gradient(180deg, #f59e0b, #d97706)",
                boxShadow: "0 4px 10px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {saving ? t.saving : t.saveChanges}
            </button>
          </div>
        )}

        {!saved && !isExpired && (
          <button
            disabled={!canSave || saving}
            onClick={savePrediction}
            className="w-full mt-3 py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed hover:enabled:brightness-110 hover:enabled:-translate-y-px"
            style={
              canSave
                ? {
                    background: "linear-gradient(180deg, #10b981, #059669)",
                    color: "white",
                    boxShadow:
                      "0 8px 20px rgba(16,185,129,0.4), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)",
                  }
                : {
                    background: "linear-gradient(180deg, #26344c, #141e33)",
                    color: "#94a3b8",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                    border: "1px solid rgba(148,163,184,0.25)",
                  }
            }
          >
            {saving ? t.saving : !userId ? t.signInToPredict : canSave ? t.lockPrediction : t.selectToLock}
          </button>
        )}

        {statusLabel && (
          <div className={`mt-2 py-2 rounded-xl text-center border text-[11px] font-bold tracking-wide ${statusLabel.bg} ${statusLabel.color}`}>{statusLabel.text}</div>
        )}
      </div>
    </div>
  );
}
