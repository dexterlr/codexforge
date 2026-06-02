import type { DryRunCheck, DryRunParameterReview } from "./comfyui-dry-run-types";

export function buildDryRunParameterReview(checks: DryRunCheck[]): DryRunParameterReview {
  return {
    id: "dry-run-parameter-review",
    mapped: checks.some((check) => check.id === "parameters mapped" && check.status === "passed"),
    checks: ["prompt fields reviewed", "seed and resolution reviewed", "model choices reviewed", "advanced values marked for review"],
    plainEnglish: "Parameter review checks whether values are understandable before a future approved submit boundary.",
  };
}
