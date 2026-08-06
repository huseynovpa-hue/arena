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
    const { data } = await supabase.from("profiles").select("username, is_admin, avatar_url").eq("id", uid).single();
    if (data) setProfile(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null); setProfile(null); setMenuOpen(false);
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
              }`}>{l.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2 relative">
          {user ? (
            <>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full overflow-hidden bg-green-500/20 flex items-center justify-center text-sm border-2 border-transparent hover:border-green-500/50 transition-colors">
                {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" /> : "👤"}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setMenuOpen(false)} />
                  <div className="fixed top-16 right-3 left-3 sm:left-auto sm:right-4 sm:w-52 z-[70] bg-[--card] border border-[--border] rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[--border]">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[--surface] flex items-center justify-center text-sm shrink-0">
                        {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" /> : "👤"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[--text] truncate">{profile?.username}</p>
                        <p className="text-[11px] text-[--muted] truncate">{user.email}</p>
                      </div>
                    </div>

                    <Link href="/profile" onClick={() => setMenuOpen(false)}
                      className="block py-2 text-sm text-[--muted] hover:text-[--text]">👤 Edit Profile</Link>

                    {/* Mobile navigation */}
                    <div className="md:hidden border-t border-[--border] mt-1 pt-1">
                      {links.map((l) => (
                        <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                          className={`block py-2 text-sm ${pathname === l.href ? "text-green-400 font-semibold" : "text-[--muted] hover:text-[--text]"}`}>{l.label}</Link>
                      ))}
                    </div>

                    <button onClick={handleLogout}
                      className="w-full text-left text-sm text-red-400 hover:text-red-300 border-t border-[--border] mt-1 pt-2">
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
