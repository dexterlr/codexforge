import type { CodingFlowEmptyStateFix } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

const EMPTY_STATES: readonly Omit<CodingFlowEmptyStateFix, "emptyStateId">[] = [
  { state: "no file selected", route: "/code-flow", missing: "Pick a file to start.", whyItMatters: "A patch preview needs a target file.", nextAction: "Pick a file.", whereToGo: "/files", safetyNote: "Read-only inspection first." },
  { state: "no change described", route: "/code-flow", missing: "Describe the change you want.", whyItMatters: "The preview needs a plain request.", nextAction: "Write one short change request.", whereToGo: "/code-flow", safetyNote: "No file writes happen from this empty state." },
  { state: "no preview yet", route: "/code-flow", missing: "Preview before applying anything.", whyItMatters: "Approval depends on a reviewed patch preview.", nextAction: "Preview patch.", whereToGo: "/files", safetyNote: "No auto-apply." },
  { state: "no apply review yet", route: "/apply-validation", missing: "Review apply before checks.", whyItMatters: "Approval, rollback, and blocked reasons must be clear.", nextAction: "Review apply.", whereToGo: "/apply-validation", safetyNote: "Approval required." },
  { state: "no validation output", route: "/validation", missing: "Paste validation output to review the result.", whyItMatters: "The UI should route the result, not guess it.", nextAction: "Run checks manually, then paste output.", whereToGo: "/validation", safetyNote: "No auto-run." },
  { state: "no workflow result", route: "/workflow-results", missing: "Capture result after validation.", whyItMatters: "The handoff needs status, output, and next action.", nextAction: "Copy workflow handoff.", whereToGo: "/workflow-results", safetyNote: "No Brain auto-persistence." },
  { state: "no run history", route: "/run-history", missing: "No run history yet.", whyItMatters: "History starts after a reviewed result exists.", nextAction: "Capture a workflow result.", whereToGo: "/workflow-results", safetyNote: "No automatic event writes." },
  { state: "no trial notes", route: "/code-flow/trial-review", missing: "Run a trial, then record what felt confusing.", whyItMatters: "UX fixes need trial evidence.", nextAction: "Start trial in Code Flow.", whereToGo: "/code-flow/trial", safetyNote: "Trial is manual and copy-only." },
  { state: "no UX friction logged", route: "/code-flow/ux-fixes", missing: "No UX friction logged.", whyItMatters: "The fix pack needs a friction list.", nextAction: "Review default friction and copy the checklist.", whereToGo: "/code-flow/ux-fixes", safetyNote: "Checklist copy only." },
];

export function buildCodingFlowEmptyStateFix(input: Omit<CodingFlowEmptyStateFix, "emptyStateId">): CodingFlowEmptyStateFix {
  return { emptyStateId: buildCodingFlowUxFixStableKey("empty", `${input.route}-${input.state}`), ...input };
}

export function buildDefaultCodingFlowEmptyStateFixes(): CodingFlowEmptyStateFix[] {
  return EMPTY_STATES.map(buildCodingFlowEmptyStateFix);
}

export function summarizeCodingFlowEmptyStateFix(fixes: readonly CodingFlowEmptyStateFix[]): string {
  return `${fixes.length} empty states explain what is missing, why it matters, and one next action.`;
}
