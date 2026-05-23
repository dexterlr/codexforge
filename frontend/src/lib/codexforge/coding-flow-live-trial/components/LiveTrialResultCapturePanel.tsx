"use client";

import type { CSSProperties } from "react";
import type { LiveTrialResultCapture } from "../coding-flow-live-trial-types";

export function LiveTrialResultCapturePanel({ capture }: { capture: LiveTrialResultCapture }) {
  return (
    <section style={panel} data-codexforge-live-trial-result-capture-panel="LiveTrialResultCapturePanel renders validation result run history record no auto-persistence no Brain auto-mutation">
      <h2 style={title}>{capture.title}</h2>
      <div style={grid}>
        {capture.items.map((item) => <span key={`live-trial-capture-${item.itemId}`} style={pill}>{item.label}</span>)}
      </div>
      <p style={copy}>{capture.persistenceBoundary.join(" | ")}</p>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "7px 9px" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, margin: 0 };
