import type { VideoFailureRecoverySummary } from "./video-failure-recovery-types";
import { buildDefaultVideoFailureCases } from "./video-failure-case";
import { buildVideoFailureDiagnosis } from "./video-failure-diagnosis";
import { buildVideoFailureHandoff } from "./video-failure-handoff";
import { buildVideoFailureRetryPlan } from "./video-failure-retry-plan";
import { buildVideoFailureSafeNextStep } from "./video-failure-safe-next-step";
import { buildVideoFailureWorkflowFix } from "./video-failure-workflow-fix";

export function buildVideoFailureRecoverySummary(): VideoFailureRecoverySummary {
  const cases = buildDefaultVideoFailureCases();
  const diagnoses = cases.map((failureCase, index) =>
    buildVideoFailureDiagnosis({
      id: `video-failure-diagnosis-${index + 1}`,
      caseId: failureCase.id,
      likelyCause: failureCase.plainEnglish,
      confidence: index < 2 ? "high" : "medium",
    })
  );
  const nextSteps = [
    buildVideoFailureSafeNextStep({ id: "video-failure-next-step-assets", label: "Check missing assets" }),
    buildVideoFailureSafeNextStep({ id: "video-failure-next-step-settings", label: "Lower risky settings", plainEnglish: "Use smaller resolution, shorter duration, fewer frames, or batch count one." }),
    buildVideoFailureSafeNextStep({ id: "video-failure-next-step-prompt", label: "Fix prompt", plainEnglish: "Clarify the prompt when output quality or motion is confusing." }),
  ];
  const retryPlan = buildVideoFailureRetryPlan();
  const workflowFix = buildVideoFailureWorkflowFix();
  const handoff = buildVideoFailureHandoff();

  return {
    cases,
    diagnoses,
    nextSteps,
    retryPlan,
    workflowFix,
    handoff,
    summary: summarizeVideoFailureRecovery({ cases, diagnoses, nextSteps, retryPlan, workflowFix, handoff, summary: "" }),
  };
}

export function summarizeVideoFailureRecovery(summary: VideoFailureRecoverySummary): string {
  return `${summary.cases.length} failure cases mapped to safe next steps, with automatic retry blocked.`;
}
