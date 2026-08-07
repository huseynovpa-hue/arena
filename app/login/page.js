"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { t } = useLang();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isRegister) {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: username || "user_" + Date.now().toString(36) },
        },
      });
      setLoading(false);
      if (err) setError(err.message);
      else {
        setSuccess("Account created! Signing you in...");
        // Auto sign in
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (!signInErr) router.push("/");
        else setSuccess("Account created. Please sign in.");
      }
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (err) setError(err.message);
      else router.push("/");
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">⚽</div>
        <h1 className="text-2xl font-black tracking-wide">ARENA</h1>
        <p className="text-xs text-[--muted] mt-1">
          {isRegister ? "Create your account" : "Sign in to predict"}
        </p>
      </div>

      <div className="card p-5">
        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 transition-colors mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {t.continueWithGoogle}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[--border]"></div>
          <span className="text-[10px] text-[--muted] uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[--border]"></div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your display name" required className="input-dark" />
            </div>
          )}
          <div>
            <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="input-dark" />
          </div>
          <div>
            <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="input-dark" />
          </div>

          {error && <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">{error}</div>}
          {success && <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-2.5">{success}</div>}

          <button type="submit" disabled={loading} className="btn-accent w-full">
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
          </button>

          <p className="text-center text-xs text-[--muted]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess(""); }} className="text-green-400 hover:underline font-semibold">
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
