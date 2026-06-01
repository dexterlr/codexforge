"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterCapabilityPanel({ adapters }: { adapters: ProviderAdapterDefinition[] }) {
  return (
    <section style={card} data-codexforge-provider-adapter-capability-panel="ProviderAdapterCapabilityPanel capability definitions multimodal long-context">
      <h2 style={title}>Capabilities</h2>
      <p style={copy}>Capabilities are planning labels, not proof that a model is connected.</p>
      <div style={grid}>
        {adapters.map((adapter) => (
          <div key={`capability-${adapter.id}`} style={mini}>
            <strong>{adapter.label}</strong>
            <span>Chat: {adapter.capabilityProfile.chat ? "described" : "not described"}</span>
            <span>Vision: {adapter.capabilityProfile.vision}</span>
            <span>Long context: {adapter.capabilityProfile.longContext}</span>
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
