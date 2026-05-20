import type {
  AdapterAllowlistAudit,
  ApprovalReadinessAudit,
  ArtifactOutputAudit,
  BridgeReadinessAudit,
  DryRunEvidenceAudit,
  ExecutorReadinessScore,
  ExecutorReadinessScoreCategory,
  ExecutorReadinessScorecard,
  KillSwitchReadinessAudit,
  PathBoundaryAudit,
  RealCreativeReadinessAudit,
  RealCreativeReadinessInput,
  RealCreativeReadinessScore,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessStableId } from "./real-creative-readiness-types";
import { buildAdapterAllowlistAudit } from "./adapter-allowlist-audit";
import { buildApprovalReadinessAudit } from "./approval-readiness-audit";
import { buildArtifactOutputAudit } from "./artifact-output-audit";
import { buildBridgeReadinessAudit } from "./bridge-readiness-audit";
import { buildDryRunEvidenceAudit } from "./dry-run-evidence-audit";
import { buildKillSwitchReadinessAudit } from "./kill-switch-readiness-audit";
import { buildPathBoundaryAudit } from "./path-boundary-audit";
import { buildRealCreativeReadinessInput } from "./readiness-input";

function scoreFromAudit(audit: RealCreativeReadinessAudit): RealCreativeReadinessScore {
  if (audit.blockerCount > 0) return "blocked";
  if (audit.status === "warning") return "dry-run-ready";
  if (audit.status === "ready") return "health-probe-ready";
  return "unknown";
}

function blockedReasonsForAudit(audit: RealCreativeReadinessAudit): string[] {
  return audit.items
    .filter((item) => item.status === "blocker" || item.status === "needs-config")
    .map((item) => `${item.label}: ${item.nextStep}`);
}

export function buildExecutorReadinessScore(input: {
  scorecardId: string;
  category: ExecutorReadinessScoreCategory;
  score: RealCreativeReadinessScore;
  passed: boolean;
  critical: boolean;
  detail: string;
  blockedReasons?: string[];
}): ExecutorReadinessScore {
  return {
    scoreId: buildRealCreativeReadinessStableId("executor-readiness-score", [
      input.scorecardId,
      input.category,
    ]),
    category: input.category,
    score: input.score,
    passed: input.passed,
    critical: input.critical,
    detail: input.detail,
    blockedReasons: input.blockedReasons ?? [],
  };
}

export function buildExecutorReadinessScorecard(input: {
  readinessInput?: RealCreativeReadinessInput;
  bridgeReadinessAudit?: BridgeReadinessAudit;
  adapterAllowlistAudit?: AdapterAllowlistAudit;
  pathBoundaryAudit?: PathBoundaryAudit;
  artifactOutputAudit?: ArtifactOutputAudit;
  dryRunEvidenceAudit?: DryRunEvidenceAudit;
  approvalReadinessAudit?: ApprovalReadinessAudit;
  killSwitchReadinessAudit?: KillSwitchReadinessAudit;
} = {}): ExecutorReadinessScorecard {
  const readinessInput = input.readinessInput ?? buildRealCreativeReadinessInput();
  const bridgeReadinessAudit = input.bridgeReadinessAudit ?? buildBridgeReadinessAudit(readinessInput);
  const adapterAllowlistAudit = input.adapterAllowlistAudit ?? buildAdapterAllowlistAudit(readinessInput);
  const pathBoundaryAudit = input.pathBoundaryAudit ?? buildPathBoundaryAudit(readinessInput);
  const artifactOutputAudit = input.artifactOutputAudit ?? buildArtifactOutputAudit(readinessInput);
  const dryRunEvidenceAudit = input.dryRunEvidenceAudit ?? buildDryRunEvidenceAudit(readinessInput);
  const approvalReadinessAudit = input.approvalReadinessAudit ?? buildApprovalReadinessAudit(readinessInput);
  const killSwitchReadinessAudit = input.killSwitchReadinessAudit ?? buildKillSwitchReadinessAudit(readinessInput);
  const scorecardId = buildRealCreativeReadinessStableId("executor-readiness-scorecard", [
    readinessInput.auditId,
    readinessInput.targetExecutorKind,
  ]);
  const auditScores = [
    ["bridge health", bridgeReadinessAudit],
    ["adapter allowlist", adapterAllowlistAudit],
    ["path boundaries", pathBoundaryAudit],
    ["artifact output", artifactOutputAudit],
    ["dry-run evidence", dryRunEvidenceAudit],
    ["approval readiness", approvalReadinessAudit],
    ["kill-switch readiness", killSwitchReadinessAudit],
  ] as const;
  const scores = auditScores.map(([category, audit]) =>
    buildExecutorReadinessScore({
      scorecardId,
      category,
      score: scoreFromAudit(audit),
      passed: audit.blockerCount === 0,
      critical: true,
      detail: audit.summary.join(" "),
      blockedReasons: blockedReasonsForAudit(audit),
    })
  );
  scores.push(
    buildExecutorReadinessScore({
      scorecardId,
      category: "UX/operator clarity",
      score: readinessInput.evidence.uxOperatorClarityReady ? "ready-for-audit" : "blocked",
      passed: readinessInput.evidence.uxOperatorClarityReady,
      critical: false,
      detail: "UX/operator clarity requires calm workflow layout, no execution buttons, and visible copy-only handoffs.",
      blockedReasons: readinessInput.evidence.uxOperatorClarityReady ? [] : ["UX/operator clarity not ready."],
    }),
    buildExecutorReadinessScore({
      scorecardId,
      category: "smoke coverage",
      score: readinessInput.evidence.smokeCoverageReady ? "ready-for-audit" : "blocked",
      passed: readinessInput.evidence.smokeCoverageReady,
      critical: true,
      detail: "Smoke coverage must include Phase 70 and managed suite inclusion exactly once.",
      blockedReasons: readinessInput.evidence.smokeCoverageReady ? [] : ["Smoke coverage missing."],
    })
  );
  const criticalScores = scores.filter((score) => score.critical);
  const criticalPass = criticalScores.every((score) => score.passed);
  const futureExecutionScore: RealCreativeReadinessScore = criticalPass ? "mvp-candidate" : "blocked";
  scores.push(
    buildExecutorReadinessScore({
      scorecardId,
      category: "future execution readiness",
      score: futureExecutionScore,
      passed: criticalPass,
      critical: true,
      detail: criticalPass
        ? "All critical categories pass, so this can be a future MVP candidate only; Phase 70 still blocks execution."
        : "Future execution readiness is blocked until all critical categories pass.",
      blockedReasons: criticalPass ? [] : ["One or more critical readiness categories are blocked."],
    })
  );
  const blockedReasons = scores.flatMap((score) => score.blockedReasons);
  const futureMvpCandidate = criticalPass;
  const overallScore: RealCreativeReadinessScore = futureMvpCandidate
    ? "mvp-candidate"
    : blockedReasons.length > 0
      ? "blocked"
      : "ready-for-audit";
  const scorecard: ExecutorReadinessScorecard = {
    scorecardId,
    targetExecutorKind: readinessInput.targetExecutorKind,
    scores,
    overallScore,
    executionAllowed: false,
    futureMvpCandidate,
    blockedReasons,
    summary: [],
  };

  return { ...scorecard, summary: summarizeExecutorReadinessScorecard(scorecard) };
}

export function summarizeExecutorReadinessScorecard(
  scorecard: Pick<ExecutorReadinessScorecard, "overallScore" | "scores" | "executionAllowed" | "futureMvpCandidate" | "blockedReasons">
): string[] {
  return [
    `Executor readiness scorecard status: ${scorecard.overallScore}.`,
    `executionAllowed false in Phase 70: ${String(scorecard.executionAllowed)}.`,
    `Future MVP candidate: ${String(scorecard.futureMvpCandidate)}.`,
    `${scorecard.blockedReasons.length} blocked reason(s) remain visible.`,
    "Scorecard supports mvp-candidate only when bridge health, adapter allowlist, path boundaries, artifact output, dry-run evidence, approval readiness, kill-switch readiness, smoke coverage, and future execution readiness pass.",
  ];
}
