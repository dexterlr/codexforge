import type { DryRunSummary } from "./comfyui-dry-run-types";
import { buildDefaultDryRunContract } from "./dry-run-contract";
import { buildDefaultDryRunChecks } from "./dry-run-check";
import { buildDryRunArtifactReview } from "./dry-run-artifact-review";
import { buildDryRunDecision } from "./dry-run-decision";
import { buildDryRunHandoff } from "./dry-run-handoff";
import { buildDryRunPackageReview } from "./dry-run-package-review";
import { buildDryRunParameterReview } from "./dry-run-parameter-review";

export function summarizeComfyUiDryRunContract(summary: DryRunSummary): string {
  return `Workflow dry run is ${summary.decision.status}: review is complete enough for submit boundary discussion, but no ComfyUI workflow runs and no render starts.`;
}

export function buildDryRunSummary(): DryRunSummary {
  const checks = buildDefaultDryRunChecks();
  const decision = buildDryRunDecision(checks);
  const summary: DryRunSummary = {
    contract: buildDefaultDryRunContract(),
    checks,
    packageReview: buildDryRunPackageReview(checks),
    parameterReview: buildDryRunParameterReview(checks),
    artifactReview: buildDryRunArtifactReview(checks),
    decision,
    handoff: buildDryRunHandoff(decision),
    summary: "",
  };
  return { ...summary, summary: summarizeComfyUiDryRunContract(summary) };
}
