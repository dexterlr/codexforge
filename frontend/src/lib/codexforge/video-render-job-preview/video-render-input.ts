import type { VideoRenderInput, VideoRenderKind, VideoRenderValidation } from "./video-render-job-types";

type InputArgs = Partial<Omit<VideoRenderInput, "renderInputId" | "summary">> & {
  sourceCreativePlanId?: string;
  renderGoal?: string;
  renderKind?: VideoRenderKind;
};

function slug(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized.length > 0 ? normalized : "unknown";
}

export function buildVideoRenderInput(input: InputArgs = {}): VideoRenderInput {
  const sourceCreativePlanId = input.sourceCreativePlanId ?? "creative-production-plan-phase-66";
  const renderGoal =
    input.renderGoal ??
    "Preview a 12 second cinematic render job spanning Blender animation, ComfyUI image sequence, Unreal Sequencer, and generic local render review without execution.";
  const renderKind = input.renderKind ?? "mixed-pipeline-preview";
  const draft: VideoRenderInput = {
    renderInputId: `video-render-input-${slug(sourceCreativePlanId)}-${slug(renderKind)}-${slug(renderGoal).slice(0, 48)}`,
    sourceCreativePlanId,
    sourceAdapterPacketIds: input.sourceAdapterPacketIds ?? [
      "blender-preview-packet",
      "comfyui-preview-packet",
      "unreal-preview-packet",
    ],
    renderGoal,
    renderKind,
    medium: input.medium ?? "cinematic video preview",
    outputStyle: input.outputStyle ?? "premium studio cinematic with reviewable frame plan",
    targetDurationLabel: input.targetDurationLabel ?? "12 seconds",
    targetResolutionLabel: input.targetResolutionLabel ?? "1920x1080 preview",
    targetFps: input.targetFps ?? 24,
    aspectRatio: input.aspectRatio ?? "16:9",
    frameRangeIntent: input.frameRangeIntent ?? "frames 1-288",
    shotHints: input.shotHints ?? [
      "establishing reveal",
      "asset detail pass",
      "sequencer hero camera",
    ],
    audioMusicPlaceholder: input.audioMusicPlaceholder ?? "audio-placeholder: operator supplied later",
    subtitleCaptionPlaceholder: input.subtitleCaptionPlaceholder ?? "subtitle-placeholder: review captions later",
    outputArtifactIntent: input.outputArtifactIntent ?? ["video", "image-sequence", "thumbnail", "render-log"],
    operatorConstraints: input.operatorConstraints ?? [
      "preview-only",
      "no render execution",
      "no command execution",
      "no file writes",
      "preserve latest-message authority",
    ],
    noExecutionGuarantee:
      input.noExecutionGuarantee ??
      "Phase 66 video render input is deterministic preview metadata only; it launches no apps, renders no frames, runs no ffmpeg, performs no network calls, and writes no files.",
    summary: [],
  };
  return { ...draft, summary: summarizeVideoRenderInput(draft) };
}

export function validateVideoRenderInput(input: VideoRenderInput): VideoRenderValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.renderGoal.trim()) blockedReasons.push("Render goal is required.");
  if (!input.sourceCreativePlanId.trim()) blockedReasons.push("Source creative plan id is required.");
  if (input.targetFps <= 0) blockedReasons.push("Target FPS must be positive.");
  if (!input.noExecutionGuarantee.includes("writes no files")) warnings.push("No-write guarantee should be explicit.");
  return { valid: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeVideoRenderInput(input: VideoRenderInput): string[] {
  return [
    `${input.renderKind} input for ${input.targetDurationLabel} at ${input.targetFps} fps.`,
    `Frame range intent: ${input.frameRangeIntent}; output intent: ${input.outputArtifactIntent.join(", ")}.`,
    "preview-only, no render execution, no command execution, no ffmpeg execution, no file writes.",
  ];
}
