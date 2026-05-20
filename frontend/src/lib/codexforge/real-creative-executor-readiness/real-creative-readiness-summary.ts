import type {
  RealCreativeExecutorReadinessModel,
  RealCreativeReadinessAudit,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
  RealCreativeReadinessSummary,
} from "./real-creative-readiness-types";
import { buildAdapterAllowlistAudit } from "./adapter-allowlist-audit";
import { buildApprovalReadinessAudit } from "./approval-readiness-audit";
import { buildArtifactOutputAudit } from "./artifact-output-audit";
import { buildBridgeReadinessAudit } from "./bridge-readiness-audit";
import { buildDryRunEvidenceAudit } from "./dry-run-evidence-audit";
import { buildExecutorReadinessScorecard } from "./executor-readiness-scorecard";
import { buildKillSwitchReadinessAudit } from "./kill-switch-readiness-audit";
import { buildPathBoundaryAudit } from "./path-boundary-audit";
import {
  buildRealCreativeReadinessInput,
  validateRealCreativeReadinessInput,
} from "./readiness-input";
import { buildRealCreativeReadinessNextActionPlan } from "./real-creative-readiness-next-action";

function countAuditBlockers(audits: readonly RealCreativeReadinessAudit[]): number {
  return audits.reduce((total, audit) => total + audit.blockerCount, 0);
}

function countAuditWarnings(audits: readonly RealCreativeReadinessAudit[]): number {
  return audits.reduce((total, audit) => total + audit.warningCount, 0);
}

export function buildRealCreativeReadinessSummary(input: {
  readinessInput: RealCreativeReadinessInput;
  audits: readonly RealCreativeReadinessAudit[];
  scorecard: RealCreativeExecutorReadinessModel["scorecard"];
  nextActionPlan: RealCreativeExecutorReadinessModel["nextActionPlan"];
}): RealCreativeReadinessSummary {
  const blockerCount = countAuditBlockers(input.audits);
  const warningCount = countAuditWarnings(input.audits);
  const auditStatus: RealCreativeReadinessAuditStatus = input.audits.some(
    (audit) => audit.status === "blocker"
  )
    ? "blocker"
    : input.audits.some((audit) => audit.status === "needs-config")
      ? "needs-config"
      : input.audits.some((audit) => audit.status === "warning")
        ? "warning"
        : "ready";
  const summary: Omit<RealCreativeReadinessSummary, "summary"> = {
    targetExecutorKind: input.readinessInput.targetExecutorKind,
    auditStatus,
    scorecardStatus: input.scorecard.overallScore,
    blockerCount,
    warningCount,
    mvpCandidate: input.scorecard.futureMvpCandidate,
    executionAllowed: false,
    nextSafeAction: input.nextActionPlan.selected.label,
  };

  return { ...summary, summary: summarizeRealCreativeReadinessSession(summary) };
}

export function buildRealCreativeExecutorReadinessModel(
  input: Partial<RealCreativeReadinessInput> = {}
): RealCreativeExecutorReadinessModel {
  const readinessInput = buildRealCreativeReadinessInput(input);
  const inputValidation = validateRealCreativeReadinessInput(readinessInput);
  const bridgeReadinessAudit = buildBridgeReadinessAudit(readinessInput);
  const adapterAllowlistAudit = buildAdapterAllowlistAudit(readinessInput);
  const pathBoundaryAudit = buildPathBoundaryAudit(readinessInput);
  const artifactOutputAudit = buildArtifactOutputAudit(readinessInput);
  const dryRunEvidenceAudit = buildDryRunEvidenceAudit(readinessInput);
  const approvalReadinessAudit = buildApprovalReadinessAudit(readinessInput);
  const killSwitchReadinessAudit = buildKillSwitchReadinessAudit(readinessInput);
  const audits = [
    bridgeReadinessAudit,
    adapterAllowlistAudit,
    pathBoundaryAudit,
    artifactOutputAudit,
    dryRunEvidenceAudit,
    approvalReadinessAudit,
    killSwitchReadinessAudit,
  ];
  const scorecard = buildExecutorReadinessScorecard({
    readinessInput,
    bridgeReadinessAudit,
    adapterAllowlistAudit,
    pathBoundaryAudit,
    artifactOutputAudit,
    dryRunEvidenceAudit,
    approvalReadinessAudit,
    killSwitchReadinessAudit,
  });
  const nextActionPlan = buildRealCreativeReadinessNextActionPlan(scorecard);
  const summary = buildRealCreativeReadinessSummary({
    readinessInput,
    audits,
    scorecard,
    nextActionPlan,
  });

  return {
    input: readinessInput,
    inputValidation,
    bridgeReadinessAudit,
    adapterAllowlistAudit,
    pathBoundaryAudit,
    artifactOutputAudit,
    dryRunEvidenceAudit,
    approvalReadinessAudit,
    killSwitchReadinessAudit,
    scorecard,
    nextActionPlan,
    summary,
  };
}

export function summarizeRealCreativeReadinessSession(
  summary: Omit<RealCreativeReadinessSummary, "summary"> | RealCreativeReadinessSummary
): string[] {
  return [
    `Target executor kind: ${summary.targetExecutorKind}.`,
    `Audit status: ${summary.auditStatus}.`,
    `Scorecard status: ${summary.scorecardStatus}.`,
    `Blockers: ${summary.blockerCount}; warnings: ${summary.warningCount}.`,
    `MVP candidate: ${String(summary.mvpCandidate)}.`,
    `Execution allowed false: ${String(summary.executionAllowed)}.`,
    `Next safe action: ${summary.nextSafeAction}.`,
  ];
}
