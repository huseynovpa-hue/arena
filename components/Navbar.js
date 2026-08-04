"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchProfile(data.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id);
      else setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function fetchProfile(uid) {
    const { data } = await supabase
      .from("profiles")
      .select("username, is_admin, total_points, avatar_url")
      .eq("id", uid)
      .single();
    if (data) setProfile(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setMenuOpen(false);
    router.push("/");
  }

  const links = [
    { href: "/", label: "⚽ Matches" },
    { href: "/leaderboard", label: "🏆 Board" },
    { href: "/rules", label: "📋 Rules" },
  ];
  if (profile?.is_admin) links.push({ href: "/admin", label: "⚙ Admin" });

  return (
    <nav className="sticky top-0 z-50 bg-[--surface] border-b border-[--border] backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-sm">⚽</div>
          <div>
            <div className="text-sm font-black tracking-widest leading-tight">ARENA</div>
            <div className="text-[8px] text-[--muted] tracking-wider">FOOTBALL PREDICTIONS</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname === l.href ? "bg-green-500/15 text-green-400" : "text-[--muted] hover:text-[--text]"
              }`}
            >{l.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-xs font-bold text-[--gold] bg-amber-500/10 px-3 py-1 rounded-full hidden sm:block">
                🏆 {profile?.total_points || 0} pts
              </span>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden bg-green-500/20 flex items-center justify-center text-sm border-2 border-transparent hover:border-green-500/50 transition-colors"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : "👤"}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute top-14 right-4 z-50 bg-[--card] border border-[--border] rounded-xl p-3 min-w-[180px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[--surface] flex items-center justify-center text-sm">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : "👤"}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[--text]">{profile?.username}</p>
                        <p className="text-[10px] text-[--muted]">{user.email}</p>
                      </div>
                    </div>

                    <div className="border-t border-[--border] pt-2 mb-1">
                      <Link href="/profile" onClick={() => setMenuOpen(false)}
                        className="block py-1.5 text-xs text-[--muted] hover:text-[--text]">
                        👤 Edit Profile
                      </Link>
                      {/* Mobile links */}
                      <div className="md:hidden">
                        {links.map((l) => (
                          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                            className="block py-1.5 text-xs text-[--muted] hover:text-[--text]">{l.label}</Link>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleLogout}
                      className="w-full text-left text-xs text-red-400 hover:text-red-300 border-t border-[--border] pt-2">
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link href="/login" className="btn-accent text-xs" style={{ padding: "6px 16px" }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
