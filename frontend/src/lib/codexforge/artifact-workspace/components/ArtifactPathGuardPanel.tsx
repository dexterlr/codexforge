"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactWorkspaceReactKey,
  validateArtifactWorkspacePath,
  type ArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";

export function ArtifactPathGuardPanel({ request }: { request: ArtifactExportRequest }) {
  const validation = validateArtifactWorkspacePath(request.targetRelativePath);
  const rows = [
    `target: ${request.targetRelativePath}`,
    `normalized: ${validation.normalizedPath ?? "blocked"}`,
    `absolute path blocked: ${validation.absolutePath ? "yes" : "no"}`,
    `path traversal blocked: ${validation.traversal ? "yes" : "no"}`,
    `unsupported extension blocked: ${validation.extensionAllowed ? "no" : "yes"}`,
    `source mutation blocked: ${validation.sourceMutationAttempt ? "yes" : "no"}`,
  ];

  return (
    <section style={panel} data-codexforge-artifact-path-guard-panel="ArtifactPathGuardPanel renders">
      <div style={header}>
        <span style={eyebrow}>Path guard</span>
        <strong style={badge}>{validation.allowed ? "safe workspace" : "blocked"}</strong>
      </div>
      <ul style={list}>
        {rows.map((row, index) => (
          <li key={buildArtifactWorkspaceReactKey("path-guard", row, index)} style={item}>{row}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(27,18,7,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.30)", color: "#fde68a", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(251,191,36,0.14)", background: "rgba(15,23,42,0.48)", borderRadius: 8, padding: 10, color: "#fef3c7", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
