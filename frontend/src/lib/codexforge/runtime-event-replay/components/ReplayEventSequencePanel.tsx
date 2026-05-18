import type { CSSProperties } from "react";
import type { RuntimeReplayEventSequence } from "../runtime-event-replay-types";
import { RuntimeEventReplayEmptyState } from "./RuntimeEventReplayEmptyState";

export function ReplayEventSequencePanel({ sequence }: { sequence: RuntimeReplayEventSequence }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-event-sequence-panel="ReplayEventSequencePanel renders deterministic ordered replay sequence stable keys preview-only no event execution"
    >
      <div style={heading}>
        <span style={eyebrow}>Replay Sequence</span>
        <h2 style={title}>Reducer input order</h2>
        <p style={muted}>Supplied order is honored first; otherwise event type priority and event id decide the order.</p>
      </div>
      <div style={grid}>
        <Stat label="Events" value={String(sequence.eventCount)} />
        <Stat label="Allowed" value={String(sequence.allowedCount)} />
        <Stat label="Blocked" value={String(sequence.blockedCount)} />
        <Stat label="Warnings" value={String(sequence.warningCount)} />
      </div>
      {sequence.items.length === 0 ? (
        <RuntimeEventReplayEmptyState />
      ) : (
        <div style={items}>
          {sequence.items.map((item) => (
            <article key={item.sequenceId} style={itemBox}>
              <div style={itemTop}>
                <strong style={itemTitle}>{item.replayOrder}. {item.eventType}</strong>
                <span style={status}>{item.validationState}</span>
              </div>
              <span style={mono}>{item.eventId}</span>
              <span style={muted}>{item.expectedReducerArea}</span>
              <div style={summaryLines}>
                {item.payloadSummary.map((line) => (
                  <span key={`${item.sequenceId}-${line}`} style={summaryLine}>{line}</span>
                ))}
              </div>
              {item.warnings.length > 0 ? (
                <div style={warningBox}>
                  {item.warnings.map((warning) => (
                    <span key={`${item.sequenceId}-${warning}`}>{warning}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
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

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(4, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 16, lineHeight: 1.2, ...safeText };
const items: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const itemBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const itemTop: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, ...safeText };
const status: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 8, color: "#ccfbf1", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const mono: CSSProperties = { color: "#cbd5e1", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 11, ...safeText };
const summaryLines: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const summaryLine: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.4, ...safeText };
const warningBox: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.08)", borderRadius: 8, color: "#fde68a", display: "grid", gap: 4, fontSize: 12, lineHeight: 1.4, padding: 8, ...safeText };
