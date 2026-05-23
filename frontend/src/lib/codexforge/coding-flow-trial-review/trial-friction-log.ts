import { buildTrialReviewStableKey, type TrialFrictionLog, type TrialFrictionLogItem } from "./coding-flow-trial-review-types";

export function buildTrialFrictionLogItem(input: Omit<TrialFrictionLogItem, "frictionId"> & { frictionId?: string }): TrialFrictionLogItem {
  return { ...input, frictionId: input.frictionId ?? buildTrialReviewStableKey("friction", `${input.type}-${input.route}`) };
}

export function buildTrialFrictionLog(items: TrialFrictionLogItem[] = DEFAULT_FRICTION): TrialFrictionLog {
  return { logId: "trial-friction-log", title: "Friction log", items: items.map((item) => ({ ...item })) };
}

export function summarizeTrialFrictionLog(log = buildTrialFrictionLog()): string {
  const now = log.items.filter((item) => item.priority === "now").length;
  return `${log.items.length} friction items, ${now} marked now.`;
}

const DEFAULT_FRICTION = [
  buildTrialFrictionLogItem({ type: "too many panels", severity: "medium", route: "/code-flow", userFacingSymptom: "Operator scans too much before acting.", likelyCause: "Secondary details compete with the main flow.", suggestedProductFix: "Collapse advanced panels by default.", priority: "soon" }),
  buildTrialFrictionLogItem({ type: "unclear primary action", severity: "blocker", route: "/code-flow", userFacingSymptom: "Operator cannot tell what to do next.", likelyCause: "Primary action copy is not dominant enough.", suggestedProductFix: "Make one next action visually primary.", priority: "now" }),
  buildTrialFrictionLogItem({ type: "wording too technical", severity: "medium", route: "/apply-validation", userFacingSymptom: "Operator has to translate safety terms.", likelyCause: "Implementation wording leaked into UI.", suggestedProductFix: "Rewrite in plain English.", priority: "soon" }),
  buildTrialFrictionLogItem({ type: "missing next step", severity: "high", route: "/workflow-results", userFacingSymptom: "Operator captures result but does not know where to go.", likelyCause: "Route handoff is implicit.", suggestedProductFix: "Link to Trial Review and Run History.", priority: "now" }),
  buildTrialFrictionLogItem({ type: "duplicate navigation", severity: "medium", route: "/start", userFacingSymptom: "Operator sees repeated route choices.", likelyCause: "Multiple menus repeat the same options.", suggestedProductFix: "Keep unified shell route navigation only.", priority: "later" }),
  buildTrialFrictionLogItem({ type: "cramped layout", severity: "medium", route: "/code-flow/trial", userFacingSymptom: "Checklist cards feel dense.", likelyCause: "Too many repeated cards above the fold.", suggestedProductFix: "Use calm workflow bands and secondary details.", priority: "soon" }),
  buildTrialFrictionLogItem({ type: "validation unclear", severity: "high", route: "/validation", userFacingSymptom: "Operator cannot tell what output to capture.", likelyCause: "Manual validation outcome copy is incomplete.", suggestedProductFix: "Add clear pass/fail capture prompts.", priority: "now" }),
  buildTrialFrictionLogItem({ type: "apply blocked without explanation", severity: "high", route: "/apply-validation", userFacingSymptom: "Blocked apply feels like failure.", likelyCause: "Approval gate reason is not close to the action.", suggestedProductFix: "Place approval reason next to the apply review.", priority: "now" }),
  buildTrialFrictionLogItem({ type: "result capture unclear", severity: "high", route: "/workflow-results", userFacingSymptom: "Operator cannot produce a usable handoff.", likelyCause: "Report sections are not framed as copyable evidence.", suggestedProductFix: "Provide a copy-only review template.", priority: "now" }),
  buildTrialFrictionLogItem({ type: "route handoff confusing", severity: "medium", route: "/run-history", userFacingSymptom: "Operator cannot tell whether history or review comes next.", likelyCause: "Handoff copy lacks priority.", suggestedProductFix: "Recommend Trial Review after manual trial.", priority: "soon" }),
  buildTrialFrictionLogItem({ type: "safety warning too noisy", severity: "medium", route: "/code-flow/trial-review", userFacingSymptom: "Safety copy repeats without adding new guidance.", likelyCause: "Every panel restates the same warning.", suggestedProductFix: "Use one compact safety strip.", priority: "later" }),
];
