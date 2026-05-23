import type { CodingFlowUxFixSummary } from "./coding-flow-ux-fix-types";
import { buildDefaultCodingFlowCopyFixes } from "./coding-flow-copy-fix";
import { buildDefaultCodingFlowEmptyStateFixes } from "./coding-flow-empty-state-fix";
import { buildDefaultCodingFlowFrictions } from "./coding-flow-friction-model";
import { buildCodingFlowPanelPriority } from "./coding-flow-panel-priority";
import { buildCodingFlowPrimaryActionFix } from "./coding-flow-primary-action-fix";
import { buildCodingFlowRouteHandoffFix } from "./coding-flow-route-handoff-fix";
import { buildCodingFlowValidationCopyFix } from "./coding-flow-validation-copy-fix";
import type { CodingFlowUxRoute } from "./coding-flow-ux-fix-types";

const SUMMARY_ROUTES: readonly CodingFlowUxRoute[] = ["/code-flow", "/apply-validation", "/workflow-results", "/run-history", "/code-flow/trial", "/code-flow/trial-review"];

export function buildCodingFlowUxFixSummary(): CodingFlowUxFixSummary {
  const priorities = SUMMARY_ROUTES.map(buildCodingFlowPanelPriority);
  return {
    summaryId: "coding-flow-ux-fix-summary",
    frictionCount: buildDefaultCodingFlowFrictions().length,
    copyFixCount: buildDefaultCodingFlowCopyFixes().length,
    primaryActionFixes: SUMMARY_ROUTES.map((route) => buildCodingFlowPrimaryActionFix(route)).length,
    essentialPanelCount: priorities.flatMap((item) => item.items).filter((item) => item.priority === "essential").length,
    emptyStateFixCount: buildDefaultCodingFlowEmptyStateFixes().length,
    validationCopyStatus: buildCodingFlowValidationCopyFix().status,
    routeHandoffStatus: `${buildCodingFlowRouteHandoffFix().length} handoffs ready`,
    nextUxAction: "Run another live coding trial after UX fixes.",
  };
}

export function summarizeCodingFlowUxFixSession(summary: CodingFlowUxFixSummary): string {
  return `${summary.frictionCount} frictions, ${summary.copyFixCount} copy fixes, ${summary.emptyStateFixCount} empty states. Next: ${summary.nextUxAction}`;
}
