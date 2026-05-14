import { buildArtifactLedger } from "./artifact-ledger";
import { buildArtifactPlan } from "./artifact-plan";
import { buildArtifactPolicyBoundary } from "./artifact-policy";
import { buildArtifactPreviewSet } from "./artifact-preview";
import { buildArtifactRunHandoff, summarizeArtifactRunHandoff } from "./artifact-run-handoff";
import type { ArtifactExecutorModel } from "./artifact-types";
import { validateArtifactSet } from "./artifact-validation";

export function buildArtifactExecutorModel(): ArtifactExecutorModel {
  const plan = buildArtifactPlan();
  const policyBoundary = buildArtifactPolicyBoundary();
  const previewSet = buildArtifactPreviewSet(plan, policyBoundary);
  const ledger = buildArtifactLedger(previewSet);
  const validation = validateArtifactSet(previewSet);
  const runHandoff = buildArtifactRunHandoff({
    previewSet,
    policyBoundary,
    validation,
  });

  return {
    plan,
    policyBoundary,
    previewSet,
    ledger,
    validation,
    runHandoff,
    summary: [
      ...plan.summary,
      ...policyBoundary.summary,
      ...previewSet.summary,
      ...ledger.summary,
      ...validation.summary,
      ...summarizeArtifactRunHandoff(runHandoff),
    ],
  };
}
