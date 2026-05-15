import {
  buildEvidenceMemoryStableKey,
  sourceRefKey,
  uniqueEvidenceMemoryStrings,
  type EvidenceBrainMergeCandidate,
  type EvidenceBrainMergeEventPreview,
  type EvidenceMemoryCandidate,
  type EvidenceMemorySourceRef,
} from "./evidence-memory-types";

function sourceRefsForCandidate(candidate: EvidenceMemoryCandidate): EvidenceMemorySourceRef[] {
  const refs: EvidenceMemorySourceRef[] = [
    { type: "memory-candidate", id: candidate.id, label: "Evidence memory candidate" },
    ...candidate.sourceEvidenceIds.map((id) => ({
      type: "read-only-evidence" as const,
      id,
      label: "Read-only evidence",
    })),
    ...candidate.sourceExecutionIds.map((id) => ({
      type: "execution-result" as const,
      id,
      label: "Read-only execution result",
    })),
    ...(candidate.relatedTaskId ? [{ type: "task" as const, id: candidate.relatedTaskId, label: "Task" }] : []),
    ...(candidate.relatedStepId ? [{ type: "step" as const, id: candidate.relatedStepId, label: "Step" }] : []),
    ...candidate.relatedFilePaths.map((path) => ({
      type: "file" as const,
      id: path,
      label: "File path",
    })),
  ];
  const byKey = new Map<string, EvidenceMemorySourceRef>();

  for (const ref of refs) {
    byKey.set(sourceRefKey(ref), ref);
  }

  return Array.from(byKey.values()).sort((left, right) => sourceRefKey(left).localeCompare(sourceRefKey(right)));
}

export function buildEvidenceBrainMergeEventPreview(
  candidate: EvidenceMemoryCandidate
): EvidenceBrainMergeEventPreview {
  const eventId = buildEvidenceMemoryStableKey("evidence-memory-promoted-preview", candidate.id);
  const sourceRefs = sourceRefsForCandidate(candidate);
  const blockedReasons = uniqueEvidenceMemoryStrings([
    "Preview only; Brain merge review required.",
    "Candidate is not an approved persisted memory event.",
    "Review required before memory promotion.",
    "No graph mutation from evidence UI.",
    ...candidate.blockedReasons,
  ]);
  const event: EvidenceBrainMergeEventPreview = {
    id: buildEvidenceMemoryStableKey("evidence-brain-merge-event-preview", candidate.id),
    eventId,
    type: "memory.promoted",
    candidateId: candidate.id,
    approved: false,
    reviewState: candidate.reviewState,
    content: candidate.content,
    confidence: candidate.confidence,
    importance: candidate.importance,
    sourceRefs,
    payload: {
      memoryId: buildEvidenceMemoryStableKey("memory", candidate.id),
      candidateId: candidate.id,
      content: candidate.content,
      memoryType: "note",
      importance: candidate.importance,
      confidence: candidate.confidence,
      reviewState: candidate.reviewState,
      tags: candidate.suggestedTags,
      sourceRefs,
      safetyNote: "Evidence Brain merge candidate is preview-only; no graph mutation is performed.",
    },
    previewOnly: true,
    applied: false,
    blockedReasons,
    summary: [],
  };

  return {
    ...event,
    summary: [
      `${event.type} preview event ${event.eventId}.`,
      "Brain merge candidate is preview-only and not approved.",
      "Brain merge review required before any future graph merge.",
      "No graph mutation occurs from evidence UI.",
    ],
  };
}

export function buildEvidenceBrainMergeCandidate(
  candidates: EvidenceMemoryCandidate | readonly EvidenceMemoryCandidate[]
): EvidenceBrainMergeCandidate {
  const list = Array.isArray(candidates) ? [...candidates] : [candidates];
  const events = list.map(buildEvidenceBrainMergeEventPreview);
  const blockedReasons = uniqueEvidenceMemoryStrings([
    "Brain merge candidate is preview-only.",
    "Brain merge review required.",
    "Evidence memory candidates are not persisted memory events.",
    "No graph mutation from evidence UI.",
    ...events.flatMap((event) => event.blockedReasons),
  ]);
  const candidate: EvidenceBrainMergeCandidate = {
    id: "evidence-brain-merge-candidate",
    candidateIds: list.map((item) => item.id).sort(),
    events,
    allowed: false,
    previewOnly: true,
    approvalBoundary: "Brain merge review required",
    safetyNote: "Preview only: no Brain graph write, no automatic merge, and no persistence.",
    blockedReasons,
    summary: [],
  };

  return { ...candidate, summary: summarizeEvidenceBrainMergeCandidate(candidate) };
}

export function summarizeEvidenceBrainMergeCandidate(
  candidate: EvidenceBrainMergeCandidate
): string[] {
  return [
    `${candidate.events.length} preview-only memory.promoted event(s) prepared for review.`,
    candidate.approvalBoundary,
    candidate.safetyNote,
    "Events are compatible with the memory.promoted shape where practical but remain unapproved.",
  ];
}
