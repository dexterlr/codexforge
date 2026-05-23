import type { CodingFlowPrimaryActionFix, CodingFlowUxRoute } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

const PRIMARY_ACTIONS: Record<CodingFlowUxRoute, string> = {
  "/code-flow": "Continue code flow",
  "/code-flow/trial": "Start trial in Code Flow",
  "/code-flow/trial-review": "Copy trial review",
  "/code-flow/ux-fixes": "Copy UX fix checklist",
  "/apply-validation": "Prepare validation checklist",
  "/workflow-results": "Copy workflow handoff",
  "/run-history": "Review latest run",
  "/start": "Choose a workflow",
  "/files": "Inspect selected file",
  "/validation": "Prepare checks",
  "/closed-loop": "Review failure",
};

export function buildCodingFlowPrimaryActionFix(route: CodingFlowUxRoute, label = PRIMARY_ACTIONS[route]): CodingFlowPrimaryActionFix {
  return {
    actionId: buildCodingFlowUxFixStableKey("primary", `${route}-${label}`),
    route,
    label,
    reason: "One primary action visible above the fold; secondary actions are grouped below.",
    secondaryGroupLabel: "More options",
    noAutoApply: true,
    noAutoRun: true,
  };
}

export function selectCodingFlowPrimaryAction(route: CodingFlowUxRoute): CodingFlowPrimaryActionFix {
  return buildCodingFlowPrimaryActionFix(route);
}

export function summarizeCodingFlowPrimaryActionFix(fixes: readonly CodingFlowPrimaryActionFix[]): string {
  return `${fixes.length} routes have one copy-only or route-only primary action.`;
}
