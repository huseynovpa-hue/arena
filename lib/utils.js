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

export function formatDate(dateStr, t) {
  const d = new Date(dateStr);
  const now = new Date();

  const bakuDate = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });
  const todayBaku = now.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });
  const tomorrow = new Date(now.getTime() + 86400000);
  const tomorrowBaku = tomorrow.toLocaleDateString("en-US", { timeZone: TIMEZONE, year: "numeric", month: "numeric", day: "numeric" });

  let day;
  if (d.getTime() < now.getTime()) day = t?.started || "Started";
  else if (bakuDate === todayBaku) day = t?.today || "Today";
  else if (bakuDate === tomorrowBaku) day = t?.tomorrow || "Tomorrow";
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
  return new Date(`${dateStr}T${timeStr}:00+04:00`).toISOString();
}

// ISO week: Monday=start, Sunday=end
export function getISOWeek(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - jan4) / 86400000 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

export function getISOWeekYear(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  return d.getFullYear();
}

export function getCurrentWeek() {
  const now = new Date();
  return { week: getISOWeek(now), year: getISOWeekYear(now) };
}

// Get Monday date for a given ISO week/year
export function getWeekStartDate(week, year) {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7);
  return monday;
}

export function formatWeekRange(week, year) {
  const start = getWeekStartDate(week, year);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
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
