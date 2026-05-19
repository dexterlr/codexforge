import type {
  StabilizationCommandCenterInput,
  StabilizationNextAction,
  StabilizationNextActionKind,
  StabilizationNextActionPlan,
  StabilizationQueueRollup,
  StabilizationReadiness,
  StabilizationRelatedSurface,
  StabilizationRiskBoard,
  StabilizationSignal,
} from "./stabilization-types";
import {
  buildStabilizationStableKey,
  normalizeStabilizationValidationCommands,
} from "./stabilization-types";
import { buildStabilizationSignals } from "./stabilization-signal-model";
import { buildStabilizationQueueRollup } from "./stabilization-queue-rollup";
import { buildStabilizationReadiness } from "./stabilization-readiness";
import { buildStabilizationRiskBoard } from "./stabilization-risk-board";

const ACTION_DETAIL: Record<StabilizationNextActionKind, { title: string; detail: string; targetRoute: StabilizationRelatedSurface }> = {
  "commit clean checkpoint": {
    title: "Commit clean checkpoint",
    detail: "All reviewed posture is clean; commit, tag, and push from the terminal after manual verification.",
    targetRoute: "/stabilization",
  },
  "run targeted smoke manually": {
    title: "Run targeted smoke manually",
    detail: "Smoke needs fresh evidence. Copy validation commands and run them outside this UI.",
    targetRoute: "smoke suite",
  },
  "paste verification output": {
    title: "Paste verification output",
    detail: "Verification evidence is missing or stale. Paste output before planning further changes.",
    targetRoute: "/ai",
  },
  "review regression triage": {
    title: "Review regression triage",
    detail: "Failed or warning signals must be triaged before queueing a fix.",
    targetRoute: "/ai",
  },
  "review regression fix queue": {
    title: "Review regression fix queue",
    detail: "Review prioritized fix queue items before Safe Patch Preview.",
    targetRoute: "/ai",
  },
  "prepare Safe Patch Preview": {
    title: "Prepare Safe Patch Preview",
    detail: "Use Safe Patch Preview for any future edit path; stabilization does not write files.",
    targetRoute: "/ai",
  },
  "compose preview diff": {
    title: "Compose preview diff",
    detail: "Use Preview Diff Composer after Safe Patch Preview review and before apply gate review.",
    targetRoute: "/ai",
  },
  "review apply gate": {
    title: "Review apply gate",
    detail: "Review Patch Application Gate, dry run, and execution gate posture; no direct dispatch here.",
    targetRoute: "/ai",
  },
  "review approved patch apply": {
    title: "Review approved patch apply",
    detail: "Review Approved Patch Apply readiness, apply request, approval packet, preflight, dry-run preview, rollback, and validation commands; run validation manually.",
    targetRoute: "/files",
  },
  "review runtime event executor": {
    title: "Review runtime event executor",
    detail: "Review Guarded Runtime Event Executor request, policy, validation, approval, reducer preview, audit ledger, and result before append-only execution.",
    targetRoute: "/memory-inbox",
  },
  "review runtime event journal": {
    title: "Review runtime event journal",
    detail: "Review Runtime Event Journal lifecycle visibility before deciding on any guarded runtime event handoff.",
    targetRoute: "/runtime-journal",
  },
  "review runtime event replay": {
    title: "Review runtime event replay",
    detail: "Review Runtime Event Replay Simulator reducer preview, impact analysis, risk detection, and rollback guidance before any guarded runtime event handoff.",
    targetRoute: "/runtime-replay",
  },
  "review brain mutation governance": {
    title: "Review brain mutation governance",
    detail: "Review Brain Mutation Governance readiness for boundaries, direct mutation signals, reducer impact, journal integrity, and risk before any mutation path.",
    targetRoute: "/brain-governance",
  },
  "prepare rollback": {
    title: "Prepare rollback",
    detail: "Make rollback notes visible before any future guarded apply path.",
    targetRoute: "/ai",
  },
  "stop and stabilize": {
    title: "Stop and stabilize",
    detail: "A blocker or policy boundary risk is present. Stop feature work and stabilize the current state.",
    targetRoute: "/stabilization",
  },
  "continue next phase": {
    title: "Continue next phase",
    detail: "All stabilization checks are reviewed and no blockers remain.",
    targetRoute: "/mission",
  },
};

function makeAction(action: StabilizationNextActionKind, priority: "primary" | "secondary" = "secondary"): StabilizationNextAction {
  const detail = ACTION_DETAIL[action];
  return {
    id: buildStabilizationStableKey("stabilization-next-action", action),
    action,
    title: detail.title,
    detail: detail.detail,
    priority,
    targetRoute: detail.targetRoute,
    reviewRequired: action !== "continue next phase" && action !== "commit clean checkpoint",
  };
}

function hasSignal(signals: readonly StabilizationSignal[], type: StabilizationSignal["type"], severities: readonly StabilizationSignal["severity"][]): boolean {
  return signals.some((signal) => signal.type === type && severities.includes(signal.severity));
}

function findRollup(rollup: StabilizationQueueRollup, label: string) {
  return rollup.items.find((item) => item.label === label);
}

export function selectStabilizationNextAction(args: {
  signals?: readonly StabilizationSignal[] | null;
  queueRollup?: StabilizationQueueRollup | null;
  readiness?: StabilizationReadiness | null;
  riskBoard?: StabilizationRiskBoard | null;
} = {}): StabilizationNextAction {
  const signals = args.signals ?? [];
  const readiness = args.readiness;
  const riskBoard = args.riskBoard;
  const queueRollup = args.queueRollup;

  if (
    signals.some((signal) => signal.severity === "blocker") ||
    readiness?.blockedCount ||
    riskBoard?.blockerCount
  ) {
    return makeAction("stop and stabilize", "primary");
  }

  if (hasSignal(signals, "build-posture", ["warning", "risk"])) {
    return makeAction("paste verification output", "primary");
  }

  if (hasSignal(signals, "smoke-posture", ["warning", "risk"])) {
    return makeAction("run targeted smoke manually", "primary");
  }

  if (hasSignal(signals, "verification-posture", ["warning", "risk"]) || hasSignal(signals, "unknown", ["warning"])) {
    return makeAction("paste verification output", "primary");
  }

  const triage = queueRollup ? findRollup(queueRollup, "Regression Triage") : null;
  if (triage && triage.count > 0 && triage.riskPosture !== "ready") {
    return makeAction("review regression triage", "primary");
  }

  const fixQueue = queueRollup ? findRollup(queueRollup, "Regression Fix Queue") : null;
  if (fixQueue && fixQueue.count > 0 && fixQueue.readyCount === 0) {
    return makeAction("review regression fix queue", "primary");
  }

  const patchQueue = queueRollup ? findRollup(queueRollup, "Patch Preview Queue") : null;
  if (patchQueue && patchQueue.count > 0 && patchQueue.readyCount > 0) {
    return makeAction("prepare Safe Patch Preview", "primary");
  }

  const previewDiff = queueRollup ? findRollup(queueRollup, "Preview Diff Composer") : null;
  if (previewDiff && previewDiff.count > 0) {
    return makeAction("compose preview diff", "primary");
  }

  const applyGate = queueRollup ? findRollup(queueRollup, "Patch Application Gate") : null;
  if (applyGate && applyGate.count > 0) {
    return makeAction("review apply gate", "primary");
  }

  const approvedPatchApply = queueRollup ? findRollup(queueRollup, "Approved Patch Apply") : null;
  if (approvedPatchApply && approvedPatchApply.count > 0) {
    return makeAction("review approved patch apply", "primary");
  }

  if (signals.some((signal) => signal.type === "rollback-posture" && signal.reviewRequired)) {
    return makeAction("prepare rollback", "primary");
  }

  if (readiness?.checks.some((check) => check.label === "Guarded Runtime Event Executor readiness" && check.reviewRequired)) {
    return makeAction("review runtime event executor", "primary");
  }

  if (readiness?.checks.some((check) => check.label === "Runtime Event Journal readiness" && check.reviewRequired)) {
    return makeAction("review runtime event journal", "primary");
  }

  if (readiness?.checks.some((check) => check.label === "Runtime Event Replay readiness" && check.reviewRequired)) {
    return makeAction("review runtime event replay", "primary");
  }

  if (readiness?.checks.some((check) => check.label === "Brain Mutation Governance readiness" && check.reviewRequired)) {
    return makeAction("review brain mutation governance", "primary");
  }

  if (readiness && readiness.readyCount === readiness.checks.length && riskBoard?.blockerCount === 0 && riskBoard.warningCount === 0) {
    return makeAction("commit clean checkpoint", "primary");
  }

  return makeAction("continue next phase", "primary");
}

export function buildStabilizationNextActionPlan(input: StabilizationCommandCenterInput = {}): StabilizationNextActionPlan {
  const signals = buildStabilizationSignals(input);
  const queueRollup = buildStabilizationQueueRollup(input);
  const readiness = buildStabilizationReadiness(input);
  const riskBoard = buildStabilizationRiskBoard(input);
  const selected = selectStabilizationNextAction({ signals, queueRollup, readiness, riskBoard });
  const orderedActions = [
    selected,
    makeAction("stop and stabilize"),
    makeAction("paste verification output"),
    makeAction("review regression triage"),
    makeAction("review regression fix queue"),
    makeAction("prepare Safe Patch Preview"),
    makeAction("compose preview diff"),
    makeAction("review apply gate"),
    makeAction("review approved patch apply"),
    makeAction("review runtime event executor"),
    makeAction("review runtime event journal"),
    makeAction("review runtime event replay"),
    makeAction("review brain mutation governance"),
    makeAction("prepare rollback"),
    makeAction("run targeted smoke manually"),
    makeAction("commit clean checkpoint"),
    makeAction("continue next phase"),
  ].filter((action, index, all) => all.findIndex((item) => item.id === action.id) === index);
  const blockers = [
    ...signals.filter((signal) => signal.severity === "blocker").map((signal) => signal.title),
    ...riskBoard.items.filter((item) => item.severity === "blocker").map((item) => item.title),
  ].sort();
  const warnings = [
    ...signals.filter((signal) => signal.severity === "warning" || signal.severity === "risk").map((signal) => signal.title),
    ...riskBoard.items.filter((item) => item.severity === "warning" || item.severity === "risk").map((item) => item.title),
  ].sort();
  const validationCommands = normalizeStabilizationValidationCommands(input.validationCommands);

  return {
    id: "stabilization-next-action-plan",
    selected,
    orderedActions,
    blockers,
    warnings,
    validationCommands,
    summary: summarizeStabilizationNextAction({ selected, orderedActions, blockers, warnings, validationCommands }),
  };
}

export function summarizeStabilizationNextAction(plan: Pick<StabilizationNextActionPlan, "selected" | "orderedActions" | "blockers" | "warnings" | "validationCommands">): string[] {
  return [
    `Selected next safe action: ${plan.selected.action}.`,
    `${plan.blockers.length} blocker(s) and ${plan.warnings.length} warning(s) influenced the action.`,
    `${plan.orderedActions.length} deterministic next actions are ordered for review.`,
    `${plan.validationCommands.length} validation commands are copy-only.`,
  ];
}
