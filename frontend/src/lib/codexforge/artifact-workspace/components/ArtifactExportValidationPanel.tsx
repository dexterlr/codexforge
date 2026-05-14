"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactWorkspaceReactKey,
  type ArtifactExportValidationReport,
} from "@/lib/codexforge/artifact-workspace";

export function ArtifactExportValidationPanel({ report }: { report: ArtifactExportValidationReport }) {
  return (
    <section style={panel} data-codexforge-artifact-export-validation-panel="ArtifactExportValidationPanel renders">
      <div style={header}>
        <span style={eyebrow}>Export validation</span>
        <strong style={badge}>{report.state}</strong>
      </div>
      <ul style={list}>
        {report.summary.map((line, index) => (
          <li key={buildArtifactWorkspaceReactKey("export-validation", line, index)} style={item}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(192,132,252,0.22)", background: "rgba(33,18,47,0.70)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#d8b4fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(192,132,252,0.30)", color: "#f3e8ff", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(192,132,252,0.14)", background: "rgba(15,23,42,0.48)", borderRadius: 8, padding: 10, color: "#f3e8ff", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
