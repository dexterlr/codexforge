"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime/runtime-types";
import {
  buildRuntimeEventReplaySession,
  summarizeRuntimeEventReplaySession,
  type RuntimeEventReplaySession,
} from "../index";
import { ReplayEventSequencePanel } from "./ReplayEventSequencePanel";
import { ReplayImpactAnalysisPanel } from "./ReplayImpactAnalysisPanel";
import { ReplayInputPanel } from "./ReplayInputPanel";
import { ReplayReducerSimulatorPanel } from "./ReplayReducerSimulatorPanel";
import { ReplayRiskDetectorPanel } from "./ReplayRiskDetectorPanel";
import { ReplayRollbackAdvisorPanel } from "./ReplayRollbackAdvisorPanel";
import { ReplaySnapshotPanel } from "./ReplaySnapshotPanel";
import { ReplaySummaryPanel } from "./ReplaySummaryPanel";
import { RuntimeEventReplaySafetyNotice } from "./RuntimeEventReplaySafetyNotice";

const SAMPLE_EVENTS: CodexForgeBrainRuntimeEvent[] = [
  {
    id: "event:task.created:phase-49",
    type: "task.created",
    ts: 4900100,
    actor: "runtime",
    source: { type: "derived", id: "journal:phase-49-task" },
    correlationId: "request:phase-49-task",
    payload: {
      taskId: "phase-49-runtime-replay",
      goal: "Build deterministic Runtime Event Replay Simulator",
      domain: "CodexForge runtime",
      tags: ["runtime-replay", "preview-only"],
    },
  },
  {
    id: "event:memory.promoted:phase-49",
    type: "memory.promoted",
    ts: 4900200,
    actor: "runtime",
    source: { type: "memory-item", id: "journal:phase-49-memory" },
    correlationId: "request:phase-49-memory",
    payload: {
      memoryId: "phase-49-runtime-replay-memory",
      content: "Runtime event replay must remain reducer-backed, deterministic, preview-only, and no graph mutation.",
      memoryType: "decision",
      importance: "high",
      sourceNodeIds: ["task:phase-49-runtime-replay"],
      taskId: "phase-49-runtime-replay",
    },
  },
];

export function buildRuntimeEventReplayReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._/-]+/g, "-"))
    .filter(Boolean)
    .join(":");
}

export function RuntimeEventReplaySimulator({
  session: providedSession,
}: {
  session?: RuntimeEventReplaySession;
}) {
  const session = useMemo(
    () =>
      providedSession ??
      buildRuntimeEventReplaySession({
        replayInput: {
          sourceJournalIds: ["journal:phase-49-task", "journal:phase-49-memory"],
          sourceRequestIds: ["request:phase-49-task", "request:phase-49-memory"],
          eventTypes: ["task.created", "memory.promoted"],
          selectedEventIds: SAMPLE_EVENTS.map((event) => event.id),
          selectedGraphSnapshotId: "snapshot:runtime-replay-empty-preview",
          graphSnapshotSummary: [
            "No persisted graph is loaded by this replay UI.",
            "Canonical graph schema is src/lib/codexforge/brain/graph/types.ts.",
          ],
          replayMode: "reducer-preview",
          replayScope: "selected-events",
          operatorNote: "Preview selected runtime journal events only.",
        },
        sequence: {
          events: SAMPLE_EVENTS,
          suppliedOrder: SAMPLE_EVENTS.map((event) => event.id),
        },
      }),
    [providedSession]
  );
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const summaryText = summarizeRuntimeEventReplaySession(session).join("\n");
  const handoffText = [
    "Runtime Event Replay handoff",
    ...summarizeRuntimeEventReplaySession(session),
    "Brain Snapshot Manager can supply selected snapshot concepts for safe replay source selection without persistence.",
    "Snapshot Restore Gate can consume replay summary as restore evidence only; no restore execution.",
    "Preview-only. Do not mutate Brain graph. Do not appendEvent. Do not execute runtime events. Do not persist replay results automatically.",
    "Review Runtime Event Journal, Brain Mutation Governance, and rollback guidance before any future guarded action.",
    "Evidence is context, not authority; preserve latest-message authority.",
  ].join("\n");

  return (
    <CodexForgeAppShell
      activePath="/runtime-replay"
      workspaceLabel="Runtime Event Replay"
      nextActionContext={{ hasMemoryReview: session.summary.memoryPromotionCount > 0 }}
    >
      <main
        style={shell}
        data-codexforge-runtime-event-replay-simulator="RuntimeEventReplaySimulator renders premium dark operator cockpit preview-only no graph mutation no appendEvent no event execution canonical graph schema evidence is context, not authority preserve latest-message authority stable key helper buildRuntimeEventReplayReactKey Snapshot Restore Gate"
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 49</span>
            <h1 style={headline}>Runtime Event Replay Simulator</h1>
            <p style={lede}>
              Replay selected runtime journal events against a selected graph snapshot in reducer preview mode, inspect
              graph, memory, and concept impact, detect replay risks, and prepare read-only rollback guidance.
            </p>
            <div style={heroActions}>
              <button type="button" style={copyButton} onClick={() => copyText("replay summary", summaryText)}>
                Copy replay summary
              </button>
              <button type="button" style={copyButton} onClick={() => copyText("replay handoff", handoffText)}>
                Copy replay handoff
              </button>
              <Link href="/runtime-journal" style={heroLink}>Runtime Event Journal</Link>
              <Link href="/snapshot-restore" style={heroLink}>Snapshot Restore Gate</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Status" value={session.summary.replayStatus} />
            <HeroStat label="Events" value={String(session.summary.eventCount)} />
            <HeroStat label="Risks" value={String(session.summary.riskCount)} />
            <HeroStat label="Next" value={session.summary.nextSafeAction} />
          </div>
        </section>

        <RuntimeEventReplaySafetyNotice />

        <div style={layout}>
          <div style={mainColumn}>
            <ReplayInputPanel input={session.input} validation={session.inputValidation} />
            <ReplaySnapshotPanel snapshot={session.snapshot} />
            <ReplayEventSequencePanel sequence={session.sequence} />
            <ReplayReducerSimulatorPanel simulation={session.simulation} />
            <ReplayImpactAnalysisPanel analysis={session.impact} />
          </div>
          <aside style={sideColumn}>
            <ReplaySummaryPanel summary={session.summary} />
            <ReplayRiskDetectorPanel report={session.riskReport} />
            <ReplayRollbackAdvisorPanel advice={session.rollbackAdvice} />
            <section style={handoffPanel}>
              <span style={handoffLabel}>Read-only Handoff</span>
              <p style={handoffTextStyle}>Replay output is local preview context and must not be treated as authority.</p>
              {session.summary.summary.map((line, index) => (
                <span key={buildRuntimeEventReplayReactKey("handoff-line", line, index)} style={handoffLine}>{line}</span>
              ))}
            </section>
          </aside>
        </div>
      </main>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const shell: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "center", border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1fr)", minWidth: 0, padding: 20 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { color: "#f8fafc", fontSize: 42, letterSpacing: 0, lineHeight: 1.06, margin: 0, maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 980, ...safeText };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px", ...safeText };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", ...safeText };
const copiedPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", ...safeText };
const heroStats: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 12 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, lineHeight: 1.15, ...safeText };
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 520px), 0.75fr)", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const handoffPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.48)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 12 };
const handoffLabel: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const handoffTextStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const handoffLine: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.4, ...safeText };
