import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRankedMemory,
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";

export type CodexForgeTaskFocus = {
  activeGoal: string;
  likelyNextTask: string;
  blockers: string[];
  pendingValidations: string[];
  nextSafeAction: string;
  confidence: number;
  reasons: string[];
};

export type CodexForgeTaskFocusInput = {
  graph?: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  memorySignals?: readonly CodexForgeBrainRankedMemory[];
  filePath?: string;
};

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function dataValue(node: { data: unknown } | undefined, key: string): unknown {
  return node && typeof node.data === "object" && node.data
    ? (node.data as Record<string, unknown>)[key]
    : undefined;
}

export function deriveTaskFocus(input: CodexForgeTaskFocusInput): CodexForgeTaskFocus {
  const taskEvents = (input.events ?? []).filter(
    (event) => event.type === "task.created" || event.type === "task.updated"
  );
  const latestTask = [...taskEvents].sort(
    (a, b) => b.ts - a.ts || a.id.localeCompare(b.id)
  )[0];
  const activeTaskNode = (input.graph?.nodes ?? [])
    .filter((node) => node.kind === "task" && node.meta.status !== "done")
    .sort(
      (a, b) =>
        (b.meta.updatedAt ?? 0) - (a.meta.updatedAt ?? 0) || a.id.localeCompare(b.id)
    )[0];
  const activeGoal =
    (latestTask?.type === "task.created" ? latestTask.payload.goal : undefined) ??
    text(dataValue(activeTaskNode, "goal")) ??
    text(dataValue(input.memorySignals?.[0]?.node, "summary")) ??
    (input.filePath ? `Understand ${input.filePath}` : "Assemble predictive runtime context");

  const blockers = [
    ...(input.events ?? [])
      .filter((event) => event.type === "failure.detected")
      .map((event) => event.payload.message),
    ...(input.graph?.nodes ?? [])
      .filter((node) => node.meta.status === "blocked" || node.meta.status === "error")
      .map((node) => `${node.kind}:${node.id}:${node.meta.status}`),
  ].slice(0, 6);
  const pendingValidations = Array.from(
    new Set(
      [
        input.filePath?.includes("scripts/") ? "Run changed smoke script." : "",
        input.filePath?.includes("/brain/runtime/") ? "Run brain runtime smoke." : "",
        input.filePath?.includes("/files/") ? "Run Files runtime smoke." : "",
        "Run build before handoff.",
      ].filter(Boolean)
    )
  ).sort();
  const updatedNextAction =
    latestTask?.type === "task.updated" ? latestTask.payload.nextAction : undefined;
  const likelyNextTask =
    updatedNextAction ??
    text(dataValue(activeTaskNode, "nextAction")) ??
    pendingValidations[0] ??
    "Inspect related context before editing.";

  return {
    activeGoal,
    likelyNextTask,
    blockers,
    pendingValidations,
    nextSafeAction:
      blockers.length > 0
        ? "Resolve the highest-confidence blocker before mutating runtime state."
        : likelyNextTask,
    confidence: Math.min(
      1,
      Number((0.45 + (latestTask ? 0.2 : 0) + (activeTaskNode ? 0.2 : 0) + (input.filePath ? 0.15 : 0)).toFixed(4))
    ),
    reasons: [
      latestTask ? `latest-task-event:${latestTask.type}` : "",
      activeTaskNode ? `active-task-node:${activeTaskNode.id}` : "",
      input.filePath ? "file-focus" : "",
      blockers.length ? "blockers-present" : "no-blockers",
    ].filter(Boolean).sort(),
  };
}

export function summarizeTaskFocus(focus: CodexForgeTaskFocus): string {
  return `Goal: ${focus.activeGoal}. Next: ${focus.nextSafeAction}. Blockers: ${focus.blockers.length}.`;
}
