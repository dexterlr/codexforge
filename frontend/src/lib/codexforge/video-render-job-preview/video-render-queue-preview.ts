import type { VideoRenderProviderKind, VideoRenderQueueItem, VideoRenderQueuePreview, VideoRenderShotPlan } from "./video-render-job-types";

type QueueArgs = Partial<VideoRenderQueueItem> & {
  queueItemId: string;
  order: number;
  label: string;
  providerKind: VideoRenderProviderKind;
};

export function buildVideoRenderQueueItem(input: QueueArgs): VideoRenderQueueItem {
  return {
    queueItemId: input.queueItemId,
    order: input.order,
    label: input.label,
    providerKind: input.providerKind,
    sourceShotId: input.sourceShotId ?? "manual-shot",
    commandPreviewLabel:
      input.commandPreviewLabel ??
      `Non-runnable ${input.providerKind} queue preview label; future executor must construct any real command.`,
    expectedArtifacts: input.expectedArtifacts ?? ["metadata", "render-log"],
    status: input.status ?? (input.providerKind === "ffmpeg" ? "blocked" : "approval-required"),
    approvalRequired: input.approvalRequired ?? true,
    dependencyIds: input.dependencyIds ?? [],
    riskNotes: input.riskNotes ?? ["No execution in Phase 66.", "Future executor boundary required."],
    noExecutionGuarantee:
      input.noExecutionGuarantee ??
      "Queue preview includes no-execution guarantee: no render execution, no command execution, no ffmpeg execution, no file writes.",
  };
}

function providerForIndex(index: number): VideoRenderProviderKind {
  return index === 0 ? "blender" : index === 1 ? "comfyui" : index === 2 ? "unreal" : "local-renderer";
}

export function buildVideoRenderQueuePreview(shotPlan: VideoRenderShotPlan): VideoRenderQueuePreview {
  const shotItems = shotPlan.shots.map((shot, index) =>
    buildVideoRenderQueueItem({
      queueItemId: `video-render-queue-${index + 1}`,
      order: index + 1,
      label: `${shot.label} queue preview`,
      providerKind: providerForIndex(index),
      sourceShotId: shot.shotId,
      expectedArtifacts: shot.outputArtifacts,
      status: "approval-required",
      dependencyIds: index === 0 ? [] : [`video-render-queue-${index}`],
    })
  );
  const items = [
    ...shotItems,
    buildVideoRenderQueueItem({
      queueItemId: "video-render-queue-ffmpeg-blocked",
      order: shotItems.length + 1,
      label: "ffmpeg assembly preview",
      providerKind: "ffmpeg",
      status: "blocked",
      dependencyIds: shotItems.map((item) => item.queueItemId),
      expectedArtifacts: ["video", "render-log", "metadata"],
    }),
  ];
  const queue: VideoRenderQueuePreview = {
    queuePreviewId: `${shotPlan.shotPlanId}-queue-preview`,
    items,
    summary: [],
  };
  return { ...queue, summary: summarizeVideoRenderQueuePreview(queue) };
}

export function summarizeVideoRenderQueuePreview(queue: VideoRenderQueuePreview): string[] {
  return [
    `${queue.items.length} deterministic queue item(s) ordered by shot and blocked assembly preview.`,
    "No command generation is directly runnable by default.",
    "Queue preview includes no-execution guarantee and no file writes.",
  ];
}
