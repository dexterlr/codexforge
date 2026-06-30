export type PaperTradingReviewDashboardRouteSlug =
  | "paper-trading-review-dashboard-boundary"
  | "simulated-performance-summary-preview"
  | "simulated-trade-review-queue-preview"
  | "simulated-risk-review-queue-preview"
  | "simulated-evidence-review-queue-preview"
  | "simulated-approval-review-queue-preview"
  | "simulated-metric-cards-preview"
  | "simulated-ledger-timeline-preview"
  | "simulated-exception-queue-preview"
  | "simulated-review-note-packet-preview"
  | "simulated-operator-signoff-preview"
  | "simulated-dashboard-export-boundary-preview"
  | "simulated-dashboard-health-status-preview"
  | "cockpit-paper-trading-review-dashboard-summary"
  | "first-paper-trading-review-dashboard-candidate"
  | "controlled-paper-trading-review-dashboard-release-candidate";

export type PaperTradingReviewDashboardKind =
  | "paper-trading-review-dashboard-v1"
  | PaperTradingReviewDashboardRouteSlug;

export type PaperTradingReviewDashboardState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type PaperTradingReviewDashboardItem = {
  id: string;
  label: string;
  detail: string;
  state: PaperTradingReviewDashboardState;
};

export type PaperTradingReviewDashboardSectionId =
  | "simulatedPerformanceSummary"
  | "simulatedTradeReviewQueue"
  | "simulatedRiskReviewQueue"
  | "simulatedEvidenceReviewQueue"
  | "simulatedApprovalReviewQueue"
  | "simulatedMetricCards"
  | "simulatedLedgerTimeline"
  | "simulatedExceptionQueue"
  | "simulatedReviewNotePacket"
  | "simulatedOperatorSignoff"
  | "simulatedDashboardExportBoundary"
  | "simulatedDashboardHealthStatus"
  | "deniedPaperTradingReviewDashboardBoundaries";

export type PaperTradingReviewDashboardSection = {
  sectionId: PaperTradingReviewDashboardSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly PaperTradingReviewDashboardItem[];
  state: PaperTradingReviewDashboardState;
};

export type PaperTradingReviewDashboardModel = {
  paperTradingReviewDashboardId: string;
  paperTradingReviewDashboardKind: PaperTradingReviewDashboardKind;
  simulatedPerformanceSummary: PaperTradingReviewDashboardSection;
  simulatedTradeReviewQueue: PaperTradingReviewDashboardSection;
  simulatedRiskReviewQueue: PaperTradingReviewDashboardSection;
  simulatedEvidenceReviewQueue: PaperTradingReviewDashboardSection;
  simulatedApprovalReviewQueue: PaperTradingReviewDashboardSection;
  simulatedMetricCards: PaperTradingReviewDashboardSection;
  simulatedLedgerTimeline: PaperTradingReviewDashboardSection;
  simulatedExceptionQueue: PaperTradingReviewDashboardSection;
  simulatedReviewNotePacket: PaperTradingReviewDashboardSection;
  simulatedOperatorSignoff: PaperTradingReviewDashboardSection;
  simulatedDashboardExportBoundary: PaperTradingReviewDashboardSection;
  simulatedDashboardHealthStatus: PaperTradingReviewDashboardSection;
  deniedPaperTradingReviewDashboardBoundaries: PaperTradingReviewDashboardSection;
  cockpitSummary: readonly PaperTradingReviewDashboardItem[];
  explicitSafetyLimits: readonly string[];
};

export type PaperTradingReviewDashboardRouteDefinition = {
  slug: PaperTradingReviewDashboardRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly PaperTradingReviewDashboardSectionId[];
  devOnly: boolean;
};

export type PaperTradingReviewDashboardRouteModel = {
  route: PaperTradingReviewDashboardRouteDefinition;
  paperTradingReviewDashboard: PaperTradingReviewDashboardModel;
  sections: readonly PaperTradingReviewDashboardSection[];
  diagnosticRoutes: readonly PaperTradingReviewDashboardRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PAPER_TRADING_REVIEW_DASHBOARD_COCKPIT_MARKERS = [
  "Paper Trading Review Dashboard",
  "Simulated Performance Summary",
  "Simulated Trade Review Queue",
  "Simulated Risk Review Queue",
  "Simulated Evidence Review Queue",
  "Simulated Approval Review Queue",
  "Simulated Metric Cards",
  "Simulated Ledger Timeline",
  "Simulated Exception Queue",
  "Simulated Review Note Packet",
  "Simulated Operator Signoff",
  "Simulated Dashboard Export Boundary",
  "Simulated Dashboard Health Status",
  "Synthetic data only",
  "Review-only dashboard",
  "No real broker connection from the cockpit",
  "No real account dashboard from the cockpit",
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
  "No performance guarantees",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned result ledger remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned review workflow remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Paper Trading Review Dashboard v1 is deterministic static review content only.",
  "This is not a real broker dashboard.",
  "This is not a real account dashboard.",
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
  "This is not a performance guarantee.",
  "Synthetic data only.",
  "Review-only dashboard.",
  "No real broker connection from the cockpit.",
  "No real account dashboard from the cockpit.",
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
  "No performance guarantees.",
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned result ledger remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned review workflow remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future paper trading review dashboard workflows remain backend-owned, approval-gated, risk-governed, kill-switch enforced, and evidence-backed.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, order placement, order dispatch, account access, position access, money movement, real P&L, live market data, dashboard persistence, evidence persistence, or export.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, credential storage, endpoint storage, account dashboard read, account read, buying power read, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, dashboard persistence, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, export, download, report write, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned result ledger remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned review workflow remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly PaperTradingReviewDashboardItem[] {
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
  sectionId: PaperTradingReviewDashboardSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: PaperTradingReviewDashboardState;
}): PaperTradingReviewDashboardSection {
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

const SIMULATED_PERFORMANCE_SUMMARY = createSection({
  sectionId: "simulatedPerformanceSummary",
  label: "Simulated Performance Summary",
  title: "Deterministic Simulated Performance Summary",
  humanReadableSummary:
    "Simulated performance summary preview shows simulated net result, simulated win rate, simulated average result, simulated drawdown placeholder, simulated exposure, and no performance guarantee.",
  plannedInputs: ["Synthetic result fixture", "Synthetic win-rate fixture", "Synthetic drawdown placeholder", "Synthetic exposure placeholder"],
  plannedOutputs: ["Simulated Performance Summary", "Simulated net result", "Simulated win rate", "No performance guarantee"],
  checklistPrefix: "simulated-performance-summary",
  checklistSummary:
    "Simulated performance summary preview shows simulated net result simulated win rate simulated average result simulated drawdown placeholder simulated exposure and no performance guarantee.",
  blocked:
    "Simulated performance summary preview does not calculate real P&L read real accounts fetch live market data or guarantee performance from the UI.",
  approval: "Simulated performance summary preview requires deterministic synthetic performance fixtures only.",
});

const SIMULATED_TRADE_REVIEW_QUEUE = createSection({
  sectionId: "simulatedTradeReviewQueue",
  label: "Simulated Trade Review Queue",
  title: "Deterministic Simulated Trade Review Queue",
  humanReadableSummary:
    "Simulated trade review queue preview shows simulated fill review, simulated rejection review, simulated cancel review, simulated position update review, and operator review note.",
  plannedInputs: ["Synthetic fill review", "Synthetic rejection review", "Synthetic cancel review", "Synthetic position update review"],
  plannedOutputs: ["Simulated Trade Review Queue", "Operator review note", "Denied order execution"],
  checklistPrefix: "simulated-trade-review-queue",
  checklistSummary:
    "Simulated trade review queue preview shows simulated fill review simulated rejection review simulated cancel review simulated position update review and operator review note.",
  blocked:
    "Simulated trade review queue preview does not execute trades route orders mutate ledgers or persist review state from the UI.",
  approval: "Simulated trade review queue preview requires deterministic synthetic trade review rows only.",
});

const SIMULATED_RISK_REVIEW_QUEUE = createSection({
  sectionId: "simulatedRiskReviewQueue",
  label: "Simulated Risk Review Queue",
  title: "Deterministic Simulated Risk Review Queue",
  humanReadableSummary:
    "Simulated risk review queue preview shows simulated daily loss breach, simulated drawdown breach, simulated position risk breach, simulated symbol block, simulated strategy block, and kill switch note.",
  plannedInputs: ["Synthetic daily loss breach", "Synthetic drawdown breach", "Synthetic position risk breach", "Synthetic symbol block", "Synthetic strategy block"],
  plannedOutputs: ["Simulated Risk Review Queue", "Kill switch note", "Denied risk override"],
  checklistPrefix: "simulated-risk-review-queue",
  checklistSummary:
    "Simulated risk review queue preview shows simulated daily loss breach simulated drawdown breach simulated position risk breach simulated symbol block simulated strategy block and kill switch note.",
  blocked:
    "Simulated risk review queue preview does not override risk governor decisions approve execution mutate capital or trigger live kill switches from the UI.",
  approval: "Simulated risk review queue preview requires deterministic synthetic risk events only.",
});

const SIMULATED_EVIDENCE_REVIEW_QUEUE = createSection({
  sectionId: "simulatedEvidenceReviewQueue",
  label: "Simulated Evidence Review Queue",
  title: "Deterministic Simulated Evidence Review Queue",
  humanReadableSummary:
    "Simulated evidence review queue preview shows simulated intent evidence, simulated validation evidence, simulated fill evidence, simulated rejection evidence, simulated P&L evidence, and redaction note.",
  plannedInputs: ["Synthetic intent evidence", "Synthetic validation evidence", "Synthetic fill evidence", "Synthetic rejection evidence", "Synthetic P&L evidence"],
  plannedOutputs: ["Simulated Evidence Review Queue", "Redaction note", "Denied evidence persistence"],
  checklistPrefix: "simulated-evidence-review-queue",
  checklistSummary:
    "Simulated evidence review queue preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence and redaction note.",
  blocked:
    "Simulated evidence review queue preview does not persist evidence mutate audit trails write files or promote memory from the UI.",
  approval: "Simulated evidence review queue preview requires deterministic synthetic evidence rows only.",
});

const SIMULATED_APPROVAL_REVIEW_QUEUE = createSection({
  sectionId: "simulatedApprovalReviewQueue",
  label: "Simulated Approval Review Queue",
  title: "Deterministic Simulated Approval Review Queue",
  humanReadableSummary:
    "Simulated approval review queue preview shows simulated approval packet, simulated expiry, simulated replay protection, simulated approver placeholder, and simulated operator signoff requirement.",
  plannedInputs: ["Synthetic approval packet", "Synthetic expiry", "Synthetic replay protection", "Synthetic approver placeholder"],
  plannedOutputs: ["Simulated Approval Review Queue", "Operator signoff requirement", "Denied approval persistence"],
  checklistPrefix: "simulated-approval-review-queue",
  checklistSummary:
    "Simulated approval review queue preview shows simulated approval packet simulated expiry simulated replay protection simulated approver placeholder simulated operator signoff requirement.",
  blocked:
    "Simulated approval review queue preview does not persist approvals release locks dispatch workers or approve real execution from the UI.",
  approval: "Simulated approval review queue preview requires deterministic synthetic approval rows only.",
});

const SIMULATED_METRIC_CARDS = createSection({
  sectionId: "simulatedMetricCards",
  label: "Simulated Metric Cards",
  title: "Deterministic Simulated Metric Cards",
  humanReadableSummary:
    "Simulated metric cards preview shows simulated equity card, simulated drawdown card, simulated risk event card, simulated review queue card, simulated evidence card, and no real P&L.",
  plannedInputs: ["Synthetic equity card", "Synthetic drawdown card", "Synthetic risk event card", "Synthetic review queue card", "Synthetic evidence card"],
  plannedOutputs: ["Simulated Metric Cards", "No real P&L", "Denied live account reads"],
  checklistPrefix: "simulated-metric-cards",
  checklistSummary:
    "Simulated metric cards preview shows simulated equity card simulated drawdown card simulated risk event card simulated review queue card simulated evidence card and no real P&L.",
  blocked:
    "Simulated metric cards preview does not calculate real performance read live accounts fetch live prices or guarantee returns from the UI.",
  approval: "Simulated metric cards preview requires deterministic synthetic metric cards only.",
});

const SIMULATED_LEDGER_TIMELINE = createSection({
  sectionId: "simulatedLedgerTimeline",
  label: "Simulated Ledger Timeline",
  title: "Deterministic Simulated Ledger Timeline",
  humanReadableSummary:
    "Simulated ledger timeline preview shows simulated intent timeline, simulated validation timeline, simulated fill timeline, simulated rejection timeline, simulated risk event timeline, and evidence continuity note.",
  plannedInputs: ["Synthetic intent timeline", "Synthetic validation timeline", "Synthetic fill timeline", "Synthetic rejection timeline", "Synthetic risk event timeline"],
  plannedOutputs: ["Simulated Ledger Timeline", "Evidence continuity note", "Denied ledger persistence"],
  checklistPrefix: "simulated-ledger-timeline",
  checklistSummary:
    "Simulated ledger timeline preview shows simulated intent timeline simulated validation timeline simulated fill timeline simulated rejection timeline simulated risk event timeline and evidence continuity note.",
  blocked:
    "Simulated ledger timeline preview does not read live broker timelines persist ledger state or write audit logs from the UI.",
  approval: "Simulated ledger timeline preview requires deterministic synthetic timeline entries only.",
});

const SIMULATED_EXCEPTION_QUEUE = createSection({
  sectionId: "simulatedExceptionQueue",
  label: "Simulated Exception Queue",
  title: "Deterministic Simulated Exception Queue",
  humanReadableSummary:
    "Simulated exception queue preview shows simulated stale intent, simulated missing evidence, simulated risk hold, simulated kill switch hold, simulated export hold, and operator review.",
  plannedInputs: ["Synthetic stale intent", "Synthetic missing evidence", "Synthetic risk hold", "Synthetic kill switch hold", "Synthetic export hold"],
  plannedOutputs: ["Simulated Exception Queue", "Operator review", "Denied live recovery"],
  checklistPrefix: "simulated-exception-queue",
  checklistSummary:
    "Simulated exception queue preview shows simulated stale intent simulated missing evidence simulated risk hold simulated kill switch hold simulated export hold and operator review.",
  blocked:
    "Simulated exception queue preview does not retry orders recover live execution call brokers or mutate order state from the UI.",
  approval: "Simulated exception queue preview requires deterministic synthetic exceptions only.",
});

const SIMULATED_REVIEW_NOTE_PACKET = createSection({
  sectionId: "simulatedReviewNotePacket",
  label: "Simulated Review Note Packet",
  title: "Backend-Owned Simulated Review Note Packet",
  humanReadableSummary:
    "Simulated review note packet preview shows simulated note body, simulated reviewer placeholder, simulated redaction requirement, simulated linked evidence, simulated retention note, and denied frontend persistence.",
  plannedInputs: ["Synthetic note body", "Synthetic reviewer placeholder", "Synthetic redaction requirement", "Synthetic linked evidence", "Synthetic retention note"],
  plannedOutputs: ["Simulated Review Note Packet", "Denied frontend persistence", "Backend-owned review note capture"],
  checklistPrefix: "simulated-review-note-packet",
  checklistSummary:
    "Simulated review note packet preview shows simulated note body simulated reviewer placeholder simulated redaction requirement simulated linked evidence simulated retention note and denied frontend persistence.",
  blocked:
    "Simulated review note packet preview does not save notes persist memory write files or mutate audit trails from the UI.",
  approval: "Simulated review note packet preview requires backend-owned review note capture.",
  state: "backend-owned",
});

const SIMULATED_OPERATOR_SIGNOFF = createSection({
  sectionId: "simulatedOperatorSignoff",
  label: "Simulated Operator Signoff",
  title: "Backend-Owned Simulated Operator Signoff",
  humanReadableSummary:
    "Simulated operator signoff preview shows simulated signoff packet, simulated approver placeholder, simulated expiry, simulated replay protection, simulated evidence requirement, and denied frontend approval persistence.",
  plannedInputs: ["Synthetic signoff packet", "Synthetic approver placeholder", "Synthetic expiry", "Synthetic replay protection", "Synthetic evidence requirement"],
  plannedOutputs: ["Simulated Operator Signoff", "Denied frontend approval persistence", "Backend-owned operator signoff capture"],
  checklistPrefix: "simulated-operator-signoff",
  checklistSummary:
    "Simulated operator signoff preview shows simulated signoff packet simulated approver placeholder simulated expiry simulated replay protection simulated evidence requirement and denied frontend approval persistence.",
  blocked:
    "Simulated operator signoff preview does not approve execution persist approval release locks dispatch workers or write audit state from the UI.",
  approval: "Simulated operator signoff preview requires backend-owned operator signoff capture.",
  state: "backend-owned",
});

const SIMULATED_DASHBOARD_EXPORT_BOUNDARY = createSection({
  sectionId: "simulatedDashboardExportBoundary",
  label: "Simulated Dashboard Export Boundary",
  title: "Backend-Owned Simulated Dashboard Export Boundary",
  humanReadableSummary:
    "Simulated dashboard export boundary preview shows simulated dashboard export request, simulated redaction requirement, simulated approval requirement, simulated artifact boundary, and denied frontend file writes.",
  plannedInputs: ["Synthetic dashboard export request", "Synthetic redaction requirement", "Synthetic approval requirement", "Synthetic artifact boundary"],
  plannedOutputs: ["Simulated Dashboard Export Boundary", "Denied frontend file writes", "Backend-owned export boundary"],
  checklistPrefix: "simulated-dashboard-export-boundary",
  checklistSummary:
    "Simulated dashboard export boundary preview shows simulated dashboard export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes.",
  blocked:
    "Simulated dashboard export boundary preview does not download files write files export reports send reports or persist artifacts from the UI.",
  approval: "Simulated dashboard export boundary preview requires backend-owned export boundary.",
  state: "backend-owned",
});

const SIMULATED_DASHBOARD_HEALTH_STATUS = createSection({
  sectionId: "simulatedDashboardHealthStatus",
  label: "Simulated Dashboard Health Status",
  title: "Deterministic Simulated Dashboard Health Status",
  humanReadableSummary:
    "Simulated dashboard health status preview shows simulated ledger freshness, simulated evidence completeness, simulated review backlog, simulated risk gate status, simulated export hold, and denied live probes.",
  plannedInputs: ["Synthetic ledger freshness", "Synthetic evidence completeness", "Synthetic review backlog", "Synthetic risk gate status", "Synthetic export hold"],
  plannedOutputs: ["Simulated Dashboard Health Status", "Denied live probes", "Synthetic health indicators"],
  checklistPrefix: "simulated-dashboard-health-status",
  checklistSummary:
    "Simulated dashboard health status preview shows simulated ledger freshness simulated evidence completeness simulated review backlog simulated risk gate status simulated export hold and denied live probes.",
  blocked:
    "Simulated dashboard health status preview does not probe services call providers check broker connections or monitor live accounts from the UI.",
  approval: "Simulated dashboard health status preview requires deterministic synthetic health indicators only.",
});

const DENIED_PAPER_TRADING_REVIEW_DASHBOARD_BOUNDARIES = createSection({
  sectionId: "deniedPaperTradingReviewDashboardBoundaries",
  label: "Denied Paper Trading Review Dashboard Boundaries",
  title: "Denied Paper Trading Review Dashboard Boundaries",
  humanReadableSummary:
    "Denied paper trading review dashboard paths remain blocked across broker connection, account reads, live positions, order placement, order dispatch, paper order execution, money movement, live market data calls, real P&L calculation, dashboard persistence, evidence persistence, export/file writes, financial advice, personalised recommendations, buy sell instructions, trading automation, and performance guarantees.",
  plannedInputs: ["Safety constraints", "Denied path registry", "Backend-owned workflow requirements", "Explicit operator approval requirement"],
  plannedOutputs: ["Denied paper trading review dashboard boundaries", "Review-only dashboard", "Synthetic data only"],
  checklistPrefix: "denied-paper-trading-review-dashboard-boundaries",
  checklistSummary: "Denied paper trading review dashboard paths remain blocked.",
  blocked: "Denied paper trading review dashboard paths remain blocked.",
  approval: "Denied paper trading review dashboard boundaries require explicit operator approval before any future mutation-capable change.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "simulatedPerformanceSummary",
  "simulatedTradeReviewQueue",
  "simulatedRiskReviewQueue",
  "simulatedEvidenceReviewQueue",
  "simulatedApprovalReviewQueue",
  "simulatedMetricCards",
  "simulatedLedgerTimeline",
  "simulatedExceptionQueue",
  "simulatedReviewNotePacket",
  "simulatedOperatorSignoff",
  "simulatedDashboardExportBoundary",
  "simulatedDashboardHealthStatus",
  "deniedPaperTradingReviewDashboardBoundaries",
] as const;

const SECTION_LOOKUP: Record<(typeof ALL_SECTION_IDS)[number], PaperTradingReviewDashboardSection> = {
  simulatedPerformanceSummary: SIMULATED_PERFORMANCE_SUMMARY,
  simulatedTradeReviewQueue: SIMULATED_TRADE_REVIEW_QUEUE,
  simulatedRiskReviewQueue: SIMULATED_RISK_REVIEW_QUEUE,
  simulatedEvidenceReviewQueue: SIMULATED_EVIDENCE_REVIEW_QUEUE,
  simulatedApprovalReviewQueue: SIMULATED_APPROVAL_REVIEW_QUEUE,
  simulatedMetricCards: SIMULATED_METRIC_CARDS,
  simulatedLedgerTimeline: SIMULATED_LEDGER_TIMELINE,
  simulatedExceptionQueue: SIMULATED_EXCEPTION_QUEUE,
  simulatedReviewNotePacket: SIMULATED_REVIEW_NOTE_PACKET,
  simulatedOperatorSignoff: SIMULATED_OPERATOR_SIGNOFF,
  simulatedDashboardExportBoundary: SIMULATED_DASHBOARD_EXPORT_BOUNDARY,
  simulatedDashboardHealthStatus: SIMULATED_DASHBOARD_HEALTH_STATUS,
  deniedPaperTradingReviewDashboardBoundaries: DENIED_PAPER_TRADING_REVIEW_DASHBOARD_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly PaperTradingReviewDashboardItem[] = [
  {
    id: "dashboard-review-only",
    label: "Review-only dashboard",
    detail:
      "Paper Trading Review Dashboard remains synthetic data only and review-only from the cockpit.",
    state: "review-only",
  },
  {
    id: "backend-owned-workflow",
    label: "Backend-owned workflow",
    detail:
      "Backend-owned paper broker adapter, result ledger, evidence capture, review workflow, risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
    state: "backend-owned",
  },
  {
    id: "execution-denied",
    label: "Execution denied",
    detail:
      "No broker connection, account dashboard, live positions, live market data, real P&L, order placement, order dispatch, paper order execution, money movement, trading automation, advice, recommendations, buy sell instructions, persistence, or export is enabled.",
    state: "blocked",
  },
] as const;

export const PAPER_TRADING_REVIEW_DASHBOARD_MODEL: PaperTradingReviewDashboardModel = {
  paperTradingReviewDashboardId: "paper-trading-review-dashboard-v1",
  paperTradingReviewDashboardKind: "paper-trading-review-dashboard-v1",
  simulatedPerformanceSummary: SIMULATED_PERFORMANCE_SUMMARY,
  simulatedTradeReviewQueue: SIMULATED_TRADE_REVIEW_QUEUE,
  simulatedRiskReviewQueue: SIMULATED_RISK_REVIEW_QUEUE,
  simulatedEvidenceReviewQueue: SIMULATED_EVIDENCE_REVIEW_QUEUE,
  simulatedApprovalReviewQueue: SIMULATED_APPROVAL_REVIEW_QUEUE,
  simulatedMetricCards: SIMULATED_METRIC_CARDS,
  simulatedLedgerTimeline: SIMULATED_LEDGER_TIMELINE,
  simulatedExceptionQueue: SIMULATED_EXCEPTION_QUEUE,
  simulatedReviewNotePacket: SIMULATED_REVIEW_NOTE_PACKET,
  simulatedOperatorSignoff: SIMULATED_OPERATOR_SIGNOFF,
  simulatedDashboardExportBoundary: SIMULATED_DASHBOARD_EXPORT_BOUNDARY,
  simulatedDashboardHealthStatus: SIMULATED_DASHBOARD_HEALTH_STATUS,
  deniedPaperTradingReviewDashboardBoundaries: DENIED_PAPER_TRADING_REVIEW_DASHBOARD_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly PaperTradingReviewDashboardRouteDefinition[] = [
  {
    slug: "paper-trading-review-dashboard-boundary",
    href: "/paper-trading-review-dashboard-boundary",
    phase: "Phase 1786",
    title: "Paper Trading Review Dashboard Boundary",
    commandLabel: "Go to Paper Trading Review Dashboard Boundary",
    summary: "Defines a deterministic review-only paper trading review dashboard boundary without broker connections, account access, orders, real P&L, live data, advice, or performance guarantees.",
    markerPhrases: [
      "Paper trading review dashboard boundary",
      "Paper trading review dashboard boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice or guarantee performance from the UI",
      "Paper trading review dashboard boundary requires explicit operator approval",
      "Paper trading review dashboard boundary prepares deterministic synthetic dashboard workflows without frontend execution or frontend persistence",
      "Denied paper trading review dashboard paths remain blocked",
      "Paper trading review dashboard boundary checklist",
    ],
    sectionIds: ["deniedPaperTradingReviewDashboardBoundaries", "simulatedOperatorSignoff", "simulatedDashboardHealthStatus"],
    devOnly: true,
  },
  {
    slug: "simulated-performance-summary-preview",
    href: "/simulated-performance-summary-preview",
    phase: "Phase 1787",
    title: "Simulated Performance Summary Preview",
    commandLabel: "Go to Simulated Performance Summary Preview",
    summary: "Previews deterministic synthetic performance summaries without real P&L, real account reads, live market data, or performance guarantees.",
    markerPhrases: [
      "Simulated performance summary preview",
      "Simulated performance summary preview does not calculate real P&L read real accounts fetch live market data or guarantee performance from the UI",
      "Simulated performance summary preview requires deterministic synthetic performance fixtures only",
      "Simulated performance summary preview shows simulated net result simulated win rate simulated average result simulated drawdown placeholder simulated exposure and no performance guarantee",
      "Denied simulated performance summary paths remain blocked",
      "Simulated performance summary checklist",
    ],
    sectionIds: ["simulatedPerformanceSummary", "simulatedMetricCards", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-trade-review-queue-preview",
    href: "/simulated-trade-review-queue-preview",
    phase: "Phase 1788",
    title: "Simulated Trade Review Queue Preview",
    commandLabel: "Go to Simulated Trade Review Queue Preview",
    summary: "Previews deterministic synthetic trade review rows without trade execution, order routing, ledger mutation, or review-state persistence.",
    markerPhrases: [
      "Simulated trade review queue preview",
      "Simulated trade review queue preview does not execute trades route orders mutate ledgers or persist review state from the UI",
      "Simulated trade review queue preview requires deterministic synthetic trade review rows only",
      "Simulated trade review queue preview shows simulated fill review simulated rejection review simulated cancel review simulated position update review and operator review note",
      "Denied simulated trade review queue paths remain blocked",
      "Simulated trade review queue checklist",
    ],
    sectionIds: ["simulatedTradeReviewQueue", "simulatedReviewNotePacket", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-risk-review-queue-preview",
    href: "/simulated-risk-review-queue-preview",
    phase: "Phase 1789",
    title: "Simulated Risk Review Queue Preview",
    commandLabel: "Go to Simulated Risk Review Queue Preview",
    summary: "Previews deterministic synthetic risk events without risk override, execution approval, capital mutation, or live kill switch triggers.",
    markerPhrases: [
      "Simulated risk review queue preview",
      "Simulated risk review queue preview does not override risk governor decisions approve execution mutate capital or trigger live kill switches from the UI",
      "Simulated risk review queue preview requires deterministic synthetic risk events only",
      "Simulated risk review queue preview shows simulated daily loss breach simulated drawdown breach simulated position risk breach simulated symbol block simulated strategy block and kill switch note",
      "Denied simulated risk review queue paths remain blocked",
      "Simulated risk review queue checklist",
    ],
    sectionIds: ["simulatedRiskReviewQueue", "simulatedDashboardHealthStatus", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-evidence-review-queue-preview",
    href: "/simulated-evidence-review-queue-preview",
    phase: "Phase 1790",
    title: "Simulated Evidence Review Queue Preview",
    commandLabel: "Go to Simulated Evidence Review Queue Preview",
    summary: "Previews deterministic synthetic evidence rows without evidence persistence, audit mutation, file writes, or memory promotion.",
    markerPhrases: [
      "Simulated evidence review queue preview",
      "Simulated evidence review queue preview does not persist evidence mutate audit trails write files or promote memory from the UI",
      "Simulated evidence review queue preview requires deterministic synthetic evidence rows only",
      "Simulated evidence review queue preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence and redaction note",
      "Denied simulated evidence review queue paths remain blocked",
      "Simulated evidence review queue checklist",
    ],
    sectionIds: ["simulatedEvidenceReviewQueue", "simulatedLedgerTimeline", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-approval-review-queue-preview",
    href: "/simulated-approval-review-queue-preview",
    phase: "Phase 1791",
    title: "Simulated Approval Review Queue Preview",
    commandLabel: "Go to Simulated Approval Review Queue Preview",
    summary: "Previews deterministic synthetic approval rows without approval persistence, lock release, worker dispatch, or real execution approval.",
    markerPhrases: [
      "Simulated approval review queue preview",
      "Simulated approval review queue preview does not persist approvals release locks dispatch workers or approve real execution from the UI",
      "Simulated approval review queue preview requires deterministic synthetic approval rows only",
      "Simulated approval review queue preview shows simulated approval packet simulated expiry simulated replay protection simulated approver placeholder simulated operator signoff requirement",
      "Denied simulated approval review queue paths remain blocked",
      "Simulated approval review queue checklist",
    ],
    sectionIds: ["simulatedApprovalReviewQueue", "simulatedOperatorSignoff", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-metric-cards-preview",
    href: "/simulated-metric-cards-preview",
    phase: "Phase 1792",
    title: "Simulated Metric Cards Preview",
    commandLabel: "Go to Simulated Metric Cards Preview",
    summary: "Previews deterministic synthetic metric cards without real performance calculation, live accounts, live prices, or return guarantees.",
    markerPhrases: [
      "Simulated metric cards preview",
      "Simulated metric cards preview does not calculate real performance read live accounts fetch live prices or guarantee returns from the UI",
      "Simulated metric cards preview requires deterministic synthetic metric cards only",
      "Simulated metric cards preview shows simulated equity card simulated drawdown card simulated risk event card simulated review queue card simulated evidence card and no real P&L",
      "Denied simulated metric cards paths remain blocked",
      "Simulated metric cards checklist",
    ],
    sectionIds: ["simulatedMetricCards", "simulatedPerformanceSummary", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-ledger-timeline-preview",
    href: "/simulated-ledger-timeline-preview",
    phase: "Phase 1793",
    title: "Simulated Ledger Timeline Preview",
    commandLabel: "Go to Simulated Ledger Timeline Preview",
    summary: "Previews deterministic synthetic timeline entries without live broker timelines, ledger-state persistence, or audit-log writes.",
    markerPhrases: [
      "Simulated ledger timeline preview",
      "Simulated ledger timeline preview does not read live broker timelines persist ledger state or write audit logs from the UI",
      "Simulated ledger timeline preview requires deterministic synthetic timeline entries only",
      "Simulated ledger timeline preview shows simulated intent timeline simulated validation timeline simulated fill timeline simulated rejection timeline simulated risk event timeline and evidence continuity note",
      "Denied simulated ledger timeline paths remain blocked",
      "Simulated ledger timeline checklist",
    ],
    sectionIds: ["simulatedLedgerTimeline", "simulatedEvidenceReviewQueue", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-exception-queue-preview",
    href: "/simulated-exception-queue-preview",
    phase: "Phase 1794",
    title: "Simulated Exception Queue Preview",
    commandLabel: "Go to Simulated Exception Queue Preview",
    summary: "Previews deterministic synthetic exceptions without order retry, live recovery, broker calls, or order-state mutation.",
    markerPhrases: [
      "Simulated exception queue preview",
      "Simulated exception queue preview does not retry orders recover live execution call brokers or mutate order state from the UI",
      "Simulated exception queue preview requires deterministic synthetic exceptions only",
      "Simulated exception queue preview shows simulated stale intent simulated missing evidence simulated risk hold simulated kill switch hold simulated export hold and operator review",
      "Denied simulated exception queue paths remain blocked",
      "Simulated exception queue checklist",
    ],
    sectionIds: ["simulatedExceptionQueue", "simulatedRiskReviewQueue", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-review-note-packet-preview",
    href: "/simulated-review-note-packet-preview",
    phase: "Phase 1795",
    title: "Simulated Review Note Packet Preview",
    commandLabel: "Go to Simulated Review Note Packet Preview",
    summary: "Previews backend-owned synthetic review note capture without note saving, memory persistence, file writes, or audit mutation from the UI.",
    markerPhrases: [
      "Simulated review note packet preview",
      "Simulated review note packet preview does not save notes persist memory write files or mutate audit trails from the UI",
      "Simulated review note packet preview requires backend-owned review note capture",
      "Simulated review note packet preview shows simulated note body simulated reviewer placeholder simulated redaction requirement simulated linked evidence simulated retention note and denied frontend persistence",
      "Denied simulated review note packet paths remain blocked",
      "Simulated review note packet checklist",
    ],
    sectionIds: ["simulatedReviewNotePacket", "simulatedEvidenceReviewQueue", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-operator-signoff-preview",
    href: "/simulated-operator-signoff-preview",
    phase: "Phase 1796",
    title: "Simulated Operator Signoff Preview",
    commandLabel: "Go to Simulated Operator Signoff Preview",
    summary: "Previews backend-owned synthetic operator signoff capture without execution approval, approval persistence, lock release, worker dispatch, or audit-state writes.",
    markerPhrases: [
      "Simulated operator signoff preview",
      "Simulated operator signoff preview does not approve execution persist approval release locks dispatch workers or write audit state from the UI",
      "Simulated operator signoff preview requires backend-owned operator signoff capture",
      "Simulated operator signoff preview shows simulated signoff packet simulated approver placeholder simulated expiry simulated replay protection simulated evidence requirement and denied frontend approval persistence",
      "Denied simulated operator signoff paths remain blocked",
      "Simulated operator signoff checklist",
    ],
    sectionIds: ["simulatedOperatorSignoff", "simulatedApprovalReviewQueue", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-dashboard-export-boundary-preview",
    href: "/simulated-dashboard-export-boundary-preview",
    phase: "Phase 1797",
    title: "Simulated Dashboard Export Boundary Preview",
    commandLabel: "Go to Simulated Dashboard Export Boundary Preview",
    summary: "Previews backend-owned dashboard export boundaries without downloads, file writes, report exports, report sends, or artifact persistence.",
    markerPhrases: [
      "Simulated dashboard export boundary preview",
      "Simulated dashboard export boundary preview does not download files write files export reports send reports or persist artifacts from the UI",
      "Simulated dashboard export boundary preview requires backend-owned export boundary",
      "Simulated dashboard export boundary preview shows simulated dashboard export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes",
      "Denied simulated dashboard export boundary paths remain blocked",
      "Simulated dashboard export boundary checklist",
    ],
    sectionIds: ["simulatedDashboardExportBoundary", "simulatedOperatorSignoff", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-dashboard-health-status-preview",
    href: "/simulated-dashboard-health-status-preview",
    phase: "Phase 1798",
    title: "Simulated Dashboard Health Status Preview",
    commandLabel: "Go to Simulated Dashboard Health Status Preview",
    summary: "Previews deterministic synthetic health indicators without service probes, provider calls, broker connection checks, or live-account monitoring.",
    markerPhrases: [
      "Simulated dashboard health status preview",
      "Simulated dashboard health status preview does not probe services call providers check broker connections or monitor live accounts from the UI",
      "Simulated dashboard health status preview requires deterministic synthetic health indicators only",
      "Simulated dashboard health status preview shows simulated ledger freshness simulated evidence completeness simulated review backlog simulated risk gate status simulated export hold and denied live probes",
      "Denied simulated dashboard health status paths remain blocked",
      "Simulated dashboard health status checklist",
    ],
    sectionIds: ["simulatedDashboardHealthStatus", "simulatedMetricCards", "deniedPaperTradingReviewDashboardBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-paper-trading-review-dashboard-summary",
    href: "/cockpit-paper-trading-review-dashboard-summary",
    phase: "Phase 1799",
    title: "Cockpit Paper Trading Review Dashboard Summary",
    commandLabel: "Go to Cockpit Paper Trading Review Dashboard Summary",
    summary: "Summarizes safe paper trading review dashboard previews as grouped Trading Workspace review content in the normal cockpit.",
    markerPhrases: [
      "Cockpit paper trading review dashboard summary",
      "Cockpit paper trading review dashboard summary keeps the cockpit as the normal user surface",
      "Cockpit paper trading review dashboard summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice issue buy sell instructions automate trading persist evidence write files or guarantee performance from the cockpit",
      "Cockpit paper trading review dashboard summary shows simulated performance summary trade review queue risk review queue evidence review queue approval review queue metric cards ledger timeline exception queue review note packet operator signoff dashboard export boundary dashboard health status and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit paper trading review dashboard checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-paper-trading-review-dashboard-candidate",
    href: "/first-paper-trading-review-dashboard-candidate",
    phase: "Phase 1800",
    title: "First Paper Trading Review Dashboard Candidate",
    commandLabel: "Go to First Paper Trading Review Dashboard Candidate",
    summary: "Combines the first paper trading review dashboard candidate without real broker workflows, live trading, order placement, paper execution, credentials, account reads, dashboard persistence, or dispatch from the UI.",
    markerPhrases: [
      "First paper trading review dashboard candidate",
      "First paper trading review dashboard candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads dashboard persistence or dispatch from the UI",
      "First paper trading review dashboard candidate requires explicit operator approval",
      "Candidate combines simulated performance summary trade review queue risk review queue evidence review queue approval review queue metric cards ledger timeline exception queue review note packet operator signoff dashboard export boundary health status cockpit summary and denied paths",
      "Denied first paper trading review dashboard paths remain blocked",
      "First paper trading review dashboard checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-paper-trading-review-dashboard-release-candidate",
    href: "/controlled-paper-trading-review-dashboard-release-candidate",
    phase: "Phase 1801",
    title: "Controlled Paper Trading Review Dashboard Release Candidate",
    commandLabel: "Go to Controlled Paper Trading Review Dashboard Release Candidate",
    summary: "Release candidate prepares CodexForge for backend-owned paper trading review workflows without frontend broker execution, dashboard persistence, or evidence persistence.",
    markerPhrases: [
      "Controlled paper trading review dashboard release candidate",
      "Controlled paper trading review dashboard release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled paper trading review dashboard release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned paper trading review workflows without frontend broker execution dashboard persistence or evidence persistence",
      "Denied controlled paper trading review dashboard paths remain blocked",
      "Controlled paper trading review dashboard release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listPaperTradingReviewDashboardRouteDefinitions(): readonly PaperTradingReviewDashboardRouteDefinition[] {
  return ROUTES;
}

export function getPaperTradingReviewDashboardRouteDefinition(
  slug: PaperTradingReviewDashboardRouteSlug
): PaperTradingReviewDashboardRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildPaperTradingReviewDashboardRouteModel(
  slug: PaperTradingReviewDashboardRouteSlug = "controlled-paper-trading-review-dashboard-release-candidate"
): PaperTradingReviewDashboardRouteModel {
  const route = getPaperTradingReviewDashboardRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is PaperTradingReviewDashboardSection => Boolean(section));

  return {
    route,
    paperTradingReviewDashboard: PAPER_TRADING_REVIEW_DASHBOARD_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PAPER_TRADING_REVIEW_DASHBOARD_COCKPIT_MARKERS,
    summary: summarizePaperTradingReviewDashboardRoute(route, sections),
  };
}

export function buildPaperTradingReviewDashboardModel(): PaperTradingReviewDashboardRouteModel {
  return buildPaperTradingReviewDashboardRouteModel("controlled-paper-trading-review-dashboard-release-candidate");
}

export function summarizePaperTradingReviewDashboardRoute(
  route: PaperTradingReviewDashboardRouteDefinition,
  sections: readonly PaperTradingReviewDashboardSection[]
): string {
  return `${route.title} keeps ${sections.length} paper trading review dashboard sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from broker connections, account dashboard reads, live position reads, order placement, order dispatch, paper order execution, money movement, live market data calls, real P&L, trading automation, financial advice, personalised recommendations, buy sell instructions, dashboard persistence, evidence persistence, export/file writes, worker dispatch, command execution, and performance guarantees.`;
}

export function buildPaperTradingReviewDashboardStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
