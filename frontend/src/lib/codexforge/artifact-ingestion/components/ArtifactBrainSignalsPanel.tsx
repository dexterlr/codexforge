import type { CSSProperties } from "react";
import {
  buildArtifactIngestionStableKey,
  summarizeArtifactBrainSignals,
  type ArtifactBrainSignal,
} from "@/lib/codexforge/artifact-ingestion";

export function ArtifactBrainSignalsPanel({ signals }: { signals: ArtifactBrainSignal[] }) {
  return (
    <section style={panel} data-codexforge-artifact-brain-signals="brain signals no direct graph mutation">
      <div style={header}>
        <span style={eyebrow}>Brain signals</span>
        <span style={count}>{signals.length}</span>
      </div>
      <div style={summaryList}>
        {summarizeArtifactBrainSignals(signals).map((line) => (
          <p key={buildArtifactIngestionStableKey("brain-summary", line)} style={summary}>{line}</p>
        ))}
      </div>
      <div style={items}>
        {signals.slice(0, 8).map((signal) => (
          <article key={signal.id} style={item}>
            <strong style={itemTitle}>{signal.label}</strong>
            <p style={meta}>{signal.kind}; {signal.readiness}; confidence {signal.confidence.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(2,6,23,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const count: CSSProperties = { color: "#ede9fe", fontSize: 12, fontWeight: 900 };
const summaryList: CSSProperties = { display: "grid", gap: 4 };
const summary: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const items: CSSProperties = { display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: 10, background: "rgba(15,23,42,0.68)", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, minWidth: 0 };
const meta: CSSProperties = { margin: "6px 0 0", color: "#94a3b8", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
