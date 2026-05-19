import type { BrainContinuityInput, BrainContinuityMetric, BrainContinuityPosture, MemoryGrowthModel } from "./brain-continuity-types";
import { buildBrainContinuityStableKey, readBrainContinuityCount } from "./brain-continuity-types";

function derivePosture(value: number, warnAt: number, riskAt: number): BrainContinuityPosture {
  if (value >= riskAt) return "risk";
  if (value >= warnAt) return "warning";
  return "healthy";
}

export function buildMemoryGrowthMetric(args: {
  id: string;
  label: string;
  value: number | string;
  detail: string;
  posture?: BrainContinuityPosture | null;
  reviewRequired?: boolean | null;
}): BrainContinuityMetric {
  const posture = args.posture ?? "healthy";
  return {
    id: buildBrainContinuityStableKey("memory-growth-metric", args.id),
    label: args.label,
    value: args.value,
    detail: args.detail,
    posture,
    reviewRequired: args.reviewRequired ?? !["healthy", "needs-review"].includes(posture),
  };
}

export function buildMemoryGrowthModel(input: BrainContinuityInput = {}): MemoryGrowthModel {
  const graph = input.graph ?? null;
  const memoryNodeCount = readBrainContinuityCount(input.memoryNodeCount ?? graph?.nodes.filter((node) => node.kind === "memory").length);
  const promotedMemoryCount = readBrainContinuityCount(input.promotedMemoryCount);
  const pendingMemoryInboxCount = readBrainContinuityCount(input.pendingMemoryInboxCount);
  const blockedPromotionCount = readBrainContinuityCount(input.blockedPromotionCount);
  const duplicateRiskCount = readBrainContinuityCount(input.duplicateRiskCount);
  const contradictionRiskCount = readBrainContinuityCount(input.contradictionRiskCount);
  const highImportanceMemoryCount = readBrainContinuityCount(input.highImportanceMemoryCount ?? graph?.nodes.filter((node) => node.kind === "memory" && node.meta.importance === "high").length);
  const staleMemoryCount = input.staleMemoryCount === null || input.staleMemoryCount === undefined ? null : readBrainContinuityCount(input.staleMemoryCount);
  const memoryDensity = graph && graph.nodes.length > 0 ? Number((memoryNodeCount / graph.nodes.length).toFixed(3)) : null;
  const memoryGovernanceReadiness: BrainContinuityPosture =
    blockedPromotionCount > 0 || contradictionRiskCount > 0 ? "risk" : duplicateRiskCount > 0 || pendingMemoryInboxCount > 0 ? "needs-review" : "healthy";

  const metrics = [
    buildMemoryGrowthMetric({ id: "memory-node-count", label: "Memory node count", value: memoryNodeCount, detail: "Memory nodes supplied by graph or caller.", posture: memoryNodeCount > 0 ? "needs-review" : "unknown" }),
    buildMemoryGrowthMetric({ id: "promoted-memory-count", label: "Promoted memory count", value: promotedMemoryCount, detail: "Promoted memory count is review context only; no auto-promotion occurs.", posture: "healthy" }),
    buildMemoryGrowthMetric({ id: "pending-memory-inbox-count", label: "Pending memory inbox count", value: pendingMemoryInboxCount, detail: "Pending inbox candidates must be reviewed before promotion.", posture: derivePosture(pendingMemoryInboxCount, 1, 8) }),
    buildMemoryGrowthMetric({ id: "blocked-promotion-count", label: "Blocked promotion count", value: blockedPromotionCount, detail: "Blocked promotion count keeps memory growth governed.", posture: blockedPromotionCount > 0 ? "blocked" : "healthy" }),
    buildMemoryGrowthMetric({ id: "duplicate-risk-count", label: "Duplicate risk count", value: duplicateRiskCount, detail: "Duplicate risk count must be resolved before promotion.", posture: derivePosture(duplicateRiskCount, 1, 4) }),
    buildMemoryGrowthMetric({ id: "contradiction-risk-count", label: "Contradiction risk count", value: contradictionRiskCount, detail: "Contradiction risk count blocks safe promotion until reviewed.", posture: contradictionRiskCount > 0 ? "risk" : "healthy" }),
    buildMemoryGrowthMetric({ id: "high-importance-memory-count", label: "High-importance memory count", value: highImportanceMemoryCount, detail: "High-importance memory requires careful audit posture.", posture: highImportanceMemoryCount > 0 ? "needs-review" : "healthy" }),
    buildMemoryGrowthMetric({ id: "stale-memory-count", label: "Stale memory count", value: staleMemoryCount ?? "not supplied", detail: "Stale memory count is included when supplied by caller.", posture: staleMemoryCount === null ? "unknown" : derivePosture(staleMemoryCount, 1, 5) }),
    buildMemoryGrowthMetric({ id: "memory-density", label: "Memory density", value: memoryDensity ?? "not supplied", detail: "Memory density is memory nodes divided by graph node count when graph is supplied.", posture: memoryDensity === null ? "unknown" : memoryDensity > 0.5 ? "warning" : "healthy" }),
    buildMemoryGrowthMetric({ id: "memory-governance-readiness", label: "Memory governance readiness", value: memoryGovernanceReadiness, detail: "Memory Promotion Gate and Operator Memory Inbox remain review-gated.", posture: memoryGovernanceReadiness }),
  ];

  const postures = metrics.map((metric) => metric.posture);
  const posture: BrainContinuityPosture = postures.includes("blocked")
    ? "blocked"
    : postures.includes("risk")
      ? "risk"
      : postures.includes("warning")
        ? "warning"
        : postures.includes("needs-review")
          ? "needs-review"
          : postures.includes("unknown")
            ? "unknown"
            : "healthy";

  return {
    id: "memory-growth-model",
    metrics,
    posture,
    memoryNodeCount,
    promotedMemoryCount,
    pendingMemoryInboxCount,
    blockedPromotionCount,
    duplicateRiskCount,
    contradictionRiskCount,
    highImportanceMemoryCount,
    staleMemoryCount,
    memoryDensity,
    memoryGovernanceReadiness,
    summary: summarizeMemoryGrowthModel({ metrics, posture } as MemoryGrowthModel),
  };
}

export function summarizeMemoryGrowthModel(model: Pick<MemoryGrowthModel, "metrics" | "posture">): string[] {
  return [
    `Memory growth posture is ${model.posture}.`,
    "Memory growth includes duplicate risk and contradiction risk before any promotion decision.",
    "Continuity does not mutate Brain graph and does not auto-promote memory.",
  ];
}
