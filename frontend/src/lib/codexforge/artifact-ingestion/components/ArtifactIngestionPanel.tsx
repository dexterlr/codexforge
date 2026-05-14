import type { CSSProperties } from "react";
import {
  buildArtifactIngestionStableKey,
  type ArtifactIngestionBundle,
} from "@/lib/codexforge/artifact-ingestion";
import { ArtifactBrainSignalsPanel } from "./ArtifactBrainSignalsPanel";
import { ArtifactIngestionLedgerPanel } from "./ArtifactIngestionLedgerPanel";
import { ArtifactIngestionReadinessPanel } from "./ArtifactIngestionReadinessPanel";
import { ArtifactIngestionSafetyNotice } from "./ArtifactIngestionSafetyNotice";
import { ArtifactMemoryCandidatesPanel } from "./ArtifactMemoryCandidatesPanel";

export function ArtifactIngestionPanel({ bundle }: { bundle: ArtifactIngestionBundle }) {
  return (
    <section
      style={panel}
      data-codexforge-artifact-ingestion-panel="ArtifactIngestionPanel review before promotion no direct graph mutation memory candidates brain signals"
    >
      <div style={header}>
        <div style={copy}>
          <span style={eyebrow}>Phase 15 artifact ingestion</span>
          <h2 style={title}>Brain Ingestion Candidates</h2>
          <p style={lede}>
            Exported artifacts become structured event candidates, memory candidates, and brain signals for future guarded runtime ingestion. This panel is read-only and requires review before promotion.
          </p>
        </div>
        <a href="/artifacts" style={link}>Open Artifacts</a>
      </div>
      <div style={summaryGrid}>
        {bundle.summary.slice(0, 5).map((line) => (
          <p key={buildArtifactIngestionStableKey("bundle-summary", line)} style={summary}>{line}</p>
        ))}
      </div>
      <div style={layout}>
        <div style={main}>
          <ArtifactMemoryCandidatesPanel candidates={bundle.memoryCandidates} />
          <ArtifactBrainSignalsPanel signals={bundle.brainSignals} />
        </div>
        <aside style={rail}>
          <ArtifactIngestionSafetyNotice />
          <ArtifactIngestionReadinessPanel readiness={bundle.readiness} />
          <ArtifactIngestionLedgerPanel ledger={bundle.ledger} />
        </aside>
      </div>
    </section>
  );
}

const panel: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(3,7,18,0.96), rgba(17,24,39,0.9))", borderRadius: 8, padding: 18, display: "grid", gap: 16, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "start", gap: 14, flexWrap: "wrap" };
const copy: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 26, lineHeight: 1.15, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.5, maxWidth: 900 };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.14)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 };
const summary: CSSProperties = { margin: 0, border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(15,23,42,0.58)", padding: 10, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 430px), 0.75fr)", gap: 14, alignItems: "start" };
const main: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
