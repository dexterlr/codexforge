"use client";

import type { CSSProperties } from "react";
import type { CodexForgeAdapterHealth } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function AdapterHealthPanel({ adapters }: { adapters: CodexForgeAdapterHealth[] }) {
  return (
    <section data-codexforge-adapter-health-panel style={panel}>
      <div style={eyebrow}>Adapter health</div>
      <div style={grid}>
        {adapters.map((adapter, index) => (
          <article key={buildCodexForgeCapabilityReactKey("adapter", [adapter.toolName], index)} style={row}>
            <div style={top}>
              <strong>{adapter.label}</strong>
              <span style={adapter.blockedByDefault ? blocked : badge}>{adapter.executionMode}</span>
            </div>
            <span style={muted}>{adapter.capability} / {adapter.sideEffect}</span>
            <span style={muted}>{adapter.readinessSummary}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 8 };
const row: CSSProperties = { display: "grid", gap: 5, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(0,0,0,0.15)", borderRadius: 8, padding: 10, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", fontSize: 13 };
const muted: CSSProperties = { fontSize: 11, lineHeight: 1.4, opacity: 0.66, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(52,211,153,0.28)", background: "rgba(52,211,153,0.10)", color: "#bbf7d0", borderRadius: 7, padding: "4px 6px", fontSize: 10, fontWeight: 800 };
const blocked: CSSProperties = { ...badge, borderColor: "rgba(251,113,133,0.36)", background: "rgba(251,113,133,0.12)", color: "#fecdd3" };
