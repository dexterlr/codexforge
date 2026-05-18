import type {
  RuntimeReplayImpactAnalysis,
  RuntimeReplayImpactCategory,
  RuntimeReplayImpactItem,
  RuntimeReplayRiskLevel,
  RuntimeReplaySimulation,
  RuntimeReplaySimulationStep,
} from "./runtime-event-replay-types";
import { buildRuntimeEventReplayStableKey } from "./runtime-event-replay-types";

function categoryForStep(step: RuntimeReplaySimulationStep): RuntimeReplayImpactCategory {
  if (step.eventType === "memory.promoted") return "memory-promoted";
  if (step.eventType === "concept.synthesized") return "concept-synthesized";
  if (step.eventType === "task.updated" || step.eventType === "task.created") return "task-updated";
  if (step.eventType.startsWith("execution.") || step.eventType === "diff.generated") return "execution-linked";
  if (step.nodeDelta > 0) return "node-created";
  if (step.nodeDelta === 0 && step.edgeDelta === 0 && step.status === "simulated") return "node-unchanged";
  if (step.edgeDelta > 0) return "edge-created";
  if (step.status === "blocked" || step.status === "error") return "unknown-impact";
  return "unknown-impact";
}

function riskLevelForImpact(category: RuntimeReplayImpactCategory, step: RuntimeReplaySimulationStep): RuntimeReplayRiskLevel {
  if (step.status === "blocked" || step.status === "error") return "blocker";
  if (category === "memory-promoted" || category === "concept-synthesized") return "risk";
  if (Math.abs(step.nodeDelta) > 2 || Math.abs(step.edgeDelta) > 2) return "warning";
  return "info";
}

export function buildRuntimeReplayImpactItem(
  input: Partial<RuntimeReplayImpactItem> & {
    eventId: string;
    eventType: string;
    category?: RuntimeReplayImpactCategory;
  }
): RuntimeReplayImpactItem {
  const category = input.category ?? "unknown-impact";
  const riskLevel = input.riskLevel ?? (category === "unknown-impact" ? "warning" : "info");
  return {
    id: input.id ?? buildRuntimeEventReplayStableKey("runtime-replay-impact", input.eventId, category),
    category,
    eventId: input.eventId,
    eventType: input.eventType,
    graphArea: input.graphArea ?? "unknown graph area",
    beforeSummary: input.beforeSummary ?? "No before summary supplied.",
    afterSummary: input.afterSummary ?? "No after summary supplied.",
    delta: input.delta ?? 0,
    riskLevel,
    reviewRequired: input.reviewRequired ?? riskLevel !== "info",
  };
}

function impactFromStep(step: RuntimeReplaySimulationStep): RuntimeReplayImpactItem {
  const category = categoryForStep(step);
  const riskLevel = riskLevelForImpact(category, step);
  const delta = Math.abs(step.nodeDelta) + Math.abs(step.edgeDelta);
  return buildRuntimeReplayImpactItem({
    category,
    eventId: step.eventId,
    eventType: step.eventType,
    graphArea: step.expectedReducerArea,
    beforeSummary: `${step.before.nodeCount} node(s), ${step.before.edgeCount} edge(s).`,
    afterSummary: `${step.after.nodeCount} node(s), ${step.after.edgeCount} edge(s).`,
    delta,
    riskLevel,
    reviewRequired: riskLevel !== "info" || category === "memory-promoted",
  });
}

export function buildRuntimeReplayImpactAnalysis(
  simulation: RuntimeReplaySimulation
): RuntimeReplayImpactAnalysis {
  const items = simulation.steps.map(impactFromStep);
  const nodeDelta = simulation.after.nodeCount - simulation.before.nodeCount;
  const edgeDelta = simulation.after.edgeCount - simulation.before.edgeCount;
  const analysis: RuntimeReplayImpactAnalysis = {
    id: "runtime-replay-impact-analysis",
    items,
    nodeDelta,
    edgeDelta,
    memoryPromotionCount: items.filter((item) => item.category === "memory-promoted").length,
    reviewRequiredCount: items.filter((item) => item.reviewRequired).length,
    summary: [],
  };

  return { ...analysis, summary: summarizeRuntimeReplayImpactAnalysis(analysis) };
}

export function summarizeRuntimeReplayImpactAnalysis(
  analysis: RuntimeReplayImpactAnalysis
): string[] {
  return [
    `${analysis.items.length} replay impact item(s) detected.`,
    `Node delta ${analysis.nodeDelta}; edge delta ${analysis.edgeDelta}.`,
    `${analysis.memoryPromotionCount} memory-promoted impact(s) and ${analysis.reviewRequiredCount} review-required impact(s).`,
    "Impact categories include node-created, node-updated, node-unchanged, edge-created, edge-updated, edge-unchanged, memory-promoted, concept-synthesized, task-updated, execution-linked, and unknown-impact.",
  ];
}
