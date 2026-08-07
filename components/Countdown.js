"use client";
import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";

export default function Countdown({ kickoff }) {
  const { t } = useLang();

  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(kickoff).getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      expired: diff <= 0,
    };
  }, [kickoff]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const i = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(i);
  }, [calc]);

  if (time.expired) {
    return (
      <span className="text-red-400 font-bold text-[11px] tracking-wider">
        {t.countdownLocked}
      </span>
    );
  }

  const parts = [];
  if (time.d > 0) parts.push(`${time.d}d`);
  parts.push(
    `${String(time.h).padStart(2, "0")}:${String(time.m).padStart(2, "0")}:${String(time.s).padStart(2, "0")}`
  );

  const urgent = time.d === 0 && time.h < 3;

  return (
    <span className={`font-mono font-bold text-[13px] tracking-wide ${urgent ? "text-red-400" : "text-green-400"}`}>
      {parts.join(" ")}
    </span>
  );
}
