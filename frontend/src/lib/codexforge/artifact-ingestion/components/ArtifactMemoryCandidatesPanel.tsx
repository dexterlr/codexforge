import type { CSSProperties } from "react";
import {
  buildArtifactIngestionStableKey,
  summarizeArtifactMemoryCandidates,
  type ArtifactMemoryCandidate,
} from "@/lib/codexforge/artifact-ingestion";

export function ArtifactMemoryCandidatesPanel({ candidates }: { candidates: ArtifactMemoryCandidate[] }) {
  return (
    <section style={panel} data-codexforge-artifact-memory-candidates="memory candidates review before promotion">
      <div style={header}>
        <span style={eyebrow}>Memory candidates</span>
        <span style={count}>{candidates.length}</span>
      </div>
      <div style={summaryList}>
        {summarizeArtifactMemoryCandidates(candidates).map((line) => (
          <p key={buildArtifactIngestionStableKey("memory-summary", line)} style={summary}>{line}</p>
        ))}
      </div>
      <div style={items}>
        {candidates.map((candidate) => (
          <article key={candidate.id} style={item}>
            <div style={itemHeader}>
              <strong style={itemTitle}>{candidate.title}</strong>
              <span style={pill}>{candidate.importance}</span>
            </div>
            <p style={meta}>{candidate.artifactType} to {candidate.targetWorkspacePath || "pending workspace path"}</p>
            <p style={meta}>confidence {candidate.confidence.toFixed(2)}; {candidate.validationResult}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(2,6,23,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const count: CSSProperties = { color: "#e0f2fe", fontSize: 12, fontWeight: 900 };
const summaryList: CSSProperties = { display: "grid", gap: 4 };
const summary: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const items: CSSProperties = { display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: 10, background: "rgba(15,23,42,0.68)", minWidth: 0 };
const itemHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(147,197,253,0.24)", borderRadius: 8, padding: "3px 6px", color: "#bfdbfe", fontSize: 11, fontWeight: 800 };
const meta: CSSProperties = { margin: "6px 0 0", color: "#94a3b8", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
