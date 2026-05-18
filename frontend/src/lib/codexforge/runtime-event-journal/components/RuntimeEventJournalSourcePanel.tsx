"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventJournalSourceSummary } from "@/lib/codexforge/runtime-event-journal";
import { RuntimeEventJournalPanel } from "./RuntimeEventJournalPanel";

export function RuntimeEventJournalSourcePanel({ sources }: { sources: readonly RuntimeEventJournalSourceSummary[] }) {
  return (
    <RuntimeEventJournalPanel title="Sources" subtitle="Adapters consume source data and return journal entries without persistence or execution.">
      <div
        style={list}
        data-codexforge-runtime-event-journal-source-panel="RuntimeEventJournalSourcePanel renders read-only source adapters"
      >
        {sources.map((source) => (
          <article key={`runtime-journal-source-${source.source}`} style={card}>
            <div style={row}>
              <strong style={title}>{source.source}</strong>
              <span style={pill}>{source.entryCount} entries</span>
            </div>
            <div style={grid}>
              <Mini label="Blocked" value={String(source.blockedCount)} />
              <Mini label="Review" value={String(source.reviewRequiredCount)} />
            </div>
            <p style={text}>{source.topEntryTitle}</p>
          </article>
        ))}
      </div>
    </RuntimeEventJournalPanel>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span style={miniLabel}>{label}</span><strong style={miniValue}>{value}</strong></div>;
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const list: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const row: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { color: "#e2e8f0", fontSize: 13, lineHeight: 1.3, ...safeText };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#e0f2fe", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const grid: CSSProperties = { display: "grid", gap: 7, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.1)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 8 };
const miniLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const miniValue: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.3, ...safeText };
const text: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, margin: 0, ...safeText };
