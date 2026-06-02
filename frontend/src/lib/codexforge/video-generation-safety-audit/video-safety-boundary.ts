import type { VideoSafetyBoundary } from "./video-generation-safety-types";

export function buildVideoSafetyBoundary(input: Partial<VideoSafetyBoundary> = {}): VideoSafetyBoundary {
  return {
    id: input.id ?? "video-safety-boundary-no-auto-run",
    label: input.label ?? "No auto-run default",
    enforced: input.enforced ?? true,
    plainEnglish:
      input.plainEnglish ??
      "The UI can review and copy handoffs, but it does not auto-run creative jobs or mutate render queues.",
  };
}

export function buildDefaultVideoSafetyBoundaries(): VideoSafetyBoundary[] {
  return [
    buildVideoSafetyBoundary(),
    buildVideoSafetyBoundary({
      id: "video-safety-boundary-approval-required",
      label: "Explicit approval required",
      plainEnglish: "A future real trial must pass review and approval before anything executes.",
    }),
    buildVideoSafetyBoundary({
      id: "video-safety-boundary-no-secret-display",
      label: "No secret exposure",
      plainEnglish: "Prompts, files, passwords, API keys, and environment values are not exposed by this audit.",
    }),
  ];
}
