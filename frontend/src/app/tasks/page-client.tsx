"use client";

import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ExecutionReadinessPanel } from "@/lib/codexforge/execution-readiness/components";
import { EvidenceMemoryPanel } from "@/lib/codexforge/evidence-memory/components";
import { ReadOnlyStepExecutionPanel } from "@/lib/codexforge/read-only-step-execution/components";
import { StepRunnerPreviewPanel } from "@/lib/codexforge/step-runner-preview/components";
import { TaskActivationPanel } from "@/lib/codexforge/task-activation/components";
import { TaskAutopilotPanel } from "@/lib/codexforge/task-autopilot/components";
import { GroundedFixRecommendationPanel } from "@/lib/codexforge/grounded-fix";
import { RegressionTriagePanel } from "@/lib/codexforge/regression-triage";
import { RegressionFixQueuePanel } from "@/lib/codexforge/regression-fix-queue/components";
import { PatchPreviewQueuePanel } from "@/lib/codexforge/patch-preview-queue/components";
import { PatchApplicationGatePanel } from "@/lib/codexforge/patch-application-gate/components";
import { PreviewDiffComposerPanel } from "@/lib/codexforge/preview-diff-composer/components";
import { ApplyDiffDryRunPanel } from "@/lib/codexforge/apply-diff-dry-run/components";
import { ApplyDiffExecutionGatePanel } from "@/lib/codexforge/apply-diff-execution-gate/components";
import { ApplyEvidencePackPanel } from "@/lib/codexforge/apply-evidence-pack/components";

export default function TasksPageClient() {
  return (
    <>
      <div style={{ background: "#020617", padding: "18px min(4vw, 44px) 0" }}>
        <CodexForgeGlobalNav compact />
        <Link href="/stabilization" style={stabilizationLink}>
          Stabilization Command Center: review task-related regression, fix queue, patch queue, apply gate, smoke, and
          next action posture; no execution, no mutation, and no auto-run.
        </Link>
      </div>
      <TaskAutopilotPanel />
      <TaskActivationPanel />
      <ExecutionReadinessPanel />
      <StepRunnerPreviewPanel />
      <ReadOnlyStepExecutionPanel />
      <div style={{ background: "#020617", padding: "0 min(4vw, 44px) 16px" }}>
        <GroundedFixRecommendationPanel
          manualGoal="Recommend grounded fix from reviewed task evidence; no execution and no mutation."
          compact
        />
        <div style={{ marginTop: 16 }}>
          <RegressionTriagePanel
            manualOperatorNote="Task Regression Triage status is review-only; no execution, no auto-fix, and no mutation."
            compact
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <RegressionFixQueuePanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <PatchPreviewQueuePanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <PreviewDiffComposerPanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <PatchApplicationGatePanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <ApplyEvidencePackPanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <ApplyDiffDryRunPanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <ApplyDiffExecutionGatePanel compact />
        </div>
      </div>
      <div style={{ background: "#020617", padding: "0 min(4vw, 44px) 36px" }}>
        <section
          data-codexforge-tasks-evidence-grounded-chat="Evidence-Grounded Chat Use evidence in chat selected evidence only no execution no mutation Recommend grounded fix Grounded Fix Recommendation Regression Fix Queue status Patch Preview Queue Queue for Safe Patch Preview"
          style={{
            border: "1px solid rgba(125,211,252,0.16)",
            background: "rgba(14,165,233,0.08)",
            borderRadius: 8,
            color: "#e0f2fe",
            padding: 14,
            marginBottom: 16,
            display: "grid",
            gap: 6,
            overflowWrap: "anywhere",
          }}
        >
          <strong>Use evidence in chat</strong>
          <span>
            Read-only execution evidence can be used in Evidence-Grounded Chat after review. This does not execute
            steps, mutate files, promote memory, or merge graph events. Recommend grounded fix prepares Safe Patch
            Preview handoff only. Patch Preview Queue can show queued preview item handoff when safe, with no
            execution and no mutation. Regression Fix Queue status can show reviewed regression repair queue state,
            readiness, route, and handoff without execution or mutation. Preview Diff Composer can compose preview diff
            packages from task or fix queue items without execution, file writes, or mutation. Patch Application Gate can prepare a human-approved
            apply gate from task/fix queue context; actual mutation remains blocked. Apply Evidence Pack can bundle
            current file verification, rollback plan, test plan, operator approval note, evidence refs, and mutation
            firewall for future guarded apply only; it does not apply changes. Apply-Diff Dry Run can show
            dry-run status for task/fix queue handoff when safe; simulation only, no execution, no mutation, and
            actual apply-diff remains blocked. Apply-Diff Execution Gate can show task/fix queue apply execution gate
            status, request readiness, and guarded execute route posture; no auto execution and no direct mutation.
            Regression Triage status can show failed verification review, suspected causes, and Safe Patch Preview
            handoff only; it never executes, auto-fixes, or auto-rolls back.
          </span>
        </section>
        <EvidenceMemoryPanel />
      </div>
    </>
  );
}

const stabilizationLink: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "block",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.4,
  marginTop: 12,
  padding: "9px 11px",
  textDecoration: "none",
  overflowWrap: "anywhere",
};
