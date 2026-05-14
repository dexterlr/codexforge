"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCapabilityArtifact } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function ArtifactLedgerPanel({ artifacts }: { artifacts: CodexForgeCapabilityArtifact[] }) {
  return (
    <section data-codexforge-artifact-ledger-panel style={panel}>
      <div style={eyebrow}>Artifact ledger preview</div>
      <div style={grid}>
        {artifacts.slice(0, 12).map((artifact, index) => (
          <article key={buildCodexForgeCapabilityReactKey("artifact", [artifact.artifactId], index)} style={row}>
            <strong>{artifact.label}</strong>
            <span style={muted}>{artifact.type} / {artifact.status}</span>
            <span style={path}>{artifact.outputPathPlaceholder}</span>
            <span style={muted}>{artifact.safetyNote}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 8 };
const row: CSSProperties = { display: "grid", gap: 5, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(0,0,0,0.15)", borderRadius: 8, padding: 10, minWidth: 0, fontSize: 12 };
const muted: CSSProperties = { fontSize: 11, lineHeight: 1.4, opacity: 0.66, overflowWrap: "anywhere" };
const path: CSSProperties = { fontSize: 11, lineHeight: 1.35, color: "#bfdbfe", overflowWrap: "anywhere" };
