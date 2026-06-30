export type StrategyPerformanceReviewLoopRouteSlug =
  | "strategy-performance-review-loop-boundary"
  | "simulated-strategy-scorecard-preview"
  | "simulated-rule-outcome-review-preview"
  | "simulated-entry-rule-review-preview"
  | "simulated-exit-rule-review-preview"
  | "simulated-risk-rule-review-preview"
  | "simulated-invalidation-review-preview"
  | "simulated-evidence-feedback-preview"
  | "simulated-hypothesis-update-preview"
  | "simulated-watchlist-feedback-preview"
  | "simulated-operator-review-decision-preview"
  | "simulated-strategy-change-request-preview"
  | "simulated-no-auto-tune-boundary-preview"
  | "cockpit-strategy-performance-review-summary"
  | "first-strategy-performance-review-loop-candidate"
  | "controlled-strategy-performance-review-loop-release-candidate";

export type StrategyPerformanceReviewLoopKind =
  | "strategy-performance-review-loop-v1"
  | StrategyPerformanceReviewLoopRouteSlug;

export type StrategyPerformanceReviewLoopState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type StrategyPerformanceReviewLoopItem = {
  id: string;
  label: string;
  detail: string;
  state: StrategyPerformanceReviewLoopState;
};

export type StrategyPerformanceReviewLoopSectionId =
  | "simulatedStrategyScorecard"
  | "simulatedRuleOutcomeReview"
  | "simulatedEntryRuleReview"
  | "simulatedExitRuleReview"
  | "simulatedRiskRuleReview"
  | "simulatedInvalidationReview"
  | "simulatedEvidenceFeedback"
  | "simulatedHypothesisUpdate"
  | "simulatedWatchlistFeedback"
  | "simulatedOperatorReviewDecision"
  | "simulatedStrategyChangeRequest"
  | "simulatedNoAutoTuneBoundary"
  | "deniedStrategyPerformanceReviewBoundaries";

export type StrategyPerformanceReviewLoopSection = {
  sectionId: StrategyPerformanceReviewLoopSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly StrategyPerformanceReviewLoopItem[];
  state: StrategyPerformanceReviewLoopState;
};

export type StrategyPerformanceReviewLoopModel = {
  strategyPerformanceReviewLoopId: string;
  strategyPerformanceReviewLoopKind: StrategyPerformanceReviewLoopKind;
  simulatedStrategyScorecard: StrategyPerformanceReviewLoopSection;
  simulatedRuleOutcomeReview: StrategyPerformanceReviewLoopSection;
  simulatedEntryRuleReview: StrategyPerformanceReviewLoopSection;
  simulatedExitRuleReview: StrategyPerformanceReviewLoopSection;
  simulatedRiskRuleReview: StrategyPerformanceReviewLoopSection;
  simulatedInvalidationReview: StrategyPerformanceReviewLoopSection;
  simulatedEvidenceFeedback: StrategyPerformanceReviewLoopSection;
  simulatedHypothesisUpdate: StrategyPerformanceReviewLoopSection;
  simulatedWatchlistFeedback: StrategyPerformanceReviewLoopSection;
  simulatedOperatorReviewDecision: StrategyPerformanceReviewLoopSection;
  simulatedStrategyChangeRequest: StrategyPerformanceReviewLoopSection;
  simulatedNoAutoTuneBoundary: StrategyPerformanceReviewLoopSection;
  deniedStrategyPerformanceReviewBoundaries: StrategyPerformanceReviewLoopSection;
  cockpitSummary: readonly StrategyPerformanceReviewLoopItem[];
  explicitSafetyLimits: readonly string[];
};

export type StrategyPerformanceReviewLoopRouteDefinition = {
  slug: StrategyPerformanceReviewLoopRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly StrategyPerformanceReviewLoopSectionId[];
  devOnly: boolean;
};

export type StrategyPerformanceReviewLoopRouteModel = {
  route: StrategyPerformanceReviewLoopRouteDefinition;
  strategyPerformanceReviewLoop: StrategyPerformanceReviewLoopModel;
  sections: readonly StrategyPerformanceReviewLoopSection[];
  diagnosticRoutes: readonly StrategyPerformanceReviewLoopRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const STRATEGY_PERFORMANCE_REVIEW_LOOP_COCKPIT_MARKERS = [
  "Strategy Performance Review Loop",
  "Simulated Strategy Scorecard",
  "Simulated Rule Outcome Review",
  "Simulated Entry Rule Review",
  "Simulated Exit Rule Review",
  "Simulated Risk Rule Review",
  "Simulated Invalidation Review",
  "Simulated Evidence Feedback",
  "Simulated Hypothesis Update",
  "Simulated Watchlist Feedback",
  "Simulated Operator Review Decision",
  "Simulated Strategy Change Request",
  "Simulated No Auto Tune Boundary",
  "Synthetic data only",
  "Review-only strategy feedback",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No strategy auto promotion from the cockpit",
  "No strategy auto tuning from the cockpit",
  "No real P&L analysis from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No broker execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No performance guarantees",
  "Backend-owned review workflow remains required",
  "Backend-owned evidence capture remains required",
  "Operator review remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Strategy Performance Review Loop v1 is deterministic static review content only.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated strategy optimisation.",
  "This is not live trading.",
  "This is not real P&L analysis.",
  "This is not model-driven trade selection.",
  "This is not strategy auto-promotion.",
  "This is not order placement.",
  "This is not broker execution.",
  "This is not live market data.",
  "This is not money movement.",
  "Synthetic data only.",
  "Review-only strategy feedback.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "No strategy auto promotion from the cockpit.",
  "No strategy auto tuning from the cockpit.",
  "No real P&L analysis from the cockpit.",
  "No live market data calls from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No broker execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No performance guarantees.",
  "Backend-owned review workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future strategy performance review loop workflows remain backend-owned, operator-reviewed, risk-governed, kill-switch enforced, and evidence-backed.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, strategy auto tuning, strategy auto promotion, broker instruction, automated trading, order placement, order dispatch, account access, money movement, real P&L analysis, live market data, evidence persistence, audit persistence, file write, export, model call, provider call, connector call, prompt sending, command execution, or worker dispatch.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, credential storage, endpoint storage, account dashboard read, account read, buying power read, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, strategy mutation, strategy auto tuning, strategy auto promotion, live signal generation, execution routing, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, memory promotion, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, export, download, report write, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned review workflow remains required.",
  "Backend-owned evidence capture remains required.",
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
): readonly StrategyPerformanceReviewLoopItem[] {
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
  sectionId: StrategyPerformanceReviewLoopSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: StrategyPerformanceReviewLoopState;
}): StrategyPerformanceReviewLoopSection {
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

const SIMULATED_STRATEGY_SCORECARD = createSection({
  sectionId: "simulatedStrategyScorecard",
  label: "Simulated Strategy Scorecard",
  title: "Deterministic Simulated Strategy Scorecard",
  humanReadableSummary:
    "Simulated strategy scorecard preview shows simulated expectancy, simulated win rate, simulated drawdown, simulated rule adherence, simulated evidence completeness, and no performance guarantee.",
  plannedInputs: ["Synthetic expectancy fixture", "Synthetic win-rate fixture", "Synthetic drawdown fixture", "Synthetic rule adherence fixture", "Synthetic evidence completeness fixture"],
  plannedOutputs: ["Simulated Strategy Scorecard", "Simulated expectancy", "Simulated win rate", "Simulated drawdown", "No performance guarantee"],
  checklistPrefix: "simulated-strategy-scorecard",
  checklistSummary:
    "Simulated strategy scorecard preview shows simulated expectancy simulated win rate simulated drawdown simulated rule adherence simulated evidence completeness and no performance guarantee.",
  blocked:
    "Simulated strategy scorecard preview does not calculate real performance issue recommendations guarantee returns or promote strategies from the UI.",
  approval: "Simulated strategy scorecard preview requires deterministic synthetic scorecard fixtures only.",
});

const SIMULATED_RULE_OUTCOME_REVIEW = createSection({
  sectionId: "simulatedRuleOutcomeReview",
  label: "Simulated Rule Outcome Review",
  title: "Deterministic Simulated Rule Outcome Review",
  humanReadableSummary:
    "Simulated rule outcome review preview shows simulated passed rule, simulated failed rule, simulated neutral rule, simulated exception note, and operator review requirement.",
  plannedInputs: ["Synthetic passed rule", "Synthetic failed rule", "Synthetic neutral rule", "Synthetic exception note"],
  plannedOutputs: ["Simulated Rule Outcome Review", "Operator review requirement", "Denied rule mutation"],
  checklistPrefix: "simulated-rule-outcome-review",
  checklistSummary:
    "Simulated rule outcome review preview shows simulated passed rule simulated failed rule simulated neutral rule simulated exception note and operator review requirement.",
  blocked: "Simulated rule outcome review preview does not auto tune rules mutate strategies or approve execution from the UI.",
  approval: "Simulated rule outcome review preview requires deterministic synthetic rule outcome rows only.",
});

const SIMULATED_ENTRY_RULE_REVIEW = createSection({
  sectionId: "simulatedEntryRuleReview",
  label: "Simulated Entry Rule Review",
  title: "Deterministic Simulated Entry Rule Review",
  humanReadableSummary:
    "Simulated entry rule review preview shows simulated entry context, simulated thesis fit, simulated timing note, simulated missed entry, simulated false entry, and review-only outcome.",
  plannedInputs: ["Synthetic entry context", "Synthetic thesis fit", "Synthetic timing note", "Synthetic missed entry", "Synthetic false entry"],
  plannedOutputs: ["Simulated Entry Rule Review", "Review-only outcome", "Denied entry signal"],
  checklistPrefix: "simulated-entry-rule-review",
  checklistSummary:
    "Simulated entry rule review preview shows simulated entry context simulated thesis fit simulated timing note simulated missed entry simulated false entry and review-only outcome.",
  blocked: "Simulated entry rule review preview does not issue entry signals recommend buys place orders or execute trades from the UI.",
  approval: "Simulated entry rule review preview requires deterministic synthetic entry-rule review only.",
});

const SIMULATED_EXIT_RULE_REVIEW = createSection({
  sectionId: "simulatedExitRuleReview",
  label: "Simulated Exit Rule Review",
  title: "Deterministic Simulated Exit Rule Review",
  humanReadableSummary:
    "Simulated exit rule review preview shows simulated exit context, simulated stop logic, simulated target logic, simulated early exit, simulated late exit, and review-only outcome.",
  plannedInputs: ["Synthetic exit context", "Synthetic stop logic", "Synthetic target logic", "Synthetic early exit", "Synthetic late exit"],
  plannedOutputs: ["Simulated Exit Rule Review", "Review-only outcome", "Denied exit signal"],
  checklistPrefix: "simulated-exit-rule-review",
  checklistSummary:
    "Simulated exit rule review preview shows simulated exit context simulated stop logic simulated target logic simulated early exit simulated late exit and review-only outcome.",
  blocked: "Simulated exit rule review preview does not issue sell signals recommend exits place orders or execute trades from the UI.",
  approval: "Simulated exit rule review preview requires deterministic synthetic exit-rule review only.",
});

const SIMULATED_RISK_RULE_REVIEW = createSection({
  sectionId: "simulatedRiskRuleReview",
  label: "Simulated Risk Rule Review",
  title: "Deterministic Simulated Risk Rule Review",
  humanReadableSummary:
    "Simulated risk rule review preview shows simulated position risk, simulated max daily loss, simulated drawdown rule, simulated symbol rule, simulated strategy rule, and kill switch note.",
  plannedInputs: ["Synthetic position risk", "Synthetic max daily loss", "Synthetic drawdown rule", "Synthetic symbol rule", "Synthetic strategy rule"],
  plannedOutputs: ["Simulated Risk Rule Review", "Kill switch note", "Denied risk override"],
  checklistPrefix: "simulated-risk-rule-review",
  checklistSummary:
    "Simulated risk rule review preview shows simulated position risk simulated max daily loss simulated drawdown rule simulated symbol rule simulated strategy rule and kill switch note.",
  blocked:
    "Simulated risk rule review preview does not override risk governor decisions mutate capital approve execution or place trades from the UI.",
  approval: "Simulated risk rule review preview requires deterministic synthetic risk-rule review only.",
});

const SIMULATED_INVALIDATION_REVIEW = createSection({
  sectionId: "simulatedInvalidationReview",
  label: "Simulated Invalidation Review",
  title: "Deterministic Simulated Invalidation Review",
  humanReadableSummary:
    "Simulated invalidation review preview shows simulated thesis broken, simulated risk breach, simulated catalyst failure, simulated stale setup, simulated operator hold, and review-only decision.",
  plannedInputs: ["Synthetic thesis broken", "Synthetic risk breach", "Synthetic catalyst failure", "Synthetic stale setup", "Synthetic operator hold"],
  plannedOutputs: ["Simulated Invalidation Review", "Review-only decision", "Denied broker mutation"],
  checklistPrefix: "simulated-invalidation-review",
  checklistSummary:
    "Simulated invalidation review preview shows simulated thesis broken simulated risk breach simulated catalyst failure simulated stale setup simulated operator hold and review-only decision.",
  blocked: "Simulated invalidation review preview does not invalidate live trades cancel orders or mutate broker state from the UI.",
  approval: "Simulated invalidation review preview requires deterministic synthetic invalidation rows only.",
});

const SIMULATED_EVIDENCE_FEEDBACK = createSection({
  sectionId: "simulatedEvidenceFeedback",
  label: "Simulated Evidence Feedback",
  title: "Backend-Owned Simulated Evidence Feedback",
  humanReadableSummary:
    "Simulated evidence feedback preview shows simulated evidence gap, simulated evidence match, simulated review note, simulated redaction requirement, simulated source continuity, and denied frontend persistence.",
  plannedInputs: ["Synthetic evidence gap", "Synthetic evidence match", "Synthetic review note", "Synthetic redaction requirement", "Synthetic source continuity"],
  plannedOutputs: ["Simulated Evidence Feedback", "Denied frontend persistence", "Backend-owned evidence capture"],
  checklistPrefix: "simulated-evidence-feedback",
  checklistSummary:
    "Simulated evidence feedback preview shows simulated evidence gap simulated evidence match simulated review note simulated redaction requirement simulated source continuity and denied frontend persistence.",
  blocked: "Simulated evidence feedback preview does not persist evidence promote memory write files or mutate audit trails from the UI.",
  approval: "Simulated evidence feedback preview requires backend-owned evidence capture.",
  state: "backend-owned",
});

const SIMULATED_HYPOTHESIS_UPDATE = createSection({
  sectionId: "simulatedHypothesisUpdate",
  label: "Simulated Hypothesis Update",
  title: "Operator-Reviewed Simulated Hypothesis Update",
  humanReadableSummary:
    "Simulated hypothesis update preview shows simulated hypothesis kept, simulated hypothesis revised, simulated hypothesis rejected, simulated evidence basis, and no auto-promotion.",
  plannedInputs: ["Synthetic hypothesis kept", "Synthetic hypothesis revised", "Synthetic hypothesis rejected", "Synthetic evidence basis"],
  plannedOutputs: ["Simulated Hypothesis Update", "No auto-promotion", "Operator review required"],
  checklistPrefix: "simulated-hypothesis-update",
  checklistSummary:
    "Simulated hypothesis update preview shows simulated hypothesis kept simulated hypothesis revised simulated hypothesis rejected simulated evidence basis and no auto-promotion.",
  blocked:
    "Simulated hypothesis update preview does not rewrite strategy rules auto tune hypotheses promote memory or generate live trading instructions from the UI.",
  approval: "Simulated hypothesis update preview requires operator-reviewed synthetic hypothesis notes only.",
  state: "needs-approval",
});

const SIMULATED_WATCHLIST_FEEDBACK = createSection({
  sectionId: "simulatedWatchlistFeedback",
  label: "Simulated Watchlist Feedback",
  title: "Deterministic Simulated Watchlist Feedback",
  humanReadableSummary:
    "Simulated watchlist feedback preview shows simulated watchlist fit, simulated catalyst note, simulated liquidity note, simulated risk note, simulated exclude note, and review-only status.",
  plannedInputs: ["Synthetic watchlist fit", "Synthetic catalyst note", "Synthetic liquidity note", "Synthetic risk note", "Synthetic exclude note"],
  plannedOutputs: ["Simulated Watchlist Feedback", "Review-only status", "Denied symbol recommendation"],
  checklistPrefix: "simulated-watchlist-feedback",
  checklistSummary:
    "Simulated watchlist feedback preview shows simulated watchlist fit simulated catalyst note simulated liquidity note simulated risk note simulated exclude note and review-only status.",
  blocked:
    "Simulated watchlist feedback preview does not recommend symbols rank buys fetch live prices or personalise investment advice from the UI.",
  approval: "Simulated watchlist feedback preview requires deterministic synthetic watchlist notes only.",
});

const SIMULATED_OPERATOR_REVIEW_DECISION = createSection({
  sectionId: "simulatedOperatorReviewDecision",
  label: "Simulated Operator Review Decision",
  title: "Backend-Owned Simulated Operator Review Decision",
  humanReadableSummary:
    "Simulated operator review decision preview shows simulated keep decision, simulated revise decision, simulated pause decision, simulated retire decision, simulated evidence requirement, and explicit approval requirement.",
  plannedInputs: ["Synthetic keep decision", "Synthetic revise decision", "Synthetic pause decision", "Synthetic retire decision", "Synthetic evidence requirement"],
  plannedOutputs: ["Simulated Operator Review Decision", "Explicit approval requirement", "Denied frontend approval persistence"],
  checklistPrefix: "simulated-operator-review-decision",
  checklistSummary:
    "Simulated operator review decision preview shows simulated keep decision simulated revise decision simulated pause decision simulated retire decision simulated evidence requirement and explicit approval requirement.",
  blocked:
    "Simulated operator review decision preview does not persist approvals release locks dispatch workers or approve live execution from the UI.",
  approval: "Simulated operator review decision preview requires backend-owned operator review workflow.",
  state: "backend-owned",
});

const SIMULATED_STRATEGY_CHANGE_REQUEST = createSection({
  sectionId: "simulatedStrategyChangeRequest",
  label: "Simulated Strategy Change Request",
  title: "Backend-Owned Simulated Strategy Change Request",
  humanReadableSummary:
    "Simulated strategy change request preview shows simulated change request, simulated rationale, simulated evidence links, simulated risk impact, simulated operator signoff, and denied frontend mutation.",
  plannedInputs: ["Synthetic change request", "Synthetic rationale", "Synthetic evidence links", "Synthetic risk impact", "Synthetic operator signoff"],
  plannedOutputs: ["Simulated Strategy Change Request", "Denied frontend mutation", "Backend-owned change workflow"],
  checklistPrefix: "simulated-strategy-change-request",
  checklistSummary:
    "Simulated strategy change request preview shows simulated change request simulated rationale simulated evidence links simulated risk impact simulated operator signoff and denied frontend mutation.",
  blocked:
    "Simulated strategy change request preview does not mutate strategy code change trading rules write files or apply diffs from the UI.",
  approval: "Simulated strategy change request preview requires backend-owned change workflow.",
  state: "backend-owned",
});

const SIMULATED_NO_AUTO_TUNE_BOUNDARY = createSection({
  sectionId: "simulatedNoAutoTuneBoundary",
  label: "Simulated No Auto Tune Boundary",
  title: "Explicit Simulated No Auto Tune Boundary",
  humanReadableSummary:
    "Simulated no auto tune boundary preview shows denied auto tune, denied auto promote, denied live signal, denied execution routing, and backend-owned review boundary.",
  plannedInputs: ["Denied auto tune", "Denied auto promote", "Denied live signal", "Denied execution routing", "Backend-owned review boundary"],
  plannedOutputs: ["Simulated No Auto Tune Boundary", "Explicit operator approval required", "Denied automated strategy changes"],
  checklistPrefix: "simulated-no-auto-tune-boundary",
  checklistSummary:
    "Simulated no auto tune boundary preview shows denied auto tune denied auto promote denied live signal denied execution routing and backend-owned review boundary.",
  blocked:
    "Simulated no auto tune boundary preview blocks automatic parameter optimisation strategy promotion live signal generation and execution routing from the UI.",
  approval:
    "Simulated no auto tune boundary preview requires explicit operator approval for any future strategy change workflow.",
  state: "blocked",
});

const DENIED_STRATEGY_PERFORMANCE_REVIEW_BOUNDARIES = createSection({
  sectionId: "deniedStrategyPerformanceReviewBoundaries",
  label: "Denied Strategy Performance Review Boundaries",
  title: "Denied Strategy Performance Review Paths",
  humanReadableSummary:
    "Denied strategy performance review paths remain blocked across strategy feedback, scorecards, rule reviews, evidence feedback, hypothesis updates, watchlist feedback, operator decisions, change requests, no-auto-tune boundaries, cockpit summary, candidates, and release candidates.",
  plannedInputs: ["Denied path matrix", "Backend ownership requirement", "Operator approval requirement", "Risk governor requirement", "Kill switch requirement"],
  plannedOutputs: ["Denied strategy performance review paths remain blocked", "No frontend execution", "No frontend persistence"],
  checklistPrefix: "denied-strategy-performance-review",
  checklistSummary: "Denied strategy performance review paths remain blocked.",
  blocked: "Denied strategy performance review paths remain blocked.",
  approval: "Denied strategy performance review boundaries require explicit operator approval before any future backend-owned workflow can change strategy state.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "simulatedStrategyScorecard",
  "simulatedRuleOutcomeReview",
  "simulatedEntryRuleReview",
  "simulatedExitRuleReview",
  "simulatedRiskRuleReview",
  "simulatedInvalidationReview",
  "simulatedEvidenceFeedback",
  "simulatedHypothesisUpdate",
  "simulatedWatchlistFeedback",
  "simulatedOperatorReviewDecision",
  "simulatedStrategyChangeRequest",
  "simulatedNoAutoTuneBoundary",
  "deniedStrategyPerformanceReviewBoundaries",
] as const;

const SECTION_LOOKUP: Record<StrategyPerformanceReviewLoopSectionId, StrategyPerformanceReviewLoopSection> = {
  simulatedStrategyScorecard: SIMULATED_STRATEGY_SCORECARD,
  simulatedRuleOutcomeReview: SIMULATED_RULE_OUTCOME_REVIEW,
  simulatedEntryRuleReview: SIMULATED_ENTRY_RULE_REVIEW,
  simulatedExitRuleReview: SIMULATED_EXIT_RULE_REVIEW,
  simulatedRiskRuleReview: SIMULATED_RISK_RULE_REVIEW,
  simulatedInvalidationReview: SIMULATED_INVALIDATION_REVIEW,
  simulatedEvidenceFeedback: SIMULATED_EVIDENCE_FEEDBACK,
  simulatedHypothesisUpdate: SIMULATED_HYPOTHESIS_UPDATE,
  simulatedWatchlistFeedback: SIMULATED_WATCHLIST_FEEDBACK,
  simulatedOperatorReviewDecision: SIMULATED_OPERATOR_REVIEW_DECISION,
  simulatedStrategyChangeRequest: SIMULATED_STRATEGY_CHANGE_REQUEST,
  simulatedNoAutoTuneBoundary: SIMULATED_NO_AUTO_TUNE_BOUNDARY,
  deniedStrategyPerformanceReviewBoundaries: DENIED_STRATEGY_PERFORMANCE_REVIEW_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly StrategyPerformanceReviewLoopItem[] = [
  {
    id: "strategy-review-loop",
    label: "Review-only strategy feedback",
    detail: "Strategy performance review loop previews connect synthetic result ledger and dashboard insight concepts back to strategy research notes without auto tuning, strategy promotion, execution, or recommendations.",
    state: "review-only",
  },
  {
    id: "synthetic-only",
    label: "Synthetic data only",
    detail: "All scorecards, rule outcomes, evidence feedback, hypothesis notes, watchlist feedback, decisions, and change requests are deterministic static fixtures.",
    state: "synthetic-only",
  },
  {
    id: "backend-owned",
    label: "Backend workflow required",
    detail: "Backend-owned review workflow and backend-owned evidence capture remain required before any future strategy review process can persist evidence or request changes.",
    state: "backend-owned",
  },
  {
    id: "approval-required",
    label: "Explicit approval required",
    detail: "Operator review, risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
    state: "needs-approval",
  },
  {
    id: "denied-actions",
    label: "Unsafe paths blocked",
    detail: "Frontend financial advice, personalised recommendations, buy sell instructions, auto tuning, auto promotion, live market data calls, order placement, broker execution, real P&L analysis, evidence persistence, export/file writes, and worker dispatch remain blocked.",
    state: "blocked",
  },
] as const;

export const STRATEGY_PERFORMANCE_REVIEW_LOOP_MODEL: StrategyPerformanceReviewLoopModel = {
  strategyPerformanceReviewLoopId: "strategy-performance-review-loop-v1",
  strategyPerformanceReviewLoopKind: "strategy-performance-review-loop-v1",
  simulatedStrategyScorecard: SIMULATED_STRATEGY_SCORECARD,
  simulatedRuleOutcomeReview: SIMULATED_RULE_OUTCOME_REVIEW,
  simulatedEntryRuleReview: SIMULATED_ENTRY_RULE_REVIEW,
  simulatedExitRuleReview: SIMULATED_EXIT_RULE_REVIEW,
  simulatedRiskRuleReview: SIMULATED_RISK_RULE_REVIEW,
  simulatedInvalidationReview: SIMULATED_INVALIDATION_REVIEW,
  simulatedEvidenceFeedback: SIMULATED_EVIDENCE_FEEDBACK,
  simulatedHypothesisUpdate: SIMULATED_HYPOTHESIS_UPDATE,
  simulatedWatchlistFeedback: SIMULATED_WATCHLIST_FEEDBACK,
  simulatedOperatorReviewDecision: SIMULATED_OPERATOR_REVIEW_DECISION,
  simulatedStrategyChangeRequest: SIMULATED_STRATEGY_CHANGE_REQUEST,
  simulatedNoAutoTuneBoundary: SIMULATED_NO_AUTO_TUNE_BOUNDARY,
  deniedStrategyPerformanceReviewBoundaries: DENIED_STRATEGY_PERFORMANCE_REVIEW_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly StrategyPerformanceReviewLoopRouteDefinition[] = [
  {
    slug: "strategy-performance-review-loop-boundary",
    href: "/strategy-performance-review-loop-boundary",
    phase: "Phase 1802",
    title: "Strategy Performance Review Loop Boundary",
    commandLabel: "Go to Strategy Performance Review Loop Boundary",
    summary:
      "Defines a deterministic synthetic strategy performance review loop boundary without advice, recommendations, buy sell instructions, auto tuning, strategy promotion, orders, live data, or real P&L.",
    markerPhrases: [
      "Strategy performance review loop boundary",
      "Strategy performance review loop boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies promote strategies place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI",
      "Strategy performance review loop boundary requires explicit operator approval",
      "Strategy performance review loop boundary prepares deterministic synthetic strategy feedback workflows without frontend execution auto tuning or promotion",
      "Denied strategy performance review paths remain blocked",
      "Strategy performance review loop boundary checklist",
    ],
    sectionIds: ["simulatedStrategyScorecard", "simulatedOperatorReviewDecision", "simulatedNoAutoTuneBoundary", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-strategy-scorecard-preview",
    href: "/simulated-strategy-scorecard-preview",
    phase: "Phase 1803",
    title: "Simulated Strategy Scorecard Preview",
    commandLabel: "Go to Simulated Strategy Scorecard Preview",
    summary:
      "Previews deterministic synthetic scorecard fixtures without real performance calculation, recommendations, return guarantees, or strategy promotion.",
    markerPhrases: [
      "Simulated strategy scorecard preview",
      "Simulated strategy scorecard preview does not calculate real performance issue recommendations guarantee returns or promote strategies from the UI",
      "Simulated strategy scorecard preview requires deterministic synthetic scorecard fixtures only",
      "Simulated strategy scorecard preview shows simulated expectancy simulated win rate simulated drawdown simulated rule adherence simulated evidence completeness and no performance guarantee",
      "Denied simulated strategy scorecard paths remain blocked",
      "Simulated strategy scorecard checklist",
    ],
    sectionIds: ["simulatedStrategyScorecard", "simulatedEvidenceFeedback", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-rule-outcome-review-preview",
    href: "/simulated-rule-outcome-review-preview",
    phase: "Phase 1804",
    title: "Simulated Rule Outcome Review Preview",
    commandLabel: "Go to Simulated Rule Outcome Review Preview",
    summary:
      "Previews deterministic synthetic rule outcomes without rule auto tuning, strategy mutation, or execution approval.",
    markerPhrases: [
      "Simulated rule outcome review preview",
      "Simulated rule outcome review preview does not auto tune rules mutate strategies or approve execution from the UI",
      "Simulated rule outcome review preview requires deterministic synthetic rule outcome rows only",
      "Simulated rule outcome review preview shows simulated passed rule simulated failed rule simulated neutral rule simulated exception note and operator review requirement",
      "Denied simulated rule outcome review paths remain blocked",
      "Simulated rule outcome review checklist",
    ],
    sectionIds: ["simulatedRuleOutcomeReview", "simulatedOperatorReviewDecision", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-entry-rule-review-preview",
    href: "/simulated-entry-rule-review-preview",
    phase: "Phase 1805",
    title: "Simulated Entry Rule Review Preview",
    commandLabel: "Go to Simulated Entry Rule Review Preview",
    summary:
      "Previews deterministic synthetic entry-rule review without entry signals, buy recommendations, order placement, or trade execution.",
    markerPhrases: [
      "Simulated entry rule review preview",
      "Simulated entry rule review preview does not issue entry signals recommend buys place orders or execute trades from the UI",
      "Simulated entry rule review preview requires deterministic synthetic entry-rule review only",
      "Simulated entry rule review preview shows simulated entry context simulated thesis fit simulated timing note simulated missed entry simulated false entry and review-only outcome",
      "Denied simulated entry rule review paths remain blocked",
      "Simulated entry rule review checklist",
    ],
    sectionIds: ["simulatedEntryRuleReview", "simulatedRuleOutcomeReview", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-exit-rule-review-preview",
    href: "/simulated-exit-rule-review-preview",
    phase: "Phase 1806",
    title: "Simulated Exit Rule Review Preview",
    commandLabel: "Go to Simulated Exit Rule Review Preview",
    summary:
      "Previews deterministic synthetic exit-rule review without sell signals, exit recommendations, order placement, or trade execution.",
    markerPhrases: [
      "Simulated exit rule review preview",
      "Simulated exit rule review preview does not issue sell signals recommend exits place orders or execute trades from the UI",
      "Simulated exit rule review preview requires deterministic synthetic exit-rule review only",
      "Simulated exit rule review preview shows simulated exit context simulated stop logic simulated target logic simulated early exit simulated late exit and review-only outcome",
      "Denied simulated exit rule review paths remain blocked",
      "Simulated exit rule review checklist",
    ],
    sectionIds: ["simulatedExitRuleReview", "simulatedInvalidationReview", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-risk-rule-review-preview",
    href: "/simulated-risk-rule-review-preview",
    phase: "Phase 1807",
    title: "Simulated Risk Rule Review Preview",
    commandLabel: "Go to Simulated Risk Rule Review Preview",
    summary:
      "Previews deterministic synthetic risk-rule review without risk governor override, capital mutation, execution approval, or trades.",
    markerPhrases: [
      "Simulated risk rule review preview",
      "Simulated risk rule review preview does not override risk governor decisions mutate capital approve execution or place trades from the UI",
      "Simulated risk rule review preview requires deterministic synthetic risk-rule review only",
      "Simulated risk rule review preview shows simulated position risk simulated max daily loss simulated drawdown rule simulated symbol rule simulated strategy rule and kill switch note",
      "Denied simulated risk rule review paths remain blocked",
      "Simulated risk rule review checklist",
    ],
    sectionIds: ["simulatedRiskRuleReview", "simulatedNoAutoTuneBoundary", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-invalidation-review-preview",
    href: "/simulated-invalidation-review-preview",
    phase: "Phase 1808",
    title: "Simulated Invalidation Review Preview",
    commandLabel: "Go to Simulated Invalidation Review Preview",
    summary:
      "Previews deterministic synthetic invalidation rows without live trade invalidation, order cancellation, or broker state mutation.",
    markerPhrases: [
      "Simulated invalidation review preview",
      "Simulated invalidation review preview does not invalidate live trades cancel orders or mutate broker state from the UI",
      "Simulated invalidation review preview requires deterministic synthetic invalidation rows only",
      "Simulated invalidation review preview shows simulated thesis broken simulated risk breach simulated catalyst failure simulated stale setup simulated operator hold and review-only decision",
      "Denied simulated invalidation review paths remain blocked",
      "Simulated invalidation review checklist",
    ],
    sectionIds: ["simulatedInvalidationReview", "simulatedRiskRuleReview", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-evidence-feedback-preview",
    href: "/simulated-evidence-feedback-preview",
    phase: "Phase 1809",
    title: "Simulated Evidence Feedback Preview",
    commandLabel: "Go to Simulated Evidence Feedback Preview",
    summary:
      "Previews backend-owned synthetic evidence feedback without evidence persistence, memory promotion, file writes, or audit mutation.",
    markerPhrases: [
      "Simulated evidence feedback preview",
      "Simulated evidence feedback preview does not persist evidence promote memory write files or mutate audit trails from the UI",
      "Simulated evidence feedback preview requires backend-owned evidence capture",
      "Simulated evidence feedback preview shows simulated evidence gap simulated evidence match simulated review note simulated redaction requirement simulated source continuity and denied frontend persistence",
      "Denied simulated evidence feedback paths remain blocked",
      "Simulated evidence feedback checklist",
    ],
    sectionIds: ["simulatedEvidenceFeedback", "simulatedHypothesisUpdate", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-hypothesis-update-preview",
    href: "/simulated-hypothesis-update-preview",
    phase: "Phase 1810",
    title: "Simulated Hypothesis Update Preview",
    commandLabel: "Go to Simulated Hypothesis Update Preview",
    summary:
      "Previews operator-reviewed synthetic hypothesis notes without strategy rule rewrites, hypothesis auto tuning, memory promotion, or live trading instructions.",
    markerPhrases: [
      "Simulated hypothesis update preview",
      "Simulated hypothesis update preview does not rewrite strategy rules auto tune hypotheses promote memory or generate live trading instructions from the UI",
      "Simulated hypothesis update preview requires operator-reviewed synthetic hypothesis notes only",
      "Simulated hypothesis update preview shows simulated hypothesis kept simulated hypothesis revised simulated hypothesis rejected simulated evidence basis and no auto-promotion",
      "Denied simulated hypothesis update paths remain blocked",
      "Simulated hypothesis update checklist",
    ],
    sectionIds: ["simulatedHypothesisUpdate", "simulatedStrategyChangeRequest", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-watchlist-feedback-preview",
    href: "/simulated-watchlist-feedback-preview",
    phase: "Phase 1811",
    title: "Simulated Watchlist Feedback Preview",
    commandLabel: "Go to Simulated Watchlist Feedback Preview",
    summary:
      "Previews deterministic synthetic watchlist notes without symbol recommendations, buy rankings, live prices, or personalised investment advice.",
    markerPhrases: [
      "Simulated watchlist feedback preview",
      "Simulated watchlist feedback preview does not recommend symbols rank buys fetch live prices or personalise investment advice from the UI",
      "Simulated watchlist feedback preview requires deterministic synthetic watchlist notes only",
      "Simulated watchlist feedback preview shows simulated watchlist fit simulated catalyst note simulated liquidity note simulated risk note simulated exclude note and review-only status",
      "Denied simulated watchlist feedback paths remain blocked",
      "Simulated watchlist feedback checklist",
    ],
    sectionIds: ["simulatedWatchlistFeedback", "simulatedRiskRuleReview", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-operator-review-decision-preview",
    href: "/simulated-operator-review-decision-preview",
    phase: "Phase 1812",
    title: "Simulated Operator Review Decision Preview",
    commandLabel: "Go to Simulated Operator Review Decision Preview",
    summary:
      "Previews backend-owned synthetic operator review decisions without approval persistence, lock release, worker dispatch, or live execution approval.",
    markerPhrases: [
      "Simulated operator review decision preview",
      "Simulated operator review decision preview does not persist approvals release locks dispatch workers or approve live execution from the UI",
      "Simulated operator review decision preview requires backend-owned operator review workflow",
      "Simulated operator review decision preview shows simulated keep decision simulated revise decision simulated pause decision simulated retire decision simulated evidence requirement and explicit approval requirement",
      "Denied simulated operator review decision paths remain blocked",
      "Simulated operator review decision checklist",
    ],
    sectionIds: ["simulatedOperatorReviewDecision", "simulatedStrategyChangeRequest", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-strategy-change-request-preview",
    href: "/simulated-strategy-change-request-preview",
    phase: "Phase 1813",
    title: "Simulated Strategy Change Request Preview",
    commandLabel: "Go to Simulated Strategy Change Request Preview",
    summary:
      "Previews backend-owned synthetic strategy change requests without strategy code mutation, trading-rule changes, file writes, or diff application.",
    markerPhrases: [
      "Simulated strategy change request preview",
      "Simulated strategy change request preview does not mutate strategy code change trading rules write files or apply diffs from the UI",
      "Simulated strategy change request preview requires backend-owned change workflow",
      "Simulated strategy change request preview shows simulated change request simulated rationale simulated evidence links simulated risk impact simulated operator signoff and denied frontend mutation",
      "Denied simulated strategy change request paths remain blocked",
      "Simulated strategy change request checklist",
    ],
    sectionIds: ["simulatedStrategyChangeRequest", "simulatedNoAutoTuneBoundary", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "simulated-no-auto-tune-boundary-preview",
    href: "/simulated-no-auto-tune-boundary-preview",
    phase: "Phase 1814",
    title: "Simulated No Auto Tune Boundary Preview",
    commandLabel: "Go to Simulated No Auto Tune Boundary Preview",
    summary:
      "Previews explicit no-auto-tune boundary blocks for automatic parameter optimisation, strategy promotion, live signal generation, and execution routing.",
    markerPhrases: [
      "Simulated no auto tune boundary preview",
      "Simulated no auto tune boundary preview blocks automatic parameter optimisation strategy promotion live signal generation and execution routing from the UI",
      "Simulated no auto tune boundary preview requires explicit operator approval for any future strategy change workflow",
      "Simulated no auto tune boundary preview shows denied auto tune denied auto promote denied live signal denied execution routing and backend-owned review boundary",
      "Denied simulated no auto tune paths remain blocked",
      "Simulated no auto tune boundary checklist",
    ],
    sectionIds: ["simulatedNoAutoTuneBoundary", "simulatedOperatorReviewDecision", "deniedStrategyPerformanceReviewBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-strategy-performance-review-summary",
    href: "/cockpit-strategy-performance-review-summary",
    phase: "Phase 1815",
    title: "Cockpit Strategy Performance Review Summary",
    commandLabel: "Go to Cockpit Strategy Performance Review Summary",
    summary:
      "Summarizes strategy performance review loop previews as grouped Trading Workspace content in the normal cockpit without advice, execution, auto tuning, or persistence.",
    markerPhrases: [
      "Cockpit strategy performance review summary",
      "Cockpit strategy performance review summary keeps the cockpit as the normal user surface",
      "Cockpit strategy performance review summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies promote strategies place orders dispatch orders execute trades fetch live market data calculate real P&L persist evidence or write files from the cockpit",
      "Cockpit strategy performance review summary shows strategy scorecard rule outcome review entry rule review exit rule review risk rule review invalidation review evidence feedback hypothesis update watchlist feedback operator decision strategy change request no auto tune boundary and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit strategy performance review checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-strategy-performance-review-loop-candidate",
    href: "/first-strategy-performance-review-loop-candidate",
    phase: "Phase 1816",
    title: "First Strategy Performance Review Loop Candidate",
    commandLabel: "Go to First Strategy Performance Review Loop Candidate",
    summary:
      "Combines the first strategy performance review loop candidate without advice, recommendations, buy sell instructions, auto tuning, strategy promotion, live trading, orders, evidence persistence, or dispatch.",
    markerPhrases: [
      "First strategy performance review loop candidate",
      "First strategy performance review loop candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion live trading order placement evidence persistence or dispatch from the UI",
      "First strategy performance review loop candidate requires explicit operator approval",
      "Candidate combines strategy scorecard rule outcome review entry rule review exit rule review risk rule review invalidation review evidence feedback hypothesis update watchlist feedback operator review strategy change request no auto tune boundary cockpit summary and denied paths",
      "Denied first strategy performance review loop paths remain blocked",
      "First strategy performance review loop checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-strategy-performance-review-loop-release-candidate",
    href: "/controlled-strategy-performance-review-loop-release-candidate",
    phase: "Phase 1817",
    title: "Controlled Strategy Performance Review Loop Release Candidate",
    commandLabel: "Go to Controlled Strategy Performance Review Loop Release Candidate",
    summary:
      "Release candidate prepares CodexForge for backend-owned strategy performance review workflows without frontend execution, auto tuning, strategy promotion, evidence persistence, live data, advice, or orders.",
    markerPhrases: [
      "Controlled strategy performance review loop release candidate",
      "Controlled strategy performance review loop release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies promote strategies size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled strategy performance review loop release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned strategy performance review workflows without frontend execution auto tuning strategy promotion or evidence persistence",
      "Denied controlled strategy performance review loop paths remain blocked",
      "Controlled strategy performance review loop checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listStrategyPerformanceReviewLoopRouteDefinitions(): readonly StrategyPerformanceReviewLoopRouteDefinition[] {
  return ROUTES;
}

export function getStrategyPerformanceReviewLoopRouteDefinition(
  slug: StrategyPerformanceReviewLoopRouteSlug
): StrategyPerformanceReviewLoopRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildStrategyPerformanceReviewLoopRouteModel(
  slug: StrategyPerformanceReviewLoopRouteSlug = "controlled-strategy-performance-review-loop-release-candidate"
): StrategyPerformanceReviewLoopRouteModel {
  const route = getStrategyPerformanceReviewLoopRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is StrategyPerformanceReviewLoopSection => Boolean(section));

  return {
    route,
    strategyPerformanceReviewLoop: STRATEGY_PERFORMANCE_REVIEW_LOOP_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: STRATEGY_PERFORMANCE_REVIEW_LOOP_COCKPIT_MARKERS,
    summary: summarizeStrategyPerformanceReviewLoopRoute(route, sections),
  };
}

export function buildStrategyPerformanceReviewLoopModel(): StrategyPerformanceReviewLoopRouteModel {
  return buildStrategyPerformanceReviewLoopRouteModel("controlled-strategy-performance-review-loop-release-candidate");
}

export function summarizeStrategyPerformanceReviewLoopRoute(
  route: StrategyPerformanceReviewLoopRouteDefinition,
  sections: readonly StrategyPerformanceReviewLoopSection[]
): string {
  return `${route.title} keeps ${sections.length} strategy performance review loop sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from financial advice, personalised recommendations, buy sell instructions, strategy auto tuning, strategy auto promotion, live trading, order placement, order dispatch, broker execution, money movement, live market data calls, real P&L analysis, evidence persistence, export/file writes, command execution, worker dispatch, and performance guarantees.`;
}

export function buildStrategyPerformanceReviewLoopStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
