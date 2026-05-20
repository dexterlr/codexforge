import type { VideoRenderInput, VideoRenderProviderKind, VideoRenderTimeline, VideoRenderTimelineSegment } from "./video-render-job-types";

type SegmentArgs = Partial<VideoRenderTimelineSegment> & {
  segmentId: string;
  label: string;
};

export function buildVideoRenderTimelineSegment(input: SegmentArgs): VideoRenderTimelineSegment {
  return {
    segmentId: input.segmentId,
    label: input.label,
    startTimeLabel: input.startTimeLabel ?? "00:00",
    durationLabel: input.durationLabel ?? "4 seconds",
    frameRangeLabel: input.frameRangeLabel ?? "frames TBD",
    sourceShotId: input.sourceShotId ?? input.segmentId.replace("segment", "shot"),
    providerHint: input.providerHint ?? "manual-export",
    transitionNote: input.transitionNote ?? "Hard cut preview; transition reviewed manually.",
    expectedArtifactNote: input.expectedArtifactNote ?? "Placeholder frames and metadata only.",
    riskNote: input.riskNote ?? "Render execution remains blocked.",
  };
}

function providerForIndex(index: number): VideoRenderProviderKind {
  return index === 0 ? "blender" : index === 1 ? "comfyui" : index === 2 ? "unreal" : "local-renderer";
}

export function buildVideoRenderTimeline(input: VideoRenderInput): VideoRenderTimeline {
  const segments = input.shotHints.map((hint, index) =>
    buildVideoRenderTimelineSegment({
      segmentId: `video-render-segment-${index + 1}`,
      label: hint,
      startTimeLabel: `00:${String(index * 4).padStart(2, "0")}`,
      durationLabel: "4 seconds",
      frameRangeLabel: `frames ${index * 96 + 1}-${(index + 1) * 96}`,
      sourceShotId: `video-render-shot-${index + 1}`,
      providerHint: providerForIndex(index),
      expectedArtifactNote: "Expected video render queue artifact placeholder, image sequence, thumbnail, render log.",
    })
  );
  const timeline: VideoRenderTimeline = {
    timelineId: `${input.renderInputId}-timeline`,
    totalDurationLabel: input.targetDurationLabel,
    fps: input.targetFps,
    frameRange: input.frameRangeIntent,
    segments,
    audioPlaceholder: input.audioMusicPlaceholder,
    captionsPlaceholder: input.subtitleCaptionPlaceholder,
    reviewNotes: [
      "Operator reviews timing before future executor handoff.",
      "No frames are rendered in Phase 66.",
    ],
    summary: [],
  };
  return { ...timeline, summary: summarizeVideoRenderTimeline(timeline) };
}

export function summarizeVideoRenderTimeline(timeline: VideoRenderTimeline): string[] {
  return [
    `${timeline.segments.length} timeline segment(s), ${timeline.totalDurationLabel}, ${timeline.fps} fps.`,
    `Frame range: ${timeline.frameRange}.`,
    "Timeline is preview-only and contains no runnable commands.",
  ];
}
