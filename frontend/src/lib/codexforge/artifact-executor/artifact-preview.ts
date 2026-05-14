import { buildArtifactPlan } from "./artifact-plan";
import { buildArtifactPolicyBoundary } from "./artifact-policy";
import { renderArtifactPreview } from "./artifact-renderer";
import type {
  ArtifactPlan,
  ArtifactPlanItem,
  ArtifactPolicyBoundary,
  ArtifactPreview,
  ArtifactPreviewSet,
} from "./artifact-types";
import { validateArtifactPreview } from "./artifact-validation";

export function buildArtifactPreview(
  item: ArtifactPlanItem,
  boundary: ArtifactPolicyBoundary = buildArtifactPolicyBoundary()
): ArtifactPreview {
  const rendered = renderArtifactPreview(item);
  const preview: ArtifactPreview = {
    artifactId: item.id,
    type: item.type,
    title: item.title,
    targetPlaceholderPath: item.targetPlaceholderPath,
    sourceSurface: item.sourceSurface,
    contentPreview: rendered.content,
    rendered,
    policyBoundary: boundary,
    validationNotes: [],
    previewOnly: true,
  };
  const validation = validateArtifactPreview(preview);

  return {
    ...preview,
    validationNotes: validation.summary,
  };
}

export function buildArtifactPreviewSet(
  plan: ArtifactPlan = buildArtifactPlan(),
  boundary: ArtifactPolicyBoundary = buildArtifactPolicyBoundary()
): ArtifactPreviewSet {
  const previews = plan.items.map((item) => buildArtifactPreview(item, boundary));
  const set: ArtifactPreviewSet = {
    id: "artifact-preview-set-phase-10",
    previews,
    summary: [],
  };

  return {
    ...set,
    summary: summarizeArtifactPreview(set),
  };
}

export function summarizeArtifactPreview(set: ArtifactPreviewSet): string[] {
  return [
    `${set.previews.length} previews rendered as deterministic strings or JSON data.`,
    "No filesystem writes, command launches, external services, AI calls, or broker actions are performed.",
    "Each preview carries policy boundary and validation notes for operator audit.",
  ];
}
