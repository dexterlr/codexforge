import type { RenderQueueControl, RenderQueueControlId } from "./local-render-queue-types";

const CONTROL_COPY: Record<RenderQueueControlId, string> = {
  review: "Open the item for review before any future run.",
  hold: "Mark that the item should wait in the preview.",
  prioritize: "Move the item higher in a future plan, not a real queue.",
  "remove-from-preview": "Hide the item from the preview list without deleting files.",
  "retry-plan": "Create a safer retry plan after a supplied failure.",
  "cancel-future-job": "Model how cancel would work later; no process is controlled here.",
  "pause-future-queue": "Model a future pause; no local queue is paused.",
  "resume-future-queue": "Model a future resume; no local queue is resumed.",
};

export function buildRenderQueueControl(control: RenderQueueControlId, input: Partial<RenderQueueControl> = {}): RenderQueueControl {
  return {
    id: control,
    label: input.label ?? control,
    plainEnglish: input.plainEnglish ?? CONTROL_COPY[control],
    previewOnly: true,
    destructive: false,
  };
}
