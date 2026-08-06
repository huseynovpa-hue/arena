"use client";
import { useState, useRef, useEffect } from "react";

export default function ShareCard({ weekLabel, matches, predictions, username, onClose }) {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sharing, setSharing] = useState(false);

  const totalPoints = Object.values(predictions).reduce((sum, p) => sum + (p.points || 0), 0);
  const totalPredictions = Object.keys(predictions).length;
  const maxPoints = matches.length * 50;
  const accuracy = totalPredictions > 0 ? ((totalPoints / (totalPredictions * 50)) * 100).toFixed(0) : 0;
  const perfectCount = Object.values(predictions).filter(p => p.points === 50).length;

  useEffect(() => {
    drawCard();
  }, []);

  async function drawCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 720;
    const H = 960;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#080c16";
    ctx.fillRect(0, 0, W, H);

    // Subtle gradient overlay
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(34,197,94,0.06)");
    grad.addColorStop(0.5, "rgba(34,197,94,0)");
    grad.addColorStop(1, "rgba(34,197,94,0.03)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Border
    ctx.strokeStyle = "#1c2a48";
    ctx.lineWidth = 2;
    roundRect(ctx, 10, 10, W - 20, H - 20, 24);
    ctx.stroke();

    // Header
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⚽ ARENA", W / 2, 60);

    ctx.fillStyle = "#6a7c9a";
    ctx.font = "500 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("FOOTBALL PREDICTIONS", W / 2, 84);

    // Week label
    ctx.fillStyle = "#e4e9f2";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(weekLabel, W / 2, 120);

    // Username
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(username || "Player", W / 2, 168);

    // Big points
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 80px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(`${totalPoints}`, W / 2, 260);

    ctx.fillStyle = "#6a7c9a";
    ctx.font = "500 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(`of ${maxPoints} possible points`, W / 2, 288);

    // Stats row
    const statsY = 330;
    const stats = [
      { label: "Predictions", value: `${totalPredictions}/${matches.length}` },
      { label: "Accuracy", value: `${accuracy}%` },
      { label: "Perfect", value: `${perfectCount}` },
    ];

    stats.forEach((s, i) => {
      const sx = 120 + i * 200;
      // Box
      ctx.fillStyle = "#151d32";
      ctx.strokeStyle = "#1c2a48";
      ctx.lineWidth = 1;
      roundRect(ctx, sx - 60, statsY, 150, 70, 12);
      ctx.fill();
      ctx.stroke();
      // Value
      ctx.fillStyle = "#e4e9f2";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(s.value, sx + 15, statsY + 32);
      // Label
      ctx.fillStyle = "#6a7c9a";
      ctx.font = "500 11px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(s.label.toUpperCase(), sx + 15, statsY + 56);
    });

    // Match results
    const startY = 430;
    ctx.textAlign = "left";

    const sortedMatches = [...matches].sort((a, b) => new Date(a.kick_off) - new Date(b.kick_off));

    sortedMatches.forEach((m, i) => {
      const my = startY + i * 46;
      const pred = predictions[m.id];

      // Row background
      ctx.fillStyle = i % 2 === 0 ? "#111827" : "#0f1525";
      roundRect(ctx, 40, my, W - 80, 40, 8);
      ctx.fill();

      // Home team
      ctx.fillStyle = "#e4e9f2";
      ctx.font = "600 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(truncate(m.home_team, 16), 240, my + 25);

      // Prediction score
      if (pred) {
        ctx.fillStyle = "#6a7c9a";
        ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${pred.home_score} - ${pred.away_score}`, 290, my + 25);
      } else {
        ctx.fillStyle = "#ef4444";
        ctx.font = "600 11px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MISSED", 290, my + 25);
      }

      // Away team
      ctx.fillStyle = "#e4e9f2";
      ctx.font = "600 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(truncate(m.away_team, 16), 340, my + 25);

      // Actual result
      if (m.status === "finished") {
        ctx.fillStyle = "#6a7c9a";
        ctx.font = "500 12px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`(${m.home_score}-${m.away_score})`, 520, my + 25);
      }

      // Points earned
      if (pred?.points != null) {
        ctx.fillStyle = pred.points >= 40 ? "#22c55e" : pred.points >= 20 ? "#f59e0b" : "#6a7c9a";
        ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`${pred.points} pts`, W - 60, my + 25);
      } else if (!pred) {
        ctx.fillStyle = "#ef4444";
        ctx.font = "600 11px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("0 pts", W - 60, my + 25);
      }
    });

    // Footer
    const footerY = H - 50;
    ctx.fillStyle = "#1c2a48";
    ctx.fillRect(40, footerY - 10, W - 80, 1);

    ctx.fillStyle = "#6a7c9a";
    ctx.font = "500 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Join the competition at arena-kappa-teal.vercel.app", W / 2, footerY + 16);

    setImageUrl(canvas.toDataURL("image/png"));
  }

  function truncate(str, max) {
    return str.length > max ? str.slice(0, max - 1) + "…" : str;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  async function handleShare() {
    if (!imageUrl) return;
    setSharing(true);

    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], "arena-score.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "My Arena Predictions",
          text: `I scored ${totalPoints} points this week on Arena! Can you beat me?`,
          files: [file],
        });
      } else {
        // Fallback: download
        downloadImage();
      }
    } catch (e) {
      if (e.name !== "AbortError") downloadImage();
    }
    setSharing(false);
  }

  function downloadImage() {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "arena-score.png";
    a.click();
  }

  return (
    <>
      <div onClick={onClose}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998 }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 9999, width: "90%", maxWidth: "400px", maxHeight: "90vh", overflow: "auto",
        background: "#151d32", borderRadius: "16px", border: "1px solid #1c2a48", padding: "16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#e4e9f2" }}>Share your score</span>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: "#6a7c9a", fontSize: "18px", cursor: "pointer" }}>✕</button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {imageUrl && (
          <img src={imageUrl} alt="Score card" style={{ width: "100%", borderRadius: "12px", marginBottom: "12px" }} />
        )}

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleShare} disabled={sharing}
            style={{
              flex: 1, padding: "12px", borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff",
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
            }}>
            {sharing ? "Sharing..." : "📤 Share"}
          </button>
          <button onClick={downloadImage}
            style={{
              flex: 1, padding: "12px", borderRadius: "10px",
              background: "#0f1525", border: "1px solid #1c2a48", color: "#e4e9f2",
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
            }}>
            💾 Download
          </button>
        </div>
      </div>
    </>
  );
}
