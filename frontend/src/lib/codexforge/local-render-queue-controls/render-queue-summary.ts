import type { RenderQueueControlId, RenderQueueStateId, RenderQueueSummary } from "./local-render-queue-types";
import { buildRenderQueueControl } from "./render-queue-control";
import { buildRenderQueueHandoff } from "./render-queue-handoff";
import { buildDefaultRenderQueueItems } from "./render-queue-item";
import { buildRenderQueuePolicy } from "./render-queue-policy";
import { buildRenderQueueSafety } from "./render-queue-safety";
import { buildRenderQueueState } from "./render-queue-state";

const STATES: RenderQueueStateId[] = [
  "empty",
  "draft",
  "needs-review",
  "approved-preview-only",
  "held",
  "blocked",
  "future-running",
  "complete-supplied",
  "failed-supplied",
];

const CONTROLS: RenderQueueControlId[] = [
  "review",
  "hold",
  "prioritize",
  "remove-from-preview",
  "retry-plan",
  "cancel-future-job",
  "pause-future-queue",
  "resume-future-queue",
];

export function buildRenderQueueSummary(): RenderQueueSummary {
  const summary: RenderQueueSummary = {
    items: buildDefaultRenderQueueItems(),
    states: STATES.map((state) => buildRenderQueueState(state)),
    controls: CONTROLS.map((control) => buildRenderQueueControl(control)),
    policy: buildRenderQueuePolicy(),
    safety: buildRenderQueueSafety(),
    handoff: buildRenderQueueHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeRenderQueueControls(summary) };
}

export function summarizeRenderQueueControls(summary: RenderQueueSummary): string {
  return `${summary.items.length} queue items, ${summary.controls.length} preview-only controls, no real queue mutation or job execution.`;
}
