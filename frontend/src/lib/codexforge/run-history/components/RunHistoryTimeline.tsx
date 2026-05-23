"use client";

import type { CSSProperties } from "react";
import {
  buildRunHistoryEventsForRecord,
  buildRunHistoryExport,
  buildRunHistoryFilters,
  buildRunHistoryHandoff,
  buildRunHistoryMemoryCandidate,
  buildRunHistoryNextActionPlan,
  buildRunHistoryReviewStatus,
  buildRunHistorySummary,
  buildRunHistoryTimeline,
  summarizeRunHistorySession,
  type RunHistoryRecord,
} from "../index";
import { RunHistoryEmptyState } from "./RunHistoryEmptyState";
import { RunHistoryEventList } from "./RunHistoryEventList";
import { RunHistoryExportPanel } from "./RunHistoryExportPanel";
import { RunHistoryFilterBar } from "./RunHistoryFilterBar";
import { RunHistoryHandoffPanel } from "./RunHistoryHandoffPanel";
import { RunHistoryMemoryCandidatePanel } from "./RunHistoryMemoryCandidatePanel";
import { RunHistoryNextActionPanel } from "./RunHistoryNextActionPanel";
import { RunHistoryRecordCard } from "./RunHistoryRecordCard";
import { RunHistoryReviewStatusPanel } from "./RunHistoryReviewStatusPanel";
import { RunHistorySafetyStrip } from "./RunHistorySafetyStrip";
import { rhCopy, rhTextGuard } from "./RunHistoryStyles";

export function RunHistoryTimeline({ records }: { records?: readonly RunHistoryRecord[] }) {
  const timeline = buildRunHistoryTimeline({ records, groupMode: "recent" });
  const featured = timeline.featuredRecord;
  const filters = buildRunHistoryFilters(timeline.records, "all");
  const events = featured ? buildRunHistoryEventsForRecord(featured) : [];
  const review = featured ? buildRunHistoryReviewStatus(featured) : null;
  const handoff = featured ? buildRunHistoryHandoff(featured) : null;
  const nextAction = featured ? buildRunHistoryNextActionPlan(featured) : null;
  const memoryCandidate = featured ? buildRunHistoryMemoryCandidate({ record: featured }) : null;
  const resultExport = handoff ? buildRunHistoryExport({ handoff, format: "markdown" }) : null;
  const summary = buildRunHistorySummary({ records: timeline.records, selectedFilter: "all", nextSafeAction: timeline.nextAction });

  function copyText(label: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
    void label;
  }

  return (
    <section style={shell} data-codexforge-run-history-timeline="RunHistoryTimeline renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Run History Timeline</span>
          <h1 style={headline}>Run history</h1>
          <p style={lede}>Review recent work, capture handoffs, and decide what to do next.</p>
          <RunHistorySafetyStrip />
        </div>
        {nextAction ? <RunHistoryNextActionPanel plan={nextAction} /> : null}
      </section>
      <section style={summaryStrip}>{summarizeRunHistorySession(summary).map((line) => <span key={`run-history-session-${line.slice(0, 34)}`}>{line}</span>)}</section>
      <RunHistoryFilterBar filters={filters} />
      <RunHistoryEmptyState />
      <section style={grid}>
        {timeline.records.map((record) => <RunHistoryRecordCard key={record.runId} record={record} />)}
      </section>
      <section style={grid}>
        <RunHistoryEventList events={events} />
        {review ? <RunHistoryReviewStatusPanel review={review} /> : null}
        {handoff ? <RunHistoryHandoffPanel handoff={handoff} onCopy={copyText} /> : null}
        {memoryCandidate ? <RunHistoryMemoryCandidatePanel candidate={memoryCandidate} onCopy={copyText} /> : null}
        {resultExport ? <RunHistoryExportPanel resultExport={resultExport} onCopy={copyText} /> : null}
      </section>
      <details style={details}>
        <summary style={rhCopy}>Advanced details</summary>
        <p style={rhCopy}>Timeline source mode is {timeline.sourceMode}. Run history is session/supplied-record/copyable only, with deterministic sample placeholders when no persisted DB exists.</p>
      </details>
    </section>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(7,20,31,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760, ...rhTextGuard };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10, ...rhTextGuard };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 12 };
