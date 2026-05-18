import type {
  BrainMutationGovernanceEventType,
  ReducerImpactCategory,
  ReducerImpactGovernance,
  ReducerImpactGovernanceItem,
  ReducerImpactPolicyState,
  ReducerImpactRiskLevel,
} from "./brain-mutation-governance-types";
import {
  BRAIN_MUTATION_GOVERNANCE_EVENT_TYPES,
  buildBrainMutationGovernanceStableKey,
  isKnownBrainMutationGovernanceEventType,
} from "./brain-mutation-governance-types";

type ImpactDefaults = {
  areas: string[];
  category: ReducerImpactCategory;
  risk: ReducerImpactRiskLevel;
  policyState: ReducerImpactPolicyState;
  nextSafeAction: string;
};

const IMPACT_DEFAULTS: Record<BrainMutationGovernanceEventType, ImpactDefaults> = {
  "message.created": {
    areas: ["conversation nodes", "message nodes", "message edges"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for conversation and message graph impact.",
  },
  "task.created": {
    areas: ["task nodes", "task-source message edges"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for task creation impact.",
  },
  "task.updated": {
    areas: ["task nodes", "status metadata"],
    category: "node-only",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for task status changes.",
  },
  "execution.started": {
    areas: ["run nodes", "task execution edges"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview before execution lineage mutation.",
  },
  "execution.completed": {
    areas: ["run nodes", "task execution edges", "result metadata"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for completion lineage impact.",
  },
  "diff.generated": {
    areas: ["diff nodes", "run-produced edges", "file path metadata"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for diff lineage impact.",
  },
  "memory.promoted": {
    areas: ["memory nodes", "task references", "source-derived edges", "evidence refs"],
    category: "node-and-edge",
    risk: "high",
    policyState: "review-required",
    nextSafeAction: "Review Memory Promotion Gate, Runtime Event Executor, and reducer preview before execution.",
  },
  "concept.synthesized": {
    areas: ["concept memory nodes", "source summary edges"],
    category: "node-and-edge",
    risk: "high",
    policyState: "review-required",
    nextSafeAction: "Inspect concept reducer preview and source evidence before approval.",
  },
  "failure.detected": {
    areas: ["failure note nodes", "task references", "run references"],
    category: "node-and-edge",
    risk: "high",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview and stabilization posture before mutation readiness.",
  },
  "recovery.detected": {
    areas: ["recovery note nodes", "failure links", "task and run references"],
    category: "node-and-edge",
    risk: "medium",
    policyState: "review-required",
    nextSafeAction: "Inspect reducer preview for recovery linkage impact.",
  },
  unknown: {
    areas: ["unknown graph areas"],
    category: "unknown",
    risk: "critical",
    policyState: "blocked",
    nextSafeAction: "Stop and define reducer impact before any mutation path.",
  },
};

export function buildReducerImpactGovernanceItem(
  input: Partial<Omit<ReducerImpactGovernanceItem, "eventType">> & { eventType: BrainMutationGovernanceEventType | string }
): ReducerImpactGovernanceItem {
  const eventType: BrainMutationGovernanceEventType = isKnownBrainMutationGovernanceEventType(input.eventType)
    ? input.eventType
    : input.eventType === "unknown"
      ? "unknown"
      : "unknown";
  const defaults = IMPACT_DEFAULTS[eventType];
  return {
    id: input.id ?? buildBrainMutationGovernanceStableKey("reducer-impact", eventType),
    eventType,
    reducerAvailable: input.reducerAvailable ?? eventType !== "unknown",
    reducerPreviewRequired: input.reducerPreviewRequired ?? true,
    expectedGraphAreasImpacted: [...(input.expectedGraphAreasImpacted ?? defaults.areas)],
    nodeEdgeImpactCategory: input.nodeEdgeImpactCategory ?? defaults.category,
    auditRequirement: input.auditRequirement ?? "Reducer preview and Runtime Event Journal audit entry required before mutation readiness.",
    riskLevel: input.riskLevel ?? defaults.risk,
    policyState: input.policyState ?? defaults.policyState,
    nextSafeAction: input.nextSafeAction ?? defaults.nextSafeAction,
  };
}

export function buildReducerImpactGovernance(
  eventTypes: readonly (BrainMutationGovernanceEventType | string)[] = BRAIN_MUTATION_GOVERNANCE_EVENT_TYPES
): ReducerImpactGovernance {
  const items = eventTypes.map((eventType) => buildReducerImpactGovernanceItem({ eventType }));
  const governance: ReducerImpactGovernance = {
    id: "reducer-impact-governance",
    items,
    governedEventCount: items.filter((item) => item.reducerAvailable).length,
    highPriorityCount: items.filter((item) => item.riskLevel === "high" || item.riskLevel === "critical").length,
    previewRequiredCount: items.filter((item) => item.reducerPreviewRequired).length,
    summary: [],
  };

  return { ...governance, summary: summarizeReducerImpactGovernance(governance) };
}

export function summarizeReducerImpactGovernance(
  governance: Pick<ReducerImpactGovernance, "governedEventCount" | "highPriorityCount" | "previewRequiredCount">
): string[] {
  return [
    `${governance.governedEventCount} runtime event types have reducer impact governance.`,
    `${governance.previewRequiredCount} event types require reducer preview before mutation.`,
    `${governance.highPriorityCount} high-priority reducer impacts include memory.promoted, concept.synthesized, and failure.detected.`,
  ];
}
