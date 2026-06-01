"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterContractPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  return (
    <section style={card} data-codexforge-provider-adapter-contract-panel="ProviderAdapterContractPanel adapter contracts control-plane only no fetch">
      <h2 style={title}>Adapter contracts</h2>
      <p style={copy}>An adapter is the shape of a future connection: request format, setup posture, and safety boundaries.</p>
      {adapters.slice(0, 3).map((adapter) => (
        <div key={`contract-${adapter.id}`} style={row}>
          <strong>{adapter.label}</strong>
          <span>{adapter.contract.noviceExplanation}</span>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const row: CSSProperties = { borderTop: "1px solid rgba(125,211,252,0.12)", display: "grid", gap: 4, paddingTop: 8, fontSize: 13 };
