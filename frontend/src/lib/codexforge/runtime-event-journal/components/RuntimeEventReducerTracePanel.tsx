"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventReducerTrace } from "@/lib/codexforge/runtime-event-journal";
import { RuntimeEventJournalPanel } from "./RuntimeEventJournalPanel";

export function RuntimeEventReducerTracePanel({ trace }: { trace: RuntimeEventReducerTrace }) {
  return (
    <RuntimeEventJournalPanel title="Reducer Trace" subtitle="Preview-only reducer context with canonical graph schema reference and no mutation guarantee.">
      <div
        style={list}
        data-codexforge-runtime-event-reducer-trace-panel="RuntimeEventReducerTracePanel renders canonical graph schema path src/lib/codexforge/brain/graph/types.ts reducer trace does not import brain-graph"
      >
        {trace.items.slice(0, 6).map((item) => (
          <article key={item.id} style={traceCard}>
            <div style={row}>
              <strong style={title}>{item.runtimeEventType}</strong>
              <span style={pill}>no mutation guarantee</span>
            </div>
            <p style={text}>Source: {item.sourceEventOrRequest}</p>
            <div style={miniGrid}>
              <Mini label="Node delta" value={String(item.expectedNodeCountDelta)} />
              <Mini label="Edge delta" value={String(item.expectedEdgeCountDelta)} />
              <Mini label="Schema" value={item.canonicalGraphSchemaPath} />
            </div>
            {item.impactedGraphAreas.length > 0 ? <p style={text}>Impacted: {item.impactedGraphAreas.join(", ")}</p> : null}
            {item.blockedReasons.length > 0 ? <p style={riskText}>Blocked: {item.blockedReasons.join(", ")}</p> : null}
          </article>
        ))}
        {trace.items.length === 0 ? <p style={text}>No reducer trace entries are visible for the current filter.</p> : null}
      </div>
    </RuntimeEventJournalPanel>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div style={mini}>
      <span style={miniLabel}>{label}</span>
      <strong style={miniValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const list: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const traceCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const row: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { color: "#e2e8f0", fontSize: 13, lineHeight: 1.3, ...safeText };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#ccfbf1", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const riskText: CSSProperties = { ...text, color: "#fecaca" };
const miniGrid: CSSProperties = { display: "grid", gap: 7, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.1)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 8 };
const miniLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const miniValue: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.35, ...safeText };
