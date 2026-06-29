export type StrategyLabSignalEngineRouteSlug =
  | "strategy-lab-boundary"
  | "strategy-idea-intake-preview"
  | "strategy-hypothesis-preview"
  | "indicator-concept-preview"
  | "signal-rule-draft-preview"
  | "entry-rule-draft-preview"
  | "exit-rule-draft-preview"
  | "stop-loss-rule-draft-preview"
  | "take-profit-rule-draft-preview"
  | "position-sizing-concept-preview"
  | "signal-confidence-notes-preview"
  | "signal-invalidation-notes-preview"
  | "strategy-evidence-map-preview"
  | "cockpit-strategy-lab-summary"
  | "first-strategy-lab-signal-engine-candidate"
  | "controlled-strategy-lab-signal-engine-release-candidate";

export type StrategyLabSignalEngineKind =
  | "strategy-lab-signal-engine-v1"
  | StrategyLabSignalEngineRouteSlug;

export type StrategyLabSignalEngineState =
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "candidate"
  | "release-candidate";

export type StrategyLabSignalEngineItem = {
  id: string;
  label: string;
  detail: string;
  state: StrategyLabSignalEngineState;
};

export type StrategyLabSignalEngineSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly StrategyLabSignalEngineItem[];
  state: StrategyLabSignalEngineState;
};

export type StrategyLabSignalEngineModel = {
  strategyLabSignalEngineId: string;
  strategyLabSignalEngineKind: StrategyLabSignalEngineKind;
  strategyIdeaIntake: StrategyLabSignalEngineSection;
  strategyHypothesis: StrategyLabSignalEngineSection;
  indicatorConceptPreview: StrategyLabSignalEngineSection;
  signalRuleDraft: StrategyLabSignalEngineSection;
  entryRuleDraft: StrategyLabSignalEngineSection;
  exitRuleDraft: StrategyLabSignalEngineSection;
  stopLossRuleDraft: StrategyLabSignalEngineSection;
  takeProfitRuleDraft: StrategyLabSignalEngineSection;
  positionSizingConcept: StrategyLabSignalEngineSection;
  signalConfidenceNotes: StrategyLabSignalEngineSection;
  signalInvalidationNotes: StrategyLabSignalEngineSection;
  strategyEvidenceMap: StrategyLabSignalEngineSection;
  deniedStrategySignalBoundaries: StrategyLabSignalEngineSection;
  cockpitSummary: readonly StrategyLabSignalEngineItem[];
  explicitSafetyLimits: readonly string[];
};

export type StrategyLabSignalEngineRouteDefinition = {
  slug: StrategyLabSignalEngineRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type StrategyLabSignalEngineRouteModel = {
  route: StrategyLabSignalEngineRouteDefinition;
  strategyLabSignalEngine: StrategyLabSignalEngineModel;
  sections: readonly StrategyLabSignalEngineSection[];
  diagnosticRoutes: readonly StrategyLabSignalEngineRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const STRATEGY_LAB_SIGNAL_ENGINE_COCKPIT_MARKERS = [
  "Strategy Lab Signal Engine",
  "Strategy Lab",
  "Signal Engine",
  "Strategy Idea",
  "Strategy Hypothesis",
  "Indicator Concept",
  "Signal Rule Draft",
  "Entry Rule Draft",
  "Exit Rule Draft",
  "Stop Loss Rule Draft",
  "Take Profit Rule Draft",
  "Position Sizing Concept",
  "Signal Confidence Notes",
  "Signal Invalidation Notes",
  "Strategy Evidence Map",
  "No executable signals from the cockpit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
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
  "Strategy Lab Signal Engine v1 is review-only from the frontend.",
  "It is not trading execution, broker integration, live market data, financial advice, personalised investment recommendation, buy sell instruction, automated trading, signal execution, order placement, UI backtest execution, UI paper-trade placement, or money movement.",
  "The cockpit does not execute signals, connect brokers, place trades, fetch live market data, provide financial advice, provide personalised recommendations, issue buy sell instructions, run backtests, place paper trades, automate trading, size orders, monitor live accounts, move money, dispatch workers, call models, call providers, call connectors, send prompts, run commands, write files, persist approvals, persist evidence, persist audit, create queues, create transactions, store credentials, or write browser storage.",
  "Backtesting remains backend-owned.",
  "Paper trading remains backend-owned.",
  "Risk governor remains required.",
  "Backend-owned broker boundary remains required.",
  "Explicit operator approval remains required.",
  "No guaranteed profit claims are allowed.",
] as const;

const REQUIRED_SAFETY_MARKERS = [
  "strategy idea intake",
  "strategy hypothesis",
  "indicator concept preview",
  "signal rule draft",
  "entry rule draft",
  "exit rule draft",
  "stop loss rule draft",
  "take profit rule draft",
  "position sizing concept",
  "signal confidence notes",
  "signal invalidation notes",
  "strategy evidence map",
  "operator approval gates",
  "risk governor prerequisite",
  "backend-owned broker boundary prerequisite",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review cards only.",
  "Future strategy lab and signal engine workflows remain backend-owned, approval-gated, evidence-backed, risk-governed, and outside direct frontend execution.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, broker instruction, automated trading, or guaranteed profit claim.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No executable signals, broker connection, broker account access, portfolio access, credential storage, endpoint storage, live quote fetching, market data API calls, exchange API calls, order placement, paper trade placement, automated execution, signal execution, backtest execution, order sizing, live account monitoring, money movement, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, browser storage writes, approval persistence, evidence persistence, audit persistence, result persistence, queue creation, transaction creation, or worker dispatch from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Risk governor remains required before any future strategy workflow.",
  "Backend-owned broker boundary remains required before any future broker-adjacent workflow.",
  "Backtesting and paper trading remain backend-owned.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly StrategyLabSignalEngineItem[] {
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

function createSection(section: StrategyLabSignalEngineSection): StrategyLabSignalEngineSection {
  return section;
}

const STRATEGY_LAB_BOUNDARY = createSection({
  sectionId: "strategyLabBoundary",
  label: "Strategy Lab",
  title: "Strategy Lab Boundary",
  humanReadableSummary:
    "Strategy lab boundary keeps strategy and signal design review-only, with signal execution, broker connection, trade placement, live market data, financial advice, personalised recommendations, buy sell instructions, and automation blocked from the UI.",
  plannedInputs: ["Strategy lab scope", "Signal engine scope", "Denied strategy signal paths", "Backend-owned workflow prerequisites"],
  plannedOutputs: ["Boundary statement", "Operator approval requirement", "Backend-owned strategy workflow", "Denied strategy lab paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "strategy-lab-boundary",
    "Strategy lab boundary prepares backend-owned strategy and signal workflows without frontend trading execution.",
    "Strategy lab boundary does not execute signals connect brokers place trades fetch live market data provide financial advice or enable automation from the UI.",
    "Strategy lab boundary requires explicit operator approval before any future strategy workflow."
  ),
  state: "blocked",
});

const STRATEGY_IDEA_INTAKE = createSection({
  sectionId: "strategyIdeaIntake",
  label: "Strategy Idea",
  title: "Strategy Idea Intake Preview",
  humanReadableSummary:
    "Strategy idea intake preview captures strategy idea, market hypothesis, timeframe, risk style, data needs, evidence needs, and paper-trade prerequisites without sending prompts, creating jobs, fetching market data, or creating executable signals from the UI.",
  plannedInputs: ["Strategy idea", "Market hypothesis", "Timeframe", "Risk style", "Data needs", "Evidence needs", "Paper-trade prerequisites"],
  plannedOutputs: ["Review-only idea packet", "Evidence needs", "Data needs", "Paper-trade prerequisites"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "strategy-idea-intake",
    "Strategy idea intake preview captures strategy idea market hypothesis timeframe risk style data needs evidence needs and paper-trade prerequisites.",
    "Strategy idea intake preview does not send prompts create jobs fetch market data or create executable signals from the UI.",
    "Strategy idea intake preview requires explicit operator approval."
  ),
  state: "review-only",
});

const STRATEGY_HYPOTHESIS = createSection({
  sectionId: "strategyHypothesis",
  label: "Strategy Hypothesis",
  title: "Strategy Hypothesis Preview",
  humanReadableSummary:
    "Strategy hypothesis preview shows hypothesis, counter-hypothesis, assumptions, market regime, risk regime, invalidation, and evidence requirements without financial advice, personalised recommendations, or buy sell instructions.",
  plannedInputs: ["Hypothesis", "Counter-hypothesis", "Assumptions", "Market regime", "Risk regime", "Invalidation", "Evidence requirements"],
  plannedOutputs: ["Hypothesis note", "Counter-hypothesis note", "Regime framing", "Evidence requirements"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "strategy-hypothesis",
    "Strategy hypothesis preview shows hypothesis counter-hypothesis assumptions market regime risk regime invalidation and evidence requirements.",
    "Strategy hypothesis preview does not provide financial advice personalised recommendations or buy sell instructions.",
    "Strategy hypothesis preview requires explicit operator approval."
  ),
  state: "review-only",
});

const INDICATOR_CONCEPT_PREVIEW = createSection({
  sectionId: "indicatorConceptPreview",
  label: "Indicator Concept",
  title: "Indicator Concept Preview",
  humanReadableSummary:
    "Indicator concept preview shows indicator concept inputs, lookback assumptions, smoothing notes, lag risk, false signal risk, and backend-owned computation boundary without fetching live data, computing live indicators, or issuing signals from the UI.",
  plannedInputs: ["Indicator concept inputs", "Lookback assumptions", "Smoothing notes", "Lag risk", "False signal risk"],
  plannedOutputs: ["Indicator concept preview", "Backend-owned computation boundary", "Lag risk note", "False signal risk note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "indicator-concept",
    "Indicator concept preview shows indicator concept inputs lookback assumptions smoothing notes lag risk false signal risk and backend-owned computation boundary.",
    "Indicator concept preview does not fetch live data compute live indicators or issue signals from the UI.",
    "Indicator concept preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const SIGNAL_RULE_DRAFT = createSection({
  sectionId: "signalRuleDraft",
  label: "Signal Rule Draft",
  title: "Signal Rule Draft Preview",
  humanReadableSummary:
    "Signal rule draft preview shows review-only signal conditions, confirmation filters, risk filters, evidence needs, and no executable signal state without executing signals, automating trades, or placing orders.",
  plannedInputs: ["Signal conditions", "Confirmation filters", "Risk filters", "Evidence needs", "No executable signal state"],
  plannedOutputs: ["Signal rule draft", "Confirmation filter notes", "Risk filter notes", "Evidence needs"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "signal-rule-draft",
    "Signal rule draft preview shows review-only signal conditions confirmation filters risk filters evidence needs and no executable signal state.",
    "Signal rule draft preview does not execute signals automate trades or place orders.",
    "Signal rule draft preview requires explicit operator approval."
  ),
  state: "review-only",
});

const ENTRY_RULE_DRAFT = createSection({
  sectionId: "entryRuleDraft",
  label: "Entry Rule Draft",
  title: "Entry Rule Draft Preview",
  humanReadableSummary:
    "Entry rule draft preview shows entry condition draft, confirmation requirements, allowed market context, risk checks, evidence needs, and manual approval requirement without creating buy instructions, submitting orders, or automating entries.",
  plannedInputs: ["Entry condition draft", "Confirmation requirements", "Allowed market context", "Risk checks", "Evidence needs"],
  plannedOutputs: ["Entry rule draft", "Manual approval requirement", "Risk check notes", "Evidence needs"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "entry-rule-draft",
    "Entry rule draft preview shows entry condition draft confirmation requirements allowed market context risk checks evidence needs and manual approval requirement.",
    "Entry rule draft preview does not create buy instructions submit orders or automate entries.",
    "Entry rule draft preview requires explicit operator approval."
  ),
  state: "review-only",
});

const EXIT_RULE_DRAFT = createSection({
  sectionId: "exitRuleDraft",
  label: "Exit Rule Draft",
  title: "Exit Rule Draft Preview",
  humanReadableSummary:
    "Exit rule draft preview shows exit condition draft, invalidation condition, risk exit, profit exit, time exit, evidence needs, and manual approval requirement without creating sell instructions, submitting orders, or automating exits.",
  plannedInputs: ["Exit condition draft", "Invalidation condition", "Risk exit", "Profit exit", "Time exit", "Evidence needs"],
  plannedOutputs: ["Exit rule draft", "Invalidation condition", "Risk exit", "Profit exit", "Manual approval requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "exit-rule-draft",
    "Exit rule draft preview shows exit condition draft invalidation condition risk exit profit exit time exit evidence needs and manual approval requirement.",
    "Exit rule draft preview does not create sell instructions submit orders or automate exits.",
    "Exit rule draft preview requires explicit operator approval."
  ),
  state: "review-only",
});

const STOP_LOSS_RULE_DRAFT = createSection({
  sectionId: "stopLossRuleDraft",
  label: "Stop Loss Rule Draft",
  title: "Stop Loss Rule Draft Preview",
  humanReadableSummary:
    "Stop loss rule draft preview shows stop concept, stop distance assumption, volatility note, invalidation trigger, risk impact, and backend-owned enforcement boundary without sizing orders, placing stops, or controlling broker accounts.",
  plannedInputs: ["Stop concept", "Stop distance assumption", "Volatility note", "Invalidation trigger", "Risk impact"],
  plannedOutputs: ["Stop loss rule draft", "Risk impact note", "Invalidation trigger", "Backend-owned enforcement boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "stop-loss-rule-draft",
    "Stop loss rule draft preview shows stop concept stop distance assumption volatility note invalidation trigger risk impact and backend-owned enforcement boundary.",
    "Stop loss rule draft preview does not size orders place stops or control broker accounts.",
    "Stop loss rule draft preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const TAKE_PROFIT_RULE_DRAFT = createSection({
  sectionId: "takeProfitRuleDraft",
  label: "Take Profit Rule Draft",
  title: "Take Profit Rule Draft Preview",
  humanReadableSummary:
    "Take profit rule draft preview shows target concept, reward risk framing, partial exit concept, protected profit note, reinvestable profit note, and no guaranteed profit claim without placing take profit orders or guaranteeing returns.",
  plannedInputs: ["Target concept", "Reward risk framing", "Partial exit concept", "Protected profit note", "Reinvestable profit note"],
  plannedOutputs: ["Take profit rule draft", "Protected profit note", "Reinvestable profit note", "No guaranteed profit claim"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "take-profit-rule-draft",
    "Take profit rule draft preview shows target concept reward risk framing partial exit concept protected profit note reinvestable profit note and no guaranteed profit claim.",
    "Take profit rule draft preview does not place take profit orders or guarantee returns.",
    "Take profit rule draft preview requires explicit operator approval."
  ),
  state: "review-only",
});

const POSITION_SIZING_CONCEPT = createSection({
  sectionId: "positionSizingConcept",
  label: "Position Sizing Concept",
  title: "Position Sizing Concept Preview",
  humanReadableSummary:
    "Position sizing concept preview shows position sizing concept, risk percent, stop distance assumption, capital constraint, drawdown constraint, liquidity warning, and backend-owned sizing boundary without sizing orders, submitting trades, or accessing broker balances.",
  plannedInputs: ["Position sizing concept", "Risk percent", "Stop distance assumption", "Capital constraint", "Drawdown constraint", "Liquidity warning"],
  plannedOutputs: ["Position sizing concept", "Drawdown constraint", "Liquidity warning", "Backend-owned sizing boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "position-sizing-concept",
    "Position sizing concept preview shows position sizing concept risk percent stop distance assumption capital constraint drawdown constraint liquidity warning and backend-owned sizing boundary.",
    "Position sizing concept preview does not size orders submit trades or access broker balances.",
    "Position sizing concept preview requires explicit operator approval."
  ),
  state: "backend-owned",
});

const SIGNAL_CONFIDENCE_NOTES = createSection({
  sectionId: "signalConfidenceNotes",
  label: "Signal Confidence Notes",
  title: "Signal Confidence Notes Preview",
  humanReadableSummary:
    "Signal confidence notes preview shows evidence quality, uncertainty factors, regime fit, data quality, false positive risk, and manual review notes without scoring live signals or providing personalised recommendations.",
  plannedInputs: ["Evidence quality", "Uncertainty factors", "Regime fit", "Data quality", "False positive risk", "Manual review notes"],
  plannedOutputs: ["Signal confidence notes", "Uncertainty factors", "Regime fit", "Manual review notes"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "signal-confidence-notes",
    "Signal confidence notes preview shows evidence quality uncertainty factors regime fit data quality false positive risk and manual review notes.",
    "Signal confidence notes preview does not score live signals or provide personalised recommendations.",
    "Signal confidence notes preview requires explicit operator approval."
  ),
  state: "review-only",
});

const SIGNAL_INVALIDATION_NOTES = createSection({
  sectionId: "signalInvalidationNotes",
  label: "Signal Invalidation Notes",
  title: "Signal Invalidation Notes Preview",
  humanReadableSummary:
    "Signal invalidation notes preview shows invalidation triggers, thesis break, risk breach, data failure, catalyst miss, and operator review boundary without stopping trades, controlling brokers, or automating exits from the UI.",
  plannedInputs: ["Invalidation triggers", "Thesis break", "Risk breach", "Data failure", "Catalyst miss", "Operator review boundary"],
  plannedOutputs: ["Signal invalidation notes", "Risk breach note", "Data failure note", "Operator review boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "signal-invalidation-notes",
    "Signal invalidation notes preview shows invalidation triggers thesis break risk breach data failure catalyst miss and operator review boundary.",
    "Signal invalidation notes preview does not stop trades control brokers or automate exits from the UI.",
    "Signal invalidation notes preview requires explicit operator approval."
  ),
  state: "review-only",
});

const STRATEGY_EVIDENCE_MAP = createSection({
  sectionId: "strategyEvidenceMap",
  label: "Strategy Evidence Map",
  title: "Strategy Evidence Map Preview",
  humanReadableSummary:
    "Strategy evidence map preview shows hypothesis evidence, indicator evidence, signal evidence, risk evidence, backtest evidence, paper-trade evidence, approval evidence, and audit continuity without persisting evidence audit results or trading decisions from the UI.",
  plannedInputs: ["Hypothesis evidence", "Indicator evidence", "Signal evidence", "Risk evidence", "Backtest evidence", "Paper-trade evidence", "Approval evidence"],
  plannedOutputs: ["Strategy evidence map", "Audit continuity", "Backend-owned capture requirement", "Approval evidence"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "strategy-evidence-map",
    "Strategy evidence map preview shows hypothesis evidence indicator evidence signal evidence risk evidence backtest evidence paper-trade evidence approval evidence and audit continuity.",
    "Strategy evidence map preview does not persist evidence audit results or trading decisions from the UI.",
    "Strategy evidence map preview requires backend-owned capture."
  ),
  state: "backend-owned",
});

const DENIED_STRATEGY_SIGNAL_BOUNDARIES = createSection({
  sectionId: "deniedStrategySignalBoundaries",
  label: "Denied Strategy Signal Paths",
  title: "Denied Strategy Signal Boundaries",
  humanReadableSummary:
    "Denied strategy signal boundaries keep executable signals, broker connections, trade placement, live market data calls, financial advice, personalised recommendations, buy sell instructions, guaranteed profit claims, and trading automation blocked from the cockpit.",
  plannedInputs: ["Denied executable signal paths", "Denied broker paths", "Denied market data paths", "Denied advice paths", "Denied automation paths"],
  plannedOutputs: ["Denied strategy lab paths", "Denied signal engine paths", "Required risk governor", "Backend-owned broker boundary"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "denied-strategy-signal-boundaries",
    "Denied strategy signal paths remain blocked for every Strategy Lab Signal Engine preview.",
    "Denied strategy signal boundaries do not execute signals connect brokers place trades fetch live market data provide financial advice or enable automation from the UI.",
    "Denied strategy signal boundaries require explicit operator approval and backend-owned broker boundary before future workflows."
  ),
  state: "blocked",
});

const STRATEGY_LAB_SIGNAL_ENGINE_MODEL: StrategyLabSignalEngineModel = {
  strategyLabSignalEngineId: "strategy-lab-signal-engine-v1",
  strategyLabSignalEngineKind: "strategy-lab-signal-engine-v1",
  strategyIdeaIntake: STRATEGY_IDEA_INTAKE,
  strategyHypothesis: STRATEGY_HYPOTHESIS,
  indicatorConceptPreview: INDICATOR_CONCEPT_PREVIEW,
  signalRuleDraft: SIGNAL_RULE_DRAFT,
  entryRuleDraft: ENTRY_RULE_DRAFT,
  exitRuleDraft: EXIT_RULE_DRAFT,
  stopLossRuleDraft: STOP_LOSS_RULE_DRAFT,
  takeProfitRuleDraft: TAKE_PROFIT_RULE_DRAFT,
  positionSizingConcept: POSITION_SIZING_CONCEPT,
  signalConfidenceNotes: SIGNAL_CONFIDENCE_NOTES,
  signalInvalidationNotes: SIGNAL_INVALIDATION_NOTES,
  strategyEvidenceMap: STRATEGY_EVIDENCE_MAP,
  deniedStrategySignalBoundaries: DENIED_STRATEGY_SIGNAL_BOUNDARIES,
  cockpitSummary: [
    {
      id: "strategy-lab-review-only",
      label: "Review-only strategy design",
      detail:
        "Strategy Lab Signal Engine keeps strategy ideas, hypotheses, indicator concepts, signal rules, entry rules, exit rules, stop loss, take profit, position sizing, confidence, invalidation, and evidence as static review-only content.",
      state: "review-only",
    },
    {
      id: "strategy-lab-no-execution",
      label: "No frontend signal execution",
      detail:
        "No executable signals from the cockpit, no broker connections from the cockpit, no trade placement from the cockpit, and no live market data calls from the cockpit.",
      state: "blocked",
    },
    {
      id: "strategy-lab-backend-owned",
      label: "Backend-owned future workflow",
      detail:
        "Backtesting remains backend-owned, paper trading remains backend-owned, risk governor remains required, backend-owned broker boundary remains required, and explicit operator approval remains required.",
      state: "backend-owned",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, StrategyLabSignalEngineSection> = {
  strategyLabBoundary: STRATEGY_LAB_BOUNDARY,
  strategyIdeaIntake: STRATEGY_IDEA_INTAKE,
  strategyHypothesis: STRATEGY_HYPOTHESIS,
  indicatorConceptPreview: INDICATOR_CONCEPT_PREVIEW,
  signalRuleDraft: SIGNAL_RULE_DRAFT,
  entryRuleDraft: ENTRY_RULE_DRAFT,
  exitRuleDraft: EXIT_RULE_DRAFT,
  stopLossRuleDraft: STOP_LOSS_RULE_DRAFT,
  takeProfitRuleDraft: TAKE_PROFIT_RULE_DRAFT,
  positionSizingConcept: POSITION_SIZING_CONCEPT,
  signalConfidenceNotes: SIGNAL_CONFIDENCE_NOTES,
  signalInvalidationNotes: SIGNAL_INVALIDATION_NOTES,
  strategyEvidenceMap: STRATEGY_EVIDENCE_MAP,
  deniedStrategySignalBoundaries: DENIED_STRATEGY_SIGNAL_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "strategyLabBoundary",
  "strategyIdeaIntake",
  "strategyHypothesis",
  "indicatorConceptPreview",
  "signalRuleDraft",
  "entryRuleDraft",
  "exitRuleDraft",
  "stopLossRuleDraft",
  "takeProfitRuleDraft",
  "positionSizingConcept",
  "signalConfidenceNotes",
  "signalInvalidationNotes",
  "strategyEvidenceMap",
  "deniedStrategySignalBoundaries",
] as const;

const ROUTES: readonly StrategyLabSignalEngineRouteDefinition[] = [
  {
    slug: "strategy-lab-boundary",
    href: "/strategy-lab-boundary",
    phase: "Phase 1674",
    title: "Strategy Lab Boundary",
    commandLabel: "Go to Strategy Lab Boundary",
    summary: "Defines the Strategy Lab boundary without frontend signal execution, broker access, market data calls, advice, or automation.",
    markerPhrases: [
      "Strategy lab boundary",
      "Strategy lab boundary does not execute signals connect brokers place trades fetch live market data provide financial advice or enable automation from the UI",
      "Strategy lab boundary requires explicit operator approval before any future strategy workflow",
      "Strategy lab boundary prepares backend-owned strategy and signal workflows without frontend trading execution",
      "Denied strategy lab paths remain blocked",
      "Strategy lab boundary checklist",
    ],
    sectionIds: ["strategyLabBoundary", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "strategy-idea-intake-preview",
    href: "/strategy-idea-intake-preview",
    phase: "Phase 1675",
    title: "Strategy Idea Intake Preview",
    commandLabel: "Go to Strategy Idea Intake Preview",
    summary: "Previews strategy idea intake without prompts, jobs, market data, or executable signals.",
    markerPhrases: [
      "Strategy idea intake preview",
      "Strategy idea intake preview does not send prompts create jobs fetch market data or create executable signals from the UI",
      "Strategy idea intake preview requires explicit operator approval",
      "Strategy idea intake preview captures strategy idea market hypothesis timeframe risk style data needs evidence needs and paper-trade prerequisites",
      "Denied strategy idea intake paths remain blocked",
      "Strategy idea intake checklist",
    ],
    sectionIds: ["strategyIdeaIntake", "strategyHypothesis", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "strategy-hypothesis-preview",
    href: "/strategy-hypothesis-preview",
    phase: "Phase 1676",
    title: "Strategy Hypothesis Preview",
    commandLabel: "Go to Strategy Hypothesis Preview",
    summary: "Previews strategy hypothesis without advice, personalised recommendations, or buy sell instructions.",
    markerPhrases: [
      "Strategy hypothesis preview",
      "Strategy hypothesis preview does not provide financial advice personalised recommendations or buy sell instructions",
      "Strategy hypothesis preview requires explicit operator approval",
      "Strategy hypothesis preview shows hypothesis counter-hypothesis assumptions market regime risk regime invalidation and evidence requirements",
      "Denied strategy hypothesis paths remain blocked",
      "Strategy hypothesis checklist",
    ],
    sectionIds: ["strategyHypothesis", "strategyIdeaIntake", "signalInvalidationNotes", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "indicator-concept-preview",
    href: "/indicator-concept-preview",
    phase: "Phase 1677",
    title: "Indicator Concept Preview",
    commandLabel: "Go to Indicator Concept Preview",
    summary: "Previews indicator concepts without live data fetching, live computation, or UI-issued signals.",
    markerPhrases: [
      "Indicator concept preview",
      "Indicator concept preview does not fetch live data compute live indicators or issue signals from the UI",
      "Indicator concept preview requires explicit operator approval",
      "Indicator concept preview shows indicator concept inputs lookback assumptions smoothing notes lag risk false signal risk and backend-owned computation boundary",
      "Denied indicator concept paths remain blocked",
      "Indicator concept checklist",
    ],
    sectionIds: ["indicatorConceptPreview", "signalRuleDraft", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "signal-rule-draft-preview",
    href: "/signal-rule-draft-preview",
    phase: "Phase 1678",
    title: "Signal Rule Draft Preview",
    commandLabel: "Go to Signal Rule Draft Preview",
    summary: "Previews signal rule drafts without signal execution, trade automation, or order placement.",
    markerPhrases: [
      "Signal rule draft preview",
      "Signal rule draft preview does not execute signals automate trades or place orders",
      "Signal rule draft preview requires explicit operator approval",
      "Signal rule draft preview shows review-only signal conditions confirmation filters risk filters evidence needs and no executable signal state",
      "Denied signal rule draft paths remain blocked",
      "Signal rule draft checklist",
    ],
    sectionIds: ["signalRuleDraft", "indicatorConceptPreview", "entryRuleDraft", "exitRuleDraft", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "entry-rule-draft-preview",
    href: "/entry-rule-draft-preview",
    phase: "Phase 1679",
    title: "Entry Rule Draft Preview",
    commandLabel: "Go to Entry Rule Draft Preview",
    summary: "Previews entry rule drafts without buy instructions, submitted orders, or automated entries.",
    markerPhrases: [
      "Entry rule draft preview",
      "Entry rule draft preview does not create buy instructions submit orders or automate entries",
      "Entry rule draft preview requires explicit operator approval",
      "Entry rule draft preview shows entry condition draft confirmation requirements allowed market context risk checks evidence needs and manual approval requirement",
      "Denied entry rule draft paths remain blocked",
      "Entry rule draft checklist",
    ],
    sectionIds: ["entryRuleDraft", "signalRuleDraft", "positionSizingConcept", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "exit-rule-draft-preview",
    href: "/exit-rule-draft-preview",
    phase: "Phase 1680",
    title: "Exit Rule Draft Preview",
    commandLabel: "Go to Exit Rule Draft Preview",
    summary: "Previews exit rule drafts without sell instructions, submitted orders, or automated exits.",
    markerPhrases: [
      "Exit rule draft preview",
      "Exit rule draft preview does not create sell instructions submit orders or automate exits",
      "Exit rule draft preview requires explicit operator approval",
      "Exit rule draft preview shows exit condition draft invalidation condition risk exit profit exit time exit evidence needs and manual approval requirement",
      "Denied exit rule draft paths remain blocked",
      "Exit rule draft checklist",
    ],
    sectionIds: ["exitRuleDraft", "signalInvalidationNotes", "stopLossRuleDraft", "takeProfitRuleDraft", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "stop-loss-rule-draft-preview",
    href: "/stop-loss-rule-draft-preview",
    phase: "Phase 1681",
    title: "Stop Loss Rule Draft Preview",
    commandLabel: "Go to Stop Loss Rule Draft Preview",
    summary: "Previews stop loss rule drafts without order sizing, stop placement, or broker control.",
    markerPhrases: [
      "Stop loss rule draft preview",
      "Stop loss rule draft preview does not size orders place stops or control broker accounts",
      "Stop loss rule draft preview requires explicit operator approval",
      "Stop loss rule draft preview shows stop concept stop distance assumption volatility note invalidation trigger risk impact and backend-owned enforcement boundary",
      "Denied stop loss rule draft paths remain blocked",
      "Stop loss rule draft checklist",
    ],
    sectionIds: ["stopLossRuleDraft", "positionSizingConcept", "signalInvalidationNotes", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "take-profit-rule-draft-preview",
    href: "/take-profit-rule-draft-preview",
    phase: "Phase 1682",
    title: "Take Profit Rule Draft Preview",
    commandLabel: "Go to Take Profit Rule Draft Preview",
    summary: "Previews take profit rule drafts without take profit orders or guaranteed returns.",
    markerPhrases: [
      "Take profit rule draft preview",
      "Take profit rule draft preview does not place take profit orders or guarantee returns",
      "Take profit rule draft preview requires explicit operator approval",
      "Take profit rule draft preview shows target concept reward risk framing partial exit concept protected profit note reinvestable profit note and no guaranteed profit claim",
      "Denied take profit rule draft paths remain blocked",
      "Take profit rule draft checklist",
    ],
    sectionIds: ["takeProfitRuleDraft", "exitRuleDraft", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "position-sizing-concept-preview",
    href: "/position-sizing-concept-preview",
    phase: "Phase 1683",
    title: "Position Sizing Concept Preview",
    commandLabel: "Go to Position Sizing Concept Preview",
    summary: "Previews position sizing concepts without sizing orders, submitting trades, or broker balance access.",
    markerPhrases: [
      "Position sizing concept preview",
      "Position sizing concept preview does not size orders submit trades or access broker balances",
      "Position sizing concept preview requires explicit operator approval",
      "Position sizing concept preview shows position sizing concept risk percent stop distance assumption capital constraint drawdown constraint liquidity warning and backend-owned sizing boundary",
      "Denied position sizing concept paths remain blocked",
      "Position sizing concept checklist",
    ],
    sectionIds: ["positionSizingConcept", "stopLossRuleDraft", "entryRuleDraft", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "signal-confidence-notes-preview",
    href: "/signal-confidence-notes-preview",
    phase: "Phase 1684",
    title: "Signal Confidence Notes Preview",
    commandLabel: "Go to Signal Confidence Notes Preview",
    summary: "Previews signal confidence notes without live signal scoring or personalised recommendations.",
    markerPhrases: [
      "Signal confidence notes preview",
      "Signal confidence notes preview does not score live signals or provide personalised recommendations",
      "Signal confidence notes preview requires explicit operator approval",
      "Signal confidence notes preview shows evidence quality uncertainty factors regime fit data quality false positive risk and manual review notes",
      "Denied signal confidence paths remain blocked",
      "Signal confidence notes checklist",
    ],
    sectionIds: ["signalConfidenceNotes", "signalRuleDraft", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "signal-invalidation-notes-preview",
    href: "/signal-invalidation-notes-preview",
    phase: "Phase 1685",
    title: "Signal Invalidation Notes Preview",
    commandLabel: "Go to Signal Invalidation Notes Preview",
    summary: "Previews signal invalidation notes without stopping trades, broker control, or automated exits.",
    markerPhrases: [
      "Signal invalidation notes preview",
      "Signal invalidation notes preview does not stop trades control brokers or automate exits from the UI",
      "Signal invalidation notes preview requires explicit operator approval",
      "Signal invalidation notes preview shows invalidation triggers thesis break risk breach data failure catalyst miss and operator review boundary",
      "Denied signal invalidation paths remain blocked",
      "Signal invalidation notes checklist",
    ],
    sectionIds: ["signalInvalidationNotes", "strategyHypothesis", "exitRuleDraft", "strategyEvidenceMap", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "strategy-evidence-map-preview",
    href: "/strategy-evidence-map-preview",
    phase: "Phase 1686",
    title: "Strategy Evidence Map Preview",
    commandLabel: "Go to Strategy Evidence Map Preview",
    summary: "Previews strategy evidence maps without frontend evidence audit result or trading decision persistence.",
    markerPhrases: [
      "Strategy evidence map preview",
      "Strategy evidence map preview does not persist evidence audit results or trading decisions from the UI",
      "Strategy evidence map preview requires backend-owned capture",
      "Strategy evidence map preview shows hypothesis evidence indicator evidence signal evidence risk evidence backtest evidence paper-trade evidence approval evidence and audit continuity",
      "Denied strategy evidence map paths remain blocked",
      "Strategy evidence map checklist",
    ],
    sectionIds: ["strategyEvidenceMap", "strategyHypothesis", "indicatorConceptPreview", "signalRuleDraft", "deniedStrategySignalBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-strategy-lab-summary",
    href: "/cockpit-strategy-lab-summary",
    phase: "Phase 1687",
    title: "Cockpit Strategy Lab Summary",
    commandLabel: "Go to Cockpit Strategy Lab Summary",
    summary: "Summarizes Strategy Lab Signal Engine in the cockpit without frontend trading execution.",
    markerPhrases: [
      "Cockpit strategy lab summary",
      "Cockpit strategy lab summary keeps the cockpit as the normal user surface",
      "Cockpit strategy lab summary does not execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading or size orders from the cockpit",
      "Cockpit strategy lab summary shows strategy idea hypothesis indicator concepts signal rules entry rules exit rules stop loss take profit position sizing confidence invalidation evidence and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit strategy lab checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-strategy-lab-signal-engine-candidate",
    href: "/first-strategy-lab-signal-engine-candidate",
    phase: "Phase 1688",
    title: "First Strategy Lab Signal Engine Candidate",
    commandLabel: "Go to First Strategy Lab Signal Engine Candidate",
    summary: "Combines the first Strategy Lab Signal Engine candidate without enabling trading workflows from the UI.",
    markerPhrases: [
      "First strategy lab signal engine candidate",
      "First strategy lab signal engine candidate does not enable trading workflows from the UI",
      "First strategy lab signal engine candidate requires explicit operator approval",
      "Candidate combines strategy idea hypothesis indicator concepts signal rules entry rules exit rules stop loss take profit position sizing confidence invalidation evidence cockpit summary and denied strategy signal paths",
      "Denied first strategy lab signal engine paths remain blocked",
      "First strategy lab signal engine checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-strategy-lab-signal-engine-release-candidate",
    href: "/controlled-strategy-lab-signal-engine-release-candidate",
    phase: "Phase 1689",
    title: "Controlled Strategy Lab Signal Engine Release Candidate",
    commandLabel: "Go to Controlled Strategy Lab Signal Engine Release Candidate",
    summary: "Controlled Strategy Lab Signal Engine release candidate prepares backend-owned strategy and signal workflows without frontend trading execution.",
    markerPhrases: [
      "Controlled strategy lab signal engine release candidate",
      "Controlled strategy lab signal engine release candidate does not execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled strategy lab signal engine release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned strategy and signal workflows without frontend trading execution",
      "Denied controlled strategy lab signal engine paths remain blocked",
      "Controlled strategy lab signal engine release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listStrategyLabSignalEngineRouteDefinitions(): readonly StrategyLabSignalEngineRouteDefinition[] {
  return ROUTES;
}

export function getStrategyLabSignalEngineRouteDefinition(
  slug: StrategyLabSignalEngineRouteSlug
): StrategyLabSignalEngineRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildStrategyLabSignalEngineRouteModel(
  slug: StrategyLabSignalEngineRouteSlug = "controlled-strategy-lab-signal-engine-release-candidate"
): StrategyLabSignalEngineRouteModel {
  const route = getStrategyLabSignalEngineRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is StrategyLabSignalEngineSection => Boolean(section));

  return {
    route,
    strategyLabSignalEngine: STRATEGY_LAB_SIGNAL_ENGINE_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: STRATEGY_LAB_SIGNAL_ENGINE_COCKPIT_MARKERS,
    summary: summarizeStrategyLabSignalEngineRoute(route, sections),
  };
}

export function buildStrategyLabSignalEngineModel(): StrategyLabSignalEngineRouteModel {
  return buildStrategyLabSignalEngineRouteModel("controlled-strategy-lab-signal-engine-release-candidate");
}

export function summarizeStrategyLabSignalEngineRoute(
  route: StrategyLabSignalEngineRouteDefinition,
  sections: readonly StrategyLabSignalEngineSection[]
): string {
  return `${route.title} keeps ${sections.length} strategy lab and signal engine sections static, deterministic, review-only, approval-required, backend-owned, risk-governed, and blocked from frontend executable signals, broker connection, trade placement, live market data calls, financial advice, personalised recommendation, buy sell instruction, automated trading, backtest execution, paper trade placement, order sizing, live account monitoring, money movement, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, browser storage writes, credential storage, and guaranteed profit claims. Required markers: ${REQUIRED_SAFETY_MARKERS.join(", ")}.`;
}

export function buildStrategyLabSignalEngineStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
