"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { EvidenceMemoryPanel } from "@/lib/codexforge/evidence-memory/components";
import {
  buildMemoryPromotionEventPreview,
  buildMemoryReviewAction,
  buildMemoryReviewLedger,
  reduceMemoryReviewQueue,
  type MemoryReviewAction,
  type MemoryReviewActionType,
  type MemoryReviewBundle,
  type MemoryReviewQueue as MemoryReviewQueueModel,
} from "@/lib/codexforge/memory-review";
import {
  MemoryPromotionEventPreview,
  MemoryPromotionPolicyPanel,
  MemoryReviewActionsPanel,
  MemoryReviewLedgerPanel,
  MemoryReviewQueue,
  MemoryReviewSafetyNotice,
  MemoryReviewScorePanel,
} from "@/lib/codexforge/memory-review/components";
import {
  buildMemoryEventLedger,
  buildMemoryEventPersistencePolicy,
  buildMemoryEventPersistenceRequest,
  buildMemoryGraphReductionPreview,
  validateMemoryEventContent,
} from "@/lib/codexforge/memory-persistence";
import { MemoryPersistencePanel } from "@/lib/codexforge/memory-persistence/components";
import { buildBrainMergeReviewModel } from "@/lib/codexforge/brain-merge";
import { BrainMergeReviewPanel } from "@/lib/codexforge/brain-merge/components";
import {
  applyApprovedBrainGraphMerge,
  buildApprovedBrainMergePolicy,
  buildApprovedBrainMergeRequest,
  buildApprovedMergeLedger,
  buildApprovedMergeRollbackPlan,
  validateApprovedBrainMergeRequest,
  type ApprovedBrainMergeResult,
} from "@/lib/codexforge/approved-brain-merge";
import { ApprovedBrainMergePanel } from "@/lib/codexforge/approved-brain-merge/components";
import { BrainRecallPanel } from "@/lib/codexforge/brain-recall/components";
import { RegressionTriagePanel } from "@/lib/codexforge/regression-triage";
import { RegressionFixQueuePanel } from "@/lib/codexforge/regression-fix-queue/components";
import { loadBrainGraph, saveBrainGraph } from "@/lib/codexforge/brain/graph/storage";
import { CODEXFORGE_BRAIN_GRAPH_VERSION, type CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";

type MemoryPageClientProps = {
  initialData: MemoryReviewBundle;
};

export default function MemoryPageClient({ initialData }: MemoryPageClientProps) {
  const [queue, setQueue] = useState<MemoryReviewQueueModel>(initialData.queue);
  const [actions, setActions] = useState<MemoryReviewAction[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(
    initialData.queue.items[0]?.id ?? "memory-review-item:empty"
  );
  const [copied, setCopied] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [contradictionAcknowledged, setContradictionAcknowledged] = useState(false);
  const [appendState, setAppendState] = useState<"idle" | "pending" | "persisted" | "blocked" | "failed">("idle");
  const [appendMessage, setAppendMessage] = useState("");
  const [brainGraph, setBrainGraph] = useState<CodexForgeBrainGraph>(emptyPreviewGraph);
  const [mergeApproved, setMergeApproved] = useState(false);
  const [mergeApprovalNote, setMergeApprovalNote] = useState("");
  const [mergeApplyState, setMergeApplyState] = useState<"idle" | "blocked" | "applied" | "failed">("idle");
  const [mergeApplyMessage, setMergeApplyMessage] = useState("");
  const [mergeResult, setMergeResult] = useState<ApprovedBrainMergeResult | null>(null);

  useEffect(() => {
    setBrainGraph(loadBrainGraph());
  }, []);

  const selectedItem = useMemo(
    () => queue.items.find((item) => item.id === selectedItemId) ?? queue.items[0],
    [queue.items, selectedItemId]
  );
  const ledger = useMemo(() => buildMemoryReviewLedger(queue, actions), [queue, actions]);
  const preview = useMemo(
    () =>
      selectedItem
        ? buildMemoryPromotionEventPreview(selectedItem, queue.policy)
        : initialData.eventPreview,
    [initialData.eventPreview, queue.policy, selectedItem]
  );
  const persistencePolicy = useMemo(() => buildMemoryEventPersistencePolicy(), []);
  const persistenceRequest = useMemo(
    () =>
      buildMemoryEventPersistenceRequest({
        item: selectedItem,
        approvalNote,
        contradictionAcknowledged,
      }),
    [approvalNote, contradictionAcknowledged, selectedItem]
  );
  const persistenceValidation = useMemo(
    () => validateMemoryEventContent(persistenceRequest),
    [persistenceRequest]
  );
  const persistenceLedger = useMemo(
    () => buildMemoryEventLedger([persistenceRequest], [persistenceValidation]),
    [persistenceRequest, persistenceValidation]
  );
  const reductionPreview = useMemo(
    () =>
      buildMemoryGraphReductionPreview({
        graph: emptyPreviewGraph,
        request: persistenceRequest,
        validation: persistenceValidation,
      }),
    [persistenceRequest, persistenceValidation]
  );
  const brainMergeReview = useMemo(
    () =>
      buildBrainMergeReviewModel({
        graph: brainGraph,
        events: [persistenceRequest],
        contradictionRiskAcknowledged: contradictionAcknowledged,
      }),
    [brainGraph, contradictionAcknowledged, persistenceRequest]
  );
  const approvedMergeRequest = useMemo(
    () =>
      buildApprovedBrainMergeRequest({
        graph: brainGraph,
        diff: brainMergeReview.diff,
        events: brainMergeReview.queue.events,
        mergeValidation: brainMergeReview.validation,
        approved: mergeApproved,
        approvalNote: mergeApprovalNote,
        conflictAcknowledgements: contradictionAcknowledged
          ? ["high-contradiction-risk"]
          : [],
      }),
    [brainGraph, brainMergeReview.diff, brainMergeReview.queue.events, brainMergeReview.validation, contradictionAcknowledged, mergeApprovalNote, mergeApproved]
  );
  const approvedMergeValidation = useMemo(
    () => validateApprovedBrainMergeRequest(approvedMergeRequest),
    [approvedMergeRequest]
  );
  const approvedMergePolicy = useMemo(
    () =>
      buildApprovedBrainMergePolicy({
        request: approvedMergeRequest,
        validation: approvedMergeValidation,
        unknownEventCount: brainMergeReview.queue.unknownEventCount,
        highContradictionRisk: brainMergeReview.queue.events.some((event) => event.contradictionRisk >= 0.75),
      }),
    [approvedMergeRequest, approvedMergeValidation, brainMergeReview.queue.events, brainMergeReview.queue.unknownEventCount]
  );
  const rollbackPlan = useMemo(
    () =>
      mergeResult
        ? buildApprovedMergeRollbackPlan({
            request: approvedMergeRequest,
            result: mergeResult,
          })
        : null,
    [approvedMergeRequest, mergeResult]
  );
  const approvedMergeLedger = useMemo(
    () =>
      buildApprovedMergeLedger({
        request: approvedMergeRequest,
        policy: approvedMergePolicy,
        validation: approvedMergeValidation,
        result: mergeResult,
      }),
    [approvedMergePolicy, approvedMergeRequest, approvedMergeValidation, mergeResult]
  );
  const approvedMergeModel = useMemo(
    () => ({
      policy: approvedMergePolicy,
      request: approvedMergeRequest,
      validation: approvedMergeValidation,
      result: mergeResult,
      rollbackPlan,
      ledger: approvedMergeLedger,
    }),
    [approvedMergeLedger, approvedMergePolicy, approvedMergeRequest, approvedMergeValidation, mergeResult, rollbackPlan]
  );

  function handleAction(type: MemoryReviewActionType) {
    if (!selectedItem) return;

    const action = buildMemoryReviewAction({ type, item: selectedItem });
    setActions((current) => [...current, action]);
    if (type !== "preview-promotion-event") {
      setQueue((current) => reduceMemoryReviewQueue(current, action));
    }
    setCopied(false);
    setAppendState("idle");
    setAppendMessage("");
  }

  function handleCopyPreview() {
    if (!preview.event || typeof navigator === "undefined" || !navigator.clipboard?.writeText) return;
    navigator.clipboard.writeText(JSON.stringify(preview.event, null, 2)).then(() => setCopied(true)).catch(() => setCopied(false));
  }

  async function handleAppendMemoryEvent() {
    setAppendState("pending");
    setAppendMessage("Appending approved memory event through guarded API.");

    try {
      const response = await fetch("/api/codexforge/memory/events/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persistenceRequest),
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        setAppendState("blocked");
        setAppendMessage(readApiMessage(payload, "Memory event append was blocked by validation."));
        return;
      }

      setAppendState("persisted");
      setAppendMessage(readApiMessage(payload, "Approved memory event persisted under .codexforge/memory-events."));
    } catch {
      setAppendState("failed");
      setAppendMessage("Memory event append failed before persistence.");
    }
  }

  function handleApplyApprovedMerge() {
    if (!approvedMergePolicy.allowed || approvedMergeValidation.state === "blocked") {
      setMergeApplyState("blocked");
      setMergeApplyMessage("Approved Brain merge is blocked until explicit approval, graph diff preview, canonical graph schema, and validation requirements pass.");
      return;
    }

    try {
      const applied = applyApprovedBrainGraphMerge({
        graph: brainGraph,
        request: approvedMergeRequest,
      });

      if (applied.result.state !== "applied") {
        setMergeApplyState("blocked");
        setMergeResult(applied.result);
        setMergeApplyMessage("Pure executor blocked the merge; local Brain graph was not saved.");
        return;
      }

      const saved = saveBrainGraph(applied.graph);
      setBrainGraph(saved);
      setMergeResult(applied.result);
      setMergeApplyState("applied");
      setMergeApplyMessage("/brain refresh signal ready: local Brain graph updated through guarded approved merge.");
    } catch {
      setMergeApplyState("failed");
      setMergeApplyMessage("Approved Brain merge failed before local graph storage.");
    }
  }

  const approvedCount = queue.items.filter((item) => item.reviewState === "approved-for-promotion").length;
  const reviewCount = queue.items.filter((item) => item.reviewState === "needs-review").length;
  const blockedCount = queue.items.filter((item) => item.reviewState === "blocked").length;

  return (
    <main
      style={page}
      data-codexforge-memory-review-page="review required no auto-promotion no direct graph mutation memory.promoted promotion event preview policy requires explicit approval contradiction risk low confidence review"
    >
      <div style={shell}>
        <CodexForgeGlobalNav compact />
        <Link href="/tasks" style={taskActivationLink}>
          Activate reviewed task: accepted memory-review signals can become reviewed task activation plan previews; no memory mutation from task UI.
        </Link>
        <Link href="/ai" style={taskActivationLink}>
          Evidence-Grounded Chat: Use as chat evidence only after review; selected evidence only, no hidden context injection, no auto-promotion, and no graph mutation.
        </Link>
        <Link href="/ai" style={taskActivationLink}>
          Use in fix recommendation: Grounded Fix Recommendation treats evidence memory as context only, requires current file verification, and routes edits through Safe Patch Preview.
        </Link>
        <Link href="/ai" style={taskActivationLink}>
          Patch Preview Queue: reviewed evidence memory candidates can provide related handoff context only; no auto-promotion, no graph mutation, preview diff only, and no file writes without approval.
        </Link>
        <Link href="/ai" style={taskActivationLink}>
          Regression Triage: regression memory candidates are context only and review required; no auto-promotion,
          no graph mutation, no auto-fix, and Safe Patch Preview handoff only.
        </Link>
        <Link href="/ai" style={taskActivationLink}>
          Regression Fix Queue: memory candidate connection is safe context only; review required, no auto-promotion,
          no graph mutation, no auto-fix, no auto-rollback, Safe Patch Preview required, and Preview Diff Composer
          required.
        </Link>
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 16</span>
            <h1 style={headline}>Memory Promotion Review Queue</h1>
            <p style={lede}>
              Memory candidates now pass through deterministic confidence, contradiction risk, source traceability,
              and policy review before any promotion event preview exists. The queue is local UI state only:
              no auto-promotion, no direct graph mutation, and no runtime persistence.
            </p>
          </div>
          <div style={heroStats}>
            <HeroStat label="Queued" value={String(queue.items.length)} />
            <HeroStat label="Needs review" value={String(reviewCount)} />
            <HeroStat label="Approved" value={String(approvedCount)} />
            <HeroStat label="Blocked" value={String(blockedCount)} />
          </div>
        </section>

        <div style={layout}>
          <div style={mainColumn}>
            <MemoryReviewQueue queue={queue} selectedItemId={selectedItem?.id ?? selectedItemId} onSelectItem={setSelectedItemId} />
            {selectedItem ? <MemoryReviewScorePanel item={selectedItem} /> : null}
            <EvidenceMemoryPanel compact />
            <RegressionTriagePanel
              manualOperatorNote="Regression memory candidates remain review required context only; no auto-promotion and no Brain graph mutation."
              compact
            />
            <RegressionFixQueuePanel compact />
            <section
              style={chatEvidenceNotice}
              data-codexforge-memory-evidence-grounded-chat="Evidence-Grounded Chat Use as chat evidence selected evidence only no auto-promotion no graph mutation Use in fix recommendation Grounded Fix Recommendation regression memory candidates review required Regression Triage Regression Fix Queue"
            >
              <strong>Use as chat evidence</strong>
              <p>
                Reviewed evidence memory candidates can be copied into /ai as visible grounding context. This page does
                not silently inject chat context and does not promote memory without review. Use in fix recommendation
                is a Safe Patch Preview handoff only and does not mutate the Brain graph. Patch Preview Queue handoff
                can be related context for Safe Patch Preview while preserving latest-message authority. Regression Fix
                Queue memory candidate connection remains review required and does not auto-promote or mutate the graph.
              </p>
            </section>
          </div>
          <aside style={sideColumn}>
            <MemoryReviewSafetyNotice />
            <MemoryPromotionPolicyPanel policy={queue.policy} />
            {selectedItem ? <MemoryReviewActionsPanel item={selectedItem} onAction={handleAction} /> : null}
            <MemoryPromotionEventPreview preview={preview} copied={copied} onCopy={handleCopyPreview} />
            <MemoryPersistencePanel
              policy={persistencePolicy}
              request={persistenceRequest}
              validation={persistenceValidation}
              ledger={persistenceLedger}
              preview={reductionPreview}
              approvalNote={approvalNote}
              onApprovalNoteChange={setApprovalNote}
              contradictionAcknowledged={contradictionAcknowledged}
              onContradictionAcknowledgedChange={setContradictionAcknowledged}
              appendState={appendState}
              appendMessage={appendMessage}
              onAppend={handleAppendMemoryEvent}
            />
            <BrainMergeReviewPanel model={brainMergeReview} />
            <ApprovedBrainMergePanel
              model={approvedMergeModel}
              approvalNote={mergeApprovalNote}
              approved={mergeApproved}
              applyState={mergeApplyState}
              applyMessage={mergeApplyMessage}
              onApprovalNoteChange={setMergeApprovalNote}
              onApprovedChange={setMergeApproved}
              onApply={handleApplyApprovedMerge}
            />
            <BrainRecallPanel
              graph={brainGraph}
              initialQuery="kind:memory approval"
              compact
            />
            <MemoryReviewLedgerPanel ledger={ledger} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function readApiMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    if ("error" in payload && typeof payload.error === "string") return payload.error;
    if ("metadata" in payload && payload.metadata && typeof payload.metadata === "object") {
      const metadata = payload.metadata as { safetyNote?: unknown };
      if (typeof metadata.safetyNote === "string") return metadata.safetyNote;
    }
  }

  return fallback;
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
const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "radial-gradient(760px 460px at 14% 6%, rgba(20,184,166,0.18), transparent 58%)," +
    "radial-gradient(760px 460px at 90% 18%, rgba(14,165,233,0.16), transparent 58%)," +
    "linear-gradient(180deg, #02040a 0%, #050814 100%)",
  padding: "18px min(4vw, 44px) 30px",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const shell: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.78))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(min(100%, 430px), 0.8fr)", gap: 18, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.06, letterSpacing: 0, ...safeText };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, ...safeText };
const heroStats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, textTransform: "uppercase", fontWeight: 850, ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 28, lineHeight: 1 };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(min(100%, 470px), 0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const taskActivationLink: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "10px 12px", textDecoration: "none", fontSize: 12, fontWeight: 850, overflowWrap: "anywhere" };
const chatEvidenceNotice: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 14, display: "grid", gap: 8, fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };

const emptyPreviewGraph: CodexForgeBrainGraph = {
  version: CODEXFORGE_BRAIN_GRAPH_VERSION,
  nodes: [],
  edges: [],
  meta: {
    createdAt: 1,
    updatedAt: 1,
    workspaceId: "memory-persistence-preview",
  },
};
