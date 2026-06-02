import type { DryRunCheck, DryRunDecision } from "./comfyui-dry-run-types";

function hasBlocking(checks: DryRunCheck[], id: DryRunCheck["id"]): boolean {
  return checks.some((check) => check.id === id && check.blocksSubmitReview);
}

export function buildDryRunDecision(checks: DryRunCheck[]): DryRunDecision {
  const blocking = checks.filter((check) => check.blocksSubmitReview);
  const status = hasBlocking(checks, "workflow imported")
    ? "needs-workflow-import"
    : hasBlocking(checks, "safety inspected")
      ? "needs-safety-inspection"
      : hasBlocking(checks, "parameters mapped")
        ? "needs-parameter-map"
        : hasBlocking(checks, "metadata reviewed")
          ? "needs-metadata-review"
          : hasBlocking(checks, "artifact destination planned")
            ? "needs-artifact-plan"
            : blocking.length > 0
              ? "blocked"
              : "ready-for-approved-submit-review";

  return {
    id: "dry-run-decision",
    status,
    label: status === "ready-for-approved-submit-review" ? "Ready for approved submit review" : "Dry run needs more review",
    explanation:
      status === "ready-for-approved-submit-review"
        ? "The dry run contract is complete enough to review the future submit boundary. It still does not run ComfyUI."
        : "One or more dry run checks must be fixed before submit review.",
    submitReviewAllowed: status === "ready-for-approved-submit-review",
  };
}
