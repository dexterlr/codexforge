"use client";

import type { CSSProperties } from "react";
import { buildMemoryEventStableKey, type MemoryGraphReductionPreview as Preview } from "../memory-persistence-types";

export function MemoryGraphReductionPreview({ preview }: { preview: Preview }) {
  return (
    <section style={panel} data-codexforge-memory-graph-reduction-preview="MemoryGraphReductionPreview renders reduceGraph preview no direct graph mutation no auto-promotion">
      <span style={eyebrow}>Graph reduction preview</span>
      <h2 style={title}>{preview.ready ? "Preview ready" : "Preview blocked"}</h2>
      <div style={grid}>
        <Metric label="Added nodes" value={String(preview.addedNodeCount)} />
        <Metric label="Updated nodes" value={String(preview.updatedNodeCount)} />
        <Metric label="Source refs" value={String(preview.linkedSourceRefs.length)} />
        <Metric label="Next action" value={preview.nextAction} />
      </div>
      {preview.summary.map((line, index) => (
        <p key={buildMemoryEventStableKey("preview-summary", preview.id, line, index)} style={summary}>{line}</p>
      ))}
      {preview.warnings.length > 0 ? (
        <div style={warnings}>
          {preview.warnings.map((warning, index) => (
            <span key={buildMemoryEventStableKey("preview-warning", warning, index)}>{warning}</span>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(34,197,94,0.18)", background: "rgba(6,78,59,0.16)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 19, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 128px), 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(134,239,172,0.14)", background: "rgba(2,6,23,0.32)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#bbf7d0", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const metricValue: CSSProperties = { color: "#f0fdf4", fontSize: 13, ...safeText };
const summary: CSSProperties = { margin: 0, color: "#d1fae5", fontSize: 13, lineHeight: 1.45, ...safeText };
const warnings: CSSProperties = { display: "grid", gap: 5, color: "#fca5a5", fontSize: 12, ...safeText };
