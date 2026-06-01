"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterSafetyPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  const first = adapters[0];
  return (
    <section style={card} data-codexforge-provider-adapter-safety-panel="ProviderAdapterSafetyPanel No raw password storage No localStorage secrets No password or browser cookie storage">
      <h2 style={title}>Safety boundaries</h2>
      <p style={copy}>No adapter captures passwords, browser cookies, session tokens, or API key values.</p>
      <ul style={list}>
        {(first?.safetyProfile.blocked ?? []).map((item) => <li key={`blocked-${item}`}>{item}</li>)}
        <li>API keys belong in .env.local or a secure local secret strategy.</li>
        <li>No live provider calls yet.</li>
      </ul>
    </section>
  );
}

const card: CSSProperties = { background: "rgba(127,29,29,0.18)", border: "1px solid rgba(248,113,113,0.24)", borderRadius: 8, color: "#fee2e2", display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#fecaca", fontSize: 13, lineHeight: 1.5, margin: 0 };
const list: CSSProperties = { color: "#fee2e2", fontSize: 13, lineHeight: 1.5, margin: 0, paddingLeft: 18 };
