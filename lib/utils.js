const TIMEZONE = "Asia/Baku";

export function getCountdown(kickoff) {
  const diff = Math.max(0, new Date(kickoff).getTime() - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    expired: diff <= 0,
  };
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();

  const bakuDate = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });
  const todayBaku = now.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });
  const tomorrow = new Date(now.getTime() + 86400000);
  const tomorrowBaku = tomorrow.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });

  let day;
  if (d.getTime() < now.getTime()) day = "Started";
  else if (bakuDate === todayBaku) day = "Today";
  else if (bakuDate === tomorrowBaku) day = "Tomorrow";
  else day = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "short", month: "short", day: "numeric" });

  // 24-hour format
  const time = d.toLocaleTimeString("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { day, time };
}

export function toBakuISO(dateStr, timeStr) {
  // Admin enters time as Baku (UTC+4), explicitly set offset so it converts correctly
  return new Date(`${dateStr}T${timeStr}:00+04:00`).toISOString();
}

export async function searchTeams(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (!data.teams) return [];
    return data.teams
      .filter((t) => t.strSport === "Soccer")
      .slice(0, 8)
      .map((t) => ({
        id: t.idTeam,
        name: t.strTeam,
        badge: t.strBadge || t.strTeamBadge,
        league: t.strLeague,
        country: t.strCountry,
      }));
  } catch {
    return [];
  }
}
