import type { VideoReviewFilter, VideoReviewItem } from "./video-review-inbox-types";

export function buildVideoReviewFilter(input: Partial<VideoReviewFilter> = {}): VideoReviewFilter {
  return {
    id: input.id ?? "video-review-filter-all",
    label: input.label ?? "All video review items",
    status: input.status ?? "all",
  };
}

export function filterVideoReviewItems(items: VideoReviewItem[], filter: VideoReviewFilter): VideoReviewItem[] {
  if (filter.status === "all") return items;
  return items.filter((item) => item.status === filter.status);
}
