import type { LiveTrialScreenGuide, LiveTrialScreenGuideStep } from "./coding-flow-live-trial-types";

export function buildLiveTrialScreenGuideStep(input: LiveTrialScreenGuideStep): LiveTrialScreenGuideStep {
  return { ...input };
}

function step(route: LiveTrialScreenGuideStep["route"], whatUserSees: string, whatUserShouldDo: string, expectedResult: string, primaryActionLabel: string, fallbackAction: string): LiveTrialScreenGuideStep {
  return buildLiveTrialScreenGuideStep({ stepId: `screen-${route.replace(/[^a-z0-9]+/g, "-") || "home"}`, route, whatUserSees, whatUserShouldDo, expectedResult, primaryActionLabel, fallbackAction, safetyNote: "Navigate and copy only; do not apply or run automatically." });
}

export function buildLiveTrialScreenGuide(): LiveTrialScreenGuide {
  return {
    guideId: "coding-flow-live-trial-screen-guide",
    title: "Expected Screens",
    steps: [
      step("/start", "Workflow Wizard and friendly choices.", "Choose Try coding flow if unsure, or Fix code for normal work.", "Operator reaches the trial or real flow without guessing.", "Try coding flow", "Open /code-flow directly"),
      step("/code-flow", "File, change, preview, apply, validation, and result panels.", "Use the guided trial link or continue the real flow.", "Patch remains preview-first.", "Start trial", "Open /files"),
      step("/files", "Local Project Reader and selected-file context.", "Pick a safe low-risk file category.", "Selected file can be carried back to Code Flow.", "Pick safe file", "Return to trial guide"),
      step("/apply-validation", "Approval, rollback, policy, and validation checklist.", "Review apply readiness only after preview.", "No auto-apply and approval remains required.", "Review apply", "Return to Code Flow"),
      step("/validation", "Validation Runner planning and command guidance.", "Copy commands and run manually outside UI.", "No auto-run happens from the trial.", "Copy validation commands", "Use /apply-validation checklist"),
      step("/workflow-results", "Result capture and handoff guidance.", "Capture validation result and next action.", "Reviewed result handoff is ready.", "Capture result", "Use capped summary"),
      step("/run-history", "Timeline and run handoff surface.", "Prepare run history handoff manually.", "Next operator can continue with context.", "Review run history", "Copy workflow handoff"),
      step("/closed-loop", "Failure review and next fix guidance.", "Use only if validation fails.", "Failure routes to reviewed next step.", "Troubleshoot failure", "Return to validation"),
    ],
  };
}

export function summarizeLiveTrialScreenGuide(guide = buildLiveTrialScreenGuide()): string {
  return `${guide.steps.length} screen guide steps from ${guide.steps[0]?.route ?? "/start"} to /run-history.`;
}
