export type PaperBrokerAdapterSimulatorRouteSlug =
  | "paper-broker-adapter-simulator-boundary"
  | "synthetic-account-state-preview"
  | "synthetic-buying-power-preview"
  | "synthetic-position-ledger-preview"
  | "synthetic-order-intent-preview"
  | "synthetic-order-validation-preview"
  | "synthetic-order-queue-preview"
  | "synthetic-fill-model-preview"
  | "synthetic-slippage-fee-preview"
  | "synthetic-rejection-reason-preview"
  | "synthetic-cancel-replace-preview"
  | "synthetic-execution-audit-preview"
  | "synthetic-risk-governor-bridge-preview"
  | "cockpit-paper-broker-simulator-summary"
  | "first-paper-broker-adapter-simulator-candidate"
  | "controlled-paper-broker-adapter-simulator-release-candidate";

export type PaperBrokerAdapterSimulatorKind =
  | "paper-broker-adapter-simulator-v1"
  | PaperBrokerAdapterSimulatorRouteSlug;

export type PaperBrokerAdapterSimulatorState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type PaperBrokerAdapterSimulatorItem = {
  id: string;
  label: string;
  detail: string;
  state: PaperBrokerAdapterSimulatorState;
};

export type PaperBrokerAdapterSimulatorSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly PaperBrokerAdapterSimulatorItem[];
  state: PaperBrokerAdapterSimulatorState;
};

export type PaperBrokerAdapterSimulatorSectionId =
  | "syntheticAccountState"
  | "syntheticBuyingPower"
  | "syntheticPositionLedger"
  | "syntheticOrderIntent"
  | "syntheticOrderValidation"
  | "syntheticOrderQueue"
  | "syntheticFillModel"
  | "syntheticSlippageFee"
  | "syntheticRejectionReason"
  | "syntheticCancelReplace"
  | "syntheticExecutionAudit"
  | "syntheticRiskGovernorBridge"
  | "deniedPaperBrokerSimulatorBoundaries";

export type PaperBrokerAdapterSimulatorModel = {
  paperBrokerAdapterSimulatorId: string;
  paperBrokerAdapterSimulatorKind: PaperBrokerAdapterSimulatorKind;
  syntheticAccountState: PaperBrokerAdapterSimulatorSection;
  syntheticBuyingPower: PaperBrokerAdapterSimulatorSection;
  syntheticPositionLedger: PaperBrokerAdapterSimulatorSection;
  syntheticOrderIntent: PaperBrokerAdapterSimulatorSection;
  syntheticOrderValidation: PaperBrokerAdapterSimulatorSection;
  syntheticOrderQueue: PaperBrokerAdapterSimulatorSection;
  syntheticFillModel: PaperBrokerAdapterSimulatorSection;
  syntheticSlippageFee: PaperBrokerAdapterSimulatorSection;
  syntheticRejectionReason: PaperBrokerAdapterSimulatorSection;
  syntheticCancelReplace: PaperBrokerAdapterSimulatorSection;
  syntheticExecutionAudit: PaperBrokerAdapterSimulatorSection;
  syntheticRiskGovernorBridge: PaperBrokerAdapterSimulatorSection;
  deniedPaperBrokerSimulatorBoundaries: PaperBrokerAdapterSimulatorSection;
  cockpitSummary: readonly PaperBrokerAdapterSimulatorItem[];
  explicitSafetyLimits: readonly string[];
};

export type PaperBrokerAdapterSimulatorRouteDefinition = {
  slug: PaperBrokerAdapterSimulatorRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly PaperBrokerAdapterSimulatorSectionId[];
  devOnly: boolean;
};

export type PaperBrokerAdapterSimulatorRouteModel = {
  route: PaperBrokerAdapterSimulatorRouteDefinition;
  paperBrokerAdapterSimulator: PaperBrokerAdapterSimulatorModel;
  sections: readonly PaperBrokerAdapterSimulatorSection[];
  diagnosticRoutes: readonly PaperBrokerAdapterSimulatorRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PAPER_BROKER_ADAPTER_SIMULATOR_COCKPIT_MARKERS = [
  "Paper Broker Adapter Simulator",
  "Synthetic Account State",
  "Synthetic Buying Power",
  "Synthetic Position Ledger",
  "Synthetic Order Intent",
  "Synthetic Order Validation",
  "Synthetic Order Queue",
  "Synthetic Fill Model",
  "Synthetic Slippage Fee",
  "Synthetic Rejection Reason",
  "Synthetic Cancel Replace",
  "Synthetic Execution Audit",
  "Synthetic Risk Governor Bridge",
  "No real broker connection from the cockpit",
  "No broker SDK from the cockpit",
  "No broker API calls from the cockpit",
  "No real account state from the cockpit",
  "No real buying power from the cockpit",
  "No live positions from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No real paper order execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "Synthetic data only",
  "Review-only simulator",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned execution simulator remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Paper Broker Adapter Simulator v1 is deterministic static review content only.",
  "This is not a real broker.",
  "This is not a broker SDK.",
  "This is not a broker API.",
  "This is not a real account.",
  "This is not portfolio access.",
  "This is not live market data.",
  "This is not order placement.",
  "This is not order routing.",
  "This is not paper order execution from the frontend.",
  "This is not money movement.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated trading.",
  "No real broker connection from the cockpit.",
  "No broker SDK from the cockpit.",
  "No broker API calls from the cockpit.",
  "No real account state from the cockpit.",
  "No real buying power from the cockpit.",
  "No live positions from the cockpit.",
  "No live market data calls from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No real paper order execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "Synthetic data only.",
  "Review-only simulator.",
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned execution simulator remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future simulator workflows remain backend-owned, approval-gated, risk-governed, kill-switch enforced, and evidence-backed.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, order placement, order dispatch, account access, buying power access, position access, money movement, or live market data.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker SDK import, broker API call, live connection, credential storage, endpoint storage, real account read, real balance read, real buying power read, real position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, order mutation, money movement, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, or browser storage write from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned execution simulator remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly PaperBrokerAdapterSimulatorItem[] {
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
  state = "synthetic-only",
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
  state?: PaperBrokerAdapterSimulatorState;
}): PaperBrokerAdapterSimulatorSection {
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

const SYNTHETIC_ACCOUNT_STATE = createSection({
  sectionId: "syntheticAccountState",
  label: "Synthetic Account State",
  title: "Deterministic Synthetic Account State",
  humanReadableSummary:
    "Synthetic account state preview shows deterministic starting cash, simulated equity, simulated realised P&L, simulated unrealised P&L, simulated exposure, and no real account reads.",
  plannedInputs: ["Synthetic starting cash fixture", "Simulated equity", "Simulated realised P&L", "Simulated unrealised P&L", "Simulated exposure"],
  plannedOutputs: ["Synthetic Account State", "Simulated starting cash", "Simulated equity", "Denied real account reads"],
  checklistPrefix: "synthetic-account-state",
  checklistSummary:
    "Synthetic account state preview shows deterministic starting cash simulated equity simulated realised P&L simulated unrealised P&L simulated exposure and no real account reads.",
  blocked:
    "Synthetic account state preview does not read real broker accounts balances portfolios margin buying power or live P&L from the UI.",
  approval: "Synthetic account state preview requires synthetic fixtures only.",
});

const SYNTHETIC_BUYING_POWER = createSection({
  sectionId: "syntheticBuyingPower",
  label: "Synthetic Buying Power",
  title: "Deterministic Buying Power Preview",
  humanReadableSummary:
    "Synthetic buying power preview shows simulated cash buffer, simulated exposure cap, simulated per-order cap, simulated reserved buying power, and denied real broker reads.",
  plannedInputs: ["Simulated cash buffer", "Simulated exposure cap", "Simulated per-order cap", "Simulated reserved buying power"],
  plannedOutputs: ["Synthetic Buying Power", "Synthetic calculation trace", "Denied real broker reads"],
  checklistPrefix: "synthetic-buying-power",
  checklistSummary:
    "Synthetic buying power preview shows simulated cash buffer simulated exposure cap simulated per-order cap simulated reserved buying power and denied real broker reads.",
  blocked:
    "Synthetic buying power preview does not read real buying power margin leverage account capacity or broker restrictions from the UI.",
  approval: "Synthetic buying power preview requires deterministic synthetic calculations only.",
});

const SYNTHETIC_POSITION_LEDGER = createSection({
  sectionId: "syntheticPositionLedger",
  label: "Synthetic Position Ledger",
  title: "Synthetic Position Ledger",
  humanReadableSummary:
    "Synthetic position ledger preview shows simulated symbol, simulated quantity, simulated average price, simulated realised P&L, simulated open risk, and denied live portfolio reads.",
  plannedInputs: ["Simulated symbol", "Simulated quantity", "Simulated average price", "Simulated realised P&L", "Simulated open risk"],
  plannedOutputs: ["Synthetic Position Ledger", "Synthetic ledger rows", "Denied live portfolio reads"],
  checklistPrefix: "synthetic-position-ledger",
  checklistSummary:
    "Synthetic position ledger preview shows simulated symbol simulated quantity simulated average price simulated realised P&L simulated open risk and denied live portfolio reads.",
  blocked:
    "Synthetic position ledger preview does not read live positions portfolio holdings broker fills or account statements from the UI.",
  approval: "Synthetic position ledger preview requires deterministic synthetic ledger entries only.",
});

const SYNTHETIC_ORDER_INTENT = createSection({
  sectionId: "syntheticOrderIntent",
  label: "Synthetic Order Intent",
  title: "Review-Only Synthetic Order Intent",
  humanReadableSummary:
    "Synthetic order intent preview shows simulated symbol, side, quantity, order type, time in force, thesis, risk note, mandate fit, and no executable order state.",
  plannedInputs: ["Simulated symbol", "Side", "Quantity", "Order type", "Time in force", "Thesis", "Risk note", "Mandate fit"],
  plannedOutputs: ["Synthetic Order Intent", "Review-only intent packet", "No executable order state"],
  checklistPrefix: "synthetic-order-intent",
  checklistSummary:
    "Synthetic order intent preview shows simulated symbol side quantity order type time in force thesis risk note mandate fit and no executable order state.",
  blocked:
    "Synthetic order intent preview does not place trades submit orders call brokers or send executable broker instructions from the UI.",
  approval: "Synthetic order intent preview requires review-only order intent packets.",
});

const SYNTHETIC_ORDER_VALIDATION = createSection({
  sectionId: "syntheticOrderValidation",
  label: "Synthetic Order Validation",
  title: "Synthetic Validation Gates",
  humanReadableSummary:
    "Synthetic order validation preview shows synthetic mandate validation, synthetic risk governor validation, synthetic kill switch validation, synthetic buying power validation, and denied real validation.",
  plannedInputs: ["Synthetic mandate validation", "Synthetic risk governor validation", "Synthetic kill switch validation", "Synthetic buying power validation"],
  plannedOutputs: ["Synthetic Order Validation", "Denied real validation", "Backend-owned simulator validation boundary"],
  checklistPrefix: "synthetic-order-validation",
  checklistSummary:
    "Synthetic order validation preview shows synthetic mandate validation synthetic risk governor validation synthetic kill switch validation synthetic buying power validation and denied real validation.",
  blocked:
    "Synthetic order validation preview does not fetch live quotes validate real broker constraints or approve real execution from the UI.",
  approval: "Synthetic order validation preview requires deterministic simulator validation only.",
  state: "backend-owned",
});

const SYNTHETIC_ORDER_QUEUE = createSection({
  sectionId: "syntheticOrderQueue",
  label: "Synthetic Order Queue",
  title: "Backend-Owned Simulator Queue Boundary",
  humanReadableSummary:
    "Synthetic order queue preview shows simulated queued state, simulated held state, simulated rejected state, simulated expired state, and denied frontend queue mutation.",
  plannedInputs: ["Simulated queued state", "Simulated held state", "Simulated rejected state", "Simulated expired state"],
  plannedOutputs: ["Synthetic Order Queue", "Denied frontend queue mutation", "Backend-owned simulator queue boundary"],
  checklistPrefix: "synthetic-order-queue",
  checklistSummary:
    "Synthetic order queue preview shows simulated queued state simulated held state simulated rejected state simulated expired state and denied frontend queue mutation.",
  blocked:
    "Synthetic order queue preview does not enqueue real jobs dispatch workers submit trades call brokers or persist orders from the UI.",
  approval: "Synthetic order queue preview requires backend-owned simulator queue boundary.",
  state: "backend-owned",
});

const SYNTHETIC_FILL_MODEL = createSection({
  sectionId: "syntheticFillModel",
  label: "Synthetic Fill Model",
  title: "Synthetic Fill Assumptions",
  humanReadableSummary:
    "Synthetic fill model preview shows simulated fill price, simulated partial fill, simulated full fill, simulated no-fill, simulated timestamp placeholder, and denied live execution.",
  plannedInputs: ["Simulated fill price", "Simulated partial fill", "Simulated full fill", "Simulated no-fill", "Simulated timestamp placeholder"],
  plannedOutputs: ["Synthetic Fill Model", "Synthetic fill assumptions", "Denied live execution"],
  checklistPrefix: "synthetic-fill-model",
  checklistSummary:
    "Synthetic fill model preview shows simulated fill price simulated partial fill simulated full fill simulated no-fill simulated timestamp placeholder and denied live execution.",
  blocked:
    "Synthetic fill model preview does not execute paper trades read live market data route orders or create real fills from the UI.",
  approval: "Synthetic fill model preview requires deterministic synthetic fill assumptions only.",
});

const SYNTHETIC_SLIPPAGE_FEE = createSection({
  sectionId: "syntheticSlippageFee",
  label: "Synthetic Slippage Fee",
  title: "Synthetic Slippage and Fee Assumptions",
  humanReadableSummary:
    "Synthetic slippage fee preview shows simulated fee assumption, simulated slippage assumption, simulated spread assumption, simulated liquidity note, and denied live market reads.",
  plannedInputs: ["Simulated fee assumption", "Simulated slippage assumption", "Simulated spread assumption", "Simulated liquidity note"],
  plannedOutputs: ["Synthetic Slippage Fee", "Deterministic fee assumption", "Denied live market reads"],
  checklistPrefix: "synthetic-slippage-fee",
  checklistSummary:
    "Synthetic slippage fee preview shows simulated fee assumption simulated slippage assumption simulated spread assumption simulated liquidity note and denied live market reads.",
  blocked:
    "Synthetic slippage fee preview does not fetch exchange fees live spreads broker commissions or market microstructure data from the UI.",
  approval: "Synthetic slippage fee preview requires deterministic fee and slippage assumptions only.",
});

const SYNTHETIC_REJECTION_REASON = createSection({
  sectionId: "syntheticRejectionReason",
  label: "Synthetic Rejection Reason",
  title: "Deterministic Synthetic Rejections",
  humanReadableSummary:
    "Synthetic rejection reason preview shows simulated insufficient buying power, simulated risk governor hold, simulated kill switch hold, simulated stale intent, simulated invalid symbol, and simulated operator review.",
  plannedInputs: ["Simulated insufficient buying power", "Simulated risk governor hold", "Simulated kill switch hold", "Simulated stale intent", "Simulated invalid symbol", "Simulated operator review"],
  plannedOutputs: ["Synthetic Rejection Reason", "Deterministic rejection reasons", "Denied live order recovery"],
  checklistPrefix: "synthetic-rejection-reason",
  checklistSummary:
    "Synthetic rejection reason preview shows simulated insufficient buying power simulated risk governor hold simulated kill switch hold simulated stale intent simulated invalid symbol simulated operator review.",
  blocked:
    "Synthetic rejection reason preview does not call brokers retry orders mutate orders or recover live execution from the UI.",
  approval: "Synthetic rejection reason preview requires deterministic synthetic rejection reasons only.",
});

const SYNTHETIC_CANCEL_REPLACE = createSection({
  sectionId: "syntheticCancelReplace",
  label: "Synthetic Cancel Replace",
  title: "Review-Only Cancel Replace Packets",
  humanReadableSummary:
    "Synthetic cancel replace preview shows simulated cancel request, simulated replace request, simulated denied live mutation, simulated approval requirement, and backend-owned simulator boundary.",
  plannedInputs: ["Simulated cancel request", "Simulated replace request", "Simulated approval requirement", "Backend-owned simulator boundary"],
  plannedOutputs: ["Synthetic Cancel Replace", "Denied live mutation", "Review-only packet"],
  checklistPrefix: "synthetic-cancel-replace",
  checklistSummary:
    "Synthetic cancel replace preview shows simulated cancel request simulated replace request simulated denied live mutation simulated approval requirement and backend-owned simulator boundary.",
  blocked:
    "Synthetic cancel replace preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI.",
  approval: "Synthetic cancel replace preview requires review-only synthetic cancel replace packets.",
  state: "needs-approval",
});

const SYNTHETIC_EXECUTION_AUDIT = createSection({
  sectionId: "syntheticExecutionAudit",
  label: "Synthetic Execution Audit",
  title: "Backend-Owned Synthetic Audit Capture",
  humanReadableSummary:
    "Synthetic execution audit preview shows simulated intent evidence, simulated validation evidence, simulated queue evidence, simulated fill evidence, simulated rejection evidence, redaction, and audit continuity.",
  plannedInputs: ["Simulated intent evidence", "Simulated validation evidence", "Simulated queue evidence", "Simulated fill evidence", "Simulated rejection evidence", "Redaction", "Audit continuity"],
  plannedOutputs: ["Synthetic Execution Audit", "Backend-owned synthetic audit capture", "Denied frontend persistence"],
  checklistPrefix: "synthetic-execution-audit",
  checklistSummary:
    "Synthetic execution audit preview shows simulated intent evidence simulated validation evidence simulated queue evidence simulated fill evidence simulated rejection evidence redaction and audit continuity.",
  blocked:
    "Synthetic execution audit preview does not persist execution evidence results audit approvals queues transactions or broker decisions from the UI.",
  approval: "Synthetic execution audit preview requires backend-owned synthetic audit capture.",
  state: "backend-owned",
});

const SYNTHETIC_RISK_GOVERNOR_BRIDGE = createSection({
  sectionId: "syntheticRiskGovernorBridge",
  label: "Synthetic Risk Governor Bridge",
  title: "Synthetic Risk Governor Bridge",
  humanReadableSummary:
    "Synthetic risk governor bridge preview shows synthetic mandate fit, max daily loss, max drawdown, position risk, approved symbols, approved strategies, kill switch state, and denied override.",
  plannedInputs: ["Synthetic mandate fit", "Max daily loss", "Max drawdown", "Position risk", "Approved symbols", "Approved strategies", "Kill switch state"],
  plannedOutputs: ["Synthetic Risk Governor Bridge", "Denied override", "Backend-owned risk governor simulation"],
  checklistPrefix: "synthetic-risk-governor-bridge",
  checklistSummary:
    "Synthetic risk governor bridge preview shows synthetic mandate fit max daily loss max drawdown position risk approved symbols approved strategies kill switch state and denied override.",
  blocked:
    "Synthetic risk governor bridge preview does not override risk governor decisions place trades approve execution or mutate capital from the UI.",
  approval: "Synthetic risk governor bridge preview requires backend-owned risk governor simulation.",
  state: "backend-owned",
});

const DENIED_PAPER_BROKER_SIMULATOR_BOUNDARIES = createSection({
  sectionId: "deniedPaperBrokerSimulatorBoundaries",
  label: "Denied Paper Broker Simulator Boundaries",
  title: "Denied Simulator Paths",
  humanReadableSummary:
    "Denied paper broker simulator paths remain blocked for real broker connection, broker SDKs, broker API calls, real account state, real buying power, live positions, live market data, order placement, order dispatch, real paper order execution, money movement, trading automation, financial advice, personalised recommendations, and buy sell instructions from the cockpit.",
  plannedInputs: ["Denied real broker connection", "Denied real account reads", "Denied real buying power reads", "Denied live positions", "Denied live market data", "Denied order placement", "Denied order dispatch"],
  plannedOutputs: ["Denied paper broker simulator paths remain blocked", "Explicit operator approval remains required", "Backend-owned simulator boundary"],
  checklistPrefix: "denied-paper-broker-simulator",
  checklistSummary:
    "Denied paper broker simulator paths remain blocked and require backend-owned paper broker adapter simulation before any future workflow can be reviewed.",
  blocked:
    "Denied paper broker simulator paths block frontend broker connection, account reads, buying power reads, live position reads, order placement, dispatch, paper execution, money movement, live market data calls, advice, recommendations, and buy sell instructions.",
  approval: "Denied paper broker simulator paths require explicit operator approval.",
  state: "blocked",
});

const COCKPIT_SUMMARY: readonly PaperBrokerAdapterSimulatorItem[] = [
  {
    id: "checkpoint-through-1769",
    label: "Checkpoint",
    detail: "Status summary: through phase 1769 after Paper Broker Adapter Simulator v1.",
    state: "review-only",
  },
  {
    id: "latest-batch",
    label: "Latest completed batch",
    detail: "1754-1769 - Paper Broker Adapter Simulator v1.",
    state: "candidate",
  },
  {
    id: "latest-release-candidate",
    label: "Latest release candidate",
    detail: "Controlled Paper Broker Adapter Simulator Release Candidate.",
    state: "release-candidate",
  },
  {
    id: "cockpit-summary",
    label: "Cockpit placement",
    detail: "Cockpit now includes safe paper broker adapter simulator previews inside Trading Workspace below Broker Execution Boundary.",
    state: "review-only",
  },
  {
    id: "synthetic-only",
    label: "Synthetic data only",
    detail: "Paper broker simulator remains review-only, synthetic-only, and blocked from real broker connections, account reads, buying power reads, live position reads, order placement, dispatch, paper order execution, money movement, live market data, financial advice, personalised recommendations, and buy sell instructions.",
    state: "blocked",
  },
];

const PAPER_BROKER_ADAPTER_SIMULATOR_MODEL: PaperBrokerAdapterSimulatorModel = {
  paperBrokerAdapterSimulatorId: "paper-broker-adapter-simulator-v1",
  paperBrokerAdapterSimulatorKind: "paper-broker-adapter-simulator-v1",
  syntheticAccountState: SYNTHETIC_ACCOUNT_STATE,
  syntheticBuyingPower: SYNTHETIC_BUYING_POWER,
  syntheticPositionLedger: SYNTHETIC_POSITION_LEDGER,
  syntheticOrderIntent: SYNTHETIC_ORDER_INTENT,
  syntheticOrderValidation: SYNTHETIC_ORDER_VALIDATION,
  syntheticOrderQueue: SYNTHETIC_ORDER_QUEUE,
  syntheticFillModel: SYNTHETIC_FILL_MODEL,
  syntheticSlippageFee: SYNTHETIC_SLIPPAGE_FEE,
  syntheticRejectionReason: SYNTHETIC_REJECTION_REASON,
  syntheticCancelReplace: SYNTHETIC_CANCEL_REPLACE,
  syntheticExecutionAudit: SYNTHETIC_EXECUTION_AUDIT,
  syntheticRiskGovernorBridge: SYNTHETIC_RISK_GOVERNOR_BRIDGE,
  deniedPaperBrokerSimulatorBoundaries: DENIED_PAPER_BROKER_SIMULATOR_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<PaperBrokerAdapterSimulatorSectionId, PaperBrokerAdapterSimulatorSection> = {
  syntheticAccountState: SYNTHETIC_ACCOUNT_STATE,
  syntheticBuyingPower: SYNTHETIC_BUYING_POWER,
  syntheticPositionLedger: SYNTHETIC_POSITION_LEDGER,
  syntheticOrderIntent: SYNTHETIC_ORDER_INTENT,
  syntheticOrderValidation: SYNTHETIC_ORDER_VALIDATION,
  syntheticOrderQueue: SYNTHETIC_ORDER_QUEUE,
  syntheticFillModel: SYNTHETIC_FILL_MODEL,
  syntheticSlippageFee: SYNTHETIC_SLIPPAGE_FEE,
  syntheticRejectionReason: SYNTHETIC_REJECTION_REASON,
  syntheticCancelReplace: SYNTHETIC_CANCEL_REPLACE,
  syntheticExecutionAudit: SYNTHETIC_EXECUTION_AUDIT,
  syntheticRiskGovernorBridge: SYNTHETIC_RISK_GOVERNOR_BRIDGE,
  deniedPaperBrokerSimulatorBoundaries: DENIED_PAPER_BROKER_SIMULATOR_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly PaperBrokerAdapterSimulatorSectionId[] = [
  "syntheticAccountState",
  "syntheticBuyingPower",
  "syntheticPositionLedger",
  "syntheticOrderIntent",
  "syntheticOrderValidation",
  "syntheticOrderQueue",
  "syntheticFillModel",
  "syntheticSlippageFee",
  "syntheticRejectionReason",
  "syntheticCancelReplace",
  "syntheticExecutionAudit",
  "syntheticRiskGovernorBridge",
  "deniedPaperBrokerSimulatorBoundaries",
] as const;

const ROUTES: readonly PaperBrokerAdapterSimulatorRouteDefinition[] = [
  {
    slug: "paper-broker-adapter-simulator-boundary",
    href: "/paper-broker-adapter-simulator-boundary",
    phase: "Phase 1754",
    title: "Paper Broker Adapter Simulator Boundary",
    commandLabel: "Go to Paper Broker Adapter Simulator Boundary",
    summary: "Defines a review-only paper broker adapter simulator boundary for deterministic synthetic backend-owned paper adapter workflows without frontend execution.",
    markerPhrases: [
      "Paper broker adapter simulator boundary",
      "Paper broker adapter simulator boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data or provide financial advice from the UI",
      "Paper broker adapter simulator boundary requires explicit operator approval",
      "Paper broker adapter simulator boundary prepares deterministic synthetic backend-owned paper adapter workflows without frontend execution",
      "Denied paper broker simulator paths remain blocked",
      "Paper broker adapter simulator boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "synthetic-account-state-preview",
    href: "/synthetic-account-state-preview",
    phase: "Phase 1755",
    title: "Synthetic Account State Preview",
    commandLabel: "Go to Synthetic Account State Preview",
    summary: "Previews deterministic synthetic account state without reading real accounts, balances, portfolios, margin, buying power, or live P&L from the UI.",
    markerPhrases: [
      "Synthetic account state preview",
      "Synthetic account state preview does not read real broker accounts balances portfolios margin buying power or live P&L from the UI",
      "Synthetic account state preview requires synthetic fixtures only",
      "Synthetic account state preview shows deterministic starting cash simulated equity simulated realised P&L simulated unrealised P&L simulated exposure and no real account reads",
      "Denied synthetic account state paths remain blocked",
      "Synthetic account state checklist",
    ],
    sectionIds: ["syntheticAccountState", "deniedPaperBrokerSimulatorBoundaries", "syntheticExecutionAudit"],
    devOnly: true,
  },
  {
    slug: "synthetic-buying-power-preview",
    href: "/synthetic-buying-power-preview",
    phase: "Phase 1756",
    title: "Synthetic Buying Power Preview",
    commandLabel: "Go to Synthetic Buying Power Preview",
    summary: "Previews deterministic synthetic buying power calculations without real buying power, margin, leverage, account capacity, or broker restrictions from the UI.",
    markerPhrases: [
      "Synthetic buying power preview",
      "Synthetic buying power preview does not read real buying power margin leverage account capacity or broker restrictions from the UI",
      "Synthetic buying power preview requires deterministic synthetic calculations only",
      "Synthetic buying power preview shows simulated cash buffer simulated exposure cap simulated per-order cap simulated reserved buying power and denied real broker reads",
      "Denied synthetic buying power paths remain blocked",
      "Synthetic buying power checklist",
    ],
    sectionIds: ["syntheticBuyingPower", "syntheticAccountState", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-position-ledger-preview",
    href: "/synthetic-position-ledger-preview",
    phase: "Phase 1757",
    title: "Synthetic Position Ledger Preview",
    commandLabel: "Go to Synthetic Position Ledger Preview",
    summary: "Previews deterministic synthetic position ledger entries without live positions, holdings, broker fills, or account statements from the UI.",
    markerPhrases: [
      "Synthetic position ledger preview",
      "Synthetic position ledger preview does not read live positions portfolio holdings broker fills or account statements from the UI",
      "Synthetic position ledger preview requires deterministic synthetic ledger entries only",
      "Synthetic position ledger preview shows simulated symbol simulated quantity simulated average price simulated realised P&L simulated open risk and denied live portfolio reads",
      "Denied synthetic position ledger paths remain blocked",
      "Synthetic position ledger checklist",
    ],
    sectionIds: ["syntheticPositionLedger", "syntheticAccountState", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-order-intent-preview",
    href: "/synthetic-order-intent-preview",
    phase: "Phase 1758",
    title: "Synthetic Order Intent Preview",
    commandLabel: "Go to Synthetic Order Intent Preview",
    summary: "Previews review-only synthetic order intent packets without placing trades, submitting orders, calling brokers, or sending executable broker instructions.",
    markerPhrases: [
      "Synthetic order intent preview",
      "Synthetic order intent preview does not place trades submit orders call brokers or send executable broker instructions from the UI",
      "Synthetic order intent preview requires review-only order intent packets",
      "Synthetic order intent preview shows simulated symbol side quantity order type time in force thesis risk note mandate fit and no executable order state",
      "Denied synthetic order intent paths remain blocked",
      "Synthetic order intent checklist",
    ],
    sectionIds: ["syntheticOrderIntent", "syntheticRiskGovernorBridge", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-order-validation-preview",
    href: "/synthetic-order-validation-preview",
    phase: "Phase 1759",
    title: "Synthetic Order Validation Preview",
    commandLabel: "Go to Synthetic Order Validation Preview",
    summary: "Previews deterministic simulator validation without live quotes, real broker constraints, or real execution approval from the UI.",
    markerPhrases: [
      "Synthetic order validation preview",
      "Synthetic order validation preview does not fetch live quotes validate real broker constraints or approve real execution from the UI",
      "Synthetic order validation preview requires deterministic simulator validation only",
      "Synthetic order validation preview shows synthetic mandate validation synthetic risk governor validation synthetic kill switch validation synthetic buying power validation and denied real validation",
      "Denied synthetic order validation paths remain blocked",
      "Synthetic order validation checklist",
    ],
    sectionIds: ["syntheticOrderValidation", "syntheticBuyingPower", "syntheticRiskGovernorBridge", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-order-queue-preview",
    href: "/synthetic-order-queue-preview",
    phase: "Phase 1760",
    title: "Synthetic Order Queue Preview",
    commandLabel: "Go to Synthetic Order Queue Preview",
    summary: "Previews backend-owned simulator queue states without real queue jobs, worker dispatch, broker calls, or order persistence from the UI.",
    markerPhrases: [
      "Synthetic order queue preview",
      "Synthetic order queue preview does not enqueue real jobs dispatch workers submit trades call brokers or persist orders from the UI",
      "Synthetic order queue preview requires backend-owned simulator queue boundary",
      "Synthetic order queue preview shows simulated queued state simulated held state simulated rejected state simulated expired state and denied frontend queue mutation",
      "Denied synthetic order queue paths remain blocked",
      "Synthetic order queue checklist",
    ],
    sectionIds: ["syntheticOrderQueue", "syntheticOrderValidation", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-fill-model-preview",
    href: "/synthetic-fill-model-preview",
    phase: "Phase 1761",
    title: "Synthetic Fill Model Preview",
    commandLabel: "Go to Synthetic Fill Model Preview",
    summary: "Previews deterministic synthetic fill assumptions without paper trade execution, live market data, order routing, or real fills from the UI.",
    markerPhrases: [
      "Synthetic fill model preview",
      "Synthetic fill model preview does not execute paper trades read live market data route orders or create real fills from the UI",
      "Synthetic fill model preview requires deterministic synthetic fill assumptions only",
      "Synthetic fill model preview shows simulated fill price simulated partial fill simulated full fill simulated no-fill simulated timestamp placeholder and denied live execution",
      "Denied synthetic fill model paths remain blocked",
      "Synthetic fill model checklist",
    ],
    sectionIds: ["syntheticFillModel", "syntheticSlippageFee", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-slippage-fee-preview",
    href: "/synthetic-slippage-fee-preview",
    phase: "Phase 1762",
    title: "Synthetic Slippage Fee Preview",
    commandLabel: "Go to Synthetic Slippage Fee Preview",
    summary: "Previews deterministic fee and slippage assumptions without exchange fees, live spreads, broker commissions, or microstructure data from the UI.",
    markerPhrases: [
      "Synthetic slippage fee preview",
      "Synthetic slippage fee preview does not fetch exchange fees live spreads broker commissions or market microstructure data from the UI",
      "Synthetic slippage fee preview requires deterministic fee and slippage assumptions only",
      "Synthetic slippage fee preview shows simulated fee assumption simulated slippage assumption simulated spread assumption simulated liquidity note and denied live market reads",
      "Denied synthetic slippage fee paths remain blocked",
      "Synthetic slippage fee checklist",
    ],
    sectionIds: ["syntheticSlippageFee", "syntheticFillModel", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-rejection-reason-preview",
    href: "/synthetic-rejection-reason-preview",
    phase: "Phase 1763",
    title: "Synthetic Rejection Reason Preview",
    commandLabel: "Go to Synthetic Rejection Reason Preview",
    summary: "Previews deterministic synthetic rejection reasons without broker calls, retries, order mutation, or live execution recovery from the UI.",
    markerPhrases: [
      "Synthetic rejection reason preview",
      "Synthetic rejection reason preview does not call brokers retry orders mutate orders or recover live execution from the UI",
      "Synthetic rejection reason preview requires deterministic synthetic rejection reasons only",
      "Synthetic rejection reason preview shows simulated insufficient buying power simulated risk governor hold simulated kill switch hold simulated stale intent simulated invalid symbol simulated operator review",
      "Denied synthetic rejection reason paths remain blocked",
      "Synthetic rejection reason checklist",
    ],
    sectionIds: ["syntheticRejectionReason", "syntheticOrderValidation", "syntheticRiskGovernorBridge", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-cancel-replace-preview",
    href: "/synthetic-cancel-replace-preview",
    phase: "Phase 1764",
    title: "Synthetic Cancel Replace Preview",
    commandLabel: "Go to Synthetic Cancel Replace Preview",
    summary: "Previews review-only synthetic cancel replace packets without real order cancellation, replacement, broker state mutation, or endpoint calls from the UI.",
    markerPhrases: [
      "Synthetic cancel replace preview",
      "Synthetic cancel replace preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI",
      "Synthetic cancel replace preview requires review-only synthetic cancel replace packets",
      "Synthetic cancel replace preview shows simulated cancel request simulated replace request simulated denied live mutation simulated approval requirement and backend-owned simulator boundary",
      "Denied synthetic cancel replace paths remain blocked",
      "Synthetic cancel replace checklist",
    ],
    sectionIds: ["syntheticCancelReplace", "syntheticOrderQueue", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "synthetic-execution-audit-preview",
    href: "/synthetic-execution-audit-preview",
    phase: "Phase 1765",
    title: "Synthetic Execution Audit Preview",
    commandLabel: "Go to Synthetic Execution Audit Preview",
    summary: "Previews backend-owned synthetic audit capture without frontend persistence of execution evidence, results, audit, approvals, queues, transactions, or broker decisions.",
    markerPhrases: [
      "Synthetic execution audit preview",
      "Synthetic execution audit preview does not persist execution evidence results audit approvals queues transactions or broker decisions from the UI",
      "Synthetic execution audit preview requires backend-owned synthetic audit capture",
      "Synthetic execution audit preview shows simulated intent evidence simulated validation evidence simulated queue evidence simulated fill evidence simulated rejection evidence redaction and audit continuity",
      "Denied synthetic execution audit paths remain blocked",
      "Synthetic execution audit checklist",
    ],
    sectionIds: ["syntheticExecutionAudit", "syntheticOrderIntent", "syntheticOrderValidation", "syntheticOrderQueue", "syntheticFillModel", "syntheticRejectionReason"],
    devOnly: true,
  },
  {
    slug: "synthetic-risk-governor-bridge-preview",
    href: "/synthetic-risk-governor-bridge-preview",
    phase: "Phase 1766",
    title: "Synthetic Risk Governor Bridge Preview",
    commandLabel: "Go to Synthetic Risk Governor Bridge Preview",
    summary: "Previews backend-owned risk governor simulation without overriding decisions, placing trades, approving execution, or mutating capital from the UI.",
    markerPhrases: [
      "Synthetic risk governor bridge preview",
      "Synthetic risk governor bridge preview does not override risk governor decisions place trades approve execution or mutate capital from the UI",
      "Synthetic risk governor bridge preview requires backend-owned risk governor simulation",
      "Synthetic risk governor bridge preview shows synthetic mandate fit max daily loss max drawdown position risk approved symbols approved strategies kill switch state and denied override",
      "Denied synthetic risk governor bridge paths remain blocked",
      "Synthetic risk governor bridge checklist",
    ],
    sectionIds: ["syntheticRiskGovernorBridge", "syntheticOrderValidation", "syntheticRejectionReason", "deniedPaperBrokerSimulatorBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-paper-broker-simulator-summary",
    href: "/cockpit-paper-broker-simulator-summary",
    phase: "Phase 1767",
    title: "Cockpit Paper Broker Simulator Summary",
    commandLabel: "Go to Cockpit Paper Broker Simulator Summary",
    summary: "Summarizes safe paper broker adapter simulator previews as grouped Trading Workspace review content in the normal cockpit.",
    markerPhrases: [
      "Cockpit paper broker simulator summary",
      "Cockpit paper broker simulator summary keeps the cockpit as the normal user surface",
      "Cockpit paper broker simulator summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data provide financial advice issue buy sell instructions automate trading or persist simulator state from the cockpit",
      "Cockpit paper broker simulator summary shows synthetic account state buying power position ledger order intent validation queue fill model slippage fee rejection cancel replace execution audit risk governor bridge and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit paper broker simulator checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-paper-broker-adapter-simulator-candidate",
    href: "/first-paper-broker-adapter-simulator-candidate",
    phase: "Phase 1768",
    title: "First Paper Broker Adapter Simulator Candidate",
    commandLabel: "Go to First Paper Broker Adapter Simulator Candidate",
    summary: "Combines the first paper broker adapter simulator candidate without enabling real broker workflows, live trading, order placement, paper execution, credential storage, account reads, or dispatch from the UI.",
    markerPhrases: [
      "First paper broker adapter simulator candidate",
      "First paper broker adapter simulator candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads or dispatch from the UI",
      "First paper broker adapter simulator candidate requires explicit operator approval",
      "Candidate combines synthetic account state buying power position ledger order intent validation queue fill model slippage fee rejection cancel replace execution audit risk governor bridge cockpit summary and denied simulator paths",
      "Denied first paper broker adapter simulator paths remain blocked",
      "First paper broker adapter simulator checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-paper-broker-adapter-simulator-release-candidate",
    href: "/controlled-paper-broker-adapter-simulator-release-candidate",
    phase: "Phase 1769",
    title: "Controlled Paper Broker Adapter Simulator Release Candidate",
    commandLabel: "Go to Controlled Paper Broker Adapter Simulator Release Candidate",
    summary: "Release candidate prepares CodexForge for backend-owned paper broker adapter simulation without frontend broker execution.",
    markerPhrases: [
      "Controlled paper broker adapter simulator release candidate",
      "Controlled paper broker adapter simulator release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled paper broker adapter simulator release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned paper broker adapter simulation without frontend broker execution",
      "Denied controlled paper broker adapter simulator paths remain blocked",
      "Controlled paper broker adapter simulator release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listPaperBrokerAdapterSimulatorRouteDefinitions(): readonly PaperBrokerAdapterSimulatorRouteDefinition[] {
  return ROUTES;
}

export function getPaperBrokerAdapterSimulatorRouteDefinition(
  slug: PaperBrokerAdapterSimulatorRouteSlug
): PaperBrokerAdapterSimulatorRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildPaperBrokerAdapterSimulatorRouteModel(
  slug: PaperBrokerAdapterSimulatorRouteSlug = "controlled-paper-broker-adapter-simulator-release-candidate"
): PaperBrokerAdapterSimulatorRouteModel {
  const route = getPaperBrokerAdapterSimulatorRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is PaperBrokerAdapterSimulatorSection => Boolean(section));

  return {
    route,
    paperBrokerAdapterSimulator: PAPER_BROKER_ADAPTER_SIMULATOR_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PAPER_BROKER_ADAPTER_SIMULATOR_COCKPIT_MARKERS,
    summary: summarizePaperBrokerAdapterSimulatorRoute(route, sections),
  };
}

export function buildPaperBrokerAdapterSimulatorModel(): PaperBrokerAdapterSimulatorRouteModel {
  return buildPaperBrokerAdapterSimulatorRouteModel("controlled-paper-broker-adapter-simulator-release-candidate");
}

export function summarizePaperBrokerAdapterSimulatorRoute(
  route: PaperBrokerAdapterSimulatorRouteDefinition,
  sections: readonly PaperBrokerAdapterSimulatorSection[]
): string {
  return `${route.title} keeps ${sections.length} paper broker adapter simulator sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from broker connections, broker SDKs, broker API calls, account reads, buying power reads, live position reads, order placement, order dispatch, paper order execution, money movement, live market data calls, trading automation, financial advice, personalised recommendations, buy sell instructions, worker dispatch, persistence, command execution, file mutation, and browser storage writes.`;
}

export function buildPaperBrokerAdapterSimulatorStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
