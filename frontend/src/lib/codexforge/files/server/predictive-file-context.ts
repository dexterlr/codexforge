import {
  buildPredictiveContext,
  buildPredictiveContextFixtureEvents,
  buildPredictiveContextFixtureGraph,
} from "@/lib/codexforge/brain/runtime";
import type {
  CodexForgeFileNode,
  CodexForgeFileRiskLevel,
  CodexForgeFileRiskSummary,
  CodexForgeFilesApiResponse,
} from "../types";

type PredictiveFileContextInput = {
  selectedFile: CodexForgeFileNode;
  relatedFiles: CodexForgeFileNode[];
  risks: Record<string, CodexForgeFileRiskSummary>;
};

function riskLevelFor(
  risks: Record<string, CodexForgeFileRiskSummary>,
  path: string
): CodexForgeFileRiskLevel | undefined {
  return risks[path]?.level;
}

export function buildPredictiveFileContextSummary({
  selectedFile,
  relatedFiles,
  risks,
}: PredictiveFileContextInput): NonNullable<CodexForgeFilesApiResponse["predictiveContext"]> {
  const predictive = buildPredictiveContext({
    graph: buildPredictiveContextFixtureGraph(),
    events: buildPredictiveContextFixtureEvents(),
    fileIntelligence: [selectedFile, ...relatedFiles].map((file) => ({
      path: file.path,
      summary: file.summary,
      concepts: file.concepts,
      riskLevel: riskLevelFor(risks, file.path),
    })),
    activeFocus: {
      filePath: selectedFile.path,
      text: [selectedFile.summary, selectedFile.architectureRole, ...selectedFile.concepts].join(" "),
    },
    limit: 12,
  });

  return {
    sourceLabel: "Predictive context runtime",
    predictedIntent: predictive.predictedIntent.route,
    contextConfidence: predictive.contextConfidence,
    architectureRole: `${predictive.architecturalConcepts.subsystem}: ${selectedFile.architectureRole}`,
    relatedFiles: predictive.relevantFiles
      .map((signal) => signal.ref?.path ?? signal.label)
      .filter(Boolean)
      .slice(0, 5),
    relatedMemories: predictive.relevantMemories.map((signal) => signal.label).slice(0, 5),
    relatedTasks: predictive.relevantTasks.map((signal) => signal.label).slice(0, 5),
    taskFocus: predictive.taskFocus.activeGoal,
    contextReasons: predictive.explanation,
    signals: predictive.signals.slice(0, 8).map((signal) => ({
      id: signal.id,
      kind: signal.kind,
      label: signal.label,
      score: signal.score,
      confidence: signal.confidence,
      reasons: signal.reasons,
    })),
    risks: predictive.risks.slice(0, 5).map((item) => ({
      id: item.id,
      label: item.label,
      severity: item.severity,
      score: item.score,
      confidence: item.confidence,
      reasons: item.reasons,
      nextSafeAction: item.nextSafeAction,
    })),
    riskHints: [
      ...predictive.architecturalConcepts.risks,
      ...predictive.risks.map((item) => item.label),
    ].slice(0, 5),
    nextSafeActions: predictive.likelyNextSafeActions.length
      ? predictive.likelyNextSafeActions.map((signal) => signal.label)
      : [predictive.taskFocus.nextSafeAction],
  };
}
