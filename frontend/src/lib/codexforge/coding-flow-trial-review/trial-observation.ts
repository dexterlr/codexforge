import { buildTrialReviewStableKey, type TrialObservation, type TrialObservationItem } from "./coding-flow-trial-review-types";

export function buildTrialObservationItem(input: Omit<TrialObservationItem, "observationId"> & { observationId?: string }): TrialObservationItem {
  return {
    observationId: input.observationId ?? buildTrialReviewStableKey("observation", `${input.category}-${input.route}-${input.label}`),
    category: input.category,
    label: input.label,
    note: input.note,
    severity: input.severity,
    route: input.route,
    suggestedFix: input.suggestedFix,
    reviewRequired: input.reviewRequired,
  };
}

export function buildTrialObservation(items: TrialObservationItem[] = DEFAULT_OBSERVATIONS): TrialObservation {
  return { observationId: "trial-observation-coding-flow", title: "Trial observations", items: items.map((item) => ({ ...item })) };
}

export function summarizeTrialObservation(observation = buildTrialObservation()): string {
  const blockers = observation.items.filter((item) => item.severity === "blocker").length;
  return `${observation.items.length} observations captured, ${blockers} blockers.`;
}

const DEFAULT_OBSERVATIONS: TrialObservationItem[] = [
  buildTrialObservationItem({ category: "success", label: "what worked", note: "The operator can identify the step that completed cleanly.", severity: "low", route: "/code-flow/trial", suggestedFix: "Keep the success copy short and visible.", reviewRequired: true }),
  buildTrialObservationItem({ category: "friction", label: "what was confusing", note: "Capture the first moment the operator paused.", severity: "medium", route: "/code-flow", suggestedFix: "Make the next action plainer.", reviewRequired: true }),
  buildTrialObservationItem({ category: "navigation", label: "where the user hesitated", note: "Record route handoff hesitation.", severity: "medium", route: "/workflow-results", suggestedFix: "Add a clearer review route link.", reviewRequired: true }),
  buildTrialObservationItem({ category: "wording", label: "what wording was unclear", note: "Capture technical wording that should be rewritten.", severity: "medium", route: "/apply-validation", suggestedFix: "Prefer operator-facing language.", reviewRequired: true }),
  buildTrialObservationItem({ category: "layout", label: "where layout felt busy", note: "Note panels that made the main action hard to scan.", severity: "medium", route: "/code-flow", suggestedFix: "Collapse secondary details.", reviewRequired: true }),
  buildTrialObservationItem({ category: "result-capture", label: "what action was missing", note: "Capture missing copy, review, or handoff actions.", severity: "high", route: "/run-history", suggestedFix: "Add a single visible next action.", reviewRequired: true }),
  buildTrialObservationItem({ category: "safety", label: "what safety warning was helpful", note: "Record safety copy that changed operator behavior.", severity: "low", route: "/code-flow/trial-review", suggestedFix: "Keep useful warnings compact.", reviewRequired: true }),
  buildTrialObservationItem({ category: "safety", label: "what safety warning was noisy", note: "Record repeated warnings that hid workflow guidance.", severity: "medium", route: "/apply-validation", suggestedFix: "Deduplicate repeated safety text.", reviewRequired: true }),
  buildTrialObservationItem({ category: "unknown", label: "what should be simplified", note: "Capture the smallest simplification that would help next trial.", severity: "medium", route: "/start", suggestedFix: "Prefer small user-facing fixes.", reviewRequired: true }),
];
