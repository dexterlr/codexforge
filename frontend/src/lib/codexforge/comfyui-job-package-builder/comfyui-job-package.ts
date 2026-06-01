import type { ComfyUiJobPackage, ComfyUiJobReadinessLabel } from "./comfyui-job-package-types";
import { buildComfyUiJobApprovalCheck } from "./comfyui-job-approval-check";
import { buildComfyUiJobArtifactPlan } from "./comfyui-job-artifact-plan";
import { buildComfyUiJobInput } from "./comfyui-job-input";
import { buildComfyUiJobParameterSet } from "./comfyui-job-parameter-set";

export function buildComfyUiJobPackage(input: Partial<ComfyUiJobPackage> = {}): ComfyUiJobPackage {
  return {
    id: input.id ?? "comfyui-job-package-first-safe-draft",
    title: input.title ?? "Reviewed ComfyUI local video job package",
    inputs:
      input.inputs ??
      [
        buildComfyUiJobInput({ id: "comfyui-job-input-prompt", label: "Prompt", source: "Video prompt builder" }),
        buildComfyUiJobInput({ id: "comfyui-job-input-storyboard", label: "Storyboard", source: "Storyboard planner" }),
        buildComfyUiJobInput({ id: "comfyui-job-input-keyframes", label: "Keyframes", source: "Keyframe plan builder" }),
        buildComfyUiJobInput({ id: "comfyui-job-input-workflow", label: "Workflow import", source: "ComfyUI workflow import preview" }),
      ],
    parameterSet: input.parameterSet ?? buildComfyUiJobParameterSet(),
    artifactPlan: input.artifactPlan ?? buildComfyUiJobArtifactPlan(),
    approvalChecks: input.approvalChecks ?? buildDefaultComfyUiJobApprovalChecks(),
    futureSubmitAllowed: false,
  };
}

export function buildDefaultComfyUiJobPackage(): ComfyUiJobPackage {
  return buildComfyUiJobPackage();
}

function buildDefaultComfyUiJobApprovalChecks(): ComfyUiJobPackage["approvalChecks"] {
  const labels: ComfyUiJobReadinessLabel[] = [
    "prompt ready",
    "storyboard ready",
    "keyframes planned",
    "workflow imported",
    "safety inspected",
    "parameters mapped",
    "artifact destination planned",
    "local provider selected",
    "approval required",
    "no-auto-run guarantee",
  ];

  return labels.map((label, index) =>
    buildComfyUiJobApprovalCheck({
      id: `comfyui-job-approval-check-${index + 1}`,
      label,
      passed: label !== "approval required",
      plainEnglish: label === "approval required" ? "A human approval step is still required before any future submit." : `${label} is represented in the package preview.`,
    })
  );
}
