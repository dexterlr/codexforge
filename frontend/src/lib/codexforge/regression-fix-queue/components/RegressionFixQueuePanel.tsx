"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  buildRegressionFixQueueHandoff,
  buildRegressionFixQueueItem,
  buildRegressionFixQueueItems,
  buildRegressionFixQueueLedger,
  buildRegressionFixQueuePolicy,
  buildRegressionFixQueueReadiness,
  buildRegressionFixQueueRoute,
  buildRegressionFixQueueSummary,
  type RegressionFixQueueItem,
  type RegressionFixQueueItemBuilderInput,
} from "../index";
import type { RegressionFixCandidate, RegressionSignal } from "../../regression-triage";
import { RegressionFixQueueBoard } from "./RegressionFixQueueBoard";
import { RegressionFixQueueHandoffPanel } from "./RegressionFixQueueHandoffPanel";
import { RegressionFixQueueLedgerPanel } from "./RegressionFixQueueLedgerPanel";
import { RegressionFixQueuePolicyPanel } from "./RegressionFixQueuePolicyPanel";
import { RegressionFixQueueReadinessPanel } from "./RegressionFixQueueReadinessPanel";
import { RegressionFixQueueRouterPanel } from "./RegressionFixQueueRouterPanel";
import { RegressionFixQueueSafetyNotice } from "./RegressionFixQueueSafetyNotice";

type Props = {
  items?: readonly RegressionFixQueueItem[];
  inputs?: RegressionFixQueueItemBuilderInput | readonly RegressionFixQueueItemBuilderInput[];
  onCopyPrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoSignals: RegressionSignal[] = [
  {
    id: "regression-fix-queue-demo-signal",
    type: "smoke-failure",
    severity: "blocker",
    title: "Smoke missing queue marker",
    snippet: "Smoke missing marker: RegressionFixQueuePanel renders.",
    sourceCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-regression-fix-queue.ps1",
    sourceLine: null,
    relatedFiles: ["src/lib/codexforge/regression-fix-queue/components/RegressionFixQueuePanel.tsx"],
    relatedSmokeScript: "scripts/smoke-codexforge-regression-fix-queue.ps1",
    relatedRoute: "/ai",
    confidence: 0.82,
    regressionLikelihood: 0.88,
    stale: false,
    reviewState: "reviewed",
    sourceKind: "smoke-output",
  },
];

const demoCandidate: RegressionFixCandidate = {
  candidateId: "regression-fix-queue-demo-candidate",
  kind: "smoke-marker-fix",
  title: "Review missing Regression Fix Queue smoke marker",
  recommendedAction: "Inspect the failed smoke output, verify current component text, then compose a preview diff only.",
  targetFiles: ["src/lib/codexforge/regression-fix-queue/components/RegressionFixQueuePanel.tsx"],
  evidenceIds: ["regression-fix-queue-demo-signal"],
  causeIds: ["regression-fix-queue-demo-cause"],
  confidence: 0.82,
  risk: "medium",
  safePatchPreviewRequired: true,
  suggestedTests: [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-regression-fix-queue.ps1",
  ],
  rollbackReminder: "Review rollback advice first; Safe Patch Preview required before any edit.",
  reviewState: "reviewed",
};

const demoInput: RegressionFixQueueItemBuilderInput = {
  regressionId: "regression-fix-queue-demo-regression",
  signals: demoSignals,
  suspectedCauses: [
    {
      causeId: "regression-fix-queue-demo-cause",
      title: "Smoke marker not yet integrated",
      reason: "A new reviewed fix queue must expose stable UI markers and handoffs before preview.",
      confidence: 0.78,
      relatedFiles: ["src/lib/codexforge/regression-fix-queue/components/RegressionFixQueuePanel.tsx"],
      signals: ["regression-fix-queue-demo-signal"],
      suggestedInspection: "Inspect component output before composing a preview diff.",
      safeNextAction: "Review queue item and copy handoff prompt only.",
    },
  ],
  rollbackAdvice: {
    id: "regression-rollback-advice",
    urgency: "medium",
    options: [
      {
        optionId: "regression-fix-queue-demo-rollback",
        kind: "inspect-first",
        title: "Inspect current file before future edits",
        commandPreview: null,
        reason: "Current files are authority.",
        risk: "low",
        whenToUse: "Before any Safe Patch Preview handoff.",
        warnings: ["No auto-rollback."],
        reviewRequired: true,
      },
    ],
    warnings: ["No auto-rollback."],
    summary: ["Rollback advice attached for review-only queue handoff."],
  },
  fixCandidate: demoCandidate,
  manualOperatorNote: "Reviewed regression fix queue item for Safe Patch Preview and Preview Diff Composer handoff only.",
  reviewedTriage: true,
  operatorReviewed: true,
  userSelected: true,
  queueState: "queued",
};

export function RegressionFixQueuePanel({ items, inputs = demoInput, onCopyPrompt, compact = false }: Props) {
  const queueItems = useMemo(() => items?.length ? [...items] : buildRegressionFixQueueItems(inputs), [inputs, items]);
  const [selectedItemId, setSelectedItemId] = useState(queueItems[0]?.id ?? "");
  const selectedItem =
    queueItems.find((item) => item.id === selectedItemId) ??
    queueItems[0] ??
    buildRegressionFixQueueItem(demoInput);
  const policy = buildRegressionFixQueuePolicy(selectedItem);
  const readiness = buildRegressionFixQueueReadiness([selectedItem]).items[0];
  const route = buildRegressionFixQueueRoute(selectedItem);
  const handoff = buildRegressionFixQueueHandoff(selectedItem);
  const ledger = buildRegressionFixQueueLedger([selectedItem]);
  const summary = buildRegressionFixQueueSummary({ items: queueItems });

  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-panel="RegressionFixQueuePanel renders Regression Fix Queue no auto-fix no auto-rollback Safe Patch Preview Preview Diff Composer evidence is context, not proof preserve latest-message authority"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Regression Fix Queue</span>
          <h2 style={title}>Reviewed regression candidates to safe handoff</h2>
          <p style={copy}>
            Regression triage cards become reviewed queue items with priority, policy, readiness, route, handoff, and
            ledger context. The queue only prepares safe handoffs; it does not auto-run, auto-fix, auto-rollback, write
            files, apply diffs, or mutate memory.
          </p>
        </div>
        <span style={badge}>{summary.readyCount} ready</span>
      </div>
      <RegressionFixQueueSafetyNotice />
      <div style={summaryGrid}>
        {summary.summary.map((item) => (
          <div key={item} style={summaryCard}>{item}</div>
        ))}
      </div>
      <div style={layout}>
        <RegressionFixQueueBoard items={queueItems} selectedItemId={selectedItem.id} onSelectItem={setSelectedItemId} />
        <div style={side}>
          <RegressionFixQueuePolicyPanel policy={policy} />
          {readiness ? <RegressionFixQueueReadinessPanel readiness={readiness} /> : null}
          <RegressionFixQueueRouterPanel route={route} />
        </div>
      </div>
      {compact ? null : <RegressionFixQueueLedgerPanel ledger={ledger} />}
      <RegressionFixQueueHandoffPanel handoff={handoff} onCopyPrompt={onCopyPrompt} />
    </section>
  );
}

const panel: CSSProperties = { background: "linear-gradient(145deg, rgba(15,23,42,0.86), rgba(2,6,23,0.72))", border: "1px solid rgba(94,234,212,0.22)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "flex-start", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere", textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: "4px 0", overflowWrap: "anywhere" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(94,234,212,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px", textTransform: "uppercase" };
const summaryGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", minWidth: 0 };
const summaryCard: CSSProperties = { background: "rgba(2,6,23,0.34)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere", padding: 9 };
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 10, gridTemplateColumns: "minmax(0, 1fr) minmax(min(100%, 390px), 0.9fr)", minWidth: 0 };
const side: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
