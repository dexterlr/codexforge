import type { LiveTrialChecklist, LiveTrialChecklistItem } from "./coding-flow-live-trial-types";

export function buildLiveTrialChecklistItem(input: LiveTrialChecklistItem): LiveTrialChecklistItem {
  return { ...input };
}

function item(section: string, label: string, route: LiveTrialChecklistItem["route"], instruction: string, expectedOutcome: string, required = true): LiveTrialChecklistItem {
  return buildLiveTrialChecklistItem({ itemId: `trial-check-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, section, label, instruction, route, expectedOutcome, status: required ? "ready" : "optional", safetyNote: "Keep the trial manual, reviewed, and approval-gated.", required });
}

export function buildLiveTrialChecklist(): LiveTrialChecklist {
  const sections = ["Before you start", "Pick a safe file", "Describe the change", "Preview the patch", "Review apply", "Prepare validation", "Capture result", "Review run history", "Troubleshoot if needed"];
  return {
    checklistId: "coding-flow-live-trial-checklist",
    title: "Coding Flow Live Trial Checklist",
    sections,
    items: [
      item("Before you start", "Confirm safety boundaries", "/code-flow/trial", "Confirm no auto-apply, no auto-run, approval required, and preserve latest-message authority.", "Operator understands the guardrails."),
      item("Pick a safe file", "Pick a safe file", "/files", "Choose UI copy, empty-state copy, README/docs wording, non-critical helper copy, stable smoke text marker, or demo/sample data only.", "A low-risk target is selected."),
      item("Describe the change", "Describe the change", "/code-flow", "Use one sentence with the exact wording change.", "The request is specific enough for preview."),
      item("Preview the patch", "Preview the patch", "/code-flow", "Review the preview before any apply review.", "Diff intent is visible and small."),
      item("Review apply", "Review apply", "/apply-validation", "Check approval, rollback, and policy notes.", "Apply is guarded and not automatic."),
      item("Prepare validation", "Prepare validation", "/validation", "Copy validation commands; run them manually outside the UI.", "Validation plan is ready without auto-run."),
      item("Capture result", "Capture result", "/workflow-results", "Record selected file, request, preview, apply status, validation result, and next action.", "A reviewed result handoff exists."),
      item("Review run history", "Review run history", "/run-history", "Check run history handoff and next safe action.", "Continuity is ready for the next operator."),
      item("Troubleshoot if needed", "Route failure safely", "/closed-loop", "If validation fails, route to closed-loop with capped output.", "Failure becomes a reviewed next step.", false),
    ],
  };
}

export function summarizeLiveTrialChecklist(checklist = buildLiveTrialChecklist()): string {
  return `${checklist.items.length} checklist items across ${checklist.sections.length} sections.`;
}
