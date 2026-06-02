import type { DryRunArtifactReview, DryRunCheck } from "./comfyui-dry-run-types";

export function buildDryRunArtifactReview(checks: DryRunCheck[]): DryRunArtifactReview {
  return {
    id: "dry-run-artifact-review",
    planned: checks.some((check) => check.id === "artifact destination planned" && check.status === "passed"),
    checks: ["artifact destination planned", "review surface planned", "recovery path planned", "no file write from dry run"],
    plainEnglish: "Artifact review checks where a future result would be reviewed. It does not create, move, or delete files.",
  };
}
