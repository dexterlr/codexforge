"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CODEXFORGE_BRAIN_GRAPH_VERSION, type CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { OperatorMemoryInboxCard } from "@/lib/codexforge/operator-memory-inbox";
import { buildJournalEntriesFromRuntimeExecutor } from "@/lib/codexforge/runtime-event-journal";
import {
  buildRuntimeEventApproval,
  buildRuntimeEventAuditLedger,
  buildRuntimeEventExecutorSummary,
  buildRuntimeEventPolicy,
  buildRuntimeEventReducerPreview,
  buildRuntimeEventRequest,
  executeRuntimeEventDryRun,
  validateRuntimeEventPayload,
  validateRuntimeEventRequest,
} from "../index";
import { RuntimeEventApprovalPanel } from "./RuntimeEventApprovalPanel";
import { RuntimeEventAuditLedgerPanel } from "./RuntimeEventAuditLedgerPanel";
import { RuntimeEventExecutorSafetyNotice } from "./RuntimeEventExecutorSafetyNotice";
import { RuntimeEventPolicyPanel } from "./RuntimeEventPolicyPanel";
import { RuntimeEventReducerPreviewPanel } from "./RuntimeEventReducerPreviewPanel";
import { RuntimeEventRequestPanel } from "./RuntimeEventRequestPanel";
import { RuntimeEventResultPanel } from "./RuntimeEventResultPanel";
import { RuntimeEventValidationPanel } from "./RuntimeEventValidationPanel";

export function RuntimeEventExecutorPanel({
  card,
  graph = emptyGraph,
  compact = false,
}: {
  card?: OperatorMemoryInboxCard | null;
  graph?: CodexForgeBrainGraph;
  compact?: boolean;
}) {
  const [approved, setApproved] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const request = useMemo(() => buildRuntimeEventRequestFromCard(card), [card]);
  const requestValidation = useMemo(() => validateRuntimeEventRequest(request), [request]);
  const validation = useMemo(() => validateRuntimeEventPayload(request.requestedEventType, request.requestedPayload), [request]);
  const approval = useMemo(
    () =>
      buildRuntimeEventApproval(request, {
        approved,
        approvalNote,
        acknowledgedEventType: request.requestedEventType,
        acknowledgedReducerEffect: approved,
        acknowledgedEvidenceContext: approved,
        acknowledgedDuplicateRisk: approved,
        acknowledgedContradictionRisks: approved,
        acknowledgedNoSilentGraphMutation: approved,
        acknowledgedAppendOnlyEventSemantics: approved,
      }),
    [approvalNote, approved, request]
  );
  const policy = useMemo(() => buildRuntimeEventPolicy({ request, approval, validation }), [approval, request, validation]);
  const reducerPreview = useMemo(() => buildRuntimeEventReducerPreview({ graph, request, validation }), [graph, request, validation]);
  const dryRunResult = useMemo(() => executeRuntimeEventDryRun({ request, approval, policy, validation, reducerPreview }), [approval, policy, reducerPreview, request, validation]);
  const ledger = useMemo(() => buildRuntimeEventAuditLedger({ request, policy, validation, approval, reducerPreview, result: dryRunResult }), [approval, dryRunResult, policy, reducerPreview, request, validation]);
  const summary = useMemo(() => buildRuntimeEventExecutorSummary({ request, policy, validation, approval, reducerPreview, result: dryRunResult }), [approval, dryRunResult, policy, reducerPreview, request, validation]);
  const journalPreview = useMemo(
    () => buildJournalEntriesFromRuntimeExecutor({ request, policy, validation, approval, reducerPreview, result: dryRunResult, auditLedger: ledger, summary }),
    [approval, dryRunResult, ledger, policy, reducerPreview, request, summary, validation]
  );

  return (
    <section
      style={panel}
      data-codexforge-runtime-event-executor-panel="RuntimeEventExecutorPanel renders Guarded Runtime Event Executor explicit approval required no direct UI graph mutation appendEvent is only allowed inside executor boundary no auto-promotion evidence is context, not authority preserve latest-message authority stable key helper"
    >
      <RuntimeEventExecutorSafetyNotice />
      <div style={stats}>
        <Mini label="Request" value={summary.requestReady ? "ready" : "review"} />
        <Mini label="Policy" value={summary.policyReady ? "ready" : "blocked"} />
        <Mini label="Execution" value={summary.executionStatus} />
      </div>
      <div
        style={journalBox}
        data-codexforge-runtime-event-journal-preview="Runtime Event Journal preview is read-only, no graph mutation, no appendEvent from UI, append-only audit handoff."
      >
        <strong>Runtime Event Journal preview</strong>
        <span>{journalPreview.length} lifecycle entries prepared for read-only audit visibility.</span>
        <Link href="/runtime-journal" style={journalLink}>Open Runtime Event Journal</Link>
      </div>
      <RuntimeEventApprovalPanel approval={approval} approved={approved} approvalNote={approvalNote} onApprovedChange={setApproved} onApprovalNoteChange={setApprovalNote} />
      {!compact ? <RuntimeEventRequestPanel request={request} validation={requestValidation} /> : null}
      <RuntimeEventPolicyPanel policy={policy} />
      <RuntimeEventValidationPanel validation={validation} />
      {!compact ? <RuntimeEventReducerPreviewPanel preview={reducerPreview} /> : null}
      <RuntimeEventResultPanel result={dryRunResult} />
      {!compact ? <RuntimeEventAuditLedgerPanel ledger={ledger} /> : null}
    </section>
  );
}

function buildRuntimeEventRequestFromCard(card?: OperatorMemoryInboxCard | null) {
  const text = card?.proposedMemoryText ?? "Select a reviewed inbox card before execution.";
  return buildRuntimeEventRequest({
    sourceGateId: card?.id ?? "runtime-event-executor-empty",
    sourceSurface: card?.sourceSurface ?? "Operator Memory Inbox",
    requestedEventType: "memory.promoted",
    requestedPayload: {
      memoryId: card ? `memory:${card.id}` : "memory:empty",
      content: text,
      memoryType: card?.memoryKind?.includes("decision") ? "decision" : card?.memoryKind === "follow-up" ? "task" : "note",
      importance: card?.importance ?? 0.5,
      confidence: card?.confidence ?? 0,
      tags: card?.suggestedTags ?? [],
      evidenceRefs: card?.sourceIds.length ? card.sourceIds : card?.evidenceSnippets ?? [],
    },
    operatorIntent: "review approved memory.promoted runtime event request",
    evidenceRefs: card?.sourceIds.length ? card.sourceIds : card?.evidenceSnippets ?? [],
    relatedRoutes: card?.relatedRoutes ?? ["/memory-inbox", "/memory", "/brain"],
    relatedFiles: card?.relatedFiles ?? [],
    approvalPosture: "pending",
    policyPosture: "unchecked",
    duplicateRiskAcknowledgementRequired: (card?.duplicateRisk ?? 0) >= 0.5,
    contradictionRiskAcknowledgementRequired: (card?.contradictionRisk ?? 0) >= 0.5,
    reviewedInboxOrMemoryGate: card?.reviewState === "promotion-ready" || card?.promotionReadiness === "ready-after-review",
  });
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span>{label}</span><strong>{value}</strong></div>;
}

const emptyGraph: CodexForgeBrainGraph = { version: CODEXFORGE_BRAIN_GRAPH_VERSION, nodes: [], edges: [], meta: { createdAt: 1, updatedAt: 1, workspaceId: "runtime-event-executor-preview" } };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(2,6,23,0.5)", borderRadius: 8, padding: 12, display: "grid", gap: 12, minWidth: 0 };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, color: "#cbd5e1", fontSize: 11, minWidth: 0, overflowWrap: "anywhere" };
const journalBox: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 10, display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, minWidth: 0, overflowWrap: "anywhere" };
const journalLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", width: "fit-content", maxWidth: "100%", overflowWrap: "anywhere" };
