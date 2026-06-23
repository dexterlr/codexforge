export type DomainPackRunnerRouteSlug =
  | "codexforge-cockpit"
  | "domain-pack-runner-boundary"
  | "domain-pack-catalog-preview"
  | "domain-goal-intake-runner-preview"
  | "domain-classifier-runner-preview"
  | "domain-worker-route-preview"
  | "domain-plan-preview"
  | "domain-artifact-plan-preview"
  | "domain-command-plan-preview"
  | "domain-approval-gate-preview"
  | "domain-evidence-result-preview"
  | "domain-audit-trail-preview"
  | "domain-recovery-route-preview"
  | "cockpit-domain-runner-summary"
  | "front-user-facing-runner-shell"
  | "first-domain-pack-runner-candidate"
  | "controlled-domain-pack-runner-release-candidate";

export type DomainPackRunnerKind =
  | "domain-pack-runner-preview"
  | "domain-pack-runner-boundary"
  | "domain-pack-catalog-preview"
  | "domain-goal-intake-runner-preview"
  | "domain-classifier-runner-preview"
  | "domain-worker-route-preview"
  | "domain-plan-preview"
  | "domain-artifact-plan-preview"
  | "domain-command-plan-preview"
  | "domain-approval-gate-preview"
  | "domain-evidence-result-preview"
  | "domain-audit-trail-preview"
  | "domain-recovery-route-preview"
  | "cockpit-domain-runner-summary"
  | "front-user-facing-runner-shell"
  | "first-domain-pack-runner-candidate"
  | "controlled-domain-pack-runner-release-candidate";

export type DomainPackRunnerState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "candidate"
  | "release-candidate";

export type SupportedDomainPackStatus = "available-preview" | "upcoming-preview";

export type SupportedDomainPack = {
  id: string;
  label: string;
  status: SupportedDomainPackStatus;
  summary: string;
  sampleGoal: string;
  safetyPosture: string;
};

export type DomainPackRunnerItem = {
  id: string;
  label: string;
  detail: string;
  state: DomainPackRunnerState;
};

export type DomainPackRunnerSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly DomainPackRunnerItem[];
  state: DomainPackRunnerState;
};

export type DomainPackRunnerShellStep = {
  id: string;
  label: string;
  detail: string;
  state: DomainPackRunnerState;
};

export type DomainPackRunnerFrontUserFacingShell = {
  shellId: string;
  title: string;
  sampleGoal: string;
  upcomingTradingSampleGoal: string;
  steps: readonly DomainPackRunnerShellStep[];
  reviewOnlyCopy: readonly string[];
};

export type DomainPackRunnerModel = {
  domainPackRunnerId: string;
  domainPackRunnerKind: DomainPackRunnerKind;
  selectedDomainPack: SupportedDomainPack;
  supportedDomainPacks: readonly SupportedDomainPack[];
  goalIntake: DomainPackRunnerSection;
  domainClassifier: DomainPackRunnerSection;
  specialistWorkerRoute: DomainPackRunnerSection;
  modelRouterRoute: DomainPackRunnerSection;
  providerApprovalRoute: DomainPackRunnerSection;
  localModelBridgeRoute: DomainPackRunnerSection;
  domainPlan: DomainPackRunnerSection;
  artifactPlan: DomainPackRunnerSection;
  commandPlan: DomainPackRunnerSection;
  approvalGatePlan: DomainPackRunnerSection;
  evidenceResultPlan: DomainPackRunnerSection;
  auditTrailPlan: DomainPackRunnerSection;
  recoveryRoute: DomainPackRunnerSection;
  deniedDomainRunnerBoundaries: DomainPackRunnerSection;
  cockpitSummary: readonly DomainPackRunnerItem[];
  frontUserFacingShell: DomainPackRunnerFrontUserFacingShell;
  explicitSafetyLimits: readonly string[];
};

export type DomainPackRunnerRouteDefinition = {
  slug: DomainPackRunnerRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type DomainPackRunnerRouteModel = {
  route: DomainPackRunnerRouteDefinition;
  domainPackRunner: DomainPackRunnerModel;
  sections: readonly DomainPackRunnerSection[];
  diagnosticRoutes: readonly DomainPackRunnerRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const DOMAIN_PACK_RUNNER_COCKPIT_MARKERS = [
  "Domain Pack Runner",
  "Choose Domain",
  "Game Server Builder",
  "Trading Research",
  "Web App Builder",
  "Docs Pack",
  "Data Analysis Pack",
  "Creative Campaign Pack",
  "Goal Intake",
  "Domain Classifier",
  "Worker Route",
  "Plan",
  "Artifacts",
  "Commands",
  "Approvals",
  "Evidence",
  "Results",
  "Audit",
  "Recovery",
  "Hold Before Execution",
  "Front User-Facing Runner Shell",
  "Start with a goal",
  "Pick a domain pack",
  "Review generated plan",
  "Review worker route",
  "Review approval gates",
  "Review artifacts and commands",
  "Review evidence and recovery",
  "No domain execution from the cockpit",
  "No worker dispatch from the cockpit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No command execution from the cockpit",
  "Backend-owned domain pack runner remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Domain Pack Runner Preview is preview-only from the frontend.",
  "Domain Pack Runner Preview does not execute domain packs from the UI.",
  "Domain Pack Runner Preview does not dispatch workers from the UI.",
  "Domain Pack Runner Preview does not call models from the UI.",
  "Domain Pack Runner Preview does not call local models from the UI.",
  "Domain Pack Runner Preview does not call providers from the UI.",
  "Domain Pack Runner Preview does not call connectors from the UI.",
  "Domain Pack Runner Preview does not send prompts from the UI.",
  "Domain Pack Runner Preview does not run commands from the UI.",
  "Domain Pack Runner Preview does not write generated artifacts from the UI.",
  "Domain Pack Runner Preview prepares a future backend-owned domain pack runner path.",
  "Explicit operator approval remains required.",
] as const;

const SUPPORTED_DOMAIN_PACKS: readonly SupportedDomainPack[] = [
  {
    id: "game-server-builder",
    label: "Game Server Builder",
    status: "available-preview",
    summary: "Available preview for safe game server workflow planning.",
    sampleGoal:
      "Build me a Minecraft Game of Thrones server for friends with factions, economy, quests, regions, and roleplay rules.",
    safetyPosture: "Preview-only. No server starts, installs, downloads, commands, ports, workers, models, or file writes from the UI.",
  },
  {
    id: "trading-research",
    label: "Trading Research",
    status: "upcoming-preview",
    summary: "Upcoming preview for research-only strategy planning.",
    sampleGoal:
      "Research an automated trading strategy with capital limits, profit lockbox rules, reinvestment rules, paper trading, and risk guard.",
    safetyPosture: "Preview-only. No broker calls, live trading, model calls, backtests, paper trades, commands, or provider calls from the UI.",
  },
  {
    id: "web-app-builder",
    label: "Web App Builder",
    status: "upcoming-preview",
    summary: "Upcoming preview for application planning and artifact review.",
    sampleGoal: "Plan a small web app with screens, data model, tests, deployment notes, and rollback strategy.",
    safetyPosture: "Preview-only. No scaffolding, package installs, commands, deployments, or generated file writes from the UI.",
  },
  {
    id: "docs-pack",
    label: "Docs Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for documentation packs and review handoff.",
    sampleGoal: "Draft a documentation pack plan with outline, style rules, changelog, review checklist, and publishing guard.",
    safetyPosture: "Preview-only. No document writes, publishing, connector calls, prompts, or storage writes from the UI.",
  },
  {
    id: "data-analysis-pack",
    label: "Data Analysis Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for analysis plans, reports, and evidence needs.",
    sampleGoal: "Plan an analysis report with datasets, assumptions, charts, validation checks, and result acceptance criteria.",
    safetyPosture: "Preview-only. No dataset downloads, notebook execution, commands, provider calls, or report writes from the UI.",
  },
  {
    id: "creative-campaign-pack",
    label: "Creative Campaign Pack",
    status: "upcoming-preview",
    summary: "Upcoming preview for campaign planning and asset review.",
    sampleGoal: "Plan a creative campaign with audience, assets, channels, approvals, evidence, and recovery notes.",
    safetyPosture: "Preview-only. No asset generation, provider calls, connector posts, downloads, or campaign publishing from the UI.",
  },
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic review content only.",
  "Future execution remains backend-owned, approval-gated, and outside the frontend.",
  "Operator review must confirm scope, risk, evidence, result, audit, and recovery before execution can be considered.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No domain pack execution from the UI.",
  "No worker dispatch from the UI.",
  "No model calls, local model calls, provider calls, connector calls, or prompt sending from the UI.",
  "No command execution, direct file mutation, generated artifact writes, queue creation, transaction creation, or audit persistence from the UI.",
  "No runtime starts, server starts, installs, downloads, port binding, deployment, rollback, retry, restore, or recovery execution from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned domain pack runner remains required.",
  "Explicit operator approval remains required.",
  "Denied domain runner boundaries stay visible before any future execution path.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly DomainPackRunnerItem[] {
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

function createSection(section: DomainPackRunnerSection): DomainPackRunnerSection {
  return section;
}

const GOAL_INTAKE = createSection({
  sectionId: "goalIntake",
  label: "Goal Intake",
  title: "goalIntake",
  humanReadableSummary:
    "Goal Intake keeps the user goal visible and shapes domain hints, done criteria, risk level, artifacts, commands, evidence, and recovery needs without sending prompts or creating jobs from the UI.",
  plannedInputs: [
    "Sample Game Server Builder goal",
    "Upcoming Trading Research sample goal",
    "Domain hints and done criteria",
    "Risk level and approval expectation",
  ],
  plannedOutputs: ["Review-only goal packet", "Domain hints", "Done criteria", "Evidence and recovery needs"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "goal-intake",
    "Domain goal intake runner preview captures user goal domain hints done criteria risk level artifacts commands evidence and recovery needs.",
    "Domain goal intake runner preview does not send prompts or create jobs from the UI.",
    "Domain goal intake runner preview requires explicit operator approval."
  ),
  state: "preview-only",
});

const DOMAIN_CLASSIFIER = createSection({
  sectionId: "domainClassifier",
  label: "Domain Classifier",
  title: "domainClassifier",
  humanReadableSummary:
    "Domain Classifier previews how a future backend-owned classifier would map the goal to game server, trading research, web app, docs, data, creative, or manual review routes.",
  plannedInputs: ["Goal packet", "Domain hints", "Risk notes", "Supported domain pack catalog"],
  plannedOutputs: ["Preview domain route", "Task type", "Manual review trigger", "Denied classifier paths"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "domain-classifier",
    "Domain classifier runner preview classifies goal into game server trading research web app docs data creative or manual review domain routes.",
    "Domain classifier runner preview does not call models or route workers from the UI.",
    "Domain classifier runner preview requires explicit operator approval."
  ),
  state: "review-only",
});

const SPECIALIST_WORKER_ROUTE = createSection({
  sectionId: "specialistWorkerRoute",
  label: "Worker Route",
  title: "specialistWorkerRoute",
  humanReadableSummary:
    "Worker Route previews specialist worker fit for the selected domain pack while keeping all workers undispatched and all worker decisions unpersisted from the frontend.",
  plannedInputs: ["Selected domain pack", "Task type", "Capability fit", "Risk level"],
  plannedOutputs: ["Specialist worker route preview", "Denied worker route list", "Evidence and result handoff expectations"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "specialist-worker-route",
    "Domain worker route preview shows specialist worker model route provider approval local model bridge evidence result audit and denied worker routes.",
    "Domain worker route preview does not dispatch workers.",
    "Domain worker route preview requires explicit operator approval."
  ),
  state: "blocked",
});

const MODEL_ROUTER_ROUTE = createSection({
  sectionId: "modelRouterRoute",
  label: "Model Route",
  title: "modelRouterRoute",
  humanReadableSummary:
    "Model Route previews a future model-routing reference only; it does not call live models, local models, or hidden model routes from the UI.",
  plannedInputs: ["Task type", "Privacy class", "Capability requirement", "Cost and latency posture"],
  plannedOutputs: ["Review-only model route note", "Denied model call boundary", "Approval dependency"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "model-router-route",
    "Model route is previewed but not called from the UI.",
    "No live model calls, local model calls, hidden model routing, prompt sending, or result persistence from the UI.",
    "Explicit operator approval and backend ownership remain required."
  ),
  state: "blocked",
});

const PROVIDER_APPROVAL_ROUTE = createSection({
  sectionId: "providerApprovalRoute",
  label: "Provider Approval Route",
  title: "providerApprovalRoute",
  humanReadableSummary:
    "Provider Approval Route previews provider and connector approval gates without contacting providers, connectors, brokers, APIs, or external services from the UI.",
  plannedInputs: ["Provider route reference", "Connector boundary", "Prompt and data boundary", "Risk level"],
  plannedOutputs: ["Provider approval route preview", "Denied provider and connector paths", "Replay protection expectation"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "provider-approval-route",
    "Provider and connector routes are previewed but not called from the UI.",
    "No provider calls, connector calls, prompt sending, credential storage, secret reads, or API key reads from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "blocked",
});

const LOCAL_MODEL_BRIDGE_ROUTE = createSection({
  sectionId: "localModelBridgeRoute",
  label: "Local Model Bridge Route",
  title: "localModelBridgeRoute",
  humanReadableSummary:
    "Local Model Bridge Route previews local route handoff language without probing localhost, reading endpoints, starting local models, or sending local prompts from the UI.",
  plannedInputs: ["Local privacy posture", "Capability requirement", "Redaction note", "Timeout and cancel expectation"],
  plannedOutputs: ["Local bridge route preview", "Denied local model path", "Backend-owned handoff dependency"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "local-model-bridge-route",
    "Local model bridge route is previewed but not called from the UI.",
    "No localhost probes, local model calls, runtime starts, endpoint reads, or prompt sending from the UI.",
    "Explicit operator approval and backend-owned local bridge execution remain required."
  ),
  state: "blocked",
});

const DOMAIN_PLAN = createSection({
  sectionId: "domainPlan",
  label: "Plan",
  title: "domainPlan",
  humanReadableSummary:
    "Plan previews goal interpretation, domain steps, artifact families, command families, approval gates, evidence, result, audit, recovery, and hold-before-execution state.",
  plannedInputs: ["Goal intake", "Domain classifier result", "Worker route preview", "Approval posture"],
  plannedOutputs: ["Generated plan preview", "Domain steps", "Hold Before Execution", "Manual review handoff"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "domain-plan",
    "Domain plan preview shows goal interpretation domain steps artifacts command families approval gates evidence result audit recovery and hold-before-execution state.",
    "Domain plan preview does not execute plans.",
    "Domain plan preview requires explicit operator approval."
  ),
  state: "review-only",
});

const ARTIFACT_PLAN = createSection({
  sectionId: "artifactPlan",
  label: "Artifacts",
  title: "artifactPlan",
  humanReadableSummary:
    "Artifacts previews planned configs, docs, scripts, specs, assets, reports, journals, and generated artifacts as review-only items that the UI does not write.",
  plannedInputs: ["Domain plan", "Artifact families", "File scope", "Review criteria"],
  plannedOutputs: ["Config plan", "Docs plan", "Scripts plan", "Reports and journals plan"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "artifact-plan",
    "Domain artifact plan preview shows planned configs docs scripts specs assets reports journals and generated artifacts as review-only items.",
    "Domain artifact plan preview does not write files from the UI.",
    "Domain artifact plan preview requires explicit operator approval."
  ),
  state: "blocked",
});

const COMMAND_PLAN = createSection({
  sectionId: "commandPlan",
  label: "Commands",
  title: "commandPlan",
  humanReadableSummary:
    "Commands previews future backend-owned validation, build, smoke, lint, config check, server dry-run, backtest, paper-trade, and safety command candidates without running them.",
  plannedInputs: ["Domain plan", "Artifact plan", "Safety posture", "Approval route"],
  plannedOutputs: ["Command family preview", "Denied command paths", "Backend-owned execution handoff"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "command-plan",
    "Domain command plan preview shows future backend-owned validation build smoke lint config check server dry-run backtest paper-trade and safety command candidates.",
    "Domain command plan preview does not run commands from the UI.",
    "Domain command plan preview requires explicit operator approval."
  ),
  state: "blocked",
});

const APPROVAL_GATE_PLAN = createSection({
  sectionId: "approvalGatePlan",
  label: "Approvals",
  title: "approvalGatePlan",
  humanReadableSummary:
    "Approvals previews scope, worker route, model route, provider route, command route, artifact scope, risk level, expiry, replay protection, and operator confirmation.",
  plannedInputs: ["Domain scope", "Worker route", "Model and provider route previews", "Artifact and command scope"],
  plannedOutputs: ["Approval gate preview", "Operator confirmation plan", "Expiry and replay protection"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "approval-gate-plan",
    "Domain approval gate preview shows domain pack scope worker route model route provider route command route artifact scope risk level expiry replay protection and operator confirmation.",
    "Domain approval gate preview does not persist approvals from the UI.",
    "Domain approval gate preview requires explicit human approval."
  ),
  state: "needs-approval",
});

const EVIDENCE_RESULT_PLAN = createSection({
  sectionId: "evidenceResultPlan",
  label: "Evidence and Results",
  title: "evidenceResultPlan",
  humanReadableSummary:
    "Evidence and Results previews command outputs, validation results, worker outputs, domain artifacts, redaction, result states, and operator acceptance as backend-owned capture requirements.",
  plannedInputs: ["Approval gate plan", "Command plan", "Artifact plan", "Result acceptance criteria"],
  plannedOutputs: ["Evidence capture plan", "Result state plan", "Operator acceptance checklist", "Redaction note"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "evidence-result-plan",
    "Domain evidence result preview shows planned evidence command outputs validation results worker outputs domain artifacts redaction result states and operator acceptance.",
    "Domain evidence result preview does not persist evidence or results from the UI.",
    "Domain evidence result preview requires backend-owned capture."
  ),
  state: "backend-owned",
});

const AUDIT_TRAIL_PLAN = createSection({
  sectionId: "auditTrailPlan",
  label: "Audit",
  title: "auditTrailPlan",
  humanReadableSummary:
    "Audit previews goal, domain classifier, worker route, plan, artifacts, commands, approvals, evidence, results, recovery, denied paths, and operator timeline.",
  plannedInputs: ["Goal", "Classifier", "Routes", "Plan", "Approval", "Evidence and result states"],
  plannedOutputs: ["Audit trail plan", "Operator timeline", "Denied path record", "Backend capture dependency"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "audit-trail-plan",
    "Domain audit trail preview shows goal domain classifier worker route plan artifacts commands approvals evidence results recovery denied paths and operator timeline.",
    "Domain audit trail preview does not persist audit from the UI.",
    "Domain audit trail preview requires backend-owned audit capture."
  ),
  state: "backend-owned",
});

const RECOVERY_ROUTE = createSection({
  sectionId: "recoveryRoute",
  label: "Recovery",
  title: "recoveryRoute",
  humanReadableSummary:
    "Recovery previews rollback artifacts, restore snapshots, stop runtime, retry validation, explain failure, manual review, safety stop, partial recovery, and audit continuity without executing recovery.",
  plannedInputs: ["Result state", "Failure class", "Artifact scope", "Audit continuity"],
  plannedOutputs: ["Recovery route preview", "Rollback and restore plan", "Safety stop plan", "Manual review path"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "recovery-route",
    "Domain recovery route preview shows rollback artifacts restore snapshots stop runtime retry validation explain failure manual review safety stop partial recovery and audit continuity.",
    "Domain recovery route preview does not execute rollback retry restore stop or recovery from the UI.",
    "Domain recovery route preview requires explicit operator approval."
  ),
  state: "blocked",
});

const DENIED_DOMAIN_RUNNER_BOUNDARIES = createSection({
  sectionId: "deniedDomainRunnerBoundaries",
  label: "Denied Domain Runner Boundaries",
  title: "deniedDomainRunnerBoundaries",
  humanReadableSummary:
    "Denied Domain Runner Boundaries keep blocked paths visible: no execution, no workers, no models, no providers, no connectors, no prompts, no commands, no file writes, no persistence, no runtime starts, and no hidden approvals from the frontend.",
  plannedInputs: ["Forbidden path list", "Frontend boundary", "Backend-owned dependency"],
  plannedOutputs: ["Denied path matrix", "Operator warning copy", "Hold Before Execution"],
  reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
  deniedActions: COMMON_DENIED_ACTIONS,
  safetyNotes: COMMON_SAFETY_NOTES,
  checklist: checklist(
    "denied-domain-runner-boundaries",
    "Denied domain pack runner paths remain blocked.",
    "The frontend cannot execute, dispatch, call, write, persist, start, install, deploy, rollback, retry, or recover domain pack work.",
    "Explicit operator approval remains required before any backend-owned domain execution path."
  ),
  state: "denied",
});

const FRONT_USER_FACING_SHELL: DomainPackRunnerFrontUserFacingShell = {
  shellId: "front-user-facing-runner-shell-preview",
  title: "Front User-Facing Runner Shell",
  sampleGoal:
    "Build me a Minecraft Game of Thrones server for friends with factions, economy, quests, regions, and roleplay rules.",
  upcomingTradingSampleGoal:
    "Research an automated trading strategy with capital limits, profit lockbox rules, reinvestment rules, paper trading, and risk guard.",
  steps: [
    {
      id: "start-with-a-goal",
      label: "Start with a goal",
      detail: "The user begins with a goal, then reviews how CodexForge shapes it into a domain workflow.",
      state: "review-only",
    },
    {
      id: "pick-a-domain-pack",
      label: "Pick a domain pack",
      detail: "Game Server Builder is available preview; Trading Research, Web App Builder, Docs Pack, Data Analysis Pack, and Creative Campaign Pack are upcoming preview.",
      state: "preview-only",
    },
    {
      id: "review-generated-plan",
      label: "Review generated plan",
      detail: "The generated plan remains static review content and cannot execute from the frontend.",
      state: "blocked",
    },
    {
      id: "review-worker-route",
      label: "Review worker route",
      detail: "Specialist workers are previewed but not dispatched.",
      state: "blocked",
    },
    {
      id: "review-approval-gates",
      label: "Review approval gates",
      detail: "Operator approval remains explicit, human, and backend-owned before any future execution.",
      state: "needs-approval",
    },
    {
      id: "review-artifacts-and-commands",
      label: "Review artifacts and commands",
      detail: "Artifacts and commands are plans only; the UI writes nothing and runs nothing.",
      state: "blocked",
    },
    {
      id: "review-evidence-and-recovery",
      label: "Review evidence and recovery",
      detail: "Evidence, results, audit, rollback, retry, restore, and recovery remain backend-owned preview requirements.",
      state: "backend-owned",
    },
    {
      id: "hold-before-execution",
      label: "Hold before execution",
      detail: "The flow stops before execution and keeps the backend-owned domain pack runner as a required future layer.",
      state: "needs-approval",
    },
  ],
  reviewOnlyCopy: [
    "Front User-Facing Runner Shell is a product-facing preview for normal users.",
    "Front User-Facing Runner Shell does not execute domain packs from the UI.",
    "Artifacts, commands, worker routes, model routes, provider routes, evidence, results, audit, and recovery are review-only.",
    "Hold Before Execution remains the final visible state until backend-owned execution and explicit operator approval exist.",
  ],
};

const COCKPIT_SUMMARY: readonly DomainPackRunnerItem[] = [
  {
    id: "choose-domain",
    label: "Choose Domain",
    detail: "The user chooses a domain pack from Game Server Builder, Trading Research, Web App Builder, Docs Pack, Data Analysis Pack, or Creative Campaign Pack.",
    state: "preview-only",
  },
  {
    id: "goal-intake",
    label: "Goal Intake",
    detail: "The goal is shaped into a domain workflow with domain hints, done criteria, risk, artifacts, commands, evidence, and recovery needs.",
    state: "review-only",
  },
  {
    id: "domain-classifier",
    label: "Domain Classifier",
    detail: "The domain classifier chooses the pack and task type as a deterministic preview, without model calls or worker routing from the UI.",
    state: "blocked",
  },
  {
    id: "worker-route",
    label: "Worker Route",
    detail: "Specialist workers are previewed but not dispatched.",
    state: "blocked",
  },
  {
    id: "model-provider-local-routes",
    label: "Model Provider Local Routes",
    detail: "Model, provider, connector, and local routes are previewed but not called.",
    state: "blocked",
  },
  {
    id: "plan-artifacts-commands",
    label: "Plan Artifacts Commands",
    detail: "Artifacts and commands are shown as plans only and cannot write files or run commands from the cockpit.",
    state: "blocked",
  },
  {
    id: "approval-evidence-result-audit-recovery",
    label: "Approvals Evidence Results Audit Recovery",
    detail: "Approval, evidence, result, audit, and recovery are shown before execution, with Hold Before Execution as the current endpoint.",
    state: "needs-approval",
  },
  {
    id: "cockpit-product-shell",
    label: "Front User-Facing Runner Shell",
    detail: "The cockpit is becoming the user-facing product shell while execution remains backend-owned and approval-gated.",
    state: "preview-only",
  },
];

export const DOMAIN_PACK_RUNNER_MODEL: DomainPackRunnerModel = {
  domainPackRunnerId: "codexforge-domain-pack-runner-preview-1610-1625",
  domainPackRunnerKind: "domain-pack-runner-preview",
  selectedDomainPack: SUPPORTED_DOMAIN_PACKS[0],
  supportedDomainPacks: SUPPORTED_DOMAIN_PACKS,
  goalIntake: GOAL_INTAKE,
  domainClassifier: DOMAIN_CLASSIFIER,
  specialistWorkerRoute: SPECIALIST_WORKER_ROUTE,
  modelRouterRoute: MODEL_ROUTER_ROUTE,
  providerApprovalRoute: PROVIDER_APPROVAL_ROUTE,
  localModelBridgeRoute: LOCAL_MODEL_BRIDGE_ROUTE,
  domainPlan: DOMAIN_PLAN,
  artifactPlan: ARTIFACT_PLAN,
  commandPlan: COMMAND_PLAN,
  approvalGatePlan: APPROVAL_GATE_PLAN,
  evidenceResultPlan: EVIDENCE_RESULT_PLAN,
  auditTrailPlan: AUDIT_TRAIL_PLAN,
  recoveryRoute: RECOVERY_ROUTE,
  deniedDomainRunnerBoundaries: DENIED_DOMAIN_RUNNER_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  frontUserFacingShell: FRONT_USER_FACING_SHELL,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, DomainPackRunnerSection> = {
  goalIntake: GOAL_INTAKE,
  domainClassifier: DOMAIN_CLASSIFIER,
  specialistWorkerRoute: SPECIALIST_WORKER_ROUTE,
  modelRouterRoute: MODEL_ROUTER_ROUTE,
  providerApprovalRoute: PROVIDER_APPROVAL_ROUTE,
  localModelBridgeRoute: LOCAL_MODEL_BRIDGE_ROUTE,
  domainPlan: DOMAIN_PLAN,
  artifactPlan: ARTIFACT_PLAN,
  commandPlan: COMMAND_PLAN,
  approvalGatePlan: APPROVAL_GATE_PLAN,
  evidenceResultPlan: EVIDENCE_RESULT_PLAN,
  auditTrailPlan: AUDIT_TRAIL_PLAN,
  recoveryRoute: RECOVERY_ROUTE,
  deniedDomainRunnerBoundaries: DENIED_DOMAIN_RUNNER_BOUNDARIES,
};

const ALL_SECTION_IDS = [
  "goalIntake",
  "domainClassifier",
  "specialistWorkerRoute",
  "modelRouterRoute",
  "providerApprovalRoute",
  "localModelBridgeRoute",
  "domainPlan",
  "artifactPlan",
  "commandPlan",
  "approvalGatePlan",
  "evidenceResultPlan",
  "auditTrailPlan",
  "recoveryRoute",
  "deniedDomainRunnerBoundaries",
] as const;

const ROUTES: readonly DomainPackRunnerRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Domain Pack Runner",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit-centered Domain Pack Runner preview for choosing a domain, shaping a goal, previewing routes, and holding before execution.",
    markerPhrases: DOMAIN_PACK_RUNNER_COCKPIT_MARKERS,
    sectionIds: ALL_SECTION_IDS,
    devOnly: false,
  },
  {
    slug: "domain-pack-runner-boundary",
    href: "/domain-pack-runner-boundary",
    phase: "Phase 1610",
    title: "Domain Pack Runner Boundary",
    commandLabel: "Go to Domain Pack Runner Boundary",
    summary: "Defines the preview-only domain pack runner boundary before backend-owned domain workflow execution exists.",
    markerPhrases: [
      "Domain pack runner boundary",
      "Domain pack runner boundary does not execute domain packs from the UI",
      "Domain pack runner requires explicit operator approval before domain execution",
      "Domain pack runner prepares backend-owned domain workflows without frontend execution",
      "Denied domain pack runner paths remain blocked",
      "Domain pack runner checklist",
    ],
    sectionIds: ["deniedDomainRunnerBoundaries", "approvalGatePlan", "domainPlan"],
    devOnly: true,
  },
  {
    slug: "domain-pack-catalog-preview",
    href: "/domain-pack-catalog-preview",
    phase: "Phase 1611",
    title: "Domain Pack Catalog Preview",
    commandLabel: "Go to Domain Pack Catalog Preview",
    summary: "Previews the supported domain pack catalog without installing or running packs.",
    markerPhrases: [
      "Domain pack catalog preview",
      "Domain pack catalog preview does not install or run domain packs",
      "Domain pack catalog preview requires explicit operator approval",
      "Domain pack catalog preview shows Game Server Builder Trading Research Web App Builder Docs Pack Data Analysis Pack and Creative Campaign Pack",
      "Denied domain pack catalog paths remain blocked",
      "Domain pack catalog checklist",
    ],
    sectionIds: ["goalIntake", "domainClassifier", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-goal-intake-runner-preview",
    href: "/domain-goal-intake-runner-preview",
    phase: "Phase 1612",
    title: "Domain Goal Intake Runner Preview",
    commandLabel: "Go to Domain Goal Intake Runner Preview",
    summary: "Previews domain goal intake without sending prompts, creating jobs, or persisting work from the UI.",
    markerPhrases: [
      "Domain goal intake runner preview",
      "Domain goal intake runner preview does not send prompts or create jobs from the UI",
      "Domain goal intake runner preview requires explicit operator approval",
      "Domain goal intake runner preview captures user goal domain hints done criteria risk level artifacts commands evidence and recovery needs",
      "Denied domain goal intake paths remain blocked",
      "Domain goal intake runner checklist",
    ],
    sectionIds: ["goalIntake", "domainClassifier", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-classifier-runner-preview",
    href: "/domain-classifier-runner-preview",
    phase: "Phase 1613",
    title: "Domain Classifier Runner Preview",
    commandLabel: "Go to Domain Classifier Runner Preview",
    summary: "Previews deterministic domain classification without model calls or UI worker routing.",
    markerPhrases: [
      "Domain classifier runner preview",
      "Domain classifier runner preview does not call models or route workers from the UI",
      "Domain classifier runner preview requires explicit operator approval",
      "Domain classifier runner preview classifies goal into game server trading research web app docs data creative or manual review domain routes",
      "Denied domain classifier paths remain blocked",
      "Domain classifier runner checklist",
    ],
    sectionIds: ["domainClassifier", "goalIntake", "specialistWorkerRoute", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-worker-route-preview",
    href: "/domain-worker-route-preview",
    phase: "Phase 1614",
    title: "Domain Worker Route Preview",
    commandLabel: "Go to Domain Worker Route Preview",
    summary: "Previews specialist worker routing without dispatching workers or persisting route decisions.",
    markerPhrases: [
      "Domain worker route preview",
      "Domain worker route preview does not dispatch workers",
      "Domain worker route preview requires explicit operator approval",
      "Domain worker route preview shows specialist worker model route provider approval local model bridge evidence result audit and denied worker routes",
      "Denied domain worker route paths remain blocked",
      "Domain worker route checklist",
    ],
    sectionIds: [
      "specialistWorkerRoute",
      "modelRouterRoute",
      "providerApprovalRoute",
      "localModelBridgeRoute",
      "evidenceResultPlan",
      "auditTrailPlan",
      "deniedDomainRunnerBoundaries",
    ],
    devOnly: true,
  },
  {
    slug: "domain-plan-preview",
    href: "/domain-plan-preview",
    phase: "Phase 1615",
    title: "Domain Plan Preview",
    commandLabel: "Go to Domain Plan Preview",
    summary: "Previews the domain plan without executing any plan or widening frontend authority.",
    markerPhrases: [
      "Domain plan preview",
      "Domain plan preview does not execute plans",
      "Domain plan preview requires explicit operator approval",
      "Domain plan preview shows goal interpretation domain steps artifacts command families approval gates evidence result audit recovery and hold-before-execution state",
      "Denied domain plan paths remain blocked",
      "Domain plan checklist",
    ],
    sectionIds: ["domainPlan", "artifactPlan", "commandPlan", "approvalGatePlan", "evidenceResultPlan", "auditTrailPlan", "recoveryRoute"],
    devOnly: true,
  },
  {
    slug: "domain-artifact-plan-preview",
    href: "/domain-artifact-plan-preview",
    phase: "Phase 1616",
    title: "Domain Artifact Plan Preview",
    commandLabel: "Go to Domain Artifact Plan Preview",
    summary: "Previews artifact families without writing files or generated artifacts from the UI.",
    markerPhrases: [
      "Domain artifact plan preview",
      "Domain artifact plan preview does not write files from the UI",
      "Domain artifact plan preview requires explicit operator approval",
      "Domain artifact plan preview shows planned configs docs scripts specs assets reports journals and generated artifacts as review-only items",
      "Denied domain artifact paths remain blocked",
      "Domain artifact plan checklist",
    ],
    sectionIds: ["artifactPlan", "approvalGatePlan", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-command-plan-preview",
    href: "/domain-command-plan-preview",
    phase: "Phase 1617",
    title: "Domain Command Plan Preview",
    commandLabel: "Go to Domain Command Plan Preview",
    summary: "Previews command families without running commands from the UI.",
    markerPhrases: [
      "Domain command plan preview",
      "Domain command plan preview does not run commands from the UI",
      "Domain command plan preview requires explicit operator approval",
      "Domain command plan preview shows future backend-owned validation build smoke lint config check server dry-run backtest paper-trade and safety command candidates",
      "Denied domain command paths remain blocked",
      "Domain command plan checklist",
    ],
    sectionIds: ["commandPlan", "approvalGatePlan", "evidenceResultPlan", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-approval-gate-preview",
    href: "/domain-approval-gate-preview",
    phase: "Phase 1618",
    title: "Domain Approval Gate Preview",
    commandLabel: "Go to Domain Approval Gate Preview",
    summary: "Previews approval gates without persisting approvals from the UI.",
    markerPhrases: [
      "Domain approval gate preview",
      "Domain approval gate preview does not persist approvals from the UI",
      "Domain approval gate preview requires explicit human approval",
      "Domain approval gate preview shows domain pack scope worker route model route provider route command route artifact scope risk level expiry replay protection and operator confirmation",
      "Denied domain approval gate paths remain blocked",
      "Domain approval gate checklist",
    ],
    sectionIds: ["approvalGatePlan", "specialistWorkerRoute", "modelRouterRoute", "providerApprovalRoute", "commandPlan", "artifactPlan"],
    devOnly: true,
  },
  {
    slug: "domain-evidence-result-preview",
    href: "/domain-evidence-result-preview",
    phase: "Phase 1619",
    title: "Domain Evidence Result Preview",
    commandLabel: "Go to Domain Evidence Result Preview",
    summary: "Previews evidence and results as backend-owned capture requirements.",
    markerPhrases: [
      "Domain evidence result preview",
      "Domain evidence result preview does not persist evidence or results from the UI",
      "Domain evidence result preview requires backend-owned capture",
      "Domain evidence result preview shows planned evidence command outputs validation results worker outputs domain artifacts redaction result states and operator acceptance",
      "Denied domain evidence result paths remain blocked",
      "Domain evidence result checklist",
    ],
    sectionIds: ["evidenceResultPlan", "commandPlan", "artifactPlan", "auditTrailPlan", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-audit-trail-preview",
    href: "/domain-audit-trail-preview",
    phase: "Phase 1620",
    title: "Domain Audit Trail Preview",
    commandLabel: "Go to Domain Audit Trail Preview",
    summary: "Previews audit trail capture as a backend-owned requirement.",
    markerPhrases: [
      "Domain audit trail preview",
      "Domain audit trail preview does not persist audit from the UI",
      "Domain audit trail preview requires backend-owned audit capture",
      "Domain audit trail preview shows goal domain classifier worker route plan artifacts commands approvals evidence results recovery denied paths and operator timeline",
      "Denied domain audit trail paths remain blocked",
      "Domain audit trail checklist",
    ],
    sectionIds: ["auditTrailPlan", "goalIntake", "domainClassifier", "specialistWorkerRoute", "domainPlan", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "domain-recovery-route-preview",
    href: "/domain-recovery-route-preview",
    phase: "Phase 1621",
    title: "Domain Recovery Route Preview",
    commandLabel: "Go to Domain Recovery Route Preview",
    summary: "Previews recovery routing without rollback, retry, restore, stop, or recovery execution from the UI.",
    markerPhrases: [
      "Domain recovery route preview",
      "Domain recovery route preview does not execute rollback retry restore stop or recovery from the UI",
      "Domain recovery route preview requires explicit operator approval",
      "Domain recovery route preview shows rollback artifacts restore snapshots stop runtime retry validation explain failure manual review safety stop partial recovery and audit continuity",
      "Denied domain recovery route paths remain blocked",
      "Domain recovery route checklist",
    ],
    sectionIds: ["recoveryRoute", "evidenceResultPlan", "auditTrailPlan", "deniedDomainRunnerBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-domain-runner-summary",
    href: "/cockpit-domain-runner-summary",
    phase: "Phase 1622",
    title: "Cockpit Domain Runner Summary",
    commandLabel: "Go to Cockpit Domain Runner Summary",
    summary: "Shows the cockpit-centered Domain Pack Runner summary while keeping the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit domain runner summary",
      "Cockpit domain runner summary keeps the cockpit as the normal user surface",
      "Cockpit domain runner summary does not execute domain packs dispatch workers call models call providers call connectors run commands write files or start runtimes from the cockpit",
      "Cockpit domain runner summary shows choose domain goal intake classifier worker route plan artifacts commands approvals evidence results audit recovery and hold-before-execution",
      "Phase pages remain dev test diagnostics only",
      "Cockpit domain runner checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "front-user-facing-runner-shell",
    href: "/front-user-facing-runner-shell",
    phase: "Phase 1623",
    title: "Front User-Facing Runner Shell",
    commandLabel: "Go to Front User-Facing Runner Shell",
    summary: "Previews a product-facing normal-user shell for starting with a goal, choosing a domain, reviewing the plan, and holding before execution.",
    markerPhrases: [
      "Front user-facing runner shell",
      "Front user-facing runner shell is a product-facing preview for normal users",
      "Front user-facing runner shell does not execute domain packs from the UI",
      "Front user-facing runner shell shows Start with a goal Pick a domain pack Review generated plan Review worker route Review approval gates Review artifacts and commands Review evidence and recovery Hold before execution",
      "Denied front user-facing runner paths remain blocked",
      "Front user-facing runner shell checklist",
    ],
    sectionIds: ["goalIntake", "domainClassifier", "domainPlan", "specialistWorkerRoute", "approvalGatePlan", "artifactPlan", "commandPlan", "evidenceResultPlan", "recoveryRoute"],
    devOnly: true,
  },
  {
    slug: "first-domain-pack-runner-candidate",
    href: "/first-domain-pack-runner-candidate",
    phase: "Phase 1624",
    title: "First Domain Pack Runner Candidate",
    commandLabel: "Go to First Domain Pack Runner Candidate",
    summary: "Combines the first domain pack runner candidate across catalog, intake, classifier, routes, plans, approvals, evidence, audit, recovery, front shell, and hold state.",
    markerPhrases: [
      "First domain pack runner candidate",
      "First domain pack runner candidate does not execute domain packs from the UI",
      "First domain pack runner candidate requires explicit operator approval",
      "Candidate combines catalog goal intake classifier worker route plan artifacts commands approvals evidence results audit recovery front shell and hold-before-execution",
      "Denied first domain pack runner paths remain blocked",
      "First domain pack runner checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-domain-pack-runner-release-candidate",
    href: "/controlled-domain-pack-runner-release-candidate",
    phase: "Phase 1625",
    title: "Controlled Domain Pack Runner Release Candidate",
    commandLabel: "Go to Controlled Domain Pack Runner Release Candidate",
    summary:
      "Controlled domain pack runner release candidate prepares CodexForge for backend-owned domain pack workflows without frontend domain execution.",
    markerPhrases: [
      "Controlled domain pack runner release candidate",
      "Controlled domain pack runner release candidate does not execute domain packs dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled domain pack runner release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned domain pack workflows without frontend domain execution",
      "Denied controlled domain pack runner paths remain blocked",
      "Controlled domain pack runner release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listDomainPackRunnerRouteDefinitions(): readonly DomainPackRunnerRouteDefinition[] {
  return ROUTES;
}

export function getDomainPackRunnerRouteDefinition(slug: DomainPackRunnerRouteSlug): DomainPackRunnerRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildDomainPackRunnerRouteModel(
  slug: DomainPackRunnerRouteSlug = "codexforge-cockpit"
): DomainPackRunnerRouteModel {
  const route = getDomainPackRunnerRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is DomainPackRunnerSection => Boolean(section));

  return {
    route,
    domainPackRunner: DOMAIN_PACK_RUNNER_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: DOMAIN_PACK_RUNNER_COCKPIT_MARKERS,
    summary: summarizeDomainPackRunnerRoute(route, sections),
  };
}

export function buildDomainPackRunnerModel(): DomainPackRunnerRouteModel {
  return buildDomainPackRunnerRouteModel("codexforge-cockpit");
}

export function summarizeDomainPackRunnerRoute(
  route: DomainPackRunnerRouteDefinition,
  sections: readonly DomainPackRunnerSection[]
): string {
  return `${route.title} keeps ${sections.length} domain pack runner sections static, deterministic, preview-only, review-only, approval-required, backend-owned, and blocked from frontend domain execution, worker dispatch, model calls, provider calls, connector calls, prompt sending, command execution, file mutation, persistence, runtime starts, and recovery execution.`;
}

export function buildDomainPackRunnerStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
