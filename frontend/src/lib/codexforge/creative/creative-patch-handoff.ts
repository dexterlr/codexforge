import type { CreativeArtifactGallery, CreativePatchHandoff, CreativePatchHandoffItem, CreativeProductionPlan, Storyboard } from "./creative-types";

export function buildCreativePatchPreviewPrompt(label: string, previewType: string, targetPathPlaceholder: string): string {
  return [
    `Prepare a ${label} as a Safe Patch Preview artifact.`,
    `Preview type: ${previewType}.`,
    `Target path placeholder: ${targetPathPlaceholder}.`,
    "Produce a preview object or diff proposal only.",
    "Do not create files, do not apply changes, and do not execute creative adapters.",
    "Safe Patch Preview approval boundary must be visible before any future mutation.",
  ].join(" ");
}

export function summarizeCreativePatchHandoff(handoff: CreativePatchHandoff): string {
  return `Creative Patch handoff: ${handoff.items.length} Safe Patch Preview prompt(s), preview-only, no mutation.`;
}

export function buildCreativePatchHandoff(
  plan: CreativeProductionPlan,
  storyboard: Storyboard,
  gallery: CreativeArtifactGallery
): CreativePatchHandoff {
  const items = gallery.artifacts.map((artifact, index) => ({
    id: `creative-patch-handoff:${index + 1}:${artifact.artifactId}`,
    label: artifact.label,
    previewType: artifact.type,
    prompt: buildCreativePatchPreviewPrompt(artifact.label, artifact.type, artifact.placeholderOutputPath),
    approvalBoundary: "Safe Patch Preview approval boundary",
  })) satisfies CreativePatchHandoffItem[];

  const handoff = {
    id: `${plan.id}:safe-patch-preview-handoff`,
    items: [
      {
        id: "creative-patch-handoff:storyboard-summary",
        label: `${storyboard.title} summary prompt`,
        previewType: "storyboard-markdown-preview",
        prompt: buildCreativePatchPreviewPrompt(`${storyboard.title} markdown`, "storyboard-markdown-preview", "artifacts/codexforge/creative/storyboard.md.preview"),
        approvalBoundary: "Safe Patch Preview approval boundary",
      },
      ...items,
    ],
    safePatchPreviewBoundary: "Safe Patch Preview handoff is preview-only until explicit approval.",
    summary: "",
  } satisfies CreativePatchHandoff;

  return { ...handoff, summary: summarizeCreativePatchHandoff(handoff) };
}
