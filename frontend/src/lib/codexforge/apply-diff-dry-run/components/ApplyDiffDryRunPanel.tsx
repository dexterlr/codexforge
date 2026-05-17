"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import {
  buildApplyDiffDryRunSession,
  type ApplyDiffDryRunInputSource,
} from "../index";
import { ApplyDiffDryRunSafetyNotice } from "./ApplyDiffDryRunSafetyNotice";
import { DryRunConflictCheckPanel } from "./DryRunConflictCheckPanel";
import { DryRunFileImpactPanel } from "./DryRunFileImpactPanel";
import { DryRunInputPanel } from "./DryRunInputPanel";
import { DryRunLedgerPanel } from "./DryRunLedgerPanel";
import { DryRunPolicyPanel } from "./DryRunPolicyPanel";
import { DryRunResultPanel } from "./DryRunResultPanel";
import { DryRunSimulatorPanel } from "./DryRunSimulatorPanel";

type Props = {
  source?: ApplyDiffDryRunInputSource;
  onCopyReport?: (report: string) => void;
  compact?: boolean;
};

const demoSource: ApplyDiffDryRunInputSource = {
  applyGateId: "apply-gate:preview-diff-composition-demo:patch-preview-queue-demo:src-app-ai-page.tsx",
  approvalPacketId: "apply-approval-packet:demo-human-approved",
  previewDiffCompositionId: "preview-diff-composition-demo",
  queueItemId: "patch-preview-queue-demo",
  goal: "Simulate apply-diff dry run from a human-approved apply packet without mutating files.",
  targetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/apply-diff-dry-run/index.ts"],
  primaryFile: "src/app/ai/page.tsx",
  patchSourceState: "real-patch-available-unreviewed",
  pseudoDiffSummary: ["Apply-Diff Dry Run UI integration and deterministic dry-run domain package."],
  realPatchAvailabilityState: "available-unreviewed",
  approvalPosture: "approved",
  policyPosture: "review-ready",
  rollbackPosture: "acknowledged",
  verificationPosture: "acknowledged",
  currentFileVerificationState: "verified-current",
  riskLevel: "medium",
  confidence: 0.78,
  approvedTargetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/apply-diff-dry-run/index.ts"],
  rollbackPlan: ["Use git restore before commit.", "Use git revert after commit."],
  verificationPlan: [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-apply-diff-dry-run.ps1",
  ],
  smokeChecks: [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-apply-diff-dry-run.ps1",
  ],
  approvalPacketExplicit: true,
  currentFileVerificationAcknowledged: true,
  rollbackPlanAcknowledged: true,
  verificationPlanAcknowledged: true,
  noMutationAcknowledged: true,
};

export function ApplyDiffDryRunPanel({ source, onCopyReport, compact = false }: Props) {
  const session = useMemo(() => buildApplyDiffDryRunSession(source ?? demoSource), [source]);

  return (
    <section
      style={panel}
      data-codexforge-apply-diff-dry-run-panel="ApplyDiffDryRunPanel renders Apply-Diff Dry Run Simulate apply-diff dry run simulation only no mutation actual apply-diff remains blocked pseudo diff alone is not applyable current file verification required rollback plan required preserve latest-message authority"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Apply-Diff Dry Run</span>
          <h2 style={title}>Simulate apply-diff dry run</h2>
          <p style={copy}>
            Human-approved apply packet becomes a deterministic dry-run input, policy simulation, affected file impact
            view, conflict check, result, and local ledger. It does not auto-send, auto-run, auto-write, mutate source,
            or call real apply-diff.
          </p>
        </div>
        <button type="button" style={button} onClick={() => onCopyReport?.(session.dryRunReport)}>
          Copy dry-run report
        </button>
      </div>
      <ApplyDiffDryRunSafetyNotice />
      <DryRunInputPanel input={session.input} validation={session.validation} />
      <DryRunPolicyPanel policy={session.policy} />
      <DryRunSimulatorPanel simulation={session.simulation} />
      {compact ? null : (
        <div style={grid}>
          <DryRunFileImpactPanel impact={session.fileImpact} />
          <DryRunConflictCheckPanel check={session.conflictCheck} />
          <DryRunResultPanel result={session.result} />
          <DryRunLedgerPanel ledger={session.ledger} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.24)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.72))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(96,165,250,0.32)", background: "rgba(59,130,246,0.14)", color: "#dbeafe", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
