import type { BrainSnapshotModel } from "@/lib/codexforge/brain-snapshot-manager";
import {
  SNAPSHOT_RESTORE_GATE_CANONICAL_SCHEMA_PATH,
  buildSnapshotRestoreStableKey,
  isSnapshotRestoreScope,
  uniqueSnapshotRestoreStrings,
  type SnapshotRestoreCandidate,
  type SnapshotRestoreCandidateInput,
  type SnapshotRestoreCandidateValidation,
  type SnapshotRestoreScope,
  type SnapshotRestoreSnapshotSummary,
} from "./snapshot-restore-gate-types";

function riskFromSnapshot(snapshot: Pick<BrainSnapshotModel, "integrityNotes" | "blockedOrErrorNodeIds" | "nodeCount">): "low" | "medium" | "high" | "critical" {
  if (snapshot.integrityNotes.some((note) => note.toLowerCase().includes("block"))) return "critical";
  if (snapshot.blockedOrErrorNodeIds.length > 0) return "high";
  if (snapshot.nodeCount === 0 || snapshot.integrityNotes.length > 0) return "medium";
  return "low";
}

export function normalizeSnapshotRestoreSnapshotSummary(
  snapshot: BrainSnapshotModel | SnapshotRestoreSnapshotSummary
): SnapshotRestoreSnapshotSummary {
  if ("snapshotId" in snapshot) {
    return {
      ...snapshot,
      summary: [...snapshot.summary],
    };
  }

  return {
    snapshotId: snapshot.id,
    label: snapshot.label,
    graphVersion: snapshot.graphVersion,
    nodeCount: snapshot.nodeCount,
    edgeCount: snapshot.edgeCount,
    memoryNodeCount: snapshot.memoryNodeCount,
    taskNodeCount: snapshot.taskNodeCount,
    conceptNodeCount: snapshot.conceptNodeCount,
    executionNodeCount: snapshot.executionNodeCount,
    integrityNoteCount: snapshot.integrityNotes.length,
    riskLevel: riskFromSnapshot(snapshot),
    summary: [
      `Snapshot ${snapshot.id} contains ${snapshot.nodeCount} node(s) and ${snapshot.edgeCount} edge(s).`,
      `Canonical schema path: ${snapshot.canonicalSchemaPath}.`,
      snapshot.noMutationGuarantee,
    ],
  };
}

export function buildSnapshotRestoreCandidate(input: SnapshotRestoreCandidateInput): SnapshotRestoreCandidate {
  const sourceSnapshotSummary = normalizeSnapshotRestoreSnapshotSummary(input.sourceSnapshot);
  const targetSnapshotSummary = normalizeSnapshotRestoreSnapshotSummary(input.targetSnapshot);
  const restoreScope: SnapshotRestoreScope = isSnapshotRestoreScope(String(input.restoreScope ?? ""))
    ? input.restoreScope as SnapshotRestoreScope
    : "governance-review-only";
  const relatedJournalIds = uniqueSnapshotRestoreStrings(input.relatedJournalIds);
  const operatorReason = String(input.operatorReason ?? "Review snapshot restore candidate without execution.").trim();
  const id = buildSnapshotRestoreStableKey(
    "snapshot-restore-candidate",
    sourceSnapshotSummary.snapshotId,
    targetSnapshotSummary.snapshotId,
    restoreScope
  );

  return {
    id,
    sourceSnapshotId: sourceSnapshotSummary.snapshotId,
    targetSnapshotId: targetSnapshotSummary.snapshotId,
    sourceSnapshotSummary,
    targetSnapshotSummary,
    selectedGraphVersion: sourceSnapshotSummary.graphVersion,
    canonicalSchemaPath: SNAPSHOT_RESTORE_GATE_CANONICAL_SCHEMA_PATH,
    restoreScope,
    operatorReason,
    ...(input.relatedReplayId ? { relatedReplayId: String(input.relatedReplayId).trim() } : {}),
    ...(input.relatedGovernanceId ? { relatedGovernanceId: String(input.relatedGovernanceId).trim() } : {}),
    relatedJournalIds,
    noRestoreGuarantee: true,
    summary: [
      `Restore candidate ${id} maps source snapshot ${sourceSnapshotSummary.snapshotId} to target/live snapshot ${targetSnapshotSummary.snapshotId}.`,
      `Restore scope is ${restoreScope}; this is preview-only and no restore occurs.`,
      "No graph mutation, no saveBrainGraph from UI, no appendEvent, no filesystem reads, and no automatic persistence.",
    ],
  };
}

export function validateSnapshotRestoreCandidate(candidate: SnapshotRestoreCandidate): SnapshotRestoreCandidateValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!candidate.sourceSnapshotId) blockedReasons.push("Source snapshot id is required.");
  if (!candidate.targetSnapshotId) blockedReasons.push("Target/live snapshot id is required.");
  if (candidate.sourceSnapshotId === candidate.targetSnapshotId) warnings.push("Source and target/live snapshot are the same.");
  if (candidate.canonicalSchemaPath !== SNAPSHOT_RESTORE_GATE_CANONICAL_SCHEMA_PATH) blockedReasons.push("Unknown schema blocked.");
  if (!candidate.noRestoreGuarantee) blockedReasons.push("No-restore guarantee is required.");
  if (!candidate.operatorReason.trim()) warnings.push("Operator reason is empty.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Restore candidate is valid for review." : "Restore candidate is blocked.",
      `${warnings.length} warning(s) require review.`,
      "Candidate validation does not restore snapshots or mutate the live Brain graph.",
    ],
  };
}

export function summarizeSnapshotRestoreCandidate(candidate: SnapshotRestoreCandidate): string[] {
  return [
    ...candidate.summary,
    `Source summary: ${candidate.sourceSnapshotSummary.nodeCount} node(s), ${candidate.sourceSnapshotSummary.edgeCount} edge(s), risk ${candidate.sourceSnapshotSummary.riskLevel}.`,
    `Target/live summary: ${candidate.targetSnapshotSummary.nodeCount} node(s), ${candidate.targetSnapshotSummary.edgeCount} edge(s), risk ${candidate.targetSnapshotSummary.riskLevel}.`,
    "No-restore guarantee is active.",
  ];
}
