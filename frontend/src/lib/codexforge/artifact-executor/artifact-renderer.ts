import type { ArtifactPlanItem, ArtifactRenderedPreview } from "./artifact-types";

export function renderMarkdownArtifact(item: ArtifactPlanItem): string {
  return [
    `# ${item.title}`,
    "",
    `Artifact id: ${item.id}`,
    `Type: ${item.type}`,
    `Source surface: ${item.sourceSurface}`,
    `Target placeholder path: ${item.targetPlaceholderPath}`,
    "",
    "Preview-only contract:",
    "- preview-only",
    "- no source mutation",
    "- no command execution",
    "- no external app execution",
    "- approval required before future writes/execution",
    "",
    "Intent:",
    item.intent,
  ].join("\n");
}

export function renderJsonArtifact(item: ArtifactPlanItem): Record<string, unknown> {
  return {
    artifactId: item.id,
    type: item.type,
    title: item.title,
    sourceSurface: item.sourceSurface,
    targetPlaceholderPath: item.targetPlaceholderPath,
    mode: "preview-only",
    blockedActions: item.blockedActions,
    futureApprovalPath:
      "approval required before future writes/execution through Operator Run Center and Local Bridge consent where relevant",
  };
}

export function renderTextArtifact(item: ArtifactPlanItem): string {
  return [
    `${item.title}`,
    `artifact: ${item.id}`,
    `type: ${item.type}`,
    `source: ${item.sourceSurface}`,
    `target placeholder: ${item.targetPlaceholderPath}`,
    "mode: preview-only",
    "safety: no source mutation; no command execution; no external app execution",
    "future path: approval required before future writes/execution",
    `intent: ${item.intent}`,
  ].join("\n");
}

export function renderArtifactPreview(item: ArtifactPlanItem): ArtifactRenderedPreview {
  if (item.previewLanguage === "json") {
    const json = renderJsonArtifact(item);
    return {
      format: "json",
      json,
      content: JSON.stringify(json, null, 2),
    };
  }

  if (item.previewLanguage === "markdown") {
    return {
      format: "markdown",
      content: renderMarkdownArtifact(item),
    };
  }

  return {
    format: "text",
    content: renderTextArtifact(item),
  };
}
