import type { CreativeArtifact, CreativeArtifactGallery, CreativeProductionPlan } from "./creative-types";

export function summarizeCreativeArtifacts(gallery: CreativeArtifactGallery): string {
  return `Artifact gallery: ${gallery.artifacts.length} placeholder artifact(s), all preview-only or approval-gated.`;
}

export function buildCreativeArtifactGallery(plan: CreativeProductionPlan): CreativeArtifactGallery {
  const artifactSeeds = [
    {
      artifactId: "artifact:storyboard",
      type: "storyboard-markdown-preview",
      label: "Storyboard markdown preview",
      sourceStage: "storyboard",
      placeholderOutputPath: "artifacts/codexforge/creative/storyboard.md.preview",
    },
    {
      artifactId: "artifact:blender",
      type: "blender-python-preview",
      label: "Blender Python script preview",
      sourceStage: "scene-workflow-level-plan",
      placeholderOutputPath: "artifacts/codexforge/creative/blender_scene.py.preview",
    },
    {
      artifactId: "artifact:comfyui",
      type: "comfyui-workflow-json-preview",
      label: "ComfyUI workflow JSON preview",
      sourceStage: "scene-workflow-level-plan",
      placeholderOutputPath: "artifacts/codexforge/creative/comfyui_workflow.json.preview",
    },
    {
      artifactId: "artifact:unreal",
      type: "unreal-editor-command-preview",
      label: "Unreal editor command preview",
      sourceStage: "scene-workflow-level-plan",
      placeholderOutputPath: "artifacts/codexforge/creative/unreal_editor_command.txt.preview",
    },
    {
      artifactId: "artifact:render-manifest",
      type: "render-queue-manifest-preview",
      label: "Render queue manifest preview",
      sourceStage: "render-queue-preview",
      placeholderOutputPath: "artifacts/codexforge/creative/render_queue_manifest.json.preview",
    },
    {
      artifactId: "artifact:ledger",
      type: "artifact-ledger-update-preview",
      label: "Artifact ledger update preview",
      sourceStage: "patch-preview-handoff",
      placeholderOutputPath: "artifacts/codexforge/creative/artifact_ledger_update.md.preview",
    },
  ] as const;

  const artifacts = artifactSeeds.map((artifact) => ({
    ...artifact,
    status: "preview-only",
    safetyNote: "Placeholder only; no file is created by Creative Production Studio.",
    reviewAction: `Review through ${plan.approvalGates[2]}.`,
  })) satisfies CreativeArtifact[];

  const gallery = {
    id: "creative-artifact-gallery:phase-7",
    artifacts,
    summary: "",
  } satisfies CreativeArtifactGallery;

  return { ...gallery, summary: summarizeCreativeArtifacts(gallery) };
}
