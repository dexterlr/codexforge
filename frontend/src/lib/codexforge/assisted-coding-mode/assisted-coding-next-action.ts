import type { AssistedCodingGoal, AssistedCodingNeed, AssistedCodingNextAction } from "./assisted-coding-mode-types";

const nextByNeed: Record<AssistedCodingNeed, AssistedCodingNextAction> = {
  none: { label: "Choose a coding goal", href: "/assist", reason: "Start with a goal before choosing a route.", safeBecause: "No commands run from this guide.", stillManual: "You choose the route and the work stays review-gated." },
  file: { label: "Pick a file", href: "/files", reason: "Small UI work starts with a file boundary.", safeBecause: "Reading files is separate from writing files.", stillManual: "You still select the file and review any patch." },
  "patch-preview": { label: "Preview the patch", href: "/code-flow/live-run", reason: "Wording changes should be previewed before apply review.", safeBecause: "Preview does not apply changes.", stillManual: "You still inspect the diff." },
  "apply-review": { label: "Review apply request", href: "/guarded-apply-mvp", reason: "Patch review belongs at the guarded apply boundary.", safeBecause: "Approval required before apply.", stillManual: "You still approve or stop." },
  evidence: { label: "Capture apply evidence", href: "/apply-evidence", reason: "Evidence should be captured after an apply decision.", safeBecause: "Evidence capture does not validate or mutate.", stillManual: "You still confirm what happened." },
  "validation-result": { label: "Capture validation result", href: "/validation-results", reason: "Validation output should be reviewed separately.", safeBecause: "No auto-run is available here.", stillManual: "You still run validation yourself." },
  "failure-recovery": { label: "Find safe recovery step", href: "/recovery", reason: "Failures need a recovery plan before retry.", safeBecause: "No automatic rollback or retry runs.", stillManual: "You still decide whether to retry." },
  "run-history": { label: "Review run history", href: "/run-history", reason: "Recent handoffs explain what happened.", safeBecause: "History is review-only.", stillManual: "You still decide what to trust." },
  demo: { label: "Prepare demo", href: "/demo", reason: "Demo flow shows what remains manual.", safeBecause: "Demo mode does not execute.", stillManual: "You still present the result." },
  "review-inbox": { label: "Review next item", href: "/review-inbox", reason: "Reviewed items should be handled before new work.", safeBecause: "Inbox is deterministic and review-only.", stillManual: "You still choose the next item." },
};

export function selectAssistedCodingNextAction(goal?: AssistedCodingGoal): AssistedCodingNextAction {
  return nextByNeed[goal?.need ?? "none"];
}
