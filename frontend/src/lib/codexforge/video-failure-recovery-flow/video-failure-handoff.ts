import type { VideoFailureHandoff } from "./video-failure-recovery-types";

export function buildVideoFailureHandoff(input: Partial<VideoFailureHandoff> = {}): VideoFailureHandoff {
  return {
    id: input.id ?? "video-failure-handoff",
    copyLabel: input.copyLabel ?? "Copy retry plan allowed",
    nextStep: input.nextStep ?? "Next: fix the safest likely cause, rebuild the package, then request approval later.",
    safetyNote: input.safetyNote ?? "Recovery does not auto-retry, run a workflow, call ComfyUI, or mutate workflow files.",
  };
}
