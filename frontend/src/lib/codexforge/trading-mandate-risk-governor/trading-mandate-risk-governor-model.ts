export type TradingMandateRiskGovernorRouteSlug =
  | "trading-mandate-boundary"
  | "capital-allocation-rules-preview"
  | "active-capital-ledger-preview"
  | "protected-profit-bucket-preview"
  | "reinvestable-profit-rules-preview"
  | "max-daily-loss-guard-preview"
  | "max-drawdown-guard-preview"
  | "position-risk-guard-preview"
  | "approved-market-universe-preview"
  | "approved-symbol-universe-preview"
  | "approved-strategy-class-preview"
  | "trade-thesis-requirement-preview"
  | "trading-evidence-requirement-preview"
  | "trading-kill-switch-preview"
  | "first-trading-mandate-risk-governor-candidate"
  | "controlled-trading-mandate-risk-governor-release-candidate";

export type TradingMandateRiskGovernorKind =
  | "trading-mandate-risk-governor-v1"
  | "trading-mandate-boundary"
  | "capital-allocation-rules-preview"
  | "active-capital-ledger-preview"
  | "protected-profit-bucket-preview"
  | "reinvestable-profit-rules-preview"
  | "max-daily-loss-guard-preview"
  | "max-drawdown-guard-preview"
  | "position-risk-guard-preview"
  | "approved-market-universe-preview"
  | "approved-symbol-universe-preview"
  | "approved-strategy-class-preview"
  | "trade-thesis-requirement-preview"
  | "trading-evidence-requirement-preview"
  | "trading-kill-switch-preview"
  | "first-trading-mandate-risk-governor-candidate"
  | "controlled-trading-mandate-risk-governor-release-candidate";

export type TradingMandateRiskGovernorState =
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "candidate"
  | "release-candidate";

export type TradingMandateRiskGovernorItem = {
  id: string;
  label: string;
  detail: string;
  state: TradingMandateRiskGovernorState;
};

export type TradingMandateRiskGovernorSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly TradingMandateRiskGovernorItem[];
  state: TradingMandateRiskGovernorState;
};

export type TradingMandateRiskGovernorModel = {
  tradingMandateRiskGovernorId: string;
  tradingMandateRiskGovernorKind: TradingMandateRiskGovernorKind;
  capitalAllocationRules: TradingMandateRiskGovernorSection;
  activeCapitalLedger: TradingMandateRiskGovernorSection;
  protectedProfitBucket: TradingMandateRiskGovernorSection;
  reinvestableProfitRules: TradingMandateRiskGovernorSection;
  maxDailyLossGuard: TradingMandateRiskGovernorSection;
  maxDrawdownGuard: TradingMandateRiskGovernorSection;
  positionRiskGuard: TradingMandateRiskGovernorSection;
  approvedMarketUniverse: TradingMandateRiskGovernorSection;
  approvedSymbolUniverse: TradingMandateRiskGovernorSection;
  approvedStrategyClasses: TradingMandateRiskGovernorSection;
  forbiddenStrategyClasses: TradingMandateRiskGovernorSection;
  tradeThesisRequirement: TradingMandateRiskGovernorSection;
  tradingEvidenceRequirement: TradingMandateRiskGovernorSection;
  tradingKillSwitch: TradingMandateRiskGovernorSection;
  deniedTradingMandateBoundaries: TradingMandateRiskGovernorSection;
  cockpitSummary: readonly TradingMandateRiskGovernorItem[];
  explicitSafetyLimits: readonly string[];
};

export type TradingMandateRiskGovernorRouteDefinition = {
  slug: TradingMandateRiskGovernorRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type TradingMandateRiskGovernorRouteModel = {
  route: TradingMandateRiskGovernorRouteDefinition;
  tradingMandateRiskGovernor: TradingMandateRiskGovernorModel;
  sections: readonly TradingMandateRiskGovernorSection[];
  diagnosticRoutes: readonly TradingMandateRiskGovernorRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const TRADING_MANDATE_RISK_GOVERNOR_COCKPIT_MARKERS = [
  "Trading Mandate Risk Governor",
  "Trading Mandate",
  "Risk Governor",
  "Capital Allocation",
  "Active Capital",
  "Protected Profit",
  "Reinvestable Profit",
  "Max Daily Loss",
  "Max Drawdown",
  "Position Risk",
  "Approved Markets",
  "Approved Symbols",
  "Approved Strategies",
  "Forbidden Strategies",
  "Trade Thesis Required",
  "Evidence Required",
  "Kill Switch",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No guaranteed profit claims",
  "No trading automation from the cockpit",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Trading Mandate Risk Governor v1 is review-only from the frontend.",
  "It is not trading execution, broker integration, financial advice, personalised investment recommendation, order placement, automated trading, live market data, signal execution, paper trading, backtesting, or money movement.",
  "The cockpit does not connect brokers, place trades, fetch live market data, provide financial advice, provide personalised recommendations, issue buy sell instructions, size orders, monitor live accounts, move money, automate trading, call models, call providers, call connectors, send prompts, run commands, write files, persist approvals, persist evidence, persist audit, create queues, create transactions, store credentials, or write browser storage.",
  "Backend-owned broker boundary remains required.",
  "Explicit operator approval remains required.",
  "No guaranteed profit claims are allowed.",
] as const;

const REQUIRED_SAFETY_MARKERS = [
  "allocated capital rules",
  "active capital rules",
  "protected profit rules",
  "reinvestable profit rules",
  "max daily loss",
  "max total drawdown",
  "max position risk",
  "approved markets",
  "approved symbols",
  "approved strategy classes",
  "forbidden strategy classes",
  "trade thesis requirements",
  "evidence requirements",
  "kill switch conditions",
  "operator approval gates",
  "backend-owned broker boundary prerequisites",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review cards only.",
  "Future trading mandate and risk-governor workflows remain backend-owned, approval-gated, evidence-backed, and outside direct frontend execution.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, or guaranteed profit claim.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, broker account access, portfolio access, credential storage, endpoint storage, live quote fetching, market data API calls, exchange API calls, order placement, paper trade placement, automated execution, signal execution, backtest execution, order sizing, live account monitoring, money movement, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, browser storage writes, approval persistence, evidence persistence, audit persistence, result persistence, queue creation, transaction creation, or worker dispatch from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Backend-owned broker boundary remains required before any future trading workflow.",
  "Risk governor enforcement, mandate approval, evidence capture, audit continuity, kill switch enforcement, and broker boundary prerequisites remain backend-owned.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly TradingMandateRiskGovernorItem[] {
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

function createSection(section: TradingMandateRiskGovernorSection): TradingMandateRiskGovernorSection {
  return section;
}

const TRADING_MANDATE_BOUNDARY = createSection({
  sectionId: "tradingMandateBoundary",
  label: "Trading Mandate",
  title: "Trading Mandate Boundary",
  humanReadableSummary:
    "Trading mandate boundary keeps mandate and risk-governor planning review-only, with broker connection, trade placement, live market data, financial advice, personalised recommendations, and automation blocked from the UI.",
  plannedInputs: ["Mandate intent", "Risk governor scope", "Denied trading paths", "Backend-owned workflow prerequisites"],
  plannedOutputs: ["Boundary statement", "Operator approval requirement", "Backend-owned mandate workflow", "Denied trading mandate boundary paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-mandate-boundary",
    "Trading mandate boundary prepares backend-owned mandate and risk-governor workflows without frontend trading execution.",
    "Trading mandate boundary does not connect brokers place trades fetch live market data provide financial advice or enable automation from the UI.",
    "Trading mandate boundary requires explicit operator approval before any future trading workflow."
  ),
  state: "blocked",
});

const CAPITAL_ALLOCATION_RULES = createSection({
  sectionId: "capitalAllocationRules",
  label: "Capital Allocation",
  title: "Capital Allocation Rules Preview",
  humanReadableSummary:
    "Capital allocation rules preview shows allocated capital, active capital, protected profit, reinvestable profit, loss limits, and approval gates as review-only rules without moving money, connecting brokers, or enabling trading.",
  plannedInputs: ["Allocated capital", "Active capital", "Protected profit", "Reinvestable profit", "Loss limits", "Approval gates"],
  plannedOutputs: ["Capital allocation rules", "Manual approval gate", "Loss-limit framing", "Broker and money movement denied path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "capital-allocation-rules",
    "Capital allocation rules preview shows allocated capital active capital protected profit reinvestable profit loss limits and approval gates as review-only rules.",
    "Capital allocation rules preview does not move money connect brokers or enable trading.",
    "Capital allocation rules preview requires explicit operator approval."
  ),
  state: "review-only",
});

const ACTIVE_CAPITAL_LEDGER = createSection({
  sectionId: "activeCapitalLedger",
  label: "Active Capital",
  title: "Active Capital Ledger Preview",
  humanReadableSummary:
    "Active capital ledger preview shows allocated capital, realised profit, realised loss, protected profit, reinvestable profit, drawdown state, and manual review notes without reading broker balances or persisting ledger state from the UI.",
  plannedInputs: ["Allocated capital", "Realised profit", "Realised loss", "Protected profit", "Reinvestable profit", "Drawdown state", "Manual review notes"],
  plannedOutputs: ["Active capital ledger card", "Drawdown state preview", "Manual review notes", "Broker balance read denied path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "active-capital-ledger",
    "Active capital ledger preview shows allocated capital realised profit realised loss protected profit reinvestable profit drawdown state and manual review notes.",
    "Active capital ledger preview does not read broker balances or persist ledger state from the UI.",
    "Active capital ledger preview requires explicit operator approval."
  ),
  state: "review-only",
});

const PROTECTED_PROFIT_BUCKET = createSection({
  sectionId: "protectedProfitBucket",
  label: "Protected Profit",
  title: "Protected Profit Bucket Preview",
  humanReadableSummary:
    "Protected profit bucket preview shows realised-profit-only protection, protected profit bucket lock percentage, release conditions, and losing-trade handling without moving money or guaranteeing profit.",
  plannedInputs: ["Realised-profit-only protection", "Protected profit bucket", "Lock percentage", "Release conditions", "Losing-trade handling"],
  plannedOutputs: ["Protected profit rules", "Release condition notes", "Losing-trade handling", "No guaranteed profit boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "protected-profit-bucket",
    "Protected profit bucket preview shows realised-profit-only protection protected profit bucket lock percentage release conditions and losing-trade handling.",
    "Protected profit bucket preview does not move money or guarantee profit.",
    "Protected profit bucket preview requires explicit operator approval."
  ),
  state: "review-only",
});

const REINVESTABLE_PROFIT_RULES = createSection({
  sectionId: "reinvestableProfitRules",
  label: "Reinvestable Profit",
  title: "Reinvestable Profit Rules Preview",
  humanReadableSummary:
    "Reinvestable profit rules preview shows realised profit split, reinvestable percent, protected percent, reinvestment ceiling, and operator approval gates without reinvesting money or executing trades.",
  plannedInputs: ["Realised profit split", "Reinvestable percent", "Protected percent", "Reinvestment ceiling", "Operator approval gates"],
  plannedOutputs: ["Reinvestable profit rules", "Protected percent rule", "Reinvestment ceiling", "Operator approval gate"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "reinvestable-profit-rules",
    "Reinvestable profit rules preview shows realised profit split reinvestable percent protected percent reinvestment ceiling and operator approval gates.",
    "Reinvestable profit rules preview does not reinvest money or execute trades.",
    "Reinvestable profit rules preview requires explicit operator approval."
  ),
  state: "review-only",
});

const MAX_DAILY_LOSS_GUARD = createSection({
  sectionId: "maxDailyLossGuard",
  label: "Max Daily Loss",
  title: "Max Daily Loss Guard Preview",
  humanReadableSummary:
    "Max daily loss guard preview shows daily loss threshold, breach state, stop condition, reset rule, manual override boundary, and backend-owned enforcement requirement without monitoring live accounts or stopping trades from the UI.",
  plannedInputs: ["Daily loss threshold", "Breach state", "Stop condition", "Reset rule", "Manual override boundary", "Backend-owned enforcement requirement"],
  plannedOutputs: ["Daily loss guard", "Stop condition preview", "Reset rule", "Backend-owned enforcement note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "max-daily-loss-guard",
    "Max daily loss guard preview shows daily loss threshold breach state stop condition reset rule manual override boundary and backend-owned enforcement requirement.",
    "Max daily loss guard preview does not monitor live accounts or stop trades from the UI.",
    "Max daily loss guard preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const MAX_DRAWDOWN_GUARD = createSection({
  sectionId: "maxDrawdownGuard",
  label: "Max Drawdown",
  title: "Max Drawdown Guard Preview",
  humanReadableSummary:
    "Max drawdown guard preview shows total drawdown threshold, peak equity reference, active capital impact, protected profit exclusion, and stop condition without calculating live portfolio drawdown or accessing broker accounts.",
  plannedInputs: ["Total drawdown threshold", "Peak equity reference", "Active capital impact", "Protected profit exclusion", "Stop condition"],
  plannedOutputs: ["Max drawdown guard", "Peak equity reference", "Protected profit exclusion", "Stop condition preview"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "max-drawdown-guard",
    "Max drawdown guard preview shows total drawdown threshold peak equity reference active capital impact protected profit exclusion and stop condition.",
    "Max drawdown guard preview does not calculate live portfolio drawdown or access broker accounts.",
    "Max drawdown guard preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const POSITION_RISK_GUARD = createSection({
  sectionId: "positionRiskGuard",
  label: "Position Risk",
  title: "Position Risk Guard Preview",
  humanReadableSummary:
    "Position risk guard preview shows max position risk percent, stop distance assumption, exposure cap, liquidity warning, and no executable order state without sizing orders or submitting trades.",
  plannedInputs: ["Max position risk percent", "Stop distance assumption", "Exposure cap", "Liquidity warning", "No executable order state"],
  plannedOutputs: ["Position risk guard", "Exposure cap", "Liquidity warning", "No executable order state"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "position-risk-guard",
    "Position risk guard preview shows max position risk percent stop distance assumption exposure cap liquidity warning and no executable order state.",
    "Position risk guard preview does not size orders or submit trades.",
    "Position risk guard preview requires explicit operator approval."
  ),
  state: "review-only",
});

const APPROVED_MARKET_UNIVERSE = createSection({
  sectionId: "approvedMarketUniverse",
  label: "Approved Markets",
  title: "Approved Market Universe Preview",
  humanReadableSummary:
    "Approved market universe preview shows approved markets, blocked markets, session notes, liquidity notes, risk class, and broker-boundary prerequisite without fetching market data or enabling market access.",
  plannedInputs: ["Approved markets", "Blocked markets", "Session notes", "Liquidity notes", "Risk class", "Broker-boundary prerequisite"],
  plannedOutputs: ["Approved market universe", "Blocked market notes", "Liquidity notes", "Broker-boundary prerequisite"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "approved-market-universe",
    "Approved market universe preview shows approved markets blocked markets session notes liquidity notes risk class and broker-boundary prerequisite.",
    "Approved market universe preview does not fetch market data or enable market access.",
    "Approved market universe preview requires explicit operator approval."
  ),
  state: "review-only",
});

const APPROVED_SYMBOL_UNIVERSE = createSection({
  sectionId: "approvedSymbolUniverse",
  label: "Approved Symbols",
  title: "Approved Symbol Universe Preview",
  humanReadableSummary:
    "Approved symbol universe preview shows approved symbols, watch-only symbols, blocked symbols, thesis requirement, risk notes, and no personalised recommendation without fetching live quotes or providing buy sell instructions.",
  plannedInputs: ["Approved symbols", "Watch-only symbols", "Blocked symbols", "Thesis requirement", "Risk notes", "No personalised recommendation"],
  plannedOutputs: ["Approved symbol universe", "Watch-only symbols", "Blocked symbols", "Thesis requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "approved-symbol-universe",
    "Approved symbol universe preview shows approved symbols watch-only symbols blocked symbols thesis requirement risk notes and no personalised recommendation.",
    "Approved symbol universe preview does not fetch live quotes or provide buy sell instructions.",
    "Approved symbol universe preview requires explicit operator approval."
  ),
  state: "review-only",
});

const APPROVED_STRATEGY_CLASSES = createSection({
  sectionId: "approvedStrategyClasses",
  label: "Approved Strategies",
  title: "Approved Strategy Class Preview",
  humanReadableSummary:
    "Approved strategy class preview shows approved strategy classes, forbidden strategy classes, data requirements, backtest requirements, paper-trade requirements, and evidence gates without executing signals, automating strategies, or placing orders.",
  plannedInputs: ["Approved strategy classes", "Forbidden strategy classes", "Data requirements", "Backtest requirements", "Paper-trade requirements", "Evidence gates"],
  plannedOutputs: ["Approved strategy class list", "Data requirement gates", "Backtest requirements", "Paper-trade requirements"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "approved-strategy-class",
    "Approved strategy class preview shows approved strategy classes forbidden strategy classes data requirements backtest requirements paper-trade requirements and evidence gates.",
    "Approved strategy class preview does not execute signals automate strategies or place orders.",
    "Approved strategy class preview requires explicit operator approval."
  ),
  state: "review-only",
});

const FORBIDDEN_STRATEGY_CLASSES = createSection({
  sectionId: "forbiddenStrategyClasses",
  label: "Forbidden Strategies",
  title: "Forbidden Strategy Classes",
  humanReadableSummary:
    "Forbidden strategy classes remain blocked for strategies without thesis evidence, risk evidence, backtest evidence, paper-trade evidence, operator approval, broker-boundary approval, or kill switch coverage.",
  plannedInputs: ["Forbidden strategy classes", "Missing evidence states", "Missing approval states", "Missing kill switch coverage"],
  plannedOutputs: ["Forbidden strategy class list", "Evidence gate failures", "Approval gate failures", "Kill switch coverage gaps"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "forbidden-strategy-classes",
    "Forbidden Strategies remain blocked unless evidence, approval, broker boundary, and kill switch prerequisites are backend-owned and complete.",
    "Forbidden Strategies do not create executable signals, automation, order placement, or buy sell instructions from the cockpit.",
    "Forbidden Strategies require explicit operator approval before any future change."
  ),
  state: "blocked",
});

const TRADE_THESIS_REQUIREMENT = createSection({
  sectionId: "tradeThesisRequirement",
  label: "Trade Thesis Required",
  title: "Trade Thesis Requirement Preview",
  humanReadableSummary:
    "Trade thesis requirement preview shows thesis, counter-thesis, catalyst, invalidation, risk reward, evidence, timeframe, and manual approval requirement without creating buy sell instructions or executable signals.",
  plannedInputs: ["Thesis", "Counter-thesis", "Catalyst", "Invalidation", "Risk reward", "Evidence", "Timeframe", "Manual approval requirement"],
  plannedOutputs: ["Trade thesis requirement", "Counter-thesis check", "Invalidation rule", "Manual approval requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trade-thesis-requirement",
    "Trade thesis requirement preview shows thesis counter-thesis catalyst invalidation risk reward evidence timeframe and manual approval requirement.",
    "Trade thesis requirement preview does not create buy sell instructions or executable signals.",
    "Trade thesis requirement preview requires explicit operator approval."
  ),
  state: "needs-approval",
});

const TRADING_EVIDENCE_REQUIREMENT = createSection({
  sectionId: "tradingEvidenceRequirement",
  label: "Evidence Required",
  title: "Trading Evidence Requirement Preview",
  humanReadableSummary:
    "Trading evidence requirement preview shows thesis evidence, risk evidence, backtest evidence, paper-trade evidence, approval evidence, broker-boundary evidence, and audit continuity without persisting evidence audit results or trading decisions from the UI.",
  plannedInputs: ["Thesis evidence", "Risk evidence", "Backtest evidence", "Paper-trade evidence", "Approval evidence", "Broker-boundary evidence", "Audit continuity"],
  plannedOutputs: ["Trading evidence requirement", "Broker-boundary evidence", "Audit continuity", "Backend-owned capture requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-evidence-requirement",
    "Trading evidence requirement preview shows thesis evidence risk evidence backtest evidence paper-trade evidence approval evidence broker-boundary evidence and audit continuity.",
    "Trading evidence requirement preview does not persist evidence audit results or trading decisions from the UI.",
    "Trading evidence requirement preview requires backend-owned capture."
  ),
  state: "backend-owned",
});

const TRADING_KILL_SWITCH = createSection({
  sectionId: "tradingKillSwitch",
  label: "Kill Switch",
  title: "Trading Kill Switch Preview",
  humanReadableSummary:
    "Trading kill switch preview shows daily loss breach, drawdown breach, manual stop, thesis invalidation, broker error, automation pause, and backend-owned enforcement boundary without stopping live trading or controlling broker accounts from the UI.",
  plannedInputs: ["Daily loss breach", "Drawdown breach", "Manual stop", "Thesis invalidation", "Broker error", "Automation pause", "Backend-owned enforcement boundary"],
  plannedOutputs: ["Trading kill switch", "Manual stop boundary", "Automation pause note", "Backend-owned enforcement boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "trading-kill-switch",
    "Trading kill switch preview shows daily loss breach drawdown breach manual stop thesis invalidation broker error automation pause and backend-owned enforcement boundary.",
    "Trading kill switch preview does not stop live trading or control broker accounts from the UI.",
    "Trading kill switch preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const DENIED_TRADING_MANDATE_BOUNDARIES = createSection({
  sectionId: "deniedTradingMandateBoundaries",
  label: "Denied Trading Mandate Boundaries",
  title: "Denied Trading Mandate Boundary Paths",
  humanReadableSummary:
    "Denied trading mandate boundary paths remain blocked across broker connections, trade placement, live market data calls, financial advice, personalised recommendations, guaranteed profit claims, trading automation, order sizing, live account monitoring, money movement, evidence persistence, approval persistence, queue creation, transaction creation, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, and browser storage writes from the frontend.",
  plannedInputs: ["Denied broker paths", "Denied execution paths", "Denied advice paths", "Denied persistence paths"],
  plannedOutputs: ["Denied mandate path list", "Backend-owned broker boundary requirement", "Explicit approval requirement", "Review-only release posture"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "denied-trading-mandate-boundaries",
    "Denied trading mandate boundary paths remain blocked.",
    "No broker connections from the cockpit, No trade placement from the cockpit, No live market data calls from the cockpit, No financial advice from the cockpit, No personalised recommendations from the cockpit, No guaranteed profit claims, and No trading automation from the cockpit.",
    "Backend-owned broker boundary remains required and Explicit operator approval remains required."
  ),
  state: "denied",
});

export const TRADING_MANDATE_RISK_GOVERNOR_MODEL: TradingMandateRiskGovernorModel = {
  tradingMandateRiskGovernorId: "trading-mandate-risk-governor-v1",
  tradingMandateRiskGovernorKind: "trading-mandate-risk-governor-v1",
  capitalAllocationRules: CAPITAL_ALLOCATION_RULES,
  activeCapitalLedger: ACTIVE_CAPITAL_LEDGER,
  protectedProfitBucket: PROTECTED_PROFIT_BUCKET,
  reinvestableProfitRules: REINVESTABLE_PROFIT_RULES,
  maxDailyLossGuard: MAX_DAILY_LOSS_GUARD,
  maxDrawdownGuard: MAX_DRAWDOWN_GUARD,
  positionRiskGuard: POSITION_RISK_GUARD,
  approvedMarketUniverse: APPROVED_MARKET_UNIVERSE,
  approvedSymbolUniverse: APPROVED_SYMBOL_UNIVERSE,
  approvedStrategyClasses: APPROVED_STRATEGY_CLASSES,
  forbiddenStrategyClasses: FORBIDDEN_STRATEGY_CLASSES,
  tradeThesisRequirement: TRADE_THESIS_REQUIREMENT,
  tradingEvidenceRequirement: TRADING_EVIDENCE_REQUIREMENT,
  tradingKillSwitch: TRADING_KILL_SWITCH,
  deniedTradingMandateBoundaries: DENIED_TRADING_MANDATE_BOUNDARIES,
  cockpitSummary: [
    {
      id: "cockpit-trading-mandate-risk-governor-summary",
      label: "Trading Mandate Risk Governor",
      detail:
        "Trading Mandate Risk Governor keeps capital allocation, active capital, protected profit, reinvestable profit, max daily loss, max drawdown, position risk, approved markets, approved symbols, approved strategies, trade thesis, evidence, kill switch, and broker boundary prerequisites review-only.",
      state: "review-only",
    },
    {
      id: "cockpit-trading-mandate-risk-governor-denied",
      label: "Denied cockpit actions",
      detail:
        "No broker connections from the cockpit, No trade placement from the cockpit, No live market data calls from the cockpit, No financial advice from the cockpit, No personalised recommendations from the cockpit, No guaranteed profit claims, and No trading automation from the cockpit.",
      state: "blocked",
    },
    {
      id: "cockpit-trading-mandate-risk-governor-approval",
      label: "Approval and broker boundary",
      detail:
        "Backend-owned broker boundary remains required and Explicit operator approval remains required before any future trading mandate workflow.",
      state: "needs-approval",
    },
  ],
  explicitSafetyLimits: [...EXPLICIT_SAFETY_LIMITS, ...REQUIRED_SAFETY_MARKERS],
};

const SECTION_LOOKUP: Record<string, TradingMandateRiskGovernorSection> = {
  tradingMandateBoundary: TRADING_MANDATE_BOUNDARY,
  capitalAllocationRules: CAPITAL_ALLOCATION_RULES,
  activeCapitalLedger: ACTIVE_CAPITAL_LEDGER,
  protectedProfitBucket: PROTECTED_PROFIT_BUCKET,
  reinvestableProfitRules: REINVESTABLE_PROFIT_RULES,
  maxDailyLossGuard: MAX_DAILY_LOSS_GUARD,
  maxDrawdownGuard: MAX_DRAWDOWN_GUARD,
  positionRiskGuard: POSITION_RISK_GUARD,
  approvedMarketUniverse: APPROVED_MARKET_UNIVERSE,
  approvedSymbolUniverse: APPROVED_SYMBOL_UNIVERSE,
  approvedStrategyClasses: APPROVED_STRATEGY_CLASSES,
  forbiddenStrategyClasses: FORBIDDEN_STRATEGY_CLASSES,
  tradeThesisRequirement: TRADE_THESIS_REQUIREMENT,
  tradingEvidenceRequirement: TRADING_EVIDENCE_REQUIREMENT,
  tradingKillSwitch: TRADING_KILL_SWITCH,
  deniedTradingMandateBoundaries: DENIED_TRADING_MANDATE_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "tradingMandateBoundary",
  "capitalAllocationRules",
  "activeCapitalLedger",
  "protectedProfitBucket",
  "reinvestableProfitRules",
  "maxDailyLossGuard",
  "maxDrawdownGuard",
  "positionRiskGuard",
  "approvedMarketUniverse",
  "approvedSymbolUniverse",
  "approvedStrategyClasses",
  "forbiddenStrategyClasses",
  "tradeThesisRequirement",
  "tradingEvidenceRequirement",
  "tradingKillSwitch",
  "deniedTradingMandateBoundaries",
] as const;

const ROUTES: readonly TradingMandateRiskGovernorRouteDefinition[] = [
  {
    slug: "trading-mandate-boundary",
    href: "/trading-mandate-boundary",
    phase: "Phase 1658",
    title: "Trading Mandate Boundary",
    commandLabel: "Go to Trading Mandate Boundary",
    summary: "Defines the Trading Mandate boundary without frontend trading execution.",
    markerPhrases: [
      "Trading mandate boundary",
      "Trading mandate boundary does not connect brokers place trades fetch live market data provide financial advice or enable automation from the UI",
      "Trading mandate boundary requires explicit operator approval before any future trading workflow",
      "Trading mandate boundary prepares backend-owned mandate and risk-governor workflows without frontend trading execution",
      "Denied trading mandate boundary paths remain blocked",
      "Trading mandate boundary checklist",
    ],
    sectionIds: ["tradingMandateBoundary", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "capital-allocation-rules-preview",
    href: "/capital-allocation-rules-preview",
    phase: "Phase 1659",
    title: "Capital Allocation Rules Preview",
    commandLabel: "Go to Capital Allocation Rules Preview",
    summary: "Previews capital allocation rules without money movement, brokers, or trading.",
    markerPhrases: [
      "Capital allocation rules preview",
      "Capital allocation rules preview does not move money connect brokers or enable trading",
      "Capital allocation rules preview requires explicit operator approval",
      "Capital allocation rules preview shows allocated capital active capital protected profit reinvestable profit loss limits and approval gates as review-only rules",
      "Denied capital allocation paths remain blocked",
      "Capital allocation rules checklist",
    ],
    sectionIds: ["capitalAllocationRules", "activeCapitalLedger", "protectedProfitBucket", "reinvestableProfitRules", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "active-capital-ledger-preview",
    href: "/active-capital-ledger-preview",
    phase: "Phase 1660",
    title: "Active Capital Ledger Preview",
    commandLabel: "Go to Active Capital Ledger Preview",
    summary: "Previews active capital ledger state without broker balance reads or UI ledger persistence.",
    markerPhrases: [
      "Active capital ledger preview",
      "Active capital ledger preview does not read broker balances or persist ledger state from the UI",
      "Active capital ledger preview requires explicit operator approval",
      "Active capital ledger preview shows allocated capital realised profit realised loss protected profit reinvestable profit drawdown state and manual review notes",
      "Denied active capital ledger paths remain blocked",
      "Active capital ledger checklist",
    ],
    sectionIds: ["activeCapitalLedger", "capitalAllocationRules", "maxDrawdownGuard", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "protected-profit-bucket-preview",
    href: "/protected-profit-bucket-preview",
    phase: "Phase 1661",
    title: "Protected Profit Bucket Preview",
    commandLabel: "Go to Protected Profit Bucket Preview",
    summary: "Previews protected profit rules without money movement or guaranteed profit.",
    markerPhrases: [
      "Protected profit bucket preview",
      "Protected profit bucket preview does not move money or guarantee profit",
      "Protected profit bucket preview requires explicit operator approval",
      "Protected profit bucket preview shows realised-profit-only protection protected profit bucket lock percentage release conditions and losing-trade handling",
      "Denied protected profit bucket paths remain blocked",
      "Protected profit bucket checklist",
    ],
    sectionIds: ["protectedProfitBucket", "reinvestableProfitRules", "activeCapitalLedger", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "reinvestable-profit-rules-preview",
    href: "/reinvestable-profit-rules-preview",
    phase: "Phase 1662",
    title: "Reinvestable Profit Rules Preview",
    commandLabel: "Go to Reinvestable Profit Rules Preview",
    summary: "Previews reinvestable profit rules without reinvesting money or executing trades.",
    markerPhrases: [
      "Reinvestable profit rules preview",
      "Reinvestable profit rules preview does not reinvest money or execute trades",
      "Reinvestable profit rules preview requires explicit operator approval",
      "Reinvestable profit rules preview shows realised profit split reinvestable percent protected percent reinvestment ceiling and operator approval gates",
      "Denied reinvestable profit paths remain blocked",
      "Reinvestable profit rules checklist",
    ],
    sectionIds: ["reinvestableProfitRules", "protectedProfitBucket", "capitalAllocationRules", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "max-daily-loss-guard-preview",
    href: "/max-daily-loss-guard-preview",
    phase: "Phase 1663",
    title: "Max Daily Loss Guard Preview",
    commandLabel: "Go to Max Daily Loss Guard Preview",
    summary: "Previews daily loss guard conditions without live account monitoring or UI enforcement.",
    markerPhrases: [
      "Max daily loss guard preview",
      "Max daily loss guard preview does not monitor live accounts or stop trades from the UI",
      "Max daily loss guard preview requires explicit operator approval",
      "Max daily loss guard preview shows daily loss threshold breach state stop condition reset rule manual override boundary and backend-owned enforcement requirement",
      "Denied max daily loss paths remain blocked",
      "Max daily loss guard checklist",
    ],
    sectionIds: ["maxDailyLossGuard", "activeCapitalLedger", "tradingKillSwitch", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "max-drawdown-guard-preview",
    href: "/max-drawdown-guard-preview",
    phase: "Phase 1664",
    title: "Max Drawdown Guard Preview",
    commandLabel: "Go to Max Drawdown Guard Preview",
    summary: "Previews max drawdown guard conditions without live portfolio drawdown calculation.",
    markerPhrases: [
      "Max drawdown guard preview",
      "Max drawdown guard preview does not calculate live portfolio drawdown or access broker accounts",
      "Max drawdown guard preview requires explicit operator approval",
      "Max drawdown guard preview shows total drawdown threshold peak equity reference active capital impact protected profit exclusion and stop condition",
      "Denied max drawdown paths remain blocked",
      "Max drawdown guard checklist",
    ],
    sectionIds: ["maxDrawdownGuard", "activeCapitalLedger", "protectedProfitBucket", "tradingKillSwitch", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "position-risk-guard-preview",
    href: "/position-risk-guard-preview",
    phase: "Phase 1665",
    title: "Position Risk Guard Preview",
    commandLabel: "Go to Position Risk Guard Preview",
    summary: "Previews position risk guard conditions without order sizing or trade submission.",
    markerPhrases: [
      "Position risk guard preview",
      "Position risk guard preview does not size orders or submit trades",
      "Position risk guard preview requires explicit operator approval",
      "Position risk guard preview shows max position risk percent stop distance assumption exposure cap liquidity warning and no executable order state",
      "Denied position risk paths remain blocked",
      "Position risk guard checklist",
    ],
    sectionIds: ["positionRiskGuard", "capitalAllocationRules", "approvedMarketUniverse", "approvedSymbolUniverse", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "approved-market-universe-preview",
    href: "/approved-market-universe-preview",
    phase: "Phase 1666",
    title: "Approved Market Universe Preview",
    commandLabel: "Go to Approved Market Universe Preview",
    summary: "Previews approved markets without market data calls or market access.",
    markerPhrases: [
      "Approved market universe preview",
      "Approved market universe preview does not fetch market data or enable market access",
      "Approved market universe preview requires explicit operator approval",
      "Approved market universe preview shows approved markets blocked markets session notes liquidity notes risk class and broker-boundary prerequisite",
      "Denied approved market universe paths remain blocked",
      "Approved market universe checklist",
    ],
    sectionIds: ["approvedMarketUniverse", "approvedSymbolUniverse", "positionRiskGuard", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "approved-symbol-universe-preview",
    href: "/approved-symbol-universe-preview",
    phase: "Phase 1667",
    title: "Approved Symbol Universe Preview",
    commandLabel: "Go to Approved Symbol Universe Preview",
    summary: "Previews approved symbols without live quotes or buy sell instructions.",
    markerPhrases: [
      "Approved symbol universe preview",
      "Approved symbol universe preview does not fetch live quotes or provide buy sell instructions",
      "Approved symbol universe preview requires explicit operator approval",
      "Approved symbol universe preview shows approved symbols watch-only symbols blocked symbols thesis requirement risk notes and no personalised recommendation",
      "Denied approved symbol universe paths remain blocked",
      "Approved symbol universe checklist",
    ],
    sectionIds: ["approvedSymbolUniverse", "approvedMarketUniverse", "tradeThesisRequirement", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "approved-strategy-class-preview",
    href: "/approved-strategy-class-preview",
    phase: "Phase 1668",
    title: "Approved Strategy Class Preview",
    commandLabel: "Go to Approved Strategy Class Preview",
    summary: "Previews approved and forbidden strategy classes without execution, automation, or orders.",
    markerPhrases: [
      "Approved strategy class preview",
      "Approved strategy class preview does not execute signals automate strategies or place orders",
      "Approved strategy class preview requires explicit operator approval",
      "Approved strategy class preview shows approved strategy classes forbidden strategy classes data requirements backtest requirements paper-trade requirements and evidence gates",
      "Denied approved strategy class paths remain blocked",
      "Approved strategy class checklist",
    ],
    sectionIds: ["approvedStrategyClasses", "forbiddenStrategyClasses", "tradingEvidenceRequirement", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "trade-thesis-requirement-preview",
    href: "/trade-thesis-requirement-preview",
    phase: "Phase 1669",
    title: "Trade Thesis Requirement Preview",
    commandLabel: "Go to Trade Thesis Requirement Preview",
    summary: "Previews trade thesis requirements without buy sell instructions or executable signals.",
    markerPhrases: [
      "Trade thesis requirement preview",
      "Trade thesis requirement preview does not create buy sell instructions or executable signals",
      "Trade thesis requirement preview requires explicit operator approval",
      "Trade thesis requirement preview shows thesis counter-thesis catalyst invalidation risk reward evidence timeframe and manual approval requirement",
      "Denied trade thesis paths remain blocked",
      "Trade thesis requirement checklist",
    ],
    sectionIds: ["tradeThesisRequirement", "tradingEvidenceRequirement", "approvedSymbolUniverse", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-evidence-requirement-preview",
    href: "/trading-evidence-requirement-preview",
    phase: "Phase 1670",
    title: "Trading Evidence Requirement Preview",
    commandLabel: "Go to Trading Evidence Requirement Preview",
    summary: "Previews trading evidence requirements without frontend evidence persistence.",
    markerPhrases: [
      "Trading evidence requirement preview",
      "Trading evidence requirement preview does not persist evidence audit results or trading decisions from the UI",
      "Trading evidence requirement preview requires backend-owned capture",
      "Trading evidence requirement preview shows thesis evidence risk evidence backtest evidence paper-trade evidence approval evidence broker-boundary evidence and audit continuity",
      "Denied trading evidence requirement paths remain blocked",
      "Trading evidence requirement checklist",
    ],
    sectionIds: ["tradingEvidenceRequirement", "tradeThesisRequirement", "approvedStrategyClasses", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-kill-switch-preview",
    href: "/trading-kill-switch-preview",
    phase: "Phase 1671",
    title: "Trading Kill Switch Preview",
    commandLabel: "Go to Trading Kill Switch Preview",
    summary: "Previews trading kill switch conditions without live trading control from the UI.",
    markerPhrases: [
      "Trading kill switch preview",
      "Trading kill switch preview does not stop live trading or control broker accounts from the UI",
      "Trading kill switch preview requires explicit operator approval",
      "Trading kill switch preview shows daily loss breach drawdown breach manual stop thesis invalidation broker error automation pause and backend-owned enforcement boundary",
      "Denied trading kill switch paths remain blocked",
      "Trading kill switch checklist",
    ],
    sectionIds: ["tradingKillSwitch", "maxDailyLossGuard", "maxDrawdownGuard", "tradeThesisRequirement", "deniedTradingMandateBoundaries"],
    devOnly: true,
  },
  {
    slug: "first-trading-mandate-risk-governor-candidate",
    href: "/first-trading-mandate-risk-governor-candidate",
    phase: "Phase 1672",
    title: "First Trading Mandate Risk Governor Candidate",
    commandLabel: "Go to First Trading Mandate Risk Governor Candidate",
    summary: "Combines the first safe Trading Mandate Risk Governor candidate without enabling trading workflows from the UI.",
    markerPhrases: [
      "First trading mandate risk governor candidate",
      "First trading mandate risk governor candidate does not enable trading workflows from the UI",
      "First trading mandate risk governor candidate requires explicit operator approval",
      "Candidate combines capital allocation active capital protected profit reinvestable profit daily loss drawdown position risk approved markets approved symbols strategy classes thesis evidence kill switch and denied mandate paths",
      "Denied first trading mandate risk governor paths remain blocked",
      "First trading mandate risk governor checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-trading-mandate-risk-governor-release-candidate",
    href: "/controlled-trading-mandate-risk-governor-release-candidate",
    phase: "Phase 1673",
    title: "Controlled Trading Mandate Risk Governor Release Candidate",
    commandLabel: "Go to Controlled Trading Mandate Risk Governor Release Candidate",
    summary: "Controlled Trading Mandate Risk Governor release candidate prepares backend-owned mandate and risk-governor workflows without frontend trading execution.",
    markerPhrases: [
      "Controlled trading mandate risk governor release candidate",
      "Controlled trading mandate risk governor release candidate does not connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled trading mandate risk governor release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned trading mandate and risk-governor workflows without frontend trading execution",
      "Denied controlled trading mandate risk governor paths remain blocked",
      "Controlled trading mandate risk governor release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listTradingMandateRiskGovernorRouteDefinitions(): readonly TradingMandateRiskGovernorRouteDefinition[] {
  return ROUTES;
}

export function getTradingMandateRiskGovernorRouteDefinition(
  slug: TradingMandateRiskGovernorRouteSlug
): TradingMandateRiskGovernorRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildTradingMandateRiskGovernorRouteModel(
  slug: TradingMandateRiskGovernorRouteSlug = "controlled-trading-mandate-risk-governor-release-candidate"
): TradingMandateRiskGovernorRouteModel {
  const route = getTradingMandateRiskGovernorRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is TradingMandateRiskGovernorSection => Boolean(section));

  return {
    route,
    tradingMandateRiskGovernor: TRADING_MANDATE_RISK_GOVERNOR_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: TRADING_MANDATE_RISK_GOVERNOR_COCKPIT_MARKERS,
    summary: summarizeTradingMandateRiskGovernorRoute(route, sections),
  };
}

export function buildTradingMandateRiskGovernorModel(): TradingMandateRiskGovernorRouteModel {
  return buildTradingMandateRiskGovernorRouteModel("controlled-trading-mandate-risk-governor-release-candidate");
}

export function summarizeTradingMandateRiskGovernorRoute(
  route: TradingMandateRiskGovernorRouteDefinition,
  sections: readonly TradingMandateRiskGovernorSection[]
): string {
  return `${route.title} keeps ${sections.length} trading mandate and risk-governor sections static, deterministic, review-only, approval-required, backend-owned, and blocked from frontend broker connection, trade placement, live market data calls, financial advice, personalised recommendation, buy sell instruction, automated trading, backtest execution, paper trade placement, order sizing, live account monitoring, money movement, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, browser storage writes, credential storage, and guaranteed profit claims.`;
}

export function buildTradingMandateRiskGovernorStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
