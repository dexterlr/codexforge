import type { ManualTrialStep, ManualTrialStepRunner } from "./live-manual-trial-types";

const stepData: Array<Omit<ManualTrialStep, "id">> = [
  { order: 1, title: "Open Start or Code Flow Live Run", route: "/start", primaryAction: "Open guided path", operatorNote: "Begin from the normal operator entry point." },
  { order: 2, title: "Pick safe file", route: "/files", primaryAction: "Inspect safe file", operatorNote: "Use safe file category only." },
  { order: 3, title: "Describe harmless wording change", route: "/code-flow/live-run", primaryAction: "Write change summary", operatorNote: "Keep behavior unchanged." },
  { order: 4, title: "Preview patch", route: "/files", primaryAction: "Review preview", operatorNote: "Preview only, no write." },
  { order: 5, title: "Review guarded apply request", route: "/guarded-apply-mvp", primaryAction: "Review apply request", operatorNote: "Approval required before apply boundary." },
  { order: 6, title: "Capture apply evidence", route: "/apply-evidence", primaryAction: "Copy evidence pack", operatorNote: "Do not claim apply happened without evidence." },
  { order: 7, title: "Run validation manually", route: "/validation-results", primaryAction: "Copy validation commands", operatorNote: "Run outside the UI." },
  { order: 8, title: "Paste/capture validation result", route: "/validation-results", primaryAction: "Paste output", operatorNote: "No fabricated success." },
  { order: 9, title: "Review workflow result", route: "/workflow-results", primaryAction: "Review result", operatorNote: "Record pass, fail, or blocked." },
  { order: 10, title: "Review run history", route: "/run-history", primaryAction: "Review latest run", operatorNote: "Confirm the handoff is understandable." },
  { order: 11, title: "Decide pass/fail", route: "/code-flow/release-audit", primaryAction: "Decide pass or fail", operatorNote: "Use latest-message authority for final decision." },
];

export function buildManualTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.filter((part) => part !== null && part !== undefined && String(part).trim()).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96) || "manual-trial";
}

export function buildManualTrialStep(input: Partial<ManualTrialStep> & Pick<ManualTrialStep, "order" | "title">): ManualTrialStep {
  return { id: input.id ?? buildManualTrialStableKey(input.order, input.title), order: input.order, title: input.title, route: input.route ?? "/code-flow/manual-trial", primaryAction: input.primaryAction ?? "Review step", operatorNote: input.operatorNote ?? "Keep this step manual and reviewable." };
}

export function buildManualTrialStepRunner(): ManualTrialStepRunner {
  return { title: "Manual coding trial checklist", steps: stepData.map(buildManualTrialStep), noAutoApply: true, noAutoRun: true, approvalRequired: true };
}
