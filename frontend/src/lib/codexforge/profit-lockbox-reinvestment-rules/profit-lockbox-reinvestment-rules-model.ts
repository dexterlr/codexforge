export type ProfitLockboxReinvestmentRulesRouteSlug =
  | "profit-lockbox-boundary"
  | "realised-profit-definition-preview"
  | "protected-profit-bucket-rules-preview"
  | "reinvestable-profit-bucket-rules-preview"
  | "lock-percentage-rule-preview"
  | "release-condition-rule-preview"
  | "reinvestment-ceiling-rule-preview"
  | "loss-handling-rule-preview"
  | "active-capital-update-preview"
  | "protected-profit-audit-preview"
  | "reinvestment-approval-gate-preview"
  | "profit-evidence-map-preview"
  | "cockpit-profit-lockbox-summary"
  | "denied-money-movement-boundary"
  | "first-profit-lockbox-reinvestment-candidate"
  | "controlled-profit-lockbox-reinvestment-release-candidate";

export type ProfitLockboxReinvestmentRulesKind =
  | "profit-lockbox-reinvestment-rules-v1"
  | ProfitLockboxReinvestmentRulesRouteSlug;

export type ProfitLockboxReinvestmentRulesState =
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "candidate"
  | "release-candidate";

export type ProfitLockboxReinvestmentRulesItem = {
  id: string;
  label: string;
  detail: string;
  state: ProfitLockboxReinvestmentRulesState;
};

export type ProfitLockboxReinvestmentRulesSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly ProfitLockboxReinvestmentRulesItem[];
  state: ProfitLockboxReinvestmentRulesState;
};

export type ProfitLockboxReinvestmentRulesModel = {
  profitLockboxReinvestmentRulesId: string;
  profitLockboxReinvestmentRulesKind: ProfitLockboxReinvestmentRulesKind;
  profitLockboxBoundary: ProfitLockboxReinvestmentRulesSection;
  realisedProfitDefinition: ProfitLockboxReinvestmentRulesSection;
  protectedProfitBucketRules: ProfitLockboxReinvestmentRulesSection;
  reinvestableProfitBucketRules: ProfitLockboxReinvestmentRulesSection;
  lockPercentageRule: ProfitLockboxReinvestmentRulesSection;
  releaseConditionRule: ProfitLockboxReinvestmentRulesSection;
  reinvestmentCeilingRule: ProfitLockboxReinvestmentRulesSection;
  lossHandlingRule: ProfitLockboxReinvestmentRulesSection;
  activeCapitalUpdate: ProfitLockboxReinvestmentRulesSection;
  protectedProfitAudit: ProfitLockboxReinvestmentRulesSection;
  reinvestmentApprovalGate: ProfitLockboxReinvestmentRulesSection;
  profitEvidenceMap: ProfitLockboxReinvestmentRulesSection;
  deniedMoneyMovementBoundary: ProfitLockboxReinvestmentRulesSection;
  deniedProfitLockboxBoundaries: ProfitLockboxReinvestmentRulesSection;
  cockpitSummary: readonly ProfitLockboxReinvestmentRulesItem[];
  explicitSafetyLimits: readonly string[];
};

export type ProfitLockboxReinvestmentRulesRouteDefinition = {
  slug: ProfitLockboxReinvestmentRulesRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type ProfitLockboxReinvestmentRulesRouteModel = {
  route: ProfitLockboxReinvestmentRulesRouteDefinition;
  profitLockboxReinvestmentRules: ProfitLockboxReinvestmentRulesModel;
  sections: readonly ProfitLockboxReinvestmentRulesSection[];
  diagnosticRoutes: readonly ProfitLockboxReinvestmentRulesRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PROFIT_LOCKBOX_REINVESTMENT_RULES_COCKPIT_MARKERS = [
  "Profit Lockbox Reinvestment Rules",
  "Profit Lockbox",
  "Reinvestment Rules",
  "Realised Profit Definition",
  "Protected Profit Bucket",
  "Reinvestable Profit Bucket",
  "Lock Percentage Rule",
  "Release Condition Rule",
  "Reinvestment Ceiling Rule",
  "Loss Handling Rule",
  "Active Capital Update",
  "Protected Profit Audit",
  "Reinvestment Approval Gate",
  "Profit Evidence Map",
  "Denied Money Movement Boundary",
  "No broker connections from the cockpit",
  "No money movement from the cockpit",
  "No profit withdrawal from the cockpit",
  "No reinvestment execution from the cockpit",
  "No live P&L reads from the cockpit",
  "No trade placement from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No guaranteed profit claims",
  "No trading automation from the cockpit",
  "Realised profit only can be locked",
  "Losing trades have no profit to lock",
  "Losses reduce active capital",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Profit Lockbox Reinvestment Rules v1 is review-only from the frontend.",
  "It is not live trading, broker integration, money movement, account access, portfolio access, live P&L reading, profit withdrawal, reinvestment execution, financial advice, personalised investment recommendation, buy sell instruction, automated trading, or guaranteed profit.",
  "The cockpit does not move money, withdraw profit, reinvest capital, connect brokers, read live P&L, place trades, provide financial advice, provide personalised recommendations, issue buy sell instructions, automate trading, size orders, monitor live accounts, dispatch workers, call models, call providers, call connectors, send prompts, run commands, write files, persist approvals, persist evidence, persist audit, create queues, create transactions, store credentials, or write browser storage.",
  "Realised profit only can be locked.",
  "Losing trades have no profit to lock.",
  "Losses reduce active capital.",
  "Protected profit stays protected unless explicitly released.",
  "Backend-owned broker boundary remains required.",
  "Explicit operator approval remains required.",
] as const;

const REQUIRED_SAFETY_MARKERS = [
  "profit lockbox boundary",
  "realised profit only",
  "protected profit bucket",
  "reinvestable profit bucket",
  "lock percentage rule",
  "release condition rule",
  "reinvestment ceiling rule",
  "loss handling rule",
  "active capital update",
  "protected profit audit",
  "reinvestment approval gate",
  "profit evidence map",
  "denied money movement boundary",
  "operator approval gates",
  "backend-owned broker boundary prerequisite",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review cards only.",
  "Future profit lockbox and reinvestment workflows remain backend-owned, approval-gated, evidence-backed, risk-governed, and outside direct frontend money movement.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, profit withdrawal, reinvestment execution, or guaranteed profit claim.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No money movement, profit withdrawal, fund transfer, reinvestment execution, broker connection, broker account access, portfolio access, credential storage, endpoint storage, live P&L read, live market call, trade placement, automated execution, signal execution, order sizing, live account monitoring, model call, provider call, connector call, prompt sending, command execution, file mutation, browser storage write, approval persistence, evidence persistence, audit persistence, result persistence, queue creation, transaction creation, or worker dispatch from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Risk governor remains required before any future reinvestment workflow.",
  "Backend-owned broker boundary remains required before any future broker-adjacent workflow.",
  "Realised profit only can be locked.",
  "Losing trades have no profit to lock.",
  "Losses reduce active capital.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly ProfitLockboxReinvestmentRulesItem[] {
  return [
    {
      id: `${prefix}-summary`,
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: `${prefix}-blocked`,
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: `${prefix}-approval`,
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
  state = "review-only",
}: {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: ProfitLockboxReinvestmentRulesState;
}): ProfitLockboxReinvestmentRulesSection {
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

const PROFIT_LOCKBOX_BOUNDARY = createSection({
  sectionId: "profitLockboxBoundary",
  label: "Profit Lockbox Boundary",
  title: "Profit Lockbox Boundary",
  humanReadableSummary:
    "Profit lockbox boundary defines a review-only line around realised-profit lockbox planning. It does not move money, connect brokers, read accounts, withdraw profit, reinvest capital, or guarantee profits from the UI.",
  plannedInputs: ["Profit Lockbox", "Reinvestment Rules", "Denied profit lockbox paths", "Backend-owned workflow prerequisites"],
  plannedOutputs: ["Profit lockbox boundary", "Operator approval requirement", "Backend-owned workflow preview", "Denied profit lockbox paths"],
  checklistPrefix: "profit-lockbox-boundary",
  checklistSummary:
    "Profit lockbox boundary prepares backend-owned profit lockbox and reinvestment workflows without frontend money movement.",
  blocked:
    "Profit lockbox boundary does not move money connect brokers read accounts withdraw profit reinvest capital or guarantee profits from the UI.",
  approval:
    "Profit lockbox boundary requires explicit operator approval before any future profit workflow.",
  state: "blocked",
});

const REALISED_PROFIT_DEFINITION = createSection({
  sectionId: "realisedProfitDefinition",
  label: "Realised Profit Definition",
  title: "Realised Profit Definition Preview",
  humanReadableSummary:
    "Realised profit definition preview shows closed trade profit, realised profit only, losing trades have no profit to lock, fees, slippage, taxes caveat, and manual confirmation needs without reading broker statements, calculating live P&L, or guaranteeing profit.",
  plannedInputs: ["Closed trade profit", "Realised profit only", "Losing trade treatment", "Fees", "Slippage", "Taxes caveat", "Manual confirmation needs"],
  plannedOutputs: ["Realised Profit Definition", "Manual confirmation needs", "Fees slippage caveat", "Denied realised profit paths"],
  checklistPrefix: "realised-profit-definition",
  checklistSummary:
    "Realised profit definition preview shows closed trade profit realised profit only losing trades have no profit to lock fees slippage taxes caveat and manual confirmation needs.",
  blocked:
    "Realised profit definition preview does not read broker statements calculate live P&L or guarantee profit.",
  approval: "Realised profit definition preview requires explicit operator approval.",
});

const PROTECTED_PROFIT_BUCKET_RULES = createSection({
  sectionId: "protectedProfitBucketRules",
  label: "Protected Profit Bucket",
  title: "Protected Profit Bucket Rules Preview",
  humanReadableSummary:
    "Protected profit bucket rules preview shows a realised-profit-only lock rule, lock percentage, release condition, audit need, and backend-owned money boundary without moving money, withdrawing funds, or storing account credentials.",
  plannedInputs: ["Realised-profit-only lock rule", "Lock percentage", "Release condition", "Audit need", "Backend-owned money boundary"],
  plannedOutputs: ["Protected Profit Bucket", "Protected profit bucket realised-profit-only lock rule", "Release condition", "Denied protected profit bucket rules paths"],
  checklistPrefix: "protected-profit-bucket-rules",
  checklistSummary:
    "Protected profit bucket rules preview shows protected profit bucket realised-profit-only lock rule lock percentage release condition audit need and backend-owned money boundary.",
  blocked:
    "Protected profit bucket rules preview does not move money withdraw funds or store account credentials.",
  approval: "Protected profit bucket rules preview requires explicit operator approval.",
  state: "backend-owned",
});

const REINVESTABLE_PROFIT_BUCKET_RULES = createSection({
  sectionId: "reinvestableProfitBucketRules",
  label: "Reinvestable Profit Bucket",
  title: "Reinvestable Profit Bucket Rules Preview",
  humanReadableSummary:
    "Reinvestable profit bucket rules preview shows realised profit split, reinvestable percent, protected percent, ceiling rule, and approval gate without reinvesting money, placing trades, or connecting brokers.",
  plannedInputs: ["Realised profit split", "Reinvestable percent", "Protected percent", "Ceiling rule", "Approval gate"],
  plannedOutputs: ["Reinvestable Profit Bucket", "Reinvestable percent", "Protected percent", "Approval gate", "Denied reinvestable profit bucket paths"],
  checklistPrefix: "reinvestable-profit-bucket-rules",
  checklistSummary:
    "Reinvestable profit bucket rules preview shows reinvestable profit bucket realised profit split reinvestable percent protected percent ceiling rule and approval gate.",
  blocked:
    "Reinvestable profit bucket rules preview does not reinvest money place trades or connect brokers.",
  approval: "Reinvestable profit bucket rules preview requires explicit operator approval.",
});

const LOCK_PERCENTAGE_RULE = createSection({
  sectionId: "lockPercentageRule",
  label: "Lock Percentage Rule",
  title: "Lock Percentage Rule Preview",
  humanReadableSummary:
    "Lock percentage rule preview shows configurable lock percent, realised profit allocation, protected share, reinvestable share, rounding note, and no guaranteed profit claim without changing real account allocation or guaranteeing returns.",
  plannedInputs: ["Configurable lock percent", "Realised profit allocation", "Protected share", "Reinvestable share", "Rounding note", "No guaranteed profit claim"],
  plannedOutputs: ["Lock Percentage Rule", "Protected share", "Reinvestable share", "Rounding note", "Denied lock percentage paths"],
  checklistPrefix: "lock-percentage-rule",
  checklistSummary:
    "Lock percentage rule preview shows configurable lock percent realised profit allocation protected share reinvestable share rounding note and no guaranteed profit claim.",
  blocked:
    "Lock percentage rule preview does not change real account allocation or guarantee returns.",
  approval: "Lock percentage rule preview requires explicit operator approval.",
});

const RELEASE_CONDITION_RULE = createSection({
  sectionId: "releaseConditionRule",
  label: "Release Condition Rule",
  title: "Release Condition Rule Preview",
  humanReadableSummary:
    "Release condition rule preview shows protected profit release conditions, manual approval, expiry, evidence requirement, audit requirement, and backend-owned release boundary without releasing funds, moving money, or updating accounts from the UI.",
  plannedInputs: ["Protected profit release conditions", "Manual approval", "Expiry", "Evidence requirement", "Audit requirement", "Backend-owned release boundary"],
  plannedOutputs: ["Release Condition Rule", "Manual approval", "Evidence requirement", "Audit requirement", "Denied release condition paths"],
  checklistPrefix: "release-condition-rule",
  checklistSummary:
    "Release condition rule preview shows protected profit release conditions manual approval expiry evidence requirement audit requirement and backend-owned release boundary.",
  blocked:
    "Release condition rule preview does not release funds move money or update accounts from the UI.",
  approval: "Release condition rule preview requires explicit operator approval.",
  state: "backend-owned",
});

const REINVESTMENT_CEILING_RULE = createSection({
  sectionId: "reinvestmentCeilingRule",
  label: "Reinvestment Ceiling Rule",
  title: "Reinvestment Ceiling Rule Preview",
  humanReadableSummary:
    "Reinvestment ceiling rule preview shows reinvestment ceiling, active capital cap, drawdown cap, risk governor dependency, approval gate, and backend-owned enforcement boundary without executing reinvestment or increasing risk limits from the UI.",
  plannedInputs: ["Reinvestment ceiling", "Active capital cap", "Drawdown cap", "Risk governor dependency", "Approval gate", "Backend-owned enforcement boundary"],
  plannedOutputs: ["Reinvestment Ceiling Rule", "Active capital cap", "Drawdown cap", "Risk governor dependency", "Denied reinvestment ceiling paths"],
  checklistPrefix: "reinvestment-ceiling-rule",
  checklistSummary:
    "Reinvestment ceiling rule preview shows reinvestment ceiling active capital cap drawdown cap risk governor dependency approval gate and backend-owned enforcement boundary.",
  blocked:
    "Reinvestment ceiling rule preview does not execute reinvestment or increase risk limits from the UI.",
  approval: "Reinvestment ceiling rule preview requires explicit operator approval.",
  state: "backend-owned",
});

const LOSS_HANDLING_RULE = createSection({
  sectionId: "lossHandlingRule",
  label: "Loss Handling Rule",
  title: "Loss Handling Rule Preview",
  humanReadableSummary:
    "Loss handling rule preview shows losing trades have no profit to lock, losses reduce active capital, protected profit stays protected unless explicitly released, and no recovery guarantee without offsetting losses with protected profit or guaranteeing recovery.",
  plannedInputs: ["Losing trades have no profit to lock", "Losses reduce active capital", "Protected profit release status", "No recovery guarantee"],
  plannedOutputs: ["Loss Handling Rule", "Active capital reduction", "Protected profit protection", "No recovery guarantee", "Denied loss handling paths"],
  checklistPrefix: "loss-handling-rule",
  checklistSummary:
    "Loss handling rule preview shows losing trades have no profit to lock losses reduce active capital protected profit stays protected unless explicitly released and no recovery guarantee.",
  blocked:
    "Loss handling rule preview does not offset losses with protected profit or guarantee recovery.",
  approval: "Loss handling rule preview requires explicit operator approval.",
});

const ACTIVE_CAPITAL_UPDATE = createSection({
  sectionId: "activeCapitalUpdate",
  label: "Active Capital Update",
  title: "Active Capital Update Preview",
  humanReadableSummary:
    "Active capital update preview shows active capital before, active capital after, realised profit, realised loss, protected profit, reinvestable profit, and manual ledger review without reading broker balances, persisting ledger state, or moving funds from the UI.",
  plannedInputs: ["Active capital before", "Active capital after", "Realised profit", "Realised loss", "Protected profit", "Reinvestable profit", "Manual ledger review"],
  plannedOutputs: ["Active Capital Update", "Protected profit", "Reinvestable profit", "Manual ledger review", "Denied active capital update paths"],
  checklistPrefix: "active-capital-update",
  checklistSummary:
    "Active capital update preview shows active capital before active capital after realised profit realised loss protected profit reinvestable profit and manual ledger review.",
  blocked:
    "Active capital update preview does not read broker balances persist ledger state or move funds from the UI.",
  approval: "Active capital update preview requires explicit operator approval.",
});

const PROTECTED_PROFIT_AUDIT = createSection({
  sectionId: "protectedProfitAudit",
  label: "Protected Profit Audit",
  title: "Protected Profit Audit Preview",
  humanReadableSummary:
    "Protected profit audit preview shows realised profit evidence, lock percentage evidence, protected bucket evidence, release evidence, redaction, and audit continuity without persisting audit evidence or money movement decisions from the UI.",
  plannedInputs: ["Realised profit evidence", "Lock percentage evidence", "Protected bucket evidence", "Release evidence", "Redaction", "Audit continuity"],
  plannedOutputs: ["Protected Profit Audit", "Evidence map", "Redaction", "Audit continuity", "Denied protected profit audit paths"],
  checklistPrefix: "protected-profit-audit",
  checklistSummary:
    "Protected profit audit preview shows realised profit evidence lock percentage evidence protected bucket evidence release evidence redaction and audit continuity.",
  blocked:
    "Protected profit audit preview does not persist audit evidence or money movement decisions from the UI.",
  approval: "Protected profit audit preview requires backend-owned capture.",
  state: "backend-owned",
});

const REINVESTMENT_APPROVAL_GATE = createSection({
  sectionId: "reinvestmentApprovalGate",
  label: "Reinvestment Approval Gate",
  title: "Reinvestment Approval Gate Preview",
  humanReadableSummary:
    "Reinvestment approval gate preview shows reinvestment request, protected profit check, risk governor check, evidence check, operator confirmation, expiry, replay protection, and backend-owned approval boundary without approving reinvestment, executing trades, or moving capital from the UI.",
  plannedInputs: ["Reinvestment request", "Protected profit check", "Risk governor check", "Evidence check", "Operator confirmation", "Expiry", "Replay protection"],
  plannedOutputs: ["Reinvestment Approval Gate", "Operator confirmation", "Replay protection", "Backend-owned approval boundary", "Denied reinvestment approval paths"],
  checklistPrefix: "reinvestment-approval-gate",
  checklistSummary:
    "Reinvestment approval gate preview shows reinvestment request protected profit check risk governor check evidence check operator confirmation expiry replay protection and backend-owned approval boundary.",
  blocked:
    "Reinvestment approval gate preview does not approve reinvestment execute trades or move capital from the UI.",
  approval: "Reinvestment approval gate preview requires explicit operator approval.",
  state: "backend-owned",
});

const PROFIT_EVIDENCE_MAP = createSection({
  sectionId: "profitEvidenceMap",
  label: "Profit Evidence Map",
  title: "Profit Evidence Map Preview",
  humanReadableSummary:
    "Profit evidence map preview shows trade result evidence, realised profit evidence, fees slippage evidence, protected profit evidence, reinvestment evidence, approval evidence, and audit continuity without persisting evidence results, audit, or profit decisions from the UI.",
  plannedInputs: ["Trade result evidence", "Realised profit evidence", "Fees slippage evidence", "Protected profit evidence", "Reinvestment evidence", "Approval evidence", "Audit continuity"],
  plannedOutputs: ["Profit Evidence Map", "Approval evidence", "Audit continuity", "Denied profit evidence map paths"],
  checklistPrefix: "profit-evidence-map",
  checklistSummary:
    "Profit evidence map preview shows trade result evidence realised profit evidence fees slippage evidence protected profit evidence reinvestment evidence approval evidence and audit continuity.",
  blocked:
    "Profit evidence map preview does not persist evidence results audit or profit decisions from the UI.",
  approval: "Profit evidence map preview requires backend-owned capture.",
  state: "backend-owned",
});

const DENIED_MONEY_MOVEMENT_BOUNDARY = createSection({
  sectionId: "deniedMoneyMovementBoundary",
  label: "Denied Money Movement Boundary",
  title: "Denied Money Movement Boundary",
  humanReadableSummary:
    "Denied money movement boundary shows blocked money movement, blocked broker access, blocked account reads, blocked credential storage, blocked withdrawal, blocked reinvestment, and backend-owned enforcement without moving money, withdrawing funds, transferring funds, reinvesting capital, connecting brokers, reading accounts, storing credentials, or updating ledgers from the UI.",
  plannedInputs: ["Blocked money movement", "Blocked broker access", "Blocked account reads", "Blocked credential storage", "Blocked withdrawal", "Blocked reinvestment"],
  plannedOutputs: ["Denied Money Movement Boundary", "Backend-owned enforcement", "Denied money movement paths"],
  checklistPrefix: "denied-money-movement-boundary",
  checklistSummary:
    "Denied money movement boundary shows blocked money movement blocked broker access blocked account reads blocked credential storage blocked withdrawal blocked reinvestment and backend-owned enforcement.",
  blocked:
    "Denied money movement boundary does not move money withdraw funds transfer funds reinvest capital connect brokers read accounts store credentials or update ledgers from the UI.",
  approval:
    "Denied money movement boundary requires explicit operator approval before any future money-adjacent workflow.",
  state: "denied",
});

const DENIED_PROFIT_LOCKBOX_BOUNDARIES = createSection({
  sectionId: "deniedProfitLockboxBoundaries",
  label: "Denied Profit Lockbox Boundaries",
  title: "Denied Profit Lockbox Boundaries",
  humanReadableSummary:
    "Denied profit lockbox boundaries keep profit withdrawal, reinvestment execution, broker account reads, live P&L reads, trade placement, financial advice, personalised recommendations, buy sell instructions, guaranteed profit claims, and trading automation blocked from the cockpit.",
  plannedInputs: ["Denied profit lockbox paths", "Denied money movement paths", "Denied broker paths", "Denied advice paths"],
  plannedOutputs: ["Denied profit lockbox paths", "Denied money movement paths", "Denied broker paths", "Denied advice paths"],
  checklistPrefix: "denied-profit-lockbox-boundaries",
  checklistSummary:
    "Denied profit lockbox paths remain blocked and require backend-owned enforcement before any future workflow.",
  blocked:
    "Denied profit lockbox boundaries do not permit profit withdrawal reinvestment execution live P&L reads broker access trade placement financial advice personalised recommendations buy sell instructions guaranteed profit claims or trading automation from the cockpit.",
  approval:
    "Denied profit lockbox boundaries require explicit operator approval and backend-owned broker boundary before future workflow design.",
  state: "denied",
});

const ALL_SECTION_IDS = [
  "profitLockboxBoundary",
  "realisedProfitDefinition",
  "protectedProfitBucketRules",
  "reinvestableProfitBucketRules",
  "lockPercentageRule",
  "releaseConditionRule",
  "reinvestmentCeilingRule",
  "lossHandlingRule",
  "activeCapitalUpdate",
  "protectedProfitAudit",
  "reinvestmentApprovalGate",
  "profitEvidenceMap",
  "deniedMoneyMovementBoundary",
  "deniedProfitLockboxBoundaries",
] as const;

const SECTION_LOOKUP: Record<string, ProfitLockboxReinvestmentRulesSection> = {
  profitLockboxBoundary: PROFIT_LOCKBOX_BOUNDARY,
  realisedProfitDefinition: REALISED_PROFIT_DEFINITION,
  protectedProfitBucketRules: PROTECTED_PROFIT_BUCKET_RULES,
  reinvestableProfitBucketRules: REINVESTABLE_PROFIT_BUCKET_RULES,
  lockPercentageRule: LOCK_PERCENTAGE_RULE,
  releaseConditionRule: RELEASE_CONDITION_RULE,
  reinvestmentCeilingRule: REINVESTMENT_CEILING_RULE,
  lossHandlingRule: LOSS_HANDLING_RULE,
  activeCapitalUpdate: ACTIVE_CAPITAL_UPDATE,
  protectedProfitAudit: PROTECTED_PROFIT_AUDIT,
  reinvestmentApprovalGate: REINVESTMENT_APPROVAL_GATE,
  profitEvidenceMap: PROFIT_EVIDENCE_MAP,
  deniedMoneyMovementBoundary: DENIED_MONEY_MOVEMENT_BOUNDARY,
  deniedProfitLockboxBoundaries: DENIED_PROFIT_LOCKBOX_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly ProfitLockboxReinvestmentRulesItem[] = [
  {
    id: "cockpit-profit-lockbox-review-only",
    label: "Review-only cockpit",
    detail:
      "Cockpit profit lockbox summary keeps realised profit, protected profit, reinvestable profit, lock percent, release conditions, reinvestment ceiling, loss handling, active capital, audit, approval gate, and evidence map static.",
    state: "review-only",
  },
  {
    id: "cockpit-money-movement-blocked",
    label: "Money movement blocked",
    detail:
      "No broker connections from the cockpit, no money movement from the cockpit, no profit withdrawal from the cockpit, no reinvestment execution from the cockpit, and no live P&L reads from the cockpit.",
    state: "blocked",
  },
  {
    id: "cockpit-operator-approval-required",
    label: "Explicit approval required",
    detail:
      "Backend-owned broker boundary remains required and explicit operator approval remains required before any future money-adjacent workflow.",
    state: "needs-approval",
  },
] as const;

const PROFIT_LOCKBOX_REINVESTMENT_RULES_MODEL: ProfitLockboxReinvestmentRulesModel = {
  profitLockboxReinvestmentRulesId: "profit-lockbox-reinvestment-rules-v1",
  profitLockboxReinvestmentRulesKind: "profit-lockbox-reinvestment-rules-v1",
  profitLockboxBoundary: PROFIT_LOCKBOX_BOUNDARY,
  realisedProfitDefinition: REALISED_PROFIT_DEFINITION,
  protectedProfitBucketRules: PROTECTED_PROFIT_BUCKET_RULES,
  reinvestableProfitBucketRules: REINVESTABLE_PROFIT_BUCKET_RULES,
  lockPercentageRule: LOCK_PERCENTAGE_RULE,
  releaseConditionRule: RELEASE_CONDITION_RULE,
  reinvestmentCeilingRule: REINVESTMENT_CEILING_RULE,
  lossHandlingRule: LOSS_HANDLING_RULE,
  activeCapitalUpdate: ACTIVE_CAPITAL_UPDATE,
  protectedProfitAudit: PROTECTED_PROFIT_AUDIT,
  reinvestmentApprovalGate: REINVESTMENT_APPROVAL_GATE,
  profitEvidenceMap: PROFIT_EVIDENCE_MAP,
  deniedMoneyMovementBoundary: DENIED_MONEY_MOVEMENT_BOUNDARY,
  deniedProfitLockboxBoundaries: DENIED_PROFIT_LOCKBOX_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly ProfitLockboxReinvestmentRulesRouteDefinition[] = [
  {
    slug: "profit-lockbox-boundary",
    href: "/profit-lockbox-boundary",
    phase: "Phase 1706",
    title: "Profit Lockbox Boundary",
    commandLabel: "Go to Profit Lockbox Boundary",
    summary: "Defines the Profit Lockbox boundary without frontend money movement, broker connection, account reads, profit withdrawal, reinvestment execution, or guaranteed profit claims.",
    markerPhrases: [
      "Profit lockbox boundary",
      "Profit lockbox boundary does not move money connect brokers read accounts withdraw profit reinvest capital or guarantee profits from the UI",
      "Profit lockbox boundary requires explicit operator approval before any future profit workflow",
      "Profit lockbox boundary prepares backend-owned profit lockbox and reinvestment workflows without frontend money movement",
      "Denied profit lockbox paths remain blocked",
      "Profit lockbox boundary checklist",
    ],
    sectionIds: ["profitLockboxBoundary", "deniedProfitLockboxBoundaries", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "realised-profit-definition-preview",
    href: "/realised-profit-definition-preview",
    phase: "Phase 1707",
    title: "Realised Profit Definition Preview",
    commandLabel: "Go to Realised Profit Definition Preview",
    summary: "Previews realised profit definition rules without broker statement reads, live P&L calculations, or profit guarantees.",
    markerPhrases: [
      "Realised profit definition preview",
      "Realised profit definition preview does not read broker statements calculate live P&L or guarantee profit",
      "Realised profit definition preview requires explicit operator approval",
      "Realised profit definition preview shows closed trade profit realised profit only losing trades have no profit to lock fees slippage taxes caveat and manual confirmation needs",
      "Denied realised profit paths remain blocked",
      "Realised profit definition checklist",
    ],
    sectionIds: ["realisedProfitDefinition", "profitEvidenceMap", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "protected-profit-bucket-rules-preview",
    href: "/protected-profit-bucket-rules-preview",
    phase: "Phase 1708",
    title: "Protected Profit Bucket Rules Preview",
    commandLabel: "Go to Protected Profit Bucket Rules Preview",
    summary: "Previews protected profit bucket rules without money movement, withdrawals, or credential storage.",
    markerPhrases: [
      "Protected profit bucket rules preview",
      "Protected profit bucket rules preview does not move money withdraw funds or store account credentials",
      "Protected profit bucket rules preview requires explicit operator approval",
      "Protected profit bucket rules preview shows protected profit bucket realised-profit-only lock rule lock percentage release condition audit need and backend-owned money boundary",
      "Denied protected profit bucket rules paths remain blocked",
      "Protected profit bucket rules checklist",
    ],
    sectionIds: ["protectedProfitBucketRules", "lockPercentageRule", "releaseConditionRule", "protectedProfitAudit", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "reinvestable-profit-bucket-rules-preview",
    href: "/reinvestable-profit-bucket-rules-preview",
    phase: "Phase 1709",
    title: "Reinvestable Profit Bucket Rules Preview",
    commandLabel: "Go to Reinvestable Profit Bucket Rules Preview",
    summary: "Previews reinvestable profit bucket rules without reinvestment execution, trade placement, or broker connection.",
    markerPhrases: [
      "Reinvestable profit bucket rules preview",
      "Reinvestable profit bucket rules preview does not reinvest money place trades or connect brokers",
      "Reinvestable profit bucket rules preview requires explicit operator approval",
      "Reinvestable profit bucket rules preview shows reinvestable profit bucket realised profit split reinvestable percent protected percent ceiling rule and approval gate",
      "Denied reinvestable profit bucket paths remain blocked",
      "Reinvestable profit bucket rules checklist",
    ],
    sectionIds: ["reinvestableProfitBucketRules", "reinvestmentCeilingRule", "reinvestmentApprovalGate", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "lock-percentage-rule-preview",
    href: "/lock-percentage-rule-preview",
    phase: "Phase 1710",
    title: "Lock Percentage Rule Preview",
    commandLabel: "Go to Lock Percentage Rule Preview",
    summary: "Previews lock percentage rule calculations without real account allocation changes or return guarantees.",
    markerPhrases: [
      "Lock percentage rule preview",
      "Lock percentage rule preview does not change real account allocation or guarantee returns",
      "Lock percentage rule preview requires explicit operator approval",
      "Lock percentage rule preview shows configurable lock percent realised profit allocation protected share reinvestable share rounding note and no guaranteed profit claim",
      "Denied lock percentage paths remain blocked",
      "Lock percentage rule checklist",
    ],
    sectionIds: ["lockPercentageRule", "realisedProfitDefinition", "protectedProfitBucketRules", "reinvestableProfitBucketRules", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "release-condition-rule-preview",
    href: "/release-condition-rule-preview",
    phase: "Phase 1711",
    title: "Release Condition Rule Preview",
    commandLabel: "Go to Release Condition Rule Preview",
    summary: "Previews release condition rules without UI fund release, money movement, or account updates.",
    markerPhrases: [
      "Release condition rule preview",
      "Release condition rule preview does not release funds move money or update accounts from the UI",
      "Release condition rule preview requires explicit operator approval",
      "Release condition rule preview shows protected profit release conditions manual approval expiry evidence requirement audit requirement and backend-owned release boundary",
      "Denied release condition paths remain blocked",
      "Release condition rule checklist",
    ],
    sectionIds: ["releaseConditionRule", "protectedProfitBucketRules", "protectedProfitAudit", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "reinvestment-ceiling-rule-preview",
    href: "/reinvestment-ceiling-rule-preview",
    phase: "Phase 1712",
    title: "Reinvestment Ceiling Rule Preview",
    commandLabel: "Go to Reinvestment Ceiling Rule Preview",
    summary: "Previews reinvestment ceiling rules without UI reinvestment execution or risk-limit increases.",
    markerPhrases: [
      "Reinvestment ceiling rule preview",
      "Reinvestment ceiling rule preview does not execute reinvestment or increase risk limits from the UI",
      "Reinvestment ceiling rule preview requires explicit operator approval",
      "Reinvestment ceiling rule preview shows reinvestment ceiling active capital cap drawdown cap risk governor dependency approval gate and backend-owned enforcement boundary",
      "Denied reinvestment ceiling paths remain blocked",
      "Reinvestment ceiling rule checklist",
    ],
    sectionIds: ["reinvestmentCeilingRule", "reinvestableProfitBucketRules", "reinvestmentApprovalGate", "activeCapitalUpdate", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "loss-handling-rule-preview",
    href: "/loss-handling-rule-preview",
    phase: "Phase 1713",
    title: "Loss Handling Rule Preview",
    commandLabel: "Go to Loss Handling Rule Preview",
    summary: "Previews loss handling rules without offsetting losses with protected profit or guaranteeing recovery.",
    markerPhrases: [
      "Loss handling rule preview",
      "Loss handling rule preview does not offset losses with protected profit or guarantee recovery",
      "Loss handling rule preview requires explicit operator approval",
      "Loss handling rule preview shows losing trades have no profit to lock losses reduce active capital protected profit stays protected unless explicitly released and no recovery guarantee",
      "Denied loss handling paths remain blocked",
      "Loss handling rule checklist",
    ],
    sectionIds: ["lossHandlingRule", "activeCapitalUpdate", "protectedProfitBucketRules", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "active-capital-update-preview",
    href: "/active-capital-update-preview",
    phase: "Phase 1714",
    title: "Active Capital Update Preview",
    commandLabel: "Go to Active Capital Update Preview",
    summary: "Previews active capital update math without broker balance reads, ledger persistence, or fund movement from the UI.",
    markerPhrases: [
      "Active capital update preview",
      "Active capital update preview does not read broker balances persist ledger state or move funds from the UI",
      "Active capital update preview requires explicit operator approval",
      "Active capital update preview shows active capital before active capital after realised profit realised loss protected profit reinvestable profit and manual ledger review",
      "Denied active capital update paths remain blocked",
      "Active capital update checklist",
    ],
    sectionIds: ["activeCapitalUpdate", "realisedProfitDefinition", "lossHandlingRule", "protectedProfitBucketRules", "reinvestableProfitBucketRules", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "protected-profit-audit-preview",
    href: "/protected-profit-audit-preview",
    phase: "Phase 1715",
    title: "Protected Profit Audit Preview",
    commandLabel: "Go to Protected Profit Audit Preview",
    summary: "Previews protected profit audit needs without UI audit evidence persistence or money movement decisions.",
    markerPhrases: [
      "Protected profit audit preview",
      "Protected profit audit preview does not persist audit evidence or money movement decisions from the UI",
      "Protected profit audit preview requires backend-owned capture",
      "Protected profit audit preview shows realised profit evidence lock percentage evidence protected bucket evidence release evidence redaction and audit continuity",
      "Denied protected profit audit paths remain blocked",
      "Protected profit audit checklist",
    ],
    sectionIds: ["protectedProfitAudit", "profitEvidenceMap", "realisedProfitDefinition", "protectedProfitBucketRules", "releaseConditionRule", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "reinvestment-approval-gate-preview",
    href: "/reinvestment-approval-gate-preview",
    phase: "Phase 1716",
    title: "Reinvestment Approval Gate Preview",
    commandLabel: "Go to Reinvestment Approval Gate Preview",
    summary: "Previews reinvestment approval gates without UI approval, trade execution, or capital movement.",
    markerPhrases: [
      "Reinvestment approval gate preview",
      "Reinvestment approval gate preview does not approve reinvestment execute trades or move capital from the UI",
      "Reinvestment approval gate preview requires explicit operator approval",
      "Reinvestment approval gate preview shows reinvestment request protected profit check risk governor check evidence check operator confirmation expiry replay protection and backend-owned approval boundary",
      "Denied reinvestment approval paths remain blocked",
      "Reinvestment approval gate checklist",
    ],
    sectionIds: ["reinvestmentApprovalGate", "reinvestmentCeilingRule", "profitEvidenceMap", "protectedProfitBucketRules", "deniedMoneyMovementBoundary"],
    devOnly: true,
  },
  {
    slug: "profit-evidence-map-preview",
    href: "/profit-evidence-map-preview",
    phase: "Phase 1717",
    title: "Profit Evidence Map Preview",
    commandLabel: "Go to Profit Evidence Map Preview",
    summary: "Previews profit evidence maps without UI evidence result, audit, or profit decision persistence.",
    markerPhrases: [
      "Profit evidence map preview",
      "Profit evidence map preview does not persist evidence results audit or profit decisions from the UI",
      "Profit evidence map preview requires backend-owned capture",
      "Profit evidence map preview shows trade result evidence realised profit evidence fees slippage evidence protected profit evidence reinvestment evidence approval evidence and audit continuity",
      "Denied profit evidence map paths remain blocked",
      "Profit evidence map checklist",
    ],
    sectionIds: ["profitEvidenceMap", "realisedProfitDefinition", "protectedProfitAudit", "reinvestmentApprovalGate", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-profit-lockbox-summary",
    href: "/cockpit-profit-lockbox-summary",
    phase: "Phase 1718",
    title: "Cockpit Profit Lockbox Summary",
    commandLabel: "Go to Cockpit Profit Lockbox Summary",
    summary: "Summarizes Profit Lockbox and Reinvestment Rules in the cockpit without frontend money movement, broker connection, live P&L reads, trade placement, advice, or automation.",
    markerPhrases: [
      "Cockpit profit lockbox summary",
      "Cockpit profit lockbox summary keeps the cockpit as the normal user surface",
      "Cockpit profit lockbox summary does not move money withdraw profit reinvest capital connect brokers read live P&L place trades provide financial advice provide personalised recommendations issue buy sell instructions automate trading or guarantee profit from the cockpit",
      "Cockpit profit lockbox summary shows realised profit protected profit reinvestable profit lock percent release conditions reinvestment ceiling loss handling active capital audit approval gate and evidence map",
      "Phase pages remain dev test diagnostics only",
      "Cockpit profit lockbox checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "denied-money-movement-boundary",
    href: "/denied-money-movement-boundary",
    phase: "Phase 1719",
    title: "Denied Money Movement Boundary",
    commandLabel: "Go to Denied Money Movement Boundary",
    summary: "Defines denied money movement boundaries without UI money movement, withdrawals, transfers, reinvestment, broker access, account reads, credential storage, or ledger updates.",
    markerPhrases: [
      "Denied money movement boundary",
      "Denied money movement boundary does not move money withdraw funds transfer funds reinvest capital connect brokers read accounts store credentials or update ledgers from the UI",
      "Denied money movement boundary requires explicit operator approval before any future money-adjacent workflow",
      "Denied money movement boundary shows blocked money movement blocked broker access blocked account reads blocked credential storage blocked withdrawal blocked reinvestment and backend-owned enforcement",
      "Denied money movement paths remain blocked",
      "Denied money movement boundary checklist",
    ],
    sectionIds: ["deniedMoneyMovementBoundary", "profitLockboxBoundary", "deniedProfitLockboxBoundaries"],
    devOnly: true,
  },
  {
    slug: "first-profit-lockbox-reinvestment-candidate",
    href: "/first-profit-lockbox-reinvestment-candidate",
    phase: "Phase 1720",
    title: "First Profit Lockbox Reinvestment Candidate",
    commandLabel: "Go to First Profit Lockbox Reinvestment Candidate",
    summary: "Combines the first Profit Lockbox Reinvestment candidate without enabling money movement, broker workflows, trading workflows, or reinvestment execution from the UI.",
    markerPhrases: [
      "First profit lockbox reinvestment candidate",
      "First profit lockbox reinvestment candidate does not enable money movement broker workflows trading workflows or reinvestment execution from the UI",
      "First profit lockbox reinvestment candidate requires explicit operator approval",
      "Candidate combines realised profit protected profit reinvestable profit lock percentage release conditions reinvestment ceiling loss handling active capital audit approval evidence cockpit summary denied money movement and denied profit paths",
      "Denied first profit lockbox reinvestment paths remain blocked",
      "First profit lockbox reinvestment checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-profit-lockbox-reinvestment-release-candidate",
    href: "/controlled-profit-lockbox-reinvestment-release-candidate",
    phase: "Phase 1721",
    title: "Controlled Profit Lockbox Reinvestment Release Candidate",
    commandLabel: "Go to Controlled Profit Lockbox Reinvestment Release Candidate",
    summary: "Controlled Profit Lockbox Reinvestment release candidate prepares backend-owned profit lockbox and reinvestment workflows without frontend money movement.",
    markerPhrases: [
      "Controlled profit lockbox reinvestment release candidate",
      "Controlled profit lockbox reinvestment release candidate does not move money withdraw funds transfer funds reinvest capital read live P&L connect brokers read accounts place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions guarantee profit automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled profit lockbox reinvestment release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned profit lockbox and reinvestment workflows without frontend money movement",
      "Denied controlled profit lockbox reinvestment paths remain blocked",
      "Controlled profit lockbox reinvestment release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listProfitLockboxReinvestmentRulesRouteDefinitions(): readonly ProfitLockboxReinvestmentRulesRouteDefinition[] {
  return ROUTES;
}

export function getProfitLockboxReinvestmentRulesRouteDefinition(
  slug: ProfitLockboxReinvestmentRulesRouteSlug
): ProfitLockboxReinvestmentRulesRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildProfitLockboxReinvestmentRulesRouteModel(
  slug: ProfitLockboxReinvestmentRulesRouteSlug = "controlled-profit-lockbox-reinvestment-release-candidate"
): ProfitLockboxReinvestmentRulesRouteModel {
  const route = getProfitLockboxReinvestmentRulesRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is ProfitLockboxReinvestmentRulesSection => Boolean(section));

  return {
    route,
    profitLockboxReinvestmentRules: PROFIT_LOCKBOX_REINVESTMENT_RULES_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PROFIT_LOCKBOX_REINVESTMENT_RULES_COCKPIT_MARKERS,
    summary: summarizeProfitLockboxReinvestmentRulesRoute(route, sections),
  };
}

export function buildProfitLockboxReinvestmentRulesModel(): ProfitLockboxReinvestmentRulesRouteModel {
  return buildProfitLockboxReinvestmentRulesRouteModel("controlled-profit-lockbox-reinvestment-release-candidate");
}

export function summarizeProfitLockboxReinvestmentRulesRoute(
  route: ProfitLockboxReinvestmentRulesRouteDefinition,
  sections: readonly ProfitLockboxReinvestmentRulesSection[]
): string {
  return `${route.title} keeps ${sections.length} profit lockbox and reinvestment rule sections static, deterministic, review-only, approval-required, backend-owned, risk-governed, and blocked from frontend money movement, profit withdrawal, reinvestment execution, broker connection, account access, live P&L reads, trade placement, financial advice, personalised recommendation, buy sell instruction, automated trading, order sizing, live account monitoring, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, browser storage writes, credential storage, and guaranteed profit claims. Required markers: ${REQUIRED_SAFETY_MARKERS.join(", ")}.`;
}

export function buildProfitLockboxReinvestmentRulesStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
