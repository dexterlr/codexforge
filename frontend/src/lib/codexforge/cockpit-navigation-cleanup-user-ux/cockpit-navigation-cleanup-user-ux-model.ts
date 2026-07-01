export type CockpitNavigationCleanupUserUxRouteSlug =
  | "cockpit-navigation-cleanup-boundary"
  | "user-cockpit-home-preview"
  | "trading-workspace-hub-preview"
  | "build-workspace-hub-preview"
  | "approvals-hub-preview"
  | "evidence-audit-hub-preview"
  | "developer-diagnostics-hub-preview"
  | "phase-route-grouping-preview"
  | "user-feature-label-map-preview"
  | "cockpit-quick-actions-preview"
  | "next-action-rail-cleanup-preview"
  | "command-palette-grouping-preview"
  | "cockpit-status-summary-preview"
  | "cockpit-onboarding-help-preview"
  | "first-consolidated-user-ux-candidate"
  | "controlled-consolidated-user-ux-release-candidate";

export type CockpitNavigationCleanupUserUxKind =
  | "cockpit-navigation-cleanup-user-ux-v1"
  | CockpitNavigationCleanupUserUxRouteSlug;

export type CockpitNavigationCleanupState =
  | "review-only"
  | "user-facing"
  | "diagnostic"
  | "approval-required"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type CockpitNavigationCleanupItem = {
  id: string;
  label: string;
  detail: string;
  state: CockpitNavigationCleanupState;
};

export type CockpitNavigationCleanupSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  featureLabels: readonly string[];
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly CockpitNavigationCleanupItem[];
  state: CockpitNavigationCleanupState;
};

export type CockpitNavigationCleanupRouteFamily = {
  id: string;
  label: string;
  summary: string;
  exampleRoutes: readonly string[];
};

export type CockpitNavigationCleanupRouteDefinition = {
  slug: CockpitNavigationCleanupUserUxRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type CockpitNavigationCleanupUserUxModel = {
  cockpitNavigationCleanupUserUxId: string;
  cockpitNavigationCleanupUserUxKind: CockpitNavigationCleanupUserUxKind;
  userCockpitHome: CockpitNavigationCleanupSection;
  tradingWorkspaceHub: CockpitNavigationCleanupSection;
  buildWorkspaceHub: CockpitNavigationCleanupSection;
  approvalsHub: CockpitNavigationCleanupSection;
  evidenceAuditHub: CockpitNavigationCleanupSection;
  developerDiagnosticsHub: CockpitNavigationCleanupSection;
  phaseRouteGrouping: CockpitNavigationCleanupSection;
  userFeatureLabelMap: CockpitNavigationCleanupSection;
  cockpitQuickActions: CockpitNavigationCleanupSection;
  nextActionRailCleanup: CockpitNavigationCleanupSection;
  commandPaletteGrouping: CockpitNavigationCleanupSection;
  cockpitStatusSummary: CockpitNavigationCleanupSection;
  cockpitOnboardingHelp: CockpitNavigationCleanupSection;
  deniedNavigationCleanupBoundaries: CockpitNavigationCleanupSection;
  cockpitSummary: readonly CockpitNavigationCleanupItem[];
  explicitSafetyLimits: readonly string[];
  routeFamilies: readonly CockpitNavigationCleanupRouteFamily[];
  quickActions: readonly CockpitNavigationCleanupItem[];
  featureCommands: readonly CockpitNavigationCleanupItem[];
};

export type CockpitNavigationCleanupRouteModel = {
  route: CockpitNavigationCleanupRouteDefinition;
  cockpitNavigationCleanupUserUx: CockpitNavigationCleanupUserUxModel;
  sections: readonly CockpitNavigationCleanupSection[];
  diagnosticRoutes: readonly CockpitNavigationCleanupRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const COCKPIT_NAVIGATION_CLEANUP_USER_UX_MARKERS = [
  "Cockpit Navigation Cleanup User UX",
  "One user cockpit",
  "CodexForge Cockpit",
  "Trading Workspace",
  "Build Workspace",
  "Approvals Hub",
  "Evidence Audit Hub",
  "Developer Diagnostics",
  "Phase routes remain diagnostics",
  "Phase pages remain dev test diagnostics only",
  "Normal users start at /codexforge-cockpit",
  "Feature labels replace phase labels",
  "Main menu hides phase spam",
  "Diagnostics remain searchable",
  "Direct phase route access remains available",
  "Smoke coverage remains preserved",
  "Command palette groups diagnostics",
  "Broker Execution Boundary",
  "Paper Broker Adapter Simulator",
  "Paper Trading Result Ledger",
  "No route deletion",
  "No smoke deletion",
  "No hidden execution",
  "No real broker connection from the cockpit",
  "No credential storage from the cockpit",
  "No broker account reads from the cockpit",
  "No real account state from the cockpit",
  "No real buying power from the cockpit",
  "No live positions from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No real paper order execution from the cockpit",
  "No live market data calls from the cockpit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No money movement from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No strategy auto tuning from the cockpit",
  "No strategy auto promotion from the cockpit",
  "Synthetic data only",
  "Review-only simulator",
  "Review-only ledger",
  "Review-only strategy feedback",
  "Backend-owned broker adapter remains required",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned execution simulator remains required",
  "Backend-owned result ledger remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned credential vault remains required",
  "Backend-owned order router remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "No model calls from the cockpit",
  "No command execution from the cockpit",
  "Explicit operator approval remains required",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No route deletion, smoke deletion, hidden execution, broker connection, trade placement, money movement, model call, provider call, connector call, prompt sending, command execution, file mutation, ledger persistence, approval persistence, evidence persistence, audit persistence, queue creation, transaction creation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probing, credential storage, or browser storage write from the cockpit.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Explicit operator approval remains required.",
  "Backend-owned boundaries remain required before any future execution-capable workflow.",
  "Phase pages remain dev test diagnostics only.",
  "Direct route access and smoke coverage remain preserved.",
  "The cockpit is navigation and UX consolidation only.",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Cockpit Navigation Cleanup User UX is deterministic static navigation and review content only.",
  "No route deletion.",
  "No smoke deletion.",
  "No hidden execution.",
  "No real broker connection from the cockpit.",
  "No credential storage from the cockpit.",
  "No broker account reads from the cockpit.",
  "No real account state from the cockpit.",
  "No real buying power from the cockpit.",
  "No live positions from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No real paper order execution from the cockpit.",
  "No live market data calls from the cockpit.",
  "No broker connections from the cockpit.",
  "No trade placement from the cockpit.",
  "No money movement from the cockpit.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "No strategy auto tuning from the cockpit.",
  "No strategy auto promotion from the cockpit.",
  "Synthetic data only.",
  "Review-only simulator.",
  "Review-only ledger.",
  "Review-only strategy feedback.",
  "Backend-owned broker adapter remains required.",
  "Backend-owned paper broker adapter remains required.",
  "Backend-owned execution simulator remains required.",
  "Backend-owned result ledger remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned credential vault remains required.",
  "Backend-owned order router remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "No model calls from the cockpit.",
  "No command execution from the cockpit.",
  "No file mutation from the cockpit.",
  "No approval, evidence, result, audit, queue, transaction, lock, credential, or browser storage persistence from the cockpit.",
  "Explicit operator approval remains required.",
] as const;

const ROUTE_FAMILIES: readonly CockpitNavigationCleanupRouteFamily[] = [
  {
    id: "core-foundations",
    label: "Core Foundations",
    summary: "Unified cockpit, daily-testable cockpit, project context, goal compiler, plan/diff/command composer, evidence, audit, and safety foundations.",
    exampleRoutes: ["/unified-cockpit-boundary", "/controlled-unified-cockpit-release-candidate", "/daily-testable-cockpit-boundary"],
  },
  {
    id: "build-workspace",
    label: "Build Workspace",
    summary: "Project builder, game server builder, domain packs, generated plans, artifacts, commands, evidence, and recovery review.",
    exampleRoutes: ["/game-server-builder-domain-boundary", "/domain-pack-runner-boundary", "/generated-plan-workspace-preview"],
  },
  {
    id: "trading-research",
    label: "Trading Research",
    summary: "Trading research goals, watchlists, thesis builder, catalyst tracker, risk notes, strategy candidates, and evidence audit.",
    exampleRoutes: ["/trading-research-domain-boundary", "/trading-watchlist-preview", "/trading-thesis-builder-preview"],
  },
  {
    id: "mandate-risk-governor",
    label: "Mandate Risk Governor",
    summary: "Capital allocation, active capital ledger, protected profit bucket, reinvestable rules, drawdown guards, and kill switch previews.",
    exampleRoutes: ["/trading-mandate-boundary", "/capital-allocation-rules-preview", "/trading-kill-switch-preview"],
  },
  {
    id: "strategy-lab-signal-engine",
    label: "Strategy Lab Signal Engine",
    summary: "Strategy idea intake, hypothesis, indicators, signal rules, entry and exit rules, stops, take profit, and evidence map.",
    exampleRoutes: ["/strategy-lab-boundary", "/strategy-idea-intake-preview", "/signal-rule-draft-preview"],
  },
  {
    id: "backtest-paper-trading",
    label: "Backtest Paper Trading",
    summary: "Dataset requirements, historical data quality, fee/slippage assumptions, metrics, paper account boundaries, and paper evidence.",
    exampleRoutes: ["/backtest-paper-trading-boundary", "/backtest-run-packet-preview", "/paper-trade-journal-preview"],
  },
  {
    id: "profit-lockbox-reinvestment",
    label: "Profit Lockbox Reinvestment",
    summary: "Realised profit, protected bucket, reinvestable bucket, lock percent, release conditions, ceilings, loss handling, audit, and approval.",
    exampleRoutes: ["/profit-lockbox-boundary", "/protected-profit-bucket-rules-preview", "/controlled-profit-lockbox-reinvestment-release-candidate"],
  },
  {
    id: "broker-execution-boundary",
    label: "Broker Execution Boundary",
    summary: "Broker adapter contract, credential boundary, account read boundary, order preview, validation, approval, dispatch, result, error, kill switch, risk governor, audit evidence, and denied frontend paths.",
    exampleRoutes: ["/broker-execution-boundary", "/cockpit-broker-boundary-summary", "/controlled-broker-execution-boundary-release-candidate"],
  },
  {
    id: "paper-broker-adapter-simulator",
    label: "Paper Broker Adapter Simulator",
    summary: "Synthetic account state, buying power, position ledger, order intent, validation, queue, fill model, slippage fee, rejection, cancel replace, execution audit, risk governor bridge, and denied simulator paths.",
    exampleRoutes: ["/paper-broker-adapter-simulator-boundary", "/cockpit-paper-broker-simulator-summary", "/controlled-paper-broker-adapter-simulator-release-candidate"],
  },
  {
    id: "paper-trading-result-ledger",
    label: "Paper Trading Result Ledger",
    summary: "Simulated fills, rejections, cancels, position updates, realised P&L, unrealised P&L, equity curve, drawdown ledger, risk events, audit packet, evidence continuity, export boundary, and denied ledger paths.",
    exampleRoutes: ["/paper-trading-result-ledger-boundary", "/cockpit-paper-trading-result-ledger-summary", "/controlled-paper-trading-result-ledger-release-candidate"],
  },
  {
    id: "paper-trading-review-dashboard",
    label: "Paper Trading Review Dashboard",
    summary: "Simulated performance summary, trade review queue, risk review queue, evidence review queue, approval review queue, metric cards, ledger timeline, exception queue, review notes, operator signoff, export boundary, health status, and denied dashboard paths.",
    exampleRoutes: ["/paper-trading-review-dashboard-boundary", "/cockpit-paper-trading-review-dashboard-summary", "/controlled-paper-trading-review-dashboard-release-candidate"],
  },
  {
    id: "strategy-performance-review-loop",
    label: "Strategy Performance Review Loop",
    summary: "Simulated strategy scorecard, rule outcome review, entry rule review, exit rule review, risk rule review, invalidation review, evidence feedback, hypothesis update, watchlist feedback, operator decision, strategy change request, no auto tune boundary, and denied strategy feedback paths.",
    exampleRoutes: ["/strategy-performance-review-loop-boundary", "/cockpit-strategy-performance-review-summary", "/controlled-strategy-performance-review-loop-release-candidate"],
  },
  {
    id: "strategy-change-control-workflow",
    label: "Strategy Change Control Workflow",
    summary: "Proposed change intake, change rationale packet, linked evidence packet, risk impact assessment, mandate impact assessment, parameter change review, rule change review, strategy version draft, operator decision state, change rejection state, change approval boundary, no auto apply boundary, and denied strategy change control paths.",
    exampleRoutes: ["/strategy-change-control-boundary", "/cockpit-strategy-change-control-summary", "/controlled-strategy-change-control-workflow-release-candidate"],
  },
  {
    id: "strategy-version-review-registry",
    label: "Strategy Version Review Registry",
    summary: "Version lineage map, version diff summary, version evidence links, version risk status, version mandate status, version approval state, version retirement state, version rollback note, version comparison matrix, version review checklist, version registry export boundary, no auto promote registry boundary, and denied strategy version registry paths.",
    exampleRoutes: ["/strategy-version-review-registry-boundary", "/cockpit-strategy-version-registry-summary", "/controlled-strategy-version-review-registry-release-candidate"],
  },
  {
    id: "cockpit-ux-diagnostics",
    label: "Cockpit UX Diagnostics",
    summary: "Navigation cleanup, user cockpit, workspace hubs, command grouping, status summary, onboarding, and controlled consolidated UX release candidate.",
    exampleRoutes: ["/cockpit-navigation-cleanup-boundary", "/developer-diagnostics-hub-preview", "/controlled-consolidated-user-ux-release-candidate"],
  },
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly CockpitNavigationCleanupItem[] {
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
      state: "approval-required",
    },
  ];
}

function createSection({
  sectionId,
  label,
  title,
  humanReadableSummary,
  featureLabels,
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
  featureLabels: readonly string[];
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: CockpitNavigationCleanupState;
}): CockpitNavigationCleanupSection {
  return {
    sectionId,
    label,
    title,
    humanReadableSummary,
    featureLabels,
    plannedInputs,
    plannedOutputs,
    deniedActions: COMMON_DENIED_ACTIONS,
    safetyNotes: COMMON_SAFETY_NOTES,
    checklist: checklist(checklistPrefix, checklistSummary, blocked, approval),
    state,
  };
}

const USER_COCKPIT_HOME = createSection({
  sectionId: "userCockpitHome",
  label: "User Cockpit Home",
  title: "One Normal User Homepage",
  humanReadableSummary:
    "CodexForge Cockpit becomes the one normal user surface with goal intake, Trading Workspace, Build Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics entry without phase spam.",
  featureLabels: ["Start with a goal", "Trading Workspace", "Build Workspace", "Approvals", "Evidence & Audit", "Next Action", "Developer Diagnostics"],
  plannedInputs: ["Current checkpoint", "Workspace intent", "Pending approvals", "Evidence posture", "Diagnostic access"],
  plannedOutputs: ["One user cockpit", "Clean product navigation", "Collapsed diagnostics", "Direct route preservation"],
  checklistPrefix: "user-cockpit-home",
  checklistSummary: "User cockpit home preview keeps /codexforge-cockpit as the one normal user homepage.",
  blocked: "User cockpit home preview does not execute workflows, hide blocked states, remove routes, or remove smoke coverage.",
  approval: "User cockpit home preview requires explicit operator approval.",
  state: "user-facing",
});

const TRADING_WORKSPACE_HUB = createSection({
  sectionId: "tradingWorkspaceHub",
  label: "Trading Workspace",
  title: "Trading Workspace Hub",
  humanReadableSummary:
    "Trading Workspace groups Trading Research, Mandate / Risk Governor, Strategy Lab / Signal Engine, Backtest / Paper Trading, Profit Lockbox / Reinvestment Rules, Broker Execution Boundary previews, Paper Broker Adapter Simulator previews, Paper Trading Result Ledger previews, Paper Trading Review Dashboard previews, Strategy Performance Review Loop previews, Strategy Change Control Workflow previews, Strategy Version Review Registry previews, Paper Strategy Promotion Gate previews, Paper Trading End-to-End Review previews, and Cockpit Trading Workflow Polish previews behind one user-facing section.",
  featureLabels: ["Trading Research", "Mandate / Risk Governor", "Strategy Lab / Signal Engine", "Backtest / Paper Trading", "Profit Lockbox / Reinvestment Rules", "Broker Execution Boundary", "Paper Broker Adapter Simulator", "Paper Trading Result Ledger", "Paper Trading Review Dashboard", "Strategy Performance Review Loop", "Strategy Change Control Workflow", "Strategy Version Review Registry", "Paper Strategy Promotion Gate", "Paper Trading End-to-End Review", "Cockpit Trading Workflow Polish"],
  plannedInputs: ["Research notes", "Risk governor posture", "Strategy hypothesis", "Backtest readiness", "Profit lockbox rules", "Broker boundary status", "Paper broker simulator status", "Paper result ledger status", "Paper review dashboard status", "Strategy performance review loop status", "Strategy change control workflow status", "Strategy version review registry status", "Paper trading end-to-end review status", "Cockpit trading workflow polish status"],
  plannedOutputs: ["Trading Workspace", "Grouped trading diagnostics", "Broker boundary summary", "Paper broker simulator summary", "Paper result ledger summary", "Paper review dashboard summary", "Strategy performance review loop summary", "Strategy change control workflow summary", "Strategy version review registry summary", "Paper trading end-to-end review summary", "Cockpit trading workflow polish summary", "No live trading", "No financial advice"],
  checklistPrefix: "trading-workspace-hub",
  checklistSummary:
    "Trading workspace hub preview groups trading research mandate risk governor strategy lab backtest paper trading profit lockbox broker execution boundary paper broker adapter simulator paper trading result ledger paper trading review dashboard strategy performance review loop strategy change control workflow strategy version review registry paper strategy promotion gate paper trading end-to-end review and cockpit trading workflow polish into one user-facing trading workspace.",
  blocked: "Trading workspace hub preview does not connect brokers, store credentials, read accounts, fetch live market data, place trades, dispatch orders, move money, or provide buy sell instructions.",
  approval: "Trading workspace hub preview requires explicit operator approval.",
  state: "user-facing",
});

const BUILD_WORKSPACE_HUB = createSection({
  sectionId: "buildWorkspaceHub",
  label: "Build Workspace",
  title: "Build Workspace Hub",
  humanReadableSummary:
    "Build Workspace groups project builder, game server builder, domain packs, generated plans, artifacts, commands, and evidence into one user-facing build surface.",
  featureLabels: ["Project Builder", "Game Server Builder", "Domain Packs", "Generated Plans", "Artifacts", "Commands", "Evidence"],
  plannedInputs: ["Goal", "Project context", "Generated plan", "Artifact plan", "Command preview", "Evidence needs"],
  plannedOutputs: ["Build Workspace", "Grouped build diagnostics", "Approval holds", "No command execution"],
  checklistPrefix: "build-workspace-hub",
  checklistSummary:
    "Build workspace hub preview groups project builder game server builder domain packs generated plans artifacts commands and evidence into one user-facing build workspace.",
  blocked: "Build workspace hub preview does not run commands, write files, start runtimes, bind ports, install, deploy, or dispatch workers.",
  approval: "Build workspace hub preview requires explicit operator approval.",
  state: "user-facing",
});

const APPROVALS_HUB = createSection({
  sectionId: "approvalsHub",
  label: "Approvals Hub",
  title: "Approvals Hub",
  humanReadableSummary:
    "Approvals Hub groups operator approval gates, risk approvals, broker boundary approvals, reinvestment approvals, and execution holds into one review surface.",
  featureLabels: ["Operator approval gates", "Risk approvals", "Broker boundary approvals", "Reinvestment approvals", "Execution holds"],
  plannedInputs: ["Approval tickets", "Risk posture", "Broker boundary status", "Execution holds"],
  plannedOutputs: ["Approvals Hub", "No persisted approvals", "Blocked release locks", "Review-only approval map"],
  checklistPrefix: "approvals-hub",
  checklistSummary:
    "Approvals hub preview groups operator approval gates risk approvals broker boundary approvals reinvestment approvals and execution holds into one review surface.",
  blocked: "Approvals hub preview does not persist approvals, release locks, start runtimes, run commands, or enable execution from the UI.",
  approval: "Approvals hub preview requires explicit operator approval.",
  state: "approval-required",
});

const EVIDENCE_AUDIT_HUB = createSection({
  sectionId: "evidenceAuditHub",
  label: "Evidence Audit Hub",
  title: "Evidence & Audit Hub",
  humanReadableSummary:
    "Evidence Audit Hub groups evidence results, audit continuity, redaction, checkpoint status, and backend-owned capture notes into one review surface.",
  featureLabels: ["Evidence results", "Audit continuity", "Redaction", "Checkpoint status", "Backend-owned capture notes"],
  plannedInputs: ["Evidence placeholders", "Result posture", "Audit notes", "Redaction notes", "Checkpoint status"],
  plannedOutputs: ["Evidence Audit Hub", "No evidence persistence", "No audit persistence", "Backend-owned capture requirement"],
  checklistPrefix: "evidence-audit-hub",
  checklistSummary:
    "Evidence audit hub preview groups evidence results audit continuity redaction checkpoint status and backend-owned capture notes into one review surface.",
  blocked: "Evidence audit hub preview does not persist evidence, results, audit, memory, or browser storage from the UI.",
  approval: "Evidence audit hub preview requires backend-owned capture.",
  state: "review-only",
});

const DEVELOPER_DIAGNOSTICS_HUB = createSection({
  sectionId: "developerDiagnosticsHub",
  label: "Developer Diagnostics",
  title: "Developer Diagnostics Hub",
  humanReadableSummary:
    "Developer Diagnostics groups phase pages, smoke routes, route families, and diagnostic deep links by family without polluting normal user navigation.",
  featureLabels: ["Route families", "Smoke routes", "Phase diagnostics", "Direct deep links", "Searchable diagnostics"],
  plannedInputs: ["Route registry", "Smoke registry", "Phase route families", "Diagnostic labels"],
  plannedOutputs: ["Developer Diagnostics", "Family grouped diagnostics", "Searchable phase routes", "Direct route preservation"],
  checklistPrefix: "developer-diagnostics-hub",
  checklistSummary:
    "Developer diagnostics hub preview groups phase pages smoke routes route families and diagnostic deep links under Developer Diagnostics.",
  blocked: "Developer diagnostics hub preview does not delete routes, delete smokes, hide safety state, or execute diagnostics.",
  approval: "Developer diagnostics hub preview requires explicit operator approval.",
  state: "diagnostic",
});

const PHASE_ROUTE_GROUPING = createSection({
  sectionId: "phaseRouteGrouping",
  label: "Phase Route Grouping",
  title: "Phase Route Grouping",
  humanReadableSummary:
    "Phase route grouping keeps phase routes searchable and directly accessible while grouping them by build, trading, research, mandate, strategy, backtest, profit, cockpit diagnostics, and legacy foundations.",
  featureLabels: ["Core Foundations", "Build Workspace", "Trading Research", "Mandate Risk Governor", "Strategy Lab Signal Engine", "Backtest Paper Trading", "Profit Lockbox Reinvestment", "Broker Execution Boundary", "Paper Broker Adapter Simulator", "Paper Trading Result Ledger", "Paper Trading Review Dashboard", "Strategy Performance Review Loop", "Strategy Change Control Workflow", "Strategy Version Review Registry", "Paper Strategy Promotion Gate", "Paper Trading End-to-End Review", "Cockpit Trading Workflow Polish", "Cockpit UX Diagnostics"],
  plannedInputs: ["Phase routes", "Route families", "Command palette diagnostics", "Smoke coverage"],
  plannedOutputs: ["Grouped phase diagnostics", "Reduced normal menu noise", "Preserved direct route access", "Preserved smoke coverage"],
  checklistPrefix: "phase-route-grouping",
  checklistSummary:
    "Phase route grouping preview groups phase routes by family build trading research mandate strategy backtest profit cockpit diagnostics and legacy foundations.",
  blocked: "Phase route grouping preview does not remove routes, remove smokes, or break direct phase access.",
  approval: "Phase route grouping preview requires explicit operator approval.",
  state: "diagnostic",
});

const USER_FEATURE_LABEL_MAP = createSection({
  sectionId: "userFeatureLabelMap",
  label: "User Feature Label Map",
  title: "Feature Labels Replace Phase Labels",
  humanReadableSummary:
    "User feature label map replaces phase-heavy menu labels with product labels while keeping phase numbers visible only in diagnostics metadata.",
  featureLabels: ["Trading Workspace", "Build Workspace", "Approvals", "Evidence", "Developer Diagnostics", "Next Action"],
  plannedInputs: ["Phase labels", "Product labels", "Diagnostics metadata", "Command labels"],
  plannedOutputs: ["Feature-first menu labels", "Diagnostics-only phase metadata", "Cleaner normal navigation"],
  checklistPrefix: "user-feature-label-map",
  checklistSummary:
    "User feature label map preview replaces phase-heavy labels with product labels such as Trading Workspace Build Workspace Approvals Evidence Developer Diagnostics and Next Action.",
  blocked: "User feature label map preview does not rename route folders, delete phase pages, or hide diagnostics.",
  approval: "User feature label map preview requires explicit operator approval.",
  state: "user-facing",
});

const COCKPIT_QUICK_ACTIONS = createSection({
  sectionId: "cockpitQuickActions",
  label: "Cockpit Quick Actions",
  title: "Cockpit Quick Actions",
  humanReadableSummary:
    "Cockpit Quick Actions shows safe navigation actions: Start with a goal, Open Trading Workspace, Review Approvals, Review Evidence, Open Diagnostics, and Continue Next Action.",
  featureLabels: ["Start with a goal", "Open Trading Workspace", "Review Approvals", "Review Evidence", "Open Diagnostics", "Continue Next Action"],
  plannedInputs: ["User intent", "Workspace target", "Approval posture", "Evidence posture", "Diagnostic need"],
  plannedOutputs: ["Navigation-only quick actions", "No worker dispatch", "No command execution", "No model calls"],
  checklistPrefix: "cockpit-quick-actions",
  checklistSummary:
    "Cockpit quick actions preview shows user actions Start with a goal Open Trading Workspace Review Approvals Review Evidence Open Diagnostics and Continue Next Action.",
  blocked: "Cockpit quick actions preview does not dispatch workers, call models, run commands, write files, place trades, or move money.",
  approval: "Cockpit quick actions preview requires explicit operator approval.",
  state: "user-facing",
});

const NEXT_ACTION_RAIL_CLEANUP = createSection({
  sectionId: "nextActionRailCleanup",
  label: "Next Action",
  title: "Next Action Rail Cleanup",
  humanReadableSummary:
    "Next Action rail shows current checkpoint, latest safe workspace, pending approvals, validation reminders, and diagnostics link without auto-advance.",
  featureLabels: ["Current checkpoint", "Latest safe workspace", "Pending approvals", "Validation reminders", "Diagnostics link"],
  plannedInputs: ["Checkpoint", "Workspace posture", "Approval needs", "Validation reminders"],
  plannedOutputs: ["Clean next action rail", "Blocked states visible", "No workflow auto-advance"],
  checklistPrefix: "next-action-rail-cleanup",
  checklistSummary:
    "Next action rail cleanup preview shows a clean next action rail with current checkpoint latest safe workspace pending approvals validation reminders and diagnostics link.",
  blocked: "Next action rail cleanup preview does not auto-advance, execute workflows, release approvals, or hide blocked states.",
  approval: "Next action rail cleanup preview requires explicit operator approval.",
  state: "user-facing",
});

const COMMAND_PALETTE_GROUPING = createSection({
  sectionId: "commandPaletteGrouping",
  label: "Command Palette Grouping",
  title: "Command Palette Grouping",
  humanReadableSummary:
    "Command Palette Grouping separates feature-first commands from Developer Diagnostics so normal users see product commands while diagnostics remain searchable.",
  featureLabels: ["Open CodexForge Cockpit", "Open Trading Workspace", "Open Build Workspace", "Review Approvals", "Review Evidence and Audit", "Open Developer Diagnostics"],
  plannedInputs: ["Feature commands", "Diagnostic commands", "Route registry", "Search aliases"],
  plannedOutputs: ["User feature command group", "Developer diagnostics command group", "Preserved diagnostic search"],
  checklistPrefix: "command-palette-grouping",
  checklistSummary:
    "Command palette grouping preview groups command palette entries into user features and developer diagnostics rather than a flat phase list.",
  blocked: "Command palette grouping preview does not remove diagnostic search, remove direct phase access, or execute commands.",
  approval: "Command palette grouping preview requires explicit operator approval.",
  state: "user-facing",
});

const COCKPIT_STATUS_SUMMARY = createSection({
  sectionId: "cockpitStatusSummary",
  label: "Cockpit Status Summary",
  title: "Cockpit Status Summary",
  humanReadableSummary:
    "Cockpit Status Summary shows current checkpoint through phase 1865, latest batch, latest release candidate, smoke posture, UX readiness, and blocked execution boundaries.",
  featureLabels: ["Current phase checkpoint", "Latest batch", "Latest release candidate", "Smoke posture", "User UX readiness", "Blocked execution boundaries"],
  plannedInputs: ["All-smoke registry checkpoint", "Batch label", "Release candidate label", "Known validation posture"],
  plannedOutputs: ["Checkpoint summary", "No unearned full-smoke claim", "Execution boundary summary"],
  checklistPrefix: "cockpit-status-summary",
  checklistSummary:
    "Cockpit status summary preview shows current phase checkpoint latest batch latest release candidate smoke posture user UX readiness and blocked execution boundaries.",
  blocked: "Cockpit status summary preview does not claim full smoke passed unless full smoke has passed.",
  approval: "Cockpit status summary preview requires explicit operator approval.",
  state: "review-only",
});

const COCKPIT_ONBOARDING_HELP = createSection({
  sectionId: "cockpitOnboardingHelp",
  label: "Cockpit Onboarding Help",
  title: "Cockpit Onboarding Help",
  humanReadableSummary:
    "Cockpit Onboarding Help explains one user cockpit, trading workspace, build workspace, approvals, evidence, diagnostics, and why phase pages exist.",
  featureLabels: ["One user cockpit", "Trading Workspace", "Build Workspace", "Approvals", "Evidence", "Diagnostics", "Why phase pages exist"],
  plannedInputs: ["User help summary", "Diagnostic purpose", "Safety boundary", "Navigation model"],
  plannedOutputs: ["Onboarding summary", "Diagnostics explanation", "Normal user surface explanation"],
  checklistPrefix: "cockpit-onboarding-help",
  checklistSummary:
    "Cockpit onboarding help preview explains one user cockpit trading workspace build workspace approvals evidence diagnostics and why phase pages exist.",
  blocked: "Cockpit onboarding help preview does not turn diagnostics into user workflows or enable execution.",
  approval: "Cockpit onboarding help preview requires explicit operator approval.",
  state: "review-only",
});

const DENIED_NAVIGATION_CLEANUP_BOUNDARIES = createSection({
  sectionId: "deniedNavigationCleanupBoundaries",
  label: "Denied Navigation Cleanup Boundaries",
  title: "Denied Navigation Cleanup Boundaries",
  humanReadableSummary:
    "Denied navigation cleanup boundaries keep route deletion, smoke deletion, hidden execution, broker workflows, trading actions, money movement, model calls, commands, persistence, and browser storage writes blocked.",
  featureLabels: ["No route deletion", "No smoke deletion", "No hidden execution", "No broker workflows", "No money movement", "No model calls", "No command execution"],
  plannedInputs: ["Safety constraints", "Route registry preservation", "Smoke registry preservation", "Execution boundary list"],
  plannedOutputs: ["Blocked unsafe cleanup paths", "Preserved diagnostics", "Preserved direct route access"],
  checklistPrefix: "denied-navigation-cleanup-boundaries",
  checklistSummary: "Denied cockpit navigation cleanup paths remain blocked.",
  blocked: "Denied cockpit navigation cleanup paths remain blocked.",
  approval: "Denied navigation cleanup boundaries require explicit operator approval before any future mutation-capable change.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "userCockpitHome",
  "tradingWorkspaceHub",
  "buildWorkspaceHub",
  "approvalsHub",
  "evidenceAuditHub",
  "developerDiagnosticsHub",
  "phaseRouteGrouping",
  "userFeatureLabelMap",
  "cockpitQuickActions",
  "nextActionRailCleanup",
  "commandPaletteGrouping",
  "cockpitStatusSummary",
  "cockpitOnboardingHelp",
  "deniedNavigationCleanupBoundaries",
] as const;

const SECTION_LOOKUP: Record<(typeof ALL_SECTION_IDS)[number], CockpitNavigationCleanupSection> = {
  userCockpitHome: USER_COCKPIT_HOME,
  tradingWorkspaceHub: TRADING_WORKSPACE_HUB,
  buildWorkspaceHub: BUILD_WORKSPACE_HUB,
  approvalsHub: APPROVALS_HUB,
  evidenceAuditHub: EVIDENCE_AUDIT_HUB,
  developerDiagnosticsHub: DEVELOPER_DIAGNOSTICS_HUB,
  phaseRouteGrouping: PHASE_ROUTE_GROUPING,
  userFeatureLabelMap: USER_FEATURE_LABEL_MAP,
  cockpitQuickActions: COCKPIT_QUICK_ACTIONS,
  nextActionRailCleanup: NEXT_ACTION_RAIL_CLEANUP,
  commandPaletteGrouping: COMMAND_PALETTE_GROUPING,
  cockpitStatusSummary: COCKPIT_STATUS_SUMMARY,
  cockpitOnboardingHelp: COCKPIT_ONBOARDING_HELP,
  deniedNavigationCleanupBoundaries: DENIED_NAVIGATION_CLEANUP_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly CockpitNavigationCleanupItem[] = [
  {
    id: "checkpoint-through-1897",
    label: "Current checkpoint",
    detail: "Status summary: through phase 1897 after Cockpit Trading Workflow Polish v1.",
    state: "review-only",
  },
  {
    id: "normal-user-cockpit",
    label: "Normal user UX",
    detail: "CodexForge Cockpit is the one normal user UX while phase pages remain diagnostics.",
    state: "user-facing",
  },
  {
    id: "diagnostics-preserved",
    label: "Diagnostics preserved",
    detail: "Phase pages remain dev test diagnostics only, direct phase route access remains available, and smoke coverage remains preserved.",
    state: "diagnostic",
  },
  {
    id: "execution-blocked",
    label: "Execution blocked",
    detail: "No route deletion, smoke deletion, hidden execution, broker connection, credential storage, account reads, order placement, order dispatch, trade placement, money movement, strategy auto tuning, strategy auto promotion, model call, command execution, evidence persistence, export/file writes, or file mutation is enabled.",
    state: "blocked",
  },
] as const;

const QUICK_ACTIONS: readonly CockpitNavigationCleanupItem[] = [
  { id: "start-with-goal", label: "Start with a goal", detail: "Review the goal intake area in the cockpit.", state: "user-facing" },
  { id: "open-trading-workspace", label: "Open Trading Workspace", detail: "Review trading research, risk, strategy, backtest, paper trading, profit lockbox, broker boundary, paper broker simulator, paper result ledger, paper review dashboard, strategy performance review loop, strategy change control, strategy version registry, paper strategy promotion gate, paper trading end-to-end review, and cockpit trading workflow polish sections.", state: "user-facing" },
  { id: "open-build-workspace", label: "Open Build Workspace", detail: "Review project builder, game server builder, domain packs, plans, artifacts, commands, and evidence.", state: "user-facing" },
  { id: "review-approvals", label: "Review Approvals", detail: "Review approval gates and holds without persisting approval decisions.", state: "approval-required" },
  { id: "review-evidence", label: "Review Evidence", detail: "Review evidence and audit posture without persisting evidence, results, audit, or memory.", state: "review-only" },
  { id: "open-diagnostics", label: "Open Diagnostics", detail: "Open Developer Diagnostics for grouped phase route families and direct diagnostic links.", state: "diagnostic" },
  { id: "continue-next-action", label: "Continue Next Action", detail: "Review the next action rail without auto-advance or execution.", state: "user-facing" },
] as const;

const FEATURE_COMMANDS: readonly CockpitNavigationCleanupItem[] = [
  { id: "open-codexforge-cockpit", label: "Open CodexForge Cockpit", detail: "Feature command points to /codexforge-cockpit.", state: "user-facing" },
  { id: "open-trading-workspace", label: "Open Trading Workspace", detail: "Feature command points to /trading-workspace-hub-preview.", state: "user-facing" },
  { id: "review-broker-boundary", label: "Review Broker Boundary", detail: "Feature command points to /cockpit-broker-boundary-summary.", state: "review-only" },
  { id: "review-paper-broker-simulator", label: "Review Paper Broker Simulator", detail: "Feature command points to /cockpit-paper-broker-simulator-summary.", state: "review-only" },
  { id: "review-paper-result-ledger", label: "Review Paper Result Ledger", detail: "Feature command points to /cockpit-paper-trading-result-ledger-summary.", state: "review-only" },
  { id: "review-paper-review-dashboard", label: "Review Paper Review Dashboard", detail: "Feature command points to /cockpit-paper-trading-review-dashboard-summary.", state: "review-only" },
  { id: "open-build-workspace", label: "Open Build Workspace", detail: "Feature command points to /build-workspace-hub-preview.", state: "user-facing" },
  { id: "review-approvals", label: "Review Approvals", detail: "Feature command points to /approvals-hub-preview.", state: "approval-required" },
  { id: "review-evidence-audit", label: "Review Evidence and Audit", detail: "Feature command points to /evidence-audit-hub-preview.", state: "review-only" },
  { id: "open-developer-diagnostics", label: "Open Developer Diagnostics", detail: "Feature command points to /developer-diagnostics-hub-preview.", state: "diagnostic" },
] as const;

export const COCKPIT_NAVIGATION_CLEANUP_USER_UX_MODEL: CockpitNavigationCleanupUserUxModel = {
  cockpitNavigationCleanupUserUxId: "cockpit-navigation-cleanup-user-ux-v1",
  cockpitNavigationCleanupUserUxKind: "cockpit-navigation-cleanup-user-ux-v1",
  userCockpitHome: USER_COCKPIT_HOME,
  tradingWorkspaceHub: TRADING_WORKSPACE_HUB,
  buildWorkspaceHub: BUILD_WORKSPACE_HUB,
  approvalsHub: APPROVALS_HUB,
  evidenceAuditHub: EVIDENCE_AUDIT_HUB,
  developerDiagnosticsHub: DEVELOPER_DIAGNOSTICS_HUB,
  phaseRouteGrouping: PHASE_ROUTE_GROUPING,
  userFeatureLabelMap: USER_FEATURE_LABEL_MAP,
  cockpitQuickActions: COCKPIT_QUICK_ACTIONS,
  nextActionRailCleanup: NEXT_ACTION_RAIL_CLEANUP,
  commandPaletteGrouping: COMMAND_PALETTE_GROUPING,
  cockpitStatusSummary: COCKPIT_STATUS_SUMMARY,
  cockpitOnboardingHelp: COCKPIT_ONBOARDING_HELP,
  deniedNavigationCleanupBoundaries: DENIED_NAVIGATION_CLEANUP_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
  routeFamilies: ROUTE_FAMILIES,
  quickActions: QUICK_ACTIONS,
  featureCommands: FEATURE_COMMANDS,
};

const ROUTES: readonly CockpitNavigationCleanupRouteDefinition[] = [
  {
    slug: "cockpit-navigation-cleanup-boundary",
    href: "/cockpit-navigation-cleanup-boundary",
    phase: "Phase 1722",
    title: "Cockpit Navigation Cleanup Boundary",
    commandLabel: "Go to Cockpit Navigation Cleanup Boundary",
    summary: "Defines the navigation cleanup boundary without deleting routes, removing smokes, hiding safety state, or enabling execution.",
    markerPhrases: [
      "Cockpit navigation cleanup boundary",
      "Cockpit navigation cleanup boundary does not delete routes remove smokes hide safety state or enable execution",
      "Cockpit navigation cleanup boundary requires explicit operator approval",
      "Cockpit navigation cleanup boundary keeps phase pages as diagnostics while normal users start at /codexforge-cockpit",
      "Denied cockpit navigation cleanup paths remain blocked",
      "Cockpit navigation cleanup checklist",
    ],
    sectionIds: ["deniedNavigationCleanupBoundaries", "userCockpitHome", "developerDiagnosticsHub", "phaseRouteGrouping"],
    devOnly: true,
  },
  {
    slug: "user-cockpit-home-preview",
    href: "/user-cockpit-home-preview",
    phase: "Phase 1723",
    title: "User Cockpit Home Preview",
    commandLabel: "Go to User Cockpit Home Preview",
    summary: "Previews /codexforge-cockpit as the one normal user homepage without phase spam.",
    markerPhrases: [
      "User cockpit home preview",
      "User cockpit home preview keeps /codexforge-cockpit as the one normal user homepage",
      "User cockpit home preview requires explicit operator approval",
      "User cockpit home preview shows goal input trading workspace build workspace approvals evidence audit next action and diagnostics entry without phase spam",
      "Denied user cockpit home paths remain blocked",
      "User cockpit home checklist",
    ],
    sectionIds: ["userCockpitHome", "cockpitQuickActions", "nextActionRailCleanup", "developerDiagnosticsHub"],
    devOnly: true,
  },
  {
    slug: "trading-workspace-hub-preview",
    href: "/trading-workspace-hub-preview",
    phase: "Phase 1724",
    title: "Trading Workspace Hub Preview",
    commandLabel: "Go to Trading Workspace Hub Preview",
    summary: "Groups trading research, mandate, risk governor, strategy lab, backtest, paper trading, and profit lockbox into one workspace.",
    markerPhrases: [
      "Trading workspace hub preview",
      "Trading workspace hub preview groups trading research mandate risk governor strategy lab backtest paper trading and profit lockbox into one user-facing trading workspace",
      "Trading workspace hub preview requires explicit operator approval",
      "Trading workspace hub preview hides individual trading phase pages from normal navigation while preserving direct diagnostic access",
      "Denied trading workspace hub paths remain blocked",
      "Trading workspace hub checklist",
    ],
    sectionIds: ["tradingWorkspaceHub", "phaseRouteGrouping", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "build-workspace-hub-preview",
    href: "/build-workspace-hub-preview",
    phase: "Phase 1725",
    title: "Build Workspace Hub Preview",
    commandLabel: "Go to Build Workspace Hub Preview",
    summary: "Groups project builder, game server builder, domain packs, generated plans, artifacts, commands, and evidence into one workspace.",
    markerPhrases: [
      "Build workspace hub preview",
      "Build workspace hub preview groups project builder game server builder domain packs generated plans artifacts commands and evidence into one user-facing build workspace",
      "Build workspace hub preview requires explicit operator approval",
      "Build workspace hub preview hides individual build phase pages from normal navigation while preserving diagnostic access",
      "Denied build workspace hub paths remain blocked",
      "Build workspace hub checklist",
    ],
    sectionIds: ["buildWorkspaceHub", "phaseRouteGrouping", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "approvals-hub-preview",
    href: "/approvals-hub-preview",
    phase: "Phase 1726",
    title: "Approvals Hub Preview",
    commandLabel: "Go to Approvals Hub Preview",
    summary: "Groups operator approval gates, risk approvals, broker boundary approvals, reinvestment approvals, and execution holds.",
    markerPhrases: [
      "Approvals hub preview",
      "Approvals hub preview groups operator approval gates risk approvals broker boundary approvals reinvestment approvals and execution holds into one review surface",
      "Approvals hub preview requires explicit operator approval",
      "Approvals hub preview does not persist approvals release locks start runtimes run commands or enable execution from the UI",
      "Denied approvals hub paths remain blocked",
      "Approvals hub checklist",
    ],
    sectionIds: ["approvalsHub", "cockpitStatusSummary", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-audit-hub-preview",
    href: "/evidence-audit-hub-preview",
    phase: "Phase 1727",
    title: "Evidence Audit Hub Preview",
    commandLabel: "Go to Evidence Audit Hub Preview",
    summary: "Groups evidence results, audit continuity, redaction, checkpoint status, and backend-owned capture notes.",
    markerPhrases: [
      "Evidence audit hub preview",
      "Evidence audit hub preview groups evidence results audit continuity redaction checkpoint status and backend-owned capture notes into one review surface",
      "Evidence audit hub preview requires backend-owned capture",
      "Evidence audit hub preview does not persist evidence results audit or memory from the UI",
      "Denied evidence audit hub paths remain blocked",
      "Evidence audit hub checklist",
    ],
    sectionIds: ["evidenceAuditHub", "cockpitStatusSummary", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "developer-diagnostics-hub-preview",
    href: "/developer-diagnostics-hub-preview",
    phase: "Phase 1728",
    title: "Developer Diagnostics Hub Preview",
    commandLabel: "Go to Developer Diagnostics Hub Preview",
    summary: "Groups phase pages, smoke routes, route families, and diagnostic deep links under Developer Diagnostics.",
    markerPhrases: [
      "Developer diagnostics hub preview",
      "Developer diagnostics hub preview groups phase pages smoke routes route families and diagnostic deep links under Developer Diagnostics",
      "Developer diagnostics hub preview requires explicit operator approval",
      "Developer diagnostics hub preview keeps diagnostics accessible without polluting normal user navigation",
      "Denied developer diagnostics paths remain blocked",
      "Developer diagnostics hub checklist",
    ],
    sectionIds: ["developerDiagnosticsHub", "phaseRouteGrouping", "commandPaletteGrouping", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "phase-route-grouping-preview",
    href: "/phase-route-grouping-preview",
    phase: "Phase 1729",
    title: "Phase Route Grouping Preview",
    commandLabel: "Go to Phase Route Grouping Preview",
    summary: "Groups phase routes by family while preserving direct access, smoke coverage, and command palette search.",
    markerPhrases: [
      "Phase route grouping preview",
      "Phase route grouping preview groups phase routes by family build trading research mandate strategy backtest profit cockpit diagnostics and legacy foundations",
      "Phase route grouping preview requires explicit operator approval",
      "Phase route grouping preview preserves direct route access smoke coverage and command palette search while reducing normal menu noise",
      "Denied phase route grouping paths remain blocked",
      "Phase route grouping checklist",
    ],
    sectionIds: ["phaseRouteGrouping", "developerDiagnosticsHub", "commandPaletteGrouping"],
    devOnly: true,
  },
  {
    slug: "user-feature-label-map-preview",
    href: "/user-feature-label-map-preview",
    phase: "Phase 1730",
    title: "User Feature Label Map Preview",
    commandLabel: "Go to User Feature Label Map Preview",
    summary: "Replaces phase-heavy labels with product labels while keeping phase numbers visible in diagnostics metadata.",
    markerPhrases: [
      "User feature label map preview",
      "User feature label map preview replaces phase-heavy labels with product labels such as Trading Workspace Build Workspace Approvals Evidence Developer Diagnostics and Next Action",
      "User feature label map preview requires explicit operator approval",
      "User feature label map preview keeps phase numbers visible only in diagnostics metadata",
      "Denied user feature label paths remain blocked",
      "User feature label map checklist",
    ],
    sectionIds: ["userFeatureLabelMap", "userCockpitHome", "commandPaletteGrouping"],
    devOnly: true,
  },
  {
    slug: "cockpit-quick-actions-preview",
    href: "/cockpit-quick-actions-preview",
    phase: "Phase 1731",
    title: "Cockpit Quick Actions Preview",
    commandLabel: "Go to Cockpit Quick Actions Preview",
    summary: "Shows navigation-only quick actions for the consolidated cockpit.",
    markerPhrases: [
      "Cockpit quick actions preview",
      "Cockpit quick actions preview shows user actions Start with a goal Open Trading Workspace Review Approvals Review Evidence Open Diagnostics and Continue Next Action",
      "Cockpit quick actions preview requires explicit operator approval",
      "Cockpit quick actions preview does not dispatch workers call models run commands write files place trades or move money",
      "Denied cockpit quick action paths remain blocked",
      "Cockpit quick actions checklist",
    ],
    sectionIds: ["cockpitQuickActions", "userCockpitHome", "deniedNavigationCleanupBoundaries"],
    devOnly: true,
  },
  {
    slug: "next-action-rail-cleanup-preview",
    href: "/next-action-rail-cleanup-preview",
    phase: "Phase 1732",
    title: "Next Action Rail Cleanup Preview",
    commandLabel: "Go to Next Action Rail Cleanup Preview",
    summary: "Shows a clean next action rail with checkpoint, workspace, approvals, validation reminders, and diagnostics.",
    markerPhrases: [
      "Next action rail cleanup preview",
      "Next action rail cleanup preview shows a clean next action rail with current checkpoint latest safe workspace pending approvals validation reminders and diagnostics link",
      "Next action rail cleanup preview requires explicit operator approval",
      "Next action rail cleanup preview does not auto-advance execute workflows release approvals or hide blocked states",
      "Denied next action rail cleanup paths remain blocked",
      "Next action rail cleanup checklist",
    ],
    sectionIds: ["nextActionRailCleanup", "cockpitStatusSummary", "approvalsHub"],
    devOnly: true,
  },
  {
    slug: "command-palette-grouping-preview",
    href: "/command-palette-grouping-preview",
    phase: "Phase 1733",
    title: "Command Palette Grouping Preview",
    commandLabel: "Go to Command Palette Grouping Preview",
    summary: "Groups command palette entries into user features and developer diagnostics.",
    markerPhrases: [
      "Command palette grouping preview",
      "Command palette grouping preview groups command palette entries into user features and developer diagnostics rather than a flat phase list",
      "Command palette grouping preview requires explicit operator approval",
      "Command palette grouping preview preserves diagnostic search and direct phase access while normal users see feature-first commands",
      "Denied command palette grouping paths remain blocked",
      "Command palette grouping checklist",
    ],
    sectionIds: ["commandPaletteGrouping", "userFeatureLabelMap", "developerDiagnosticsHub"],
    devOnly: true,
  },
  {
    slug: "cockpit-status-summary-preview",
    href: "/cockpit-status-summary-preview",
    phase: "Phase 1734",
    title: "Cockpit Status Summary Preview",
    commandLabel: "Go to Cockpit Status Summary Preview",
    summary: "Shows checkpoint, latest batch, release candidate, smoke posture, UX readiness, and blocked boundaries.",
    markerPhrases: [
      "Cockpit status summary preview",
      "Cockpit status summary preview shows current phase checkpoint latest batch latest release candidate smoke posture user UX readiness and blocked execution boundaries",
      "Cockpit status summary preview requires explicit operator approval",
      "Cockpit status summary preview does not claim full smoke passed unless full smoke has passed",
      "Denied cockpit status summary paths remain blocked",
      "Cockpit status summary checklist",
    ],
    sectionIds: ["cockpitStatusSummary", "deniedNavigationCleanupBoundaries", "cockpitOnboardingHelp"],
    devOnly: true,
  },
  {
    slug: "cockpit-onboarding-help-preview",
    href: "/cockpit-onboarding-help-preview",
    phase: "Phase 1735",
    title: "Cockpit Onboarding Help Preview",
    commandLabel: "Go to Cockpit Onboarding Help Preview",
    summary: "Explains the one user cockpit, workspaces, approvals, evidence, diagnostics, and why phase pages exist.",
    markerPhrases: [
      "Cockpit onboarding help preview",
      "Cockpit onboarding help preview explains one user cockpit trading workspace build workspace approvals evidence diagnostics and why phase pages exist",
      "Cockpit onboarding help preview requires explicit operator approval",
      "Cockpit onboarding help preview explains that phase pages are diagnostics and the cockpit is the normal user surface",
      "Denied cockpit onboarding help paths remain blocked",
      "Cockpit onboarding help checklist",
    ],
    sectionIds: ["cockpitOnboardingHelp", "userCockpitHome", "developerDiagnosticsHub"],
    devOnly: true,
  },
  {
    slug: "first-consolidated-user-ux-candidate",
    href: "/first-consolidated-user-ux-candidate",
    phase: "Phase 1736",
    title: "First Consolidated User UX Candidate",
    commandLabel: "Go to First Consolidated User UX Candidate",
    summary: "Combines the first consolidated user UX candidate without removing diagnostics or enabling execution.",
    markerPhrases: [
      "First consolidated user UX candidate",
      "First consolidated user UX candidate does not remove diagnostics break direct phase access remove smokes or enable execution from the UI",
      "First consolidated user UX candidate requires explicit operator approval",
      "Candidate combines user cockpit home trading workspace build workspace approvals evidence diagnostics route grouping feature labels quick actions next action rail command grouping status and onboarding",
      "Denied first consolidated user UX paths remain blocked",
      "First consolidated user UX checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-consolidated-user-ux-release-candidate",
    href: "/controlled-consolidated-user-ux-release-candidate",
    phase: "Phase 1737",
    title: "Controlled Consolidated User UX Release Candidate",
    commandLabel: "Go to Controlled Consolidated User UX Release Candidate",
    summary: "Release candidate makes /codexforge-cockpit the one normal user UX while preserving backend-owned diagnostics and phase route coverage.",
    markerPhrases: [
      "Controlled consolidated user UX release candidate",
      "Controlled consolidated user UX release candidate does not delete routes remove smoke coverage enable execution dispatch workers call models providers connectors run commands write files place trades move money connect brokers persist approvals persist evidence persist audit promote memory release locks spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled consolidated user UX release requires explicit operator approval",
      "Release candidate makes /codexforge-cockpit the one normal user UX while preserving backend-owned diagnostics and phase route coverage",
      "Denied controlled consolidated user UX paths remain blocked",
      "Controlled consolidated user UX release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

export function listCockpitNavigationCleanupRouteDefinitions(): readonly CockpitNavigationCleanupRouteDefinition[] {
  return ROUTES;
}

export function getCockpitNavigationCleanupRouteDefinition(
  slug: CockpitNavigationCleanupUserUxRouteSlug
): CockpitNavigationCleanupRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildCockpitNavigationCleanupRouteModel(
  slug: CockpitNavigationCleanupUserUxRouteSlug = "controlled-consolidated-user-ux-release-candidate"
): CockpitNavigationCleanupRouteModel {
  const route = getCockpitNavigationCleanupRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId as (typeof ALL_SECTION_IDS)[number]])
    .filter((section): section is CockpitNavigationCleanupSection => Boolean(section));

  return {
    route,
    cockpitNavigationCleanupUserUx: COCKPIT_NAVIGATION_CLEANUP_USER_UX_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: COCKPIT_NAVIGATION_CLEANUP_USER_UX_MARKERS,
    summary: summarizeCockpitNavigationCleanupRoute(route, sections),
  };
}

export function buildCockpitNavigationCleanupUserUxModel(): CockpitNavigationCleanupRouteModel {
  return buildCockpitNavigationCleanupRouteModel("controlled-consolidated-user-ux-release-candidate");
}

export function summarizeCockpitNavigationCleanupRoute(
  route: CockpitNavigationCleanupRouteDefinition,
  sections: readonly CockpitNavigationCleanupSection[]
): string {
  return `${route.title} keeps ${sections.length} cockpit navigation cleanup sections static, deterministic, review-only, approval-required, and blocked from route deletion, smoke deletion, hidden execution, broker connection, credential storage, broker account reads, order placement, order dispatch, live market data calls, trade placement, money movement, financial advice, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, approval persistence, evidence persistence, audit persistence, queue creation, transaction creation, worker dispatch, runtime starts, process spawning, port binding, install, deploy, localhost probing, and browser storage writes.`;
}

export function buildCockpitNavigationCleanupStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
