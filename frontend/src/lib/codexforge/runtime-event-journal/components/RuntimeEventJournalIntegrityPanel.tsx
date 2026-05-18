"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventJournalIntegrityReport } from "@/lib/codexforge/runtime-event-journal";
import { RuntimeEventJournalPanel } from "./RuntimeEventJournalPanel";

export function RuntimeEventJournalIntegrityPanel({ report }: { report: RuntimeEventJournalIntegrityReport }) {
  return (
    <RuntimeEventJournalPanel title="Integrity" subtitle="Checks request, approval, policy, validation, reducer preview, evidence, append-only semantics, source routes, and direct UI mutation absence.">
      <div
        style={list}
        data-codexforge-runtime-event-journal-integrity-panel="RuntimeEventJournalIntegrityPanel renders integrity report checks append-only semantics direct UI mutation absent"
      >
        <div style={stats}>
          <Mini label="Pass" value={String(report.passCount)} />
          <Mini label="Warnings" value={String(report.warningCount)} />
          <Mini label="Risks" value={String(report.riskCount)} />
          <Mini label="Blockers" value={String(report.blockerCount)} />
        </div>
        {report.checks.map((check) => (
          <div key={check.id} style={checkStyle}>
            <span style={statusStyle(check.status)}>{check.status}</span>
            <div style={checkBody}>
              <strong style={title}>{check.label}</strong>
              <span style={text}>{check.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </RuntimeEventJournalPanel>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span style={miniLabel}>{label}</span><strong style={miniValue}>{value}</strong></div>;
}

function statusStyle(status: string): CSSProperties {
  const color = status === "pass" ? "#bbf7d0" : status === "blocker" || status === "risk" ? "#fecaca" : "#fde68a";
  return { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color, fontSize: 10, fontWeight: 900, padding: "5px 7px", textTransform: "uppercase", ...safeText };
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const list: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const stats: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(4, minmax(0, 1fr))", minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.11)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 8 };
const miniLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const miniValue: CSSProperties = { color: "#e2e8f0", fontSize: 16, lineHeight: 1.2, ...safeText };
const checkStyle: CSSProperties = { alignItems: "start", border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)", borderRadius: 8, display: "grid", gap: 8, gridTemplateColumns: "auto minmax(0, 1fr)", minWidth: 0, padding: 9 };
const checkBody: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const title: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.3, ...safeText };
const text: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, ...safeText };
