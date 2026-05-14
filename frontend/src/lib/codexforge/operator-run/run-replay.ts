import type { OperatorRunArtifactPreview, OperatorRunInput, OperatorRunPolicyBoundary, OperatorRunReplay } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

export function buildReplayPrompt(args: {
  sourcePrompt: string;
  selectedTarget: string;
  planSummary: string;
  policyBoundary: string;
  artifacts: OperatorRunArtifactPreview[];
}): string {
  return [
    "Replay this Operator Run as preview-only.",
    `Source prompt: ${args.sourcePrompt}`,
    `Target: ${args.selectedTarget}`,
    `Plan: ${args.planSummary}`,
    `Policy: ${args.policyBoundary}`,
    `Artifact previews: ${args.artifacts.map((artifact) => artifact.label).join(", ")}`,
    "Do not execute tools, write files, control desktop, access camera, render, or place trades.",
  ].join("\n");
}

export function buildRunReplay(input: OperatorRunInput, boundary: OperatorRunPolicyBoundary, artifacts: OperatorRunArtifactPreview[]): OperatorRunReplay {
  const sourcePrompt = input.sourcePrompt ?? "Prepare a safe operator run preview.";
  const selectedTarget = input.selectedTarget ?? input.capabilityId ?? "operator-run-center";
  const planSummary = input.planSummary ?? "Preview plan, approval boundary, artifact ledger, and replay packet.";
  const policyBoundary = boundary.reasons.join(" ");

  return {
    id: buildOperatorRunReactKey("replay", input.id ?? selectedTarget),
    sourcePrompt,
    selectedTarget,
    planSummary,
    policyBoundary,
    artifactPreviewList: artifacts.map((artifact) => artifact.label),
    validationChecklist: [
      "Preview-only run model assembled.",
      "Approval required before execution.",
      "No desktop control/camera/trading execution.",
      "No file writes or shell commands.",
    ],
    approvalNotes: boundary.approvalRequired
      ? ["Approval is required before any future execution worker can receive this run."]
      : ["No execution worker exists in this phase."],
    prompt: buildReplayPrompt({ sourcePrompt, selectedTarget, planSummary, policyBoundary, artifacts }),
  };
}

export function summarizeRunReplay(replay: OperatorRunReplay): string {
  return `Replay captures ${replay.artifactPreviewList.length} artifact previews and ${replay.validationChecklist.length} validation checks.`;
}
