export type BrokerExecutionBoundaryRouteSlug =
  | "broker-execution-boundary"
  | "broker-adapter-contract-preview"
  | "broker-credential-boundary-preview"
  | "broker-account-read-boundary-preview"
  | "broker-order-preview-boundary"
  | "broker-order-validation-boundary"
  | "broker-order-approval-boundary"
  | "broker-order-dispatch-boundary"
  | "broker-result-boundary-preview"
  | "broker-error-boundary-preview"
  | "broker-kill-switch-integration-preview"
  | "broker-risk-governor-enforcement-preview"
  | "broker-audit-evidence-boundary-preview"
  | "cockpit-broker-boundary-summary"
  | "first-broker-execution-boundary-candidate"
  | "controlled-broker-execution-boundary-release-candidate";

export type BrokerExecutionBoundaryKind = "broker-execution-boundary-v1" | BrokerExecutionBoundaryRouteSlug;

export type BrokerExecutionBoundaryState =
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type BrokerExecutionBoundaryItem = {
  id: string;
  label: string;
  detail: string;
  state: BrokerExecutionBoundaryState;
};

export type BrokerExecutionBoundarySection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly BrokerExecutionBoundaryItem[];
  state: BrokerExecutionBoundaryState;
};

export type BrokerExecutionBoundaryModel = {
  brokerExecutionBoundaryId: string;
  brokerExecutionBoundaryKind: BrokerExecutionBoundaryKind;
  brokerAdapterContract: BrokerExecutionBoundarySection;
  brokerCredentialBoundary: BrokerExecutionBoundarySection;
  brokerAccountReadBoundary: BrokerExecutionBoundarySection;
  brokerOrderPreviewBoundary: BrokerExecutionBoundarySection;
  brokerOrderValidationBoundary: BrokerExecutionBoundarySection;
  brokerOrderApprovalBoundary: BrokerExecutionBoundarySection;
  brokerOrderDispatchBoundary: BrokerExecutionBoundarySection;
  brokerResultBoundary: BrokerExecutionBoundarySection;
  brokerErrorBoundary: BrokerExecutionBoundarySection;
  brokerKillSwitchIntegration: BrokerExecutionBoundarySection;
  brokerRiskGovernorEnforcement: BrokerExecutionBoundarySection;
  brokerAuditEvidenceBoundary: BrokerExecutionBoundarySection;
  deniedBrokerExecutionBoundaries: BrokerExecutionBoundarySection;
  cockpitSummary: readonly BrokerExecutionBoundaryItem[];
  explicitSafetyLimits: readonly string[];
};

export type BrokerExecutionBoundaryRouteDefinition = {
  slug: BrokerExecutionBoundaryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly BrokerExecutionBoundarySectionId[];
  devOnly: boolean;
};

export type BrokerExecutionBoundaryRouteModel = {
  route: BrokerExecutionBoundaryRouteDefinition;
  brokerExecutionBoundary: BrokerExecutionBoundaryModel;
  sections: readonly BrokerExecutionBoundarySection[];
  diagnosticRoutes: readonly BrokerExecutionBoundaryRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const BROKER_EXECUTION_BOUNDARY_COCKPIT_MARKERS = [
  "Broker Execution Boundary",
  "Broker Adapter Contract",
  "Broker Credential Boundary",
  "Broker Account Read Boundary",
  "Broker Order Preview Boundary",
  "Broker Order Validation Boundary",
  "Broker Order Approval Boundary",
  "Broker Order Dispatch Boundary",
  "Broker Result Boundary",
  "Broker Error Boundary",
  "Broker Kill Switch Integration",
  "Broker Risk Governor Enforcement",
  "Broker Audit Evidence Boundary",
  "No real broker connection from the cockpit",
  "No credential storage from the cockpit",
  "No broker account reads from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No live market data calls from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "Backend-owned broker adapter remains required",
  "Backend-owned credential vault remains required",
  "Backend-owned order router remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Broker Execution Boundary v1 is deterministic static review content only.",
  "This is not a real broker connection.",
  "This is not live trading.",
  "This is not order placement.",
  "This is not credential storage.",
  "This is not account access.",
  "This is not portfolio access.",
  "This is not money movement.",
  "This is not live market data.",
  "This is not financial advice.",
  "This is not a personalised investment recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated trading.",
  "This is not an executable signal.",
  "No real broker connection from the cockpit.",
  "No credential storage from the cockpit.",
  "No broker account reads from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No live market data calls from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "Backend-owned broker adapter remains required.",
  "Backend-owned credential vault remains required.",
  "Backend-owned order router remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review cards only.",
  "Future broker-adjacent workflows remain backend-owned, approval-gated, risk-governed, kill-switch enforced, and evidence-backed.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, order placement, order dispatch, account access, credential storage, money movement, or live market data.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker SDK import, broker API call, live connection, credential storage, endpoint storage, account read, balance read, position read, portfolio read, buying power read, margin read, live quote, live market data call, order placement, order dispatch, trade submission, order mutation, money movement, approval persistence, evidence persistence, result persistence, audit persistence, queue creation, transaction creation, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, or browser storage write from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned broker adapter remains required.",
  "Backend-owned credential vault remains required.",
  "Backend-owned order router remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly BrokerExecutionBoundaryItem[] {
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
  state?: BrokerExecutionBoundaryState;
}): BrokerExecutionBoundarySection {
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

const BROKER_ADAPTER_CONTRACT = createSection({
  sectionId: "brokerAdapterContract",
  label: "Broker Adapter Contract",
  title: "Backend-Owned Adapter Contract",
  humanReadableSummary:
    "Broker adapter contract preview shows backend-owned adapter name, supported capabilities, denied capabilities, auth boundary, account boundary, order boundary, result boundary, and audit requirement without importing SDKs or opening live connections from the UI.",
  plannedInputs: ["Backend-owned adapter name", "Supported capabilities", "Denied capabilities", "Auth boundary", "Account boundary", "Order boundary", "Result boundary"],
  plannedOutputs: ["Broker Adapter Contract", "Backend-owned adapter requirement", "Denied frontend connection paths", "Audit requirement"],
  checklistPrefix: "broker-adapter-contract",
  checklistSummary:
    "Broker adapter contract preview shows backend-owned adapter name supported capabilities denied capabilities auth boundary account boundary order boundary result boundary and audit requirement.",
  blocked:
    "Broker adapter contract preview does not import broker SDKs call broker APIs or create live connections from the UI.",
  approval: "Broker adapter contract preview requires explicit operator approval.",
  state: "backend-owned",
});

const BROKER_CREDENTIAL_BOUNDARY = createSection({
  sectionId: "brokerCredentialBoundary",
  label: "Broker Credential Boundary",
  title: "Credential Vault Boundary",
  humanReadableSummary:
    "Broker credential boundary preview shows credential vault requirement, redaction requirement, rotation requirement, operator approval requirement, and no browser storage rule without storing credentials, tokens, API keys, secrets, or endpoints from the UI.",
  plannedInputs: ["Credential vault requirement", "Redaction requirement", "Rotation requirement", "Operator approval requirement", "No browser storage rule"],
  plannedOutputs: ["Broker Credential Boundary", "Backend-owned credential vault", "Redacted credential posture", "Denied browser storage"],
  checklistPrefix: "broker-credential-boundary",
  checklistSummary:
    "Broker credential boundary preview shows credential vault requirement redaction requirement rotation requirement operator approval requirement and no browser storage rule.",
  blocked:
    "Broker credential boundary preview does not store credentials tokens API keys secrets or broker endpoints from the UI.",
  approval: "Broker credential boundary preview requires backend-owned credential vault.",
  state: "backend-owned",
});

const BROKER_ACCOUNT_READ_BOUNDARY = createSection({
  sectionId: "brokerAccountReadBoundary",
  label: "Broker Account Read Boundary",
  title: "Backend-Owned Account Read Boundary",
  humanReadableSummary:
    "Broker account read boundary preview shows account read request shape, allowed fields, denied fields, redaction notes, audit notes, and backend-owned account boundary without reading balances, positions, portfolio P&L, buying power, margin, or broker state from the UI.",
  plannedInputs: ["Account read request shape", "Allowed fields", "Denied fields", "Redaction notes", "Audit notes", "Backend-owned account boundary"],
  plannedOutputs: ["Broker Account Read Boundary", "Denied frontend account reads", "Redaction notes", "Audit notes"],
  checklistPrefix: "broker-account-read-boundary",
  checklistSummary:
    "Broker account read boundary preview shows account read request shape allowed fields denied fields redaction notes audit notes and backend-owned account boundary.",
  blocked:
    "Broker account read boundary preview does not read account balances positions portfolio P&L buying power margin or broker state from the UI.",
  approval: "Broker account read boundary preview requires explicit operator approval.",
  state: "backend-owned",
});

const BROKER_ORDER_PREVIEW_BOUNDARY = createSection({
  sectionId: "brokerOrderPreviewBoundary",
  label: "Broker Order Preview Boundary",
  title: "Non-Executable Order Preview",
  humanReadableSummary:
    "Broker order preview boundary shows proposed order preview symbol, side, quantity, order type, time in force, risk notes, mandate fit, and no executable order state without placing orders, submitting trades, or sending broker instructions from the UI.",
  plannedInputs: ["Symbol placeholder", "Side placeholder", "Quantity placeholder", "Order type", "Time in force", "Risk notes", "Mandate fit"],
  plannedOutputs: ["Broker Order Preview Boundary", "No executable order state", "Risk notes", "Mandate fit"],
  checklistPrefix: "broker-order-preview",
  checklistSummary:
    "Broker order preview boundary shows proposed order preview symbol side quantity order type time in force risk notes mandate fit and no executable order state.",
  blocked:
    "Broker order preview boundary does not place orders submit trades or send broker instructions from the UI.",
  approval: "Broker order preview boundary requires explicit operator approval.",
});

const BROKER_ORDER_VALIDATION_BOUNDARY = createSection({
  sectionId: "brokerOrderValidationBoundary",
  label: "Broker Order Validation Boundary",
  title: "Backend-Owned Validation Boundary",
  humanReadableSummary:
    "Broker order validation boundary shows mandate validation, risk governor validation, kill switch validation, position risk validation, capital validation, evidence validation, and backend-owned validation boundary without validating live broker constraints or fetching live quotes from the UI.",
  plannedInputs: ["Mandate validation", "Risk governor validation", "Kill switch validation", "Position risk validation", "Capital validation", "Evidence validation"],
  plannedOutputs: ["Broker Order Validation Boundary", "Backend-owned validation boundary", "Denied live quote fetch", "Denied live broker constraints"],
  checklistPrefix: "broker-order-validation",
  checklistSummary:
    "Broker order validation boundary shows mandate validation risk governor validation kill switch validation position risk validation capital validation evidence validation and backend-owned validation boundary.",
  blocked:
    "Broker order validation boundary does not validate live broker constraints or fetch live quotes from the UI.",
  approval: "Broker order validation boundary requires explicit operator approval.",
  state: "backend-owned",
});

const BROKER_ORDER_APPROVAL_BOUNDARY = createSection({
  sectionId: "brokerOrderApprovalBoundary",
  label: "Broker Order Approval Boundary",
  title: "Backend-Owned Approval Boundary",
  humanReadableSummary:
    "Broker order approval boundary shows operator approval packet, expiry, replay protection, approver identity placeholder, audit requirement, evidence requirement, and backend-owned approval boundary without persisting release locks, submitting trades, or approving broker dispatch from the UI.",
  plannedInputs: ["Operator approval packet", "Expiry", "Replay protection", "Approver identity placeholder", "Audit requirement", "Evidence requirement"],
  plannedOutputs: ["Broker Order Approval Boundary", "Backend-owned approval boundary", "No persisted approval release locks", "Evidence requirement"],
  checklistPrefix: "broker-order-approval",
  checklistSummary:
    "Broker order approval boundary shows operator approval packet expiry replay protection approver identity placeholder audit requirement evidence requirement and backend-owned approval boundary.",
  blocked:
    "Broker order approval boundary does not persist approval release locks submit trades or approve broker dispatch from the UI.",
  approval: "Broker order approval boundary requires explicit operator approval.",
  state: "needs-approval",
});

const BROKER_ORDER_DISPATCH_BOUNDARY = createSection({
  sectionId: "brokerOrderDispatchBoundary",
  label: "Broker Order Dispatch Boundary",
  title: "Backend-Owned Order Router Boundary",
  humanReadableSummary:
    "Broker order dispatch boundary shows dispatch preconditions, approved order packet, broker adapter boundary, risk governor approval, kill switch clear state, and denied frontend dispatch without dispatching orders, calling brokers, placing trades, starting workers, or sending execution jobs from the UI.",
  plannedInputs: ["Dispatch preconditions", "Approved order packet", "Broker adapter boundary", "Risk governor approval", "Kill switch clear state", "Denied frontend dispatch"],
  plannedOutputs: ["Broker Order Dispatch Boundary", "Backend-owned order router", "Denied frontend dispatch", "Execution job remains backend-owned"],
  checklistPrefix: "broker-order-dispatch",
  checklistSummary:
    "Broker order dispatch boundary shows dispatch preconditions approved order packet broker adapter boundary risk governor approval kill switch clear state and denied frontend dispatch.",
  blocked:
    "Broker order dispatch boundary does not dispatch orders call brokers place trades start workers or send execution jobs from the UI.",
  approval: "Broker order dispatch boundary requires backend-owned order router.",
  state: "backend-owned",
});

const BROKER_RESULT_BOUNDARY = createSection({
  sectionId: "brokerResultBoundary",
  label: "Broker Result Boundary",
  title: "Backend-Owned Result Capture",
  humanReadableSummary:
    "Broker result boundary preview shows fill result shape, rejected result shape, partial fill state, cancelled state, audit capture, ledger boundary, and evidence map without reading broker fills, persisting results, or updating ledgers from the UI.",
  plannedInputs: ["Fill result shape", "Rejected result shape", "Partial fill state", "Cancelled state", "Audit capture", "Ledger boundary", "Evidence map"],
  plannedOutputs: ["Broker Result Boundary", "Backend-owned result capture", "Denied frontend ledger update", "Evidence map"],
  checklistPrefix: "broker-result-boundary",
  checklistSummary:
    "Broker result boundary preview shows fill result shape rejected result shape partial fill state cancelled state audit capture ledger boundary and evidence map.",
  blocked:
    "Broker result boundary preview does not read broker fills persist results or update ledgers from the UI.",
  approval: "Broker result boundary preview requires backend-owned result capture.",
  state: "backend-owned",
});

const BROKER_ERROR_BOUNDARY = createSection({
  sectionId: "brokerErrorBoundary",
  label: "Broker Error Boundary",
  title: "Backend-Owned Recovery Boundary",
  humanReadableSummary:
    "Broker error boundary preview shows broker timeout, broker rejection, auth failure, risk rejection, kill switch rejection, network failure, retry hold, and operator review requirement without retrying broker calls, recovering orders, or mutating live orders from the UI.",
  plannedInputs: ["Broker timeout", "Broker rejection", "Auth failure", "Risk rejection", "Kill switch rejection", "Network failure", "Retry hold", "Operator review requirement"],
  plannedOutputs: ["Broker Error Boundary", "Backend-owned recovery", "Retry hold", "Operator review requirement"],
  checklistPrefix: "broker-error-boundary",
  checklistSummary:
    "Broker error boundary preview shows broker timeout broker rejection auth failure risk rejection kill switch rejection network failure retry hold and operator review requirement.",
  blocked:
    "Broker error boundary preview does not retry broker calls recover orders or mutate live orders from the UI.",
  approval: "Broker error boundary preview requires backend-owned recovery.",
  state: "backend-owned",
});

const BROKER_KILL_SWITCH_INTEGRATION = createSection({
  sectionId: "brokerKillSwitchIntegration",
  label: "Broker Kill Switch Integration",
  title: "Backend-Owned Kill Switch Enforcement",
  humanReadableSummary:
    "Broker kill switch integration preview shows kill switch state, daily loss breach, drawdown breach, manual stop, signal invalidation, broker error, order hold, and frontend denied control without controlling broker accounts, stopping live trades, or cancelling orders from the UI.",
  plannedInputs: ["Kill switch state", "Daily loss breach", "Drawdown breach", "Manual stop", "Signal invalidation", "Broker error", "Order hold", "Frontend denied control"],
  plannedOutputs: ["Broker Kill Switch Integration", "Backend-owned kill switch enforcement", "Order hold", "Frontend denied control"],
  checklistPrefix: "broker-kill-switch-integration",
  checklistSummary:
    "Broker kill switch integration preview shows kill switch state daily loss breach drawdown breach manual stop signal invalidation broker error order hold and frontend denied control.",
  blocked:
    "Broker kill switch integration preview does not control broker accounts stop live trades or cancel orders from the UI.",
  approval: "Broker kill switch integration preview requires backend-owned kill switch enforcement.",
  state: "backend-owned",
});

const BROKER_RISK_GOVERNOR_ENFORCEMENT = createSection({
  sectionId: "brokerRiskGovernorEnforcement",
  label: "Broker Risk Governor Enforcement",
  title: "Backend-Owned Risk Governor Enforcement",
  humanReadableSummary:
    "Broker risk governor enforcement preview shows mandate fit, max daily loss, max drawdown, position risk, approved symbols, approved strategies, evidence requirement, and enforcement boundary without overriding risk governor decisions or placing trades from the UI.",
  plannedInputs: ["Mandate fit", "Max daily loss", "Max drawdown", "Position risk", "Approved symbols", "Approved strategies", "Evidence requirement"],
  plannedOutputs: ["Broker Risk Governor Enforcement", "Backend-owned risk governor enforcement", "Enforcement boundary", "Denied override path"],
  checklistPrefix: "broker-risk-governor-enforcement",
  checklistSummary:
    "Broker risk governor enforcement preview shows mandate fit max daily loss max drawdown position risk approved symbols approved strategies evidence requirement and enforcement boundary.",
  blocked:
    "Broker risk governor enforcement preview does not override risk governor decisions or place trades from the UI.",
  approval: "Broker risk governor enforcement preview requires backend-owned risk governor enforcement.",
  state: "backend-owned",
});

const BROKER_AUDIT_EVIDENCE_BOUNDARY = createSection({
  sectionId: "brokerAuditEvidenceBoundary",
  label: "Broker Audit Evidence Boundary",
  title: "Backend-Owned Audit Evidence Capture",
  humanReadableSummary:
    "Broker audit evidence boundary preview shows approval evidence, order preview evidence, validation evidence, dispatch evidence, result evidence, error evidence, redaction, and audit continuity without persisting evidence, results, audit, approvals, or broker decisions from the UI.",
  plannedInputs: ["Approval evidence", "Order preview evidence", "Validation evidence", "Dispatch evidence", "Result evidence", "Error evidence", "Redaction", "Audit continuity"],
  plannedOutputs: ["Broker Audit Evidence Boundary", "Backend-owned capture", "Audit continuity", "Redaction"],
  checklistPrefix: "broker-audit-evidence-boundary",
  checklistSummary:
    "Broker audit evidence boundary preview shows approval evidence order preview evidence validation evidence dispatch evidence result evidence error evidence redaction and audit continuity.",
  blocked:
    "Broker audit evidence boundary preview does not persist evidence results audit approvals or broker decisions from the UI.",
  approval: "Broker audit evidence boundary preview requires backend-owned capture.",
  state: "backend-owned",
});

const DENIED_BROKER_EXECUTION_BOUNDARIES = createSection({
  sectionId: "deniedBrokerExecutionBoundaries",
  label: "Denied Broker Execution Boundaries",
  title: "Denied Frontend Broker Execution Paths",
  humanReadableSummary:
    "Denied broker execution boundaries keep broker connections, credential storage, account reads, order placement, order dispatch, money movement, live market data calls, trading automation, advice, personalised recommendations, buy sell instructions, worker dispatch, persistence, command execution, and browser storage blocked from the cockpit.",
  plannedInputs: ["Frontend safety limits", "Denied broker paths", "Backend-owned prerequisites", "Operator approval requirement"],
  plannedOutputs: ["Denied broker execution boundaries", "Blocked frontend broker workflows", "Backend-owned workflow requirement", "Explicit operator approval requirement"],
  checklistPrefix: "denied-broker-execution-boundaries",
  checklistSummary: "Denied broker execution paths remain blocked.",
  blocked: "Denied broker execution paths remain blocked.",
  approval: "Explicit operator approval remains required before any future broker-adjacent workflow.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "brokerAdapterContract",
  "brokerCredentialBoundary",
  "brokerAccountReadBoundary",
  "brokerOrderPreviewBoundary",
  "brokerOrderValidationBoundary",
  "brokerOrderApprovalBoundary",
  "brokerOrderDispatchBoundary",
  "brokerResultBoundary",
  "brokerErrorBoundary",
  "brokerKillSwitchIntegration",
  "brokerRiskGovernorEnforcement",
  "brokerAuditEvidenceBoundary",
  "deniedBrokerExecutionBoundaries",
] as const;

type BrokerExecutionBoundarySectionId = (typeof ALL_SECTION_IDS)[number];

const SECTION_LOOKUP: Record<BrokerExecutionBoundarySectionId, BrokerExecutionBoundarySection> = {
  brokerAdapterContract: BROKER_ADAPTER_CONTRACT,
  brokerCredentialBoundary: BROKER_CREDENTIAL_BOUNDARY,
  brokerAccountReadBoundary: BROKER_ACCOUNT_READ_BOUNDARY,
  brokerOrderPreviewBoundary: BROKER_ORDER_PREVIEW_BOUNDARY,
  brokerOrderValidationBoundary: BROKER_ORDER_VALIDATION_BOUNDARY,
  brokerOrderApprovalBoundary: BROKER_ORDER_APPROVAL_BOUNDARY,
  brokerOrderDispatchBoundary: BROKER_ORDER_DISPATCH_BOUNDARY,
  brokerResultBoundary: BROKER_RESULT_BOUNDARY,
  brokerErrorBoundary: BROKER_ERROR_BOUNDARY,
  brokerKillSwitchIntegration: BROKER_KILL_SWITCH_INTEGRATION,
  brokerRiskGovernorEnforcement: BROKER_RISK_GOVERNOR_ENFORCEMENT,
  brokerAuditEvidenceBoundary: BROKER_AUDIT_EVIDENCE_BOUNDARY,
  deniedBrokerExecutionBoundaries: DENIED_BROKER_EXECUTION_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly BrokerExecutionBoundaryItem[] = [
  {
    id: "checkpoint-through-1753",
    label: "Current checkpoint",
    detail: "Status summary: through phase 1753 after Broker Execution Boundary v1.",
    state: "review-only",
  },
  {
    id: "normal-user-cockpit",
    label: "Normal user cockpit",
    detail: "Cockpit now includes safe broker execution boundary previews as grouped Trading Workspace review content.",
    state: "review-only",
  },
  {
    id: "backend-owned-prerequisites",
    label: "Backend-owned prerequisites",
    detail: "Backend-owned broker adapter, credential vault, order router, risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
    state: "backend-owned",
  },
  {
    id: "frontend-broker-blocked",
    label: "Frontend broker execution blocked",
    detail: "Frontend broker connection, credential storage, account reads, order placement, order dispatch, money movement, live market data calls, financial advice, recommendations, buy sell instructions, and automation remain blocked.",
    state: "blocked",
  },
] as const;

export const BROKER_EXECUTION_BOUNDARY_MODEL: BrokerExecutionBoundaryModel = {
  brokerExecutionBoundaryId: "broker-execution-boundary-v1",
  brokerExecutionBoundaryKind: "broker-execution-boundary-v1",
  brokerAdapterContract: BROKER_ADAPTER_CONTRACT,
  brokerCredentialBoundary: BROKER_CREDENTIAL_BOUNDARY,
  brokerAccountReadBoundary: BROKER_ACCOUNT_READ_BOUNDARY,
  brokerOrderPreviewBoundary: BROKER_ORDER_PREVIEW_BOUNDARY,
  brokerOrderValidationBoundary: BROKER_ORDER_VALIDATION_BOUNDARY,
  brokerOrderApprovalBoundary: BROKER_ORDER_APPROVAL_BOUNDARY,
  brokerOrderDispatchBoundary: BROKER_ORDER_DISPATCH_BOUNDARY,
  brokerResultBoundary: BROKER_RESULT_BOUNDARY,
  brokerErrorBoundary: BROKER_ERROR_BOUNDARY,
  brokerKillSwitchIntegration: BROKER_KILL_SWITCH_INTEGRATION,
  brokerRiskGovernorEnforcement: BROKER_RISK_GOVERNOR_ENFORCEMENT,
  brokerAuditEvidenceBoundary: BROKER_AUDIT_EVIDENCE_BOUNDARY,
  deniedBrokerExecutionBoundaries: DENIED_BROKER_EXECUTION_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly BrokerExecutionBoundaryRouteDefinition[] = [
  {
    slug: "broker-execution-boundary",
    href: "/broker-execution-boundary",
    phase: "Phase 1738",
    title: "Broker Execution Boundary",
    commandLabel: "Go to Broker Execution Boundary",
    summary: "Defines a review-only broker execution boundary that prepares backend-owned broker adapter workflows without frontend broker execution.",
    markerPhrases: [
      "Broker execution boundary",
      "Broker execution boundary does not connect brokers store credentials read accounts place orders dispatch orders move money or trade from the UI",
      "Broker execution boundary requires explicit operator approval before any future broker workflow",
      "Broker execution boundary prepares backend-owned broker adapter workflows without frontend execution",
      "Denied broker execution paths remain blocked",
      "Broker execution boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "broker-adapter-contract-preview",
    href: "/broker-adapter-contract-preview",
    phase: "Phase 1739",
    title: "Broker Adapter Contract Preview",
    commandLabel: "Go to Broker Adapter Contract Preview",
    summary: "Previews the backend-owned broker adapter contract without SDK imports, broker API calls, or live connections from the UI.",
    markerPhrases: [
      "Broker adapter contract preview",
      "Broker adapter contract preview does not import broker SDKs call broker APIs or create live connections from the UI",
      "Broker adapter contract preview requires explicit operator approval",
      "Broker adapter contract preview shows backend-owned adapter name supported capabilities denied capabilities auth boundary account boundary order boundary result boundary and audit requirement",
      "Denied broker adapter contract paths remain blocked",
      "Broker adapter contract checklist",
    ],
    sectionIds: ["brokerAdapterContract", "deniedBrokerExecutionBoundaries", "brokerAuditEvidenceBoundary"],
    devOnly: true,
  },
  {
    slug: "broker-credential-boundary-preview",
    href: "/broker-credential-boundary-preview",
    phase: "Phase 1740",
    title: "Broker Credential Boundary Preview",
    commandLabel: "Go to Broker Credential Boundary Preview",
    summary: "Previews the credential vault boundary without storing credentials, tokens, API keys, secrets, or endpoints from the UI.",
    markerPhrases: [
      "Broker credential boundary preview",
      "Broker credential boundary preview does not store credentials tokens API keys secrets or broker endpoints from the UI",
      "Broker credential boundary preview requires backend-owned credential vault",
      "Broker credential boundary preview shows credential vault requirement redaction requirement rotation requirement operator approval requirement and no browser storage rule",
      "Denied broker credential paths remain blocked",
      "Broker credential boundary checklist",
    ],
    sectionIds: ["brokerCredentialBoundary", "deniedBrokerExecutionBoundaries", "brokerAuditEvidenceBoundary"],
    devOnly: true,
  },
  {
    slug: "broker-account-read-boundary-preview",
    href: "/broker-account-read-boundary-preview",
    phase: "Phase 1741",
    title: "Broker Account Read Boundary Preview",
    commandLabel: "Go to Broker Account Read Boundary Preview",
    summary: "Previews backend-owned account read request boundaries without reading account balances, positions, portfolio P&L, buying power, margin, or broker state from the UI.",
    markerPhrases: [
      "Broker account read boundary preview",
      "Broker account read boundary preview does not read account balances positions portfolio P&L buying power margin or broker state from the UI",
      "Broker account read boundary preview requires explicit operator approval",
      "Broker account read boundary preview shows account read request shape allowed fields denied fields redaction notes audit notes and backend-owned account boundary",
      "Denied broker account read paths remain blocked",
      "Broker account read boundary checklist",
    ],
    sectionIds: ["brokerAccountReadBoundary", "deniedBrokerExecutionBoundaries", "brokerAuditEvidenceBoundary"],
    devOnly: true,
  },
  {
    slug: "broker-order-preview-boundary",
    href: "/broker-order-preview-boundary",
    phase: "Phase 1742",
    title: "Broker Order Preview Boundary",
    commandLabel: "Go to Broker Order Preview Boundary",
    summary: "Shows a non-executable order preview boundary without order placement, trade submission, or broker instructions from the UI.",
    markerPhrases: [
      "Broker order preview boundary",
      "Broker order preview boundary does not place orders submit trades or send broker instructions from the UI",
      "Broker order preview boundary requires explicit operator approval",
      "Broker order preview boundary shows proposed order preview symbol side quantity order type time in force risk notes mandate fit and no executable order state",
      "Denied broker order preview paths remain blocked",
      "Broker order preview checklist",
    ],
    sectionIds: ["brokerOrderPreviewBoundary", "brokerRiskGovernorEnforcement", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-order-validation-boundary",
    href: "/broker-order-validation-boundary",
    phase: "Phase 1743",
    title: "Broker Order Validation Boundary",
    commandLabel: "Go to Broker Order Validation Boundary",
    summary: "Shows backend-owned order validation requirements without live broker constraint validation or live quote fetching from the UI.",
    markerPhrases: [
      "Broker order validation boundary",
      "Broker order validation boundary does not validate live broker constraints or fetch live quotes from the UI",
      "Broker order validation boundary requires explicit operator approval",
      "Broker order validation boundary shows mandate validation risk governor validation kill switch validation position risk validation capital validation evidence validation and backend-owned validation boundary",
      "Denied broker order validation paths remain blocked",
      "Broker order validation checklist",
    ],
    sectionIds: ["brokerOrderValidationBoundary", "brokerRiskGovernorEnforcement", "brokerKillSwitchIntegration", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-order-approval-boundary",
    href: "/broker-order-approval-boundary",
    phase: "Phase 1744",
    title: "Broker Order Approval Boundary",
    commandLabel: "Go to Broker Order Approval Boundary",
    summary: "Shows backend-owned order approval packet requirements without persisting approvals, release locks, trades, or dispatch approvals from the UI.",
    markerPhrases: [
      "Broker order approval boundary",
      "Broker order approval boundary does not persist approval release locks submit trades or approve broker dispatch from the UI",
      "Broker order approval boundary requires explicit operator approval",
      "Broker order approval boundary shows operator approval packet expiry replay protection approver identity placeholder audit requirement evidence requirement and backend-owned approval boundary",
      "Denied broker order approval paths remain blocked",
      "Broker order approval checklist",
    ],
    sectionIds: ["brokerOrderApprovalBoundary", "brokerAuditEvidenceBoundary", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-order-dispatch-boundary",
    href: "/broker-order-dispatch-boundary",
    phase: "Phase 1745",
    title: "Broker Order Dispatch Boundary",
    commandLabel: "Go to Broker Order Dispatch Boundary",
    summary: "Shows backend-owned order router preconditions without dispatching orders, calling brokers, placing trades, starting workers, or sending execution jobs from the UI.",
    markerPhrases: [
      "Broker order dispatch boundary",
      "Broker order dispatch boundary does not dispatch orders call brokers place trades start workers or send execution jobs from the UI",
      "Broker order dispatch boundary requires backend-owned order router",
      "Broker order dispatch boundary shows dispatch preconditions approved order packet broker adapter boundary risk governor approval kill switch clear state and denied frontend dispatch",
      "Denied broker order dispatch paths remain blocked",
      "Broker order dispatch checklist",
    ],
    sectionIds: ["brokerOrderDispatchBoundary", "brokerAdapterContract", "brokerRiskGovernorEnforcement", "brokerKillSwitchIntegration", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-result-boundary-preview",
    href: "/broker-result-boundary-preview",
    phase: "Phase 1746",
    title: "Broker Result Boundary Preview",
    commandLabel: "Go to Broker Result Boundary Preview",
    summary: "Previews backend-owned result capture without reading fills, persisting results, or updating ledgers from the UI.",
    markerPhrases: [
      "Broker result boundary preview",
      "Broker result boundary preview does not read broker fills persist results or update ledgers from the UI",
      "Broker result boundary preview requires backend-owned result capture",
      "Broker result boundary preview shows fill result shape rejected result shape partial fill state cancelled state audit capture ledger boundary and evidence map",
      "Denied broker result paths remain blocked",
      "Broker result boundary checklist",
    ],
    sectionIds: ["brokerResultBoundary", "brokerAuditEvidenceBoundary", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-error-boundary-preview",
    href: "/broker-error-boundary-preview",
    phase: "Phase 1747",
    title: "Broker Error Boundary Preview",
    commandLabel: "Go to Broker Error Boundary Preview",
    summary: "Previews backend-owned broker recovery boundaries without retries, order recovery, or live order mutation from the UI.",
    markerPhrases: [
      "Broker error boundary preview",
      "Broker error boundary preview does not retry broker calls recover orders or mutate live orders from the UI",
      "Broker error boundary preview requires backend-owned recovery",
      "Broker error boundary preview shows broker timeout broker rejection auth failure risk rejection kill switch rejection network failure retry hold and operator review requirement",
      "Denied broker error paths remain blocked",
      "Broker error boundary checklist",
    ],
    sectionIds: ["brokerErrorBoundary", "brokerKillSwitchIntegration", "brokerAuditEvidenceBoundary", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-kill-switch-integration-preview",
    href: "/broker-kill-switch-integration-preview",
    phase: "Phase 1748",
    title: "Broker Kill Switch Integration Preview",
    commandLabel: "Go to Broker Kill Switch Integration Preview",
    summary: "Previews backend-owned kill switch enforcement without controlling broker accounts, stopping live trades, or cancelling orders from the UI.",
    markerPhrases: [
      "Broker kill switch integration preview",
      "Broker kill switch integration preview does not control broker accounts stop live trades or cancel orders from the UI",
      "Broker kill switch integration preview requires backend-owned kill switch enforcement",
      "Broker kill switch integration preview shows kill switch state daily loss breach drawdown breach manual stop signal invalidation broker error order hold and frontend denied control",
      "Denied broker kill switch integration paths remain blocked",
      "Broker kill switch integration checklist",
    ],
    sectionIds: ["brokerKillSwitchIntegration", "brokerOrderValidationBoundary", "brokerOrderDispatchBoundary", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-risk-governor-enforcement-preview",
    href: "/broker-risk-governor-enforcement-preview",
    phase: "Phase 1749",
    title: "Broker Risk Governor Enforcement Preview",
    commandLabel: "Go to Broker Risk Governor Enforcement Preview",
    summary: "Previews backend-owned risk governor enforcement without overriding risk governor decisions or placing trades from the UI.",
    markerPhrases: [
      "Broker risk governor enforcement preview",
      "Broker risk governor enforcement preview does not override risk governor decisions or place trades from the UI",
      "Broker risk governor enforcement preview requires backend-owned risk governor enforcement",
      "Broker risk governor enforcement preview shows mandate fit max daily loss max drawdown position risk approved symbols approved strategies evidence requirement and enforcement boundary",
      "Denied broker risk governor paths remain blocked",
      "Broker risk governor enforcement checklist",
    ],
    sectionIds: ["brokerRiskGovernorEnforcement", "brokerOrderValidationBoundary", "brokerOrderDispatchBoundary", "deniedBrokerExecutionBoundaries"],
    devOnly: true,
  },
  {
    slug: "broker-audit-evidence-boundary-preview",
    href: "/broker-audit-evidence-boundary-preview",
    phase: "Phase 1750",
    title: "Broker Audit Evidence Boundary Preview",
    commandLabel: "Go to Broker Audit Evidence Boundary Preview",
    summary: "Previews backend-owned audit evidence capture without evidence, result, audit, approval, or broker decision persistence from the UI.",
    markerPhrases: [
      "Broker audit evidence boundary preview",
      "Broker audit evidence boundary preview does not persist evidence results audit approvals or broker decisions from the UI",
      "Broker audit evidence boundary preview requires backend-owned capture",
      "Broker audit evidence boundary preview shows approval evidence order preview evidence validation evidence dispatch evidence result evidence error evidence redaction and audit continuity",
      "Denied broker audit evidence paths remain blocked",
      "Broker audit evidence boundary checklist",
    ],
    sectionIds: ["brokerAuditEvidenceBoundary", "brokerOrderPreviewBoundary", "brokerOrderValidationBoundary", "brokerOrderApprovalBoundary", "brokerOrderDispatchBoundary", "brokerResultBoundary", "brokerErrorBoundary"],
    devOnly: true,
  },
  {
    slug: "cockpit-broker-boundary-summary",
    href: "/cockpit-broker-boundary-summary",
    phase: "Phase 1751",
    title: "Cockpit Broker Boundary Summary",
    commandLabel: "Go to Cockpit Broker Boundary Summary",
    summary: "Summarizes broker execution boundaries as grouped Trading Workspace review content in the normal cockpit.",
    markerPhrases: [
      "Cockpit broker boundary summary",
      "Cockpit broker boundary summary keeps the cockpit as the normal user surface",
      "Cockpit broker boundary summary does not connect brokers store credentials read accounts place orders dispatch orders move money fetch live market data provide financial advice issue buy sell instructions automate trading or persist broker state from the cockpit",
      "Cockpit broker boundary summary shows adapter contract credential boundary account read boundary order preview validation approval dispatch result error kill switch risk governor audit evidence and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit broker boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-broker-execution-boundary-candidate",
    href: "/first-broker-execution-boundary-candidate",
    phase: "Phase 1752",
    title: "First Broker Execution Boundary Candidate",
    commandLabel: "Go to First Broker Execution Boundary Candidate",
    summary: "Combines the first broker execution boundary candidate without enabling broker workflows, live trading, order placement, credential storage, account reads, or dispatch from the UI.",
    markerPhrases: [
      "First broker execution boundary candidate",
      "First broker execution boundary candidate does not enable broker workflows live trading order placement credential storage account reads or dispatch from the UI",
      "First broker execution boundary candidate requires explicit operator approval",
      "Candidate combines broker adapter contract credential boundary account read boundary order preview validation approval dispatch result error kill switch risk governor audit evidence cockpit summary and denied broker paths",
      "Denied first broker execution boundary paths remain blocked",
      "First broker execution boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-broker-execution-boundary-release-candidate",
    href: "/controlled-broker-execution-boundary-release-candidate",
    phase: "Phase 1753",
    title: "Controlled Broker Execution Boundary Release Candidate",
    commandLabel: "Go to Controlled Broker Execution Boundary Release Candidate",
    summary: "Release candidate prepares CodexForge for backend-owned broker adapter workflows without frontend broker execution.",
    markerPhrases: [
      "Controlled broker execution boundary release candidate",
      "Controlled broker execution boundary release candidate does not connect brokers store credentials read accounts place orders dispatch orders move money fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled broker execution boundary release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned broker adapter workflows without frontend broker execution",
      "Denied controlled broker execution boundary paths remain blocked",
      "Controlled broker execution boundary release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listBrokerExecutionBoundaryRouteDefinitions(): readonly BrokerExecutionBoundaryRouteDefinition[] {
  return ROUTES;
}

export function getBrokerExecutionBoundaryRouteDefinition(
  slug: BrokerExecutionBoundaryRouteSlug
): BrokerExecutionBoundaryRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildBrokerExecutionBoundaryRouteModel(
  slug: BrokerExecutionBoundaryRouteSlug = "controlled-broker-execution-boundary-release-candidate"
): BrokerExecutionBoundaryRouteModel {
  const route = getBrokerExecutionBoundaryRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is BrokerExecutionBoundarySection => Boolean(section));

  return {
    route,
    brokerExecutionBoundary: BROKER_EXECUTION_BOUNDARY_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: BROKER_EXECUTION_BOUNDARY_COCKPIT_MARKERS,
    summary: summarizeBrokerExecutionBoundaryRoute(route, sections),
  };
}

export function buildBrokerExecutionBoundaryModel(): BrokerExecutionBoundaryRouteModel {
  return buildBrokerExecutionBoundaryRouteModel("controlled-broker-execution-boundary-release-candidate");
}

export function summarizeBrokerExecutionBoundaryRoute(
  route: BrokerExecutionBoundaryRouteDefinition,
  sections: readonly BrokerExecutionBoundarySection[]
): string {
  return `${route.title} keeps ${sections.length} broker execution boundary sections static, deterministic, review-only, approval-required, backend-owned, and blocked from broker connections, credential storage, account reads, order placement, order dispatch, money movement, live market data calls, trading automation, financial advice, personalised recommendations, buy sell instructions, worker dispatch, persistence, command execution, file mutation, and browser storage writes.`;
}

export function buildBrokerExecutionBoundaryStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
