import type { LiveTrialTroubleshooting, LiveTrialTroubleshootingItem } from "./coding-flow-live-trial-types";

export function buildLiveTrialTroubleshootingItem(input: LiveTrialTroubleshootingItem): LiveTrialTroubleshootingItem {
  return { ...input };
}

function issue(issueId: string, symptom: string, likelyCause: string, safeNextStep: string, route: LiveTrialTroubleshootingItem["route"], whatNotToDo: string, escalationRoute: LiveTrialTroubleshootingItem["escalationRoute"]): LiveTrialTroubleshootingItem {
  return buildLiveTrialTroubleshootingItem({ issueId, symptom, likelyCause, safeNextStep, route, whatNotToDo, escalationRoute });
}

export function buildLiveTrialTroubleshooting(): LiveTrialTroubleshooting {
  return {
    guideId: "coding-flow-live-trial-troubleshooting",
    title: "Pass/Fail Troubleshooting",
    items: [
      issue("cannot-find-safe-file", "Cannot find safe file", "Target area is unfamiliar.", "Use README/docs wording, empty state copy, or demo/sample data only.", "/files", "Do not choose package.json, lockfiles, tool policy, secrets, or environment config.", "/code-flow/trial"),
      issue("preview-not-ready", "Preview not ready", "Selected file or change request is incomplete.", "Return to /files or /code-flow and clarify the request.", "/code-flow", "Do not apply without a reviewed preview.", "/files"),
      issue("apply-blocked", "Apply blocked", "Approval, rollback, or policy is missing.", "Review the blocked reason in Apply Validation.", "/apply-validation", "Do not bypass the guarded apply boundary.", "/apply-validation"),
      issue("validation-command-fails", "validation command fails", "Build, smoke, or lint output found a regression.", "Route failed validation to /closed-loop with capped output.", "/closed-loop", "Do not stack unrelated fixes.", "/closed-loop"),
      issue("smoke-fails", "smoke fails", "Smoke marker or route behavior does not match.", "Capture the failing assertion and use Closed Loop.", "/closed-loop", "Do not delete smoke markers to pass.", "/closed-loop"),
      issue("git-diff-check-fails", "git diff check fails", "Whitespace or conflict marker issue.", "Fix only the reported formatting issue after review.", "/apply-validation", "Do not rewrite unrelated files.", "/closed-loop"),
      issue("output-too-large", "output too large", "Validation produced too much raw output.", "Use /workflow-results with capped summary.", "/workflow-results", "Do not paste huge logs or secrets.", "/workflow-results"),
      issue("unknown-failure", "unknown failure", "The signal is unclear.", "Capture symptom, route, and last safe action.", "/closed-loop", "Do not auto-fix.", "/closed-loop"),
      issue("ui-confusing", "UI confusing", "The trial found a UX gap.", "Record recommended product fix in the handoff.", "/workflow-results", "Do not change route support during the trial.", "/run-history"),
      issue("run-history-missing", "run history missing", "Result handoff was not prepared or not persisted manually.", "Use copyable run history handoff; no auto-persistence.", "/run-history", "Do not mutate Brain graph or auto-promote memory.", "/workflow-results"),
    ],
  };
}

export function summarizeLiveTrialTroubleshooting(guide = buildLiveTrialTroubleshooting()): string {
  return `${guide.items.length} troubleshooting cases; failed validation routes to /closed-loop.`;
}
