import {
  buildTaskAutopilotStableKey,
  clampTaskConfidence,
  type TaskSignal,
  type TaskSignalExtractorInput,
  type TaskSignalInput,
  type TaskSignalSourceType,
  type TaskSignalSummary,
} from "./task-autopilot-types";
import { calculateFileRisk } from "@/lib/codexforge/files/file-risk";

function uniq(values: string[] = []): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function hasRisk(text: string): boolean {
  const normalized = text.toLowerCase();
  return ["risk", "blocked", "critical", "failing", "error", "unsafe", "stale", "contradiction"].some((term) =>
    normalized.includes(term)
  );
}

export function buildTaskSignal(input: TaskSignalInput): TaskSignal {
  const title = input.title.trim() || input.sourceId;
  const summary = input.summary.trim() || title;

  return {
    id: buildTaskAutopilotStableKey("task-signal", input.sourceType, input.sourceId, title),
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    title,
    summary,
    tags: uniq(input.tags),
    filePaths: uniq(input.filePaths),
    relatedMemoryIds: uniq(input.relatedMemoryIds),
    relatedArtifactIds: uniq(input.relatedArtifactIds),
    relatedRunIds: uniq(input.relatedRunIds),
    riskHints: uniq(input.riskHints),
    urgencyHints: uniq(input.urgencyHints),
    confidence: clampTaskConfidence(input.confidence),
  };
}

export function buildTaskSignals(input: TaskSignalExtractorInput = {}): TaskSignal[] {
  const signals: TaskSignal[] = [];

  input.brainRecall?.results.forEach((result) => {
    signals.push(
      buildTaskSignal({
        sourceType: "brain-recall",
        sourceId: result.id,
        title: result.title,
        summary: result.snippet,
        tags: [result.kind, result.status, result.importance],
        filePaths: result.relatedContext.files.map((file) => file.path),
        relatedMemoryIds: [result.nodeId, ...result.relatedContext.neighbors.map((node) => node.nodeId)],
        relatedArtifactIds: result.relatedContext.artifacts.map((artifact) => artifact.artifactId),
        relatedRunIds: result.relatedContext.runs.map((run) => run.runId),
        riskHints: result.reasons.filter(hasRisk),
        urgencyHints: result.importance === "critical" ? ["critical memory"] : [],
        confidence: Math.min(result.score / 100, 1),
      })
    );
  });

  input.chatRecall?.context.blocks.forEach((block) => {
    signals.push(
      buildTaskSignal({
        sourceType: "chat-recall",
        sourceId: block.id,
        title: block.memoryTitle,
        summary: block.instruction,
        tags: [block.confidence, block.staleWarning.stale ? "stale-memory" : "current-memory"],
        filePaths: block.relatedFiles,
        relatedMemoryIds: [block.nodeId],
        relatedArtifactIds: block.relatedArtifacts,
        relatedRunIds: block.relatedRuns,
        riskHints: block.staleWarning.reasons,
        urgencyHints: block.staleWarning.stale ? ["verify stale memory before use"] : [],
        confidence: block.confidence === "strong" ? 0.82 : 0.48,
      })
    );
  });

  input.memoryQueue?.items.forEach((item) => {
    signals.push(
      buildTaskSignal({
        sourceType: "memory-candidate",
        sourceId: item.id,
        title: item.title,
        summary: item.content,
        tags: [item.importance, item.reviewState, ...item.tags],
        filePaths: item.sourceFileId ? [item.sourceFileId] : [],
        relatedMemoryIds: [item.candidateId],
        relatedArtifactIds: item.sourceArtifactId ? [item.sourceArtifactId] : [],
        relatedRunIds: item.sourceRunId ? [item.sourceRunId] : [],
        riskHints: item.contradictionRisk >= 0.5 ? ["contradiction risk"] : [],
        urgencyHints: item.importance === "critical" ? ["critical memory candidate"] : [],
        confidence: item.confidence,
      })
    );
  });

  const files = input.filesContext?.files ?? (input.selectedFile ? [input.selectedFile] : []);
  files.forEach((file) => {
    const fileRisk = calculateFileRisk(file);
    signals.push(
      buildTaskSignal({
        sourceType: "files-intelligence",
        sourceId: file.path,
        title: file.name,
        summary: file.summary,
        tags: [file.kind, fileRisk.level, ...file.tags],
        filePaths: [file.path],
        relatedMemoryIds: file.relatedMemory,
        riskHints: fileRisk.level === "critical" || fileRisk.level === "high" ? [`${fileRisk.level} file risk`] : [],
        urgencyHints: file.tags.includes("smoke") || file.tags.includes("test") ? ["test surface"] : [],
        confidence: 0.72,
      })
    );
  });

  if (input.patchPreview) {
    signals.push(
      buildTaskSignal({
        sourceType: "patch-preview",
        sourceId: input.patchPreview.id,
        title: `Patch preview for ${input.patchPreview.selectedFilePath}`,
        summary: input.patchPreview.nextAction,
        tags: [input.patchPreview.riskLevel, "safe-patch-preview"],
        filePaths: [input.patchPreview.selectedFilePath, ...input.patchPreview.expectedTouchedFiles],
        riskHints: input.patchPreview.riskBoard.signals.map((signal) => signal.summary),
        urgencyHints: input.patchPreview.approvalBoundary.futureApprovalRequired ? ["approval required"] : [],
        confidence: 0.78,
      })
    );
  }

  input.missionControl?.nextActions.forEach((action) => {
    signals.push(
      buildTaskSignal({
        sourceType: "mission-control",
        sourceId: action.id,
        title: action.label,
        summary: action.safetyNote,
        tags: [action.readiness, action.priority],
        riskHints: action.readiness === "future-gated" ? ["future capability gated"] : [],
        urgencyHints: action.priority === "primary" ? ["primary mission action"] : [],
        confidence: action.priority === "primary" ? 0.76 : 0.62,
      })
    );
  });

  input.artifactHints?.forEach((hint) => signals.push(buildTaskSignal({ ...hint, sourceType: "artifact-hint" })));

  return signals.sort((a, b) => a.id.localeCompare(b.id));
}

export function summarizeTaskSignals(signals: TaskSignal[]): TaskSignalSummary {
  const sourceTypes = Array.from(
    signals.reduce<Map<TaskSignalSourceType, number>>((counts, signal) => {
      counts.set(signal.sourceType, (counts.get(signal.sourceType) ?? 0) + 1);
      return counts;
    }, new Map())
  )
    .map(([sourceType, count]) => ({ sourceType, count }))
    .sort((a, b) => a.sourceType.localeCompare(b.sourceType));

  const filePathCount = new Set(signals.flatMap((signal) => signal.filePaths)).size;
  const highRiskCount = signals.filter((signal) => signal.riskHints.length > 0).length;

  return {
    id: "task-signal-summary",
    signalCount: signals.length,
    sourceTypes,
    highRiskCount,
    filePathCount,
    summary: [
      `${signals.length} task signals extracted from visible local context.`,
      `${filePathCount} impacted files are referenced by signals.`,
      `${highRiskCount} signals include risk hints and require operator review.`,
    ],
  };
}
