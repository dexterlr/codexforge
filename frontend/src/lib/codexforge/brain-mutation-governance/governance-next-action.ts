import type {
  BrainMutationGovernanceNextAction,
  BrainMutationGovernanceNextActionKind,
  BrainMutationGovernanceNextActionPlan,
  BrainMutationIntegrityReport,
  BrainMutationRiskBoard,
  DirectMutationDetectorReport,
  ReducerImpactGovernance,
} from "./brain-mutation-governance-types";
import { buildBrainMutationGovernanceStableKey } from "./brain-mutation-governance-types";

const ACTION_DETAIL: Record<BrainMutationGovernanceNextActionKind, {
  title: string;
  detail: string;
  targetRoute: string;
}> = {
  "review runtime event journal": {
    title: "Review runtime event journal",
    detail: "Review Runtime Event Journal integrity before any guarded runtime event execution decision.",
    targetRoute: "/runtime-journal",
  },
  "review runtime event executor": {
    title: "Review runtime event executor",
    detail: "Review request, policy, validation, approval, reducer preview, audit ledger, and result before append-only event execution.",
    targetRoute: "/memory-inbox",
  },
  "review memory promotion gate": {
    title: "Review memory promotion gate",
    detail: "Review approval, evidence refs, dedupe, contradiction risk, policy confirmation, and request packet before memory.promoted handoff.",
    targetRoute: "/memory-inbox",
  },
  "review operator memory inbox": {
    title: "Review operator memory inbox",
    detail: "Review memory inbox candidates before Memory Promotion Gate request readiness.",
    targetRoute: "/memory-inbox",
  },
  "inspect direct mutation signal": {
    title: "Inspect direct mutation signal",
    detail: "Direct mutation signal appears before feature work; keep direct UI graph mutation blocked.",
    targetRoute: "/brain-governance",
  },
  "inspect reducer preview": {
    title: "Inspect reducer preview",
    detail: "Missing reducer preview must be reviewed before mutation readiness.",
    targetRoute: "/brain-governance",
  },
  "run brain runtime smoke manually": {
    title: "Run brain runtime smoke manually",
    detail: "Copy and run Brain runtime smoke outside the UI; this console never executes commands.",
    targetRoute: "smoke suite",
  },
  "run runtime event executor smoke manually": {
    title: "Run runtime event executor smoke manually",
    detail: "Copy and run Runtime Event Executor smoke outside the UI before execution review.",
    targetRoute: "smoke suite",
  },
  "stop and stabilize": {
    title: "Stop and stabilize",
    detail: "Blockers are present. Stop feature work and stabilize mutation governance posture.",
    targetRoute: "/stabilization",
  },
  "commit clean checkpoint": {
    title: "Commit clean checkpoint",
    detail: "Governance posture is clean; recommend commit, tag, and push only from terminal after explicit operator approval.",
    targetRoute: "/brain-governance",
  },
  "continue next phase": {
    title: "Continue next phase",
    detail: "Governance is reviewed and can continue to the next phase without mutation from this UI.",
    targetRoute: "/mission",
  },
};

function action(
  kind: BrainMutationGovernanceNextActionKind,
  priority: "primary" | "secondary" = "secondary"
): BrainMutationGovernanceNextAction {
  const detail = ACTION_DETAIL[kind];
  return {
    id: buildBrainMutationGovernanceStableKey("brain-mutation-governance-next-action", kind),
    action: kind,
    title: detail.title,
    detail: detail.detail,
    targetRoute: detail.targetRoute,
    priority,
    reviewRequired: kind !== "commit clean checkpoint" && kind !== "continue next phase",
  };
}

export function selectBrainMutationGovernanceNextAction(input: {
  detectorReport?: DirectMutationDetectorReport | null;
  integrityReport?: BrainMutationIntegrityReport | null;
  reducerGovernance?: ReducerImpactGovernance | null;
  riskBoard?: BrainMutationRiskBoard | null;
} = {}): BrainMutationGovernanceNextAction {
  const detectorReport = input.detectorReport;
  const integrityReport = input.integrityReport;
  const reducerGovernance = input.reducerGovernance;
  const riskBoard = input.riskBoard;

  if ((riskBoard?.items.some((item) => item.severity === "blocker" && item.blocked) ?? false) && (integrityReport?.blockerCount ?? 0) > 0) {
    return action("stop and stabilize", "primary");
  }

  if ((detectorReport?.blockedSignalCount ?? 0) > 0) {
    return action("inspect direct mutation signal", "primary");
  }

  if (integrityReport?.checks.some((check) => check.label === "runtime event journal exists" && check.status !== "pass")) {
    return action("review runtime event journal", "primary");
  }

  if (integrityReport?.checks.some((check) => check.label === "reducer preview available" && check.status !== "pass")) {
    return action("inspect reducer preview", "primary");
  }

  if (riskBoard?.items.some((item) => item.id === "silent-memory-promotion" && item.reviewRequired)) {
    return action("review memory promotion gate", "primary");
  }

  if (reducerGovernance?.items.some((item) => item.eventType === "memory.promoted" && item.riskLevel === "high")) {
    return action("review runtime event executor", "primary");
  }

  if ((integrityReport?.riskCount ?? 0) > 0 || (integrityReport?.warningCount ?? 0) > 0) {
    return action("run brain runtime smoke manually", "primary");
  }

  if ((riskBoard?.blockedCount ?? 0) === 0 && (detectorReport?.blockedSignalCount ?? 0) === 0 && (integrityReport?.blockerCount ?? 0) === 0 && (integrityReport?.riskCount ?? 0) === 0) {
    return action("commit clean checkpoint", "primary");
  }

  return action("continue next phase", "primary");
}

export function buildBrainMutationGovernanceNextActionPlan(input: {
  detectorReport?: DirectMutationDetectorReport | null;
  integrityReport?: BrainMutationIntegrityReport | null;
  reducerGovernance?: ReducerImpactGovernance | null;
  riskBoard?: BrainMutationRiskBoard | null;
} = {}): BrainMutationGovernanceNextActionPlan {
  const selected = selectBrainMutationGovernanceNextAction(input);
  const orderedActions = [
    selected,
    action("stop and stabilize"),
    action("inspect direct mutation signal"),
    action("review runtime event journal"),
    action("inspect reducer preview"),
    action("review memory promotion gate"),
    action("review runtime event executor"),
    action("review operator memory inbox"),
    action("run brain runtime smoke manually"),
    action("run runtime event executor smoke manually"),
    action("commit clean checkpoint"),
    action("continue next phase"),
  ].filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);

  const blockers = [
    ...(input.detectorReport?.signals.filter((signal) => signal.blocked).map((signal) => signal.title) ?? []),
    ...(input.integrityReport?.checks.filter((check) => check.status === "blocker").map((check) => check.label) ?? []),
    ...(input.riskBoard?.items.filter((item) => item.blocked && item.severity === "blocker").map((item) => item.title) ?? []),
  ].sort();
  const warnings = [
    ...(input.integrityReport?.checks.filter((check) => check.status === "warning" || check.status === "risk").map((check) => check.label) ?? []),
    ...(input.riskBoard?.items.filter((item) => item.severity === "warning" || item.severity === "risk").map((item) => item.title) ?? []),
  ].sort();

  const plan: BrainMutationGovernanceNextActionPlan = {
    id: "brain-mutation-governance-next-action-plan",
    selected,
    orderedActions,
    blockers,
    warnings,
    summary: [],
  };

  return { ...plan, summary: summarizeBrainMutationGovernanceNextAction(plan) };
}

export function summarizeBrainMutationGovernanceNextAction(
  planOrAction: BrainMutationGovernanceNextActionPlan | BrainMutationGovernanceNextAction
): string[] {
  const selected = "selected" in planOrAction ? planOrAction.selected : planOrAction;
  const blockerCount = "blockers" in planOrAction ? planOrAction.blockers.length : 0;
  const warningCount = "warnings" in planOrAction ? planOrAction.warnings.length : 0;
  return [
    `Next safe action: ${selected.action}.`,
    selected.detail,
    `${blockerCount} blocker(s) and ${warningCount} warning/risk item(s) influence this action.`,
  ];
}
