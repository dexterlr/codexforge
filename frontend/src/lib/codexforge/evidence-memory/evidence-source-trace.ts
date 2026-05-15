import {
  buildEvidenceMemoryStableKey,
  uniqueEvidenceMemoryStrings,
  type EvidenceBrainMergeCandidate,
  type EvidenceMemoryCandidate,
  type EvidenceSourceTrace,
  type EvidenceSourceTraceItem,
  type NormalizedEvidenceBundle,
  type NormalizedEvidenceItem,
} from "./evidence-memory-types";

export function buildEvidenceSourceTraceItem(args: {
  evidence: NormalizedEvidenceItem;
  candidates?: readonly EvidenceMemoryCandidate[];
  brainMergeCandidate?: EvidenceBrainMergeCandidate | null;
}): EvidenceSourceTraceItem {
  const memoryCandidateIds = (args.candidates ?? [])
    .filter((candidate) => candidate.sourceEvidenceIds.includes(args.evidence.id))
    .map((candidate) => candidate.id)
    .sort();
  const futureBrainMergeEventIds = (args.brainMergeCandidate?.events ?? [])
    .filter((event) => memoryCandidateIds.includes(event.candidateId))
    .map((event) => event.eventId)
    .sort();
  const filePaths = uniqueEvidenceMemoryStrings([args.evidence.filePath]);
  const item: EvidenceSourceTraceItem = {
    id: buildEvidenceMemoryStableKey("evidence-source-trace", args.evidence.id),
    taskId: args.evidence.relatedTaskId,
    stepId: args.evidence.relatedStepId,
    executionRequestId: args.evidence.sourceRequestId,
    executionResultId: args.evidence.sourceExecutionId,
    toolName: args.evidence.toolName,
    evidenceIds: [args.evidence.id],
    filePaths,
    memoryCandidateIds,
    futureBrainMergeEventIds,
    summary: [],
  };

  return {
    ...item,
    summary: [
      `Trace connects task ${item.taskId ?? "unknown"} and step ${item.stepId ?? "unknown"}.`,
      `Execution request ${item.executionRequestId}; result ${item.executionResultId}; tool ${item.toolName}.`,
      `${item.evidenceIds.length} evidence id(s), ${item.memoryCandidateIds.length} memory candidate id(s), ${item.futureBrainMergeEventIds.length} future Brain merge event id(s).`,
    ],
  };
}

export function buildEvidenceSourceTrace(args: {
  evidence: NormalizedEvidenceBundle | readonly NormalizedEvidenceItem[];
  candidates?: readonly EvidenceMemoryCandidate[];
  brainMergeCandidate?: EvidenceBrainMergeCandidate | null;
}): EvidenceSourceTrace {
  const items = "items" in args.evidence ? args.evidence.items : args.evidence;
  const traceItems = items.map((evidence) =>
    buildEvidenceSourceTraceItem({
      evidence,
      candidates: args.candidates,
      brainMergeCandidate: args.brainMergeCandidate,
    })
  );
  const trace: EvidenceSourceTrace = {
    id: "evidence-source-trace",
    items: traceItems,
    summary: [],
  };

  return { ...trace, summary: summarizeEvidenceSourceTrace(trace) };
}

export function summarizeEvidenceSourceTrace(trace: EvidenceSourceTrace): string[] {
  const evidenceIds = uniqueEvidenceMemoryStrings(trace.items.flatMap((item) => item.evidenceIds));
  const memoryIds = uniqueEvidenceMemoryStrings(trace.items.flatMap((item) => item.memoryCandidateIds));
  const eventIds = uniqueEvidenceMemoryStrings(trace.items.flatMap((item) => item.futureBrainMergeEventIds));
  const filePaths = uniqueEvidenceMemoryStrings(trace.items.flatMap((item) => item.filePaths));

  return [
    `Source trace connects ${evidenceIds.length} evidence id(s) to ${memoryIds.length} memory candidate id(s).`,
    `${filePaths.length} file path(s) are linked without reading files.`,
    `${eventIds.length} future Brain merge event preview id(s) are traceable.`,
    "Trace is preview data only and performs no persistence writes.",
  ];
}
