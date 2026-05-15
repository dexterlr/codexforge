"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import type { PatchPreviewQueueItem } from "../../patch-preview-queue";
import {
  buildPreviewDiffComposerSession,
  type DiffCompositionInputSource,
} from "../index";
import { DiffApprovalBoundaryPanel } from "./DiffApprovalBoundaryPanel";
import { DiffChangePlanPanel } from "./DiffChangePlanPanel";
import { DiffCompositionInputPanel } from "./DiffCompositionInputPanel";
import { DiffIntentPanel } from "./DiffIntentPanel";
import { DiffRollbackPlanPanel } from "./DiffRollbackPlanPanel";
import { DiffVerificationPlanPanel } from "./DiffVerificationPlanPanel";
import { PreviewDiffComposerSafetyNotice } from "./PreviewDiffComposerSafetyNotice";
import { PseudoDiffPreviewPanel } from "./PseudoDiffPreviewPanel";

type Props = {
  queueItem?: PatchPreviewQueueItem | null;
  source?: DiffCompositionInputSource;
  onCopyPrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoSource: DiffCompositionInputSource = {
  queueItemId: "patch-preview-queue-demo",
  sourceGroundedFixId: "grounded-fix-demo-ai-panel",
  goal: "Compose a human-reviewable preview diff package from a queued Safe Patch Preview item.",
  targetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/preview-diff-composer/index.ts"],
  primaryFile: "src/app/ai/page.tsx",
  suspectedRootCause: "Queued recommendations need a reviewable pseudo-diff package before any real patch work.",
  recommendedApproach: "Build a deterministic preview-only composition package with pseudo hunks, plans, and approval boundary.",
  evidenceIds: ["phase-31-preview-diff-composer"],
  riskLevel: "medium",
  confidence: 0.76,
  suggestedTests: [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-preview-diff-composer.ps1",
  ],
  rollbackNotes: ["Use git restore before commit.", "Use git revert after commit."],
  approvalPosture: "review-required",
};

function sourceFromQueueItem(item: PatchPreviewQueueItem): DiffCompositionInputSource {
  return {
    queueItemId: item.id,
    sourceGroundedFixId: item.sourceGroundedFixId,
    goal: item.goal,
    targetFiles: item.targetFiles,
    primaryFile: item.primaryFile,
    suspectedRootCause: item.suspectedRootCause,
    recommendedApproach: item.recommendedApproach,
    evidenceIds: item.evidenceIds,
    riskLevel: item.riskLevel,
    confidence: item.confidence,
    suggestedTests: item.suggestedTests,
    rollbackNotes: item.rollbackNotes,
    approvalPosture: item.queueState === "blocked" ? "blocked" : "review-required",
  };
}

export function PreviewDiffComposerPanel({ queueItem, source, onCopyPrompt, compact = false }: Props) {
  const session = useMemo(() => buildPreviewDiffComposerSession(source ?? (queueItem ? sourceFromQueueItem(queueItem) : demoSource)), [queueItem, source]);

  return (
    <section
      style={panel}
      data-codexforge-preview-diff-composer-panel="PreviewDiffComposerPanel renders Compose preview diff preview-only not an applyable patch current file content is authority evidence is context, not proof no file writes without approval Safe Patch Preview preserve latest-message authority"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Preview Diff Composer</span>
          <h2 style={title}>Compose preview diff</h2>
          <p style={copy}>
            Queued patch preview item becomes a human-reviewable pseudo-diff, change plan, verification plan, rollback
            plan, and copyable implementation prompt. It does not auto-send, auto-run, auto-write, apply patches, or
            mutate memory.
          </p>
        </div>
        <button type="button" style={button} onClick={() => onCopyPrompt?.(session.implementationPrompt)}>
          Copy composer prompt
        </button>
      </div>
      <PreviewDiffComposerSafetyNotice />
      <DiffCompositionInputPanel input={session.input} validation={session.validation} />
      <DiffIntentPanel intent={session.intent} />
      <PseudoDiffPreviewPanel preview={session.pseudoDiff} />
      {compact ? null : (
        <div style={grid}>
          <DiffChangePlanPanel plan={session.changePlan} />
          <DiffVerificationPlanPanel plan={session.verificationPlan} />
          <DiffRollbackPlanPanel plan={session.rollbackPlan} />
          <DiffApprovalBoundaryPanel boundary={session.approvalBoundary} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.24)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.72))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fcd34d", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(251,191,36,0.32)", background: "rgba(251,191,36,0.14)", color: "#fef3c7", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
