export type TradingResearchDomainRouteSlug =
  | "trading-research-domain-boundary"
  | "trading-research-goal-intake-preview"
  | "trading-watchlist-preview"
  | "trading-thesis-builder-preview"
  | "trading-catalyst-tracker-preview"
  | "trading-risk-notes-preview"
  | "trading-strategy-candidate-preview"
  | "trading-backtest-readiness-preview"
  | "trading-paper-trade-readiness-preview"
  | "trading-profit-lockbox-preview"
  | "trading-mandate-draft-preview"
  | "trading-broker-boundary-preview"
  | "trading-evidence-audit-preview"
  | "cockpit-trading-research-summary"
  | "first-trading-research-domain-candidate"
  | "controlled-trading-research-domain-release-candidate";

export type TradingResearchDomainKind =
  | "trading-research-domain-pack-v1"
  | "trading-research-domain-boundary"
  | "trading-research-goal-intake-preview"
  | "trading-watchlist-preview"
  | "trading-thesis-builder-preview"
  | "trading-catalyst-tracker-preview"
  | "trading-risk-notes-preview"
  | "trading-strategy-candidate-preview"
  | "trading-backtest-readiness-preview"
  | "trading-paper-trade-readiness-preview"
  | "trading-profit-lockbox-preview"
  | "trading-mandate-draft-preview"
  | "trading-broker-boundary-preview"
  | "trading-evidence-audit-preview"
  | "cockpit-trading-research-summary"
  | "first-trading-research-domain-candidate"
  | "controlled-trading-research-domain-release-candidate";

export type TradingResearchDomainState =
  | "research-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "candidate"
  | "release-candidate";

export type TradingResearchDomainItem = {
  id: string;
  label: string;
  detail: string;
  state: TradingResearchDomainState;
};

export type TradingResearchDomainSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly TradingResearchDomainItem[];
  state: TradingResearchDomainState;
};

export type TradingResearchDomainModel = {
  tradingResearchDomainId: string;
  tradingResearchDomainKind: TradingResearchDomainKind;
  researchGoalIntake: TradingResearchDomainSection;
  watchlistPreview: TradingResearchDomainSection;
  thesisBuilderPreview: TradingResearchDomainSection;
  catalystTrackerPreview: TradingResearchDomainSection;
  riskNotesPreview: TradingResearchDomainSection;
  strategyCandidatePreview: TradingResearchDomainSection;
  backtestReadinessPreview: TradingResearchDomainSection;
  paperTradeReadinessPreview: TradingResearchDomainSection;
  profitLockboxPreview: TradingResearchDomainSection;
  tradingMandateDraftPreview: TradingResearchDomainSection;
  brokerBoundaryPreview: TradingResearchDomainSection;
  evidenceAuditPreview: TradingResearchDomainSection;
  cockpitSummary: readonly TradingResearchDomainItem[];
  deniedTradingResearchBoundaries: TradingResearchDomainSection;
  explicitSafetyLimits: readonly string[];
};

export type TradingResearchDomainRouteDefinition = {
  slug: TradingResearchDomainRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type TradingResearchDomainRouteModel = {
  route: TradingResearchDomainRouteDefinition;
  tradingResearchDomain: TradingResearchDomainModel;
  sections: readonly TradingResearchDomainSection[];
  diagnosticRoutes: readonly TradingResearchDomainRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const TRADING_RESEARCH_DOMAIN_COCKPIT_MARKERS = [
  "Trading Research Domain Pack",
  "Trading Research",
  "Research Goal",
  "Watchlist",
  "Thesis Builder",
  "Catalyst Tracker",
  "Risk Notes",
  "Strategy Candidates",
  "Backtest Readiness",
  "Paper Trade Readiness",
  "Profit Lockbox",
  "Trading Mandate Draft",
  "Broker Boundary",
  "Evidence Audit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No guaranteed profit claims",
  "Paper trading required before automation",
  "Backtesting required before automation",
  "Risk governor required before automation",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Trading Research Domain Pack v1 is research-only and review-only from the frontend.",
  "It is not live trading, broker execution, financial advice, personalised investment recommendation, buy sell instruction, automated trading, signal execution, or order placement.",
  "It does not connect brokers, read broker accounts, submit orders, store credentials, store account ids, store endpoints, or access portfolios from the UI.",
  "It does not fetch live quotes, call market data APIs, fetch news, fetch filings, call providers, call local models, call connectors, send prompts, run commands, write files, create queues, create transactions, persist approvals, persist evidence, persist results, persist audit, or write browser storage from the UI.",
  "Paper trading is required before any future automation.",
  "Backtesting is required before any future automation.",
  "A risk governor, capital-limited mandate, backend-owned broker boundary, and explicit operator approval remain required before any future execution path.",
  "Profit lockbox language applies only to realised profit from profitable closed trades, with no guaranteed profit and no guaranteed return.",
] as const;

const TRADING_RESEARCH_DOMAIN_REQUIRED_SAFETY_MARKERS = [
  "realised profit only",
  "profitable closed trades only",
  "protected profit bucket",
  "reinvestable profit bucket",
  "configurable lock percentage",
  "20% realised profit protected and 80% reinvestable",
  "losing trades have no profit lock",
  "losses reduce active capital",
  "no guaranteed return",
  "allocated capital",
  "active capital",
  "max daily loss",
  "max drawdown",
  "max position risk",
  "approved markets",
  "approved symbols",
  "approved strategies",
  "paper-trade proof required",
  "backtest proof required",
  "kill switch required",
  "broker approval required",
  "automation disabled in this batch",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic research cards only.",
  "Future trading workflows remain backend-owned, approval-gated, evidence-backed, and outside direct frontend execution.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, or guaranteed profit claim.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, broker account access, portfolio access, credential storage, endpoint storage, live quote fetching, market data API calls, news fetching, filing fetching, exchange API calls, order placement, paper trade placement, automated execution, signal execution, backtest execution, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, browser storage writes, approval persistence, evidence persistence, audit persistence, result persistence, queue creation, transaction creation, or worker dispatch from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Backend-owned broker boundary remains required before any future execution workflow.",
  "Risk governor, paper-trade proof, backtest proof, kill switch, evidence, audit, and capital limits remain required before future automation can be considered.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly TradingResearchDomainItem[] {
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

function createSection(section: TradingResearchDomainSection): TradingResearchDomainSection {
  return section;
}

const TRADING_BOUNDARY_PREVIEW = createSection({
  sectionId: "tradingResearchDomainBoundary",
  label: "Trading Research",
  title: "Trading Research Domain Boundary",
  humanReadableSummary:
    "Trading research domain boundary keeps the pack research-only, review-only, and blocked from broker connection, trade placement, live market data calls, financial advice, personalised recommendations, and automated execution from the UI.",
  plannedInputs: ["Research-only intent", "Review-only posture", "Denied trading paths", "Future backend-owned workflow notes"],
  plannedOutputs: ["Boundary statement", "Operator approval requirement", "Backend-owned workflow boundary", "Denied trading research domain paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-research-domain-boundary",
    "Trading research domain boundary prepares backend-owned research workflows without frontend trading execution.",
    "Trading research domain boundary does not connect brokers place trades fetch live market data or provide financial advice from the UI.",
    "Trading research domain requires explicit operator approval before any future trading workflow."
  ),
  state: "blocked",
});

const RESEARCH_GOAL_INTAKE = createSection({
  sectionId: "researchGoalIntake",
  label: "Research Goal",
  title: "Trading Research Goal Intake Preview",
  humanReadableSummary:
    "Trading research goal intake preview captures a research goal, market interest, timeframe, risk tolerance, watchlist hints, done criteria, evidence needs, and paper-trade needs without sending prompts, creating jobs, connecting brokers, or placing trades from the UI.",
  plannedInputs: ["Research goal", "Market interest", "Timeframe", "Risk tolerance", "Watchlist hints", "Done criteria", "Evidence needs", "Paper-trade needs"],
  plannedOutputs: ["Research intake card", "Review-only goal packet", "Evidence checklist", "Paper-trade first note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-research-goal-intake",
    "Trading research goal intake preview captures research goal market interest timeframe risk tolerance watchlist hints done criteria evidence needs and paper-trade needs.",
    "Trading research goal intake preview does not send prompts create jobs connect brokers or place trades from the UI.",
    "Trading research goal intake preview requires explicit operator approval."
  ),
  state: "review-only",
});

const WATCHLIST_PREVIEW = createSection({
  sectionId: "watchlistPreview",
  label: "Watchlist",
  title: "Trading Watchlist Preview",
  humanReadableSummary:
    "Trading watchlist preview shows review-only symbols, themes, sectors, catalysts, risk notes, evidence needs, and no personalised buy sell instruction without fetching live quotes or market data from the UI.",
  plannedInputs: ["Review-only symbols", "Themes", "Sectors", "Catalyst notes", "Risk notes", "Evidence needs"],
  plannedOutputs: ["Watchlist preview", "Evidence needs", "No personalised buy sell instruction note", "Live market data denied path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-watchlist",
    "Trading watchlist preview shows review-only symbols themes sectors catalysts risk notes evidence needs and no personalised buy sell instruction.",
    "Trading watchlist preview does not fetch live quotes or market data from the UI.",
    "Trading watchlist preview requires explicit operator approval."
  ),
  state: "review-only",
});

const THESIS_BUILDER_PREVIEW = createSection({
  sectionId: "thesisBuilderPreview",
  label: "Thesis Builder",
  title: "Trading Thesis Builder Preview",
  humanReadableSummary:
    "Trading thesis builder preview shows thesis hypothesis, counter-thesis, catalyst, evidence, risk, invalidation, timeframe, and review-only confidence notes without financial advice or buy sell instructions.",
  plannedInputs: ["Thesis hypothesis", "Counter-thesis", "Catalyst", "Evidence", "Risk", "Invalidation", "Timeframe"],
  plannedOutputs: ["Thesis card", "Counter-thesis card", "Invalidation note", "Review-only confidence note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-thesis-builder",
    "Trading thesis builder preview shows thesis hypothesis counter-thesis catalyst evidence risk invalidation timeframe and review-only confidence notes.",
    "Trading thesis builder preview does not provide financial advice or buy sell instructions.",
    "Trading thesis builder preview requires explicit operator approval."
  ),
  state: "review-only",
});

const CATALYST_TRACKER_PREVIEW = createSection({
  sectionId: "catalystTrackerPreview",
  label: "Catalyst Tracker",
  title: "Trading Catalyst Tracker Preview",
  humanReadableSummary:
    "Trading catalyst tracker preview shows planned catalyst categories for earnings, macro, news, product, technical, regulatory, liquidity, sentiment, and evidence requirements without fetching news, earnings, filings, or live market data from the UI.",
  plannedInputs: ["Earnings", "Macro", "News", "Product", "Technical", "Regulatory", "Liquidity", "Sentiment"],
  plannedOutputs: ["Catalyst category cards", "Evidence requirements", "Backend-owned source boundary", "Live data denied path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-catalyst-tracker",
    "Trading catalyst tracker preview shows planned catalyst categories earnings macro news product technical regulatory liquidity sentiment and evidence requirements.",
    "Trading catalyst tracker preview does not fetch news earnings filings or live market data from the UI.",
    "Trading catalyst tracker preview requires explicit operator approval."
  ),
  state: "review-only",
});

const RISK_NOTES_PREVIEW = createSection({
  sectionId: "riskNotesPreview",
  label: "Risk Notes",
  title: "Trading Risk Notes Preview",
  humanReadableSummary:
    "Trading risk notes preview shows max daily loss, max drawdown, position risk, liquidity risk, volatility risk, correlation risk, event risk, and invalidation notes without calculating live portfolio risk or accessing broker accounts.",
  plannedInputs: ["Max daily loss", "Max drawdown", "Position risk", "Liquidity risk", "Volatility risk", "Correlation risk", "Event risk", "Invalidation notes"],
  plannedOutputs: ["Risk note card", "Risk governor requirement", "Capital limit reminder", "Broker account access denied path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-risk-notes",
    "Trading risk notes preview shows max daily loss max drawdown position risk liquidity risk volatility risk correlation risk event risk and invalidation notes.",
    "Trading risk notes preview does not calculate live portfolio risk or access broker accounts.",
    "Trading risk notes preview requires explicit operator approval."
  ),
  state: "review-only",
});

const STRATEGY_CANDIDATE_PREVIEW = createSection({
  sectionId: "strategyCandidatePreview",
  label: "Strategy Candidates",
  title: "Trading Strategy Candidate Preview",
  humanReadableSummary:
    "Trading strategy candidate preview shows strategy idea, entry logic, exit logic, risk controls, required data, backtest needs, paper-trade needs, and no executable signal state without executing signals or placing orders.",
  plannedInputs: ["Strategy idea", "Entry logic", "Exit logic", "Risk controls", "Required data", "Backtest needs", "Paper-trade needs"],
  plannedOutputs: ["Strategy candidate card", "No executable signal state", "Backtest needs", "Paper-trade needs"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-strategy-candidate",
    "Trading strategy candidate preview shows strategy idea entry logic exit logic risk controls required data backtest needs paper-trade needs and no executable signal state.",
    "Trading strategy candidate preview does not execute signals or place orders.",
    "Trading strategy candidate preview requires explicit operator approval."
  ),
  state: "review-only",
});

const BACKTEST_READINESS_PREVIEW = createSection({
  sectionId: "backtestReadinessPreview",
  label: "Backtest Readiness",
  title: "Trading Backtest Readiness Preview",
  humanReadableSummary:
    "Trading backtest readiness preview shows dataset needs, assumptions, fees, slippage, survivorship bias, sample period, metrics, edge cases, and backend-owned backtest boundary without running backtests from the UI.",
  plannedInputs: ["Dataset needs", "Assumptions", "Fees", "Slippage", "Survivorship bias", "Sample period", "Metrics", "Edge cases"],
  plannedOutputs: ["Backtest readiness card", "Backend-owned backtest boundary", "Bias checks", "Metric review list"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-backtest-readiness",
    "Trading backtest readiness preview shows dataset needs assumptions fees slippage survivorship bias sample period metrics edge cases and backend-owned backtest boundary.",
    "Trading backtest readiness preview does not run backtests from the UI.",
    "Trading backtest readiness preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const PAPER_TRADE_READINESS_PREVIEW = createSection({
  sectionId: "paperTradeReadinessPreview",
  label: "Paper Trade Readiness",
  title: "Trading Paper Trade Readiness Preview",
  humanReadableSummary:
    "Trading paper trade readiness preview shows paper account boundary, fake capital, trade journal, evidence, metrics, operator review, and no live order placement without placing paper trades from the UI.",
  plannedInputs: ["Paper account boundary", "Fake capital", "Trade journal", "Evidence", "Metrics", "Operator review"],
  plannedOutputs: ["Paper trade readiness card", "Paper-trade proof requirement", "No live order placement note", "Backend-owned paper boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-paper-trade-readiness",
    "Trading paper trade readiness preview shows paper account boundary fake capital trade journal evidence metrics operator review and no live order placement.",
    "Trading paper trade readiness preview does not place paper trades from the UI.",
    "Trading paper trade readiness preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const PROFIT_LOCKBOX_PREVIEW = createSection({
  sectionId: "profitLockboxPreview",
  label: "Profit Lockbox",
  title: "Trading Profit Lockbox Preview",
  humanReadableSummary:
    "Trading profit lockbox preview shows realised-profit-only protection, protected profit, reinvestable profit, configurable lock percent, losing trades reduce active capital, and no guaranteed return without moving money, connecting brokers, or guaranteeing profits.",
  plannedInputs: ["Realised profit only", "Profitable closed trades only", "Protected profit bucket", "Reinvestable profit bucket", "Configurable lock percentage", "Example 20% realised profit protected and 80% reinvestable"],
  plannedOutputs: ["Profit lockbox concept", "Losing trades have no profit lock", "Losses reduce active capital", "No guaranteed profit note", "No guaranteed return note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-profit-lockbox",
    "Trading profit lockbox preview shows realised-profit-only protection protected profit reinvestable profit configurable lock percent losing trades reduce active capital and no guaranteed return.",
    "Trading profit lockbox preview does not move money connect brokers or guarantee profits.",
    "Trading profit lockbox preview requires explicit operator approval."
  ),
  state: "review-only",
});

const TRADING_MANDATE_DRAFT_PREVIEW = createSection({
  sectionId: "tradingMandateDraftPreview",
  label: "Trading Mandate Draft",
  title: "Trading Mandate Draft Preview",
  humanReadableSummary:
    "Trading mandate draft preview shows allocated capital, active capital, protected profit, reinvestable profit, max daily loss, max drawdown, max position risk, approved markets, approved symbols, approved strategies, paper-trade proof, backtest proof, kill switch, broker approval, and automation disabled in this batch.",
  plannedInputs: ["Allocated capital", "Active capital", "Protected profit", "Reinvestable profit", "Max daily loss", "Max drawdown", "Max position risk", "Approved markets", "Approved symbols", "Approved strategies"],
  plannedOutputs: ["Mandate draft", "Paper-trade proof required", "Backtest proof required", "Kill switch required", "Broker approval required", "Every future trade requires thesis evidence audit", "Automation disabled in this batch"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-mandate-draft",
    "Trading mandate draft preview shows allocated capital active capital protected profit reinvestable profit max daily loss max drawdown max position risk approved markets approved symbols approved strategies paper-trade proof backtest proof and kill switch.",
    "Trading mandate draft preview does not enable automation or trading.",
    "Trading mandate draft preview requires explicit operator approval."
  ),
  state: "needs-approval",
});

const BROKER_BOUNDARY_PREVIEW = createSection({
  sectionId: "brokerBoundaryPreview",
  label: "Broker Boundary",
  title: "Trading Broker Boundary Preview",
  humanReadableSummary:
    "Trading broker boundary preview shows future backend-owned broker approval, account boundary, credential boundary, order preview, risk gate, audit gate, kill switch, and denied broker paths without connecting brokers, reading accounts, submitting orders, or storing credentials from the UI.",
  plannedInputs: ["Future backend-owned broker approval", "Account boundary", "Credential boundary", "Order preview", "Risk gate", "Audit gate", "Kill switch", "Denied broker paths"],
  plannedOutputs: ["Broker boundary preview", "Credential storage denied path", "Order submission denied path", "Backend-owned approval requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-broker-boundary",
    "Trading broker boundary preview shows future backend-owned broker approval account boundary credential boundary order preview risk gate audit gate kill switch and denied broker paths.",
    "Trading broker boundary preview does not connect brokers read accounts submit orders or store credentials from the UI.",
    "Trading broker boundary preview requires explicit operator approval."
  ),
  state: "blocked",
});

const EVIDENCE_AUDIT_PREVIEW = createSection({
  sectionId: "evidenceAuditPreview",
  label: "Evidence Audit",
  title: "Trading Evidence Audit Preview",
  humanReadableSummary:
    "Trading evidence audit preview shows thesis evidence, risk evidence, backtest evidence, paper-trade evidence, broker approval evidence, result state, redaction, and audit continuity as backend-owned capture without persisting evidence or audit from the UI.",
  plannedInputs: ["Thesis evidence", "Risk evidence", "Backtest evidence", "Paper-trade evidence", "Broker approval evidence", "Result state", "Redaction", "Audit continuity"],
  plannedOutputs: ["Evidence audit preview", "Backend-owned capture requirement", "Redaction note", "Audit continuity note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-evidence-audit",
    "Trading evidence audit preview shows thesis evidence risk evidence backtest evidence paper-trade evidence broker approval evidence result state redaction and audit continuity.",
    "Trading evidence audit preview does not persist evidence or audit from the UI.",
    "Trading evidence audit preview requires backend-owned capture."
  ),
  state: "backend-owned",
});

const DENIED_TRADING_RESEARCH_BOUNDARIES = createSection({
  sectionId: "deniedTradingResearchBoundaries",
  label: "Denied Trading Research Boundaries",
  title: "Denied Trading Research Domain Paths",
  humanReadableSummary:
    "Denied trading research domain paths remain blocked across brokers, market data, live quotes, account access, order placement, paper trade placement, financial advice, personalised recommendations, executable signals, automatic trading activation, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, and browser storage writes from the frontend.",
  plannedInputs: ["Denied broker paths", "Denied market data paths", "Denied execution paths", "Denied persistence paths"],
  plannedOutputs: ["Denied path matrix", "Operator approval boundary", "Backend-owned workflow requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "denied-trading-research-boundaries",
    "Denied trading research domain paths remain blocked.",
    "Frontend trading execution, broker connection, market data calls, financial advice, persistence, prompt sending, and command execution remain denied.",
    "Explicit operator approval and backend-owned broker boundary remain required."
  ),
  state: "denied",
});

export const TRADING_RESEARCH_DOMAIN_MODEL: TradingResearchDomainModel = {
  tradingResearchDomainId: "trading-research-domain-pack-v1",
  tradingResearchDomainKind: "trading-research-domain-pack-v1",
  researchGoalIntake: RESEARCH_GOAL_INTAKE,
  watchlistPreview: WATCHLIST_PREVIEW,
  thesisBuilderPreview: THESIS_BUILDER_PREVIEW,
  catalystTrackerPreview: CATALYST_TRACKER_PREVIEW,
  riskNotesPreview: RISK_NOTES_PREVIEW,
  strategyCandidatePreview: STRATEGY_CANDIDATE_PREVIEW,
  backtestReadinessPreview: BACKTEST_READINESS_PREVIEW,
  paperTradeReadinessPreview: PAPER_TRADE_READINESS_PREVIEW,
  profitLockboxPreview: PROFIT_LOCKBOX_PREVIEW,
  tradingMandateDraftPreview: TRADING_MANDATE_DRAFT_PREVIEW,
  brokerBoundaryPreview: BROKER_BOUNDARY_PREVIEW,
  evidenceAuditPreview: EVIDENCE_AUDIT_PREVIEW,
  cockpitSummary: [
    {
      id: "cockpit-trading-research-summary",
      label: "Cockpit Trading Research Summary",
      detail:
        "Cockpit trading research summary keeps the cockpit as the normal user surface while showing research goal, watchlist, thesis, catalysts, risk, strategy candidates, backtest readiness, paper-trade readiness, profit lockbox, trading mandate, broker boundary, evidence, and audit.",
      state: "review-only",
    },
    {
      id: "cockpit-trading-denied-paths",
      label: "Cockpit denied paths",
      detail:
        "No broker connections from the cockpit, no trade placement from the cockpit, no live market data calls from the cockpit, no financial advice from the cockpit, and no guaranteed profit claims.",
      state: "blocked",
    },
    {
      id: "cockpit-trading-approval",
      label: "Cockpit approval",
      detail:
        "Paper trading required before automation, backtesting required before automation, risk governor required before automation, backend-owned broker boundary remains required, and explicit operator approval remains required.",
      state: "needs-approval",
    },
  ],
  deniedTradingResearchBoundaries: DENIED_TRADING_RESEARCH_BOUNDARIES,
  explicitSafetyLimits: [...EXPLICIT_SAFETY_LIMITS, ...TRADING_RESEARCH_DOMAIN_REQUIRED_SAFETY_MARKERS],
};

const SECTION_LOOKUP: Record<string, TradingResearchDomainSection> = {
  tradingResearchDomainBoundary: TRADING_BOUNDARY_PREVIEW,
  researchGoalIntake: RESEARCH_GOAL_INTAKE,
  watchlistPreview: WATCHLIST_PREVIEW,
  thesisBuilderPreview: THESIS_BUILDER_PREVIEW,
  catalystTrackerPreview: CATALYST_TRACKER_PREVIEW,
  riskNotesPreview: RISK_NOTES_PREVIEW,
  strategyCandidatePreview: STRATEGY_CANDIDATE_PREVIEW,
  backtestReadinessPreview: BACKTEST_READINESS_PREVIEW,
  paperTradeReadinessPreview: PAPER_TRADE_READINESS_PREVIEW,
  profitLockboxPreview: PROFIT_LOCKBOX_PREVIEW,
  tradingMandateDraftPreview: TRADING_MANDATE_DRAFT_PREVIEW,
  brokerBoundaryPreview: BROKER_BOUNDARY_PREVIEW,
  evidenceAuditPreview: EVIDENCE_AUDIT_PREVIEW,
  deniedTradingResearchBoundaries: DENIED_TRADING_RESEARCH_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "tradingResearchDomainBoundary",
  "researchGoalIntake",
  "watchlistPreview",
  "thesisBuilderPreview",
  "catalystTrackerPreview",
  "riskNotesPreview",
  "strategyCandidatePreview",
  "backtestReadinessPreview",
  "paperTradeReadinessPreview",
  "profitLockboxPreview",
  "tradingMandateDraftPreview",
  "brokerBoundaryPreview",
  "evidenceAuditPreview",
  "deniedTradingResearchBoundaries",
] as const;

const ROUTES: readonly TradingResearchDomainRouteDefinition[] = [
  {
    slug: "trading-research-domain-boundary",
    href: "/trading-research-domain-boundary",
    phase: "Phase 1642",
    title: "Trading Research Domain Boundary",
    commandLabel: "Go to Trading Research Domain Boundary",
    summary: "Defines the Trading Research Domain Pack boundary without frontend trading execution.",
    markerPhrases: [
      "Trading research domain boundary",
      "Trading research domain boundary does not connect brokers place trades fetch live market data or provide financial advice from the UI",
      "Trading research domain requires explicit operator approval before any future trading workflow",
      "Trading research domain prepares backend-owned research workflows without frontend trading execution",
      "Denied trading research domain paths remain blocked",
      "Trading research domain checklist",
    ],
    sectionIds: ["tradingResearchDomainBoundary", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-research-goal-intake-preview",
    href: "/trading-research-goal-intake-preview",
    phase: "Phase 1643",
    title: "Trading Research Goal Intake Preview",
    commandLabel: "Go to Trading Research Goal Intake Preview",
    summary: "Previews trading research goal intake without prompts, jobs, broker connection, or trade placement.",
    markerPhrases: [
      "Trading research goal intake preview",
      "Trading research goal intake preview does not send prompts create jobs connect brokers or place trades from the UI",
      "Trading research goal intake preview requires explicit operator approval",
      "Trading research goal intake preview captures research goal market interest timeframe risk tolerance watchlist hints done criteria evidence needs and paper-trade needs",
      "Denied trading research goal intake paths remain blocked",
      "Trading research goal intake checklist",
    ],
    sectionIds: ["researchGoalIntake", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-watchlist-preview",
    href: "/trading-watchlist-preview",
    phase: "Phase 1644",
    title: "Trading Watchlist Preview",
    commandLabel: "Go to Trading Watchlist Preview",
    summary: "Previews a review-only trading watchlist without live quote or market data calls.",
    markerPhrases: [
      "Trading watchlist preview",
      "Trading watchlist preview does not fetch live quotes or market data from the UI",
      "Trading watchlist preview requires explicit operator approval",
      "Trading watchlist preview shows review-only symbols themes sectors catalysts risk notes evidence needs and no personalised buy sell instruction",
      "Denied trading watchlist paths remain blocked",
      "Trading watchlist checklist",
    ],
    sectionIds: ["watchlistPreview", "researchGoalIntake", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-thesis-builder-preview",
    href: "/trading-thesis-builder-preview",
    phase: "Phase 1645",
    title: "Trading Thesis Builder Preview",
    commandLabel: "Go to Trading Thesis Builder Preview",
    summary: "Previews a trading thesis builder without financial advice or buy sell instruction.",
    markerPhrases: [
      "Trading thesis builder preview",
      "Trading thesis builder preview does not provide financial advice or buy sell instructions",
      "Trading thesis builder preview requires explicit operator approval",
      "Trading thesis builder preview shows thesis hypothesis counter-thesis catalyst evidence risk invalidation timeframe and review-only confidence notes",
      "Denied trading thesis paths remain blocked",
      "Trading thesis builder checklist",
    ],
    sectionIds: ["thesisBuilderPreview", "watchlistPreview", "evidenceAuditPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-catalyst-tracker-preview",
    href: "/trading-catalyst-tracker-preview",
    phase: "Phase 1646",
    title: "Trading Catalyst Tracker Preview",
    commandLabel: "Go to Trading Catalyst Tracker Preview",
    summary: "Previews catalyst tracking without news, earnings, filings, or live market data calls from the UI.",
    markerPhrases: [
      "Trading catalyst tracker preview",
      "Trading catalyst tracker preview does not fetch news earnings filings or live market data from the UI",
      "Trading catalyst tracker preview requires explicit operator approval",
      "Trading catalyst tracker preview shows planned catalyst categories earnings macro news product technical regulatory liquidity sentiment and evidence requirements",
      "Denied trading catalyst paths remain blocked",
      "Trading catalyst tracker checklist",
    ],
    sectionIds: ["catalystTrackerPreview", "thesisBuilderPreview", "evidenceAuditPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-risk-notes-preview",
    href: "/trading-risk-notes-preview",
    phase: "Phase 1647",
    title: "Trading Risk Notes Preview",
    commandLabel: "Go to Trading Risk Notes Preview",
    summary: "Previews trading risk notes without portfolio risk calculation or broker account access.",
    markerPhrases: [
      "Trading risk notes preview",
      "Trading risk notes preview does not calculate live portfolio risk or access broker accounts",
      "Trading risk notes preview requires explicit operator approval",
      "Trading risk notes preview shows max daily loss max drawdown position risk liquidity risk volatility risk correlation risk event risk and invalidation notes",
      "Denied trading risk notes paths remain blocked",
      "Trading risk notes checklist",
    ],
    sectionIds: ["riskNotesPreview", "tradingMandateDraftPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-strategy-candidate-preview",
    href: "/trading-strategy-candidate-preview",
    phase: "Phase 1648",
    title: "Trading Strategy Candidate Preview",
    commandLabel: "Go to Trading Strategy Candidate Preview",
    summary: "Previews trading strategy candidates without executable signals or order placement.",
    markerPhrases: [
      "Trading strategy candidate preview",
      "Trading strategy candidate preview does not execute signals or place orders",
      "Trading strategy candidate preview requires explicit operator approval",
      "Trading strategy candidate preview shows strategy idea entry logic exit logic risk controls required data backtest needs paper-trade needs and no executable signal state",
      "Denied trading strategy candidate paths remain blocked",
      "Trading strategy candidate checklist",
    ],
    sectionIds: ["strategyCandidatePreview", "backtestReadinessPreview", "paperTradeReadinessPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-backtest-readiness-preview",
    href: "/trading-backtest-readiness-preview",
    phase: "Phase 1649",
    title: "Trading Backtest Readiness Preview",
    commandLabel: "Go to Trading Backtest Readiness Preview",
    summary: "Previews backtest readiness without running backtests from the UI.",
    markerPhrases: [
      "Trading backtest readiness preview",
      "Trading backtest readiness preview does not run backtests from the UI",
      "Trading backtest readiness preview requires explicit operator approval",
      "Trading backtest readiness preview shows dataset needs assumptions fees slippage survivorship bias sample period metrics edge cases and backend-owned backtest boundary",
      "Denied trading backtest readiness paths remain blocked",
      "Trading backtest readiness checklist",
    ],
    sectionIds: ["backtestReadinessPreview", "strategyCandidatePreview", "evidenceAuditPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-paper-trade-readiness-preview",
    href: "/trading-paper-trade-readiness-preview",
    phase: "Phase 1650",
    title: "Trading Paper Trade Readiness Preview",
    commandLabel: "Go to Trading Paper Trade Readiness Preview",
    summary: "Previews paper trade readiness without placing paper trades from the UI.",
    markerPhrases: [
      "Trading paper trade readiness preview",
      "Trading paper trade readiness preview does not place paper trades from the UI",
      "Trading paper trade readiness preview requires explicit operator approval",
      "Trading paper trade readiness preview shows paper account boundary fake capital trade journal evidence metrics operator review and no live order placement",
      "Denied trading paper trade paths remain blocked",
      "Trading paper trade readiness checklist",
    ],
    sectionIds: ["paperTradeReadinessPreview", "backtestReadinessPreview", "evidenceAuditPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-profit-lockbox-preview",
    href: "/trading-profit-lockbox-preview",
    phase: "Phase 1651",
    title: "Trading Profit Lockbox Preview",
    commandLabel: "Go to Trading Profit Lockbox Preview",
    summary: "Previews the realised-profit-only profit lockbox concept without moving money or guaranteeing profits.",
    markerPhrases: [
      "Trading profit lockbox preview",
      "Trading profit lockbox preview does not move money connect brokers or guarantee profits",
      "Trading profit lockbox preview requires explicit operator approval",
      "Trading profit lockbox preview shows realised-profit-only protection protected profit reinvestable profit configurable lock percent losing trades reduce active capital and no guaranteed return",
      "Denied trading profit lockbox paths remain blocked",
      "Trading profit lockbox checklist",
    ],
    sectionIds: ["profitLockboxPreview", "tradingMandateDraftPreview", "riskNotesPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-mandate-draft-preview",
    href: "/trading-mandate-draft-preview",
    phase: "Phase 1652",
    title: "Trading Mandate Draft Preview",
    commandLabel: "Go to Trading Mandate Draft Preview",
    summary: "Previews a capital-limited trading mandate draft without enabling automation or trading.",
    markerPhrases: [
      "Trading mandate draft preview",
      "Trading mandate draft preview does not enable automation or trading",
      "Trading mandate draft preview requires explicit operator approval",
      "Trading mandate draft preview shows allocated capital active capital protected profit reinvestable profit max daily loss max drawdown max position risk approved markets approved symbols approved strategies paper-trade proof backtest proof and kill switch",
      "Denied trading mandate paths remain blocked",
      "Trading mandate draft checklist",
    ],
    sectionIds: ["tradingMandateDraftPreview", "profitLockboxPreview", "riskNotesPreview", "brokerBoundaryPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-broker-boundary-preview",
    href: "/trading-broker-boundary-preview",
    phase: "Phase 1653",
    title: "Trading Broker Boundary Preview",
    commandLabel: "Go to Trading Broker Boundary Preview",
    summary: "Previews future backend-owned broker approval boundaries without broker connection, account reads, orders, or credentials.",
    markerPhrases: [
      "Trading broker boundary preview",
      "Trading broker boundary preview does not connect brokers read accounts submit orders or store credentials from the UI",
      "Trading broker boundary preview requires explicit operator approval",
      "Trading broker boundary preview shows future backend-owned broker approval account boundary credential boundary order preview risk gate audit gate kill switch and denied broker paths",
      "Denied trading broker boundary paths remain blocked",
      "Trading broker boundary checklist",
    ],
    sectionIds: ["brokerBoundaryPreview", "tradingMandateDraftPreview", "evidenceAuditPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-evidence-audit-preview",
    href: "/trading-evidence-audit-preview",
    phase: "Phase 1654",
    title: "Trading Evidence Audit Preview",
    commandLabel: "Go to Trading Evidence Audit Preview",
    summary: "Previews trading evidence and audit continuity as backend-owned capture without frontend persistence.",
    markerPhrases: [
      "Trading evidence audit preview",
      "Trading evidence audit preview does not persist evidence or audit from the UI",
      "Trading evidence audit preview requires backend-owned capture",
      "Trading evidence audit preview shows thesis evidence risk evidence backtest evidence paper-trade evidence broker approval evidence result state redaction and audit continuity",
      "Denied trading evidence audit paths remain blocked",
      "Trading evidence audit checklist",
    ],
    sectionIds: ["evidenceAuditPreview", "thesisBuilderPreview", "riskNotesPreview", "backtestReadinessPreview", "paperTradeReadinessPreview", "brokerBoundaryPreview", "deniedTradingResearchBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-trading-research-summary",
    href: "/cockpit-trading-research-summary",
    phase: "Phase 1655",
    title: "Cockpit Trading Research Summary",
    commandLabel: "Go to Cockpit Trading Research Summary",
    summary: "Summarizes the safe trading research domain pack in the normal cockpit surface.",
    markerPhrases: [
      "Cockpit trading research summary",
      "Cockpit trading research summary keeps the cockpit as the normal user surface",
      "Cockpit trading research summary does not connect brokers place trades fetch live market data provide financial advice run backtests place paper trades or automate trading from the cockpit",
      "Cockpit trading research summary shows research goal watchlist thesis catalysts risk strategy candidates backtest readiness paper-trade readiness profit lockbox trading mandate broker boundary evidence and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit trading research checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-trading-research-domain-candidate",
    href: "/first-trading-research-domain-candidate",
    phase: "Phase 1656",
    title: "First Trading Research Domain Candidate",
    commandLabel: "Go to First Trading Research Domain Candidate",
    summary: "Combines the first safe Trading Research Domain candidate without executing trading workflows from the UI.",
    markerPhrases: [
      "First trading research domain candidate",
      "First trading research domain candidate does not execute trading workflows from the UI",
      "First trading research domain candidate requires explicit operator approval",
      "Candidate combines research goal watchlist thesis catalysts risk notes strategy candidates backtest readiness paper-trade readiness profit lockbox mandate draft broker boundary evidence audit cockpit summary and denied trading paths",
      "Denied first trading research domain paths remain blocked",
      "First trading research domain checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-trading-research-domain-release-candidate",
    href: "/controlled-trading-research-domain-release-candidate",
    phase: "Phase 1657",
    title: "Controlled Trading Research Domain Release Candidate",
    commandLabel: "Go to Controlled Trading Research Domain Release Candidate",
    summary: "Controlled Trading Research Domain release candidate prepares backend-owned trading research workflows without frontend trading execution.",
    markerPhrases: [
      "Controlled trading research domain release candidate",
      "Controlled trading research domain release candidate does not connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled trading research domain release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned trading research workflows without frontend trading execution",
      "Denied controlled trading research domain paths remain blocked",
      "Controlled trading research domain release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listTradingResearchDomainRouteDefinitions(): readonly TradingResearchDomainRouteDefinition[] {
  return ROUTES;
}

export function getTradingResearchDomainRouteDefinition(
  slug: TradingResearchDomainRouteSlug
): TradingResearchDomainRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildTradingResearchDomainRouteModel(
  slug: TradingResearchDomainRouteSlug = "controlled-trading-research-domain-release-candidate"
): TradingResearchDomainRouteModel {
  const route = getTradingResearchDomainRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is TradingResearchDomainSection => Boolean(section));

  return {
    route,
    tradingResearchDomain: TRADING_RESEARCH_DOMAIN_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: TRADING_RESEARCH_DOMAIN_COCKPIT_MARKERS,
    summary: summarizeTradingResearchDomainRoute(route, sections),
  };
}

export function buildTradingResearchDomainModel(): TradingResearchDomainRouteModel {
  return buildTradingResearchDomainRouteModel("controlled-trading-research-domain-release-candidate");
}

export function summarizeTradingResearchDomainRoute(
  route: TradingResearchDomainRouteDefinition,
  sections: readonly TradingResearchDomainSection[]
): string {
  return `${route.title} keeps ${sections.length} trading research sections static, deterministic, research-only, review-only, approval-required, backend-owned, and blocked from frontend broker connection, trade placement, live market data calls, financial advice, personalised recommendation, buy sell instruction, automated execution, backtest execution, paper trade placement, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, browser storage writes, credential storage, and guaranteed profit claims.`;
}

export function buildTradingResearchDomainStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
