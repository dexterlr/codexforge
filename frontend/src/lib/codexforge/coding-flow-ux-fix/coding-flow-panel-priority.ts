import type { CodingFlowPanelPriority, CodingFlowPanelPriorityItem, CodingFlowPanelPriorityLevel, CodingFlowUxRoute } from "./coding-flow-ux-fix-types";
import { buildCodingFlowUxFixStableKey } from "./coding-flow-ux-fix-types";

export function buildCodingFlowPanelPriorityItem(input: Omit<CodingFlowPanelPriorityItem, "itemId">): CodingFlowPanelPriorityItem {
  return { itemId: buildCodingFlowUxFixStableKey("panel", `${input.route}-${input.panel}-${input.priority}`), ...input };
}

export function buildCodingFlowPanelPriority(route: CodingFlowUxRoute): CodingFlowPanelPriority {
  const base: readonly [string, CodingFlowPanelPriorityLevel, string][] =
    route === "/apply-validation"
      ? [["policy summary", "essential", "Show why apply is blocked or ready."], ["validation checklist", "essential", "Keep checks easy to copy."], ["rollback", "essential", "Keep rollback visible but concise."], ["raw diff detail", "advanced", "Collapse details until needed."]]
      : route === "/workflow-results"
        ? [["result summary", "essential", "Show the outcome first."], ["handoff", "essential", "Copy workflow handoff is primary."], ["next action", "essential", "Route passed, failed, or blocked results."], ["memory candidate", "advanced", "Optional and reviewed only."]]
        : route === "/run-history"
          ? [["latest run", "essential", "Review latest run first."], ["filters", "essential", "Keep filters compact."], ["next action", "essential", "Show what to do after review."], ["event list", "advanced", "Avoid debug-log feel above fold."]]
          : route === "/code-flow/trial"
            ? [["checklist", "essential", "Keep the trial checklist visible."], ["safe file choice", "essential", "Help pick a safe file."], ["start action", "essential", "Start trial in Code Flow."], ["troubleshooting", "advanced", "Show after the basics."]]
            : route === "/code-flow/trial-review"
              ? [["checklist", "essential", "Capture pass/fail."], ["friction summary", "essential", "Show top friction."], ["go/no-go", "essential", "Make readiness explicit."], ["screen details", "advanced", "Collapse detailed notes."]]
              : [["progress", "essential", "Show current progress."], ["current step", "essential", "Show Pick a file, Describe change, or Preview patch."], ["next action", "essential", "One visible primary action."], ["debug/raw JSON", "hidden", "Keep raw data hidden."]];

  return {
    priorityId: buildCodingFlowUxFixStableKey("priority", route),
    route,
    items: base.map(([panel, priority, guidance]) => buildCodingFlowPanelPriorityItem({ route, panel, priority, guidance })),
  };
}

export function summarizeCodingFlowPanelPriority(priorities: readonly CodingFlowPanelPriority[]): string {
  const essentialCount = priorities.flatMap((item) => item.items).filter((item) => item.priority === "essential").length;
  return `${essentialCount} essential panels stay visible; advanced details are collapsed or secondary.`;
}
