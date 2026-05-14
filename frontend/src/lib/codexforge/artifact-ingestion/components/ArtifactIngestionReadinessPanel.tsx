import type { CSSProperties } from "react";
import {
  buildArtifactIngestionStableKey,
  summarizeArtifactIngestionReadiness,
  type ArtifactIngestionReadiness,
} from "@/lib/codexforge/artifact-ingestion";

export function ArtifactIngestionReadinessPanel({ readiness }: { readiness: ArtifactIngestionReadiness[] }) {
  return (
    <section style={panel} data-codexforge-artifact-ingestion-readiness="artifact ingestion readiness">
      <div style={header}>
        <span style={eyebrow}>Ingestion readiness</span>
        <span style={count}>{readiness.length}</span>
      </div>
      {summarizeArtifactIngestionReadiness(readiness).map((line) => (
        <p key={buildArtifactIngestionStableKey("readiness-summary", line)} style={summary}>{line}</p>
      ))}
      <div style={items}>
        {readiness.map((item) => (
          <article key={item.id} style={row}>
            <strong style={itemTitle}>{item.artifactId}</strong>
            <span style={score}>{item.score}</span>
            <span style={state}>{item.state}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(2,6,23,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#fcd34d", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const count: CSSProperties = { color: "#fef3c7", fontSize: 12, fontWeight: 900 };
const summary: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const items: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto auto", gap: 8, alignItems: "center", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: 10, background: "rgba(15,23,42,0.68)" };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 12, overflowWrap: "anywhere" };
const score: CSSProperties = { color: "#fef3c7", fontSize: 12, fontWeight: 900 };
const state: CSSProperties = { color: "#cbd5e1", fontSize: 11, fontWeight: 800 };
