import type { ProductSimplificationSummary } from "./product-simplification-types";
import { buildDefaultFriendlyEmptyStates } from "./friendly-empty-states";
import { buildDefaultGuidedWorkflows } from "./guided-workflow-model";
import { buildDefaultPrimaryActions } from "./primary-action-model";
import { buildDefaultSimplifiedPageCopy } from "./simplified-page-copy";
import { buildDefaultUserIntentOptions } from "./user-intent-model";
import { buildDefaultWorkflowShortcuts } from "./workflow-shortcuts";

export function buildProductSimplificationSummary(): ProductSimplificationSummary {
  return {
    id: "product-simplification-summary",
    intentOptions: buildDefaultUserIntentOptions(),
    workflows: buildDefaultGuidedWorkflows(),
    pageCopy: buildDefaultSimplifiedPageCopy(),
    primaryActions: buildDefaultPrimaryActions(),
    emptyStates: buildDefaultFriendlyEmptyStates(),
    shortcuts: buildDefaultWorkflowShortcuts(),
    safetyBadges: ["Review first", "Approval required", "No auto-run", "No file writes", "Preview only", "Simulation only", "Design only"],
    recommendedNextAction: "Coding Flow Live Trial Run or Real Apply Guard Review",
    architectureSummary: [
      "Product Simplification is a UX/product layer.",
      "Start route guides user intent without removing advanced routes.",
      "Advanced details are collapsed or visually secondary.",
      "Safety boundaries remain visible as compact badges.",
      "Real coding flow is the recommended primary workflow for fix-code.",
      "Coding Flow Live Trial Pack is the operator trial/readiness layer.",
    ],
  };
}

export function summarizeProductSimplificationSummary(summary: ProductSimplificationSummary = buildProductSimplificationSummary()): string[] {
  return [
    `${summary.intentOptions.length} plain-English intents guide normal operators.`,
    `${summary.workflows.length} guided workflows preserve advanced systems behind simple steps.`,
    `Next recommended product step: ${summary.recommendedNextAction}.`,
  ];
}
