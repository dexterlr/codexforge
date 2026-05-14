"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { MissionControlSummary } from "../mission-control-types";

export function MissionHero({ summary }: { summary: MissionControlSummary }) {
  return (
    <section style={hero} data-mission-component="MissionHero renders">
      <div style={copy}>
        <span style={eyebrow}>CodexForge Phase 13</span>
        <h1 style={title}>Mission Control Dashboard</h1>
        <p style={lede}>
          Unified readonly cockpit for system health, active surfaces, safe next
          actions, run readiness, artifacts, packs, bridge consent, capabilities,
          and brain signals.
        </p>
        <div style={statusRow}>
          <span style={statusPill}>readonly</span>
          <span style={statusPill}>local-first</span>
          <span style={statusPill}>approval gated</span>
        </div>
      </div>
      <div style={panel}>
        <div style={panelLabel}>Primary safe action</div>
        <Link href={summary.primaryAction.href} style={primaryLink}>
          {summary.primaryAction.label}
        </Link>
        <div style={panelText}>{summary.primaryAction.safetyNote}</div>
        <div style={scoreGrid}>
          <div style={scoreCell}>
            <span style={scoreValue}>{summary.readiness.score}</span>
            <span style={scoreLabel}>readiness</span>
          </div>
          <div style={scoreCell}>
            <span style={scoreValue}>{summary.registry.surfaces.length}</span>
            <span style={scoreLabel}>surfaces</span>
          </div>
          <div style={scoreCell}>
            <span style={scoreValue}>{summary.systemMap.edges.length}</span>
            <span style={scoreLabel}>handoffs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const hero: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 380px), 0.65fr)",
  gap: 18,
  alignItems: "stretch",
  border: "1px solid rgba(45,212,191,0.2)",
  background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(15,23,42,0.84))",
  borderRadius: 8,
  padding: "clamp(18px, 3vw, 28px)",
  minWidth: 0,
};
const copy: CSSProperties = { display: "grid", gap: 12, alignContent: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0 };
const title: CSSProperties = { margin: 0, fontSize: "clamp(34px, 6vw, 68px)", lineHeight: 0.96, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 16, lineHeight: 1.6, maxWidth: 920 };
const statusRow: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const statusPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.1)", color: "#ccfbf1", borderRadius: 999, padding: "7px 10px", fontSize: 12, fontWeight: 900 };
const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.54)", borderRadius: 8, padding: 16, display: "grid", gap: 12, alignContent: "center", minWidth: 0 };
const panelLabel: CSSProperties = { color: "#94a3b8", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const primaryLink: CSSProperties = { color: "#f8fafc", textDecoration: "none", border: "1px solid rgba(99,102,241,0.36)", background: "linear-gradient(135deg, rgba(99,102,241,0.48), rgba(20,184,166,0.28))", borderRadius: 8, padding: "12px 14px", fontWeight: 900, textAlign: "center" };
const panelText: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55 };
const scoreGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 };
const scoreCell: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.7)", borderRadius: 8, padding: 10, display: "grid", gap: 3, minWidth: 0 };
const scoreValue: CSSProperties = { fontSize: 22, fontWeight: 900 };
const scoreLabel: CSSProperties = { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", fontWeight: 900 };
