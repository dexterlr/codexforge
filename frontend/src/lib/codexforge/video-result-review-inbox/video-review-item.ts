import type { VideoReviewItem } from "./video-review-inbox-types";

export function buildVideoReviewItem(input: Partial<VideoReviewItem> = {}): VideoReviewItem {
  return {
    id: input.id ?? "video-review-item-empty",
    title: input.title ?? "Future video result",
    artifactKind: input.artifactKind ?? "video draft",
    status: input.status ?? "no result yet",
    fakeResult: false,
  };
}

export function buildDefaultVideoReviewItems(): VideoReviewItem[] {
  return [
    buildVideoReviewItem({ id: "video-review-item-draft", title: "Future draft review slot", artifactKind: "video draft" }),
    buildVideoReviewItem({ id: "video-review-item-upscale", title: "Future upscale review slot", artifactKind: "upscaled video" }),
    buildVideoReviewItem({ id: "video-review-item-final", title: "Future final candidate slot", artifactKind: "final export" }),
  ];
}
