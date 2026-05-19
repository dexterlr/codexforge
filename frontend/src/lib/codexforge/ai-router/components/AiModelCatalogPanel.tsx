"use client";

import type { CSSProperties } from "react";
import type { AiModelCatalogEntry } from "../ai-router-types";
import { summarizeAiModelCatalog } from "../ai-model-catalog";

export function AiModelCatalogPanel({ models }: { models: AiModelCatalogEntry[] }) {
  return (
    <section style={panel}>
      <div>
        <span style={eyebrow}>Model catalog</span>
        <h2 style={title}>{summarizeAiModelCatalog(models)}</h2>
      </div>
      <div style={rows}>
        {models.map((model) => (
          <article key={model.id} style={row}>
            <div style={{ minWidth: 0 }}>
              <strong style={name}>{model.label}</strong>
              <p style={meta}>{model.family} / {model.qualityTier} / approx context {model.contextWindowEstimate.toLocaleString()} tokens</p>
            </div>
            <div style={chips}>
              {model.strengths.map((strength) => <span key={strength} style={chip}>{strength}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 14 };
const rows: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "grid", gap: 9, border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.5)", borderRadius: 8, padding: 12, minWidth: 0 };
const name: CSSProperties = { fontSize: 14, overflowWrap: "anywhere" };
const meta: CSSProperties = { margin: "4px 0 0", fontSize: 12, color: "rgba(226,232,240,0.68)", overflowWrap: "anywhere" };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const chip: CSSProperties = { fontSize: 10, color: "#ddd6fe", background: "rgba(139,92,246,0.12)", borderRadius: 999, padding: "3px 7px" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: "4px 0 0", letterSpacing: 0, overflowWrap: "anywhere" };
