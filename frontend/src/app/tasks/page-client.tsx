"use client";

import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { ExecutionReadinessPanel } from "@/lib/codexforge/execution-readiness/components";
import { EvidenceMemoryPanel } from "@/lib/codexforge/evidence-memory/components";
import { ReadOnlyStepExecutionPanel } from "@/lib/codexforge/read-only-step-execution/components";
import { StepRunnerPreviewPanel } from "@/lib/codexforge/step-runner-preview/components";
import { TaskActivationPanel } from "@/lib/codexforge/task-activation/components";
import { TaskAutopilotPanel } from "@/lib/codexforge/task-autopilot/components";
import { GroundedFixRecommendationPanel } from "@/lib/codexforge/grounded-fix";
import { PatchPreviewQueuePanel } from "@/lib/codexforge/patch-preview-queue/components";
import { PatchApplicationGatePanel } from "@/lib/codexforge/patch-application-gate/components";
import { PreviewDiffComposerPanel } from "@/lib/codexforge/preview-diff-composer/components";

export default function TasksPageClient() {
  return (
    <>
      <div style={{ background: "#020617", padding: "18px min(4vw, 44px) 0" }}>
        <CodexForgeGlobalNav compact />
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
          <PatchPreviewQueuePanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <PreviewDiffComposerPanel compact />
        </div>
        <div style={{ marginTop: 16 }}>
          <PatchApplicationGatePanel compact />
        </div>
      </div>
      <div style={{ background: "#020617", padding: "0 min(4vw, 44px) 36px" }}>
        <section
          data-codexforge-tasks-evidence-grounded-chat="Evidence-Grounded Chat Use evidence in chat selected evidence only no execution no mutation Recommend grounded fix Grounded Fix Recommendation Patch Preview Queue Queue for Safe Patch Preview"
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
            execution and no mutation. Preview Diff Composer can compose preview diff packages from task or fix queue
            items without execution, file writes, or mutation. Patch Application Gate can prepare a human-approved
            apply gate from task/fix queue context; actual mutation remains blocked.
          </span>
        </section>
        <EvidenceMemoryPanel />
      </div>
    </>
  );
}
