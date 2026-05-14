import type { OperatorRun, OperatorRunInput, OperatorRunQueue } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";
import { buildOperatorRun } from "./run-summary";

export function enqueueRunPreview(queue: OperatorRunQueue, input: OperatorRunInput): OperatorRunQueue {
  return buildRunQueue([...queue.runs, buildOperatorRun(input)]);
}

export function sortRunQueue(runs: OperatorRun[]): OperatorRun[] {
  const rank = { blocked: 0, "waiting-approval": 1, preview: 2, draft: 3, simulated: 4, "completed-preview": 5, "failed-preview": 6 };
  return [...runs].sort((a, b) => {
    const statusDelta = rank[a.status] - rank[b.status];
    if (statusDelta !== 0) return statusDelta;
    return a.id.localeCompare(b.id);
  });
}

export function buildRunQueue(inputs: OperatorRunInput[] = defaultRunInputs): OperatorRunQueue {
  const runs = sortRunQueue(inputs.map((input) => buildOperatorRun(input)));
  const blockedCount = runs.filter((run) => run.status === "blocked").length;
  const approvalRequiredCount = runs.filter((run) => run.approvalState === "required").length;
  const previewableCount = runs.filter((run) => run.policyBoundary.previewAllowed).length;
  return {
    id: buildOperatorRunReactKey("operator-run-queue", runs.map((run) => run.id).join("|")),
    runs,
    summary: summarizeRunQueue(runs),
    blockedCount,
    approvalRequiredCount,
    previewableCount,
  };
}

export function summarizeRunQueue(runsOrQueue: OperatorRun[] | OperatorRunQueue): string {
  const runs = Array.isArray(runsOrQueue) ? runsOrQueue : runsOrQueue.runs;
  return `${runs.length} queued previews; ${runs.filter((run) => run.status === "blocked").length} blocked; ${runs.filter((run) => run.approvalState === "required").length} awaiting approval.`;
}

export const defaultRunInputs: OperatorRunInput[] = [
  {
    id: "creative-render-preview",
    title: "Creative render manifest preview",
    sourceSurface: "creative",
    capabilityId: "rendering",
    toolName: "render-job",
    sourcePrompt: "Prepare a preview render queue manifest for the current creative plan.",
    selectedTarget: "Creative Production Studio",
  },
  {
    id: "capability-blender-boundary",
    title: "Blender adapter approval boundary",
    sourceSurface: "capabilities",
    capabilityId: "blender",
    toolName: "blender-python",
    sourcePrompt: "Preview a Blender automation handoff without launching Blender.",
    selectedTarget: "Capability Cockpit",
  },
  {
    id: "trading-broker-blocked",
    title: "Trading execution blocked preview",
    sourceSurface: "chat",
    capabilityId: "trading-execution",
    toolName: "broker-execution",
    sourcePrompt: "Show why live broker execution is blocked.",
    selectedTarget: "Trading safety boundary",
  },
];
