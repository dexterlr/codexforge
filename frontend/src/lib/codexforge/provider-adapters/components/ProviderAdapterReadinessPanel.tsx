"use client";

import type { CSSProperties } from "react";
import { describeProviderAdapterReadiness } from "../provider-adapter-readiness";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterReadinessPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  return (
    <section style={card} data-codexforge-provider-adapter-readiness-panel="ProviderAdapterReadinessPanel adapter readiness definition-ready manual-handoff-only needs-local-server">
      <h2 style={title}>Readiness</h2>
      <div style={grid}>
        {adapters.map((adapter) => (
          <div key={`readiness-${adapter.id}`} style={mini}>
            <strong>{adapter.label}</strong>
            <span>{adapter.automationReadiness}</span>
            <p style={copy}>{describeProviderAdapterReadiness(adapter.setupStatus)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))" };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, display: "grid", fontSize: 12, gap: 4, padding: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0 };
