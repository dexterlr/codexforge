import type { RenderVersionHistorySummary } from "./render-version-history-types";
import { buildDefaultRenderVersionChanges } from "./render-version-change";
import { buildDefaultRenderVersionReviews } from "./render-version-review";
import { buildDefaultRenderVersions } from "./render-version";
import { buildRenderVersionHandoff } from "./render-version-handoff";
import { buildRenderVersionLineage } from "./render-version-lineage";
import { buildRenderVersionSelection } from "./render-version-selection";

export function buildRenderVersionHistorySummary(): RenderVersionHistorySummary {
  const versions = buildDefaultRenderVersions();
  const changes = buildDefaultRenderVersionChanges();
  const lineage = buildRenderVersionLineage(versions);
  const reviews = buildDefaultRenderVersionReviews(versions);
  const selection = buildRenderVersionSelection(versions);
  const handoff = buildRenderVersionHandoff(selection);

  return {
    versions,
    changes,
    lineage,
    reviews,
    selection,
    handoff,
    summary: summarizeRenderVersionHistory({ versions, changes, lineage, reviews, selection, handoff, summary: "" }),
  };
}

export function summarizeRenderVersionHistory(summary: RenderVersionHistorySummary): string {
  const latest = summary.versions.find((version) => version.isLatest);
  return `${summary.versions.length} render version records are tracked; latest is ${latest?.label ?? "unknown"} and still needs manual review.`;
}
