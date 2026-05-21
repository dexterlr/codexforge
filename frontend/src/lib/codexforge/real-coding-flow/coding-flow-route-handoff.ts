import { buildCodingFlowStableKey } from "./coding-flow-input";
import type { CodingFlowHandoffKind, CodingFlowRoute, CodingFlowRouteHandoff, CodingFlowRouteHandoffAction } from "./real-coding-flow-types";

const routeByLabel: Record<CodingFlowHandoffKind, CodingFlowRoute> = {
  "Open Start Wizard": "/start",
  "Open Files": "/files",
  "Open Real Patch Preview": "/files",
  "Open Approved Patch Apply": "/files",
  "Open Validation Runner": "/validation",
  "Open Closed Loop Fix": "/closed-loop",
  "Copy patch request": "/code-flow",
  "Copy validation checklist": "/validation",
  "Copy result summary": "/code-flow",
};

export function buildCodingFlowRouteHandoff(label: CodingFlowHandoffKind, copyPayload: string | null = null): CodingFlowRouteHandoff {
  const route = routeByLabel[label];
  return {
    id: `coding-flow-handoff:${buildCodingFlowStableKey(label, route)}`,
    label,
    route,
    copyPayload,
    safetyNote: "Copy or navigate only. No unsafe execution, no direct file writes, no auto-apply, no auto-run.",
  };
}

export function buildCodingFlowRouteHandoffAction(handoff: CodingFlowRouteHandoff): CodingFlowRouteHandoffAction {
  return {
    ...handoff,
    actionText: handoff.copyPayload ? handoff.label : `Open ${handoff.route}`,
    noUnsafeExecution: true,
  };
}

export function summarizeCodingFlowRouteHandoff(handoff: CodingFlowRouteHandoff): string {
  return `${handoff.label} -> ${handoff.route}. ${handoff.safetyNote}`;
}
