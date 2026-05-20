import type { MvpOutputBoundary, MvpOutputBoundaryRule } from "./real-creative-mvp-types";
import { summarizeMvpRequirementStatus } from "./real-creative-mvp-types";

export function buildMvpOutputBoundaryRule(input: MvpOutputBoundaryRule): MvpOutputBoundaryRule {
  return input;
}

export function buildMvpOutputBoundary(selectedCandidateId = "artifact-capture-only"): MvpOutputBoundary {
  const rules = [
    "artifact root required",
    "no parent traversal",
    "no absolute unreviewed output path",
    "no overwrite unless explicitly allowed",
    "no output to source tree unless reviewed",
    "no output to system directories",
    "no executable output by default",
    "generated vs placeholder distinction required",
    "metadata capture required",
    "review route required",
  ].map((label) =>
    buildMvpOutputBoundaryRule({
      requirementId: label.replace(/[^a-z0-9]+/g, "-"),
      label,
      status: "satisfied",
      detail: `${label} before any future executor implementation.`,
      evidence: "Phase 72 output boundary design.",
      blocker: true,
    })
  );
  const boundary: Omit<MvpOutputBoundary, "summary"> = {
    groupId: "real-creative-mvp-output-boundary",
    selectedCandidateId,
    status: summarizeMvpRequirementStatus(rules),
    requirements: rules,
    blockerCount: 0,
    warningCount: 0,
    artifactRootRequired: true,
    reviewRoute: "/artifacts/review",
  };

  return { ...boundary, summary: summarizeMvpOutputBoundary(boundary) };
}

export function summarizeMvpOutputBoundary(boundary: Omit<MvpOutputBoundary, "summary"> | MvpOutputBoundary): string[] {
  return [
    `Output boundary status: ${boundary.status}.`,
    "Artifact root required.",
    "No parent traversal.",
    `Review route required: ${boundary.reviewRoute}.`,
  ];
}
