"use client";

import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { ExecutionReadinessPanel } from "@/lib/codexforge/execution-readiness/components";
import { ReadOnlyStepExecutionPanel } from "@/lib/codexforge/read-only-step-execution/components";
import { StepRunnerPreviewPanel } from "@/lib/codexforge/step-runner-preview/components";
import { TaskActivationPanel } from "@/lib/codexforge/task-activation/components";
import { TaskAutopilotPanel } from "@/lib/codexforge/task-autopilot/components";

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
    </>
  );
}
