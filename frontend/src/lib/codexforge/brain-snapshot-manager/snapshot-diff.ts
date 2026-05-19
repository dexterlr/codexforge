import type { CodexForgeBrainEdge, CodexForgeBrainGraph, CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type { BrainSnapshotDiff, BrainSnapshotDiffItem, BrainSnapshotDiffKind, BrainSnapshotModel, BrainSnapshotRiskLevel } from "./brain-snapshot-types";
import { buildBrainSnapshotEntitySignature, buildBrainSnapshotStableKey } from "./snapshot-model";

function mapById<T extends { id: string }>(items: readonly T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

function riskFor(kind: BrainSnapshotDiffKind): BrainSnapshotRiskLevel {
  if (kind === "node-removed" || kind === "schema-version-changed") return "high";
  if (kind === "edge-removed" || kind === "node-changed") return "medium";
  return "low";
}

export function buildBrainSnapshotDiffItem(input: Omit<BrainSnapshotDiffItem, "id"> & { id?: string }): BrainSnapshotDiffItem {
  return {
    id: input.id ?? buildBrainSnapshotStableKey("brain-snapshot-diff", input.kind, input.entityId),
    kind: input.kind,
    entityId: input.entityId,
    label: input.label,
    summary: input.summary,
    riskLevel: input.riskLevel,
  };
}

function diffEntities<T extends CodexForgeBrainNode | CodexForgeBrainEdge>(
  beforeItems: readonly T[],
  afterItems: readonly T[],
  addedKind: BrainSnapshotDiffKind,
  removedKind: BrainSnapshotDiffKind,
  changedKind: BrainSnapshotDiffKind,
  label: string
): BrainSnapshotDiffItem[] {
  const beforeMap = mapById(beforeItems);
  const afterMap = mapById(afterItems);
  const ids = Array.from(new Set([...beforeMap.keys(), ...afterMap.keys()])).sort((a, b) => a.localeCompare(b));
  const items: BrainSnapshotDiffItem[] = [];

  for (const id of ids) {
    const before = beforeMap.get(id);
    const after = afterMap.get(id);
    if (!before && after) {
      items.push(buildBrainSnapshotDiffItem({ kind: addedKind, entityId: id, label: `${label} added`, summary: `${label} ${id} added.`, riskLevel: riskFor(addedKind) }));
    } else if (before && !after) {
      items.push(buildBrainSnapshotDiffItem({ kind: removedKind, entityId: id, label: `${label} removed`, summary: `${label} ${id} removed.`, riskLevel: riskFor(removedKind) }));
    } else if (before && after && buildBrainSnapshotEntitySignature(before) !== buildBrainSnapshotEntitySignature(after)) {
      items.push(buildBrainSnapshotDiffItem({ kind: changedKind, entityId: id, label: `${label} changed`, summary: `${label} ${id} changed; compact signature differs.`, riskLevel: riskFor(changedKind) }));
    }
  }

  return items;
}

export function buildBrainSnapshotDiff(args: {
  beforeSnapshot: BrainSnapshotModel;
  afterSnapshot: BrainSnapshotModel;
  beforeGraph?: CodexForgeBrainGraph | null;
  afterGraph?: CodexForgeBrainGraph | null;
}): BrainSnapshotDiff {
  const items: BrainSnapshotDiffItem[] = [];

  if (args.beforeSnapshot.graphVersion !== args.afterSnapshot.graphVersion) {
    items.push(buildBrainSnapshotDiffItem({
      kind: "schema-version-changed",
      entityId: "graph-version",
      label: "Schema version changed",
      summary: `Graph version changed from ${args.beforeSnapshot.graphVersion} to ${args.afterSnapshot.graphVersion}.`,
      riskLevel: "high",
    }));
  }

  if (args.beforeGraph && args.afterGraph) {
    items.push(...diffEntities(args.beforeGraph.nodes, args.afterGraph.nodes, "node-added", "node-removed", "node-changed", "Node"));
    items.push(...diffEntities(args.beforeGraph.edges, args.afterGraph.edges, "edge-added", "edge-removed", "edge-changed", "Edge"));
    if (String(args.beforeGraph.meta.updatedAt) !== String(args.afterGraph.meta.updatedAt)) {
      items.push(buildBrainSnapshotDiffItem({
        kind: "metadata-changed",
        entityId: "graph-meta",
        label: "Metadata changed",
        summary: "Graph metadata changed; compact summary only.",
        riskLevel: "low",
      }));
    }
  } else {
    items.push(buildBrainSnapshotDiffItem({
      kind: "unknown",
      entityId: "graph-payload",
      label: "Graph payload unavailable",
      summary: "Only snapshot summaries were supplied, so node/edge payload diff is limited.",
      riskLevel: "medium",
    }));
  }

  return {
    beforeSnapshotId: args.beforeSnapshot.id,
    afterSnapshotId: args.afterSnapshot.id,
    items,
    summary: summarizeBrainSnapshotDiff({ beforeSnapshotId: args.beforeSnapshot.id, afterSnapshotId: args.afterSnapshot.id, items, summary: [] }),
  };
}

export function summarizeBrainSnapshotDiff(diff: BrainSnapshotDiff): string[] {
  return [
    `${diff.items.length} compact diff items built in deterministic order.`,
    "Diff compares by stable id and avoids deep-rendering huge payloads.",
    "Diff is review-only and does not mutate the live Brain graph.",
  ];
}
