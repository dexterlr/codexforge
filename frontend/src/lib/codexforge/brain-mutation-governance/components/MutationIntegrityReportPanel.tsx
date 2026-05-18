"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type BrainMutationIntegrityReport,
} from "../index";

export function MutationIntegrityReportPanel({ report }: { report: BrainMutationIntegrityReport }) {
  return (
    <section
      style={panel}
      data-codexforge-mutation-integrity-report-panel="MutationIntegrityReportPanel renders integrity report checks canonical graph schema path checks direct UI mutation blocked checks smoke coverage present"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Mutation Integrity Report</h2>
        <p style={subtitleStyle}>
          Journal, executor, reducer preview, policy confirmation, audit ledger, smoke coverage, and latest-message authority posture.
        </p>
      </div>
      <div style={stats}>
        <Stat label="Pass" value={String(report.passCount)} />
        <Stat label="Warning" value={String(report.warningCount)} />
        <Stat label="Risk" value={String(report.riskCount)} />
        <Stat label="Blocker" value={String(report.blockerCount)} />
      </div>
      <div style={list}>
        {report.checks.map((check, index) => (
          <article key={buildBrainMutationGovernanceStableKey("integrity", check.id, index)} style={card}>
            <div style={top}>
              <strong style={itemTitle}>{check.label}</strong>
              <span style={statusStyle(check.status)}>{check.status}</span>
            </div>
            <p style={text}>{check.detail}</p>
            <p style={next}>Next: {check.nextSafeAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

function statusStyle(status: string): CSSProperties {
  const pass = status === "pass";
  const warning = status === "warning";
  const risk = status === "risk";
  return {
    border: `1px solid ${pass ? "rgba(45,212,191,0.22)" : warning ? "rgba(250,204,21,0.22)" : risk ? "rgba(245,158,11,0.26)" : "rgba(248,113,113,0.28)"}`,
    background: pass ? "rgba(20,184,166,0.1)" : warning ? "rgba(250,204,21,0.08)" : risk ? "rgba(245,158,11,0.1)" : "rgba(248,113,113,0.1)",
    borderRadius: 8,
    color: pass ? "#ccfbf1" : warning ? "#fef3c7" : risk ? "#fde68a" : "#fecaca",
    fontSize: 11,
    fontWeight: 900,
    padding: "5px 7px",
    ...safeText,
  };
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.45)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 9 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, ...safeText };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const next: CSSProperties = { color: "#e0f2fe", fontSize: 12, fontWeight: 850, lineHeight: 1.45, margin: 0, ...safeText };
