import type { RenderVersion, RenderVersionSelection } from "./render-version-history-types";

export function buildRenderVersionSelection(versions: RenderVersion[]): RenderVersionSelection {
  const latest = versions.find((version) => version.isLatest) ?? versions[versions.length - 1];
  return {
    id: "render-version-selection",
    selectedVersionId: latest?.id ?? "render-version-unknown",
    latestVersionId: latest?.id ?? "render-version-unknown",
    plainEnglish: latest
      ? `${latest.label} is marked latest, but a beginner still needs to review it before export.`
      : "No latest version is selected.",
    manualOnly: true,
  };
}
