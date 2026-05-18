"use client";

import type { CSSProperties } from "react";
import {
  classifyRuntimeEventJournalPriority,
  scoreRuntimeEventJournalEntryPriority,
  type RuntimeEventJournalEntry,
} from "@/lib/codexforge/runtime-event-journal";

export function RuntimeEventJournalEntryCard({ entry }: { entry: RuntimeEventJournalEntry }) {
  const priority = classifyRuntimeEventJournalPriority(entry);
  return (
    <article
      style={card}
      data-codexforge-runtime-event-journal-entry-card="RuntimeEventJournalEntryCard renders stable read-only entry no graph mutation no appendEvent from UI"
    >
      <div style={topLine}>
        <span style={typePill}>{entry.type}</span>
        <span style={severityStyle(entry.severity)}>{entry.severity}</span>
      </div>
      <div style={titleBlock}>
        <h3 style={title}>{entry.title}</h3>
        <p style={detail}>{entry.detail}</p>
      </div>
      <div style={metaGrid}>
        <Mini label="Source" value={`${entry.source} / ${entry.sourceId}`} />
        <Mini label="Runtime event" value={entry.runtimeEventId ? `${entry.runtimeEventType} / ${entry.runtimeEventId}` : entry.runtimeEventType} />
        <Mini label="Request" value={entry.requestId ?? "not supplied"} />
        <Mini label="Priority" value={`${priority} / ${scoreRuntimeEventJournalEntryPriority(entry)}`} />
      </div>
      <div style={chips}>
        {entry.reviewRequired ? <span style={warningChip}>review required</span> : <span style={okChip}>review visible</span>}
        {entry.resultStatus ? <span style={chip}>status: {entry.resultStatus}</span> : null}
        {entry.timestampLabel ? <span style={chip}>time: {entry.timestampLabel}</span> : null}
      </div>
      {entry.relatedRoutes.length > 0 || entry.relatedFiles.length > 0 || entry.evidenceRefs.length > 0 ? (
        <div style={refsGrid}>
          <RefList label="Routes" values={entry.relatedRoutes} />
          <RefList label="Files" values={entry.relatedFiles} />
          <RefList label="Evidence" values={entry.evidenceRefs} />
        </div>
      ) : null}
    </article>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div style={mini}>
      <span style={miniLabel}>{label}</span>
      <strong style={miniValue}>{value}</strong>
    </div>
  );
}

function RefList({ label, values }: { label: string; values: readonly string[] }) {
  if (values.length === 0) return null;
  return (
    <div style={refList}>
      <span style={miniLabel}>{label}</span>
      {values.slice(0, 4).map((value) => (
        <span key={`${label}-${value}`} style={refValue}>{value}</span>
      ))}
      {values.length > 4 ? <span style={refValue}>+{values.length - 4} more</span> : null}
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const card: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.15)",
  background: "rgba(2,6,23,0.48)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 14,
};
const topLine: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const typePill: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 11, fontWeight: 900, padding: "6px 8px", ...safeText };
function severityStyle(severity: string): CSSProperties {
  const color = severity === "blocker" || severity === "risk" ? "#fecaca" : severity === "success" ? "#bbf7d0" : "#cbd5e1";
  const border = severity === "blocker" || severity === "risk" ? "rgba(248,113,113,0.28)" : severity === "success" ? "rgba(74,222,128,0.24)" : "rgba(148,163,184,0.18)";
  return { border: `1px solid ${border}`, borderRadius: 8, color, fontSize: 11, fontWeight: 900, padding: "6px 8px", ...safeText };
}
const titleBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const title: CSSProperties = { color: "#f8fafc", fontSize: 17, lineHeight: 1.25, margin: 0, ...safeText };
const detail: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, margin: 0, ...safeText };
const metaGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.03)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 9 };
const miniLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const miniValue: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.35, ...safeText };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, color: "#cbd5e1", fontSize: 11, fontWeight: 800, padding: "6px 8px", ...safeText };
const warningChip: CSSProperties = { ...chip, border: "1px solid rgba(251,191,36,0.25)", color: "#fde68a", background: "rgba(251,191,36,0.08)" };
const okChip: CSSProperties = { ...chip, border: "1px solid rgba(45,212,191,0.24)", color: "#ccfbf1", background: "rgba(20,184,166,0.08)" };
const refsGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", minWidth: 0 };
const refList: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.11)", display: "grid", gap: 5, minWidth: 0, paddingTop: 8 };
const refValue: CSSProperties = { color: "#cbd5e1", fontSize: 11, lineHeight: 1.35, ...safeText };
