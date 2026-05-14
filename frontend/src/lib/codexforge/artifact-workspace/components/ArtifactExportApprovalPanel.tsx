"use client";

import type { CSSProperties } from "react";
import {
  summarizeArtifactExportRequest,
  buildArtifactWorkspaceReactKey,
  type ArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";

export function ArtifactExportApprovalPanel({ request }: { request: ArtifactExportRequest }) {
  const lines = summarizeArtifactExportRequest(request);

  return (
    <section style={panel} data-codexforge-artifact-export-approval-panel="ArtifactExportApprovalPanel renders">
      <div style={header}>
        <span style={eyebrow}>Export approval</span>
        <strong style={badge}>Review export request</strong>
      </div>
      <p style={body}>
        The UI does not auto-export. A caller must submit an explicit approved payload to the guarded export API.
      </p>
      <ul style={list}>
        {lines.map((line, index) => (
          <li key={buildArtifactWorkspaceReactKey("approval", line, index)} style={item}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.22)", background: "rgba(8,21,43,0.74)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(96,165,250,0.30)", color: "#dbeafe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 13, lineHeight: 1.5 };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(96,165,250,0.14)", background: "rgba(15,23,42,0.50)", borderRadius: 8, padding: 10, color: "#eff6ff", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
