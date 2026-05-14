"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";

export function ProductionPackReplayPanel({
  pack,
  onCopy,
}: {
  pack: ProductionPack;
  onCopy: (text: string) => void;
}) {
  return (
    <section style={panel} data-codexforge-production-pack-replay-panel="ProductionPackReplayPanel renders">
      <div style={header}>
        <span style={eyebrow}>Replay prompt</span>
        <button type="button" style={button} onClick={() => onCopy(pack.replay.followUpPrompt)}>
          Copy replay prompt
        </button>
      </div>
      <ul style={list}>
        {pack.replay.summary.map((line, index) => (
          <li key={buildProductionPackReactKey("replay-summary", line, index)} style={item}>{line}</li>
        ))}
      </ul>
      <p style={prompt}>{pack.replay.followUpPrompt}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(56,189,248,0.22)", background: "rgba(7,47,68,0.26)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const button: CSSProperties = { border: "1px solid rgba(56,189,248,0.34)", background: "rgba(14,165,233,0.14)", color: "#e0f2fe", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 };
const item: CSSProperties = { color: "#e0f2fe", fontSize: 13, lineHeight: 1.45 };
const prompt: CSSProperties = { margin: 0, border: "1px solid rgba(56,189,248,0.14)", background: "rgba(2,6,23,0.46)", borderRadius: 8, padding: 10, color: "#f0f9ff", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", overflowWrap: "anywhere", maxHeight: 220, overflow: "auto" };
