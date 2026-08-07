"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0b1120", borderTop: "1px solid #1c2a48", padding: "20px 16px", marginTop: "auto" }}>
      <div style={{ maxWidth: "672px", margin: "0 auto" }}>
        {/* Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "12px", flexWrap: "wrap" }}>
          <Link href="/about" style={{ fontSize: "12px", color: "#6a7c9a", textDecoration: "none" }}>
            About Us
          </Link>
          <Link href="/about" style={{ fontSize: "12px", color: "#6a7c9a", textDecoration: "none" }}>
            Contact
          </Link>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#6a7c9a", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/rules" style={{ fontSize: "12px", color: "#6a7c9a", textDecoration: "none" }}>
            Rules
          </Link>
        </div>

        {/* Brand */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: "#22c55e", letterSpacing: "2px", marginBottom: "4px" }}>
            ⚽ ARENA
          </div>
          <div style={{ fontSize: "10px", color: "#4a5568" }}>
            © {new Date().getFullYear()} Arena Football Predictions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
