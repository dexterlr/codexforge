import type { RenderVersion, RenderVersionLineage } from "./render-version-history-types";

export function buildRenderVersionLineage(versions: RenderVersion[]): RenderVersionLineage {
  const latest = versions.find((version) => version.isLatest) ?? versions[versions.length - 1];
  return {
    id: "render-version-lineage",
    rootVersionId: versions[0]?.id ?? "render-version-unknown",
    latestVersionId: latest?.id ?? "render-version-unknown",
    steps: versions.map((version) => `${version.label}: ${version.kind} from ${version.source}`),
  };
}
