"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";
import InviteModal from "./InviteModal";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, lang, setLang } = useLang();

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
    { href: "/", label: `⚽ ${t.matches}` },
    { href: "/leaderboard", label: `🏆 ${t.board}` },
    { href: "/rules", label: `📋 ${t.rules}` },
  ];
  if (profile?.is_admin) links.push({ href: "/admin", label: `⚙ ${t.admin}` });

  return (
    <>
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

        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "en" ? "az" : "en")}
            className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-1 rounded-lg hover:bg-blue-500/20 transition-colors">
            🌐 {lang === "en" ? "AZ" : "EN"}
          </button>
          {user ? (
            <>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full overflow-hidden bg-green-500/20 flex items-center justify-center text-sm border-2 border-transparent hover:border-green-500/50 transition-colors"
                style={{ position: "relative", zIndex: 100 }}>
                {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" /> : "👤"}
              </button>
              {menuOpen && (
                <>
                  <div onClick={() => setMenuOpen(false)}
                    style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.6)", zIndex:9998 }} />
                  <div style={{
                    position:"fixed", top:"60px", left:"12px", right:"12px", zIndex:9999,
                    background:"#1e293b", border:"1px solid #334155", borderRadius:"16px",
                    padding:"16px", boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px", paddingBottom:"12px", borderBottom:"1px solid #334155" }}>
                      <div style={{ width:44, height:44, borderRadius:"50%", overflow:"hidden", background:"#0f1525", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0 }}>
                        {profile?.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : "👤"}
                      </div>
                      <div style={{ minWidth:0 }}>
                        <p style={{ fontSize:"14px", fontWeight:700, color:"#e4e9f2", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{profile?.username}</p>
                        <p style={{ fontSize:"12px", color:"#6a7c9a", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</p>
                      </div>
                    </div>

                    <Link href="/profile" onClick={() => setMenuOpen(false)}
                      style={{ display:"block", padding:"10px 0", fontSize:"14px", color:"#6a7c9a", textDecoration:"none" }}>
                      👤 {t.editProfile}
                    </Link>

                    <button onClick={() => { setMenuOpen(false); setShowInvite(true); }}
                      style={{ display:"block", width:"100%", textAlign:"left", padding:"10px 0", fontSize:"14px", color:"#22c55e", background:"none", border:"none", cursor:"pointer" }}>
                      🎯 {t.inviteFriends}
                    </button>

                    <div className="md:hidden" style={{ borderTop:"1px solid #334155", marginTop:"4px", paddingTop:"4px" }}>
                      {links.map((l) => (
                        <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                          style={{ display:"block", padding:"10px 0", fontSize:"14px", color: pathname === l.href ? "#22c55e" : "#6a7c9a", fontWeight: pathname === l.href ? 600 : 400, textDecoration:"none" }}>
                          {l.label}
                        </Link>
                      ))}
                    </div>

                    <button onClick={handleLogout}
                      style={{ width:"100%", textAlign:"left", fontSize:"14px", color:"#f87171", background:"none", border:"none", borderTop:"1px solid #334155", marginTop:"4px", paddingTop:"10px", cursor:"pointer" }}>
                      {t.signOut}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link href="/login" className="btn-accent text-xs" style={{ padding: "6px 16px" }}>{t.signIn}</Link>
          )}
        </div>
      </div>
    </nav>

    {showInvite && (
      <InviteModal username={profile?.username} onClose={() => setShowInvite(false)} />
    )}
    </>
  );
}
