import type { OperatorRun, OperatorRunReadiness } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

function score(value: boolean): number {
  return value ? 100 : 40;
}

export function buildRunReadiness(run: Pick<OperatorRun, "id" | "policyBoundary" | "expectedArtifacts" | "approvalState" | "context">): OperatorRunReadiness {
  const dimensions = {
    policy: run.policyBoundary.previewAllowed ? 100 : 0,
    context: run.context.notes.length > 0 ? 90 : 45,
    artifact: run.expectedArtifacts.length > 0 ? 90 : 45,
    adapter: run.policyBoundary.adapterId ? 85 : 35,
    approval: score(run.approvalState === "not-required" || run.approvalState === "approved-for-preview"),
    rollbackReplay: 95,
  };
  const scoreValue = scoreRunReadiness({ id: run.id, score: 0, dimensions, summary: "" });

  return {
    id: buildOperatorRunReactKey(run.id, "readiness"),
    score: scoreValue,
    dimensions,
    summary: scoreValue >= 80 ? "Ready for preview and replay handoff." : "Preview is available, but approval remains unresolved.",
  };
}

export function scoreRunReadiness(readiness: OperatorRunReadiness): number {
  const values = Object.values(readiness.dimensions);
  return Math.round(values.reduce((total, item) => total + item, 0) / values.length);
}

export function summarizeRunReadiness(readiness: OperatorRunReadiness): string {
  return `${readiness.score}/100 readiness; ${readiness.summary}`;
}
