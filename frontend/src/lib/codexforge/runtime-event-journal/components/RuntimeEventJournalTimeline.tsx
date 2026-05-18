"use client";

import type { CSSProperties } from "react";
import { buildRuntimeEventJournalStableKey, type RuntimeEventJournalEntry } from "@/lib/codexforge/runtime-event-journal";
import { RuntimeEventJournalPanel } from "./RuntimeEventJournalPanel";

export function RuntimeEventJournalTimeline({ entries }: { entries: readonly RuntimeEventJournalEntry[] }) {
  const groups = [
    { id: "blocked", label: "Blocked and Review", entries: entries.filter((entry) => entry.type === "execution.blocked" || entry.reviewRequired) },
    { id: "ready", label: "Ready and Preview", entries: entries.filter((entry) => entry.type === "execution.ready" || entry.type === "reducerPreview.built" || entry.type === "dryRun.completed") },
    { id: "executed", label: "Appended Context", entries: entries.filter((entry) => entry.type === "event.appended" || entry.resultStatus === "executed") },
  ].filter((group) => group.entries.length > 0);

  return (
    <RuntimeEventJournalPanel title="Lifecycle Timeline" subtitle="Grouped read-only states; ordering is deterministic by priority and stable keys.">
      <div
        style={timeline}
        data-codexforge-runtime-event-journal-timeline="RuntimeEventJournalTimeline renders append-only audit timeline"
      >
        {groups.map((group) => (
          <div key={`runtime-journal-timeline-${group.id}`} style={groupStyle}>
            <h3 style={groupTitle}>{group.label}</h3>
            <div style={items}>
              {group.entries.slice(0, 6).map((entry, index) => (
                <div key={buildRuntimeEventJournalStableKey("timeline", [group.id, entry.id], index)} style={item}>
                  <span style={dot} />
                  <div style={itemText}>
                    <strong style={itemTitle}>{entry.title}</strong>
                    <span style={itemDetail}>{entry.type} / {entry.runtimeEventType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 ? <p style={emptyText}>No timeline entries match the current filter.</p> : null}
      </div>
    </RuntimeEventJournalPanel>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const timeline: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const groupStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 11 };
const groupTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, margin: 0, ...safeText };
const items: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const item: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "10px minmax(0, 1fr)", minWidth: 0 };
const dot: CSSProperties = { background: "#2dd4bf", borderRadius: 999, height: 8, marginTop: 5, width: 8 };
const itemText: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const itemTitle: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.35, ...safeText };
const itemDetail: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.35, ...safeText };
const emptyText: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.5, margin: 0, ...safeText };
