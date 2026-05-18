"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { OperatorMemoryInboxCard } from "@/lib/codexforge/operator-memory-inbox";
import { buildJournalEntriesFromMemoryPromotionGate } from "@/lib/codexforge/runtime-event-journal";
import {
  buildMemoryPromotedEventPreview,
  buildMemoryPromotionApprovalPacket,
  buildMemoryPromotionAuditLedger,
  buildMemoryPromotionExecutionBridge,
  buildMemoryPromotionGateInput,
  buildMemoryPromotionGateSummary,
  buildMemoryPromotionPolicy,
  buildMemoryPromotionRequestPacket,
  validateMemoryPromotionGateInput,
} from "../index";
import { MemoryPromotionSafetyNotice } from "./MemoryPromotionSafetyNotice";
import { PromotionApprovalPacketPanel } from "./PromotionApprovalPacketPanel";
import { PromotionAuditLedgerPanel } from "./PromotionAuditLedgerPanel";
import { PromotionEventPreviewPanel } from "./PromotionEventPreviewPanel";
import { PromotionExecutionBridgePanel } from "./PromotionExecutionBridgePanel";
import { PromotionGateInputPanel } from "./PromotionGateInputPanel";
import { PromotionPolicyPanel } from "./PromotionPolicyPanel";
import { PromotionRequestPacketPanel } from "./PromotionRequestPacketPanel";
import { RuntimeEventExecutorPanel } from "@/lib/codexforge/runtime-event-executor/components";

export function MemoryPromotionGatePanel({ card, compact = false }: { card?: OperatorMemoryInboxCard | null; compact?: boolean }) {
  const [approved, setApproved] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const gateInput = useMemo(() => buildMemoryPromotionGateInput(card ?? {}), [card]);
  const inputValidation = useMemo(() => validateMemoryPromotionGateInput(gateInput), [gateInput]);
  const approvalPacket = useMemo(
    () =>
      buildMemoryPromotionApprovalPacket(gateInput, {
        approved,
        operatorDecision: approved ? "approve" : "undecided",
        approvalNote,
        acknowledgedEvidenceContext: approved,
        acknowledgedDuplicateRisk: approved,
        acknowledgedContradictionRisk: approved,
        acknowledgedConfidenceImportance: approved,
        acknowledgedNoSilentGraphMutation: approved,
        acknowledgedFutureRuntimeEvent: approved,
        acknowledgedReviewBoundary: approved,
        acknowledgedLowConfidence: approved,
        dedupeReviewed: approved,
        contradictionDecisionSupplied: approved,
      }),
    [approvalNote, approved, gateInput]
  );
  const policy = useMemo(() => buildMemoryPromotionPolicy(gateInput, approvalPacket), [approvalPacket, gateInput]);
  const eventPreview = useMemo(() => buildMemoryPromotedEventPreview(gateInput, policy), [gateInput, policy]);
  const requestPacket = useMemo(
    () => buildMemoryPromotionRequestPacket({ approvalPacket, policyConfirmation: policy, eventPreview }),
    [approvalPacket, eventPreview, policy]
  );
  const bridge = useMemo(() => buildMemoryPromotionExecutionBridge(requestPacket), [requestPacket]);
  const ledger = useMemo(
    () => buildMemoryPromotionAuditLedger({ gateInput, approvalPacket, policy, requestPacket }),
    [approvalPacket, gateInput, policy, requestPacket]
  );
  const summary = useMemo(
    () => buildMemoryPromotionGateSummary({ gateInput, approvalPacket, policy, requestPacket }),
    [approvalPacket, gateInput, policy, requestPacket]
  );
  const journalPreview = useMemo(
    () => buildJournalEntriesFromMemoryPromotionGate({ gateInput, approvalPacket, policy, eventPreview, requestPacket, bridge, auditLedger: ledger, summary }),
    [approvalPacket, bridge, eventPreview, gateInput, ledger, policy, requestPacket, summary]
  );

  if (!card) {
    return (
      <section style={panel} data-codexforge-memory-promotion-gate-panel="MemoryPromotionGatePanel renders empty explicit approval required no auto-promotion no graph mutation">
        <strong>Memory Promotion Gate</strong>
        <p style={text}>Select a reviewed inbox card to preview a guarded memory promotion request.</p>
      </section>
    );
  }

  return (
    <section
      style={panel}
      data-codexforge-memory-promotion-gate-panel="MemoryPromotionGatePanel renders explicit approval required no auto-promotion no graph mutation appendEvent is not called from UI evidence is context, not authority preserve latest-message authority memory.promoted future reducer boundary"
    >
      <MemoryPromotionSafetyNotice />
      <div style={approvalBox}>
        <label style={checkLabel}>
          <input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} />
          Explicitly approve promotion request preview
        </label>
        <textarea
          value={approvalNote}
          onChange={(event) => setApprovalNote(event.target.value)}
          placeholder="Approval note"
          style={textarea}
        />
      </div>
      <div style={stats}>
        <Mini label="Approval ready" value={summary.approvalReady ? "yes" : "no"} />
        <Mini label="Policy ready" value={summary.policyReady ? "yes" : "no"} />
        <Mini label="Request ready" value={summary.requestReady ? "yes" : "no"} />
      </div>
      <div
        style={journalBox}
        data-codexforge-memory-promotion-runtime-journal="Runtime Event Journal handoff/status and Brain Mutation Governance status are read-only; no auto-promotion, no graph mutation, and no appendEvent from UI."
      >
        <strong>Runtime Event Journal handoff</strong>
        <span>{journalPreview.length} memory promotion lifecycle entries visible for audit review. Brain Mutation Governance confirms Memory Promotion Gate remains review-gated.</span>
        <Link href="/runtime-journal" style={journalLink}>Open Runtime Event Journal</Link>
        <Link href="/brain-governance" style={journalLink}>Review Brain Mutation Governance</Link>
      </div>
      <PromotionGateInputPanel input={gateInput} validation={inputValidation} />
      {!compact ? <PromotionApprovalPacketPanel packet={approvalPacket} /> : null}
      <PromotionPolicyPanel policy={policy} />
      {!compact ? <PromotionEventPreviewPanel preview={eventPreview} /> : null}
      {!compact ? <PromotionRequestPacketPanel request={requestPacket} /> : null}
      <RuntimeEventExecutorPanel card={card} compact />
      <PromotionExecutionBridgePanel bridge={bridge} />
      {!compact ? <PromotionAuditLedgerPanel ledger={ledger} /> : null}
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(2,6,23,0.5)", borderRadius: 8, padding: 12, display: "grid", gap: 12, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const approvalBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const checkLabel: CSSProperties = { display: "flex", gap: 8, alignItems: "center", color: "#e2e8f0", fontSize: 12, fontWeight: 850, overflowWrap: "anywhere" };
const textarea: CSSProperties = { width: "100%", minHeight: 70, border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.54)", color: "#e2e8f0", borderRadius: 8, padding: 10, resize: "vertical" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, minWidth: 0 };
const mini: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, color: "#cbd5e1", fontSize: 11, minWidth: 0, overflowWrap: "anywhere" };
const journalBox: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 10, display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, minWidth: 0, overflowWrap: "anywhere" };
const journalLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", width: "fit-content", maxWidth: "100%", overflowWrap: "anywhere" };
