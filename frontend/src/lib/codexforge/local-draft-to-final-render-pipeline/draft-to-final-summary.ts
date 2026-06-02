import type { DraftToFinalSummary } from "./draft-to-final-types";
import { buildDraftToFinalArtifactPlan } from "./draft-to-final-artifact-plan";
import { buildDraftToFinalDecision } from "./draft-to-final-decision";
import { buildDraftToFinalHandoff } from "./draft-to-final-handoff";
import { buildDefaultDraftToFinalPipeline } from "./draft-to-final-pipeline";
import { buildDraftToFinalReadiness } from "./draft-to-final-readiness";
import { buildDraftToFinalResourcePlan } from "./draft-to-final-resource-plan";

export function buildDraftToFinalSummary(): DraftToFinalSummary {
  const pipeline = buildDefaultDraftToFinalPipeline();
  const readiness = buildDraftToFinalReadiness();
  const decision = buildDraftToFinalDecision({}, readiness);
  const resourcePlan = buildDraftToFinalResourcePlan();
  const artifactPlan = buildDraftToFinalArtifactPlan();
  const handoff = buildDraftToFinalHandoff();

  return {
    pipeline,
    readiness,
    decision,
    resourcePlan,
    artifactPlan,
    handoff,
    summary: summarizeDraftToFinalPipeline({ pipeline, readiness, decision, resourcePlan, artifactPlan, handoff, summary: "" }),
  };
}

export function summarizeDraftToFinalPipeline(summary: DraftToFinalSummary): string {
  const readyCount = summary.readiness.checks.filter((check) => check.ready).length;
  return `${readyCount} of ${summary.readiness.checks.length} readiness checks are satisfied; decision is ${summary.decision.state}.`;
}
