"use client";

import type { CSSProperties } from "react";
import { buildArtifactExecutorModel, type ArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";
import { ArtifactBlockedActionNotice } from "./ArtifactBlockedActionNotice";
import { ArtifactLedgerBoard } from "./ArtifactLedgerBoard";
import { ArtifactPlanPanel } from "./ArtifactPlanPanel";
import { ArtifactPolicyBoundary } from "./ArtifactPolicyBoundary";
import { ArtifactPreviewPanel } from "./ArtifactPreviewPanel";
import { ArtifactRunHandoffPanel } from "./ArtifactRunHandoffPanel";
import { ArtifactValidationPanel } from "./ArtifactValidationPanel";

export function ArtifactExecutorCenter({
  model = buildArtifactExecutorModel(),
}: {
  model?: ArtifactExecutorModel;
}) {
  return (
    <main
      style={page}
      data-codexforge-artifact-executor-center="ArtifactExecutorCenter renders"
      data-codexforge-artifact-executor-preview-only="preview-only"
      data-codexforge-artifact-executor-source-mutation="no source mutation"
      data-codexforge-artifact-executor-command-execution="no command execution"
      data-codexforge-artifact-executor-external-app="no external app execution"
      data-codexforge-artifact-executor-approval="approval required before future writes/execution"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 10</span>
          <h1 style={headline}>Guarded Local Artifact Executor</h1>
          <p style={lede}>
            A preview-only artifact boundary for deterministic markdown, text, and JSON previews.
            It connects Creative Production Studio, Safe Patch Preview, Operator Run Center, and
            Local Bridge without writing files, launching apps, running commands, or mutating project source.
          </p>
          <div style={links}>
            <a href="/creative" style={link}>Creative Production Studio</a>
            <a href="/runs" style={link}>Operator Run Center</a>
            <a href="/bridge" style={link}>Local Bridge</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Mode" value="preview-only" />
          <Status label="Mutation" value="no source mutation" />
          <Status label="Commands" value="no command execution" />
          <Status label="External apps" value="no external app execution" />
          <Status label="Approval" value="approval required before future writes/execution" />
        </div>
      </section>

      <section style={statusStrip}>
        <strong>preview-only</strong>
        <span>no source mutation</span>
        <span>no command execution</span>
        <span>no external app execution</span>
        <span>approval required before future writes/execution</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <ArtifactPlanPanel plan={model.plan} />
          <ArtifactPreviewPanel set={model.previewSet} />
          <ArtifactLedgerBoard ledger={model.ledger} />
          <ArtifactRunHandoffPanel handoff={model.runHandoff} />
        </div>
        <aside style={rail}>
          <ArtifactBlockedActionNotice />
          <ArtifactPolicyBoundary boundary={model.policyBoundary} />
          <ArtifactValidationPanel report={model.validation} />
        </aside>
      </div>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div style={statusCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "linear-gradient(180deg, #050814 0%, #02040A 100%)",
  padding: "24px min(4vw, 44px)",
  display: "grid",
  gap: 16,
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(45,212,191,0.18)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 430px), 0.75fr)", gap: 18, alignItems: "end" };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980 };
const links: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.10)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 155px), 1fr))", gap: 8 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, overflowWrap: "anywhere" };
const statusStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(248,113,113,0.18)", background: "rgba(32,8,18,0.72)", borderRadius: 8, padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", color: "#fee2e2", fontSize: 12, fontWeight: 800 };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.42fr) minmax(min(100%, 430px), 0.72fr)", gap: 16, alignItems: "start" };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
