"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterModelFamilyPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  return (
    <section style={card} data-codexforge-provider-adapter-model-family-panel="ProviderAdapterModelFamilyPanel model family metadata">
      <h2 style={title}>Model families</h2>
      <p style={copy}>Model family notes explain likely strengths without claiming exact prices or guaranteed quality.</p>
      {adapters.map((adapter) => (
        <div key={`families-${adapter.id}`} style={row}>
          <strong>{adapter.label}</strong>
          <span>{adapter.modelFamilies.map((family) => family.label).join(", ")}</span>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const row: CSSProperties = { borderTop: "1px solid rgba(125,211,252,0.12)", display: "grid", gap: 4, paddingTop: 8, fontSize: 13 };
