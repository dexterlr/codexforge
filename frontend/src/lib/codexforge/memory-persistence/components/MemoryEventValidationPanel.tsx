"use client";

import type { CSSProperties } from "react";
import { buildMemoryEventStableKey, type MemoryEventValidation } from "../memory-persistence-types";

export function MemoryEventValidationPanel({ validation }: { validation: MemoryEventValidation }) {
  return (
    <section style={panel} data-codexforge-memory-event-validation-panel="MemoryEventValidationPanel renders traversal absolute path source mutation high contradiction risk validation">
      <span style={eyebrow}>Validation</span>
      <h2 style={title}>Event guard result: {validation.state}</h2>
      <div style={summaryList}>
        {validation.summary.map((line, index) => (
          <p key={buildMemoryEventStableKey("validation-summary", line, index)} style={summary}>{line}</p>
        ))}
      </div>
      <div style={metaGrid}>
        <Meta label="Path" value={validation.pathValidation.normalizedPath ?? "blocked"} />
        <Meta label="Traversal" value={validation.pathValidation.traversal ? "blocked" : "clear"} />
        <Meta label="Absolute path" value={validation.pathValidation.absolutePath ? "blocked" : "clear"} />
        <Meta label="Source mutation" value={validation.pathValidation.sourceMutationAttempt ? "blocked" : "clear"} />
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={meta}>
      <span style={metaLabel}>{label}</span>
      <strong style={metaValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 19, ...safeText };
const summaryList: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const summary: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, ...safeText };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const meta: CSSProperties = { border: "1px solid rgba(125,211,252,0.12)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metaLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const metaValue: CSSProperties = { color: "#e0f2fe", fontSize: 12, ...safeText };
