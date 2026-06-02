import type { RenderVersion, RenderVersionReview } from "./render-version-history-types";

export function buildRenderVersionReview(input: Partial<RenderVersionReview> & { versionId: string }): RenderVersionReview {
  return {
    id: input.id ?? `render-version-review-${input.versionId}`,
    versionId: input.versionId,
    decision: input.decision ?? "needs review",
    note: input.note ?? "Manual review required before this version can drive finishing or export handoff.",
  };
}

export function buildDefaultRenderVersionReviews(versions: RenderVersion[]): RenderVersionReview[] {
  return versions.map((version) =>
    buildRenderVersionReview({
      versionId: version.id,
      decision: version.isLatest ? "needs review" : version.status === "handoff-only" ? "handoff only" : "not selected",
      note: version.isLatest
        ? "Latest version in this preview. Review it manually before export handoff."
        : version.status === "handoff-only"
          ? "This record is a handoff packet, not a playable result."
          : "Older version kept for context.",
    })
  );
}
