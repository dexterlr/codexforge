import type { VideoFailureCase, VideoFailureCaseKind } from "./video-failure-recovery-types";

export function buildVideoFailureCase(input: Partial<VideoFailureCase> = {}): VideoFailureCase {
  return {
    id: input.id ?? "video-failure-case-missing-model",
    kind: input.kind ?? "missing model",
    plainEnglish: input.plainEnglish ?? "A needed local model may not be installed or selected.",
  };
}

export function buildDefaultVideoFailureCases(): VideoFailureCase[] {
  const kinds: VideoFailureCaseKind[] = [
    "missing model",
    "missing custom node",
    "out of memory",
    "output too short",
    "output too blurry",
    "bad motion",
    "flicker",
    "bad prompt",
    "wrong resolution",
    "artifact path missing",
    "workflow invalid",
    "result unknown",
  ];

  return kinds.map((kind, index) =>
    buildVideoFailureCase({
      id: `video-failure-case-${index + 1}`,
      kind,
      plainEnglish: `${kind} can be diagnosed with a safe review step before any retry.`,
    })
  );
}
