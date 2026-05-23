import { buildTrialReviewStableKey, type TrialChecklistStatus, type TrialPassFailChecklist, type TrialPassFailChecklistItem, type TrialReviewRoute } from "./coding-flow-trial-review-types";

export function buildTrialPassFailChecklistItem(label: string, route: TrialReviewRoute, status: TrialChecklistStatus = "not-tested"): TrialPassFailChecklistItem {
  return {
    itemId: buildTrialReviewStableKey("check", `${route}-${label}`),
    label,
    status,
    route,
    evidencePrompt: "Capture observed evidence from the manual trial run.",
    reviewRequired: true,
  };
}

export function buildTrialPassFailChecklist(items: TrialPassFailChecklistItem[] = DEFAULT_CHECKLIST): TrialPassFailChecklist {
  return { checklistId: "trial-pass-fail-checklist", title: "Pass/fail checklist", items: items.map((item) => ({ ...item })) };
}

export function summarizeTrialPassFailChecklist(checklist = buildTrialPassFailChecklist()): string {
  const passCount = checklist.items.filter((item) => item.status === "pass").length;
  const failCount = checklist.items.filter((item) => item.status === "fail" || item.status === "blocked").length;
  return `${passCount} passed, ${failCount} failed or blocked, ${checklist.items.length} total checks.`;
}

const DEFAULT_CHECKLIST = [
  buildTrialPassFailChecklistItem("/start offered a clear Fix code path", "/start"),
  buildTrialPassFailChecklistItem("/code-flow explained the steps clearly", "/code-flow"),
  buildTrialPassFailChecklistItem("file selection was understandable", "/files"),
  buildTrialPassFailChecklistItem("change request was easy to write", "/code-flow"),
  buildTrialPassFailChecklistItem("preview step was clear", "/code-flow"),
  buildTrialPassFailChecklistItem("apply review was approval-gated", "/apply-validation"),
  buildTrialPassFailChecklistItem("validation plan was easy to copy/run manually", "/validation"),
  buildTrialPassFailChecklistItem("result capture was understandable", "/workflow-results"),
  buildTrialPassFailChecklistItem("run history handoff was discoverable", "/run-history"),
  buildTrialPassFailChecklistItem("failure routing was clear", "/closed-loop"),
  buildTrialPassFailChecklistItem("no auto-apply occurred", "/apply-validation"),
  buildTrialPassFailChecklistItem("no auto-run occurred", "/validation"),
  buildTrialPassFailChecklistItem("next action was obvious", "/code-flow/trial-review"),
];
