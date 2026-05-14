import type {
  ArtifactPolicyBoundary,
  ArtifactPreviewSet,
  ArtifactRunHandoff,
  ArtifactSourceSurface,
  ArtifactValidationReport,
} from "./artifact-types";

export function buildArtifactRunHandoff(args: {
  previewSet: ArtifactPreviewSet;
  policyBoundary: ArtifactPolicyBoundary;
  validation: ArtifactValidationReport;
}): ArtifactRunHandoff {
  const connectedSurfaces: ArtifactSourceSurface[] = [
    "Creative Production Studio",
    "Safe Patch Preview",
    "Operator Run Center",
    "Local Bridge",
  ];
  const handoff: ArtifactRunHandoff = {
    id: "artifact-run-handoff-phase-10",
    connectedSurfaces,
    previewRunPayload: {
      mode: "preview-only",
      artifactCount: args.previewSet.previews.length,
      action: "review guarded artifact previews",
    },
    validationChecklist: [
      "preview-only",
      "no source mutation",
      "no command execution",
      "no external app execution",
      "approval required before future writes/execution",
      ...args.policyBoundary.summary,
      ...args.validation.summary,
    ],
    blocked: args.validation.state === "blocked",
    approvalState: "required-before-future-writes-or-execution",
    reviewPrompt: "",
  };

  return {
    ...handoff,
    reviewPrompt: buildArtifactReviewPrompt(handoff),
  };
}

export function summarizeArtifactRunHandoff(handoff: ArtifactRunHandoff): string[] {
  return [
    `${handoff.connectedSurfaces.length} surfaces connected for preview review.`,
    "Operator Run Center and Local Bridge are the future approval path; this executor performs no execution.",
    handoff.blocked
      ? "Validation blocked future handoff until reviewed."
      : "Preview handoff is ready for operator review.",
  ];
}

export function buildArtifactReviewPrompt(handoff: ArtifactRunHandoff): string {
  return [
    "Review the guarded artifact preview set.",
    `Mode: ${handoff.previewRunPayload.mode}.`,
    `Artifacts: ${handoff.previewRunPayload.artifactCount}.`,
    "Confirm preview-only state, policy boundary, validation notes, and future approval requirements before any write or execution request.",
  ].join(" ");
}
