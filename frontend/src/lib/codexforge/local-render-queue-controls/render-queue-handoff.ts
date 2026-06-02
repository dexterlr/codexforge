import type { RenderQueueHandoff } from "./local-render-queue-types";

export function buildRenderQueueHandoff(input: Partial<RenderQueueHandoff> = {}): RenderQueueHandoff {
  return {
    id: input.id ?? "render-queue-handoff",
    copyLabel: input.copyLabel ?? "Copy queue handoff allowed",
    nextStep: input.nextStep ?? "Review queue items, worker strategy, scheduler order, health gate status, dry run status, and submit boundary status before any approved local execution exists.",
    safetyNote: input.safetyNote ?? "This handoff is copy-only. It does not mutate a queue, delete files, or control a process.",
  };
}
