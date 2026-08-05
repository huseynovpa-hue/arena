"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    loadMatches();
  }, []);

  useEffect(() => {
    if (user) loadPredictions();
  }, [user]);

  async function loadMatches() {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("kick_off", { ascending: true });
    setMatches(data || []);
    setLoading(false);
  }

  async function loadPredictions() {
    if (!user) return;
    const { data } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", user.id);
    const map = {};
    (data || []).forEach((p) => (map[p.match_id] = p));
    setPredictions(map);
  }

  const lockedCount = Object.keys(predictions).length;

  if (loading) {
    return (
      <div className="text-center py-20 text-[--muted]">Loading matches...</div>
    );
  }

  return (
    <div className="py-4">
      {/* Progress bar */}
      {matches.length > 0 && (
        <div className="card p-3.5 mb-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs font-bold mb-1.5">Weekly Progress</div>
            <div className="h-1.5 rounded-full bg-[--surface] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${(lockedCount / matches.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-[10px] text-[--muted] mt-1">
              {lockedCount === matches.length && matches.length > 0
                ? "All predictions locked! Good luck 🍀"
                : `${matches.length - lockedCount} match${matches.length - lockedCount !== 1 ? "es" : ""} remaining`}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-green-400">
              {lockedCount}
            </div>
            <div className="text-[8px] text-[--muted] uppercase tracking-wider">
              Locked
            </div>
          </div>
        </div>
      )}

      {/* Match list */}
      {matches.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">⚽</div>
          <h3 className="text-lg font-bold mb-1.5">No matches yet</h3>
          <p className="text-xs text-[--muted]">
            The admin will add this week&#39;s matches soon. Check back later!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {matches.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              prediction={predictions[m.id]}
              userId={user?.id}
              onUpdate={loadPredictions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
