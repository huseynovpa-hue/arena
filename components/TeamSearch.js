"use client";
import { useState, useRef } from "react";
import { searchTeams } from "@/lib/utils";

export default function TeamSearch({ label, selected, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  function handleSearch(val) {
    setQuery(val);
    clearTimeout(timer.current);
    if (val.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      const r = await searchTeams(val);
      setResults(r);
      setLoading(false);
    }, 400);
  }

  if (selected) {
    return (
      <div className="bg-[--card] border border-green-500/30 rounded-xl p-2.5 flex items-center gap-3">
        {selected.badge ? (
          <img src={selected.badge} alt="" className="w-8 h-8 object-contain" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[--surface] flex items-center justify-center text-sm">
            ⚽
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm font-bold">{selected.name}</div>
          <div className="text-[10px] text-[--muted]">{selected.league}</div>
        </div>
        <button onClick={() => onSelect(null)} className="btn-red">
          Change
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search team name..."
        className="input-dark"
      />
      {loading && (
        <p className="text-[11px] text-[--muted] py-2">Searching...</p>
      )}
      {results.length > 0 && (
        <div className="bg-[--card] border border-[--border] rounded-xl mt-1.5 max-h-56 overflow-y-auto">
          {results.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onSelect(t);
                setQuery("");
                setResults([]);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 border-b border-[--border] last:border-0 hover:bg-[--surface] transition-colors text-left"
            >
              {t.badge ? (
                <img src={t.badge} alt="" className="w-7 h-7 object-contain" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[--surface] flex items-center justify-center text-xs">
                  ⚽
                </div>
              )}
              <div>
                <div className="text-xs font-semibold">{t.name}</div>
                <div className="text-[10px] text-[--muted]">
                  {t.league} · {t.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
