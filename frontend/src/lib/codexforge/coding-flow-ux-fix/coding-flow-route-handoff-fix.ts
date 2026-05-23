import type { CodingFlowRouteHandoffFixItem } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

export function buildRouteHandoffFixItem(input: Omit<CodingFlowRouteHandoffFixItem, "handoffId" | "avoidDuplicateLinks">): CodingFlowRouteHandoffFixItem {
  return { handoffId: buildCodingFlowUxFixStableKey("handoff", `${input.sourceRoute}-to-${input.destinationRoute}`), avoidDuplicateLinks: true, ...input };
}

export function buildCodingFlowRouteHandoffFix(): CodingFlowRouteHandoffFixItem[] {
  return [
    buildRouteHandoffFixItem({ sourceRoute: "/start", destinationRoute: "/code-flow", label: "Fix code", whatToDoThere: "Pick a file, describe the change, and preview patch.", whatToBring: "The plain-English task.", expectedOutcome: "A reviewed patch preview path.", backRoute: "/start" }),
    buildRouteHandoffFixItem({ sourceRoute: "/code-flow", destinationRoute: "/files", label: "Pick a file", whatToDoThere: "Inspect selected file.", whatToBring: "The file target or search hint.", expectedOutcome: "Selected file context.", backRoute: "/code-flow" }),
    buildRouteHandoffFixItem({ sourceRoute: "/code-flow", destinationRoute: "/apply-validation", label: "Review apply", whatToDoThere: "Check preview, approval, rollback, and validation checklist.", whatToBring: "Preview diff and requested change.", expectedOutcome: "Apply readiness or clear blocked reason.", backRoute: "/code-flow" }),
    buildRouteHandoffFixItem({ sourceRoute: "/apply-validation", destinationRoute: "/validation", label: "Prepare checks", whatToDoThere: "Copy checks for terminal execution.", whatToBring: "Approved checklist.", expectedOutcome: "Manual validation output to paste back.", backRoute: "/apply-validation" }),
    buildRouteHandoffFixItem({ sourceRoute: "/validation", destinationRoute: "/workflow-results", label: "Capture result", whatToDoThere: "Capture status, output excerpt, and next step.", whatToBring: "Terminal output.", expectedOutcome: "Reviewed workflow handoff.", backRoute: "/validation" }),
    buildRouteHandoffFixItem({ sourceRoute: "/workflow-results", destinationRoute: "/run-history", label: "Review history", whatToDoThere: "Review latest run and next safe action.", whatToBring: "Result handoff.", expectedOutcome: "Latest run summary.", backRoute: "/workflow-results" }),
    buildRouteHandoffFixItem({ sourceRoute: "/validation", destinationRoute: "/closed-loop", label: "Failed validation", whatToDoThere: "Review failure and prepare next fix.", whatToBring: "Failing command and output excerpt.", expectedOutcome: "Focused closed-loop fix request.", backRoute: "/validation" }),
    buildRouteHandoffFixItem({ sourceRoute: "/code-flow/trial", destinationRoute: "/code-flow/trial-review", label: "Review trial", whatToDoThere: "Record friction, pass/fail, and go/no-go.", whatToBring: "Trial notes.", expectedOutcome: "Trial review handoff.", backRoute: "/code-flow/trial" }),
    buildRouteHandoffFixItem({ sourceRoute: "/code-flow/trial-review", destinationRoute: "/code-flow/ux-fixes", label: "Open UX fixes", whatToDoThere: "Turn friction into copy, panel, empty state, and route fixes.", whatToBring: "Trial friction notes.", expectedOutcome: "Copyable UX fix checklist.", backRoute: "/code-flow/trial-review" }),
  ];
}

export function summarizeCodingFlowRouteHandoffFix(items: readonly CodingFlowRouteHandoffFixItem[]): string {
  return `${items.length} route handoffs use one label, one destination, and one expected outcome.`;
}
