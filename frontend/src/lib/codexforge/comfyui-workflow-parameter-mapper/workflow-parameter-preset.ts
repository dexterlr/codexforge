import type { WorkflowParameterPreset } from "./workflow-parameter-types";

export function buildWorkflowParameterPreset(input: Partial<WorkflowParameterPreset> = {}): WorkflowParameterPreset {
  return {
    id: input.id ?? "workflow-parameter-preset-first-safe-draft",
    label: input.label ?? "First safe draft",
    plainEnglish: input.plainEnglish ?? "Small, short, and reviewable settings for a future approved local draft.",
    lockedValues: input.lockedValues ?? ["small resolution", "short duration", "batch count stays one", "artifact path reviewed"],
  };
}
