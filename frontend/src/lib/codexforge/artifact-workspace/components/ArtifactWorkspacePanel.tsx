"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactWorkspaceReactKey,
  type ArtifactWorkspaceContext,
} from "@/lib/codexforge/artifact-workspace";

export function ArtifactWorkspacePanel({ context }: { context: ArtifactWorkspaceContext }) {
  return (
    <section style={panel} data-codexforge-artifact-workspace-panel="ArtifactWorkspacePanel renders">
      <div style={header}>
        <span style={eyebrow}>Phase 11 workspace</span>
        <strong style={badge}>safe workspace</strong>
      </div>
      <h2 style={title}>Guarded Artifact Workspace</h2>
      <div style={grid}>
        <Metric label="Workspace root" value={context.workspaceRoot} />
        <Metric label="Approval" value="explicit approval required" />
        <Metric label="Mutation" value="source mutation blocked" />
        <Metric label="Action" value="Review export request" />
      </div>
      <div style={extensionWrap}>
        {context.allowedExtensions.map((extension) => (
          <span key={buildArtifactWorkspaceReactKey("extension", extension)} style={extensionPill}>
            {extension}
          </span>
        ))}
      </div>
      <div style={links}>
        <a href="/runs" style={link}>Operator Run Center</a>
        <a href="/creative" style={link}>Creative Production Studio</a>
        <a href="/creative-bridge" style={link}>artifact capture plan placeholders</a>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(6,28,30,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.30)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 24, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.54)", borderRadius: 8, padding: 10, display: "grid", gap: 6, fontSize: 12, color: "#cbd5e1", overflowWrap: "anywhere" };
const extensionWrap: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const extensionPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.26)", background: "rgba(45,212,191,0.10)", color: "#ccfbf1", borderRadius: 7, padding: "6px 8px", fontSize: 12, fontWeight: 800 };
const links: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const link: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(15,23,42,0.55)", borderRadius: 8, padding: "8px 10px", color: "#e2e8f0", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
