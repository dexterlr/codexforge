import type { VideoRenderArtifactItem, VideoRenderArtifactPlan, VideoRenderArtifactType, VideoRenderProviderKind, VideoRenderQueuePreview } from "./video-render-job-types";

type ArtifactArgs = Partial<VideoRenderArtifactItem> & {
  artifactId: string;
  type: VideoRenderArtifactType;
  label: string;
  providerKind: VideoRenderProviderKind;
  sourceQueueItemId: string;
};

export function buildVideoRenderArtifactItem(input: ArtifactArgs): VideoRenderArtifactItem {
  return {
    artifactId: input.artifactId,
    type: input.type,
    label: input.label,
    providerKind: input.providerKind,
    sourceQueueItemId: input.sourceQueueItemId,
    placeholderOutputPath: input.placeholderOutputPath ?? `.codexforge/artifacts/video-render/${input.artifactId}.preview`,
    metadataToCapture: input.metadataToCapture ?? ["provider", "frame range", "approval id", "risk notes"],
    reviewRoute: input.reviewRoute ?? "/artifacts/review",
    retentionStrategy: input.retentionStrategy ?? "Placeholder only until approved artifact workspace write.",
    safetyNote: input.safetyNote ?? "Artifact file writes blocked from UI.",
    noWriteGuarantee: input.noWriteGuarantee ?? "No artifact file is written by Video Render Job Preview v1.",
  };
}

export function buildVideoRenderArtifactPlan(queue: VideoRenderQueuePreview): VideoRenderArtifactPlan {
  const first = queue.items[0]?.queueItemId ?? "video-render-queue-1";
  const last = queue.items[queue.items.length - 1]?.queueItemId ?? first;
  const items = [
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-video", type: "video", label: "Video placeholder", providerKind: "ffmpeg", sourceQueueItemId: last }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-image-sequence", type: "image-sequence", label: "Image sequence placeholder", providerKind: "comfyui", sourceQueueItemId: first }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-frame", type: "frame", label: "Review frame placeholder", providerKind: "blender", sourceQueueItemId: first }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-thumbnail", type: "thumbnail", label: "Thumbnail placeholder", providerKind: "unreal", sourceQueueItemId: last }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-audio-placeholder", type: "audio-placeholder", label: "Audio placeholder", providerKind: "manual-export", sourceQueueItemId: first }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-subtitle-placeholder", type: "subtitle-placeholder", label: "Subtitle placeholder", providerKind: "manual-export", sourceQueueItemId: first }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-render-log", type: "render-log", label: "Render log placeholder", providerKind: "local-renderer", sourceQueueItemId: last }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-workflow-json", type: "workflow-json", label: "Workflow JSON placeholder", providerKind: "comfyui", sourceQueueItemId: first }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-command-preview", type: "command-preview", label: "Command preview placeholder", providerKind: "ffmpeg", sourceQueueItemId: last }),
    buildVideoRenderArtifactItem({ artifactId: "video-render-artifact-metadata", type: "metadata", label: "Metadata placeholder", providerKind: "manual-export", sourceQueueItemId: first }),
  ];
  const plan: VideoRenderArtifactPlan = {
    artifactPlanId: `${queue.queuePreviewId}-artifact-plan`,
    items,
    summary: [],
  };
  return { ...plan, summary: summarizeVideoRenderArtifactPlan(plan) };
}

export function summarizeVideoRenderArtifactPlan(plan: VideoRenderArtifactPlan): string[] {
  return [
    `${plan.items.length} artifact expectation(s) including video, image-sequence, frame, thumbnail, render-log, workflow-json, command-preview, and metadata.`,
    "All paths are placeholders; UI performs no file writes.",
  ];
}
