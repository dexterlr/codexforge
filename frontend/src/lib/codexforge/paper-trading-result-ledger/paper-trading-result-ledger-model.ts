export type PaperTradingResultLedgerRouteSlug =
  | "paper-trading-result-ledger-boundary"
  | "simulated-fill-record-preview"
  | "simulated-rejection-record-preview"
  | "simulated-cancel-record-preview"
  | "simulated-position-update-preview"
  | "simulated-realised-pnl-preview"
  | "simulated-unrealised-pnl-preview"
  | "simulated-equity-curve-preview"
  | "simulated-drawdown-ledger-preview"
  | "simulated-risk-event-ledger-preview"
  | "simulated-audit-packet-preview"
  | "simulated-evidence-continuity-preview"
  | "simulated-export-boundary-preview"
  | "cockpit-paper-trading-result-ledger-summary"
  | "first-paper-trading-result-ledger-candidate"
  | "controlled-paper-trading-result-ledger-release-candidate";

export type PaperTradingResultLedgerKind =
  | "paper-trading-result-ledger-v1"
  | PaperTradingResultLedgerRouteSlug;

export type PaperTradingResultLedgerState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type PaperTradingResultLedgerItem = {
  id: string;
  label: string;
  detail: string;
  state: PaperTradingResultLedgerState;
};

export type PaperTradingResultLedgerSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly PaperTradingResultLedgerItem[];
  state: PaperTradingResultLedgerState;
};

export type PaperTradingResultLedgerSectionId =
  | "simulatedFillRecord"
  | "simulatedRejectionRecord"
  | "simulatedCancelRecord"
  | "simulatedPositionUpdate"
  | "simulatedRealisedPnl"
  | "simulatedUnrealisedPnl"
  | "simulatedEquityCurve"
  | "simulatedDrawdownLedger"
  | "simulatedRiskEventLedger"
  | "simulatedAuditPacket"
  | "simulatedEvidenceContinuity"
  | "simulatedExportBoundary"
  | "deniedPaperTradingResultLedgerBoundaries";

export type PaperTradingResultLedgerModel = {
  paperTradingResultLedgerId: string;
  paperTradingResultLedgerKind: PaperTradingResultLedgerKind;
  simulatedFillRecord: PaperTradingResultLedgerSection;
  simulatedRejectionRecord: PaperTradingResultLedgerSection;
  simulatedCancelRecord: PaperTradingResultLedgerSection;
  simulatedPositionUpdate: PaperTradingResultLedgerSection;
  simulatedRealisedPnl: PaperTradingResultLedgerSection;
  simulatedUnrealisedPnl: PaperTradingResultLedgerSection;
  simulatedEquityCurve: PaperTradingResultLedgerSection;
  simulatedDrawdownLedger: PaperTradingResultLedgerSection;
  simulatedRiskEventLedger: PaperTradingResultLedgerSection;
  simulatedAuditPacket: PaperTradingResultLedgerSection;
  simulatedEvidenceContinuity: PaperTradingResultLedgerSection;
  simulatedExportBoundary: PaperTradingResultLedgerSection;
  deniedPaperTradingResultLedgerBoundaries: PaperTradingResultLedgerSection;
  cockpitSummary: readonly PaperTradingResultLedgerItem[];
  explicitSafetyLimits: readonly string[];
};

export type PaperTradingResultLedgerRouteDefinition = {
  slug: PaperTradingResultLedgerRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly PaperTradingResultLedgerSectionId[];
  devOnly: boolean;
};

export type PaperTradingResultLedgerRouteModel = {
  route: PaperTradingResultLedgerRouteDefinition;
  paperTradingResultLedger: PaperTradingResultLedgerModel;
  sections: readonly PaperTradingResultLedgerSection[];
  diagnosticRoutes: readonly PaperTradingResultLedgerRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PAPER_TRADING_RESULT_LEDGER_COCKPIT_MARKERS = [
  "Paper Trading Result Ledger",
  "Simulated Fill Record",
  "Simulated Rejection Record",
  "Simulated Cancel Record",
  "Simulated Position Update",
  "Simulated Realised P&L",
  "Simulated Unrealised P&L",
  "Simulated Equity Curve",
  "Simulated Drawdown Ledger",
  "Simulated Risk Event Ledger",
  "Simulated Audit Packet",
  "Simulated Evidence Continuity",
  "Simulated Export Boundary",
  "Synthetic data only",
  "Review-only ledger",
  "No real broker connection from the cockpit",
  "No real broker ledger from the cockpit",
  "No real account ledger from the cockpit",
  "No live positions from the cockpit",
  "No live market data calls from the cockpit",
  "No real P&L from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No paper order execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned result ledger remains required",
  "Backend-owned evidence capture remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Paper Trading Result Ledger v1 is deterministic static review content only.",
  "This is not a real broker ledger.",
  "This is not a real portfolio ledger.",
  "This is not live trading.",
  "This is not order placement.",
  "This is not paper order execution from the frontend.",
  "This is not real P&L.",
  "This is not live market data.",
  "This is not account access.",
  "This is not money movement.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated trading.",
  "Synthetic data only.",
  "Review-only ledger.",
  "No real broker connection from the cockpit.",
  "No real broker ledger from the cockpit.",
  "No real account ledger from the cockpit.",
  "No live positions from the cockpit.",
  "No live market data calls from the cockpit.",
  "No real P&L from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No paper order execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned result ledger remains required.",
  "Backend-owned evidence capture remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future paper trading result ledger workflows remain backend-owned, approval-gated, risk-governed, kill-switch enforced, and evidence-backed.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, order placement, order dispatch, account access, position access, money movement, real P&L, or live market data.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, broker ledger read, account ledger read, credential storage, endpoint storage, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, order mutation, money movement, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, export, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned result ledger remains required.",
  "Backend-owned evidence capture remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly PaperTradingResultLedgerItem[] {
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
  state?: PaperTradingResultLedgerState;
}): PaperTradingResultLedgerSection {
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

const SIMULATED_FILL_RECORD = createSection({
  sectionId: "simulatedFillRecord",
  label: "Simulated Fill Record",
  title: "Deterministic Simulated Fill Record",
  humanReadableSummary:
    "Simulated fill record preview shows simulated order id, simulated symbol, simulated side, simulated quantity, simulated fill price, simulated fee, simulated slippage, and no real execution.",
  plannedInputs: ["Simulated order id", "Simulated symbol", "Simulated side", "Simulated quantity", "Simulated fill price", "Simulated fee", "Simulated slippage"],
  plannedOutputs: ["Simulated Fill Record", "Synthetic fill fixture", "Denied real execution"],
  checklistPrefix: "simulated-fill-record",
  checklistSummary:
    "Simulated fill record preview shows simulated order id simulated symbol simulated side simulated quantity simulated fill price simulated fee simulated slippage and no real execution.",
  blocked:
    "Simulated fill record preview does not create real fills execute paper trades route orders call brokers or fetch live market data from the UI.",
  approval: "Simulated fill record preview requires deterministic synthetic fill records only.",
});

const SIMULATED_REJECTION_RECORD = createSection({
  sectionId: "simulatedRejectionRecord",
  label: "Simulated Rejection Record",
  title: "Deterministic Simulated Rejection Record",
  humanReadableSummary:
    "Simulated rejection record preview shows simulated rejection reason, simulated risk hold, simulated buying power hold, simulated kill switch hold, simulated stale intent, and operator review note.",
  plannedInputs: ["Simulated rejection reason", "Simulated risk hold", "Simulated buying power hold", "Simulated kill switch hold", "Simulated stale intent", "Operator review note"],
  plannedOutputs: ["Simulated Rejection Record", "Synthetic rejection fixture", "Denied live order recovery"],
  checklistPrefix: "simulated-rejection-record",
  checklistSummary:
    "Simulated rejection record preview shows simulated rejection reason simulated risk hold simulated buying power hold simulated kill switch hold simulated stale intent and operator review note.",
  blocked:
    "Simulated rejection record preview does not call brokers retry orders mutate orders or recover live execution from the UI.",
  approval: "Simulated rejection record preview requires deterministic synthetic rejection records only.",
});

const SIMULATED_CANCEL_RECORD = createSection({
  sectionId: "simulatedCancelRecord",
  label: "Simulated Cancel Record",
  title: "Deterministic Simulated Cancel Record",
  humanReadableSummary:
    "Simulated cancel record preview shows simulated cancel request, simulated cancelled state, simulated replacement denial, simulated operator review, and backend-owned simulator boundary.",
  plannedInputs: ["Simulated cancel request", "Simulated cancelled state", "Simulated replacement denial", "Simulated operator review", "Backend-owned simulator boundary"],
  plannedOutputs: ["Simulated Cancel Record", "Synthetic cancel fixture", "Denied broker state mutation"],
  checklistPrefix: "simulated-cancel-record",
  checklistSummary:
    "Simulated cancel record preview shows simulated cancel request simulated cancelled state simulated replacement denial simulated operator review and backend-owned simulator boundary.",
  blocked:
    "Simulated cancel record preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI.",
  approval: "Simulated cancel record preview requires deterministic synthetic cancel records only.",
});

const SIMULATED_POSITION_UPDATE = createSection({
  sectionId: "simulatedPositionUpdate",
  label: "Simulated Position Update",
  title: "Deterministic Simulated Position Update",
  humanReadableSummary:
    "Simulated position update preview shows simulated prior quantity, simulated fill delta, simulated new quantity, simulated average price, simulated exposure, and denied live portfolio reads.",
  plannedInputs: ["Simulated prior quantity", "Simulated fill delta", "Simulated new quantity", "Simulated average price", "Simulated exposure"],
  plannedOutputs: ["Simulated Position Update", "Synthetic position fixture", "Denied live portfolio reads"],
  checklistPrefix: "simulated-position-update",
  checklistSummary:
    "Simulated position update preview shows simulated prior quantity simulated fill delta simulated new quantity simulated average price simulated exposure and denied live portfolio reads.",
  blocked:
    "Simulated position update preview does not read live positions update portfolio holdings read broker fills or mutate ledgers from the UI.",
  approval: "Simulated position update preview requires deterministic synthetic position updates only.",
});

const SIMULATED_REALISED_PNL = createSection({
  sectionId: "simulatedRealisedPnl",
  label: "Simulated Realised P&L",
  title: "Deterministic Simulated Realised P&L",
  humanReadableSummary:
    "Simulated realised P&L preview shows simulated entry price, simulated exit price, simulated fees, simulated slippage, simulated realised result, and no guaranteed profit claims.",
  plannedInputs: ["Simulated entry price", "Simulated exit price", "Simulated fees", "Simulated slippage", "Simulated realised result"],
  plannedOutputs: ["Simulated Realised P&L", "Synthetic closed-position example", "No guaranteed profit claims"],
  checklistPrefix: "simulated-realised-pnl",
  checklistSummary:
    "Simulated realised P&L preview shows simulated entry price simulated exit price simulated fees simulated slippage simulated realised result and no guaranteed profit claims.",
  blocked:
    "Simulated realised P&L preview does not calculate real P&L read accounts read fills or issue profit claims from the UI.",
  approval: "Simulated realised P&L preview requires deterministic synthetic closed-position examples only.",
});

const SIMULATED_UNREALISED_PNL = createSection({
  sectionId: "simulatedUnrealisedPnl",
  label: "Simulated Unrealised P&L",
  title: "Deterministic Simulated Unrealised P&L",
  humanReadableSummary:
    "Simulated unrealised P&L preview shows simulated mark price, simulated open quantity, simulated cost basis, simulated unrealised result, simulated exposure, and no live market reads.",
  plannedInputs: ["Simulated mark price", "Simulated open quantity", "Simulated cost basis", "Simulated unrealised result", "Simulated exposure"],
  plannedOutputs: ["Simulated Unrealised P&L", "Synthetic mark assumption", "No live market reads"],
  checklistPrefix: "simulated-unrealised-pnl",
  checklistSummary:
    "Simulated unrealised P&L preview shows simulated mark price simulated open quantity simulated cost basis simulated unrealised result simulated exposure and no live market reads.",
  blocked:
    "Simulated unrealised P&L preview does not fetch live prices calculate real portfolio value or read live broker positions from the UI.",
  approval: "Simulated unrealised P&L preview requires deterministic synthetic mark assumptions only.",
});

const SIMULATED_EQUITY_CURVE = createSection({
  sectionId: "simulatedEquityCurve",
  label: "Simulated Equity Curve",
  title: "Deterministic Simulated Equity Curve",
  humanReadableSummary:
    "Simulated equity curve preview shows simulated equity point, simulated cumulative result, simulated drawdown placeholder, simulated high-water mark, and no performance guarantee.",
  plannedInputs: ["Simulated equity point", "Simulated cumulative result", "Simulated drawdown placeholder", "Simulated high-water mark"],
  plannedOutputs: ["Simulated Equity Curve", "Synthetic equity points", "No performance guarantee"],
  checklistPrefix: "simulated-equity-curve",
  checklistSummary:
    "Simulated equity curve preview shows simulated equity point simulated cumulative result simulated drawdown placeholder simulated high-water mark and no performance guarantee.",
  blocked:
    "Simulated equity curve preview does not read real account equity fetch live prices or guarantee performance from the UI.",
  approval: "Simulated equity curve preview requires deterministic synthetic equity points only.",
});

const SIMULATED_DRAWDOWN_LEDGER = createSection({
  sectionId: "simulatedDrawdownLedger",
  label: "Simulated Drawdown Ledger",
  title: "Deterministic Simulated Drawdown Ledger",
  humanReadableSummary:
    "Simulated drawdown ledger preview shows simulated peak, simulated trough, simulated drawdown percentage, simulated breach note, simulated risk governor hold, and denied live monitoring.",
  plannedInputs: ["Simulated peak", "Simulated trough", "Simulated drawdown percentage", "Simulated breach note", "Simulated risk governor hold"],
  plannedOutputs: ["Simulated Drawdown Ledger", "Synthetic drawdown entry", "Denied live monitoring"],
  checklistPrefix: "simulated-drawdown-ledger",
  checklistSummary:
    "Simulated drawdown ledger preview shows simulated peak simulated trough simulated drawdown percentage simulated breach note simulated risk governor hold and denied live monitoring.",
  blocked:
    "Simulated drawdown ledger preview does not monitor live accounts calculate real drawdown or trigger real kill switches from the UI.",
  approval: "Simulated drawdown ledger preview requires deterministic synthetic drawdown entries only.",
});

const SIMULATED_RISK_EVENT_LEDGER = createSection({
  sectionId: "simulatedRiskEventLedger",
  label: "Simulated Risk Event Ledger",
  title: "Backend-Owned Simulated Risk Event Ledger",
  humanReadableSummary:
    "Simulated risk event ledger preview shows synthetic daily loss breach, synthetic max drawdown breach, synthetic position risk breach, synthetic symbol block, synthetic strategy block, and operator review.",
  plannedInputs: ["Synthetic daily loss breach", "Synthetic max drawdown breach", "Synthetic position risk breach", "Synthetic symbol block", "Synthetic strategy block", "Operator review"],
  plannedOutputs: ["Simulated Risk Event Ledger", "Backend-owned synthetic risk event capture", "Denied risk override"],
  checklistPrefix: "simulated-risk-event-ledger",
  checklistSummary:
    "Simulated risk event ledger preview shows synthetic daily loss breach synthetic max drawdown breach synthetic position risk breach synthetic symbol block synthetic strategy block and operator review.",
  blocked:
    "Simulated risk event ledger preview does not override risk governor decisions place trades approve execution or mutate capital from the UI.",
  approval: "Simulated risk event ledger preview requires backend-owned synthetic risk event capture.",
  state: "backend-owned",
});

const SIMULATED_AUDIT_PACKET = createSection({
  sectionId: "simulatedAuditPacket",
  label: "Simulated Audit Packet",
  title: "Backend-Owned Simulated Audit Packet",
  humanReadableSummary:
    "Simulated audit packet preview shows simulated intent evidence, simulated validation evidence, simulated fill evidence, simulated rejection evidence, simulated P&L evidence redaction, and audit continuity.",
  plannedInputs: ["Simulated intent evidence", "Simulated validation evidence", "Simulated fill evidence", "Simulated rejection evidence", "Simulated P&L evidence redaction", "Audit continuity"],
  plannedOutputs: ["Simulated Audit Packet", "Backend-owned synthetic audit capture", "Denied frontend persistence"],
  checklistPrefix: "simulated-audit-packet",
  checklistSummary:
    "Simulated audit packet preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence redaction and audit continuity.",
  blocked:
    "Simulated audit packet preview does not persist audit approvals queues transactions evidence results or broker decisions from the UI.",
  approval: "Simulated audit packet preview requires backend-owned synthetic audit capture.",
  state: "backend-owned",
});

const SIMULATED_EVIDENCE_CONTINUITY = createSection({
  sectionId: "simulatedEvidenceContinuity",
  label: "Simulated Evidence Continuity",
  title: "Backend-Owned Simulated Evidence Continuity",
  humanReadableSummary:
    "Simulated evidence continuity preview shows simulated evidence chain, simulated source references, simulated redaction, simulated review state, simulated retention note, and denied frontend persistence.",
  plannedInputs: ["Simulated evidence chain", "Simulated source references", "Simulated redaction", "Simulated review state", "Simulated retention note"],
  plannedOutputs: ["Simulated Evidence Continuity", "Backend-owned evidence continuity", "Denied frontend persistence"],
  checklistPrefix: "simulated-evidence-continuity",
  checklistSummary:
    "Simulated evidence continuity preview shows simulated evidence chain simulated source references simulated redaction simulated review state simulated retention note and denied frontend persistence.",
  blocked:
    "Simulated evidence continuity preview does not promote memory persist evidence mutate audit trails or write files from the UI.",
  approval: "Simulated evidence continuity preview requires backend-owned evidence continuity.",
  state: "backend-owned",
});

const SIMULATED_EXPORT_BOUNDARY = createSection({
  sectionId: "simulatedExportBoundary",
  label: "Simulated Export Boundary",
  title: "Backend-Owned Simulated Export Boundary",
  humanReadableSummary:
    "Simulated export boundary preview shows simulated export request, simulated redaction requirement, simulated approval requirement, simulated artifact boundary, and denied frontend file writes.",
  plannedInputs: ["Simulated export request", "Simulated redaction requirement", "Simulated approval requirement", "Simulated artifact boundary"],
  plannedOutputs: ["Simulated Export Boundary", "Backend-owned export boundary", "Denied frontend file writes"],
  checklistPrefix: "simulated-export-boundary",
  checklistSummary:
    "Simulated export boundary preview shows simulated export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes.",
  blocked:
    "Simulated export boundary preview does not download files write files export ledgers send reports or persist artifacts from the UI.",
  approval: "Simulated export boundary preview requires backend-owned export boundary.",
  state: "backend-owned",
});

const DENIED_PAPER_TRADING_RESULT_LEDGER_BOUNDARIES = createSection({
  sectionId: "deniedPaperTradingResultLedgerBoundaries",
  label: "Denied Paper Trading Result Ledger Boundaries",
  title: "Denied Paper Trading Result Ledger Paths",
  humanReadableSummary:
    "Denied paper trading result ledger paths remain blocked for broker connections, broker ledger reads, account ledger reads, live position reads, order placement, order dispatch, paper order execution, money movement, live market data calls, real P&L, file writes, evidence persistence, export, financial advice, personalised recommendations, buy sell instructions, and trading automation.",
  plannedInputs: ["Denied broker connection", "Denied real ledger read", "Denied live market read", "Denied paper execution", "Denied persistence", "Denied export"],
  plannedOutputs: ["Denied paper trading result ledger paths remain blocked", "Frontend execution stays blocked", "Backend-owned ledger remains required"],
  checklistPrefix: "denied-paper-trading-result-ledger",
  checklistSummary:
    "Denied paper trading result ledger paths remain blocked for broker connection real account ledger live market data paper execution frontend persistence export money movement advice recommendations and buy sell instructions.",
  blocked:
    "Paper trading result ledger boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L or provide financial advice from the UI.",
  approval: "Denied paper trading result ledger paths require backend-owned approved implementations before any future use.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "simulatedFillRecord",
  "simulatedRejectionRecord",
  "simulatedCancelRecord",
  "simulatedPositionUpdate",
  "simulatedRealisedPnl",
  "simulatedUnrealisedPnl",
  "simulatedEquityCurve",
  "simulatedDrawdownLedger",
  "simulatedRiskEventLedger",
  "simulatedAuditPacket",
  "simulatedEvidenceContinuity",
  "simulatedExportBoundary",
  "deniedPaperTradingResultLedgerBoundaries",
] as const satisfies readonly PaperTradingResultLedgerSectionId[];

const SECTION_LOOKUP: Record<PaperTradingResultLedgerSectionId, PaperTradingResultLedgerSection> = {
  simulatedFillRecord: SIMULATED_FILL_RECORD,
  simulatedRejectionRecord: SIMULATED_REJECTION_RECORD,
  simulatedCancelRecord: SIMULATED_CANCEL_RECORD,
  simulatedPositionUpdate: SIMULATED_POSITION_UPDATE,
  simulatedRealisedPnl: SIMULATED_REALISED_PNL,
  simulatedUnrealisedPnl: SIMULATED_UNREALISED_PNL,
  simulatedEquityCurve: SIMULATED_EQUITY_CURVE,
  simulatedDrawdownLedger: SIMULATED_DRAWDOWN_LEDGER,
  simulatedRiskEventLedger: SIMULATED_RISK_EVENT_LEDGER,
  simulatedAuditPacket: SIMULATED_AUDIT_PACKET,
  simulatedEvidenceContinuity: SIMULATED_EVIDENCE_CONTINUITY,
  simulatedExportBoundary: SIMULATED_EXPORT_BOUNDARY,
  deniedPaperTradingResultLedgerBoundaries: DENIED_PAPER_TRADING_RESULT_LEDGER_BOUNDARIES,
};

const PAPER_TRADING_RESULT_LEDGER_MODEL: PaperTradingResultLedgerModel = {
  paperTradingResultLedgerId: "paper-trading-result-ledger-v1",
  paperTradingResultLedgerKind: "paper-trading-result-ledger-v1",
  simulatedFillRecord: SIMULATED_FILL_RECORD,
  simulatedRejectionRecord: SIMULATED_REJECTION_RECORD,
  simulatedCancelRecord: SIMULATED_CANCEL_RECORD,
  simulatedPositionUpdate: SIMULATED_POSITION_UPDATE,
  simulatedRealisedPnl: SIMULATED_REALISED_PNL,
  simulatedUnrealisedPnl: SIMULATED_UNREALISED_PNL,
  simulatedEquityCurve: SIMULATED_EQUITY_CURVE,
  simulatedDrawdownLedger: SIMULATED_DRAWDOWN_LEDGER,
  simulatedRiskEventLedger: SIMULATED_RISK_EVENT_LEDGER,
  simulatedAuditPacket: SIMULATED_AUDIT_PACKET,
  simulatedEvidenceContinuity: SIMULATED_EVIDENCE_CONTINUITY,
  simulatedExportBoundary: SIMULATED_EXPORT_BOUNDARY,
  deniedPaperTradingResultLedgerBoundaries: DENIED_PAPER_TRADING_RESULT_LEDGER_BOUNDARIES,
  cockpitSummary: [
    {
      id: "paper-result-ledger-cockpit-review-only",
      label: "Review-only ledger",
      detail: "Cockpit now includes safe paper trading result ledger previews below Paper Broker Adapter Simulator.",
      state: "review-only",
    },
    {
      id: "paper-result-ledger-synthetic-only",
      label: "Synthetic data only",
      detail: "Simulated fills, rejections, cancels, position updates, P&L previews, equity curve, drawdown ledger, risk events, audit packet, evidence continuity, and export boundary stay deterministic.",
      state: "synthetic-only",
    },
    {
      id: "paper-result-ledger-backend-owned",
      label: "Backend-owned ledger required",
      detail: "Backend-owned paper broker adapter, result ledger, and evidence capture remain required before any future execution-capable workflow.",
      state: "backend-owned",
    },
    {
      id: "paper-result-ledger-denied-paths",
      label: "Denied paths blocked",
      detail: "Frontend broker connection, account reads, live position reads, order placement, dispatch, paper execution, ledger persistence, evidence persistence, export/file writes, money movement, live market data calls, real P&L, financial advice, recommendations, and buy sell instructions remain blocked.",
      state: "blocked",
    },
    {
      id: "paper-result-ledger-approval",
      label: "Approval required",
      detail: "Risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
      state: "needs-approval",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly PaperTradingResultLedgerRouteDefinition[] = [
  {
    slug: "paper-trading-result-ledger-boundary",
    href: "/paper-trading-result-ledger-boundary",
    phase: "Phase 1770",
    title: "Paper Trading Result Ledger Boundary",
    commandLabel: "Go to Paper Trading Result Ledger Boundary",
    summary: "Defines a review-only paper trading result ledger boundary for deterministic synthetic result ledger workflows without frontend execution.",
    markerPhrases: [
      "Paper trading result ledger boundary",
      "Paper trading result ledger boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L or provide financial advice from the UI",
      "Paper trading result ledger boundary requires explicit operator approval",
      "Paper trading result ledger boundary prepares deterministic synthetic result ledger workflows without frontend execution",
      "Denied paper trading result ledger paths remain blocked",
      "Paper trading result ledger boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "simulated-fill-record-preview",
    href: "/simulated-fill-record-preview",
    phase: "Phase 1771",
    title: "Simulated Fill Record Preview",
    commandLabel: "Go to Simulated Fill Record Preview",
    summary: "Previews deterministic synthetic fill records without real fills, paper execution, broker routing, or live market data.",
    markerPhrases: [
      "Simulated fill record preview",
      "Simulated fill record preview does not create real fills execute paper trades route orders call brokers or fetch live market data from the UI",
      "Simulated fill record preview requires deterministic synthetic fill records only",
      "Simulated fill record preview shows simulated order id simulated symbol simulated side simulated quantity simulated fill price simulated fee simulated slippage and no real execution",
      "Denied simulated fill record paths remain blocked",
      "Simulated fill record checklist",
    ],
    sectionIds: ["simulatedFillRecord", "simulatedAuditPacket", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-rejection-record-preview",
    href: "/simulated-rejection-record-preview",
    phase: "Phase 1772",
    title: "Simulated Rejection Record Preview",
    commandLabel: "Go to Simulated Rejection Record Preview",
    summary: "Previews deterministic synthetic rejection records without broker calls, order retries, order mutation, or live execution recovery.",
    markerPhrases: [
      "Simulated rejection record preview",
      "Simulated rejection record preview does not call brokers retry orders mutate orders or recover live execution from the UI",
      "Simulated rejection record preview requires deterministic synthetic rejection records only",
      "Simulated rejection record preview shows simulated rejection reason simulated risk hold simulated buying power hold simulated kill switch hold simulated stale intent and operator review note",
      "Denied simulated rejection record paths remain blocked",
      "Simulated rejection record checklist",
    ],
    sectionIds: ["simulatedRejectionRecord", "simulatedRiskEventLedger", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-cancel-record-preview",
    href: "/simulated-cancel-record-preview",
    phase: "Phase 1773",
    title: "Simulated Cancel Record Preview",
    commandLabel: "Go to Simulated Cancel Record Preview",
    summary: "Previews deterministic synthetic cancel records without real order cancellation, replacement, broker state mutation, or endpoint calls.",
    markerPhrases: [
      "Simulated cancel record preview",
      "Simulated cancel record preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI",
      "Simulated cancel record preview requires deterministic synthetic cancel records only",
      "Simulated cancel record preview shows simulated cancel request simulated cancelled state simulated replacement denial simulated operator review and backend-owned simulator boundary",
      "Denied simulated cancel record paths remain blocked",
      "Simulated cancel record checklist",
    ],
    sectionIds: ["simulatedCancelRecord", "simulatedAuditPacket", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-position-update-preview",
    href: "/simulated-position-update-preview",
    phase: "Phase 1774",
    title: "Simulated Position Update Preview",
    commandLabel: "Go to Simulated Position Update Preview",
    summary: "Previews deterministic synthetic position updates without live positions, broker fills, portfolio mutation, or ledger mutation.",
    markerPhrases: [
      "Simulated position update preview",
      "Simulated position update preview does not read live positions update portfolio holdings read broker fills or mutate ledgers from the UI",
      "Simulated position update preview requires deterministic synthetic position updates only",
      "Simulated position update preview shows simulated prior quantity simulated fill delta simulated new quantity simulated average price simulated exposure and denied live portfolio reads",
      "Denied simulated position update paths remain blocked",
      "Simulated position update checklist",
    ],
    sectionIds: ["simulatedPositionUpdate", "simulatedFillRecord", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-realised-pnl-preview",
    href: "/simulated-realised-pnl-preview",
    phase: "Phase 1775",
    title: "Simulated Realised P&L Preview",
    commandLabel: "Go to Simulated Realised P&L Preview",
    summary: "Previews deterministic synthetic closed-position examples without real P&L calculation, account reads, fill reads, or profit claims.",
    markerPhrases: [
      "Simulated realised P&L preview",
      "Simulated realised P&L preview does not calculate real P&L read accounts read fills or issue profit claims from the UI",
      "Simulated realised P&L preview requires deterministic synthetic closed-position examples only",
      "Simulated realised P&L preview shows simulated entry price simulated exit price simulated fees simulated slippage simulated realised result and no guaranteed profit claims",
      "Denied simulated realised P&L paths remain blocked",
      "Simulated realised P&L checklist",
    ],
    sectionIds: ["simulatedRealisedPnl", "simulatedFillRecord", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-unrealised-pnl-preview",
    href: "/simulated-unrealised-pnl-preview",
    phase: "Phase 1776",
    title: "Simulated Unrealised P&L Preview",
    commandLabel: "Go to Simulated Unrealised P&L Preview",
    summary: "Previews deterministic synthetic mark assumptions without live prices, real portfolio value calculation, or live broker positions.",
    markerPhrases: [
      "Simulated unrealised P&L preview",
      "Simulated unrealised P&L preview does not fetch live prices calculate real portfolio value or read live broker positions from the UI",
      "Simulated unrealised P&L preview requires deterministic synthetic mark assumptions only",
      "Simulated unrealised P&L preview shows simulated mark price simulated open quantity simulated cost basis simulated unrealised result simulated exposure and no live market reads",
      "Denied simulated unrealised P&L paths remain blocked",
      "Simulated unrealised P&L checklist",
    ],
    sectionIds: ["simulatedUnrealisedPnl", "simulatedPositionUpdate", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-equity-curve-preview",
    href: "/simulated-equity-curve-preview",
    phase: "Phase 1777",
    title: "Simulated Equity Curve Preview",
    commandLabel: "Go to Simulated Equity Curve Preview",
    summary: "Previews deterministic synthetic equity points without real account equity reads, live prices, or performance guarantees.",
    markerPhrases: [
      "Simulated equity curve preview",
      "Simulated equity curve preview does not read real account equity fetch live prices or guarantee performance from the UI",
      "Simulated equity curve preview requires deterministic synthetic equity points only",
      "Simulated equity curve preview shows simulated equity point simulated cumulative result simulated drawdown placeholder simulated high-water mark and no performance guarantee",
      "Denied simulated equity curve paths remain blocked",
      "Simulated equity curve checklist",
    ],
    sectionIds: ["simulatedEquityCurve", "simulatedRealisedPnl", "simulatedUnrealisedPnl", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-drawdown-ledger-preview",
    href: "/simulated-drawdown-ledger-preview",
    phase: "Phase 1778",
    title: "Simulated Drawdown Ledger Preview",
    commandLabel: "Go to Simulated Drawdown Ledger Preview",
    summary: "Previews deterministic synthetic drawdown entries without live account monitoring, real drawdown calculation, or real kill switch triggers.",
    markerPhrases: [
      "Simulated drawdown ledger preview",
      "Simulated drawdown ledger preview does not monitor live accounts calculate real drawdown or trigger real kill switches from the UI",
      "Simulated drawdown ledger preview requires deterministic synthetic drawdown entries only",
      "Simulated drawdown ledger preview shows simulated peak simulated trough simulated drawdown percentage simulated breach note simulated risk governor hold and denied live monitoring",
      "Denied simulated drawdown ledger paths remain blocked",
      "Simulated drawdown ledger checklist",
    ],
    sectionIds: ["simulatedDrawdownLedger", "simulatedEquityCurve", "simulatedRiskEventLedger", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-risk-event-ledger-preview",
    href: "/simulated-risk-event-ledger-preview",
    phase: "Phase 1779",
    title: "Simulated Risk Event Ledger Preview",
    commandLabel: "Go to Simulated Risk Event Ledger Preview",
    summary: "Previews backend-owned synthetic risk event capture without risk override, trade approval, execution approval, or capital mutation.",
    markerPhrases: [
      "Simulated risk event ledger preview",
      "Simulated risk event ledger preview does not override risk governor decisions place trades approve execution or mutate capital from the UI",
      "Simulated risk event ledger preview requires backend-owned synthetic risk event capture",
      "Simulated risk event ledger preview shows synthetic daily loss breach synthetic max drawdown breach synthetic position risk breach synthetic symbol block synthetic strategy block and operator review",
      "Denied simulated risk event ledger paths remain blocked",
      "Simulated risk event ledger checklist",
    ],
    sectionIds: ["simulatedRiskEventLedger", "simulatedDrawdownLedger", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-audit-packet-preview",
    href: "/simulated-audit-packet-preview",
    phase: "Phase 1780",
    title: "Simulated Audit Packet Preview",
    commandLabel: "Go to Simulated Audit Packet Preview",
    summary: "Previews backend-owned synthetic audit capture without frontend persistence of approvals, queues, transactions, evidence, results, or broker decisions.",
    markerPhrases: [
      "Simulated audit packet preview",
      "Simulated audit packet preview does not persist audit approvals queues transactions evidence results or broker decisions from the UI",
      "Simulated audit packet preview requires backend-owned synthetic audit capture",
      "Simulated audit packet preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence redaction and audit continuity",
      "Denied simulated audit packet paths remain blocked",
      "Simulated audit packet checklist",
    ],
    sectionIds: ["simulatedAuditPacket", "simulatedFillRecord", "simulatedRejectionRecord", "simulatedRealisedPnl", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-evidence-continuity-preview",
    href: "/simulated-evidence-continuity-preview",
    phase: "Phase 1781",
    title: "Simulated Evidence Continuity Preview",
    commandLabel: "Go to Simulated Evidence Continuity Preview",
    summary: "Previews backend-owned evidence continuity without memory promotion, evidence persistence, audit trail mutation, or file writes from the UI.",
    markerPhrases: [
      "Simulated evidence continuity preview",
      "Simulated evidence continuity preview does not promote memory persist evidence mutate audit trails or write files from the UI",
      "Simulated evidence continuity preview requires backend-owned evidence continuity",
      "Simulated evidence continuity preview shows simulated evidence chain simulated source references simulated redaction simulated review state simulated retention note and denied frontend persistence",
      "Denied simulated evidence continuity paths remain blocked",
      "Simulated evidence continuity checklist",
    ],
    sectionIds: ["simulatedEvidenceContinuity", "simulatedAuditPacket", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-export-boundary-preview",
    href: "/simulated-export-boundary-preview",
    phase: "Phase 1782",
    title: "Simulated Export Boundary Preview",
    commandLabel: "Go to Simulated Export Boundary Preview",
    summary: "Previews backend-owned export boundaries without file downloads, file writes, ledger exports, reports, or artifact persistence from the UI.",
    markerPhrases: [
      "Simulated export boundary preview",
      "Simulated export boundary preview does not download files write files export ledgers send reports or persist artifacts from the UI",
      "Simulated export boundary preview requires backend-owned export boundary",
      "Simulated export boundary preview shows simulated export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes",
      "Denied simulated export boundary paths remain blocked",
      "Simulated export boundary checklist",
    ],
    sectionIds: ["simulatedExportBoundary", "simulatedEvidenceContinuity", "simulatedAuditPacket", "deniedPaperTradingResultLedgerBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-paper-trading-result-ledger-summary",
    href: "/cockpit-paper-trading-result-ledger-summary",
    phase: "Phase 1783",
    title: "Cockpit Paper Trading Result Ledger Summary",
    commandLabel: "Go to Cockpit Paper Trading Result Ledger Summary",
    summary: "Summarizes safe paper trading result ledger previews as grouped Trading Workspace review content in the normal cockpit.",
    markerPhrases: [
      "Cockpit paper trading result ledger summary",
      "Cockpit paper trading result ledger summary keeps the cockpit as the normal user surface",
      "Cockpit paper trading result ledger summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice issue buy sell instructions automate trading persist evidence or write files from the cockpit",
      "Cockpit paper trading result ledger summary shows simulated fills rejections cancels position updates realised P&L unrealised P&L equity curve drawdown ledger risk events audit packet evidence continuity export boundary and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit paper trading result ledger checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-paper-trading-result-ledger-candidate",
    href: "/first-paper-trading-result-ledger-candidate",
    phase: "Phase 1784",
    title: "First Paper Trading Result Ledger Candidate",
    commandLabel: "Go to First Paper Trading Result Ledger Candidate",
    summary: "Combines the first paper trading result ledger candidate without enabling broker workflows, live trading, order placement, paper execution, credential storage, account reads, ledger persistence, or dispatch from the UI.",
    markerPhrases: [
      "First paper trading result ledger candidate",
      "First paper trading result ledger candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads ledger persistence or dispatch from the UI",
      "First paper trading result ledger candidate requires explicit operator approval",
      "Candidate combines simulated fills rejections cancels position updates realised P&L unrealised P&L equity curve drawdown ledger risk event ledger audit packet evidence continuity export boundary cockpit summary and denied paths",
      "Denied first paper trading result ledger paths remain blocked",
      "First paper trading result ledger checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-paper-trading-result-ledger-release-candidate",
    href: "/controlled-paper-trading-result-ledger-release-candidate",
    phase: "Phase 1785",
    title: "Controlled Paper Trading Result Ledger Release Candidate",
    commandLabel: "Go to Controlled Paper Trading Result Ledger Release Candidate",
    summary: "Release candidate prepares CodexForge for backend-owned paper trading result ledger workflows without frontend broker execution or frontend ledger persistence.",
    markerPhrases: [
      "Controlled paper trading result ledger release candidate",
      "Controlled paper trading result ledger release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled paper trading result ledger release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned paper trading result ledger workflows without frontend broker execution or frontend ledger persistence",
      "Denied controlled paper trading result ledger paths remain blocked",
      "Controlled paper trading result ledger release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listPaperTradingResultLedgerRouteDefinitions(): readonly PaperTradingResultLedgerRouteDefinition[] {
  return ROUTES;
}

export function getPaperTradingResultLedgerRouteDefinition(
  slug: PaperTradingResultLedgerRouteSlug
): PaperTradingResultLedgerRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildPaperTradingResultLedgerRouteModel(
  slug: PaperTradingResultLedgerRouteSlug = "controlled-paper-trading-result-ledger-release-candidate"
): PaperTradingResultLedgerRouteModel {
  const route = getPaperTradingResultLedgerRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is PaperTradingResultLedgerSection => Boolean(section));

  return {
    route,
    paperTradingResultLedger: PAPER_TRADING_RESULT_LEDGER_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PAPER_TRADING_RESULT_LEDGER_COCKPIT_MARKERS,
    summary: summarizePaperTradingResultLedgerRoute(route, sections),
  };
}

export function buildPaperTradingResultLedgerModel(): PaperTradingResultLedgerRouteModel {
  return buildPaperTradingResultLedgerRouteModel("controlled-paper-trading-result-ledger-release-candidate");
}

export function summarizePaperTradingResultLedgerRoute(
  route: PaperTradingResultLedgerRouteDefinition,
  sections: readonly PaperTradingResultLedgerSection[]
): string {
  return `${route.title} keeps ${sections.length} paper trading result ledger sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from broker connections, broker ledger reads, account ledger reads, live position reads, order placement, order dispatch, paper order execution, money movement, live market data calls, real P&L, trading automation, financial advice, personalised recommendations, buy sell instructions, worker dispatch, persistence, command execution, file mutation, export, and browser storage writes.`;
}

export function buildPaperTradingResultLedgerStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
