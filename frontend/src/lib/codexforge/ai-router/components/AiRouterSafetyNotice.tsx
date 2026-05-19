"use client";

import type { CSSProperties } from "react";

export function AiRouterSafetyNotice() {
  const rules = [
    "No API keys stored in localStorage or shown in the UI.",
    "No deterministic router network calls, provider calls, or billing calls.",
    "Token estimates are approximate and are not billing truth.",
    "Local-first routing is preferred for private preprocessing.",
    "Subscription-efficient routing reserves premium models for high-value review.",
  ];

  return (
    <section style={notice}>
      <span style={eyebrow}>Safety boundary</span>
      <h2 style={title}>Metadata-only AI Subscription Router</h2>
      {rules.map((rule) => <p key={rule} style={body}>{rule}</p>)}
    </section>
  );
}

const notice: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 14, display: "grid", gap: 7 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: 0, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
