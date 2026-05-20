import type { MvpArtifactReviewLoop, MvpArtifactReviewStep } from "./real-creative-mvp-types";

export function buildMvpArtifactReviewStep(input: MvpArtifactReviewStep): MvpArtifactReviewStep {
  return input;
}

export function buildMvpArtifactReviewLoop(selectedCandidateId = "artifact-capture-only"): MvpArtifactReviewLoop {
  const steps = [
    buildMvpArtifactReviewStep({ stepId: "capture-artifact", label: "capture artifact", operatorAction: "Review captured placeholder or supplied artifact metadata.", output: "artifact review packet", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "label-provenance", label: "label provenance", operatorAction: "Confirm whether the artifact is generated, placeholder, or manual export.", output: "provenance label", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "attach-metadata", label: "attach metadata", operatorAction: "Attach candidate, approval, and boundary metadata.", output: "metadata summary", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "run-safety-review", label: "run safety review", operatorAction: "Review safety and policy markers manually.", output: "safety review result", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "rate-artifact", label: "rate artifact", operatorAction: "Rate usefulness and quality.", output: "operator rating", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "approve-reject", label: "approve or reject", operatorAction: "Choose approve, reject, or needs revision.", output: "review decision", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "prepare-handoff", label: "prepare handoff", operatorAction: "Copy next implementation or revision prompt.", output: "handoff prompt", automaticPromotion: false }),
    buildMvpArtifactReviewStep({ stepId: "route-revision", label: "route revision", operatorAction: "Route back to creative plan if revision is needed.", output: "creative plan revision route", automaticPromotion: false }),
  ];
  const loop: Omit<MvpArtifactReviewLoop, "summary"> = {
    loopId: "real-creative-mvp-artifact-review-loop",
    selectedCandidateId,
    steps,
    reviewRoute: "/artifacts/review",
    noFileWrites: true,
    noAutomaticPromotion: true,
  };

  return { ...loop, summary: summarizeMvpArtifactReviewLoop(loop) };
}

export function summarizeMvpArtifactReviewLoop(loop: Omit<MvpArtifactReviewLoop, "summary"> | MvpArtifactReviewLoop): string[] {
  return [
    `Artifact review route: ${loop.reviewRoute}.`,
    `Review steps: ${loop.steps.length}.`,
    "Provenance and metadata are required.",
    "No file writes and no automatic promotion.",
  ];
}
