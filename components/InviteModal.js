"use client";
import { useState } from "react";

export default function InviteModal({ username, onClose }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const inviteLink = `${siteUrl}?ref=${encodeURIComponent(username || "friend")}`;
  const inviteText = `${username || "I"} challenges you to predict football scores on Arena! 🏆⚽\n\nPredict exact scores, compete weekly, climb the leaderboard.\n\nJoin here: ${inviteLink}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = inviteLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Arena — Football Predictions",
          text: inviteText,
          url: inviteLink,
        });
      } catch (e) {
        if (e.name !== "AbortError") copyLink();
      }
    } else {
      copyLink();
    }
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(inviteText)}`, "_blank");
  }

  function shareTelegram() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(`${username || "I"} challenges you to predict football scores on Arena! 🏆⚽`)}`, "_blank");
  }

  return (
    <>
      <div onClick={onClose}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 99998, cursor: "pointer" }} />
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 99999, width: "90%", maxWidth: "380px",
        background: "#1e293b", borderRadius: "16px", border: "1px solid #334155",
        padding: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#e4e9f2" }}>Invite friends</span>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: "#6a7c9a", fontSize: "18px", cursor: "pointer" }}>✕</button>
        </div>

        {/* Message */}
        <p style={{ fontSize: "13px", color: "#6a7c9a", lineHeight: 1.6, marginBottom: "16px" }}>
          Challenge your friends to beat your predictions! Share your invite link and compete together on the leaderboard.
        </p>

        {/* Link box */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px",
          background: "#0f172a", border: "1px solid #334155", borderRadius: "10px", padding: "10px 12px",
        }}>
          <span style={{ flex: 1, fontSize: "12px", color: "#6a7c9a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {inviteLink}
          </span>
          <button onClick={copyLink}
            style={{
              padding: "6px 14px", borderRadius: "8px", border: "none", fontSize: "12px", fontWeight: 700,
              background: copied ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
              color: copied ? "#22c55e" : "#22c55e", cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        {/* Share buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Native share (mobile) */}
          <button onClick={shareNative}
            style={{
              width: "100%", padding: "12px", borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff",
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
            }}>
            📤 Share invite link
          </button>

          {/* WhatsApp + Telegram row */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={shareWhatsApp}
              style={{
                flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #334155",
                background: "#0f172a", color: "#e4e9f2", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <button onClick={shareTelegram}
              style={{
                flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #334155",
                background: "#0f172a", color: "#e4e9f2", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
