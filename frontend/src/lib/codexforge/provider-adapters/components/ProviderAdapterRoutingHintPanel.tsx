"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterRoutingHintPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  return (
    <section style={card} data-codexforge-provider-adapter-routing-hint-panel="ProviderAdapterRoutingHintPanel deterministic route recommendations approximate planning hints">
      <h2 style={title}>Routing hints</h2>
      <p style={copy}>Token and price notes are approximate planning hints, not billing promises.</p>
      <div style={grid}>
        {adapters.map((adapter) => (
          <div key={`routing-${adapter.id}`} style={mini}>
            <strong>{adapter.label}</strong>
            <span>{adapter.routingHints[0]?.bestUse}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, display: "grid", fontSize: 12, gap: 4, padding: 10 };
