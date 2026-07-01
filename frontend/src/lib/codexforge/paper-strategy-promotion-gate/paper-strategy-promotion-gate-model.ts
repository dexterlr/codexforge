export type PaperStrategyPromotionGateRouteSlug =
  | "paper-strategy-promotion-gate-boundary"
  | "promotion-eligibility-checklist-preview"
  | "evidence-sufficiency-gate-preview"
  | "risk-governor-gate-preview"
  | "mandate-compatibility-gate-preview"
  | "version-readiness-gate-preview"
  | "simulated-paper-readiness-score-preview"
  | "promotion-blocker-queue-preview"
  | "operator-promotion-review-preview"
  | "promotion-rejection-packet-preview"
  | "promotion-hold-state-preview"
  | "promotion-approval-boundary-preview"
  | "no-auto-promote-execution-boundary-preview"
  | "cockpit-paper-strategy-promotion-gate-summary"
  | "first-paper-strategy-promotion-gate-candidate"
  | "controlled-paper-strategy-promotion-gate-release-candidate";

export type PaperStrategyPromotionGateKind = "paper-strategy-promotion-gate-v1" | PaperStrategyPromotionGateRouteSlug;

export type PaperStrategyPromotionGateState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type PaperStrategyPromotionGateItem = {
  id: string;
  label: string;
  detail: string;
  state: PaperStrategyPromotionGateState;
};

export type PaperStrategyPromotionGateSectionId =
  | "promotionEligibilityChecklist"
  | "evidenceSufficiencyGate"
  | "riskGovernorGate"
  | "mandateCompatibilityGate"
  | "versionReadinessGate"
  | "simulatedPaperReadinessScore"
  | "promotionBlockerQueue"
  | "operatorPromotionReview"
  | "promotionRejectionPacket"
  | "promotionHoldState"
  | "promotionApprovalBoundary"
  | "noAutoPromoteExecutionBoundary"
  | "deniedPaperStrategyPromotionGateBoundaries";

export type PaperStrategyPromotionGateSection = {
  sectionId: PaperStrategyPromotionGateSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly PaperStrategyPromotionGateItem[];
  state: PaperStrategyPromotionGateState;
};

export type PaperStrategyPromotionGateModel = {
  paperStrategyPromotionGateId: string;
  paperStrategyPromotionGateKind: PaperStrategyPromotionGateKind;
  promotionEligibilityChecklist: PaperStrategyPromotionGateSection;
  evidenceSufficiencyGate: PaperStrategyPromotionGateSection;
  riskGovernorGate: PaperStrategyPromotionGateSection;
  mandateCompatibilityGate: PaperStrategyPromotionGateSection;
  versionReadinessGate: PaperStrategyPromotionGateSection;
  simulatedPaperReadinessScore: PaperStrategyPromotionGateSection;
  promotionBlockerQueue: PaperStrategyPromotionGateSection;
  operatorPromotionReview: PaperStrategyPromotionGateSection;
  promotionRejectionPacket: PaperStrategyPromotionGateSection;
  promotionHoldState: PaperStrategyPromotionGateSection;
  promotionApprovalBoundary: PaperStrategyPromotionGateSection;
  noAutoPromoteExecutionBoundary: PaperStrategyPromotionGateSection;
  deniedPaperStrategyPromotionGateBoundaries: PaperStrategyPromotionGateSection;
  cockpitSummary: readonly PaperStrategyPromotionGateItem[];
  explicitSafetyLimits: readonly string[];
};

export type PaperStrategyPromotionGateRouteDefinition = {
  slug: PaperStrategyPromotionGateRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly PaperStrategyPromotionGateSectionId[];
  devOnly: boolean;
};

export type PaperStrategyPromotionGateRouteModel = {
  route: PaperStrategyPromotionGateRouteDefinition;
  paperStrategyPromotionGate: PaperStrategyPromotionGateModel;
  sections: readonly PaperStrategyPromotionGateSection[];
  diagnosticRoutes: readonly PaperStrategyPromotionGateRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PAPER_STRATEGY_PROMOTION_GATE_COCKPIT_MARKERS = [
  "Paper Strategy Promotion Gate",
  "Promotion Eligibility Checklist",
  "Evidence Sufficiency Gate",
  "Risk Governor Gate",
  "Mandate Compatibility Gate",
  "Version Readiness Gate",
  "Simulated Paper Readiness Score",
  "Promotion Blocker Queue",
  "Operator Promotion Review",
  "Promotion Rejection Packet",
  "Promotion Hold State",
  "Promotion Approval Boundary",
  "No Auto Promote Execution Boundary",
  "Review-only paper strategy promotion gate",
  "Synthetic data only",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No strategy auto promotion from the cockpit",
  "No strategy auto tuning from the cockpit",
  "No automatic rule mutation from the cockpit",
  "No frontend file mutation",
  "No frontend approval persistence",
  "No frontend version persistence",
  "No real P&L analysis from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No broker execution from the cockpit",
  "No paper execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No performance guarantees",
  "Backend-owned promotion workflow remains required",
  "Backend-owned version registry remains required",
  "Backend-owned change workflow remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Paper Strategy Promotion Gate v1 is deterministic static review content only.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated strategy optimisation.",
  "This is not strategy auto-promotion.",
  "This is not automatic rule mutation.",
  "This is not strategy auto-promotion approval.",
  "This is not live trading.",
  "This is not real P&L analysis.",
  "This is not order placement.",
  "This is not broker execution.",
  "This is not paper execution.",
  "This is not live market data.",
  "This is not money movement.",
  "This is not file mutation from the frontend.",
  "This is not approval persistence from the frontend.",
  "This is not strategy version persistence from the frontend.",
  "This is not evidence persistence from the frontend.",
  "Review-only paper strategy promotion gate.",
  "Synthetic data only.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "No strategy auto promotion from the cockpit.",
  "No strategy auto tuning from the cockpit.",
  "No automatic rule mutation from the cockpit.",
  "No frontend file mutation.",
  "No frontend approval persistence.",
  "No frontend version persistence.",
  "No real P&L analysis from the cockpit.",
  "No live market data calls from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No broker execution from the cockpit.",
  "No paper execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No performance guarantees.",
  "Backend-owned promotion workflow remains required.",
  "Backend-owned version registry remains required.",
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future paper strategy promotion workflows remain backend-owned, version-registry-backed, change-workflow-backed, evidence-captured, approval-captured, operator-reviewed, risk-governed, kill-switch enforced, and explicitly approved.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, strategy auto tuning, strategy auto promotion, automatic rule mutation, broker instruction, automated trading, order placement, order dispatch, paper execution, live execution, account access, money movement, real P&L analysis, live market data, version persistence, evidence persistence, audit persistence, approval persistence, file write, model call, provider call, connector call, prompt sending, command execution, or worker dispatch.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, credential storage, endpoint storage, account dashboard read, account read, buying power read, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, live execution, paper execution, strategy mutation, rule mutation, parameter optimisation, strategy auto tuning, strategy auto promotion, version promotion, version persistence, approval persistence, evidence persistence, queue persistence, transaction persistence, audit persistence, memory promotion, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, report write, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned promotion workflow remains required.",
  "Backend-owned version registry remains required.",
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly PaperStrategyPromotionGateItem[] {
  return [
    {
      id: prefix + "-summary",
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: prefix + "-blocked",
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: prefix + "-approval",
      label: "Approval requirement",
      detail: approval,
      state: "needs-approval",
    },
  ];
}

function createSection({
  sectionId,
  label,
  title,
  humanReadableSummary,
  plannedInputs,
  plannedOutputs,
  checklistPrefix,
  checklistSummary,
  blocked,
  approval,
  state = "synthetic-only",
}: {
  sectionId: PaperStrategyPromotionGateSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: PaperStrategyPromotionGateState;
}): PaperStrategyPromotionGateSection {
  return {
    sectionId,
    label,
    title,
    humanReadableSummary,
    plannedInputs,
    plannedOutputs,
    reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
    deniedActions: COMMON_DENIED_ACTIONS,
    safetyNotes: COMMON_SAFETY_NOTES,
    checklist: checklist(checklistPrefix, checklistSummary, blocked, approval),
    state,
  };
}

const PROMOTION_ELIGIBILITY_CHECKLIST = createSection({
  sectionId: "promotionEligibilityChecklist",
  label: "Promotion Eligibility Checklist",
  title: "Deterministic Promotion Eligibility Checklist",
  humanReadableSummary:
    "Promotion eligibility checklist preview shows simulated evidence check, simulated risk check, simulated mandate check, simulated version check, simulated operator review check, and denied frontend persistence.",
  plannedInputs: ["Synthetic evidence check", "Synthetic risk check", "Synthetic mandate check", "Synthetic version check", "Synthetic operator review check"],
  plannedOutputs: ["Promotion Eligibility Checklist", "Simulated evidence check", "Simulated risk check", "Denied frontend persistence"],
  checklistPrefix: "promotion-eligibility-checklist",
  checklistSummary:
    "Promotion eligibility checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated version check simulated operator review check and denied frontend persistence.",
  blocked: "Promotion eligibility checklist preview does not approve strategies persist checklist state auto promote versions or create trading instructions from the UI.",
  approval: "Promotion eligibility checklist preview requires deterministic synthetic eligibility rows only.",
  state: "synthetic-only",
});

const EVIDENCE_SUFFICIENCY_GATE = createSection({
  sectionId: "evidenceSufficiencyGate",
  label: "Evidence Sufficiency Gate",
  title: "Backend-Owned Evidence Sufficiency Gate",
  humanReadableSummary:
    "Evidence sufficiency gate preview shows simulated result evidence, simulated review dashboard evidence, simulated version evidence, simulated redaction requirement, simulated continuity note, and denied frontend persistence.",
  plannedInputs: ["Synthetic result evidence", "Synthetic review dashboard evidence", "Synthetic version evidence", "Synthetic redaction requirement", "Synthetic continuity note"],
  plannedOutputs: ["Evidence Sufficiency Gate", "Backend-owned evidence capture", "Simulated continuity note", "Denied frontend persistence"],
  checklistPrefix: "evidence-sufficiency-gate",
  checklistSummary:
    "Evidence sufficiency gate preview shows simulated result evidence simulated review dashboard evidence simulated version evidence simulated redaction requirement simulated continuity note and denied frontend persistence.",
  blocked: "Evidence sufficiency gate preview does not persist evidence promote memory write files mutate audit trails or store links from the UI.",
  approval: "Evidence sufficiency gate preview requires backend-owned evidence capture.",
  state: "backend-owned",
});

const RISK_GOVERNOR_GATE = createSection({
  sectionId: "riskGovernorGate",
  label: "Risk Governor Gate",
  title: "Deterministic Risk Governor Gate",
  humanReadableSummary:
    "Risk governor gate preview shows simulated risk governor pass, simulated risk governor hold, simulated drawdown state, simulated daily loss state, simulated kill switch implication, and operator review requirement.",
  plannedInputs: ["Synthetic risk governor pass", "Synthetic risk governor hold", "Synthetic drawdown state", "Synthetic daily loss state", "Synthetic kill switch implication"],
  plannedOutputs: ["Risk Governor Gate", "Risk governor approval required", "Kill switch implication", "Operator review requirement"],
  checklistPrefix: "risk-governor-gate",
  checklistSummary:
    "Risk governor gate preview shows simulated risk governor pass simulated risk governor hold simulated drawdown state simulated daily loss state simulated kill switch implication and operator review requirement.",
  blocked: "Risk governor gate preview does not override risk governor decisions approve execution mutate capital or place trades from the UI.",
  approval: "Risk governor gate preview requires deterministic synthetic risk gate review only.",
  state: "needs-approval",
});

const MANDATE_COMPATIBILITY_GATE = createSection({
  sectionId: "mandateCompatibilityGate",
  label: "Mandate Compatibility Gate",
  title: "Backend-Owned Mandate Compatibility Gate",
  humanReadableSummary:
    "Mandate compatibility gate preview shows simulated mandate fit, simulated approved universe status, simulated strategy class status, simulated capital rule status, simulated evidence requirement, and denied frontend mutation.",
  plannedInputs: ["Synthetic mandate fit", "Synthetic approved universe status", "Synthetic strategy class status", "Synthetic capital rule status", "Synthetic evidence requirement"],
  plannedOutputs: ["Mandate Compatibility Gate", "Backend-owned mandate review workflow", "Evidence requirement", "Denied frontend mutation"],
  checklistPrefix: "mandate-compatibility-gate",
  checklistSummary:
    "Mandate compatibility gate preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation.",
  blocked: "Mandate compatibility gate preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI.",
  approval: "Mandate compatibility gate preview requires backend-owned mandate review workflow.",
  state: "backend-owned",
});

const VERSION_READINESS_GATE = createSection({
  sectionId: "versionReadinessGate",
  label: "Version Readiness Gate",
  title: "Backend-Owned Version Readiness Gate",
  humanReadableSummary:
    "Version readiness gate preview shows simulated draft version, simulated reviewed version, simulated blocked version, simulated retired version, simulated rollback note, and denied frontend persistence.",
  plannedInputs: ["Synthetic draft version", "Synthetic reviewed version", "Synthetic blocked version", "Synthetic retired version", "Synthetic rollback note"],
  plannedOutputs: ["Version Readiness Gate", "Backend-owned version registry workflow", "Simulated rollback note", "Denied frontend persistence"],
  checklistPrefix: "version-readiness-gate",
  checklistSummary:
    "Version readiness gate preview shows simulated draft version simulated reviewed version simulated blocked version simulated retired version simulated rollback note and denied frontend persistence.",
  blocked: "Version readiness gate preview does not persist versions promote strategy versions write files apply diffs or approve execution from the UI.",
  approval: "Version readiness gate preview requires backend-owned version registry workflow.",
  state: "backend-owned",
});

const SIMULATED_PAPER_READINESS_SCORE = createSection({
  sectionId: "simulatedPaperReadinessScore",
  label: "Simulated Paper Readiness Score",
  title: "Deterministic Simulated Paper Readiness Score",
  humanReadableSummary:
    "Simulated paper readiness score preview shows simulated evidence score, simulated risk score, simulated mandate score, simulated review score, simulated blocker score, and no performance guarantee.",
  plannedInputs: ["Synthetic evidence score", "Synthetic risk score", "Synthetic mandate score", "Synthetic review score", "Synthetic blocker score"],
  plannedOutputs: ["Simulated Paper Readiness Score", "No performance guarantee", "Synthetic scoring only", "No auto-select"],
  checklistPrefix: "simulated-paper-readiness-score",
  checklistSummary:
    "Simulated paper readiness score preview shows simulated evidence score simulated risk score simulated mandate score simulated review score simulated blocker score and no performance guarantee.",
  blocked: "Simulated paper readiness score preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI.",
  approval: "Simulated paper readiness score preview requires deterministic synthetic scoring only.",
  state: "synthetic-only",
});

const PROMOTION_BLOCKER_QUEUE = createSection({
  sectionId: "promotionBlockerQueue",
  label: "Promotion Blocker Queue",
  title: "Deterministic Promotion Blocker Queue",
  humanReadableSummary:
    "Promotion blocker queue preview shows simulated evidence blocker, simulated risk blocker, simulated mandate blocker, simulated version blocker, simulated approval blocker, and operator review note.",
  plannedInputs: ["Synthetic evidence blocker", "Synthetic risk blocker", "Synthetic mandate blocker", "Synthetic version blocker", "Synthetic approval blocker"],
  plannedOutputs: ["Promotion Blocker Queue", "Operator review note", "Synthetic blocker rows", "No queue persistence"],
  checklistPrefix: "promotion-blocker-queue",
  checklistSummary:
    "Promotion blocker queue preview shows simulated evidence blocker simulated risk blocker simulated mandate blocker simulated version blocker simulated approval blocker and operator review note.",
  blocked: "Promotion blocker queue preview does not retry execution mutate strategy state persist queue state or write audit state from the UI.",
  approval: "Promotion blocker queue preview requires deterministic synthetic blocker rows only.",
  state: "synthetic-only",
});

const OPERATOR_PROMOTION_REVIEW = createSection({
  sectionId: "operatorPromotionReview",
  label: "Operator Promotion Review",
  title: "Backend-Owned Operator Promotion Review",
  humanReadableSummary:
    "Operator promotion review preview shows simulated promote to paper review, simulated request changes, simulated reject, simulated hold, simulated retire, and explicit approval requirement.",
  plannedInputs: ["Synthetic promote to paper review", "Synthetic request changes", "Synthetic reject", "Synthetic hold", "Synthetic retire"],
  plannedOutputs: ["Operator Promotion Review", "Explicit approval requirement", "Backend-owned operator review workflow", "No frontend approval persistence"],
  checklistPrefix: "operator-promotion-review",
  checklistSummary:
    "Operator promotion review preview shows simulated promote to paper review simulated request changes simulated reject simulated hold simulated retire and explicit approval requirement.",
  blocked: "Operator promotion review preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI.",
  approval: "Operator promotion review preview requires backend-owned operator review workflow.",
  state: "backend-owned",
});

const PROMOTION_REJECTION_PACKET = createSection({
  sectionId: "promotionRejectionPacket",
  label: "Promotion Rejection Packet",
  title: "Backend-Owned Promotion Rejection Packet",
  humanReadableSummary:
    "Promotion rejection packet preview shows simulated rejection reason, simulated evidence gap, simulated risk concern, simulated mandate conflict, simulated version concern, and denied frontend persistence.",
  plannedInputs: ["Synthetic rejection reason", "Synthetic evidence gap", "Synthetic risk concern", "Synthetic mandate conflict", "Synthetic version concern"],
  plannedOutputs: ["Promotion Rejection Packet", "Backend-owned review workflow", "Denied frontend persistence", "No strategy rule mutation"],
  checklistPrefix: "promotion-rejection-packet",
  checklistSummary:
    "Promotion rejection packet preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated version concern and denied frontend persistence.",
  blocked: "Promotion rejection packet preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI.",
  approval: "Promotion rejection packet preview requires backend-owned review workflow.",
  state: "backend-owned",
});

const PROMOTION_HOLD_STATE = createSection({
  sectionId: "promotionHoldState",
  label: "Promotion Hold State",
  title: "Backend-Owned Promotion Hold State",
  humanReadableSummary:
    "Promotion hold state preview shows simulated evidence hold, simulated risk hold, simulated mandate hold, simulated version hold, simulated operator hold, and no frontend persistence.",
  plannedInputs: ["Synthetic evidence hold", "Synthetic risk hold", "Synthetic mandate hold", "Synthetic version hold", "Synthetic operator hold"],
  plannedOutputs: ["Promotion Hold State", "Backend-owned hold-state workflow", "No frontend persistence", "Operator hold"],
  checklistPrefix: "promotion-hold-state",
  checklistSummary:
    "Promotion hold state preview shows simulated evidence hold simulated risk hold simulated mandate hold simulated version hold simulated operator hold and no frontend persistence.",
  blocked: "Promotion hold state preview does not pause live strategies cancel orders mutate broker state or persist hold state from the UI.",
  approval: "Promotion hold state preview requires backend-owned hold-state workflow.",
  state: "backend-owned",
});

const PROMOTION_APPROVAL_BOUNDARY = createSection({
  sectionId: "promotionApprovalBoundary",
  label: "Promotion Approval Boundary",
  title: "Backend-Owned Promotion Approval Boundary",
  humanReadableSummary:
    "Promotion approval boundary preview shows simulated approval packet, simulated expiry, simulated replay protection, simulated evidence requirement, simulated backend promotion prerequisite, and denied frontend approval persistence.",
  plannedInputs: ["Synthetic approval packet", "Synthetic expiry", "Synthetic replay protection", "Synthetic evidence requirement", "Synthetic backend promotion prerequisite"],
  plannedOutputs: ["Promotion Approval Boundary", "Backend-owned approval capture", "Explicit operator approval", "Denied frontend approval persistence"],
  checklistPrefix: "promotion-approval-boundary",
  checklistSummary:
    "Promotion approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend promotion prerequisite and denied frontend approval persistence.",
  blocked: "Promotion approval boundary preview does not persist approvals apply changes release locks write files dispatch workers promote versions or enable execution from the UI.",
  approval: "Promotion approval boundary preview requires backend-owned approval capture and explicit operator approval.",
  state: "needs-approval",
});

const NO_AUTO_PROMOTE_EXECUTION_BOUNDARY = createSection({
  sectionId: "noAutoPromoteExecutionBoundary",
  label: "No Auto Promote Execution Boundary",
  title: "No Auto Promote Execution Boundary",
  humanReadableSummary:
    "No auto promote execution boundary preview shows denied auto promote, denied paper execution, denied live execution, denied frontend write, denied approval persistence, and operator approval gate.",
  plannedInputs: ["Denied auto promote", "Denied paper execution", "Denied live execution", "Denied frontend write", "Denied approval persistence"],
  plannedOutputs: ["No Auto Promote Execution Boundary", "Operator approval gate", "Backend-owned promotion workflow required", "Explicit operator approval"],
  checklistPrefix: "no-auto-promote-execution-boundary",
  checklistSummary:
    "No auto promote execution boundary preview shows denied auto promote denied paper execution denied live execution denied frontend write denied approval persistence and operator approval gate.",
  blocked: "No auto promote execution boundary preview blocks automatic strategy promotion paper execution live execution order routing approval persistence version persistence and execution routing from the UI.",
  approval: "No auto promote execution boundary preview requires backend-owned promotion workflow and explicit operator approval.",
  state: "blocked",
});

const DENIED_PAPER_STRATEGY_PROMOTION_GATE_BOUNDARIES = createSection({
  sectionId: "deniedPaperStrategyPromotionGateBoundaries",
  label: "Denied Paper Strategy Promotion Gate Boundaries",
  title: "Denied Paper Strategy Promotion Gate Paths",
  humanReadableSummary:
    "Denied paper strategy promotion gate paths remain blocked across frontend mutation, approval persistence, version persistence, evidence persistence, auto tuning, auto promotion, paper execution, live execution, order routing, broker execution, live market data, real P&L analysis, financial advice, personalised recommendations, and buy sell instructions.",
  plannedInputs: ["Denied frontend mutation", "Denied approval persistence", "Denied version persistence", "Denied paper execution", "Denied live execution"],
  plannedOutputs: ["Denied paper strategy promotion gate paths remain blocked", "No strategy auto promotion from the cockpit", "Backend-owned promotion workflow remains required", "Explicit operator approval remains required"],
  checklistPrefix: "denied-paper-strategy-promotion-gate",
  checklistSummary:
    "Denied paper strategy promotion gate paths remain blocked while backend-owned promotion workflow backend-owned version registry backend-owned change workflow backend-owned evidence capture backend-owned approval capture operator review risk governor approval kill switch enforcement and explicit operator approval remain required.",
  blocked: "Paper strategy promotion gate boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI.",
  approval: "Paper strategy promotion gate boundary requires explicit operator approval.",
  state: "blocked",
});

const ALL_SECTION_IDS: readonly PaperStrategyPromotionGateSectionId[] = [
  "promotionEligibilityChecklist",
  "evidenceSufficiencyGate",
  "riskGovernorGate",
  "mandateCompatibilityGate",
  "versionReadinessGate",
  "simulatedPaperReadinessScore",
  "promotionBlockerQueue",
  "operatorPromotionReview",
  "promotionRejectionPacket",
  "promotionHoldState",
  "promotionApprovalBoundary",
  "noAutoPromoteExecutionBoundary",
  "deniedPaperStrategyPromotionGateBoundaries",
] as const;

const SECTION_LOOKUP: Record<PaperStrategyPromotionGateSectionId, PaperStrategyPromotionGateSection> = {
  promotionEligibilityChecklist: PROMOTION_ELIGIBILITY_CHECKLIST,
  evidenceSufficiencyGate: EVIDENCE_SUFFICIENCY_GATE,
  riskGovernorGate: RISK_GOVERNOR_GATE,
  mandateCompatibilityGate: MANDATE_COMPATIBILITY_GATE,
  versionReadinessGate: VERSION_READINESS_GATE,
  simulatedPaperReadinessScore: SIMULATED_PAPER_READINESS_SCORE,
  promotionBlockerQueue: PROMOTION_BLOCKER_QUEUE,
  operatorPromotionReview: OPERATOR_PROMOTION_REVIEW,
  promotionRejectionPacket: PROMOTION_REJECTION_PACKET,
  promotionHoldState: PROMOTION_HOLD_STATE,
  promotionApprovalBoundary: PROMOTION_APPROVAL_BOUNDARY,
  noAutoPromoteExecutionBoundary: NO_AUTO_PROMOTE_EXECUTION_BOUNDARY,
  deniedPaperStrategyPromotionGateBoundaries: DENIED_PAPER_STRATEGY_PROMOTION_GATE_BOUNDARIES,
};

export const PAPER_STRATEGY_PROMOTION_GATE_MODEL: PaperStrategyPromotionGateModel = {
  paperStrategyPromotionGateId: "paper-strategy-promotion-gate-v1",
  paperStrategyPromotionGateKind: "paper-strategy-promotion-gate-v1",
  promotionEligibilityChecklist: PROMOTION_ELIGIBILITY_CHECKLIST,
  evidenceSufficiencyGate: EVIDENCE_SUFFICIENCY_GATE,
  riskGovernorGate: RISK_GOVERNOR_GATE,
  mandateCompatibilityGate: MANDATE_COMPATIBILITY_GATE,
  versionReadinessGate: VERSION_READINESS_GATE,
  simulatedPaperReadinessScore: SIMULATED_PAPER_READINESS_SCORE,
  promotionBlockerQueue: PROMOTION_BLOCKER_QUEUE,
  operatorPromotionReview: OPERATOR_PROMOTION_REVIEW,
  promotionRejectionPacket: PROMOTION_REJECTION_PACKET,
  promotionHoldState: PROMOTION_HOLD_STATE,
  promotionApprovalBoundary: PROMOTION_APPROVAL_BOUNDARY,
  noAutoPromoteExecutionBoundary: NO_AUTO_PROMOTE_EXECUTION_BOUNDARY,
  deniedPaperStrategyPromotionGateBoundaries: DENIED_PAPER_STRATEGY_PROMOTION_GATE_BOUNDARIES,
  cockpitSummary: [
    {
      id: "paper-strategy-promotion-gate-review-only",
      label: "Review-only paper strategy promotion gate",
      detail:
        "Paper Strategy Promotion Gate stays review-only and synthetic-only; backend-owned promotion workflow remains required.",
      state: "review-only",
    },
    {
      id: "paper-strategy-promotion-gate-denied-auto-promotion",
      label: "No strategy auto promotion from the cockpit",
      detail:
        "Frontend strategy auto tuning, strategy auto promotion, automatic rule mutation, file writes, version persistence, approval persistence, and evidence persistence remain blocked.",
      state: "blocked",
    },
    {
      id: "paper-strategy-promotion-gate-risk-approval",
      label: "Risk governor approval remains required",
      detail:
        "Operator review, risk governor approval, kill switch enforcement, and explicit operator approval remain required before any backend-owned workflow can consider paper review.",
      state: "needs-approval",
    },
    {
      id: "paper-strategy-promotion-gate-no-execution",
      label: "No frontend execution",
      detail:
        "No broker execution, no order placement, no order dispatch, no paper execution, no live execution, no live market data calls, and no real P&L analysis from the cockpit.",
      state: "blocked",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly PaperStrategyPromotionGateRouteDefinition[] = [
  {
    slug: "paper-strategy-promotion-gate-boundary",
    href: "/paper-strategy-promotion-gate-boundary",
    phase: "Phase 1850",
    title: "Paper Strategy Promotion Gate Boundary",
    commandLabel: "Go to Paper Strategy Promotion Gate Boundary",
    summary:
      "Previews a paper strategy promotion gate boundary without advice, recommendations, buy sell instructions, auto tuning, auto promotion, rule mutation, persistence, orders, live data, real P&L, paper execution, live execution, or broker execution.",
    markerPhrases: [
      "Paper strategy promotion gate boundary",
      "Paper strategy promotion gate boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI",
      "Paper strategy promotion gate boundary requires explicit operator approval",
      "Paper strategy promotion gate boundary prepares deterministic synthetic paper-promotion review workflows without frontend mutation persistence promotion or execution",
      "Denied paper strategy promotion gate paths remain blocked",
      "Paper strategy promotion gate boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "promotion-eligibility-checklist-preview",
    href: "/promotion-eligibility-checklist-preview",
    phase: "Phase 1851",
    title: "Promotion Eligibility Checklist Preview",
    commandLabel: "Go to Promotion Eligibility Checklist Preview",
    summary:
      "Previews deterministic synthetic promotion eligibility rows without approving strategies, persisting checklist state, auto promoting versions, or creating trading instructions.",
    markerPhrases: [
      "Promotion eligibility checklist preview",
      "Promotion eligibility checklist preview does not approve strategies persist checklist state auto promote versions or create trading instructions from the UI",
      "Promotion eligibility checklist preview requires deterministic synthetic eligibility rows only",
      "Promotion eligibility checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated version check simulated operator review check and denied frontend persistence",
      "Denied promotion eligibility checklist paths remain blocked",
      "Promotion eligibility checklist checklist",
    ],
    sectionIds: ["promotionEligibilityChecklist", "evidenceSufficiencyGate", "riskGovernorGate", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-sufficiency-gate-preview",
    href: "/evidence-sufficiency-gate-preview",
    phase: "Phase 1852",
    title: "Evidence Sufficiency Gate Preview",
    commandLabel: "Go to Evidence Sufficiency Gate Preview",
    summary:
      "Previews backend-owned evidence sufficiency gates without evidence persistence, memory promotion, file writes, audit mutation, or link storage from the UI.",
    markerPhrases: [
      "Evidence sufficiency gate preview",
      "Evidence sufficiency gate preview does not persist evidence promote memory write files mutate audit trails or store links from the UI",
      "Evidence sufficiency gate preview requires backend-owned evidence capture",
      "Evidence sufficiency gate preview shows simulated result evidence simulated review dashboard evidence simulated version evidence simulated redaction requirement simulated continuity note and denied frontend persistence",
      "Denied evidence sufficiency gate paths remain blocked",
      "Evidence sufficiency gate checklist",
    ],
    sectionIds: ["evidenceSufficiencyGate", "promotionEligibilityChecklist", "operatorPromotionReview", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "risk-governor-gate-preview",
    href: "/risk-governor-gate-preview",
    phase: "Phase 1853",
    title: "Risk Governor Gate Preview",
    commandLabel: "Go to Risk Governor Gate Preview",
    summary:
      "Previews deterministic synthetic risk governor review without overriding risk decisions, approving execution, mutating capital, or placing trades.",
    markerPhrases: [
      "Risk governor gate preview",
      "Risk governor gate preview does not override risk governor decisions approve execution mutate capital or place trades from the UI",
      "Risk governor gate preview requires deterministic synthetic risk gate review only",
      "Risk governor gate preview shows simulated risk governor pass simulated risk governor hold simulated drawdown state simulated daily loss state simulated kill switch implication and operator review requirement",
      "Denied risk governor gate paths remain blocked",
      "Risk governor gate checklist",
    ],
    sectionIds: ["riskGovernorGate", "mandateCompatibilityGate", "promotionBlockerQueue", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "mandate-compatibility-gate-preview",
    href: "/mandate-compatibility-gate-preview",
    phase: "Phase 1854",
    title: "Mandate Compatibility Gate Preview",
    commandLabel: "Go to Mandate Compatibility Gate Preview",
    summary:
      "Previews backend-owned mandate compatibility gates without changing trading mandates, approved symbols, strategies, capital rules, or execution permissions.",
    markerPhrases: [
      "Mandate compatibility gate preview",
      "Mandate compatibility gate preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI",
      "Mandate compatibility gate preview requires backend-owned mandate review workflow",
      "Mandate compatibility gate preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation",
      "Denied mandate compatibility gate paths remain blocked",
      "Mandate compatibility gate checklist",
    ],
    sectionIds: ["mandateCompatibilityGate", "riskGovernorGate", "versionReadinessGate", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-readiness-gate-preview",
    href: "/version-readiness-gate-preview",
    phase: "Phase 1855",
    title: "Version Readiness Gate Preview",
    commandLabel: "Go to Version Readiness Gate Preview",
    summary:
      "Previews backend-owned version readiness gates without version persistence, strategy version promotion, file writes, diff application, or execution approval.",
    markerPhrases: [
      "Version readiness gate preview",
      "Version readiness gate preview does not persist versions promote strategy versions write files apply diffs or approve execution from the UI",
      "Version readiness gate preview requires backend-owned version registry workflow",
      "Version readiness gate preview shows simulated draft version simulated reviewed version simulated blocked version simulated retired version simulated rollback note and denied frontend persistence",
      "Denied version readiness gate paths remain blocked",
      "Version readiness gate checklist",
    ],
    sectionIds: ["versionReadinessGate", "evidenceSufficiencyGate", "promotionApprovalBoundary", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-paper-readiness-score-preview",
    href: "/simulated-paper-readiness-score-preview",
    phase: "Phase 1856",
    title: "Simulated Paper Readiness Score Preview",
    commandLabel: "Go to Simulated Paper Readiness Score Preview",
    summary:
      "Previews deterministic synthetic paper readiness scoring without ranking buys, recommending strategies, guaranteeing performance, or auto-selecting versions.",
    markerPhrases: [
      "Simulated paper readiness score preview",
      "Simulated paper readiness score preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI",
      "Simulated paper readiness score preview requires deterministic synthetic scoring only",
      "Simulated paper readiness score preview shows simulated evidence score simulated risk score simulated mandate score simulated review score simulated blocker score and no performance guarantee",
      "Denied simulated paper readiness score paths remain blocked",
      "Simulated paper readiness score checklist",
    ],
    sectionIds: ["simulatedPaperReadinessScore", "promotionEligibilityChecklist", "promotionBlockerQueue", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "promotion-blocker-queue-preview",
    href: "/promotion-blocker-queue-preview",
    phase: "Phase 1857",
    title: "Promotion Blocker Queue Preview",
    commandLabel: "Go to Promotion Blocker Queue Preview",
    summary:
      "Previews deterministic synthetic promotion blocker rows without retrying execution, mutating strategy state, persisting queue state, or writing audit state.",
    markerPhrases: [
      "Promotion blocker queue preview",
      "Promotion blocker queue preview does not retry execution mutate strategy state persist queue state or write audit state from the UI",
      "Promotion blocker queue preview requires deterministic synthetic blocker rows only",
      "Promotion blocker queue preview shows simulated evidence blocker simulated risk blocker simulated mandate blocker simulated version blocker simulated approval blocker and operator review note",
      "Denied promotion blocker queue paths remain blocked",
      "Promotion blocker queue checklist",
    ],
    sectionIds: ["promotionBlockerQueue", "evidenceSufficiencyGate", "riskGovernorGate", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "operator-promotion-review-preview",
    href: "/operator-promotion-review-preview",
    phase: "Phase 1858",
    title: "Operator Promotion Review Preview",
    commandLabel: "Go to Operator Promotion Review Preview",
    summary:
      "Previews backend-owned operator promotion review without approval persistence, lock release, worker dispatch, execution approval, or strategy version promotion.",
    markerPhrases: [
      "Operator promotion review preview",
      "Operator promotion review preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI",
      "Operator promotion review preview requires backend-owned operator review workflow",
      "Operator promotion review preview shows simulated promote to paper review simulated request changes simulated reject simulated hold simulated retire and explicit approval requirement",
      "Denied operator promotion review paths remain blocked",
      "Operator promotion review checklist",
    ],
    sectionIds: ["operatorPromotionReview", "promotionApprovalBoundary", "promotionRejectionPacket", "promotionHoldState", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "promotion-rejection-packet-preview",
    href: "/promotion-rejection-packet-preview",
    phase: "Phase 1859",
    title: "Promotion Rejection Packet Preview",
    commandLabel: "Go to Promotion Rejection Packet Preview",
    summary:
      "Previews backend-owned promotion rejection packets without strategy rule mutation, proposal deletion, audit writes, or rejection persistence from the UI.",
    markerPhrases: [
      "Promotion rejection packet preview",
      "Promotion rejection packet preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI",
      "Promotion rejection packet preview requires backend-owned review workflow",
      "Promotion rejection packet preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated version concern and denied frontend persistence",
      "Denied promotion rejection packet paths remain blocked",
      "Promotion rejection packet checklist",
    ],
    sectionIds: ["promotionRejectionPacket", "operatorPromotionReview", "promotionBlockerQueue", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "promotion-hold-state-preview",
    href: "/promotion-hold-state-preview",
    phase: "Phase 1860",
    title: "Promotion Hold State Preview",
    commandLabel: "Go to Promotion Hold State Preview",
    summary:
      "Previews backend-owned promotion hold states without pausing live strategies, cancelling orders, mutating broker state, or persisting hold state.",
    markerPhrases: [
      "Promotion hold state preview",
      "Promotion hold state preview does not pause live strategies cancel orders mutate broker state or persist hold state from the UI",
      "Promotion hold state preview requires backend-owned hold-state workflow",
      "Promotion hold state preview shows simulated evidence hold simulated risk hold simulated mandate hold simulated version hold simulated operator hold and no frontend persistence",
      "Denied promotion hold state paths remain blocked",
      "Promotion hold state checklist",
    ],
    sectionIds: ["promotionHoldState", "promotionBlockerQueue", "operatorPromotionReview", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "promotion-approval-boundary-preview",
    href: "/promotion-approval-boundary-preview",
    phase: "Phase 1861",
    title: "Promotion Approval Boundary Preview",
    commandLabel: "Go to Promotion Approval Boundary Preview",
    summary:
      "Previews backend-owned promotion approval boundaries without approval persistence, changes, lock release, file writes, worker dispatch, version promotion, or execution enablement.",
    markerPhrases: [
      "Promotion approval boundary preview",
      "Promotion approval boundary preview does not persist approvals apply changes release locks write files dispatch workers promote versions or enable execution from the UI",
      "Promotion approval boundary preview requires backend-owned approval capture and explicit operator approval",
      "Promotion approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend promotion prerequisite and denied frontend approval persistence",
      "Denied promotion approval boundary paths remain blocked",
      "Promotion approval boundary checklist",
    ],
    sectionIds: ["promotionApprovalBoundary", "operatorPromotionReview", "versionReadinessGate", "noAutoPromoteExecutionBoundary", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "no-auto-promote-execution-boundary-preview",
    href: "/no-auto-promote-execution-boundary-preview",
    phase: "Phase 1862",
    title: "No Auto Promote Execution Boundary Preview",
    commandLabel: "Go to No Auto Promote Execution Boundary Preview",
    summary:
      "Previews no-auto-promote execution blocks for automatic promotion, paper execution, live execution, order routing, approval persistence, version persistence, and execution routing.",
    markerPhrases: [
      "No auto promote execution boundary preview",
      "No auto promote execution boundary preview blocks automatic strategy promotion paper execution live execution order routing approval persistence version persistence and execution routing from the UI",
      "No auto promote execution boundary preview requires backend-owned promotion workflow and explicit operator approval",
      "No auto promote execution boundary preview shows denied auto promote denied paper execution denied live execution denied frontend write denied approval persistence and operator approval gate",
      "Denied no auto promote execution paths remain blocked",
      "No auto promote execution boundary checklist",
    ],
    sectionIds: ["noAutoPromoteExecutionBoundary", "promotionApprovalBoundary", "promotionBlockerQueue", "deniedPaperStrategyPromotionGateBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-paper-strategy-promotion-gate-summary",
    href: "/cockpit-paper-strategy-promotion-gate-summary",
    phase: "Phase 1863",
    title: "Cockpit Paper Strategy Promotion Gate Summary",
    commandLabel: "Go to Cockpit Paper Strategy Promotion Gate Summary",
    summary:
      "Summarizes paper strategy promotion gate previews as grouped Trading Workspace content in the normal cockpit without advice, recommendations, auto tuning, auto promotion, mutation, persistence, broker execution, live data, orders, paper execution, live execution, real P&L, or evidence persistence.",
    markerPhrases: [
      "Cockpit paper strategy promotion gate summary",
      "Cockpit paper strategy promotion gate summary keeps the cockpit as the normal user surface",
      "Cockpit paper strategy promotion gate summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data calculate real P&L or persist evidence from the cockpit",
      "Cockpit paper strategy promotion gate summary shows promotion eligibility evidence sufficiency risk governor mandate compatibility version readiness simulated readiness score blocker queue operator review rejection packet hold state approval boundary no auto promote execution boundary and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit paper strategy promotion gate checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-paper-strategy-promotion-gate-candidate",
    href: "/first-paper-strategy-promotion-gate-candidate",
    phase: "Phase 1864",
    title: "First Paper Strategy Promotion Gate Candidate",
    commandLabel: "Go to First Paper Strategy Promotion Gate Candidate",
    summary:
      "Combines the first paper strategy promotion gate candidate without advice, recommendations, buy sell instructions, auto tuning, strategy promotion, rule mutation, file writes, persistence, orders, paper execution, live execution, or dispatch.",
    markerPhrases: [
      "First paper strategy promotion gate candidate",
      "First paper strategy promotion gate candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement paper execution live execution or dispatch from the UI",
      "First paper strategy promotion gate candidate requires explicit operator approval",
      "Candidate combines promotion eligibility evidence sufficiency risk governor mandate compatibility version readiness simulated paper readiness score blocker queue operator promotion review rejection packet hold state approval boundary no auto promote execution boundary cockpit summary and denied paths",
      "Denied first paper strategy promotion gate paths remain blocked",
      "First paper strategy promotion gate checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-paper-strategy-promotion-gate-release-candidate",
    href: "/controlled-paper-strategy-promotion-gate-release-candidate",
    phase: "Phase 1865",
    title: "Controlled Paper Strategy Promotion Gate Release Candidate",
    commandLabel: "Go to Controlled Paper Strategy Promotion Gate Release Candidate",
    summary:
      "Release candidate prepares CodexForge for backend-owned paper strategy promotion workflows without frontend mutation, version persistence, approval persistence, evidence persistence, auto tuning, auto promotion, paper execution, live execution, broker execution, live data, orders, real P&L, advice, or recommendations.",
    markerPhrases: [
      "Controlled paper strategy promotion gate release candidate",
      "Controlled paper strategy promotion gate release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades execute live trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled paper strategy promotion gate release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned paper strategy promotion workflows without frontend mutation version persistence approval persistence evidence persistence auto tuning auto promotion paper execution live execution or broker execution",
      "Denied controlled paper strategy promotion gate paths remain blocked",
      "Controlled paper strategy promotion gate checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listPaperStrategyPromotionGateRouteDefinitions(): readonly PaperStrategyPromotionGateRouteDefinition[] {
  return ROUTES;
}

export function getPaperStrategyPromotionGateRouteDefinition(
  slug: PaperStrategyPromotionGateRouteSlug
): PaperStrategyPromotionGateRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildPaperStrategyPromotionGateRouteModel(
  slug: PaperStrategyPromotionGateRouteSlug = "controlled-paper-strategy-promotion-gate-release-candidate"
): PaperStrategyPromotionGateRouteModel {
  const route = getPaperStrategyPromotionGateRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is PaperStrategyPromotionGateSection => Boolean(section));

  return {
    route,
    paperStrategyPromotionGate: PAPER_STRATEGY_PROMOTION_GATE_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PAPER_STRATEGY_PROMOTION_GATE_COCKPIT_MARKERS,
    summary: summarizePaperStrategyPromotionGateRoute(route, sections),
  };
}

export function buildPaperStrategyPromotionGateModel(): PaperStrategyPromotionGateRouteModel {
  return buildPaperStrategyPromotionGateRouteModel("controlled-paper-strategy-promotion-gate-release-candidate");
}

export function summarizePaperStrategyPromotionGateRoute(
  route: PaperStrategyPromotionGateRouteDefinition,
  sections: readonly PaperStrategyPromotionGateSection[]
): string {
  return route.title + " keeps " + sections.length + " paper strategy promotion gate sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from financial advice, personalised recommendations, buy sell instructions, automatic strategy optimisation, strategy auto promotion, automatic rule mutation, frontend file mutation, frontend version persistence, frontend approval persistence, frontend evidence persistence, live trading, paper execution, live execution, order placement, order dispatch, broker execution, money movement, live market data calls, real P&L analysis, command execution, worker dispatch, and performance guarantees.";
}

export function buildPaperStrategyPromotionGateStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
