import type {
  StabilizationCommandCenterInput,
  StabilizationReadiness,
  StabilizationReadinessCheck,
  StabilizationReadinessStatus,
  StabilizationSummaryLike,
} from "./stabilization-types";
import { buildStabilizationStableKey, readStabilizationCount } from "./stabilization-types";

function statusFromSummary(summary?: StabilizationSummaryLike | null, fallback: StabilizationReadinessStatus = "needs-review"): StabilizationReadinessStatus {
  if (!summary) return fallback;
  if (summary.blocked === true || readStabilizationCount(summary.blockerCount) > 0) return "blocked";
  if (readStabilizationCount(summary.blockedCount) > 0) return "warning";
  if (readStabilizationCount(summary.warningCount) > 0) return "warning";
  if (readStabilizationCount(summary.readyCount) > 0 || String(summary.level ?? summary.status ?? "").includes("ready")) return "ready";
  return fallback;
}

export function buildStabilizationReadinessCheck(args: {
  id?: string | null;
  label: string;
  status: StabilizationReadinessStatus;
  detail: string;
  reviewRequired?: boolean | null;
}): StabilizationReadinessCheck {
  return {
    id: args.id ?? buildStabilizationStableKey("stabilization-readiness", args.label),
    label: args.label,
    status: args.status,
    detail: args.detail,
    reviewRequired: args.reviewRequired ?? args.status !== "ready",
  };
}

export function buildStabilizationReadiness(input: StabilizationCommandCenterInput = {}): StabilizationReadiness {
  const checks: StabilizationReadinessCheck[] = [
    buildStabilizationReadinessCheck({
      label: "build result reviewed",
      status: statusFromSummary(input.buildSummary),
      detail: "Operator must review build result manually; this dashboard does not run build.",
    }),
    buildStabilizationReadinessCheck({
      label: "smoke result reviewed",
      status: statusFromSummary(input.smokeSummary),
      detail: "Smoke validation is manual-only and copied into stabilization as context.",
    }),
    buildStabilizationReadinessCheck({
      label: "regression queue reviewed",
      status: statusFromSummary(input.regressionTriageSummary),
      detail: "Regression triage should be reviewed before fix queue work.",
    }),
    buildStabilizationReadinessCheck({
      label: "fix queue reviewed",
      status: statusFromSummary(input.regressionFixQueueSummary),
      detail: "Regression Fix Queue must be reviewed before Safe Patch Preview.",
    }),
    buildStabilizationReadinessCheck({
      label: "patch queue reviewed",
      status: statusFromSummary(input.patchQueueSummary),
      detail: "Patch Preview Queue requires operator review.",
    }),
    buildStabilizationReadinessCheck({
      label: "apply gate reviewed",
      status: statusFromSummary(input.applyGateSummary),
      detail: "Apply gate remains display-only here and requires explicit review elsewhere.",
    }),
    buildStabilizationReadinessCheck({
      label: "rollback plan visible",
      status: statusFromSummary(input.rollbackSummary ?? input.postApplyVerificationSummary),
      detail: "Rollback plan must be visible before any future guarded apply.",
    }),
    buildStabilizationReadinessCheck({
      label: "verification commands copied manually only",
      status: "needs-review",
      detail: "Validation commands may be copied, but no command execution is triggered by the UI.",
    }),
    buildStabilizationReadinessCheck({
      label: "memory candidates review-required",
      status: statusFromSummary(input.memoryReviewSummary, "ready"),
      detail: "Memory candidates remain review-required; no auto-promotion.",
    }),
    buildStabilizationReadinessCheck({
      label: "Memory Promotion Gate readiness",
      status: "needs-review",
      detail: "Review memory promotion gate approval, policy, event preview, request packet, and blocked execution bridge before any future guarded runtime promotion.",
    }),
    buildStabilizationReadinessCheck({
      label: "Guarded Runtime Event Executor readiness",
      status: "needs-review",
      detail: "Runtime Event Executor readiness requires request, policy, validation, explicit approval, reducer preview, audit ledger, and result review; Review runtime event executor before any append-only runtime event execution.",
    }),
    buildStabilizationReadinessCheck({
      label: "Runtime Event Journal readiness",
      status: "needs-review",
      detail: "Review runtime event journal for requests, approvals, policy, validation, dry-runs, reducer previews, blocked or ready results, append-only audit refs, and source handoffs before any guarded runtime event decision.",
    }),
    buildStabilizationReadinessCheck({
      label: "Runtime Event Replay readiness",
      status: "needs-review",
      detail: "Review Runtime Event Replay Simulator for selected journal events, graph snapshot reducer preview, impact analysis, risk detection, and rollback guidance; preview-only, no graph mutation, no appendEvent, no event execution, and no auto-persistence.",
    }),
    buildStabilizationReadinessCheck({
      label: "Brain Mutation Governance readiness",
      status: "needs-review",
      detail: "Review Brain Mutation Governance for approved mutation boundaries, blocked direct mutation signals, reducer impact governance, runtime journal integrity posture, risk board, and next safe action before any Brain or memory mutation path.",
    }),
    buildStabilizationReadinessCheck({
      label: "latest-message authority preserved",
      status: input.latestMessageAuthorityPreserved === false ? "blocked" : "ready",
      detail: "Handoffs must preserve latest-message authority and visible operator context.",
    }),
    buildStabilizationReadinessCheck({
      label: "mutation tools blocked unless explicit approval",
      status: "ready",
      detail: "Stabilization blocks mutation tools unless a future explicit approval path outside this UI is used.",
      reviewRequired: false,
    }),
  ];

  const readyCount = checks.filter((check) => check.status === "ready").length;
  const warningCount = checks.filter((check) => check.status === "warning").length;
  const blockedCount = checks.filter((check) => check.status === "blocked").length;
  const score = Math.round((readyCount / checks.length) * 100);

  return {
    id: "stabilization-readiness",
    checks,
    readyCount,
    warningCount,
    blockedCount,
    score,
    summary: summarizeStabilizationReadiness({ checks, readyCount, warningCount, blockedCount, score }),
  };
}

export function summarizeStabilizationReadiness(readiness: Pick<StabilizationReadiness, "checks" | "readyCount" | "warningCount" | "blockedCount" | "score">): string[] {
  return [
    `${readiness.readyCount}/${readiness.checks.length} readiness checks are ready.`,
    `${readiness.blockedCount} blocked and ${readiness.warningCount} warning checks require review.`,
    `Readiness score is ${readiness.score}.`,
  ];
}
