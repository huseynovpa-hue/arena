"use client";
import { useState, useRef } from "react";

const LEAGUES = [
  "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1",
  "Champions League", "Europa League", "Conference League",
  "Champions League Qualification", "Europa League Qualification",
  "Süper Lig", "Eredivisie", "Primeira Liga", "Scottish Premiership",
  "Premier League Azerbaijan", "World Cup", "European Championship",
  "Copa America", "FA Cup", "Carabao Cup", "Copa del Rey",
  "DFB Pokal", "Coppa Italia", "Coupe de France",
  "MLS", "Saudi Pro League", "FIFA Club World Cup",
  "Nations League", "International Friendly",
];

export default function LeagueSearch({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef(null);

  function handleChange(val) {
    onChange(val);
    if (val.length > 0) {
      const lower = val.toLowerCase();
      setFiltered(LEAGUES.filter((l) => l.toLowerCase().includes(lower)).slice(0, 8));
    } else {
      setFiltered(LEAGUES.slice(0, 8));
    }
  }

  function handleFocus() {
    setFocused(true);
    if (value.length > 0) {
      const lower = value.toLowerCase();
      setFiltered(LEAGUES.filter((l) => l.toLowerCase().includes(lower)).slice(0, 8));
    } else {
      setFiltered(LEAGUES.slice(0, 8));
    }
  }

  return (
    <div className="relative">
      <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
        League / Competition
      </label>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="Type or select a league..."
        className="input-dark"
      />
      {focused && filtered.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[--card] border border-[--border] rounded-xl max-h-48 overflow-y-auto shadow-xl">
          {filtered.map((l) => (
            <button
              key={l}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onChange(l); setFocused(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-[--surface] transition-colors border-b border-[--border] last:border-0 text-[--text]"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
