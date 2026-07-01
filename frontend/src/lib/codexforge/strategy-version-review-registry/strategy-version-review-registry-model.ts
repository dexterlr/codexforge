export type StrategyVersionReviewRegistryRouteSlug =
  | "strategy-version-review-registry-boundary"
  | "version-lineage-map-preview"
  | "version-diff-summary-preview"
  | "version-evidence-links-preview"
  | "version-risk-status-preview"
  | "version-mandate-status-preview"
  | "version-approval-state-preview"
  | "version-retirement-state-preview"
  | "version-rollback-note-preview"
  | "version-comparison-matrix-preview"
  | "version-review-checklist-preview"
  | "version-registry-export-boundary-preview"
  | "no-auto-promote-registry-boundary-preview"
  | "cockpit-strategy-version-registry-summary"
  | "first-strategy-version-review-registry-candidate"
  | "controlled-strategy-version-review-registry-release-candidate";

export type StrategyVersionReviewRegistryKind =
  | "strategy-version-review-registry-v1"
  | StrategyVersionReviewRegistryRouteSlug;

export type StrategyVersionReviewRegistryState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type StrategyVersionReviewRegistryItem = {
  id: string;
  label: string;
  detail: string;
  state: StrategyVersionReviewRegistryState;
};

export type StrategyVersionReviewRegistrySectionId =
  | "versionLineageMap"
  | "versionDiffSummary"
  | "versionEvidenceLinks"
  | "versionRiskStatus"
  | "versionMandateStatus"
  | "versionApprovalState"
  | "versionRetirementState"
  | "versionRollbackNote"
  | "versionComparisonMatrix"
  | "versionReviewChecklist"
  | "versionRegistryExportBoundary"
  | "noAutoPromoteRegistryBoundary"
  | "deniedStrategyVersionRegistryBoundaries";

export type StrategyVersionReviewRegistrySection = {
  sectionId: StrategyVersionReviewRegistrySectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly StrategyVersionReviewRegistryItem[];
  state: StrategyVersionReviewRegistryState;
};

export type StrategyVersionReviewRegistryModel = {
  strategyVersionReviewRegistryId: string;
  strategyVersionReviewRegistryKind: StrategyVersionReviewRegistryKind;
  versionLineageMap: StrategyVersionReviewRegistrySection;
  versionDiffSummary: StrategyVersionReviewRegistrySection;
  versionEvidenceLinks: StrategyVersionReviewRegistrySection;
  versionRiskStatus: StrategyVersionReviewRegistrySection;
  versionMandateStatus: StrategyVersionReviewRegistrySection;
  versionApprovalState: StrategyVersionReviewRegistrySection;
  versionRetirementState: StrategyVersionReviewRegistrySection;
  versionRollbackNote: StrategyVersionReviewRegistrySection;
  versionComparisonMatrix: StrategyVersionReviewRegistrySection;
  versionReviewChecklist: StrategyVersionReviewRegistrySection;
  versionRegistryExportBoundary: StrategyVersionReviewRegistrySection;
  noAutoPromoteRegistryBoundary: StrategyVersionReviewRegistrySection;
  deniedStrategyVersionRegistryBoundaries: StrategyVersionReviewRegistrySection;
  cockpitSummary: readonly StrategyVersionReviewRegistryItem[];
  explicitSafetyLimits: readonly string[];
};

export type StrategyVersionReviewRegistryRouteDefinition = {
  slug: StrategyVersionReviewRegistryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly StrategyVersionReviewRegistrySectionId[];
  devOnly: boolean;
};

export type StrategyVersionReviewRegistryRouteModel = {
  route: StrategyVersionReviewRegistryRouteDefinition;
  strategyVersionReviewRegistry: StrategyVersionReviewRegistryModel;
  sections: readonly StrategyVersionReviewRegistrySection[];
  diagnosticRoutes: readonly StrategyVersionReviewRegistryRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const STRATEGY_VERSION_REVIEW_REGISTRY_COCKPIT_MARKERS = [
  "Strategy Version Review Registry",
  "Version Lineage Map",
  "Version Diff Summary",
  "Version Evidence Links",
  "Version Risk Status",
  "Version Mandate Status",
  "Version Approval State",
  "Version Retirement State",
  "Version Rollback Note",
  "Version Comparison Matrix",
  "Version Review Checklist",
  "Version Registry Export Boundary",
  "No Auto Promote Registry Boundary",
  "Review-only strategy version registry",
  "Synthetic data only",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No strategy auto promotion from the cockpit",
  "No strategy auto tuning from the cockpit",
  "No automatic rule mutation from the cockpit",
  "No frontend file mutation",
  "No frontend approval persistence",
  "No frontend version persistence",
  "No real P&L analysis from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No broker execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No performance guarantees",
  "Backend-owned version registry remains required",
  "Backend-owned change workflow remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Strategy Version Review Registry v1 is deterministic static review content only.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated strategy optimisation.",
  "This is not strategy auto-promotion.",
  "This is not automatic rule mutation.",
  "This is not live trading.",
  "This is not real P&L analysis.",
  "This is not order placement.",
  "This is not broker execution.",
  "This is not live market data.",
  "This is not money movement.",
  "This is not file mutation from the frontend.",
  "This is not approval persistence from the frontend.",
  "This is not strategy version persistence from the frontend.",
  "Review-only strategy version registry.",
  "Synthetic data only.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "No strategy auto promotion from the cockpit.",
  "No strategy auto tuning from the cockpit.",
  "No automatic rule mutation from the cockpit.",
  "No frontend file mutation.",
  "No frontend approval persistence.",
  "No frontend version persistence.",
  "No real P&L analysis from the cockpit.",
  "No live market data calls from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No broker execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No performance guarantees.",
  "Backend-owned version registry remains required.",
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future strategy version registry workflows remain backend-owned, evidence-backed, approval-captured, operator-reviewed, risk-governed, kill-switch enforced, and explicitly approved.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, strategy auto tuning, strategy auto promotion, automatic rule mutation, broker instruction, automated trading, order placement, order dispatch, account access, money movement, real P&L analysis, live market data, version persistence, evidence persistence, audit persistence, approval persistence, file write, export, model call, provider call, connector call, prompt sending, command execution, or worker dispatch.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, credential storage, endpoint storage, account dashboard read, account read, buying power read, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, strategy mutation, rule mutation, parameter optimisation, strategy auto tuning, strategy auto promotion, version promotion, version persistence, live signal generation, execution routing, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, memory promotion, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, export, download, report write, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned version registry remains required.",
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
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
): readonly StrategyVersionReviewRegistryItem[] {
  return [
    {
      id: prefix + "-summary",
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: prefix + "-blocked",
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: prefix + "-approval",
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
  sectionId: StrategyVersionReviewRegistrySectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: StrategyVersionReviewRegistryState;
}): StrategyVersionReviewRegistrySection {
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

const VERSION_LINEAGE_MAP = createSection({
  sectionId: "versionLineageMap",
  label: "Version Lineage Map",
  title: "Deterministic Version Lineage Map",
  humanReadableSummary:
    "Version lineage map preview shows simulated parent version, simulated draft version, simulated review state, simulated retirement state, simulated rollback reference, and denied frontend persistence.",
  plannedInputs: ["Synthetic parent version", "Synthetic draft version", "Synthetic review state", "Synthetic retirement state", "Synthetic rollback reference"],
  plannedOutputs: ["Version Lineage Map", "Simulated parent version", "Simulated draft version", "Denied frontend persistence"],
  checklistPrefix: "version-lineage-map",
  checklistSummary:
    "Version lineage map preview shows simulated parent version simulated draft version simulated review state simulated retirement state simulated rollback reference and denied frontend persistence.",
  blocked: "Version lineage map preview does not persist versions create branches write files apply diffs or promote strategies from the UI.",
  approval: "Version lineage map preview requires deterministic synthetic lineage entries only.",
  state: "synthetic-only",
});

const VERSION_DIFF_SUMMARY = createSection({
  sectionId: "versionDiffSummary",
  label: "Version Diff Summary",
  title: "Deterministic Version Diff Summary",
  humanReadableSummary:
    "Version diff summary preview shows simulated added rule, simulated changed parameter, simulated removed condition, simulated risk impact, simulated evidence basis, and no frontend mutation.",
  plannedInputs: ["Synthetic added rule", "Synthetic changed parameter", "Synthetic removed condition", "Synthetic risk impact", "Synthetic evidence basis"],
  plannedOutputs: ["Version Diff Summary", "Simulated changed parameter", "Risk impact", "No frontend mutation"],
  checklistPrefix: "version-diff-summary",
  checklistSummary:
    "Version diff summary preview shows simulated added rule simulated changed parameter simulated removed condition simulated risk impact simulated evidence basis and no frontend mutation.",
  blocked: "Version diff summary preview does not apply diffs mutate strategy files write files or change trading rules from the UI.",
  approval: "Version diff summary preview requires deterministic synthetic diff summaries only.",
  state: "synthetic-only",
});

const VERSION_EVIDENCE_LINKS = createSection({
  sectionId: "versionEvidenceLinks",
  label: "Version Evidence Links",
  title: "Backend-Owned Version Evidence Links",
  humanReadableSummary:
    "Version evidence links preview shows simulated result ledger link, simulated review dashboard link, simulated change control link, simulated redaction note, simulated continuity note, and denied frontend persistence.",
  plannedInputs: ["Synthetic result ledger link", "Synthetic review dashboard link", "Synthetic change control link", "Synthetic redaction note", "Synthetic continuity note"],
  plannedOutputs: ["Version Evidence Links", "Backend-owned evidence capture", "Denied frontend persistence", "Continuity note"],
  checklistPrefix: "version-evidence-links",
  checklistSummary:
    "Version evidence links preview shows simulated result ledger link simulated review dashboard link simulated change control link simulated redaction note simulated continuity note and denied frontend persistence.",
  blocked: "Version evidence links preview does not persist evidence promote memory write files mutate audit trails or store links from the UI.",
  approval: "Version evidence links preview requires backend-owned evidence capture.",
  state: "backend-owned",
});

const VERSION_RISK_STATUS = createSection({
  sectionId: "versionRiskStatus",
  label: "Version Risk Status",
  title: "Deterministic Version Risk Status",
  humanReadableSummary:
    "Version risk status preview shows simulated risk governor state, simulated drawdown status, simulated daily loss status, simulated position risk status, simulated kill switch implication, and operator review requirement.",
  plannedInputs: ["Synthetic risk governor state", "Synthetic drawdown status", "Synthetic daily loss status", "Synthetic position risk status", "Synthetic kill switch implication"],
  plannedOutputs: ["Version Risk Status", "Risk governor approval required", "Kill switch implication", "Operator review requirement"],
  checklistPrefix: "version-risk-status",
  checklistSummary:
    "Version risk status preview shows simulated risk governor state simulated drawdown status simulated daily loss status simulated position risk status simulated kill switch implication and operator review requirement.",
  blocked: "Version risk status preview does not override risk governor decisions approve execution mutate capital or place trades from the UI.",
  approval: "Version risk status preview requires deterministic synthetic risk status only.",
  state: "needs-approval",
});

const VERSION_MANDATE_STATUS = createSection({
  sectionId: "versionMandateStatus",
  label: "Version Mandate Status",
  title: "Backend-Owned Version Mandate Status",
  humanReadableSummary:
    "Version mandate status preview shows simulated mandate fit, simulated approved universe status, simulated strategy class status, simulated capital rule status, simulated evidence requirement, and denied frontend mutation.",
  plannedInputs: ["Synthetic mandate fit", "Synthetic approved universe status", "Synthetic strategy class status", "Synthetic capital rule status", "Synthetic evidence requirement"],
  plannedOutputs: ["Version Mandate Status", "Backend-owned mandate review workflow", "Denied frontend mutation", "Evidence requirement"],
  checklistPrefix: "version-mandate-status",
  checklistSummary:
    "Version mandate status preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation.",
  blocked: "Version mandate status preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI.",
  approval: "Version mandate status preview requires backend-owned mandate review workflow.",
  state: "backend-owned",
});

const VERSION_APPROVAL_STATE = createSection({
  sectionId: "versionApprovalState",
  label: "Version Approval State",
  title: "Backend-Owned Version Approval State",
  humanReadableSummary:
    "Version approval state preview shows simulated pending approval, simulated requested changes, simulated approval expired, simulated replay protection, simulated explicit operator approval requirement.",
  plannedInputs: ["Synthetic pending approval", "Synthetic requested changes", "Synthetic approval expired", "Synthetic replay protection", "Synthetic explicit operator approval requirement"],
  plannedOutputs: ["Version Approval State", "Backend-owned approval capture", "Replay protection", "Explicit operator approval requirement"],
  checklistPrefix: "version-approval-state",
  checklistSummary:
    "Version approval state preview shows simulated pending approval simulated requested changes simulated approval expired simulated replay protection simulated explicit operator approval requirement.",
  blocked: "Version approval state preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI.",
  approval: "Version approval state preview requires backend-owned approval capture.",
  state: "backend-owned",
});

const VERSION_RETIREMENT_STATE = createSection({
  sectionId: "versionRetirementState",
  label: "Version Retirement State",
  title: "Backend-Owned Version Retirement State",
  humanReadableSummary:
    "Version retirement state preview shows simulated active version, simulated paused version, simulated retired version, simulated superseded version, simulated retirement reason, and denied frontend persistence.",
  plannedInputs: ["Synthetic active version", "Synthetic paused version", "Synthetic retired version", "Synthetic superseded version", "Synthetic retirement reason"],
  plannedOutputs: ["Version Retirement State", "Backend-owned version retirement workflow", "Denied frontend persistence", "Retirement reason"],
  checklistPrefix: "version-retirement-state",
  checklistSummary:
    "Version retirement state preview shows simulated active version simulated paused version simulated retired version simulated superseded version simulated retirement reason and denied frontend persistence.",
  blocked: "Version retirement state preview does not delete versions mutate strategy files remove routes or persist retirement state from the UI.",
  approval: "Version retirement state preview requires backend-owned version retirement workflow.",
  state: "backend-owned",
});

const VERSION_ROLLBACK_NOTE = createSection({
  sectionId: "versionRollbackNote",
  label: "Version Rollback Note",
  title: "Backend-Owned Version Rollback Note",
  humanReadableSummary:
    "Version rollback note preview shows simulated rollback candidate, simulated rollback reason, simulated prior version, simulated evidence requirement, simulated operator signoff, and denied frontend rollback.",
  plannedInputs: ["Synthetic rollback candidate", "Synthetic rollback reason", "Synthetic prior version", "Synthetic evidence requirement", "Synthetic operator signoff"],
  plannedOutputs: ["Version Rollback Note", "Backend-owned rollback workflow", "Denied frontend rollback", "Operator signoff"],
  checklistPrefix: "version-rollback-note",
  checklistSummary:
    "Version rollback note preview shows simulated rollback candidate simulated rollback reason simulated prior version simulated evidence requirement simulated operator signoff and denied frontend rollback.",
  blocked: "Version rollback note preview does not execute rollback apply diffs write files mutate strategies or recover live execution from the UI.",
  approval: "Version rollback note preview requires backend-owned rollback workflow.",
  state: "backend-owned",
});

const VERSION_COMPARISON_MATRIX = createSection({
  sectionId: "versionComparisonMatrix",
  label: "Version Comparison Matrix",
  title: "Deterministic Version Comparison Matrix",
  humanReadableSummary:
    "Version comparison matrix preview shows simulated version status, simulated risk status, simulated evidence status, simulated review status, simulated no recommendation note, and no performance guarantee.",
  plannedInputs: ["Synthetic version status", "Synthetic risk status", "Synthetic evidence status", "Synthetic review status", "Synthetic no recommendation note"],
  plannedOutputs: ["Version Comparison Matrix", "No recommendation note", "No performance guarantee", "Synthetic comparison rows"],
  checklistPrefix: "version-comparison-matrix",
  checklistSummary:
    "Version comparison matrix preview shows simulated version status simulated risk status simulated evidence status simulated review status simulated no recommendation note and no performance guarantee.",
  blocked: "Version comparison matrix preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI.",
  approval: "Version comparison matrix preview requires deterministic synthetic comparison rows only.",
  state: "synthetic-only",
});

const VERSION_REVIEW_CHECKLIST = createSection({
  sectionId: "versionReviewChecklist",
  label: "Version Review Checklist",
  title: "Backend-Owned Version Review Checklist",
  humanReadableSummary:
    "Version review checklist preview shows simulated evidence check, simulated risk check, simulated mandate check, simulated operator check, simulated rollback check, and denied frontend persistence.",
  plannedInputs: ["Synthetic evidence check", "Synthetic risk check", "Synthetic mandate check", "Synthetic operator check", "Synthetic rollback check"],
  plannedOutputs: ["Version Review Checklist", "Backend-owned review checklist workflow", "Denied frontend persistence", "Operator check"],
  checklistPrefix: "version-review-checklist",
  checklistSummary:
    "Version review checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated operator check simulated rollback check and denied frontend persistence.",
  blocked: "Version review checklist preview does not approve versions persist checklist state write files or promote strategies from the UI.",
  approval: "Version review checklist preview requires backend-owned review checklist workflow.",
  state: "backend-owned",
});

const VERSION_REGISTRY_EXPORT_BOUNDARY = createSection({
  sectionId: "versionRegistryExportBoundary",
  label: "Version Registry Export Boundary",
  title: "Backend-Owned Version Registry Export Boundary",
  humanReadableSummary:
    "Version registry export boundary preview shows simulated registry export request, simulated redaction requirement, simulated approval requirement, simulated artifact boundary, and denied frontend file writes.",
  plannedInputs: ["Synthetic registry export request", "Synthetic redaction requirement", "Synthetic approval requirement", "Synthetic artifact boundary", "Synthetic denied frontend file writes"],
  plannedOutputs: ["Version Registry Export Boundary", "Backend-owned export boundary", "Denied frontend file writes", "Approval requirement"],
  checklistPrefix: "version-registry-export-boundary",
  checklistSummary:
    "Version registry export boundary preview shows simulated registry export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes.",
  blocked: "Version registry export boundary preview does not download files write files export reports send reports or persist artifacts from the UI.",
  approval: "Version registry export boundary preview requires backend-owned export boundary.",
  state: "backend-owned",
});

const NO_AUTO_PROMOTE_REGISTRY_BOUNDARY = createSection({
  sectionId: "noAutoPromoteRegistryBoundary",
  label: "No Auto Promote Registry Boundary",
  title: "No Auto Promote Registry Boundary",
  humanReadableSummary:
    "No auto promote registry boundary preview shows denied auto promote, denied auto tune, denied auto apply, denied frontend write, denied execution route, and operator approval gate.",
  plannedInputs: ["Denied auto promote", "Denied auto tune", "Denied auto apply", "Denied frontend write", "Denied execution route"],
  plannedOutputs: ["No Auto Promote Registry Boundary", "Operator approval gate", "Backend-owned version registry required", "Denied execution route"],
  checklistPrefix: "no-auto-promote-registry-boundary",
  checklistSummary:
    "No auto promote registry boundary preview shows denied auto promote denied auto tune denied auto apply denied frontend write denied execution route and operator approval gate.",
  blocked: "No auto promote registry boundary preview blocks automatic version promotion strategy mutation parameter optimisation rule changes approval persistence and execution routing from the UI.",
  approval: "No auto promote registry boundary preview requires backend-owned version registry and explicit operator approval.",
  state: "blocked",
});

const DENIED_STRATEGY_VERSION_REGISTRY_BOUNDARIES = createSection({
  sectionId: "deniedStrategyVersionRegistryBoundaries",
  label: "Denied Strategy Version Registry Boundaries",
  title: "Denied Strategy Version Registry Paths",
  humanReadableSummary:
    "Denied strategy version registry paths remain blocked for frontend strategy version persistence, approval persistence, evidence persistence, file mutation, auto tuning, auto promotion, live market data, broker execution, order placement, order dispatch, money movement, real P&L analysis, advice, recommendations, and buy sell instructions.",
  plannedInputs: ["Denied version persistence", "Denied approval persistence", "Denied evidence persistence", "Denied file mutation", "Denied execution"],
  plannedOutputs: ["Denied strategy version registry paths remain blocked", "Explicit operator approval required", "Backend-owned workflows required", "No frontend mutation"],
  checklistPrefix: "denied-strategy-version-registry-boundaries",
  checklistSummary:
    "Denied strategy version registry paths remain blocked for frontend persistence mutation promotion execution advice recommendations orders live data and broker access.",
  blocked: "Strategy version registry paths remain blocked from frontend persistence mutation promotion execution advice recommendations orders live data and broker access.",
  approval: "Backend-owned version registry, change workflow, evidence capture, approval capture, operator review, risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
  state: "blocked",
});

const ALL_SECTION_IDS: readonly StrategyVersionReviewRegistrySectionId[] = [
  "versionLineageMap",
  "versionDiffSummary",
  "versionEvidenceLinks",
  "versionRiskStatus",
  "versionMandateStatus",
  "versionApprovalState",
  "versionRetirementState",
  "versionRollbackNote",
  "versionComparisonMatrix",
  "versionReviewChecklist",
  "versionRegistryExportBoundary",
  "noAutoPromoteRegistryBoundary",
  "deniedStrategyVersionRegistryBoundaries",
] as const;

const SECTION_LOOKUP: Record<StrategyVersionReviewRegistrySectionId, StrategyVersionReviewRegistrySection> = {
  versionLineageMap: VERSION_LINEAGE_MAP,
  versionDiffSummary: VERSION_DIFF_SUMMARY,
  versionEvidenceLinks: VERSION_EVIDENCE_LINKS,
  versionRiskStatus: VERSION_RISK_STATUS,
  versionMandateStatus: VERSION_MANDATE_STATUS,
  versionApprovalState: VERSION_APPROVAL_STATE,
  versionRetirementState: VERSION_RETIREMENT_STATE,
  versionRollbackNote: VERSION_ROLLBACK_NOTE,
  versionComparisonMatrix: VERSION_COMPARISON_MATRIX,
  versionReviewChecklist: VERSION_REVIEW_CHECKLIST,
  versionRegistryExportBoundary: VERSION_REGISTRY_EXPORT_BOUNDARY,
  noAutoPromoteRegistryBoundary: NO_AUTO_PROMOTE_REGISTRY_BOUNDARY,
  deniedStrategyVersionRegistryBoundaries: DENIED_STRATEGY_VERSION_REGISTRY_BOUNDARIES,
};

export const STRATEGY_VERSION_REVIEW_REGISTRY_MODEL: StrategyVersionReviewRegistryModel = {
  strategyVersionReviewRegistryId: "strategy-version-review-registry-v1",
  strategyVersionReviewRegistryKind: "strategy-version-review-registry-v1",
  versionLineageMap: VERSION_LINEAGE_MAP,
  versionDiffSummary: VERSION_DIFF_SUMMARY,
  versionEvidenceLinks: VERSION_EVIDENCE_LINKS,
  versionRiskStatus: VERSION_RISK_STATUS,
  versionMandateStatus: VERSION_MANDATE_STATUS,
  versionApprovalState: VERSION_APPROVAL_STATE,
  versionRetirementState: VERSION_RETIREMENT_STATE,
  versionRollbackNote: VERSION_ROLLBACK_NOTE,
  versionComparisonMatrix: VERSION_COMPARISON_MATRIX,
  versionReviewChecklist: VERSION_REVIEW_CHECKLIST,
  versionRegistryExportBoundary: VERSION_REGISTRY_EXPORT_BOUNDARY,
  noAutoPromoteRegistryBoundary: NO_AUTO_PROMOTE_REGISTRY_BOUNDARY,
  deniedStrategyVersionRegistryBoundaries: DENIED_STRATEGY_VERSION_REGISTRY_BOUNDARIES,
  cockpitSummary: [
    {
      id: "review-only-registry",
      label: "Review-only strategy version registry",
      detail:
        "Strategy Version Review Registry tracks proposed, draft, reviewed, and retired strategy versions as static synthetic review entries only.",
      state: "review-only",
    },
    {
      id: "backend-owned-required",
      label: "Backend ownership required",
      detail:
        "Backend-owned version registry, change workflow, evidence capture, approval capture, operator review, risk governor approval, kill switch enforcement, and explicit operator approval remain required.",
      state: "backend-owned",
    },
    {
      id: "frontend-boundaries-blocked",
      label: "Frontend boundaries blocked",
      detail:
        "No frontend version persistence, approval persistence, evidence persistence, file mutation, strategy auto tuning, strategy auto promotion, automatic rule mutation, broker execution, order placement, order dispatch, live market data, real P&L analysis, financial advice, personalised recommendations, or buy sell instructions.",
      state: "blocked",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly StrategyVersionReviewRegistryRouteDefinition[] = [
  {
    slug: "strategy-version-review-registry-boundary",
    href: "/strategy-version-review-registry-boundary",
    phase: "Phase 1834",
    title: "Strategy Version Review Registry Boundary",
    commandLabel: "Go to Strategy Version Review Registry Boundary",
    summary:
      "Previews the strategy version review registry boundary without advice, recommendations, buy sell instructions, auto tuning, auto promotion, rule mutation, file writes, version persistence, approval persistence, orders, live data, real P&L, or execution.",
    markerPhrases: [
      "Strategy version review registry boundary",
      "Strategy version review registry boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI",
      "Strategy version review registry boundary requires explicit operator approval",
      "Strategy version review registry boundary prepares deterministic synthetic strategy version review workflows without frontend mutation persistence promotion or execution",
      "Denied strategy version registry paths remain blocked",
      "Strategy version review registry boundary checklist",
    ],
    sectionIds: ["versionLineageMap", "versionApprovalState", "noAutoPromoteRegistryBoundary", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-lineage-map-preview",
    href: "/version-lineage-map-preview",
    phase: "Phase 1835",
    title: "Version Lineage Map Preview",
    commandLabel: "Go to Version Lineage Map Preview",
    summary:
      "Previews deterministic synthetic version lineage entries without version persistence, branch creation, file writes, diff application, or strategy promotion.",
    markerPhrases: [
      "Version lineage map preview",
      "Version lineage map preview does not persist versions create branches write files apply diffs or promote strategies from the UI",
      "Version lineage map preview requires deterministic synthetic lineage entries only",
      "Version lineage map preview shows simulated parent version simulated draft version simulated review state simulated retirement state simulated rollback reference and denied frontend persistence",
      "Denied version lineage map paths remain blocked",
      "Version lineage map checklist",
    ],
    sectionIds: ["versionLineageMap", "versionRetirementState", "versionRollbackNote", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-diff-summary-preview",
    href: "/version-diff-summary-preview",
    phase: "Phase 1836",
    title: "Version Diff Summary Preview",
    commandLabel: "Go to Version Diff Summary Preview",
    summary:
      "Previews deterministic synthetic version diff summaries without applying diffs, mutating strategy files, writing files, or changing trading rules.",
    markerPhrases: [
      "Version diff summary preview",
      "Version diff summary preview does not apply diffs mutate strategy files write files or change trading rules from the UI",
      "Version diff summary preview requires deterministic synthetic diff summaries only",
      "Version diff summary preview shows simulated added rule simulated changed parameter simulated removed condition simulated risk impact simulated evidence basis and no frontend mutation",
      "Denied version diff summary paths remain blocked",
      "Version diff summary checklist",
    ],
    sectionIds: ["versionDiffSummary", "versionRiskStatus", "versionEvidenceLinks", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-evidence-links-preview",
    href: "/version-evidence-links-preview",
    phase: "Phase 1837",
    title: "Version Evidence Links Preview",
    commandLabel: "Go to Version Evidence Links Preview",
    summary:
      "Previews backend-owned version evidence links without evidence persistence, memory promotion, file writes, audit mutation, or link storage from the UI.",
    markerPhrases: [
      "Version evidence links preview",
      "Version evidence links preview does not persist evidence promote memory write files mutate audit trails or store links from the UI",
      "Version evidence links preview requires backend-owned evidence capture",
      "Version evidence links preview shows simulated result ledger link simulated review dashboard link simulated change control link simulated redaction note simulated continuity note and denied frontend persistence",
      "Denied version evidence links paths remain blocked",
      "Version evidence links checklist",
    ],
    sectionIds: ["versionEvidenceLinks", "versionReviewChecklist", "versionRegistryExportBoundary", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-risk-status-preview",
    href: "/version-risk-status-preview",
    phase: "Phase 1838",
    title: "Version Risk Status Preview",
    commandLabel: "Go to Version Risk Status Preview",
    summary:
      "Previews deterministic synthetic version risk status without overriding risk governor decisions, approving execution, mutating capital, or placing trades.",
    markerPhrases: [
      "Version risk status preview",
      "Version risk status preview does not override risk governor decisions approve execution mutate capital or place trades from the UI",
      "Version risk status preview requires deterministic synthetic risk status only",
      "Version risk status preview shows simulated risk governor state simulated drawdown status simulated daily loss status simulated position risk status simulated kill switch implication and operator review requirement",
      "Denied version risk status paths remain blocked",
      "Version risk status checklist",
    ],
    sectionIds: ["versionRiskStatus", "versionMandateStatus", "noAutoPromoteRegistryBoundary", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-mandate-status-preview",
    href: "/version-mandate-status-preview",
    phase: "Phase 1839",
    title: "Version Mandate Status Preview",
    commandLabel: "Go to Version Mandate Status Preview",
    summary:
      "Previews backend-owned version mandate status without changing trading mandate, approved symbols, approved strategies, capital rules, or execution permissions.",
    markerPhrases: [
      "Version mandate status preview",
      "Version mandate status preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI",
      "Version mandate status preview requires backend-owned mandate review workflow",
      "Version mandate status preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation",
      "Denied version mandate status paths remain blocked",
      "Version mandate status checklist",
    ],
    sectionIds: ["versionMandateStatus", "versionRiskStatus", "versionApprovalState", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-approval-state-preview",
    href: "/version-approval-state-preview",
    phase: "Phase 1840",
    title: "Version Approval State Preview",
    commandLabel: "Go to Version Approval State Preview",
    summary:
      "Previews backend-owned version approval state without approval persistence, lock release, worker dispatch, execution approval, or strategy version promotion.",
    markerPhrases: [
      "Version approval state preview",
      "Version approval state preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI",
      "Version approval state preview requires backend-owned approval capture",
      "Version approval state preview shows simulated pending approval simulated requested changes simulated approval expired simulated replay protection simulated explicit operator approval requirement",
      "Denied version approval state paths remain blocked",
      "Version approval state checklist",
    ],
    sectionIds: ["versionApprovalState", "versionReviewChecklist", "noAutoPromoteRegistryBoundary", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-retirement-state-preview",
    href: "/version-retirement-state-preview",
    phase: "Phase 1841",
    title: "Version Retirement State Preview",
    commandLabel: "Go to Version Retirement State Preview",
    summary:
      "Previews backend-owned version retirement state without deleting versions, mutating strategy files, removing routes, or persisting retirement state.",
    markerPhrases: [
      "Version retirement state preview",
      "Version retirement state preview does not delete versions mutate strategy files remove routes or persist retirement state from the UI",
      "Version retirement state preview requires backend-owned version retirement workflow",
      "Version retirement state preview shows simulated active version simulated paused version simulated retired version simulated superseded version simulated retirement reason and denied frontend persistence",
      "Denied version retirement state paths remain blocked",
      "Version retirement state checklist",
    ],
    sectionIds: ["versionRetirementState", "versionLineageMap", "versionRollbackNote", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-rollback-note-preview",
    href: "/version-rollback-note-preview",
    phase: "Phase 1842",
    title: "Version Rollback Note Preview",
    commandLabel: "Go to Version Rollback Note Preview",
    summary:
      "Previews backend-owned version rollback notes without rollback execution, diff application, file writes, strategy mutation, or live execution recovery.",
    markerPhrases: [
      "Version rollback note preview",
      "Version rollback note preview does not execute rollback apply diffs write files mutate strategies or recover live execution from the UI",
      "Version rollback note preview requires backend-owned rollback workflow",
      "Version rollback note preview shows simulated rollback candidate simulated rollback reason simulated prior version simulated evidence requirement simulated operator signoff and denied frontend rollback",
      "Denied version rollback note paths remain blocked",
      "Version rollback note checklist",
    ],
    sectionIds: ["versionRollbackNote", "versionLineageMap", "versionReviewChecklist", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-comparison-matrix-preview",
    href: "/version-comparison-matrix-preview",
    phase: "Phase 1843",
    title: "Version Comparison Matrix Preview",
    commandLabel: "Go to Version Comparison Matrix Preview",
    summary:
      "Previews deterministic synthetic version comparison rows without ranking buys, recommending strategies, guaranteeing performance, or auto-selecting versions.",
    markerPhrases: [
      "Version comparison matrix preview",
      "Version comparison matrix preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI",
      "Version comparison matrix preview requires deterministic synthetic comparison rows only",
      "Version comparison matrix preview shows simulated version status simulated risk status simulated evidence status simulated review status simulated no recommendation note and no performance guarantee",
      "Denied version comparison matrix paths remain blocked",
      "Version comparison matrix checklist",
    ],
    sectionIds: ["versionComparisonMatrix", "versionRiskStatus", "versionApprovalState", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-review-checklist-preview",
    href: "/version-review-checklist-preview",
    phase: "Phase 1844",
    title: "Version Review Checklist Preview",
    commandLabel: "Go to Version Review Checklist Preview",
    summary:
      "Previews backend-owned version review checklist workflows without version approval, checklist persistence, file writes, or strategy promotion.",
    markerPhrases: [
      "Version review checklist preview",
      "Version review checklist preview does not approve versions persist checklist state write files or promote strategies from the UI",
      "Version review checklist preview requires backend-owned review checklist workflow",
      "Version review checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated operator check simulated rollback check and denied frontend persistence",
      "Denied version review checklist paths remain blocked",
      "Version review checklist checklist",
    ],
    sectionIds: ["versionReviewChecklist", "versionEvidenceLinks", "versionApprovalState", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "version-registry-export-boundary-preview",
    href: "/version-registry-export-boundary-preview",
    phase: "Phase 1845",
    title: "Version Registry Export Boundary Preview",
    commandLabel: "Go to Version Registry Export Boundary Preview",
    summary:
      "Previews backend-owned version registry export boundaries without downloads, file writes, report exports, report sends, or artifact persistence from the UI.",
    markerPhrases: [
      "Version registry export boundary preview",
      "Version registry export boundary preview does not download files write files export reports send reports or persist artifacts from the UI",
      "Version registry export boundary preview requires backend-owned export boundary",
      "Version registry export boundary preview shows simulated registry export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes",
      "Denied version registry export boundary paths remain blocked",
      "Version registry export boundary checklist",
    ],
    sectionIds: ["versionRegistryExportBoundary", "versionEvidenceLinks", "versionApprovalState", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "no-auto-promote-registry-boundary-preview",
    href: "/no-auto-promote-registry-boundary-preview",
    phase: "Phase 1846",
    title: "No Auto Promote Registry Boundary Preview",
    commandLabel: "Go to No Auto Promote Registry Boundary Preview",
    summary:
      "Previews no-auto-promote registry blocks for automatic version promotion, strategy mutation, parameter optimisation, rule changes, approval persistence, and execution routing from the UI.",
    markerPhrases: [
      "No auto promote registry boundary preview",
      "No auto promote registry boundary preview blocks automatic version promotion strategy mutation parameter optimisation rule changes approval persistence and execution routing from the UI",
      "No auto promote registry boundary preview requires backend-owned version registry and explicit operator approval",
      "No auto promote registry boundary preview shows denied auto promote denied auto tune denied auto apply denied frontend write denied execution route and operator approval gate",
      "Denied no auto promote registry paths remain blocked",
      "No auto promote registry boundary checklist",
    ],
    sectionIds: ["noAutoPromoteRegistryBoundary", "versionApprovalState", "versionReviewChecklist", "deniedStrategyVersionRegistryBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-strategy-version-registry-summary",
    href: "/cockpit-strategy-version-registry-summary",
    phase: "Phase 1847",
    title: "Cockpit Strategy Version Registry Summary",
    commandLabel: "Go to Cockpit Strategy Version Registry Summary",
    summary:
      "Summarizes strategy version registry previews as grouped Trading Workspace content in the normal cockpit without advice, recommendations, auto tuning, auto promotion, mutation, persistence, broker execution, live data, orders, or real P&L.",
    markerPhrases: [
      "Cockpit strategy version registry summary",
      "Cockpit strategy version registry summary keeps the cockpit as the normal user surface",
      "Cockpit strategy version registry summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute trades fetch live market data calculate real P&L or persist evidence from the cockpit",
      "Cockpit strategy version registry summary shows version lineage diff summary evidence links risk status mandate status approval state retirement state rollback note comparison matrix review checklist export boundary no auto promote boundary and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit strategy version registry checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-strategy-version-review-registry-candidate",
    href: "/first-strategy-version-review-registry-candidate",
    phase: "Phase 1848",
    title: "First Strategy Version Review Registry Candidate",
    commandLabel: "Go to First Strategy Version Review Registry Candidate",
    summary:
      "Combines the first strategy version review registry candidate without advice, recommendations, buy sell instructions, auto tuning, strategy promotion, rule mutation, file writes, version persistence, approval persistence, evidence persistence, order placement, or dispatch.",
    markerPhrases: [
      "First strategy version review registry candidate",
      "First strategy version review registry candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement or dispatch from the UI",
      "First strategy version review registry candidate requires explicit operator approval",
      "Candidate combines version lineage diff summary evidence links risk status mandate status approval state retirement state rollback note comparison matrix review checklist export boundary no auto promote boundary cockpit summary and denied paths",
      "Denied first strategy version review registry paths remain blocked",
      "First strategy version review registry checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-strategy-version-review-registry-release-candidate",
    href: "/controlled-strategy-version-review-registry-release-candidate",
    phase: "Phase 1849",
    title: "Controlled Strategy Version Review Registry Release Candidate",
    commandLabel: "Go to Controlled Strategy Version Review Registry Release Candidate",
    summary:
      "Release candidate prepares CodexForge for backend-owned strategy version registry workflows without frontend mutation, version persistence, approval persistence, evidence persistence, auto tuning, strategy promotion, broker execution, live data, orders, real P&L, advice, recommendations, or execution.",
    markerPhrases: [
      "Controlled strategy version review registry release candidate",
      "Controlled strategy version review registry release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled strategy version review registry release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned strategy version registry workflows without frontend mutation version persistence approval persistence evidence persistence auto tuning strategy promotion or execution",
      "Denied controlled strategy version review registry paths remain blocked",
      "Controlled strategy version review registry checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listStrategyVersionReviewRegistryRouteDefinitions(): readonly StrategyVersionReviewRegistryRouteDefinition[] {
  return ROUTES;
}

export function getStrategyVersionReviewRegistryRouteDefinition(
  slug: StrategyVersionReviewRegistryRouteSlug
): StrategyVersionReviewRegistryRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildStrategyVersionReviewRegistryRouteModel(
  slug: StrategyVersionReviewRegistryRouteSlug = "controlled-strategy-version-review-registry-release-candidate"
): StrategyVersionReviewRegistryRouteModel {
  const route = getStrategyVersionReviewRegistryRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is StrategyVersionReviewRegistrySection => Boolean(section));

  return {
    route,
    strategyVersionReviewRegistry: STRATEGY_VERSION_REVIEW_REGISTRY_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: STRATEGY_VERSION_REVIEW_REGISTRY_COCKPIT_MARKERS,
    summary: summarizeStrategyVersionReviewRegistryRoute(route, sections),
  };
}

export function buildStrategyVersionReviewRegistryModel(): StrategyVersionReviewRegistryRouteModel {
  return buildStrategyVersionReviewRegistryRouteModel("controlled-strategy-version-review-registry-release-candidate");
}

export function summarizeStrategyVersionReviewRegistryRoute(
  route: StrategyVersionReviewRegistryRouteDefinition,
  sections: readonly StrategyVersionReviewRegistrySection[]
): string {
  return route.title + " keeps " + sections.length + " strategy version review registry sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from financial advice, personalised recommendations, buy sell instructions, automatic strategy optimisation, strategy auto promotion, automatic rule mutation, frontend file mutation, frontend version persistence, frontend approval persistence, frontend evidence persistence, live trading, order placement, order dispatch, broker execution, money movement, live market data calls, real P&L analysis, command execution, worker dispatch, and performance guarantees.";
}

export function buildStrategyVersionReviewRegistryStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
