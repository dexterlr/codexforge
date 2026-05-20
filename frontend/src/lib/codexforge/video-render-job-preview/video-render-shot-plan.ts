import type { VideoRenderShot, VideoRenderShotPlan, VideoRenderSourceAdapter, VideoRenderTimeline } from "./video-render-job-types";

type ShotArgs = Partial<VideoRenderShot> & {
  shotId: string;
  label: string;
};

export function buildVideoRenderShot(input: ShotArgs): VideoRenderShot {
  return {
    shotId: input.shotId,
    label: input.label,
    visualDescription: input.visualDescription ?? "Reviewable cinematic shot placeholder.",
    sourceAdapter: input.sourceAdapter ?? "manual",
    cameraMovement: input.cameraMovement ?? "locked-off preview camera with movement note",
    durationEstimate: input.durationEstimate ?? "4 seconds",
    frameRangeEstimate: input.frameRangeEstimate ?? "frames TBD",
    inputAssets: input.inputAssets ?? ["source creative plan", "adapter packet placeholder"],
    outputArtifacts: input.outputArtifacts ?? ["image-sequence", "thumbnail", "render-log"],
    renderNotes: input.renderNotes ?? ["Preview queue only; no provider invocation."],
    safetyNotes: input.safetyNotes ?? ["No execution.", "No file writes.", "Operator review required."],
  };
}

function adapterForIndex(index: number): VideoRenderSourceAdapter {
  return index === 0 ? "blender" : index === 1 ? "comfyui" : index === 2 ? "unreal" : "mixed";
}

export function buildVideoRenderShotPlan(timeline: VideoRenderTimeline): VideoRenderShotPlan {
  const shots = timeline.segments.map((segment, index) =>
    buildVideoRenderShot({
      shotId: segment.sourceShotId,
      label: segment.label,
      sourceAdapter: adapterForIndex(index),
      durationEstimate: segment.durationLabel,
      frameRangeEstimate: segment.frameRangeLabel,
      visualDescription: `${segment.label} planned for ${segment.providerHint} preview.`,
    })
  );
  const plan: VideoRenderShotPlan = {
    shotPlanId: `${timeline.timelineId}-shot-plan`,
    shots,
    summary: [],
  };
  return { ...plan, summary: summarizeVideoRenderShotPlan(plan) };
}

export function summarizeVideoRenderShotPlan(plan: VideoRenderShotPlan): string[] {
  return [
    `${plan.shots.length} shot(s) planned across blender, comfyui, unreal, mixed, manual, and unknown adapter categories.`,
    "Shot plan captures visual intent, asset placeholders, output artifacts, render notes, and safety notes.",
  ];
}
