export type BacktestPaperTradingEngineRouteSlug =
  | "backtest-paper-trading-boundary"
  | "dataset-requirement-preview"
  | "historical-data-quality-preview"
  | "fees-slippage-assumption-preview"
  | "survivorship-bias-check-preview"
  | "sample-period-definition-preview"
  | "backtest-metric-definition-preview"
  | "backtest-run-packet-preview"
  | "backtest-result-review-preview"
  | "paper-account-boundary-preview"
  | "paper-trade-journal-preview"
  | "paper-trading-metrics-preview"
  | "paper-evidence-map-preview"
  | "cockpit-backtest-paper-summary"
  | "first-backtest-paper-trading-candidate"
  | "controlled-backtest-paper-trading-release-candidate";

export type BacktestPaperTradingEngineKind =
  | "backtest-paper-trading-engine-v1"
  | BacktestPaperTradingEngineRouteSlug;

export type BacktestPaperTradingEngineState =
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "candidate"
  | "release-candidate";

export type BacktestPaperTradingEngineItem = {
  id: string;
  label: string;
  detail: string;
  state: BacktestPaperTradingEngineState;
};

export type BacktestPaperTradingEngineSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly BacktestPaperTradingEngineItem[];
  state: BacktestPaperTradingEngineState;
};

export type BacktestPaperTradingEngineModel = {
  backtestPaperTradingEngineId: string;
  backtestPaperTradingEngineKind: BacktestPaperTradingEngineKind;
  datasetRequirement: BacktestPaperTradingEngineSection;
  historicalDataQuality: BacktestPaperTradingEngineSection;
  feesSlippageAssumption: BacktestPaperTradingEngineSection;
  survivorshipBiasCheck: BacktestPaperTradingEngineSection;
  samplePeriodDefinition: BacktestPaperTradingEngineSection;
  backtestMetricDefinition: BacktestPaperTradingEngineSection;
  backtestRunPacket: BacktestPaperTradingEngineSection;
  backtestResultReview: BacktestPaperTradingEngineSection;
  paperAccountBoundary: BacktestPaperTradingEngineSection;
  paperTradeJournal: BacktestPaperTradingEngineSection;
  paperTradingMetrics: BacktestPaperTradingEngineSection;
  paperEvidenceMap: BacktestPaperTradingEngineSection;
  deniedBacktestPaperBoundaries: BacktestPaperTradingEngineSection;
  cockpitSummary: readonly BacktestPaperTradingEngineItem[];
  explicitSafetyLimits: readonly string[];
};

export type BacktestPaperTradingEngineRouteDefinition = {
  slug: BacktestPaperTradingEngineRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type BacktestPaperTradingEngineRouteModel = {
  route: BacktestPaperTradingEngineRouteDefinition;
  backtestPaperTradingEngine: BacktestPaperTradingEngineModel;
  sections: readonly BacktestPaperTradingEngineSection[];
  diagnosticRoutes: readonly BacktestPaperTradingEngineRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const BACKTEST_PAPER_TRADING_ENGINE_COCKPIT_MARKERS = [
  "Backtest Paper Trading Engine",
  "Backtest Engine",
  "Paper Trading Engine",
  "Dataset Requirement",
  "Historical Data Quality",
  "Fees Slippage Assumption",
  "Survivorship Bias Check",
  "Sample Period Definition",
  "Backtest Metric Definition",
  "Backtest Run Packet",
  "Backtest Result Review",
  "Paper Account Boundary",
  "Paper Trade Journal",
  "Paper Trading Metrics",
  "Paper Evidence Map",
  "No live market data calls from the cockpit",
  "No real backtest execution from the cockpit",
  "No paper trade placement from the cockpit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No guaranteed profit claims",
  "No trading automation from the cockpit",
  "Backtesting remains backend-owned",
  "Paper trading remains backend-owned",
  "Risk governor remains required",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Backtest Paper Trading Engine v1 is review-only from the frontend.",
  "It is not live trading, broker integration, live market data, financial advice, personalised investment recommendation, buy sell instruction, automated trading, signal execution, order placement, UI backtest execution, UI paper-trade placement, account access, portfolio access, or money movement.",
  "The cockpit does not run backtests, place paper trades, connect brokers, place trades, fetch live market data, provide financial advice, provide personalised recommendations, issue buy sell instructions, automate trading, size orders, monitor live accounts, move money, dispatch workers, call models, call providers, call connectors, send prompts, run commands, write files, persist approvals, persist evidence, persist audit, create queues, create transactions, store credentials, or write browser storage.",
  "Backtesting remains backend-owned.",
  "Paper trading remains backend-owned.",
  "Risk governor remains required.",
  "Backend-owned broker boundary remains required.",
  "Explicit operator approval remains required.",
  "No guaranteed profit claims are allowed.",
] as const;

const REQUIRED_SAFETY_MARKERS = [
  "dataset requirements",
  "historical data quality",
  "fees slippage assumptions",
  "survivorship bias checks",
  "sample period definitions",
  "backtest metric definitions",
  "backtest run packets",
  "backtest result reviews",
  "paper account boundary",
  "paper trade journal",
  "paper trading metrics",
  "paper evidence map",
  "operator approval gates",
  "risk governor prerequisite",
  "backend-owned broker boundary prerequisite",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review cards only.",
  "Future backtest and paper trading workflows remain backend-owned, approval-gated, evidence-backed, risk-governed, and outside direct frontend execution.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, paper-trade placement, real backtest execution, or guaranteed profit claim.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No live market data calls, dataset downloads, real backtest execution, paper trade placement, broker connection, broker account access, portfolio access, credential storage, endpoint storage, live quote fetching, market data API calls, exchange API calls, trade placement, automated execution, signal execution, order sizing, live account monitoring, money movement, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, browser storage writes, approval persistence, evidence persistence, audit persistence, result persistence, queue creation, transaction creation, or worker dispatch from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Risk governor remains required before any future backtest or paper trading workflow.",
  "Backend-owned broker boundary remains required before any future broker-adjacent workflow.",
  "Backtesting remains backend-owned.",
  "Paper trading remains backend-owned.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly BacktestPaperTradingEngineItem[] {
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
  state?: BacktestPaperTradingEngineState;
}): BacktestPaperTradingEngineSection {
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

const BACKTEST_PAPER_TRADING_BOUNDARY = createSection({
  sectionId: "backtestPaperTradingBoundary",
  label: "Backtest Paper Trading Boundary",
  title: "Backtest Paper Trading Boundary",
  humanReadableSummary:
    "Backtest paper trading boundary keeps backtest and paper trading planning review-only, with real backtest execution, paper trade placement, broker connection, live market data calls, financial advice, personalised recommendations, buy sell instructions, and automation blocked from the UI.",
  plannedInputs: ["Backtest Engine boundary", "Paper Trading Engine boundary", "Denied backtest paper trading paths", "Backend-owned workflow prerequisites"],
  plannedOutputs: ["Boundary statement", "Operator approval requirement", "Backend-owned workflow preview", "Denied backtest paper trading paths"],
  checklistPrefix: "backtest-paper-trading-boundary",
  checklistSummary:
    "Backtest paper trading boundary prepares backend-owned backtest and paper trading workflows without frontend trading execution.",
  blocked:
    "Backtest paper trading boundary does not run backtests place paper trades connect brokers fetch live market data provide financial advice or enable automation from the UI.",
  approval:
    "Backtest paper trading boundary requires explicit operator approval before any future backtest or paper trading workflow.",
  state: "blocked",
});

const DATASET_REQUIREMENT = createSection({
  sectionId: "datasetRequirement",
  label: "Dataset Requirement",
  title: "Dataset Requirement Preview",
  humanReadableSummary:
    "Dataset requirement preview shows required symbols, timeframe, candles, corporate actions, splits, dividends, fees, slippage, and source approval needs without fetching live market data, downloading datasets, or running backtests from the UI.",
  plannedInputs: ["Required symbols", "Timeframe", "Candles", "Corporate actions", "Splits", "Dividends", "Fees", "Slippage", "Source approval needs"],
  plannedOutputs: ["Dataset Requirement", "Source approval needs", "Data completeness needs", "Denied dataset requirement paths"],
  checklistPrefix: "dataset-requirement",
  checklistSummary:
    "Dataset requirement preview shows required symbols timeframe candles corporate actions splits dividends fees slippage and source approval needs.",
  blocked:
    "Dataset requirement preview does not fetch live market data download datasets or run backtests from the UI.",
  approval: "Dataset requirement preview requires explicit operator approval.",
});

const HISTORICAL_DATA_QUALITY = createSection({
  sectionId: "historicalDataQuality",
  label: "Historical Data Quality",
  title: "Historical Data Quality Preview",
  humanReadableSummary:
    "Historical data quality preview shows missing bars, stale data, outliers, timezone alignment, corporate action adjustment, duplicate rows, and backend-owned validation boundary without validating live feeds or calling market data APIs from the UI.",
  plannedInputs: ["Missing bars", "Stale data", "Outliers", "Timezone alignment", "Corporate action adjustment", "Duplicate rows", "Backend-owned validation boundary"],
  plannedOutputs: ["Historical Data Quality", "Data quality caveats", "Backend-owned validation boundary", "Denied historical data quality paths"],
  checklistPrefix: "historical-data-quality",
  checklistSummary:
    "Historical data quality preview shows missing bars stale data outliers timezone alignment corporate action adjustment duplicate rows and backend-owned validation boundary.",
  blocked:
    "Historical data quality preview does not validate live feeds or call market data APIs from the UI.",
  approval: "Historical data quality preview requires explicit operator approval.",
  state: "backend-owned",
});

const FEES_SLIPPAGE_ASSUMPTION = createSection({
  sectionId: "feesSlippageAssumption",
  label: "Fees Slippage Assumption",
  title: "Fees Slippage Assumption Preview",
  humanReadableSummary:
    "Fees slippage assumption preview shows commission assumptions, spread assumptions, slippage assumptions, liquidity caveats, fill model caveats, and conservative result adjustment without calculating live execution costs or accessing broker accounts.",
  plannedInputs: ["Commission assumptions", "Spread assumptions", "Slippage assumptions", "Liquidity caveats", "Fill model caveats", "Conservative result adjustment"],
  plannedOutputs: ["Fees Slippage Assumption", "Conservative adjustment notes", "Fill model caveats", "Denied fees slippage paths"],
  checklistPrefix: "fees-slippage-assumption",
  checklistSummary:
    "Fees slippage assumption preview shows commission assumptions spread assumptions slippage assumptions liquidity caveats fill model caveats and conservative result adjustment.",
  blocked:
    "Fees slippage assumption preview does not calculate live execution costs or access broker accounts.",
  approval: "Fees slippage assumption preview requires explicit operator approval.",
});

const SURVIVORSHIP_BIAS_CHECK = createSection({
  sectionId: "survivorshipBiasCheck",
  label: "Survivorship Bias Check",
  title: "Survivorship Bias Check Preview",
  humanReadableSummary:
    "Survivorship bias check preview shows universe history, delisted assets, symbol changes, corporate actions, lookahead risk, and data provider requirement without fetching delisted symbols or external datasets from the UI.",
  plannedInputs: ["Universe history", "Delisted assets", "Symbol changes", "Corporate actions", "Lookahead risk", "Data provider requirement"],
  plannedOutputs: ["Survivorship Bias Check", "Lookahead risk notes", "Data provider requirement", "Denied survivorship bias paths"],
  checklistPrefix: "survivorship-bias-check",
  checklistSummary:
    "Survivorship bias check preview shows universe history delisted assets symbol changes corporate actions lookahead risk and data provider requirement.",
  blocked:
    "Survivorship bias check preview does not fetch delisted symbols or external datasets from the UI.",
  approval: "Survivorship bias check preview requires explicit operator approval.",
  state: "backend-owned",
});

const SAMPLE_PERIOD_DEFINITION = createSection({
  sectionId: "samplePeriodDefinition",
  label: "Sample Period Definition",
  title: "Sample Period Definition Preview",
  humanReadableSummary:
    "Sample period definition preview shows in-sample window, out-of-sample window, warmup window, market regimes, volatility regimes, and validation split notes without running sample analysis or fetching historical data from the UI.",
  plannedInputs: ["In-sample window", "Out-of-sample window", "Warmup window", "Market regimes", "Volatility regimes", "Validation split notes"],
  plannedOutputs: ["Sample Period Definition", "Validation split notes", "Regime caveats", "Denied sample period paths"],
  checklistPrefix: "sample-period-definition",
  checklistSummary:
    "Sample period definition preview shows in-sample window out-of-sample window warmup window market regimes volatility regimes and validation split notes.",
  blocked:
    "Sample period definition preview does not run sample analysis or fetch historical data from the UI.",
  approval: "Sample period definition preview requires explicit operator approval.",
});

const BACKTEST_METRIC_DEFINITION = createSection({
  sectionId: "backtestMetricDefinition",
  label: "Backtest Metric Definition",
  title: "Backtest Metric Definition Preview",
  humanReadableSummary:
    "Backtest metric definition preview shows return, drawdown, win rate, loss rate, expectancy, volatility, Sharpe caveat, trade count, and no guaranteed profit claim without computing live metrics or claiming profitability.",
  plannedInputs: ["Return", "Drawdown", "Win rate", "Loss rate", "Expectancy", "Volatility", "Sharpe caveat", "Trade count", "No guaranteed profit claim"],
  plannedOutputs: ["Backtest Metric Definition", "Metric caveats", "Trade count expectation", "Denied backtest metric paths"],
  checklistPrefix: "backtest-metric-definition",
  checklistSummary:
    "Backtest metric definition preview shows return drawdown win rate loss rate expectancy volatility Sharpe caveat trade count and no guaranteed profit claim.",
  blocked:
    "Backtest metric definition preview does not compute live metrics or claim profitability.",
  approval: "Backtest metric definition preview requires explicit operator approval.",
});

const BACKTEST_RUN_PACKET = createSection({
  sectionId: "backtestRunPacket",
  label: "Backtest Run Packet",
  title: "Backtest Run Packet Preview",
  humanReadableSummary:
    "Backtest run packet preview shows strategy reference, dataset reference, sample period, fees, slippage, risk settings, metrics requested, evidence needs, and backend-owned run boundary without running backtests, executing signals, or writing result files from the UI.",
  plannedInputs: ["Strategy reference", "Dataset reference", "Sample period", "Fees", "Slippage", "Risk settings", "Metrics requested", "Evidence needs"],
  plannedOutputs: ["Backtest Run Packet", "Backend-owned run boundary", "Evidence needs", "Denied backtest run packet paths"],
  checklistPrefix: "backtest-run-packet",
  checklistSummary:
    "Backtest run packet preview shows strategy reference dataset reference sample period fees slippage risk settings metrics requested evidence needs and backend-owned run boundary.",
  blocked:
    "Backtest run packet preview does not run backtests execute signals or write result files from the UI.",
  approval: "Backtest run packet preview requires explicit operator approval.",
  state: "backend-owned",
});

const BACKTEST_RESULT_REVIEW = createSection({
  sectionId: "backtestResultReview",
  label: "Backtest Result Review",
  title: "Backtest Result Review Preview",
  humanReadableSummary:
    "Backtest result review preview shows result summary, metric caveats, drawdown review, sample caveats, overfit warning, evidence links, and manual acceptance boundary without persisting results, audit evidence, or trading decisions from the UI.",
  plannedInputs: ["Result summary", "Metric caveats", "Drawdown review", "Sample caveats", "Overfit warning", "Evidence links", "Manual acceptance boundary"],
  plannedOutputs: ["Backtest Result Review", "Manual acceptance boundary", "Overfit warning", "Denied backtest result review paths"],
  checklistPrefix: "backtest-result-review",
  checklistSummary:
    "Backtest result review preview shows result summary metric caveats drawdown review sample caveats overfit warning evidence links and manual acceptance boundary.",
  blocked:
    "Backtest result review preview does not persist results audit evidence or trading decisions from the UI.",
  approval: "Backtest result review preview requires backend-owned capture.",
  state: "backend-owned",
});

const PAPER_ACCOUNT_BOUNDARY = createSection({
  sectionId: "paperAccountBoundary",
  label: "Paper Account Boundary",
  title: "Paper Account Boundary Preview",
  humanReadableSummary:
    "Paper account boundary preview shows fake capital, account scope, paper environment, credential boundary, order preview boundary, risk gate, audit gate, and denied account paths without creating accounts, connecting brokers, placing paper trades, or storing credentials from the UI.",
  plannedInputs: ["Fake capital", "Account scope", "Paper environment", "Credential boundary", "Order preview boundary", "Risk gate", "Audit gate", "Denied account paths"],
  plannedOutputs: ["Paper Account Boundary", "Credential boundary", "Risk gate", "Audit gate"],
  checklistPrefix: "paper-account-boundary",
  checklistSummary:
    "Paper account boundary preview shows fake capital account scope paper environment credential boundary order preview boundary risk gate audit gate and denied account paths.",
  blocked:
    "Paper account boundary preview does not create accounts connect brokers place paper trades or store credentials from the UI.",
  approval: "Paper account boundary preview requires explicit operator approval.",
  state: "blocked",
});

const PAPER_TRADE_JOURNAL = createSection({
  sectionId: "paperTradeJournal",
  label: "Paper Trade Journal",
  title: "Paper Trade Journal Preview",
  humanReadableSummary:
    "Paper trade journal preview shows trade thesis, planned entry, planned exit, stop concept, target concept, result placeholder, emotion note, evidence needs, and manual review without placing paper trades, persisting journal entries, or executing signals from the UI.",
  plannedInputs: ["Trade thesis", "Planned entry", "Planned exit", "Stop concept", "Target concept", "Result placeholder", "Emotion note", "Evidence needs", "Manual review"],
  plannedOutputs: ["Paper Trade Journal", "Manual review", "Evidence needs", "Denied paper trade journal paths"],
  checklistPrefix: "paper-trade-journal",
  checklistSummary:
    "Paper trade journal preview shows trade thesis planned entry planned exit stop concept target concept result placeholder emotion note evidence needs and manual review.",
  blocked:
    "Paper trade journal preview does not place paper trades persist journal entries or execute signals from the UI.",
  approval: "Paper trade journal preview requires explicit operator approval.",
});

const PAPER_TRADING_METRICS = createSection({
  sectionId: "paperTradingMetrics",
  label: "Paper Trading Metrics",
  title: "Paper Trading Metrics Preview",
  humanReadableSummary:
    "Paper trading metrics preview shows paper win rate, paper loss rate, expectancy, drawdown, adherence, slippage notes, strategy drift, and evidence requirements without computing live paper metrics or accessing broker accounts.",
  plannedInputs: ["Paper win rate", "Paper loss rate", "Expectancy", "Drawdown", "Adherence", "Slippage notes", "Strategy drift", "Evidence requirements"],
  plannedOutputs: ["Paper Trading Metrics", "Adherence notes", "Strategy drift", "Denied paper trading metrics paths"],
  checklistPrefix: "paper-trading-metrics",
  checklistSummary:
    "Paper trading metrics preview shows paper win rate paper loss rate expectancy drawdown adherence slippage notes strategy drift and evidence requirements.",
  blocked:
    "Paper trading metrics preview does not compute live paper metrics or access broker accounts.",
  approval: "Paper trading metrics preview requires explicit operator approval.",
});

const PAPER_EVIDENCE_MAP = createSection({
  sectionId: "paperEvidenceMap",
  label: "Paper Evidence Map",
  title: "Paper Evidence Map Preview",
  humanReadableSummary:
    "Paper evidence map preview shows strategy evidence, dataset evidence, backtest evidence, paper trade evidence, risk evidence, approval evidence, result state, redaction, and audit continuity without persisting evidence, audit results, or paper trading decisions from the UI.",
  plannedInputs: ["Strategy evidence", "Dataset evidence", "Backtest evidence", "Paper trade evidence", "Risk evidence", "Approval evidence", "Result state", "Redaction", "Audit continuity"],
  plannedOutputs: ["Paper Evidence Map", "Audit continuity", "Redaction", "Denied paper evidence map paths"],
  checklistPrefix: "paper-evidence-map",
  checklistSummary:
    "Paper evidence map preview shows strategy evidence dataset evidence backtest evidence paper trade evidence risk evidence approval evidence result state redaction and audit continuity.",
  blocked:
    "Paper evidence map preview does not persist evidence audit results or paper trading decisions from the UI.",
  approval: "Paper evidence map preview requires backend-owned capture.",
  state: "backend-owned",
});

const DENIED_BACKTEST_PAPER_BOUNDARIES = createSection({
  sectionId: "deniedBacktestPaperBoundaries",
  label: "Denied Backtest Paper Boundaries",
  title: "Denied Backtest Paper Trading Paths",
  humanReadableSummary:
    "Denied backtest paper trading paths remain blocked across real backtest execution, paper trade placement, broker connection, live market data calls, trade placement, financial advice, personalised recommendations, buy sell instructions, guaranteed profit claims, and trading automation from the cockpit.",
  plannedInputs: ["Denied execution paths", "Denied broker paths", "Denied data paths", "Denied advice paths", "Denied persistence paths"],
  plannedOutputs: ["Denied backtest paper trading paths", "Explicit blocked state", "Backend-owned prerequisites", "Operator approval gates"],
  checklistPrefix: "denied-backtest-paper",
  checklistSummary:
    "Denied backtest paper trading paths remain blocked until backend-owned workflows, risk governor, broker boundary, evidence capture, audit continuity, and explicit operator approval exist.",
  blocked:
    "Denied backtest paper trading paths remain blocked for frontend backtest execution, paper trade placement, broker connection, live market data calls, executable signals, financial advice, personalised recommendations, buy sell instructions, guaranteed profit claims, and automation.",
  approval: "Denied backtest paper trading paths require explicit operator approval and backend-owned capture before any future workflow.",
  state: "denied",
});

export const BACKTEST_PAPER_TRADING_ENGINE_MODEL: BacktestPaperTradingEngineModel = {
  backtestPaperTradingEngineId: "backtest-paper-trading-engine-v1",
  backtestPaperTradingEngineKind: "backtest-paper-trading-engine-v1",
  datasetRequirement: DATASET_REQUIREMENT,
  historicalDataQuality: HISTORICAL_DATA_QUALITY,
  feesSlippageAssumption: FEES_SLIPPAGE_ASSUMPTION,
  survivorshipBiasCheck: SURVIVORSHIP_BIAS_CHECK,
  samplePeriodDefinition: SAMPLE_PERIOD_DEFINITION,
  backtestMetricDefinition: BACKTEST_METRIC_DEFINITION,
  backtestRunPacket: BACKTEST_RUN_PACKET,
  backtestResultReview: BACKTEST_RESULT_REVIEW,
  paperAccountBoundary: PAPER_ACCOUNT_BOUNDARY,
  paperTradeJournal: PAPER_TRADE_JOURNAL,
  paperTradingMetrics: PAPER_TRADING_METRICS,
  paperEvidenceMap: PAPER_EVIDENCE_MAP,
  deniedBacktestPaperBoundaries: DENIED_BACKTEST_PAPER_BOUNDARIES,
  cockpitSummary: [
    {
      id: "dataset-quality",
      label: "Dataset and quality preview",
      detail:
        "Dataset Requirement, Historical Data Quality, Fees Slippage Assumption, Survivorship Bias Check, and Sample Period Definition stay review-only.",
      state: "review-only",
    },
    {
      id: "backend-owned-backtest",
      label: "Backend-owned backtest packet",
      detail:
        "Backtest Metric Definition, Backtest Run Packet, and Backtest Result Review prepare backend-owned capture without frontend execution.",
      state: "backend-owned",
    },
    {
      id: "paper-boundary",
      label: "Paper trading boundary",
      detail:
        "Paper Account Boundary, Paper Trade Journal, Paper Trading Metrics, and Paper Evidence Map remain review-only with no broker connection or paper trade placement.",
      state: "blocked",
    },
    {
      id: "operator-approval",
      label: "Operator approval required",
      detail:
        "Risk governor, backend-owned broker boundary, backend-owned capture, and explicit operator approval remain required for any future workflow.",
      state: "needs-approval",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, BacktestPaperTradingEngineSection> = {
  backtestPaperTradingBoundary: BACKTEST_PAPER_TRADING_BOUNDARY,
  datasetRequirement: DATASET_REQUIREMENT,
  historicalDataQuality: HISTORICAL_DATA_QUALITY,
  feesSlippageAssumption: FEES_SLIPPAGE_ASSUMPTION,
  survivorshipBiasCheck: SURVIVORSHIP_BIAS_CHECK,
  samplePeriodDefinition: SAMPLE_PERIOD_DEFINITION,
  backtestMetricDefinition: BACKTEST_METRIC_DEFINITION,
  backtestRunPacket: BACKTEST_RUN_PACKET,
  backtestResultReview: BACKTEST_RESULT_REVIEW,
  paperAccountBoundary: PAPER_ACCOUNT_BOUNDARY,
  paperTradeJournal: PAPER_TRADE_JOURNAL,
  paperTradingMetrics: PAPER_TRADING_METRICS,
  paperEvidenceMap: PAPER_EVIDENCE_MAP,
  deniedBacktestPaperBoundaries: DENIED_BACKTEST_PAPER_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "backtestPaperTradingBoundary",
  "datasetRequirement",
  "historicalDataQuality",
  "feesSlippageAssumption",
  "survivorshipBiasCheck",
  "samplePeriodDefinition",
  "backtestMetricDefinition",
  "backtestRunPacket",
  "backtestResultReview",
  "paperAccountBoundary",
  "paperTradeJournal",
  "paperTradingMetrics",
  "paperEvidenceMap",
  "deniedBacktestPaperBoundaries",
] as const;

const ROUTES: readonly BacktestPaperTradingEngineRouteDefinition[] = [
  {
    slug: "backtest-paper-trading-boundary",
    href: "/backtest-paper-trading-boundary",
    phase: "Phase 1690",
    title: "Backtest Paper Trading Boundary",
    commandLabel: "Go to Backtest Paper Trading Boundary",
    summary: "Defines the Backtest Paper Trading Engine boundary without frontend backtest execution, paper trade placement, broker access, market data calls, advice, or automation.",
    markerPhrases: [
      "Backtest paper trading boundary",
      "Backtest paper trading boundary does not run backtests place paper trades connect brokers fetch live market data provide financial advice or enable automation from the UI",
      "Backtest paper trading boundary requires explicit operator approval before any future backtest or paper trading workflow",
      "Backtest paper trading boundary prepares backend-owned backtest and paper trading workflows without frontend trading execution",
      "Denied backtest paper trading paths remain blocked",
      "Backtest paper trading boundary checklist",
    ],
    sectionIds: ["backtestPaperTradingBoundary", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "dataset-requirement-preview",
    href: "/dataset-requirement-preview",
    phase: "Phase 1691",
    title: "Dataset Requirement Preview",
    commandLabel: "Go to Dataset Requirement Preview",
    summary: "Previews dataset requirements without live market data fetching, dataset downloads, or UI backtest execution.",
    markerPhrases: [
      "Dataset requirement preview",
      "Dataset requirement preview does not fetch live market data download datasets or run backtests from the UI",
      "Dataset requirement preview requires explicit operator approval",
      "Dataset requirement preview shows required symbols timeframe candles corporate actions splits dividends fees slippage and source approval needs",
      "Denied dataset requirement paths remain blocked",
      "Dataset requirement checklist",
    ],
    sectionIds: ["datasetRequirement", "historicalDataQuality", "feesSlippageAssumption", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "historical-data-quality-preview",
    href: "/historical-data-quality-preview",
    phase: "Phase 1692",
    title: "Historical Data Quality Preview",
    commandLabel: "Go to Historical Data Quality Preview",
    summary: "Previews historical data quality without live feed validation or market data API calls from the UI.",
    markerPhrases: [
      "Historical data quality preview",
      "Historical data quality preview does not validate live feeds or call market data APIs from the UI",
      "Historical data quality preview requires explicit operator approval",
      "Historical data quality preview shows missing bars stale data outliers timezone alignment corporate action adjustment duplicate rows and backend-owned validation boundary",
      "Denied historical data quality paths remain blocked",
      "Historical data quality checklist",
    ],
    sectionIds: ["historicalDataQuality", "datasetRequirement", "survivorshipBiasCheck", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "fees-slippage-assumption-preview",
    href: "/fees-slippage-assumption-preview",
    phase: "Phase 1693",
    title: "Fees Slippage Assumption Preview",
    commandLabel: "Go to Fees Slippage Assumption Preview",
    summary: "Previews fees and slippage assumptions without live execution cost calculation or broker account access.",
    markerPhrases: [
      "Fees slippage assumption preview",
      "Fees slippage assumption preview does not calculate live execution costs or access broker accounts",
      "Fees slippage assumption preview requires explicit operator approval",
      "Fees slippage assumption preview shows commission assumptions spread assumptions slippage assumptions liquidity caveats fill model caveats and conservative result adjustment",
      "Denied fees slippage paths remain blocked",
      "Fees slippage assumption checklist",
    ],
    sectionIds: ["feesSlippageAssumption", "datasetRequirement", "backtestMetricDefinition", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "survivorship-bias-check-preview",
    href: "/survivorship-bias-check-preview",
    phase: "Phase 1694",
    title: "Survivorship Bias Check Preview",
    commandLabel: "Go to Survivorship Bias Check Preview",
    summary: "Previews survivorship bias checks without fetching delisted symbols or external datasets from the UI.",
    markerPhrases: [
      "Survivorship bias check preview",
      "Survivorship bias check preview does not fetch delisted symbols or external datasets from the UI",
      "Survivorship bias check preview requires explicit operator approval",
      "Survivorship bias check preview shows universe history delisted assets symbol changes corporate actions lookahead risk and data provider requirement",
      "Denied survivorship bias paths remain blocked",
      "Survivorship bias check checklist",
    ],
    sectionIds: ["survivorshipBiasCheck", "historicalDataQuality", "datasetRequirement", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "sample-period-definition-preview",
    href: "/sample-period-definition-preview",
    phase: "Phase 1695",
    title: "Sample Period Definition Preview",
    commandLabel: "Go to Sample Period Definition Preview",
    summary: "Previews sample period definitions without sample analysis or historical data fetching from the UI.",
    markerPhrases: [
      "Sample period definition preview",
      "Sample period definition preview does not run sample analysis or fetch historical data from the UI",
      "Sample period definition preview requires explicit operator approval",
      "Sample period definition preview shows in-sample window out-of-sample window warmup window market regimes volatility regimes and validation split notes",
      "Denied sample period paths remain blocked",
      "Sample period definition checklist",
    ],
    sectionIds: ["samplePeriodDefinition", "datasetRequirement", "historicalDataQuality", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "backtest-metric-definition-preview",
    href: "/backtest-metric-definition-preview",
    phase: "Phase 1696",
    title: "Backtest Metric Definition Preview",
    commandLabel: "Go to Backtest Metric Definition Preview",
    summary: "Previews backtest metric definitions without live metric computation or profitability claims.",
    markerPhrases: [
      "Backtest metric definition preview",
      "Backtest metric definition preview does not compute live metrics or claim profitability",
      "Backtest metric definition preview requires explicit operator approval",
      "Backtest metric definition preview shows return drawdown win rate loss rate expectancy volatility Sharpe caveat trade count and no guaranteed profit claim",
      "Denied backtest metric paths remain blocked",
      "Backtest metric definition checklist",
    ],
    sectionIds: ["backtestMetricDefinition", "feesSlippageAssumption", "samplePeriodDefinition", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "backtest-run-packet-preview",
    href: "/backtest-run-packet-preview",
    phase: "Phase 1697",
    title: "Backtest Run Packet Preview",
    commandLabel: "Go to Backtest Run Packet Preview",
    summary: "Previews backend-owned backtest run packets without running backtests, executing signals, or writing result files from the UI.",
    markerPhrases: [
      "Backtest run packet preview",
      "Backtest run packet preview does not run backtests execute signals or write result files from the UI",
      "Backtest run packet preview requires explicit operator approval",
      "Backtest run packet preview shows strategy reference dataset reference sample period fees slippage risk settings metrics requested evidence needs and backend-owned run boundary",
      "Denied backtest run packet paths remain blocked",
      "Backtest run packet checklist",
    ],
    sectionIds: ["backtestRunPacket", "datasetRequirement", "samplePeriodDefinition", "backtestMetricDefinition", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "backtest-result-review-preview",
    href: "/backtest-result-review-preview",
    phase: "Phase 1698",
    title: "Backtest Result Review Preview",
    commandLabel: "Go to Backtest Result Review Preview",
    summary: "Previews backtest result review without frontend result, audit evidence, or trading decision persistence.",
    markerPhrases: [
      "Backtest result review preview",
      "Backtest result review preview does not persist results audit evidence or trading decisions from the UI",
      "Backtest result review preview requires backend-owned capture",
      "Backtest result review preview shows result summary metric caveats drawdown review sample caveats overfit warning evidence links and manual acceptance boundary",
      "Denied backtest result review paths remain blocked",
      "Backtest result review checklist",
    ],
    sectionIds: ["backtestResultReview", "backtestMetricDefinition", "backtestRunPacket", "paperEvidenceMap", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "paper-account-boundary-preview",
    href: "/paper-account-boundary-preview",
    phase: "Phase 1699",
    title: "Paper Account Boundary Preview",
    commandLabel: "Go to Paper Account Boundary Preview",
    summary: "Previews paper account boundaries without account creation, broker connection, paper trade placement, or credential storage from the UI.",
    markerPhrases: [
      "Paper account boundary preview",
      "Paper account boundary preview does not create accounts connect brokers place paper trades or store credentials from the UI",
      "Paper account boundary preview requires explicit operator approval",
      "Paper account boundary preview shows fake capital account scope paper environment credential boundary order preview boundary risk gate audit gate and denied account paths",
      "Denied paper account paths remain blocked",
      "Paper account boundary checklist",
    ],
    sectionIds: ["paperAccountBoundary", "paperTradeJournal", "paperTradingMetrics", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "paper-trade-journal-preview",
    href: "/paper-trade-journal-preview",
    phase: "Phase 1700",
    title: "Paper Trade Journal Preview",
    commandLabel: "Go to Paper Trade Journal Preview",
    summary: "Previews paper trade journal fields without paper trade placement, journal persistence, or signal execution from the UI.",
    markerPhrases: [
      "Paper trade journal preview",
      "Paper trade journal preview does not place paper trades persist journal entries or execute signals from the UI",
      "Paper trade journal preview requires explicit operator approval",
      "Paper trade journal preview shows trade thesis planned entry planned exit stop concept target concept result placeholder emotion note evidence needs and manual review",
      "Denied paper trade journal paths remain blocked",
      "Paper trade journal checklist",
    ],
    sectionIds: ["paperTradeJournal", "paperAccountBoundary", "paperEvidenceMap", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "paper-trading-metrics-preview",
    href: "/paper-trading-metrics-preview",
    phase: "Phase 1701",
    title: "Paper Trading Metrics Preview",
    commandLabel: "Go to Paper Trading Metrics Preview",
    summary: "Previews paper trading metrics without live paper metric computation or broker account access.",
    markerPhrases: [
      "Paper trading metrics preview",
      "Paper trading metrics preview does not compute live paper metrics or access broker accounts",
      "Paper trading metrics preview requires explicit operator approval",
      "Paper trading metrics preview shows paper win rate paper loss rate expectancy drawdown adherence slippage notes strategy drift and evidence requirements",
      "Denied paper trading metrics paths remain blocked",
      "Paper trading metrics checklist",
    ],
    sectionIds: ["paperTradingMetrics", "paperTradeJournal", "paperEvidenceMap", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "paper-evidence-map-preview",
    href: "/paper-evidence-map-preview",
    phase: "Phase 1702",
    title: "Paper Evidence Map Preview",
    commandLabel: "Go to Paper Evidence Map Preview",
    summary: "Previews paper evidence maps without frontend evidence, audit result, or paper trading decision persistence.",
    markerPhrases: [
      "Paper evidence map preview",
      "Paper evidence map preview does not persist evidence audit results or paper trading decisions from the UI",
      "Paper evidence map preview requires backend-owned capture",
      "Paper evidence map preview shows strategy evidence dataset evidence backtest evidence paper trade evidence risk evidence approval evidence result state redaction and audit continuity",
      "Denied paper evidence map paths remain blocked",
      "Paper evidence map checklist",
    ],
    sectionIds: ["paperEvidenceMap", "backtestResultReview", "paperTradeJournal", "paperTradingMetrics", "deniedBacktestPaperBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-backtest-paper-summary",
    href: "/cockpit-backtest-paper-summary",
    phase: "Phase 1703",
    title: "Cockpit Backtest Paper Summary",
    commandLabel: "Go to Cockpit Backtest Paper Summary",
    summary: "Summarizes Backtest Paper Trading Engine in the cockpit without frontend trading execution.",
    markerPhrases: [
      "Cockpit backtest paper summary",
      "Cockpit backtest paper summary keeps the cockpit as the normal user surface",
      "Cockpit backtest paper summary does not run backtests place paper trades connect brokers place live trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading or size orders from the cockpit",
      "Cockpit backtest paper summary shows dataset requirements data quality fees slippage survivorship bias sample period metrics backtest run packet result review paper account paper journal paper metrics paper evidence and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit backtest paper checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-backtest-paper-trading-candidate",
    href: "/first-backtest-paper-trading-candidate",
    phase: "Phase 1704",
    title: "First Backtest Paper Trading Candidate",
    commandLabel: "Go to First Backtest Paper Trading Candidate",
    summary: "Combines the first Backtest Paper Trading Engine candidate without enabling backtest execution, paper trading, live trading, or broker workflows from the UI.",
    markerPhrases: [
      "First backtest paper trading candidate",
      "First backtest paper trading candidate does not enable backtest execution paper trading live trading or broker workflows from the UI",
      "First backtest paper trading candidate requires explicit operator approval",
      "Candidate combines dataset requirement historical data quality fees slippage survivorship bias sample period metrics run packet result review paper account journal metrics evidence cockpit summary and denied backtest paper paths",
      "Denied first backtest paper trading paths remain blocked",
      "First backtest paper trading checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-backtest-paper-trading-release-candidate",
    href: "/controlled-backtest-paper-trading-release-candidate",
    phase: "Phase 1705",
    title: "Controlled Backtest Paper Trading Release Candidate",
    commandLabel: "Go to Controlled Backtest Paper Trading Release Candidate",
    summary: "Controlled Backtest Paper Trading release candidate prepares backend-owned backtest and paper trading workflows without frontend trading execution.",
    markerPhrases: [
      "Controlled backtest paper trading release candidate",
      "Controlled backtest paper trading release candidate does not run backtests place paper trades execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled backtest paper trading release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned backtest and paper trading workflows without frontend trading execution",
      "Denied controlled backtest paper trading paths remain blocked",
      "Controlled backtest paper trading release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listBacktestPaperTradingEngineRouteDefinitions(): readonly BacktestPaperTradingEngineRouteDefinition[] {
  return ROUTES;
}

export function getBacktestPaperTradingEngineRouteDefinition(
  slug: BacktestPaperTradingEngineRouteSlug
): BacktestPaperTradingEngineRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildBacktestPaperTradingEngineRouteModel(
  slug: BacktestPaperTradingEngineRouteSlug = "controlled-backtest-paper-trading-release-candidate"
): BacktestPaperTradingEngineRouteModel {
  const route = getBacktestPaperTradingEngineRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is BacktestPaperTradingEngineSection => Boolean(section));

  return {
    route,
    backtestPaperTradingEngine: BACKTEST_PAPER_TRADING_ENGINE_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: BACKTEST_PAPER_TRADING_ENGINE_COCKPIT_MARKERS,
    summary: summarizeBacktestPaperTradingEngineRoute(route, sections),
  };
}

export function buildBacktestPaperTradingEngineModel(): BacktestPaperTradingEngineRouteModel {
  return buildBacktestPaperTradingEngineRouteModel("controlled-backtest-paper-trading-release-candidate");
}

export function summarizeBacktestPaperTradingEngineRoute(
  route: BacktestPaperTradingEngineRouteDefinition,
  sections: readonly BacktestPaperTradingEngineSection[]
): string {
  return `${route.title} keeps ${sections.length} backtest and paper trading sections static, deterministic, review-only, approval-required, backend-owned, risk-governed, and blocked from frontend live market data calls, real backtest execution, paper trade placement, broker connection, trade placement, financial advice, personalised recommendation, buy sell instruction, automated trading, order sizing, live account monitoring, money movement, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, browser storage writes, credential storage, and guaranteed profit claims. Required markers: ${REQUIRED_SAFETY_MARKERS.join(", ")}.`;
}

export function buildBacktestPaperTradingEngineStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
