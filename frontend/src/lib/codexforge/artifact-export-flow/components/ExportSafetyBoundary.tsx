"use client";

import type { CSSProperties } from "react";
import { CODEXFORGE_ARTIFACT_WORKSPACE_ROOT } from "@/lib/codexforge/artifact-workspace";

export function ExportSafetyBoundary() {
  return (
    <section
      style={panel}
      data-codexforge-artifact-export-safety-boundary="ExportSafetyBoundary renders explicit approval required safe artifact workspace source mutation blocked .codexforge/artifacts"
    >
      <div style={header}>
        <span style={eyebrow}>Safety boundary</span>
        <strong style={badge}>artifact export only</strong>
      </div>
      <div style={grid}>
        <Metric label="Safe artifact workspace" value={CODEXFORGE_ARTIFACT_WORKSPACE_ROOT} />
        <Metric label="Approval" value="explicit approval required" />
        <Metric label="Source mutation" value="source mutation blocked" />
        <Metric label="Execution" value="commands and external apps blocked" />
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

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(6,28,30,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#cbd5e1", fontSize: 12, overflowWrap: "anywhere" };
