import type { CodingFlowCopyFix, CodingFlowUxRoute } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

const ROUTE_LABELS: readonly [CodingFlowUxRoute, string, string, string][] = [
  ["/code-flow", "Fix code safely", "Pick a file", "Next: describe the change"],
  ["/code-flow/trial", "Try the coding flow", "Start trial in Code Flow", "Next: record what felt confusing"],
  ["/code-flow/trial-review", "Review the coding trial", "Copy trial review", "Next: open UX fixes"],
  ["/apply-validation", "Review apply", "Prepare validation checklist", "Next: run checks manually"],
  ["/workflow-results", "Capture result", "Copy workflow handoff", "Next: review history"],
  ["/run-history", "Review history", "Review latest run", "Next: choose the next safe step"],
  ["/start", "Choose a workflow", "Fix code", "Next: open Code Flow"],
  ["/files", "Pick a file", "Inspect selected file", "Next: preview patch"],
  ["/validation", "Prepare checks", "Copy these checks", "Next: run them in your terminal"],
  ["/closed-loop", "Review failure", "Review failure", "Next: prepare a safer fix"],
];

export function buildCodingFlowCopyFix(input: Omit<CodingFlowCopyFix, "fixId">): CodingFlowCopyFix {
  return { fixId: buildCodingFlowUxFixStableKey("copy", `${input.route}-${input.afterLabel}`), ...input };
}

export function buildDefaultCodingFlowCopyFixes(): CodingFlowCopyFix[] {
  return ROUTE_LABELS.map(([route, surface, afterLabel, nextCopy]) =>
    buildCodingFlowCopyFix({
      route,
      surface,
      beforeLabel: "Internal workflow wording",
      afterLabel,
      rule: "Use short labels, plain English, no internal phase numbers, no giant safety essays, Review first, Approval required, No auto-run, No auto-apply.",
      nextCopy,
    })
  );
}

export function summarizeCodingFlowCopyFix(fixes: readonly CodingFlowCopyFix[]): string {
  return `${fixes.length} copy fixes simplify labels like Pick a file and Preview patch.`;
}
