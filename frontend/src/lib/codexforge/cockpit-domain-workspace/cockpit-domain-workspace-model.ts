export type CockpitDomainWorkspaceRouteSlug =
  | "codexforge-cockpit"
  | "cockpit-domain-workspace-boundary"
  | "front-goal-composer-preview"
  | "domain-cards-preview"
  | "active-domain-workspace-preview"
  | "generated-plan-workspace-preview"
  | "worker-route-workspace-preview"
  | "approval-gates-workspace-preview"
  | "artifact-command-workspace-preview"
  | "evidence-result-workspace-preview"
  | "recovery-audit-workspace-preview"
  | "memory-context-workspace-preview"
  | "trading-automation-domain-teaser-preview"
  | "game-server-builder-workspace-preview"
  | "next-action-rail-preview"
  | "first-cockpit-domain-workspace-candidate"
  | "controlled-cockpit-domain-workspace-release-candidate";

export type CockpitDomainWorkspaceKind =
  | "cockpit-domain-workspace-v1"
  | "cockpit-domain-workspace-boundary"
  | "front-goal-composer-preview"
  | "domain-cards-preview"
  | "active-domain-workspace-preview"
  | "generated-plan-workspace-preview"
  | "worker-route-workspace-preview"
  | "approval-gates-workspace-preview"
  | "artifact-command-workspace-preview"
  | "evidence-result-workspace-preview"
  | "recovery-audit-workspace-preview"
  | "memory-context-workspace-preview"
  | "trading-automation-domain-teaser-preview"
  | "game-server-builder-workspace-preview"
  | "next-action-rail-preview"
  | "first-cockpit-domain-workspace-candidate"
  | "controlled-cockpit-domain-workspace-release-candidate";

export type CockpitDomainWorkspaceState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "candidate"
  | "release-candidate";

export type CockpitDomainCardStatus = "available-preview" | "upcoming-preview";

export type CockpitDomainCard = {
  id: string;
  label: string;
  status: CockpitDomainCardStatus;
  summary: string;
  sampleGoal: string;
  safetyPosture: string;
};

export type CockpitDomainWorkspaceItem = {
  id: string;
  label: string;
  detail: string;
  state: CockpitDomainWorkspaceState;
};

export type CockpitDomainWorkspaceSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly CockpitDomainWorkspaceItem[];
  state: CockpitDomainWorkspaceState;
};

export type CockpitDomainWorkspaceModel = {
  cockpitDomainWorkspaceId: string;
  cockpitDomainWorkspaceKind: CockpitDomainWorkspaceKind;
  frontGoalComposer: CockpitDomainWorkspaceSection;
  domainCards: readonly CockpitDomainCard[];
  domainCardsWorkspace: CockpitDomainWorkspaceSection;
  activeDomainWorkspace: CockpitDomainWorkspaceSection;
  generatedPlanWorkspace: CockpitDomainWorkspaceSection;
  workerRouteWorkspace: CockpitDomainWorkspaceSection;
  approvalGatesWorkspace: CockpitDomainWorkspaceSection;
  artifactCommandWorkspace: CockpitDomainWorkspaceSection;
  evidenceResultWorkspace: CockpitDomainWorkspaceSection;
  recoveryAuditWorkspace: CockpitDomainWorkspaceSection;
  memoryContextWorkspace: CockpitDomainWorkspaceSection;
  tradingAutomationDomainTeaser: CockpitDomainWorkspaceSection;
  gameServerBuilderWorkspace: CockpitDomainWorkspaceSection;
  nextActionRail: CockpitDomainWorkspaceSection;
  deniedCockpitWorkspaceBoundaries: CockpitDomainWorkspaceSection;
  cockpitSummary: readonly CockpitDomainWorkspaceItem[];
  explicitSafetyLimits: readonly string[];
};

export type CockpitDomainWorkspaceRouteDefinition = {
  slug: CockpitDomainWorkspaceRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type CockpitDomainWorkspaceRouteModel = {
  route: CockpitDomainWorkspaceRouteDefinition;
  cockpitDomainWorkspace: CockpitDomainWorkspaceModel;
  sections: readonly CockpitDomainWorkspaceSection[];
  diagnosticRoutes: readonly CockpitDomainWorkspaceRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const COCKPIT_DOMAIN_WORKSPACE_COCKPIT_MARKERS = [
  "Cockpit Domain Workspace",
  "Start with a goal",
  "Choose a domain",
  "Game Server Builder",
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
  "Trading Automation Research",
  "Web App Builder",
  "Docs Pack",
  "Data Analysis Pack",
  "Creative Campaign Pack",
  "Active Workspace",
  "Generated Plan",
  "Worker Route",
  "Approval Gates",
  "Artifacts",
  "Commands",
  "Evidence",
  "Results",
  "Recovery",
  "Audit",
  "Memory Context",
  "Next Action",
  "Hold Before Execution",
  "Trading automation uses capital limits",
  "Trading automation uses profit lockbox rules",
  "Trading automation requires paper trading first",
  "Trading automation requires risk governor",
  "No domain execution from the cockpit",
  "No worker dispatch from the cockpit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No command execution from the cockpit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No guaranteed profit claims",
  "Paper trading required before automation",
  "Backtesting required before automation",
  "Risk governor required before automation",
  "Backend-owned broker boundary remains required",
  "Backend-owned domain workspace remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Cockpit Domain Workspace v1 is preview-only from the frontend.",
  "It does not execute domain packs from the UI.",
  "It does not dispatch workers from the UI.",
  "It does not call models, local models, providers, or connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not run commands from the UI.",
  "It does not write generated artifacts from the UI.",
  "It does not connect brokers or place trades from the UI.",
  "It does not fetch live market data or provide financial advice from the UI.",
  "It does not make guaranteed profit claims.",
  "Paper trading, backtesting, a risk governor, backend-owned broker boundary, and explicit operator approval remain required before any future trading automation.",
  "It prepares a future backend-owned domain workspace.",
  "Explicit operator approval remains required.",
] as const;

const DOMAIN_CARDS: readonly CockpitDomainCard[] = [
  {
    id: "game-server-builder",
    label: "Game Server Builder",
    status: "available-preview",
    summary: "Available preview for planning a game server build before any backend-owned execution path exists.",
    sampleGoal:
      "Build a Minecraft roleplay server with a strong theme, roles, permissions, economy, quests, regions, factions, files, commands, validation, evidence, recovery, and audit.",
    safetyPosture:
      "Preview-only. No server starts, port binding, Java starts, Docker starts, installs, mod downloads, plugin downloads, commands, workers, models, or file writes from the cockpit.",
  },
  {
    id: "trading-automation-research",
    label: "Trading Automation Research",
    status: "upcoming-preview",
    summary: "Upcoming safe research domain pack for capital-limited automation design and risk review.",
    sampleGoal:
      "Research a trading automation plan with a user-defined trading pot, profit lockbox rule, reinvestment rule, paper trading first, backtesting required, risk governor required, and broker approval boundary.",
    safetyPosture:
      "Preview-only. No live trading from cockpit, no broker connection from cockpit, no order placement from cockpit, no financial advice claims, and no guaranteed profit claims.",
  },
  {
    id: "trading-research-domain-pack",
    label: "Trading Research",
    status: "available-preview",
    summary: "Safe review-only Trading Research Domain Pack for market research intake, watchlist, thesis, catalysts, risk, strategy candidates, backtest readiness, paper-trade readiness, profit lockbox concepts, mandate draft, broker boundary, evidence, and audit.",
    sampleGoal:
      "Prepare a research-only trading workflow with research goal, watchlist, thesis, catalysts, risk notes, strategy candidates, backtesting required, paper trading required, profit lockbox concept, capital-limited mandate, broker approval boundary, evidence, and audit.",
    safetyPosture:
      "Research-only and review-only. No broker connections from the cockpit, no trade placement from the cockpit, no live market data calls from the cockpit, no financial advice from the cockpit, no guaranteed profit claims, and backend-owned broker boundary remains required.",
  },
  {
    id: "web-app-builder",
    label: "Web App Builder",
    status: "upcoming-preview",
    summary: "Upcoming preview for web app planning, architecture, artifact review, and validation planning.",
    sampleGoal: "Plan a web app with product goal, screens, data model, implementation steps, validation, evidence, result, recovery, and audit.",
    safetyPosture: "Preview-only. No scaffolding, installs, downloads, commands, deployments, provider calls, or generated file writes from the cockpit.",
  },
  {
    id: "docs-pack",
    label: "Docs Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for documentation pack planning and publication review.",
    sampleGoal: "Plan docs with outline, source context, style rules, approval gates, artifact list, evidence, result acceptance, and recovery notes.",
    safetyPosture: "Preview-only. No document writes, publishing, connector calls, prompt sending, or browser storage writes from the cockpit.",
  },
  {
    id: "data-analysis-pack",
    label: "Data Analysis Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for analysis plans, assumptions, validation outputs, and report review.",
    sampleGoal: "Plan an analysis report with datasets, assumptions, charts, command families, validation, evidence, result states, and audit linkage.",
    safetyPosture: "Preview-only. No dataset downloads, notebook execution, commands, provider calls, report writes, or result persistence from the cockpit.",
  },
  {
    id: "creative-campaign-pack",
    label: "Creative Campaign Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for campaign planning, asset expectations, channels, evidence, and approval gates.",
    sampleGoal: "Plan a campaign with audience, assets, copy, channels, approval gates, evidence, result review, recovery, and audit.",
    safetyPosture: "Preview-only. No asset generation, provider calls, connector posts, downloads, publishing, or generated artifact writes from the cockpit.",
  },
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review content only.",
  "Future automation remains backend-owned, approval-gated, and outside direct frontend execution.",
  "Operator review must confirm goal, domain, worker route, approvals, artifacts, commands, evidence, result, audit, recovery, and memory context before execution can be considered.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No domain pack execution from the UI.",
  "No worker dispatch from the UI.",
  "No model calls, local model calls, provider calls, connector calls, or prompt sending from the UI.",
  "No command execution, direct file mutation, generated artifact writes, queue creation, transaction creation, audit persistence, evidence persistence, result persistence, memory promotion, browser storage writes, or approval persistence from the UI.",
  "No broker connections, order placement, trading execution, runtime starts, server starts, installs, downloads, port binding, deployment, rollback, retry, restore, stop, or recovery execution from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned domain workspace remains required.",
  "Explicit operator approval remains required.",
  "Denied cockpit workspace paths stay visible before any future execution path.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly CockpitDomainWorkspaceItem[] {
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

function createSection(section: CockpitDomainWorkspaceSection): CockpitDomainWorkspaceSection {
  return section;
}

const FRONT_GOAL_COMPOSER = createSection({
  sectionId: "frontGoalComposer",
  label: "Start with a goal",
  title: "Front Goal Composer Preview",
  humanReadableSummary:
    "Front goal composer preview helps normal users start with a goal, choose domain hints, define done criteria, set risk level, and review artifact, command, evidence, and recovery needs without sending prompts or creating jobs.",
  plannedInputs: ["User goal preview", "Domain hints", "Done criteria", "Risk level", "Artifact needs", "Command needs", "Evidence needs", "Recovery needs"],
  plannedOutputs: ["Review-only goal packet", "Suggested domain", "Hold Before Execution", "Operator approval requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "front-goal-composer",
    "Front goal composer preview helps users start with a goal choose domain hints define done criteria risk level artifacts commands evidence and recovery needs.",
    "Front goal composer preview does not send prompts or create jobs from the UI.",
    "Front goal composer preview requires explicit operator approval."
  ),
  state: "preview-only",
});

const DOMAIN_CARDS_WORKSPACE = createSection({
  sectionId: "domainCardsWorkspace",
  label: "Choose a domain",
  title: "Domain Cards Preview",
  humanReadableSummary:
    "Domain cards preview shows Game Server Builder, Trading Automation Research, Web App Builder, Docs Pack, Data Analysis Pack, and Creative Campaign Pack as deterministic review-only domain choices.",
  plannedInputs: ["Goal packet", "Domain hints", "Supported domain cards"],
  plannedOutputs: ["Selected domain preview", "Available preview note", "Upcoming preview notes", "Denied execution paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "domain-cards",
    "Domain cards preview shows Game Server Builder Trading Automation Research Web App Builder Docs Pack Data Analysis Pack and Creative Campaign Pack.",
    "Domain cards preview does not execute domain packs.",
    "Domain cards preview requires explicit operator approval."
  ),
  state: "review-only",
});

const ACTIVE_DOMAIN_WORKSPACE = createSection({
  sectionId: "activeDomainWorkspace",
  label: "Active Workspace",
  title: "Active Domain Workspace Preview",
  humanReadableSummary:
    "Active domain workspace preview shows the selected domain, goal, status, generated plan, worker route, approvals, artifacts, commands, evidence, result, audit, and recovery as one product workspace.",
  plannedInputs: ["Selected domain", "Goal preview", "Domain card posture", "Risk level"],
  plannedOutputs: ["Workspace status", "Generated Plan", "Worker Route", "Approval Gates", "Artifacts", "Commands", "Evidence", "Results", "Audit", "Recovery"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "active-domain-workspace",
    "Active domain workspace preview shows selected domain goal status generated plan worker route approvals artifacts commands evidence result audit and recovery.",
    "Active domain workspace preview does not dispatch workers or call models.",
    "Active domain workspace preview requires explicit operator approval."
  ),
  state: "preview-only",
});

const GENERATED_PLAN_WORKSPACE = createSection({
  sectionId: "generatedPlanWorkspace",
  label: "Generated Plan",
  title: "Generated Plan Workspace Preview",
  humanReadableSummary:
    "Generated plan workspace preview shows domain steps, assumptions, risks, files, command families, approval gates, evidence, result, audit, recovery, and hold-before-execution.",
  plannedInputs: ["Goal packet", "Selected domain", "Risk posture", "Artifact and command needs"],
  plannedOutputs: ["Domain steps", "Assumptions", "Risks", "Files", "Command families", "Approval gates", "Evidence", "Results", "Audit", "Recovery", "Hold Before Execution"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "generated-plan-workspace",
    "Generated plan workspace preview shows domain steps assumptions risks files command families approval gates evidence result audit recovery and hold-before-execution.",
    "Generated plan workspace preview does not execute plans.",
    "Generated plan workspace preview requires explicit operator approval."
  ),
  state: "review-only",
});

const WORKER_ROUTE_WORKSPACE = createSection({
  sectionId: "workerRouteWorkspace",
  label: "Worker Route",
  title: "Worker Route Workspace Preview",
  humanReadableSummary:
    "Worker route workspace preview shows specialist worker route, model route, provider approval, local model bridge, evidence, result, audit, and denied worker routes without dispatching workers.",
  plannedInputs: ["Selected domain", "Task type", "Capability fit", "Model route reference", "Provider approval reference", "Local model bridge reference"],
  plannedOutputs: ["Specialist worker route", "Model route", "Provider approval", "Local model bridge", "Evidence", "Results", "Audit", "Denied worker routes"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "worker-route-workspace",
    "Worker route workspace preview shows specialist worker route model route provider approval local model bridge evidence result audit and denied worker routes.",
    "Worker route workspace preview does not dispatch workers.",
    "Worker route workspace preview requires explicit operator approval."
  ),
  state: "blocked",
});

const APPROVAL_GATES_WORKSPACE = createSection({
  sectionId: "approvalGatesWorkspace",
  label: "Approval Gates",
  title: "Approval Gates Workspace Preview",
  humanReadableSummary:
    "Approval gates workspace preview shows domain scope, worker scope, model scope, provider scope, command scope, artifact scope, risk level, expiry, replay protection, and operator confirmation.",
  plannedInputs: ["Domain scope", "Worker scope", "Model scope", "Provider scope", "Command scope", "Artifact scope", "Risk level", "Expiry", "Replay protection"],
  plannedOutputs: ["Operator confirmation preview", "Approval checklist", "Denied approval persistence paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "approval-gates-workspace",
    "Approval gates workspace preview shows domain scope worker scope model scope provider scope command scope artifact scope risk level expiry replay protection and operator confirmation.",
    "Approval gates workspace preview does not persist approvals from the UI.",
    "Approval gates workspace preview requires explicit human approval."
  ),
  state: "needs-approval",
});

const ARTIFACT_COMMAND_WORKSPACE = createSection({
  sectionId: "artifactCommandWorkspace",
  label: "Artifacts and Commands",
  title: "Artifact Command Workspace Preview",
  humanReadableSummary:
    "Artifact command workspace preview shows planned artifacts, configs, docs, scripts, reports, command families, validation commands, and denied execution paths before any backend-owned execution.",
  plannedInputs: ["Generated plan", "Artifact families", "Command families", "Validation command candidates"],
  plannedOutputs: ["Artifacts", "Commands", "Configs", "Docs", "Scripts", "Reports", "Validation commands", "Denied execution paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "artifact-command-workspace",
    "Artifact command workspace preview shows planned artifacts configs docs scripts reports command families validation commands and denied execution paths.",
    "Artifact command workspace preview does not write files or run commands from the UI.",
    "Artifact command workspace preview requires explicit operator approval."
  ),
  state: "blocked",
});

const EVIDENCE_RESULT_WORKSPACE = createSection({
  sectionId: "evidenceResultWorkspace",
  label: "Evidence and Results",
  title: "Evidence Result Workspace Preview",
  humanReadableSummary:
    "Evidence result workspace preview shows planned evidence, validation outputs, worker outputs, result states, redaction, operator acceptance, and audit linkage as backend-owned capture requirements.",
  plannedInputs: ["Planned evidence", "Validation outputs", "Worker outputs", "Redaction plan", "Result states"],
  plannedOutputs: ["Evidence", "Results", "Operator acceptance", "Audit linkage", "Backend-owned capture requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "evidence-result-workspace",
    "Evidence result workspace preview shows planned evidence validation outputs worker outputs result states redaction operator acceptance and audit linkage.",
    "Evidence result workspace preview does not persist evidence or results from the UI.",
    "Evidence result workspace preview requires backend-owned capture."
  ),
  state: "backend-owned",
});

const RECOVERY_AUDIT_WORKSPACE = createSection({
  sectionId: "recoveryAuditWorkspace",
  label: "Recovery and Audit",
  title: "Recovery Audit Workspace Preview",
  humanReadableSummary:
    "Recovery audit workspace preview shows recovery plan, rollback artifacts, restore snapshots, retry validation, explain failure, safety stop, audit continuity, and operator timeline without executing recovery.",
  plannedInputs: ["Recovery plan", "Rollback artifacts", "Restore snapshots", "Retry validation", "Failure explanation", "Safety stop", "Audit continuity"],
  plannedOutputs: ["Recovery", "Audit", "Operator timeline", "Manual review path", "Denied recovery execution paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "recovery-audit-workspace",
    "Recovery audit workspace preview shows recovery plan rollback artifacts restore snapshots retry validation explain failure safety stop audit continuity and operator timeline.",
    "Recovery audit workspace preview does not execute rollback retry restore stop or recovery from the UI.",
    "Recovery audit workspace preview requires explicit operator approval."
  ),
  state: "blocked",
});

const MEMORY_CONTEXT_WORKSPACE = createSection({
  sectionId: "memoryContextWorkspace",
  label: "Memory Context",
  title: "Memory Context Workspace Preview",
  humanReadableSummary:
    "Memory context workspace preview shows project context, goal memory, evidence-backed learning, retention, redaction, approval needs, and denied memory paths without automatic promotion.",
  plannedInputs: ["Project context", "Goal memory", "Evidence-backed learning", "Retention note", "Redaction note"],
  plannedOutputs: ["Memory Context", "Approval needs", "Denied memory paths", "No automatic memory promotion"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "memory-context-workspace",
    "Memory context workspace preview shows project context goal memory evidence-backed learning retention redaction approval needs and denied memory paths.",
    "Memory context workspace preview does not promote memory automatically.",
    "Memory context workspace preview requires explicit operator approval."
  ),
  state: "needs-approval",
});

const TRADING_AUTOMATION_DOMAIN_TEASER = createSection({
  sectionId: "tradingAutomationDomainTeaser",
  label: "Trading Automation Research",
  title: "Trading Automation Domain Teaser Preview",
  humanReadableSummary:
    "Trading automation domain teaser preview is a safe upcoming research domain pack for capital-limited automation, a user-defined trading pot, profit lockbox rule, reinvestment rule, paper trading first, backtesting required, risk governor required, broker approval boundary required, no live trading from cockpit, no broker connection from cockpit, no order placement from cockpit, no financial advice claims, and no guaranteed profit claims.",
  plannedInputs: ["User-defined trading pot", "Capital limits", "Profit lockbox rule", "Reinvestment rule", "Paper trading first", "Backtesting requirement", "Risk governor", "Broker approval boundary"],
  plannedOutputs: ["Research-only plan", "Risk-governed preview", "No live trading from cockpit", "No broker connection from cockpit", "No order placement from cockpit", "No financial advice claims", "No guaranteed profit claims"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: [
    ...COMMON_DENIED_ACTIONS,
    "No live trading from cockpit.",
    "No broker connection from cockpit.",
    "No order placement from cockpit.",
    "No financial advice claims.",
    "No guaranteed profit claims.",
  ],
  safetyNotes: [
    "Trading automation uses capital limits.",
    "Trading automation uses profit lockbox rules.",
    "Trading automation requires paper trading first.",
    "Trading automation requires risk governor.",
    "Broker approval boundary required before any future backend-owned broker work.",
  ],
  checklist: checklist(
    "trading-automation-domain-teaser",
    "Trading automation domain teaser preview shows capital-limited automation profit lockbox reinvestment rules paper trading backtesting risk governor broker approval boundary and no guaranteed profit claims.",
    "Trading automation domain teaser preview does not connect brokers place trades provide financial advice or execute orders from the UI.",
    "Trading automation domain teaser preview requires explicit operator approval."
  ),
  state: "manual-review",
});

const GAME_SERVER_BUILDER_WORKSPACE = createSection({
  sectionId: "gameServerBuilderWorkspace",
  label: "Game Server Builder",
  title: "Game Server Builder Workspace Preview",
  humanReadableSummary:
    "Game server builder workspace preview shows server goal, server type, theme, Minecraft profile, plugins, mods, world rules, roles, permissions, economy, quests, regions, factions, files, commands, validation, evidence, recovery, and audit.",
  plannedInputs: ["Server goal", "Server type", "Theme", "Minecraft profile", "Plugins", "Mods", "World rules", "Roles", "Permissions", "Economy", "Quests", "Regions", "Factions"],
  plannedOutputs: ["Files", "Commands", "Validation", "Evidence", "Recovery", "Audit", "Hold Before Execution"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: [
    ...COMMON_DENIED_ACTIONS,
    "No game server starts from the UI.",
    "No Java starts from the UI.",
    "No Docker starts from the UI.",
    "No port binding from the UI.",
    "No plugin installs, mod installs, downloads, or commands from the UI.",
  ],
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "game-server-builder-workspace",
    "Game server builder workspace preview shows server goal server type theme Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit.",
    "Game server builder workspace preview does not start servers install mods bind ports or run commands from the UI.",
    "Game server builder workspace preview requires explicit operator approval."
  ),
  state: "preview-only",
});

const NEXT_ACTION_RAIL = createSection({
  sectionId: "nextActionRail",
  label: "Next Action",
  title: "Next Action Rail Preview",
  humanReadableSummary:
    "Next action rail preview shows review goal, choose domain, inspect plan, review approvals, inspect artifacts, inspect commands, inspect evidence, hold before execution, and manual next steps.",
  plannedInputs: ["Goal status", "Domain selection", "Plan status", "Approval posture", "Artifact posture", "Command posture", "Evidence posture"],
  plannedOutputs: ["Next Action", "Hold Before Execution", "Manual next steps", "No frontend execution"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "next-action-rail",
    "Next action rail preview shows review goal choose domain inspect plan review approvals inspect artifacts inspect commands inspect evidence hold before execution and manual next steps.",
    "Next action rail preview does not execute actions from the UI.",
    "Next action rail preview requires explicit operator approval."
  ),
  state: "review-only",
});

const DENIED_COCKPIT_WORKSPACE_BOUNDARIES = createSection({
  sectionId: "deniedCockpitWorkspaceBoundaries",
  label: "Denied cockpit workspace paths",
  title: "Denied Cockpit Workspace Boundaries",
  humanReadableSummary:
    "Denied cockpit workspace paths remain blocked across domain execution, workers, models, providers, connectors, prompts, commands, files, artifacts, approvals, queues, transactions, evidence, results, audit, memory, broker connections, trades, runtimes, servers, installs, downloads, rollback, retry, recovery, deployment, process spawning, port binding, credential storage, secret reads, API key reads, localhost probes, browser storage writes, and hidden routing.",
  plannedInputs: ["Safety policy", "Operator approval boundary", "Backend-owned domain workspace requirement"],
  plannedOutputs: ["Denied cockpit workspace paths remain blocked", "Hold Before Execution", "Manual operator approval requirement"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "denied-cockpit-workspace-boundaries",
    "Denied cockpit domain workspace paths remain blocked.",
    "Cockpit domain workspace boundary does not execute domain packs from the UI.",
    "Cockpit domain workspace requires explicit operator approval before execution."
  ),
  state: "denied",
});

const COCKPIT_SUMMARY: readonly CockpitDomainWorkspaceItem[] = [
  {
    id: "normal-users-start-with-goal",
    label: "Start with a goal",
    detail: "Normal users start with a goal, then choose a domain pack and review a generated plan before any execution is considered.",
    state: "preview-only",
  },
  {
    id: "game-server-available",
    label: "Game Server Builder",
    detail: "Game Server Builder is available as the first preview domain pack.",
    state: "preview-only",
  },
  {
    id: "trading-upcoming",
    label: "Trading Automation Research",
    detail: "Trading Automation Research is upcoming and will be capital-limited, paper-first, backtested, risk-governed, and broker-approval bounded.",
    state: "manual-review",
  },
  {
    id: "review-only-plan",
    label: "Generated Plan",
    detail: "Generated plans are review-only and workers are previewed but not dispatched.",
    state: "review-only",
  },
  {
    id: "execution-hold",
    label: "Hold Before Execution",
    detail: "Approvals, artifacts, commands, evidence, results, audit, recovery, and memory context are shown before real automation.",
    state: "needs-approval",
  },
] as const;

export const COCKPIT_DOMAIN_WORKSPACE_MODEL: CockpitDomainWorkspaceModel = {
  cockpitDomainWorkspaceId: "cockpit-domain-workspace-v1-preview",
  cockpitDomainWorkspaceKind: "cockpit-domain-workspace-v1",
  frontGoalComposer: FRONT_GOAL_COMPOSER,
  domainCards: DOMAIN_CARDS,
  domainCardsWorkspace: DOMAIN_CARDS_WORKSPACE,
  activeDomainWorkspace: ACTIVE_DOMAIN_WORKSPACE,
  generatedPlanWorkspace: GENERATED_PLAN_WORKSPACE,
  workerRouteWorkspace: WORKER_ROUTE_WORKSPACE,
  approvalGatesWorkspace: APPROVAL_GATES_WORKSPACE,
  artifactCommandWorkspace: ARTIFACT_COMMAND_WORKSPACE,
  evidenceResultWorkspace: EVIDENCE_RESULT_WORKSPACE,
  recoveryAuditWorkspace: RECOVERY_AUDIT_WORKSPACE,
  memoryContextWorkspace: MEMORY_CONTEXT_WORKSPACE,
  tradingAutomationDomainTeaser: TRADING_AUTOMATION_DOMAIN_TEASER,
  gameServerBuilderWorkspace: GAME_SERVER_BUILDER_WORKSPACE,
  nextActionRail: NEXT_ACTION_RAIL,
  deniedCockpitWorkspaceBoundaries: DENIED_COCKPIT_WORKSPACE_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, CockpitDomainWorkspaceSection> = {
  frontGoalComposer: FRONT_GOAL_COMPOSER,
  domainCardsWorkspace: DOMAIN_CARDS_WORKSPACE,
  activeDomainWorkspace: ACTIVE_DOMAIN_WORKSPACE,
  generatedPlanWorkspace: GENERATED_PLAN_WORKSPACE,
  workerRouteWorkspace: WORKER_ROUTE_WORKSPACE,
  approvalGatesWorkspace: APPROVAL_GATES_WORKSPACE,
  artifactCommandWorkspace: ARTIFACT_COMMAND_WORKSPACE,
  evidenceResultWorkspace: EVIDENCE_RESULT_WORKSPACE,
  recoveryAuditWorkspace: RECOVERY_AUDIT_WORKSPACE,
  memoryContextWorkspace: MEMORY_CONTEXT_WORKSPACE,
  tradingAutomationDomainTeaser: TRADING_AUTOMATION_DOMAIN_TEASER,
  gameServerBuilderWorkspace: GAME_SERVER_BUILDER_WORKSPACE,
  nextActionRail: NEXT_ACTION_RAIL,
  deniedCockpitWorkspaceBoundaries: DENIED_COCKPIT_WORKSPACE_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "frontGoalComposer",
  "domainCardsWorkspace",
  "activeDomainWorkspace",
  "generatedPlanWorkspace",
  "workerRouteWorkspace",
  "approvalGatesWorkspace",
  "artifactCommandWorkspace",
  "evidenceResultWorkspace",
  "recoveryAuditWorkspace",
  "memoryContextWorkspace",
  "tradingAutomationDomainTeaser",
  "gameServerBuilderWorkspace",
  "nextActionRail",
  "deniedCockpitWorkspaceBoundaries",
] as const;

const ROUTES: readonly CockpitDomainWorkspaceRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Cockpit Domain Workspace",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Front user-facing Cockpit Domain Workspace v1 preview for starting with a goal, choosing a domain, reviewing the workspace plan, and holding before execution.",
    markerPhrases: COCKPIT_DOMAIN_WORKSPACE_COCKPIT_MARKERS,
    sectionIds: ALL_SECTION_IDS,
    devOnly: false,
  },
  {
    slug: "cockpit-domain-workspace-boundary",
    href: "/cockpit-domain-workspace-boundary",
    phase: "Phase 1626",
    title: "Cockpit Domain Workspace Boundary",
    commandLabel: "Go to Cockpit Domain Workspace Boundary",
    summary: "Defines the preview-only Cockpit Domain Workspace boundary before backend-owned domain workspace execution exists.",
    markerPhrases: [
      "Cockpit domain workspace boundary",
      "Cockpit domain workspace boundary does not execute domain packs from the UI",
      "Cockpit domain workspace requires explicit operator approval before execution",
      "Cockpit domain workspace prepares a front user-facing workspace without frontend execution",
      "Denied cockpit domain workspace paths remain blocked",
      "Cockpit domain workspace checklist",
    ],
    sectionIds: ["deniedCockpitWorkspaceBoundaries", "activeDomainWorkspace", "approvalGatesWorkspace"],
    devOnly: true,
  },
  {
    slug: "front-goal-composer-preview",
    href: "/front-goal-composer-preview",
    phase: "Phase 1627",
    title: "Front Goal Composer Preview",
    commandLabel: "Go to Front Goal Composer Preview",
    summary: "Previews the front goal composer without sending prompts, creating jobs, or widening frontend authority.",
    markerPhrases: [
      "Front goal composer preview",
      "Front goal composer preview does not send prompts or create jobs from the UI",
      "Front goal composer preview requires explicit operator approval",
      "Front goal composer preview helps users start with a goal choose domain hints define done criteria risk level artifacts commands evidence and recovery needs",
      "Denied front goal composer paths remain blocked",
      "Front goal composer checklist",
    ],
    sectionIds: ["frontGoalComposer", "domainCardsWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-cards-preview",
    href: "/domain-cards-preview",
    phase: "Phase 1628",
    title: "Domain Cards Preview",
    commandLabel: "Go to Domain Cards Preview",
    summary: "Previews domain cards without executing or installing any domain pack.",
    markerPhrases: [
      "Domain cards preview",
      "Domain cards preview does not execute domain packs",
      "Domain cards preview requires explicit operator approval",
      "Domain cards preview shows Game Server Builder Trading Automation Research Web App Builder Docs Pack Data Analysis Pack and Creative Campaign Pack",
      "Denied domain cards paths remain blocked",
      "Domain cards checklist",
    ],
    sectionIds: ["domainCardsWorkspace", "gameServerBuilderWorkspace", "tradingAutomationDomainTeaser", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "active-domain-workspace-preview",
    href: "/active-domain-workspace-preview",
    phase: "Phase 1629",
    title: "Active Domain Workspace Preview",
    commandLabel: "Go to Active Domain Workspace Preview",
    summary: "Previews the selected active domain workspace without dispatching workers or calling models.",
    markerPhrases: [
      "Active domain workspace preview",
      "Active domain workspace preview does not dispatch workers or call models",
      "Active domain workspace preview requires explicit operator approval",
      "Active domain workspace preview shows selected domain goal status generated plan worker route approvals artifacts commands evidence result audit and recovery",
      "Denied active domain workspace paths remain blocked",
      "Active domain workspace checklist",
    ],
    sectionIds: ["activeDomainWorkspace", "generatedPlanWorkspace", "workerRouteWorkspace", "approvalGatesWorkspace", "artifactCommandWorkspace", "evidenceResultWorkspace", "recoveryAuditWorkspace"],
    devOnly: true,
  },
  {
    slug: "generated-plan-workspace-preview",
    href: "/generated-plan-workspace-preview",
    phase: "Phase 1630",
    title: "Generated Plan Workspace Preview",
    commandLabel: "Go to Generated Plan Workspace Preview",
    summary: "Previews generated plan workspace details without executing plans.",
    markerPhrases: [
      "Generated plan workspace preview",
      "Generated plan workspace preview does not execute plans",
      "Generated plan workspace preview requires explicit operator approval",
      "Generated plan workspace preview shows domain steps assumptions risks files command families approval gates evidence result audit recovery and hold-before-execution",
      "Denied generated plan workspace paths remain blocked",
      "Generated plan workspace checklist",
    ],
    sectionIds: ["generatedPlanWorkspace", "artifactCommandWorkspace", "approvalGatesWorkspace", "evidenceResultWorkspace", "recoveryAuditWorkspace"],
    devOnly: true,
  },
  {
    slug: "worker-route-workspace-preview",
    href: "/worker-route-workspace-preview",
    phase: "Phase 1631",
    title: "Worker Route Workspace Preview",
    commandLabel: "Go to Worker Route Workspace Preview",
    summary: "Previews specialist worker routing without dispatching workers.",
    markerPhrases: [
      "Worker route workspace preview",
      "Worker route workspace preview does not dispatch workers",
      "Worker route workspace preview requires explicit operator approval",
      "Worker route workspace preview shows specialist worker route model route provider approval local model bridge evidence result audit and denied worker routes",
      "Denied worker route workspace paths remain blocked",
      "Worker route workspace checklist",
    ],
    sectionIds: ["workerRouteWorkspace", "approvalGatesWorkspace", "evidenceResultWorkspace", "recoveryAuditWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "approval-gates-workspace-preview",
    href: "/approval-gates-workspace-preview",
    phase: "Phase 1632",
    title: "Approval Gates Workspace Preview",
    commandLabel: "Go to Approval Gates Workspace Preview",
    summary: "Previews approval gates without persisting approval state from the UI.",
    markerPhrases: [
      "Approval gates workspace preview",
      "Approval gates workspace preview does not persist approvals from the UI",
      "Approval gates workspace preview requires explicit human approval",
      "Approval gates workspace preview shows domain scope worker scope model scope provider scope command scope artifact scope risk level expiry replay protection and operator confirmation",
      "Denied approval gates workspace paths remain blocked",
      "Approval gates workspace checklist",
    ],
    sectionIds: ["approvalGatesWorkspace", "workerRouteWorkspace", "artifactCommandWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "artifact-command-workspace-preview",
    href: "/artifact-command-workspace-preview",
    phase: "Phase 1633",
    title: "Artifact Command Workspace Preview",
    commandLabel: "Go to Artifact Command Workspace Preview",
    summary: "Previews artifacts and commands without writing files or running commands from the UI.",
    markerPhrases: [
      "Artifact command workspace preview",
      "Artifact command workspace preview does not write files or run commands from the UI",
      "Artifact command workspace preview requires explicit operator approval",
      "Artifact command workspace preview shows planned artifacts configs docs scripts reports command families validation commands and denied execution paths",
      "Denied artifact command workspace paths remain blocked",
      "Artifact command workspace checklist",
    ],
    sectionIds: ["artifactCommandWorkspace", "generatedPlanWorkspace", "approvalGatesWorkspace", "evidenceResultWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-result-workspace-preview",
    href: "/evidence-result-workspace-preview",
    phase: "Phase 1634",
    title: "Evidence Result Workspace Preview",
    commandLabel: "Go to Evidence Result Workspace Preview",
    summary: "Previews evidence and result workspace requirements as backend-owned capture.",
    markerPhrases: [
      "Evidence result workspace preview",
      "Evidence result workspace preview does not persist evidence or results from the UI",
      "Evidence result workspace preview requires backend-owned capture",
      "Evidence result workspace preview shows planned evidence validation outputs worker outputs result states redaction operator acceptance and audit linkage",
      "Denied evidence result workspace paths remain blocked",
      "Evidence result workspace checklist",
    ],
    sectionIds: ["evidenceResultWorkspace", "artifactCommandWorkspace", "recoveryAuditWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "recovery-audit-workspace-preview",
    href: "/recovery-audit-workspace-preview",
    phase: "Phase 1635",
    title: "Recovery Audit Workspace Preview",
    commandLabel: "Go to Recovery Audit Workspace Preview",
    summary: "Previews recovery and audit workspace requirements without executing rollback, retry, restore, stop, or recovery.",
    markerPhrases: [
      "Recovery audit workspace preview",
      "Recovery audit workspace preview does not execute rollback retry restore stop or recovery from the UI",
      "Recovery audit workspace preview requires explicit operator approval",
      "Recovery audit workspace preview shows recovery plan rollback artifacts restore snapshots retry validation explain failure safety stop audit continuity and operator timeline",
      "Denied recovery audit workspace paths remain blocked",
      "Recovery audit workspace checklist",
    ],
    sectionIds: ["recoveryAuditWorkspace", "evidenceResultWorkspace", "approvalGatesWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "memory-context-workspace-preview",
    href: "/memory-context-workspace-preview",
    phase: "Phase 1636",
    title: "Memory Context Workspace Preview",
    commandLabel: "Go to Memory Context Workspace Preview",
    summary: "Previews memory context without automatic memory promotion.",
    markerPhrases: [
      "Memory context workspace preview",
      "Memory context workspace preview does not promote memory automatically",
      "Memory context workspace preview requires explicit operator approval",
      "Memory context workspace preview shows project context goal memory evidence-backed learning retention redaction approval needs and denied memory paths",
      "Denied memory context workspace paths remain blocked",
      "Memory context workspace checklist",
    ],
    sectionIds: ["memoryContextWorkspace", "evidenceResultWorkspace", "approvalGatesWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-automation-domain-teaser-preview",
    href: "/trading-automation-domain-teaser-preview",
    phase: "Phase 1637",
    title: "Trading Automation Domain Teaser Preview",
    commandLabel: "Go to Trading Automation Domain Teaser Preview",
    summary: "Previews safe trading automation research boundaries without broker connections or order placement.",
    markerPhrases: [
      "Trading automation domain teaser preview",
      "Trading automation domain teaser preview does not connect brokers place trades provide financial advice or execute orders from the UI",
      "Trading automation domain teaser preview requires explicit operator approval",
      "Trading automation domain teaser preview shows capital-limited automation profit lockbox reinvestment rules paper trading backtesting risk governor broker approval boundary and no guaranteed profit claims",
      "Denied trading automation teaser paths remain blocked",
      "Trading automation domain teaser checklist",
    ],
    sectionIds: ["tradingAutomationDomainTeaser", "approvalGatesWorkspace", "evidenceResultWorkspace", "recoveryAuditWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "game-server-builder-workspace-preview",
    href: "/game-server-builder-workspace-preview",
    phase: "Phase 1638",
    title: "Game Server Builder Workspace Preview",
    commandLabel: "Go to Game Server Builder Workspace Preview",
    summary: "Previews Game Server Builder workspace details without starting servers, installing mods, binding ports, or running commands.",
    markerPhrases: [
      "Game server builder workspace preview",
      "Game server builder workspace preview does not start servers install mods bind ports or run commands from the UI",
      "Game server builder workspace preview requires explicit operator approval",
      "Game server builder workspace preview shows server goal server type theme Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit",
      "Denied game server builder workspace paths remain blocked",
      "Game server builder workspace checklist",
    ],
    sectionIds: ["gameServerBuilderWorkspace", "generatedPlanWorkspace", "artifactCommandWorkspace", "evidenceResultWorkspace", "recoveryAuditWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "next-action-rail-preview",
    href: "/next-action-rail-preview",
    phase: "Phase 1639",
    title: "Next Action Rail Preview",
    commandLabel: "Go to Next Action Rail Preview",
    summary: "Previews the next action rail without executing actions from the UI.",
    markerPhrases: [
      "Next action rail preview",
      "Next action rail preview does not execute actions from the UI",
      "Next action rail preview requires explicit operator approval",
      "Next action rail preview shows review goal choose domain inspect plan review approvals inspect artifacts inspect commands inspect evidence hold before execution and manual next steps",
      "Denied next action rail paths remain blocked",
      "Next action rail checklist",
    ],
    sectionIds: ["nextActionRail", "frontGoalComposer", "domainCardsWorkspace", "generatedPlanWorkspace", "approvalGatesWorkspace", "artifactCommandWorkspace", "evidenceResultWorkspace", "deniedCockpitWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "first-cockpit-domain-workspace-candidate",
    href: "/first-cockpit-domain-workspace-candidate",
    phase: "Phase 1640",
    title: "First Cockpit Domain Workspace Candidate",
    commandLabel: "Go to First Cockpit Domain Workspace Candidate",
    summary: "Combines the first Cockpit Domain Workspace candidate across the product workspace preview.",
    markerPhrases: [
      "First cockpit domain workspace candidate",
      "First cockpit domain workspace candidate does not execute domain packs from the UI",
      "First cockpit domain workspace candidate requires explicit operator approval",
      "Candidate combines goal composer domain cards active workspace plan worker route approvals artifacts commands evidence results recovery audit memory context trading teaser game server workspace and next action rail",
      "Denied first cockpit domain workspace paths remain blocked",
      "First cockpit domain workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-cockpit-domain-workspace-release-candidate",
    href: "/controlled-cockpit-domain-workspace-release-candidate",
    phase: "Phase 1641",
    title: "Controlled Cockpit Domain Workspace Release Candidate",
    commandLabel: "Go to Controlled Cockpit Domain Workspace Release Candidate",
    summary:
      "Controlled cockpit domain workspace release candidate makes the cockpit a clearer front user-facing workspace without frontend execution.",
    markerPhrases: [
      "Controlled cockpit domain workspace release candidate",
      "Controlled cockpit domain workspace release candidate does not execute domain packs dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory connect brokers place trades release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled cockpit domain workspace release requires explicit operator approval",
      "Release candidate makes the cockpit a clearer front user-facing workspace without frontend execution",
      "Denied controlled cockpit domain workspace paths remain blocked",
      "Controlled cockpit domain workspace release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listCockpitDomainWorkspaceRouteDefinitions(): readonly CockpitDomainWorkspaceRouteDefinition[] {
  return ROUTES;
}

export function getCockpitDomainWorkspaceRouteDefinition(
  slug: CockpitDomainWorkspaceRouteSlug
): CockpitDomainWorkspaceRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildCockpitDomainWorkspaceRouteModel(
  slug: CockpitDomainWorkspaceRouteSlug = "codexforge-cockpit"
): CockpitDomainWorkspaceRouteModel {
  const route = getCockpitDomainWorkspaceRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is CockpitDomainWorkspaceSection => Boolean(section));

  return {
    route,
    cockpitDomainWorkspace: COCKPIT_DOMAIN_WORKSPACE_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: COCKPIT_DOMAIN_WORKSPACE_COCKPIT_MARKERS,
    summary: summarizeCockpitDomainWorkspaceRoute(route, sections),
  };
}

export function buildCockpitDomainWorkspaceModel(): CockpitDomainWorkspaceRouteModel {
  return buildCockpitDomainWorkspaceRouteModel("codexforge-cockpit");
}

export function summarizeCockpitDomainWorkspaceRoute(
  route: CockpitDomainWorkspaceRouteDefinition,
  sections: readonly CockpitDomainWorkspaceSection[]
): string {
  return `${route.title} keeps ${sections.length} cockpit domain workspace sections static, deterministic, preview-only, review-only, approval-required, backend-owned, and blocked from frontend domain execution, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, broker connection, trade placement, persistence, runtime starts, server starts, and recovery execution.`;
}

export function buildCockpitDomainWorkspaceStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
