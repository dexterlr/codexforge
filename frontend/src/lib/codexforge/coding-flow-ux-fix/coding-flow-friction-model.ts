import type { CodingFlowFriction } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

const DEFAULT_FRICTIONS: readonly Omit<CodingFlowFriction, "frictionId">[] = [
  { type: "too-many-panels", label: "Too many panels", affectedRoute: "/code-flow", userFacingSymptom: "The screen asks the user to understand too many cards at once.", likelyCause: "Progress, step details, safety, preview, apply, validation, and result panels compete above the fold.", severity: "high", suggestedFix: "Keep current step and next action essential; move advanced panels into details.", fixRoute: "/code-flow/ux-fixes", priority: "now" },
  { type: "unclear-primary-action", label: "Unclear primary action", affectedRoute: "/code-flow", userFacingSymptom: "The user cannot tell whether to pick a file, describe a change, preview patch, or review apply.", likelyCause: "Several route handoffs look equally important.", severity: "high", suggestedFix: "Show one primary action: Continue code flow.", fixRoute: "/code-flow", priority: "now" },
  { type: "technical-wording", label: "Wording too technical", affectedRoute: "/apply-validation", userFacingSymptom: "Policy, hardening, bridge, and persistence wording hides the next human step.", likelyCause: "Implementation terms are shown as main user copy.", severity: "medium", suggestedFix: "Use plain labels like Review first, Approval required, No auto-run, and Next: run checks manually.", fixRoute: "/apply-validation", priority: "now" },
  { type: "missing-next-step", label: "Missing next step", affectedRoute: "/workflow-results", userFacingSymptom: "After capturing a result, the user does not know where to go.", likelyCause: "Handoff and memory candidate copy is visible before a clear next action.", severity: "medium", suggestedFix: "Make Copy workflow handoff primary and route to Run History or Closed Loop.", fixRoute: "/workflow-results", priority: "soon" },
  { type: "duplicate-handoff", label: "Duplicate route handoff", affectedRoute: "/code-flow", userFacingSymptom: "Several pages point to the same destination with different labels.", likelyCause: "Legacy route links accumulated during feature phases.", severity: "medium", suggestedFix: "Use one handoff label per source and group secondary links.", fixRoute: "/code-flow/ux-fixes", priority: "soon" },
  { type: "cramped-layout", label: "Cramped layout", affectedRoute: "/run-history", userFacingSymptom: "History looks like an event log instead of a latest-run review.", likelyCause: "Filters, event details, and export panels are too prominent.", severity: "medium", suggestedFix: "Make latest run and Review latest run essential; move filters and export lower.", fixRoute: "/run-history", priority: "soon" },
  { type: "validation-unclear", label: "Validation unclear", affectedRoute: "/validation", userFacingSymptom: "The user may think the UI will run checks.", likelyCause: "Validation command copy and guarded execution state are too close together.", severity: "high", suggestedFix: "Say Copy these checks, Run them in your terminal, Paste the output back.", fixRoute: "/validation", priority: "now" },
  { type: "apply-blocked-unclear", label: "Apply blocked without clear reason", affectedRoute: "/apply-validation", userFacingSymptom: "Apply feels broken when approval, preview, or rollback is missing.", likelyCause: "Blocked reasons are policy-shaped instead of user-shaped.", severity: "high", suggestedFix: "Show Apply blocked because preview, approval, or rollback is missing.", fixRoute: "/apply-validation", priority: "now" },
  { type: "result-capture-unclear", label: "Result capture unclear", affectedRoute: "/workflow-results", userFacingSymptom: "The user does not know what output to paste or copy.", likelyCause: "Result capture and memory review are mixed together.", severity: "medium", suggestedFix: "Separate result summary, handoff, and optional memory review.", fixRoute: "/workflow-results", priority: "soon" },
  { type: "route-handoff-confusing", label: "Route handoff confusing", affectedRoute: "/start", userFacingSymptom: "The user needs to understand product phases to choose the next page.", likelyCause: "Advanced routes are discoverable before the basic workflow.", severity: "medium", suggestedFix: "Route Fix code directly to /code-flow and keep trial secondary.", fixRoute: "/start", priority: "now" },
  { type: "safety-warning-noisy", label: "Safety warning too noisy", affectedRoute: "/code-flow", userFacingSymptom: "Long safety copy makes the flow feel harder than the task.", likelyCause: "Safety boundaries are repeated as paragraphs instead of compact badges.", severity: "low", suggestedFix: "Use compact badges and expand long policy only when blocked.", fixRoute: "/code-flow/ux-fixes", priority: "soon" },
];

export function buildCodingFlowFriction(input: Omit<CodingFlowFriction, "frictionId">): CodingFlowFriction {
  return { frictionId: buildCodingFlowUxFixStableKey("friction", `${input.type}-${input.affectedRoute}`), ...input };
}

export function buildDefaultCodingFlowFrictions(): CodingFlowFriction[] {
  return DEFAULT_FRICTIONS.map(buildCodingFlowFriction);
}

export function summarizeCodingFlowFriction(frictions: readonly CodingFlowFriction[]): string {
  const nowCount = frictions.filter((item) => item.priority === "now").length;
  return `${frictions.length} coding-flow friction items; ${nowCount} need fixes now.`;
}
