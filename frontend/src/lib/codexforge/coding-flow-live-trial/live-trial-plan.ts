import type { LiveTrialPlan, LiveTrialPlanStep } from "./coding-flow-live-trial-types";

export function buildLiveTrialPlan(input: LiveTrialPlan): LiveTrialPlan {
  return { ...input, purpose: [...input.purpose], recommendedWorkflow: [...input.recommendedWorkflow], prerequisites: [...input.prerequisites], trialSteps: input.trialSteps.map((step) => ({ ...step })), successCriteria: [...input.successCriteria], blockedCriteria: [...input.blockedCriteria], safetyPosture: [...input.safetyPosture] };
}

function step(id: string, label: string, route: LiveTrialPlanStep["route"], instruction: string, expectedOutcome: string): LiveTrialPlanStep {
  return { id, label, route, instruction, expectedOutcome };
}

export function buildDefaultLiveTrialPlan(): LiveTrialPlan {
  return buildLiveTrialPlan({
    trialId: "coding-flow-live-trial-phase-79",
    title: "Coding Flow Live Trial Pack",
    purpose: [
      "Verify code flow can guide a user from start to result.",
      "Verify no auto-apply and no auto-run behavior stays visible.",
      "Verify result capture and run history handoff work without hidden persistence.",
    ],
    audience: "Operator running a guided coding-flow trial for the first time.",
    startingRoute: "/code-flow/trial",
    recommendedWorkflow: ["Pick safe file", "Describe change", "Preview patch", "Review apply", "Prepare validation", "Capture result", "Review run history"],
    expectedDurationLabel: "15 to 25 minutes",
    prerequisites: ["Clean or understood working tree", "A low-risk file category selected", "Manual validation terminal available", "Approval boundary understood"],
    trialSteps: [
      step("start-trial", "Start trial", "/code-flow/trial", "Read the plan and choose one safe example change.", "Operator knows the next click and what evidence to collect."),
      step("open-code-flow", "Open Code Flow", "/code-flow", "Start the real coding flow without applying anything.", "The flow shows file, preview, apply, validation, and result steps."),
      step("pick-safe-file", "Pick a safe file", "/files", "Choose UI copy, docs wording, empty state copy, or demo data.", "Selected file risk is low and first trial remains reversible."),
      step("preview-patch", "Preview the patch", "/code-flow", "Request a small wording-only preview.", "Patch preview is visible before approval."),
      step("review-apply", "Review apply", "/apply-validation", "Confirm approval, rollback, and validation plan.", "Apply remains gated and reviewed."),
      step("prepare-validation", "Prepare validation", "/validation", "Copy commands and run them manually outside the UI.", "Validation output is operator-supplied."),
      step("capture-result", "Capture result", "/workflow-results", "Copy the result summary and handoff.", "Reviewed result is ready without Brain mutation."),
      step("review-history", "Review run history", "/run-history", "Use run history handoff for continuity.", "Next safe action is clear."),
    ],
    successCriteria: ["Selected safe file", "Patch preview reviewed", "No auto-apply happened", "No auto-run happened", "Validation output captured", "Workflow result handoff copied", "Run history handoff reviewed"],
    blockedCriteria: ["No safe file can be found", "Preview cannot be reviewed", "Apply boundary is unclear", "Validation fails and needs closed-loop triage", "Run history handoff is missing"],
    safetyPosture: ["no auto-apply", "no auto-run", "approval required", "preserve latest-message authority", "copyable/reviewed only"],
    nextAction: "Start trial in Code Flow",
  });
}

export function summarizeLiveTrialPlan(plan = buildDefaultLiveTrialPlan()): string {
  return `${plan.title}: ${plan.trialSteps.length} steps, starts at ${plan.startingRoute}, next action ${plan.nextAction}.`;
}
