"use client";
import { useState, useEffect, useCallback } from "react";

export default function Countdown({ kickoff }) {
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

  const [t, setT] = useState(calc);

  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, [calc]);

  if (t.expired) {
    return (
      <span className="text-red-400 font-bold text-[11px] tracking-wider">
        LOCKED
      </span>
    );
  }

  const parts = [];
  if (t.d > 0) parts.push(`${t.d}d`);
  parts.push(
    `${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}:${String(t.s).padStart(2, "0")}`
  );

  const urgent = t.d === 0 && t.h < 3;

  return (
    <span
      className={`font-mono font-bold text-[13px] tracking-wide ${
        urgent ? "text-red-400" : "text-green-400"
      }`}
    >
      {parts.join(" ")}
    </span>
  );
}
