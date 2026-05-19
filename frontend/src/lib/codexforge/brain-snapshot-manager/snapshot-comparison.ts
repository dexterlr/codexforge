import type {
  BrainSnapshotComparison,
  BrainSnapshotComparisonCategory,
  BrainSnapshotComparisonItem,
  BrainSnapshotModel,
  BrainSnapshotRiskLevel,
} from "./brain-snapshot-types";
import { buildBrainSnapshotStableKey } from "./snapshot-model";

function deltaRisk(delta: number): BrainSnapshotRiskLevel {
  const abs = Math.abs(delta);
  if (abs >= 10) return "high";
  if (abs >= 3) return "medium";
  return "low";
}

function compareCountMap(before: Record<string, number>, after: Record<string, number>): number {
  const keys = Array.from(new Set([...Object.keys(before), ...Object.keys(after)])).sort();
  return keys.reduce((total, key) => total + Math.abs((after[key] ?? 0) - (before[key] ?? 0)), 0);
}

function setDelta(after: readonly string[], before: readonly string[]): string[] {
  const beforeSet = new Set(before);
  return after.filter((id) => !beforeSet.has(id)).sort((a, b) => a.localeCompare(b));
}

export function buildBrainSnapshotComparisonItem(input: Omit<BrainSnapshotComparisonItem, "id"> & { id?: string }): BrainSnapshotComparisonItem {
  return {
    id: input.id ?? buildBrainSnapshotStableKey("brain-snapshot-comparison", input.category, input.label),
    category: input.category,
    label: input.label,
    beforeValue: input.beforeValue,
    afterValue: input.afterValue,
    delta: input.delta,
    riskLevel: input.riskLevel,
  };
}

function item(category: BrainSnapshotComparisonCategory, label: string, beforeValue: number, afterValue: number): BrainSnapshotComparisonItem {
  const delta = afterValue - beforeValue;
  return buildBrainSnapshotComparisonItem({
    category,
    label,
    beforeValue,
    afterValue,
    delta,
    riskLevel: deltaRisk(delta),
  });
}

export function compareBrainSnapshots(before: BrainSnapshotModel, after: BrainSnapshotModel): BrainSnapshotComparison {
  const addedNodeIds = setDelta(after.nodeIds, before.nodeIds);
  const removedNodeIds = setDelta(before.nodeIds, after.nodeIds);
  const changedNodeIds = Array.from(new Set([...addedNodeIds, ...removedNodeIds])).sort((a, b) => a.localeCompare(b));
  const items = [
    item("node-count-change", "Node count change", before.nodeCount, after.nodeCount),
    item("edge-count-change", "Edge count change", before.edgeCount, after.edgeCount),
    item("node-kind-change", "Node kind change", 0, compareCountMap(before.nodeKindCounts, after.nodeKindCounts)),
    item("memory-change", "Memory change", before.memoryNodeCount, after.memoryNodeCount),
    item("task-change", "Task change", before.taskNodeCount, after.taskNodeCount),
    item("concept-change", "Concept change", before.conceptNodeCount, after.conceptNodeCount),
    item("execution-change", "Execution change", before.executionNodeCount, after.executionNodeCount),
    item("importance-change", "Importance change", 0, compareCountMap(before.importanceCounts, after.importanceCounts)),
    item("status-change", "Status change", 0, compareCountMap(before.statusCounts, after.statusCounts)),
    item("isolated-node-change", "Isolated node change", before.isolatedNodeIds.length, after.isolatedNodeIds.length),
  ];
  const riskLevel: BrainSnapshotRiskLevel = items.some((entry) => entry.riskLevel === "high")
    ? "high"
    : items.some((entry) => entry.riskLevel === "medium")
      ? "medium"
      : "low";
  const comparison: BrainSnapshotComparison = {
    beforeSnapshotId: before.id,
    afterSnapshotId: after.id,
    deltaMetrics: items,
    addedNodeIds,
    removedNodeIds,
    changedNodeIds,
    riskLevel,
    reviewRequired: riskLevel !== "low" || removedNodeIds.length > 0,
    replayRecommended: items.some((entry) => entry.category === "memory-change" || entry.category === "execution-change" ? entry.delta !== 0 : false) || riskLevel === "high",
    summary: [],
  };
  comparison.summary = summarizeBrainSnapshotComparison(comparison);
  return comparison;
}

export function summarizeBrainSnapshotComparison(comparison: BrainSnapshotComparison): string[] {
  return [
    `Compared ${comparison.beforeSnapshotId} to ${comparison.afterSnapshotId}.`,
    `${comparison.addedNodeIds.length} added nodes, ${comparison.removedNodeIds.length} removed nodes, ${comparison.changedNodeIds.length} changed node ids supplied.`,
    comparison.replayRecommended ? "Runtime replay recommended before any corrective planning." : "Runtime replay optional; continue read-only review.",
  ];
}
