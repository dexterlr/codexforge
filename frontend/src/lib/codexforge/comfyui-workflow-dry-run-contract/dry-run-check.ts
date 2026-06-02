import type { DryRunCheck, DryRunCheckId, DryRunCheckStatus } from "./comfyui-dry-run-types";

const CHECK_COPY: Record<DryRunCheckId, string> = {
  "workflow imported": "The workflow has been reviewed as an import preview before dry run.",
  "safety inspected": "Safety risks are explained before any future submit review.",
  "parameters mapped": "Technical values are mapped into beginner-readable choices.",
  "package built": "The job package exists as a review object, not as a submitted job.",
  "metadata reviewed": "ComfyUI metadata readiness has been reviewed or marked unknown.",
  "local provider ready or unknown": "Local provider readiness is not assumed; unknown stays visible.",
  "render queue preview ready": "The render queue plan is preview-only and does not mutate a real queue.",
  "artifact destination planned": "A destination is planned before any future render result exists.",
  "recovery path planned": "A recovery path is available if the future job fails or is confusing.",
  "approval required": "Submit still requires explicit approval.",
  "no-auto-run guarantee": "Nothing starts automatically after this dry run.",
};

export function buildDryRunCheck(id: DryRunCheckId, status: DryRunCheckStatus = "passed"): DryRunCheck {
  return {
    id,
    status,
    plainEnglish: CHECK_COPY[id],
    blocksSubmitReview: status === "blocked" || status === "needs-review",
  };
}

export function buildDefaultDryRunChecks(): DryRunCheck[] {
  return [
    buildDryRunCheck("workflow imported"),
    buildDryRunCheck("safety inspected"),
    buildDryRunCheck("parameters mapped"),
    buildDryRunCheck("package built"),
    buildDryRunCheck("metadata reviewed"),
    buildDryRunCheck("local provider ready or unknown", "unknown"),
    buildDryRunCheck("render queue preview ready"),
    buildDryRunCheck("artifact destination planned"),
    buildDryRunCheck("recovery path planned"),
    buildDryRunCheck("approval required"),
    buildDryRunCheck("no-auto-run guarantee"),
  ];
}
