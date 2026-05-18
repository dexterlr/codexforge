import type {
  BrainMutationBoundaryType,
  BrainMutationRiskBoard,
  BrainMutationRiskId,
  BrainMutationRiskItem,
  BrainMutationRiskSeverity,
} from "./brain-mutation-governance-types";

const SEVERITY_SCORE: Record<BrainMutationRiskSeverity, number> = {
  blocker: 1000,
  risk: 700,
  warning: 420,
  info: 120,
};

const RISK_DEFAULTS: Record<BrainMutationRiskId, Omit<BrainMutationRiskItem, "id">> = {
  "direct-ui-graph-mutation": {
    title: "Direct UI graph mutation",
    severity: "blocker",
    source: "Brain UI or governance UI",
    mitigation: "Keep direct UI mutation blocked and route through approved boundary with reducer preview.",
    requiredBoundary: "direct-ui-mutation-block",
    reviewRequired: true,
    blocked: true,
  },
  "silent-memory-promotion": {
    title: "Silent memory promotion",
    severity: "blocker",
    source: "Memory promotion flow",
    mitigation: "Require Memory Promotion Gate, explicit approval, evidence refs, and Runtime Event Executor.",
    requiredBoundary: "memory-promotion-gate",
    reviewRequired: true,
    blocked: true,
  },
  "missing-runtime-event-journal": {
    title: "Missing Runtime Event Journal",
    severity: "blocker",
    source: "Audit posture",
    mitigation: "Review Runtime Event Journal before event execution decisions.",
    requiredBoundary: "runtime-event-journal",
    reviewRequired: true,
    blocked: true,
  },
  "missing-reducer-preview": {
    title: "Missing reducer preview",
    severity: "risk",
    source: "Graph reducer",
    mitigation: "Review Runtime Event Replay Simulator reducer preview before mutation readiness.",
    requiredBoundary: "graph-reducer-preview",
    reviewRequired: true,
    blocked: true,
  },
  "missing-approval-packet": {
    title: "Missing approval packet",
    severity: "risk",
    source: "Approval boundary",
    mitigation: "Require explicit operator approval packet before request-ready mutation.",
    requiredBoundary: "runtime-event-executor",
    reviewRequired: true,
    blocked: true,
  },
  "stale-evidence": {
    title: "Stale evidence",
    severity: "warning",
    source: "Evidence refs",
    mitigation: "Treat evidence as context, not authority, and verify current context.",
    requiredBoundary: "memory-review",
    reviewRequired: true,
    blocked: false,
  },
  "contradiction-risk": {
    title: "Contradiction risk",
    severity: "risk",
    source: "Memory review",
    mitigation: "Require contradiction review before memory.promoted request readiness.",
    requiredBoundary: "memory-promotion-gate",
    reviewRequired: true,
    blocked: true,
  },
  "duplicate-memory-risk": {
    title: "Duplicate memory risk",
    severity: "warning",
    source: "Memory review",
    mitigation: "Run dedupe review before memory promotion approval.",
    requiredBoundary: "memory-promotion-gate",
    reviewRequired: true,
    blocked: false,
  },
  "legacy-schema-import": {
    title: "Legacy schema import",
    severity: "blocker",
    source: "Import boundary",
    mitigation: "Block legacy brain-graph imports and use canonical graph schema path.",
    requiredBoundary: "direct-ui-mutation-block",
    reviewRequired: true,
    blocked: true,
  },
  "unreviewed-event-type": {
    title: "Unreviewed event type",
    severity: "risk",
    source: "Runtime event policy",
    mitigation: "Unknown event type blocked until reducer impact and policy are defined.",
    requiredBoundary: "runtime-event-executor",
    reviewRequired: true,
    blocked: true,
  },
  "latest-message-authority-risk": {
    title: "Latest-message authority risk",
    severity: "blocker",
    source: "Operator instruction handling",
    mitigation: "Preserve latest-message authority before review, handoff, or mutation request.",
    requiredBoundary: "direct-ui-mutation-block",
    reviewRequired: true,
    blocked: true,
  },
  "unknown-risk": {
    title: "Unknown risk",
    severity: "risk",
    source: "Unknown boundary",
    mitigation: "Stop and stabilize until the risk maps to a known governance boundary.",
    requiredBoundary: "unknown",
    reviewRequired: true,
    blocked: true,
  },
};

export function buildBrainMutationRiskItem(
  input: Partial<BrainMutationRiskItem> & { id: BrainMutationRiskId }
): BrainMutationRiskItem {
  const defaults = RISK_DEFAULTS[input.id];
  return {
    id: input.id,
    title: input.title ?? defaults.title,
    severity: input.severity ?? defaults.severity,
    source: input.source ?? defaults.source,
    mitigation: input.mitigation ?? defaults.mitigation,
    requiredBoundary: (input.requiredBoundary ?? defaults.requiredBoundary) as BrainMutationBoundaryType,
    reviewRequired: input.reviewRequired ?? defaults.reviewRequired,
    blocked: input.blocked ?? defaults.blocked,
  };
}

export function buildBrainMutationRiskBoard(
  suppliedRisks: readonly (Partial<BrainMutationRiskItem> & { id: BrainMutationRiskId })[] = []
): BrainMutationRiskBoard {
  const defaults = Object.keys(RISK_DEFAULTS).map((id) => buildBrainMutationRiskItem({ id: id as BrainMutationRiskId }));
  const overrides = new Map(suppliedRisks.map((risk) => [risk.id, risk]));
  const items = defaults
    .map((item) => (overrides.has(item.id) ? buildBrainMutationRiskItem({ ...item, ...overrides.get(item.id), id: item.id }) : item))
    .sort((a, b) => SEVERITY_SCORE[b.severity] - SEVERITY_SCORE[a.severity] || a.id.localeCompare(b.id));

  const board: BrainMutationRiskBoard = {
    id: "brain-mutation-risk-board",
    items,
    topRisk: items[0] ?? null,
    blockedCount: items.filter((item) => item.blocked).length,
    reviewRequiredCount: items.filter((item) => item.reviewRequired).length,
    summary: [],
  };

  return { ...board, summary: summarizeBrainMutationRiskBoard(board) };
}

export function summarizeBrainMutationRiskBoard(
  board: Pick<BrainMutationRiskBoard, "items" | "topRisk" | "blockedCount" | "reviewRequiredCount">
): string[] {
  return [
    `${board.items.length} mutation risks visible for operator review.`,
    `${board.blockedCount} risks are blocked and ${board.reviewRequiredCount} require review.`,
    `Top risk: ${board.topRisk?.title ?? "No risk selected"}.`,
  ];
}
