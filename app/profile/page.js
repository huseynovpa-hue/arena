"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef(null);
  const { t } = useLang();
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
      setUsername(data.username || "");
      setAvatarUrl(data.avatar_url || "");
    }
  }

  async function uploadAvatar(e) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image must be under 2MB");
      return;
    }

    setUploading(true);
    setMessage("");

    const ext = file.name.split(".").pop();
    const fileName = `${user.id}/avatar.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setMessage("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const newUrl = urlData.publicUrl + "?t=" + Date.now();
    setAvatarUrl(newUrl);

    // Save to profile
    await supabase
      .from("profiles")
      .update({ avatar_url: newUrl })
      .eq("id", user.id);

    setUploading(false);
    setMessage("Photo updated!");
    setTimeout(() => setMessage(""), 3000);
  }

  async function saveProfile() {
    if (!user || !username.trim()) return;
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({ username: username.trim() })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Profile saved!");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  if (!profile) {
    return <div className="py-20 text-center text-[--muted]">Loading...</div>;
  }

  return (
    <div className="py-6 max-w-sm mx-auto">
      <h1 className="text-lg font-black mb-6">{t.yourProfile}</h1>

      <div className="card p-5 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden bg-[--surface] border-2 border-[--border] cursor-pointer group"
            onClick={() => fileRef.current?.click()}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-[--muted]">
                👤
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold">
                {uploading ? "Uploading..." : "Change"}
              </span>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="mt-3 text-xs text-green-400 hover:underline font-semibold"
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>

        {/* Username */}
        <div>
          <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-dark"
            placeholder="Your display name"
          />
        </div>

        {/* Email (read only) */}
        <div>
          <label className="text-[11px] text-[--muted] font-semibold uppercase tracking-wider mb-1.5 block">
            Email
          </label>
          <div className="input-dark opacity-60 cursor-not-allowed">
            {user?.email}
          </div>
        </div>

        {/* Role */}
        <div className="bg-[--bg] rounded-xl p-3 text-center border border-[--border]">
          <div className="text-sm font-black text-amber-400">{profile.is_admin ? "Admin" : "Player"}</div>
          <div className="text-[9px] text-[--muted] uppercase tracking-wider">Role</div>
        </div>

        {message && (
          <div className={`text-xs text-center p-2.5 rounded-lg ${
            message.startsWith("Error")
              ? "text-red-400 bg-red-500/10 border border-red-500/20"
              : "text-green-400 bg-green-500/10 border border-green-500/20"
          }`}>
            {message}
          </div>
        )}

        <button onClick={saveProfile} disabled={saving} className="btn-accent w-full">
          {saving ? "Saving..." : "{t.saveProfile}"}
        </button>
      </div>
    </div>
  );
}
