"use client";

import type { CSSProperties } from "react";
import type { CreativeAdapterCatalogItem } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

export function CreativeAdapterCatalogPanel({ adapters }: { adapters: CreativeAdapterCatalogItem[] }) {
  return (
    <section style={card} data-codexforge-creative-adapter-catalog-panel="CreativeAdapterCatalogPanel renders adapter catalog includes blender-python-preview comfyui-workflow-preview unreal-editor-command-preview">
      <div style={header}>
        <span style={eyebrow}>Adapters</span>
        <strong>Creative Adapter Catalog</strong>
      </div>
      <div style={list}>
        {adapters.map((adapter) => (
          <article key={buildCreativeLocalBridgeReactKey("adapter", adapter.id)} style={item}>
            <div style={row}><strong>{adapter.label}</strong><span style={pill}>{adapter.executionMode}</span></div>
            <p style={copy}>{adapter.id} / {adapter.bridgeKind} / {adapter.capability}</p>
            <p style={muted}>Artifacts: {adapter.expectedArtifacts.join(", ")}. Risk: {adapter.riskLevel}.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(8,20,28,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "grid", gap: 4 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.55)", borderRadius: 8, padding: 12, overflowWrap: "anywhere" };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" };
const pill: CSSProperties = { color: "#ccfbf1", border: "1px solid rgba(94,234,212,0.26)", borderRadius: 8, padding: "4px 7px", fontSize: 11, fontWeight: 900 };
const copy: CSSProperties = { margin: "7px 0 0", color: "#dbeafe", fontSize: 13, lineHeight: 1.45 };
const muted: CSSProperties = { margin: "6px 0 0", color: "#94a3b8", fontSize: 12, lineHeight: 1.45 };
