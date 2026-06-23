export type SpecialistWorkerRegistryRouteSlug =
  | "codexforge-cockpit"
  | "specialist-worker-registry-boundary"
  | "coding-worker-profile-preview"
  | "research-worker-profile-preview"
  | "game-server-worker-profile-preview"
  | "web-app-worker-profile-preview"
  | "docs-worker-profile-preview"
  | "data-worker-profile-preview"
  | "creative-worker-profile-preview"
  | "video-worker-profile-preview"
  | "trading-analysis-worker-profile-preview"
  | "qa-validation-worker-profile-preview"
  | "audit-worker-profile-preview"
  | "recovery-worker-profile-preview"
  | "worker-routing-fit-preview"
  | "cockpit-specialist-worker-summary"
  | "first-specialist-worker-registry-candidate"
  | "controlled-specialist-worker-registry-release-candidate";

export type SpecialistWorkerRegistryKind =
  | "specialist-worker-registry-preview"
  | "specialist-worker-registry-boundary"
  | "worker-profile-preview"
  | "worker-routing-fit-preview"
  | "first-specialist-worker-registry-candidate"
  | "controlled-specialist-worker-registry-release-candidate";

export type SpecialistWorkerRegistryState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "candidate"
  | "release-candidate";

export type SpecialistWorkerRegistryItem = {
  id: string;
  label: string;
  detail: string;
  state: SpecialistWorkerRegistryState;
};

export type SpecialistWorkerRegistryRecord = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: SpecialistWorkerRegistryState;
  items: readonly SpecialistWorkerRegistryItem[];
};

export type SpecialistWorkerProfile = {
  workerId: string;
  workerName: string;
  workerDomain: string;
  capabilityFit: string;
  defaultModelRoute: string;
  approvalNeeds: string;
  fileScope: string;
  commandScope: string;
  evidenceNeeds: string;
  resultNeeds: string;
  auditNeeds: string;
  recoveryNeeds: string;
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
};

export type SpecialistWorkerRegistryModel = {
  specialistWorkerRegistryId: string;
  specialistWorkerRegistryKind: SpecialistWorkerRegistryKind;
  goalRef: SpecialistWorkerRegistryRecord;
  projectContextRef: SpecialistWorkerRegistryRecord;
  modelRouterRef: SpecialistWorkerRegistryRecord;
  providerApprovalRef: SpecialistWorkerRegistryRecord;
  localModelBridgeRef: SpecialistWorkerRegistryRecord;
  workerProfiles: readonly SpecialistWorkerProfile[];
  codingWorkerProfile: SpecialistWorkerProfile;
  researchWorkerProfile: SpecialistWorkerProfile;
  gameServerWorkerProfile: SpecialistWorkerProfile;
  webAppWorkerProfile: SpecialistWorkerProfile;
  docsWorkerProfile: SpecialistWorkerProfile;
  dataWorkerProfile: SpecialistWorkerProfile;
  creativeWorkerProfile: SpecialistWorkerProfile;
  videoWorkerProfile: SpecialistWorkerProfile;
  tradingAnalysisWorkerProfile: SpecialistWorkerProfile;
  qaValidationWorkerProfile: SpecialistWorkerProfile;
  auditWorkerProfile: SpecialistWorkerProfile;
  recoveryWorkerProfile: SpecialistWorkerProfile;
  workerRoutingFit: SpecialistWorkerRegistryRecord;
  deniedWorkerBoundaries: SpecialistWorkerRegistryRecord;
  cockpitSummary: readonly SpecialistWorkerRegistryItem[];
  explicitSafetyLimits: readonly string[];
};

export type SpecialistWorkerRegistryRouteDefinition = {
  slug: SpecialistWorkerRegistryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  profileIds: readonly string[];
  recordIds: readonly string[];
  devOnly: boolean;
};

export type SpecialistWorkerRegistryRouteModel = {
  route: SpecialistWorkerRegistryRouteDefinition;
  specialistWorkerRegistry: SpecialistWorkerRegistryModel;
  profiles: readonly SpecialistWorkerProfile[];
  records: readonly SpecialistWorkerRegistryRecord[];
  diagnosticRoutes: readonly SpecialistWorkerRegistryRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const SPECIALIST_WORKER_REGISTRY_COCKPIT_MARKERS = [
  "Specialist Worker Registry",
  "Coding",
  "Research",
  "Game Server",
  "Web App",
  "Docs",
  "Data",
  "Creative",
  "Video",
  "Trading Analysis",
  "QA Validation",
  "Audit",
  "Recovery",
  "Worker Routing",
  "Capability Fit",
  "Denied Workers",
  "No worker dispatch from the cockpit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "No command execution from the cockpit",
  "Backend-owned worker routing remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Specialist Worker Registry is preview-only from the frontend.",
  "It does not dispatch workers from the UI.",
  "It does not call models from the UI.",
  "It does not call local models from the UI.",
  "It does not call providers from the UI.",
  "It does not call connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not execute commands from the UI.",
  "It does not start runtimes from the UI.",
  "It does not write files from the UI.",
  "It does not persist worker decisions from the UI.",
  "It does not persist evidence/results/audit from the UI.",
  "It does not persist approvals, queues, transactions, model responses, provider approvals, or memory from the UI.",
  "It prepares a future backend-owned specialist worker routing path.",
  "Explicit operator approval remains required.",
] as const;

function createRecord(
  id: string,
  label: string,
  title: string,
  summary: string,
  state: SpecialistWorkerRegistryState,
  items: readonly SpecialistWorkerRegistryItem[]
): SpecialistWorkerRegistryRecord {
  return { id, label, title, summary, state, items };
}

function createProfile(profile: SpecialistWorkerProfile): SpecialistWorkerProfile {
  return profile;
}

const GOAL_REF = createRecord(
  "goalRef",
  "Goal",
  "goalRef",
  "Goal reference previews how a future backend-owned router would classify work before choosing a specialist worker.",
  "review-only",
  [
    {
      id: "goal-visible",
      label: "Visible goal",
      detail: "Goal domain, task type, risk, privacy, expected evidence, expected result, and denied paths stay visible before routing.",
      state: "review-only",
    },
    {
      id: "goal-no-prompt",
      label: "No prompt sending",
      detail: "The cockpit does not send the goal to any worker, model, provider, connector, or local runtime.",
      state: "blocked",
    },
    {
      id: "goal-approval",
      label: "Approval required",
      detail: "Explicit operator approval remains required before any future worker execution.",
      state: "needs-approval",
    },
  ]
);

const PROJECT_CONTEXT_REF = createRecord(
  "projectContextRef",
  "Project Context",
  "projectContextRef",
  "Project context reference previews the scoped context future workers may need without reading secrets, files, networks, connectors, or runtime state from the UI.",
  "review-only",
  [
    {
      id: "context-scope",
      label: "Scoped context",
      detail: "Future routing must bind worker scope to reviewed project context, file boundaries, privacy limits, and evidence needs.",
      state: "review-only",
    },
    {
      id: "context-no-secret",
      label: "No secret reads",
      detail: "The frontend does not read secrets, API keys, environment values, browser credentials, private files, or connector data.",
      state: "blocked",
    },
    {
      id: "context-backend-owned",
      label: "Backend-owned context",
      detail: "Any future context capture must be backend-owned, approval-gated, audited, and visible to the operator.",
      state: "backend-owned",
    },
  ]
);

const MODEL_ROUTER_REF = createRecord(
  "modelRouterRef",
  "Model Router v2",
  "modelRouterRef",
  "Model Router v2 remains the future model/tool fit reference; the registry only previews which route each worker may need later.",
  "backend-owned",
  [
    {
      id: "router-fit",
      label: "Model/tool fit",
      detail: "Capability, privacy, cost, locality, tool needs, fallback, and denial states stay visible before worker routing.",
      state: "review-only",
    },
    {
      id: "router-no-hidden",
      label: "No hidden routing",
      detail: "The cockpit does not hide worker choice, provider choice, local model choice, prompt payload, or approval state.",
      state: "blocked",
    },
    {
      id: "router-no-call",
      label: "No model call",
      detail: "The UI does not call models to rank, dispatch, or validate specialist workers.",
      state: "blocked",
    },
  ]
);

const PROVIDER_APPROVAL_REF = createRecord(
  "providerApprovalRef",
  "Provider Approval",
  "providerApprovalRef",
  "Provider Approval Gate remains required before any future external model, connector, provider, or tool route can support a worker.",
  "needs-approval",
  [
    {
      id: "provider-approval",
      label: "Approval gate",
      detail: "Future worker routing must reference explicit operator approval before provider, connector, local runtime, or tool use.",
      state: "needs-approval",
    },
    {
      id: "provider-no-persist",
      label: "No UI persistence",
      detail: "The UI does not persist provider approvals, worker decisions, queues, transactions, evidence, results, or audit.",
      state: "blocked",
    },
    {
      id: "provider-denied",
      label: "Denied provider path",
      detail: "Hidden approval, stale approval, secret-bearing request, unsupported provider, and unapproved connector paths remain denied.",
      state: "denied",
    },
  ]
);

const LOCAL_MODEL_BRIDGE_REF = createRecord(
  "localModelBridgeRef",
  "Local Model Bridge v1",
  "localModelBridgeRef",
  "Local Model Bridge v1 remains a reference only; local/private model routes for workers stay backend-owned and blocked from frontend calls.",
  "backend-owned",
  [
    {
      id: "local-route-visible",
      label: "Visible local route",
      detail: "Future worker routing may choose local/private model classes only through backend-owned Local Model Bridge review.",
      state: "review-only",
    },
    {
      id: "local-no-call",
      label: "No local model call",
      detail: "The cockpit does not call local models, probe localhost, bind ports, start runtimes, or send prompts.",
      state: "blocked",
    },
    {
      id: "local-approval",
      label: "Approval required",
      detail: "Local model use remains blocked until explicit operator approval and backend-owned runtime control exist.",
      state: "needs-approval",
    },
  ]
);

const CODING_WORKER_PROFILE = createProfile({
  workerId: "coding-worker-profile",
  workerName: "Coding Worker",
  workerDomain: "implementation, refactor, bugfix, tests, diffs, and command expectation review",
  capabilityFit:
    "Fits code implementation plans, refactors, bug investigation, test planning, patch review, and command expectation analysis.",
  defaultModelRoute:
    "Future route may need a coding-capable model through Model Router v2, provider approval, or Local Model Bridge when project context is private.",
  approvalNeeds: "Explicit operator approval is required before any future code write, diff application, command, test, or worker execution.",
  fileScope: "Reviewed project files only, with path boundaries and diff preview owned by the backend.",
  commandScope: "No commands from the UI; future commands require command safety, approval, evidence, result, and audit contracts.",
  evidenceNeeds: "Change intent, affected files, proposed diff, command expectations, validation plan, denial checks, and approval reference.",
  resultNeeds: "Implementation summary, changed-file summary, test expectations, residual risk, and denied action report.",
  auditNeeds: "Goal, context, model route, approval, files, commands, evidence, result, recovery option, and operator timeline.",
  recoveryNeeds: "Rollback note, retry guidance, manual review path, partial-change handling, and safety stop.",
  deniedActions: [
    "Write code from the UI",
    "Apply diffs from the UI",
    "Run commands or tests from the UI",
    "Create commits, queues, transactions, or snapshots from the UI",
  ],
  safetyNotes: [
    "Coding worker profile preview does not write code or run commands from the UI.",
    "Coding worker profile preview requires explicit operator approval.",
  ],
});

const RESEARCH_WORKER_PROFILE = createProfile({
  workerId: "research-worker-profile",
  workerName: "Research Worker",
  workerDomain: "research questions, source needs, citations, freshness, privacy, evidence, result, and audit",
  capabilityFit: "Fits source-gathering plans, claim review, citation requirements, freshness checks, and research handoff planning.",
  defaultModelRoute:
    "Future route may need a research-capable model, web or document connector approval, or local/private route for sensitive research context.",
  approvalNeeds: "Explicit operator approval is required before browsing, connector access, source collection, or model calls.",
  fileScope: "No UI file reads; future source packs must be backend-owned and privacy-reviewed.",
  commandScope: "No browser, crawler, connector, or command execution from the UI.",
  evidenceNeeds: "Question, source criteria, citation needs, freshness threshold, privacy boundary, excluded sources, and approval reference.",
  resultNeeds: "Answer outline, source list, citation map, uncertainty notes, freshness notes, and denied action report.",
  auditNeeds: "Question, source policy, connector route, approval, evidence, result, and operator timeline.",
  recoveryNeeds: "Manual review path for stale, conflicting, paywalled, private, or unavailable sources.",
  deniedActions: [
    "Browse from the UI",
    "Call connectors from the UI",
    "Collect sources without approval",
    "Persist evidence, results, or audit from the UI",
  ],
  safetyNotes: [
    "Research worker profile preview does not browse or call connectors from the UI.",
    "Research worker profile preview requires explicit operator approval.",
  ],
});

const GAME_SERVER_WORKER_PROFILE = createProfile({
  workerId: "game-server-worker-profile",
  workerName: "Game Server Worker",
  workerDomain: "server config, plugins, mods, world rules, validation, evidence, result, audit, and recovery",
  capabilityFit: "Fits game server planning, configuration review, mod/plugin compatibility, world rules, and recovery runbooks.",
  defaultModelRoute:
    "Future route may need a game-domain model, coding model, provider approval, or local model route for private server configuration.",
  approvalNeeds: "Explicit operator approval is required before server starts, port binding, installs, deployments, or file mutation.",
  fileScope: "Reviewed server config and mod/plugin manifests only, with backend-owned write boundaries.",
  commandScope: "No server start, port binding, install, deploy, script, or runtime command from the UI.",
  evidenceNeeds: "Server intent, config plan, plugin/mod list, port policy, world rules, validation plan, and recovery plan.",
  resultNeeds: "Static server plan, compatibility notes, validation expectations, denied runtime paths, and operator handoff.",
  auditNeeds: "Goal, configuration, plugin/mod scope, approval, denied ports, evidence, result, and recovery timeline.",
  recoveryNeeds: "Rollback, restore, stop, retry, failed-start explanation, manual review, and safety stop plan.",
  deniedActions: [
    "Start game servers from the UI",
    "Bind ports from the UI",
    "Install mods or plugins from the UI",
    "Deploy or mutate server files from the UI",
  ],
  safetyNotes: [
    "Game server worker profile preview does not start game servers bind ports install mods or deploy from the UI.",
    "Game server worker profile preview requires explicit operator approval.",
  ],
});

const WEB_APP_WORKER_PROFILE = createProfile({
  workerId: "web-app-worker-profile",
  workerName: "Web App Worker",
  workerDomain: "routes, components, styles, build validation, evidence, result, audit, and recovery",
  capabilityFit: "Fits web app route planning, component changes, style work, build validation planning, and frontend risk review.",
  defaultModelRoute:
    "Future route may need a web-app coding model, local model route for private code, or provider route after approval.",
  approvalNeeds: "Explicit operator approval is required before package installs, server starts, command execution, deployment, or writes.",
  fileScope: "Reviewed app files only, with route, component, style, and config boundaries owned by the backend.",
  commandScope: "No dev server, build, package install, deploy, test, lint, or command execution from the UI.",
  evidenceNeeds: "Route plan, component scope, style scope, build expectations, validation plan, and denied action checklist.",
  resultNeeds: "Web app change summary, validation expectations, accessibility/layout notes, and denied command report.",
  auditNeeds: "Goal, route/component/style scope, model route, approval, evidence, result, and recovery timeline.",
  recoveryNeeds: "Rollback note, manual review path, broken-route fallback, partial-change handling, and safety stop.",
  deniedActions: [
    "Start web servers from the UI",
    "Install packages from the UI",
    "Deploy from the UI",
    "Run commands or mutate files from the UI",
  ],
  safetyNotes: [
    "Web app worker profile preview does not start web servers install packages deploy or run commands from the UI.",
    "Web app worker profile preview requires explicit operator approval.",
  ],
});

const DOCS_WORKER_PROFILE = createProfile({
  workerId: "docs-worker-profile",
  workerName: "Docs Worker",
  workerDomain: "README docs, specs, handoff, changelog, evidence, result, and audit",
  capabilityFit: "Fits documentation plans, README/spec drafting, handoff summaries, changelog review, and operator-facing copy.",
  defaultModelRoute:
    "Future route may need a writing-capable model, local route for private repo context, or provider route after approval.",
  approvalNeeds: "Explicit operator approval is required before docs mutation, publication, connector use, or evidence persistence.",
  fileScope: "Reviewed documentation files only, with backend-owned write and publication controls.",
  commandScope: "No docs publishing, file mutation, command execution, or connector calls from the UI.",
  evidenceNeeds: "Doc target, audience, source context, change summary, citation or reference needs, and approval reference.",
  resultNeeds: "Draft summary, affected docs list, handoff notes, changelog notes, and denied action report.",
  auditNeeds: "Goal, doc scope, source context, approval, evidence, result, and operator timeline.",
  recoveryNeeds: "Rollback note, manual review path, stale-doc warning, and publication hold.",
  deniedActions: [
    "Publish docs from the UI",
    "Mutate files from the UI",
    "Persist audit or evidence from the UI",
    "Call connectors from the UI",
  ],
  safetyNotes: [
    "Docs worker profile preview does not publish docs or mutate files from the UI.",
    "Docs worker profile preview requires explicit operator approval.",
  ],
});

const DATA_WORKER_PROFILE = createProfile({
  workerId: "data-worker-profile",
  workerName: "Data Worker",
  workerDomain: "dataset shape, schema validation, transform plans, evidence, result, audit, privacy, and denied data actions",
  capabilityFit: "Fits dataset shape review, schema planning, transform proposals, privacy review, and data quality handoff.",
  defaultModelRoute:
    "Future route may need a data-capable model, approved database or file connector, or local/private model route for sensitive data.",
  approvalNeeds: "Explicit operator approval is required before database access, connector access, file access, network calls, or transforms.",
  fileScope: "No UI file access; future dataset files must be backend-owned, scoped, redacted, and audited.",
  commandScope: "No database queries, scripts, networks, transforms, crawlers, or connectors from the UI.",
  evidenceNeeds: "Dataset shape, schema, transform intent, privacy classification, validation rules, and denied data paths.",
  resultNeeds: "Static transform plan, schema notes, validation expectations, privacy notes, and denied action report.",
  auditNeeds: "Data source, access scope, privacy class, approval, evidence, result, and operator timeline.",
  recoveryNeeds: "Restore plan, transform rollback note, manual review path, and safety stop.",
  deniedActions: [
    "Access databases from the UI",
    "Access files, connectors, or networks from the UI",
    "Run transforms from the UI",
    "Persist data evidence or results from the UI",
  ],
  safetyNotes: [
    "Data worker profile preview does not access databases connectors files or networks from the UI.",
    "Data worker profile preview requires explicit operator approval.",
  ],
});

const CREATIVE_WORKER_PROFILE = createProfile({
  workerId: "creative-worker-profile",
  workerName: "Creative Worker",
  workerDomain: "concept art, copy, narrative, branding, image/video handoff, evidence, result, audit, and denied creative actions",
  capabilityFit: "Fits creative concepting, brand copy, narrative planning, art direction, image handoff, and video handoff.",
  defaultModelRoute:
    "Future route may need an image, writing, or video model through Model Router v2 with provider or local approval.",
  approvalNeeds: "Explicit operator approval is required before media generation, provider calls, file writes, or asset persistence.",
  fileScope: "Reviewed creative briefs and asset references only, with backend-owned media write boundaries.",
  commandScope: "No media tools, providers, generation, file writes, or command execution from the UI.",
  evidenceNeeds: "Creative brief, style constraints, asset needs, provider/local route needs, safety review, and approval reference.",
  resultNeeds: "Concept summary, asset handoff plan, usage notes, denied generation report, and audit linkage.",
  auditNeeds: "Brief, model/provider route, approval, evidence, result, denied paths, and operator timeline.",
  recoveryNeeds: "Manual review, regenerate-plan hold, asset rejection path, and safety stop.",
  deniedActions: [
    "Generate media from the UI",
    "Call providers from the UI",
    "Write media files from the UI",
    "Persist creative outputs from the UI",
  ],
  safetyNotes: [
    "Creative worker profile preview does not generate media call providers or write files from the UI.",
    "Creative worker profile preview requires explicit operator approval.",
  ],
});

const VIDEO_WORKER_PROFILE = createProfile({
  workerId: "video-worker-profile",
  workerName: "Video Worker",
  workerDomain: "storyboard, script, shot list, asset needs, render plan, evidence, result, audit, and denied video actions",
  capabilityFit: "Fits storyboard planning, scripts, shot lists, asset needs, render planning, and video pipeline handoff.",
  defaultModelRoute:
    "Future route may need a video-capable model, creative provider, local render bridge, or approved tool route.",
  approvalNeeds: "Explicit operator approval is required before rendering, provider calls, tool starts, file writes, or media persistence.",
  fileScope: "Reviewed scripts, storyboard notes, and asset references only; media files remain backend-owned.",
  commandScope: "No render tools, video tools, providers, commands, runtime starts, or file writes from the UI.",
  evidenceNeeds: "Storyboard, script, shot list, asset needs, render plan, provider/local route, and denied render paths.",
  resultNeeds: "Static video plan, asset checklist, render expectations, denied action report, and operator handoff.",
  auditNeeds: "Brief, route, approval, evidence, result, render boundary, and operator timeline.",
  recoveryNeeds: "Render retry plan, rollback note, manual review, failed-render explanation, and safety stop.",
  deniedActions: [
    "Render video from the UI",
    "Call providers from the UI",
    "Start video tools from the UI",
    "Write media files from the UI",
  ],
  safetyNotes: [
    "Video worker profile preview does not render video call providers start tools or write media from the UI.",
    "Video worker profile preview requires explicit operator approval.",
  ],
});

const TRADING_ANALYSIS_WORKER_PROFILE = createProfile({
  workerId: "trading-analysis-worker-profile",
  workerName: "Trading Analysis Worker",
  workerDomain: "market data needs, risk notes, analysis evidence, result, audit, disclaimers, and denied trading actions",
  capabilityFit: "Fits non-advisory market analysis planning, risk notes, data needs, evidence expectations, and audit handoff.",
  defaultModelRoute:
    "Future route may need an analysis-capable model, approved market data connector, or local route for private notes.",
  approvalNeeds: "Explicit operator approval is required before market data connector use, model calls, or any external access.",
  fileScope: "No UI account, brokerage, file, or credential access; future data must be backend-owned and scoped.",
  commandScope: "No broker connector, trade placement, account action, network call, crawler, or command from the UI.",
  evidenceNeeds: "Market data needs, source policy, risk assumptions, non-advice disclaimer, analysis frame, and denied broker paths.",
  resultNeeds: "Analysis outline, risk notes, uncertainty, data gaps, disclaimer, and denied action report.",
  auditNeeds: "Question, data route, approval, evidence, result, disclaimer, denied paths, and operator timeline.",
  recoveryNeeds: "Manual review path for stale data, missing data, high-risk interpretation, and safety stop.",
  deniedActions: [
    "Provide financial advice from the UI",
    "Place trades from the UI",
    "Call broker connectors from the UI",
    "Read account credentials or balances from the UI",
  ],
  safetyNotes: [
    "Trading analysis worker profile preview does not provide financial advice place trades or call broker connectors from the UI.",
    "Trading analysis worker profile preview requires explicit operator approval.",
  ],
});

const QA_VALIDATION_WORKER_PROFILE = createProfile({
  workerId: "qa-validation-worker-profile",
  workerName: "QA Validation Worker",
  workerDomain: "build, smoke, lint, test hygiene, domain validation, evidence, result, audit, and denied validation actions",
  capabilityFit: "Fits validation planning, test selection, smoke/lint/build expectation review, and quality risk reporting.",
  defaultModelRoute:
    "Future route may need a QA-capable model, coding model, or local/private route to inspect validation context after approval.",
  approvalNeeds: "Explicit operator approval is required before tests, builds, smoke scripts, lint, commands, or validation execution.",
  fileScope: "Reviewed validation targets only, with backend-owned test and evidence capture boundaries.",
  commandScope: "No tests, builds, smoke scripts, lint, or commands from the UI.",
  evidenceNeeds: "Validation scope, test matrix, command expectations, domain checks, evidence plan, and denied command paths.",
  resultNeeds: "Expected validation report, pass/fail criteria, skipped scope, residual risk, and denied action report.",
  auditNeeds: "Goal, validation plan, command scope, approval, evidence, result, and operator timeline.",
  recoveryNeeds: "Failure triage, retry plan, rollback note, manual review, and safety stop.",
  deniedActions: [
    "Run tests from the UI",
    "Run builds or smokes from the UI",
    "Run lint or commands from the UI",
    "Persist validation evidence from the UI",
  ],
  safetyNotes: [
    "QA validation worker profile preview does not run tests or commands from the UI.",
    "QA validation worker profile preview requires explicit operator approval.",
  ],
});

const AUDIT_WORKER_PROFILE = createProfile({
  workerId: "audit-worker-profile",
  workerName: "Audit Worker",
  workerDomain: "goal context, compiler proposal, approval queue transaction command evidence result recovery memory denied paths, and operator timeline",
  capabilityFit: "Fits audit continuity planning, denied path review, timeline assembly, and evidence/result/audit contract review.",
  defaultModelRoute:
    "Future route may need a summarization model only after backend-owned audit capture and approval; audit capture itself remains backend-owned.",
  approvalNeeds: "Backend-owned audit capture is required; explicit operator approval is required before any future audit worker execution.",
  fileScope: "No UI audit file writes or log persistence; future audit artifacts are backend-owned.",
  commandScope: "No audit persistence, queue mutation, transaction mutation, memory promotion, or command execution from the UI.",
  evidenceNeeds: "Goal, context, compiler, proposal, approval, queue, transaction, command, evidence, result, recovery, memory, and denied paths.",
  resultNeeds: "Audit summary, continuity notes, denied path report, unresolved gaps, and operator timeline.",
  auditNeeds: "Backend-owned source of truth with immutable references and operator-visible timeline.",
  recoveryNeeds: "Manual review for missing evidence, failed capture, partial capture, mismatch, and safety stop.",
  deniedActions: [
    "Persist audit logs from the UI",
    "Promote memory from the UI",
    "Create queues or transactions from the UI",
    "Hide denied paths from the UI",
  ],
  safetyNotes: [
    "Audit worker profile preview does not persist audit logs from the UI.",
    "Audit worker profile preview requires backend-owned audit capture.",
  ],
});

const RECOVERY_WORKER_PROFILE = createProfile({
  workerId: "recovery-worker-profile",
  workerName: "Recovery Worker",
  workerDomain: "rollback, retry, restore, stop, explain-failure, manual review, safety-stop, partial recovery, evidence, result, audit, and denied recovery actions",
  capabilityFit: "Fits recovery planning, rollback/retry/restore options, failed-run explanation, manual-review routing, and safety-stop handoff.",
  defaultModelRoute:
    "Future route may need a reasoning model or local/private route to explain failure context after approval; execution remains backend-owned.",
  approvalNeeds: "Explicit operator approval is required before rollback, retry, restore, stop, recovery execution, or state mutation.",
  fileScope: "No UI state mutation; future rollback or restore file scope must be backend-owned and audited.",
  commandScope: "No rollback, retry, restore, stop, process control, commands, or recovery execution from the UI.",
  evidenceNeeds: "Failure context, recovery options, impacted files/state, safety-stop reason, manual-review path, and denied recovery paths.",
  resultNeeds: "Recovery recommendation, execution hold state, operator decision options, residual risk, and denied action report.",
  auditNeeds: "Failure, evidence, recovery option, approval, result, denied paths, and operator timeline.",
  recoveryNeeds: "Rollback, retry, restore, stop, explain failure, manual review, safety stop, and partial recovery plan.",
  deniedActions: [
    "Execute rollback from the UI",
    "Execute retry or restore from the UI",
    "Stop runtimes or processes from the UI",
    "Mutate recovery state from the UI",
  ],
  safetyNotes: [
    "Recovery worker profile preview does not execute rollback retry restore or recovery from the UI.",
    "Recovery worker profile preview requires explicit operator approval.",
  ],
});

const WORKER_PROFILES = [
  CODING_WORKER_PROFILE,
  RESEARCH_WORKER_PROFILE,
  GAME_SERVER_WORKER_PROFILE,
  WEB_APP_WORKER_PROFILE,
  DOCS_WORKER_PROFILE,
  DATA_WORKER_PROFILE,
  CREATIVE_WORKER_PROFILE,
  VIDEO_WORKER_PROFILE,
  TRADING_ANALYSIS_WORKER_PROFILE,
  QA_VALIDATION_WORKER_PROFILE,
  AUDIT_WORKER_PROFILE,
  RECOVERY_WORKER_PROFILE,
] as const;

const PROFILE_LOOKUP: Record<string, SpecialistWorkerProfile> = {
  codingWorkerProfile: CODING_WORKER_PROFILE,
  researchWorkerProfile: RESEARCH_WORKER_PROFILE,
  gameServerWorkerProfile: GAME_SERVER_WORKER_PROFILE,
  webAppWorkerProfile: WEB_APP_WORKER_PROFILE,
  docsWorkerProfile: DOCS_WORKER_PROFILE,
  dataWorkerProfile: DATA_WORKER_PROFILE,
  creativeWorkerProfile: CREATIVE_WORKER_PROFILE,
  videoWorkerProfile: VIDEO_WORKER_PROFILE,
  tradingAnalysisWorkerProfile: TRADING_ANALYSIS_WORKER_PROFILE,
  qaValidationWorkerProfile: QA_VALIDATION_WORKER_PROFILE,
  auditWorkerProfile: AUDIT_WORKER_PROFILE,
  recoveryWorkerProfile: RECOVERY_WORKER_PROFILE,
};

const WORKER_ROUTING_FIT = createRecord(
  "workerRoutingFit",
  "Worker Routing",
  "workerRoutingFit",
  "Worker routing fit preview matches goal domain, task type, capability, privacy, cost, model route, provider approval, local model bridge, evidence, and denied worker paths before dispatch.",
  "review-only",
  [
    {
      id: "fit-goal-domain",
      label: "Goal domain and task type",
      detail: "Future routing checks whether the goal maps to coding, research, game server, web app, docs, data, creative, video, trading analysis, QA validation, audit, or recovery work.",
      state: "review-only",
    },
    {
      id: "fit-model-route",
      label: "Capability and route",
      detail: "Capability fit, privacy, cost, model route, provider approval, and local model bridge needs are visible before approval.",
      state: "review-only",
    },
    {
      id: "fit-no-dispatch",
      label: "No dispatch",
      detail: "The cockpit does not dispatch workers or persist worker routing decisions.",
      state: "blocked",
    },
  ]
);

const DENIED_WORKER_BOUNDARIES = createRecord(
  "deniedWorkerBoundaries",
  "Denied Workers",
  "deniedWorkerBoundaries",
  "Denied specialist worker boundaries block frontend worker execution, hidden routing, model calls, local model calls, provider calls, connector calls, command execution, file mutation, runtime starts, persistence, and recovery execution.",
  "denied",
  [
    {
      id: "denied-execution",
      label: "Execution blocked",
      detail: "Worker dispatch, tool execution, commands, process spawning, runtime starts, port binding, installs, deploys, rollback, retry, and recovery remain blocked.",
      state: "denied",
    },
    {
      id: "denied-models-connectors",
      label: "Model and connector calls blocked",
      detail: "Live models, local models, providers, connectors, prompts, localhost probes, API key reads, secret reads, and credential storage remain blocked.",
      state: "denied",
    },
    {
      id: "denied-persistence",
      label: "Persistence blocked",
      detail: "Worker decisions, approvals, provider approvals, queues, transactions, snapshots, evidence, results, audit, model responses, and memory are not persisted from the UI.",
      state: "blocked",
    },
  ]
);

const COCKPIT_SUMMARY = [
  {
    id: "specialist-worker-registry",
    label: "Specialist Worker Registry",
    detail: "Static cockpit preview of review-only workers for future backend-owned routing.",
    state: "preview-only",
  },
  {
    id: "coding",
    label: "Coding",
    detail: "Implementation, refactor, bugfix, tests, diffs, command expectations, evidence, result, and audit.",
    state: "review-only",
  },
  {
    id: "research",
    label: "Research",
    detail: "Research questions, source needs, citations, freshness, privacy boundaries, evidence, result, and audit.",
    state: "review-only",
  },
  {
    id: "game-server",
    label: "Game Server",
    detail: "Server config, plugins, mods, world rules, validation, evidence, result, audit, and recovery.",
    state: "review-only",
  },
  {
    id: "web-app",
    label: "Web App",
    detail: "Routes, components, styles, build validation planning, evidence, result, audit, and recovery.",
    state: "review-only",
  },
  {
    id: "docs",
    label: "Docs",
    detail: "README docs, specs, handoff, changelog, evidence, result, audit, and denied docs actions.",
    state: "review-only",
  },
  {
    id: "data",
    label: "Data",
    detail: "Dataset shape, schema validation, transforms, privacy, evidence, result, audit, and denied data actions.",
    state: "review-only",
  },
  {
    id: "creative",
    label: "Creative",
    detail: "Concept art, copy, narrative, branding, image/video handoff, evidence, result, audit, and denied creative actions.",
    state: "review-only",
  },
  {
    id: "video",
    label: "Video",
    detail: "Storyboard, script, shot list, asset needs, render plan, evidence, result, audit, and denied video actions.",
    state: "review-only",
  },
  {
    id: "trading-analysis",
    label: "Trading Analysis",
    detail: "Market data needs, risk notes, non-advisory analysis, evidence, result, audit, disclaimers, and denied trading actions.",
    state: "review-only",
  },
  {
    id: "qa-validation",
    label: "QA Validation",
    detail: "Build, smoke, lint, test hygiene, domain validation, evidence, result, audit, and denied validation actions.",
    state: "review-only",
  },
  {
    id: "audit",
    label: "Audit",
    detail: "Goal, context, compiler, proposal, approval, queue, transaction, command, evidence, result, recovery, memory, denied paths, and operator timeline.",
    state: "backend-owned",
  },
  {
    id: "recovery",
    label: "Recovery",
    detail: "Rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, partial recovery, evidence, result, and audit.",
    state: "needs-approval",
  },
  {
    id: "worker-routing",
    label: "Worker Routing",
    detail: "Future backend-owned routing selects a worker only after goal, capability, privacy, route, approval, evidence, and denied paths are reviewed.",
    state: "backend-owned",
  },
  {
    id: "capability-fit",
    label: "Capability Fit",
    detail: "Model/tool fit remains explicit so worker, provider, local model, evidence, result, audit, and recovery needs are not hidden.",
    state: "review-only",
  },
  {
    id: "denied-workers",
    label: "Denied Workers",
    detail: "Denied worker actions stay visible and blocked from the cockpit.",
    state: "denied",
  },
] as const;

export const SPECIALIST_WORKER_REGISTRY_MODEL: SpecialistWorkerRegistryModel = {
  specialistWorkerRegistryId: "specialist-worker-registry-v1",
  specialistWorkerRegistryKind: "specialist-worker-registry-preview",
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  localModelBridgeRef: LOCAL_MODEL_BRIDGE_REF,
  workerProfiles: WORKER_PROFILES,
  codingWorkerProfile: CODING_WORKER_PROFILE,
  researchWorkerProfile: RESEARCH_WORKER_PROFILE,
  gameServerWorkerProfile: GAME_SERVER_WORKER_PROFILE,
  webAppWorkerProfile: WEB_APP_WORKER_PROFILE,
  docsWorkerProfile: DOCS_WORKER_PROFILE,
  dataWorkerProfile: DATA_WORKER_PROFILE,
  creativeWorkerProfile: CREATIVE_WORKER_PROFILE,
  videoWorkerProfile: VIDEO_WORKER_PROFILE,
  tradingAnalysisWorkerProfile: TRADING_ANALYSIS_WORKER_PROFILE,
  qaValidationWorkerProfile: QA_VALIDATION_WORKER_PROFILE,
  auditWorkerProfile: AUDIT_WORKER_PROFILE,
  recoveryWorkerProfile: RECOVERY_WORKER_PROFILE,
  workerRoutingFit: WORKER_ROUTING_FIT,
  deniedWorkerBoundaries: DENIED_WORKER_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const RECORD_LOOKUP: Record<string, SpecialistWorkerRegistryRecord> = {
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  localModelBridgeRef: LOCAL_MODEL_BRIDGE_REF,
  workerRoutingFit: WORKER_ROUTING_FIT,
  deniedWorkerBoundaries: DENIED_WORKER_BOUNDARIES,
};

const ALL_PROFILE_IDS = [
  "codingWorkerProfile",
  "researchWorkerProfile",
  "gameServerWorkerProfile",
  "webAppWorkerProfile",
  "docsWorkerProfile",
  "dataWorkerProfile",
  "creativeWorkerProfile",
  "videoWorkerProfile",
  "tradingAnalysisWorkerProfile",
  "qaValidationWorkerProfile",
  "auditWorkerProfile",
  "recoveryWorkerProfile",
] as const;

const ALL_RECORD_IDS = [
  "goalRef",
  "projectContextRef",
  "modelRouterRef",
  "providerApprovalRef",
  "localModelBridgeRef",
  "workerRoutingFit",
  "deniedWorkerBoundaries",
] as const;

const ROUTES: readonly SpecialistWorkerRegistryRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Specialist Worker Registry",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit specialist worker summary keeps the normal user surface focused on review-only worker routing.",
    markerPhrases: SPECIALIST_WORKER_REGISTRY_COCKPIT_MARKERS,
    profileIds: ALL_PROFILE_IDS,
    recordIds: ALL_RECORD_IDS,
    devOnly: false,
  },
  {
    slug: "specialist-worker-registry-boundary",
    href: "/specialist-worker-registry-boundary",
    phase: "Phase 1578",
    title: "Specialist Worker Registry Boundary",
    commandLabel: "Go to Specialist Worker Registry Boundary",
    summary: "Defines the preview-only boundary for future backend-owned specialist worker routing.",
    markerPhrases: [
      "Specialist worker registry boundary",
      "Specialist worker registry boundary does not dispatch workers from the UI",
      "Specialist worker registry requires explicit operator approval before worker execution",
      "Specialist worker registry prepares backend-owned worker routing without hidden dispatch",
      "Denied specialist worker registry paths remain blocked",
      "Specialist worker registry checklist",
    ],
    profileIds: ALL_PROFILE_IDS,
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "coding-worker-profile-preview",
    href: "/coding-worker-profile-preview",
    phase: "Phase 1579",
    title: "Coding Worker Profile Preview",
    commandLabel: "Go to Coding Worker Profile Preview",
    summary: "Previews coding worker fit without writing code or running commands from the UI.",
    markerPhrases: [
      "Coding worker profile preview",
      "Coding worker profile preview does not write code or run commands from the UI",
      "Coding worker profile preview requires explicit operator approval",
      "Coding worker profile preview covers implementation refactor bugfix tests diffs command expectations evidence result audit and denied code actions",
      "Denied coding worker paths remain blocked",
      "Coding worker profile checklist",
    ],
    profileIds: ["codingWorkerProfile"],
    recordIds: ["modelRouterRef", "providerApprovalRef", "localModelBridgeRef", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "research-worker-profile-preview",
    href: "/research-worker-profile-preview",
    phase: "Phase 1580",
    title: "Research Worker Profile Preview",
    commandLabel: "Go to Research Worker Profile Preview",
    summary: "Previews research worker fit without browsing or connector calls from the UI.",
    markerPhrases: [
      "Research worker profile preview",
      "Research worker profile preview does not browse or call connectors from the UI",
      "Research worker profile preview requires explicit operator approval",
      "Research worker profile preview covers research questions source needs citation needs privacy boundaries evidence result audit and denied research actions",
      "Denied research worker paths remain blocked",
      "Research worker profile checklist",
    ],
    profileIds: ["researchWorkerProfile"],
    recordIds: ["goalRef", "providerApprovalRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "game-server-worker-profile-preview",
    href: "/game-server-worker-profile-preview",
    phase: "Phase 1581",
    title: "Game Server Worker Profile Preview",
    commandLabel: "Go to Game Server Worker Profile Preview",
    summary: "Previews game server worker fit without server starts, port binding, installs, mods, or deployment.",
    markerPhrases: [
      "Game server worker profile preview",
      "Game server worker profile preview does not start game servers bind ports install mods or deploy from the UI",
      "Game server worker profile preview requires explicit operator approval",
      "Game server worker profile preview covers server config plugins mods world rules validation evidence result audit recovery and denied runtime actions",
      "Denied game server worker paths remain blocked",
      "Game server worker profile checklist",
    ],
    profileIds: ["gameServerWorkerProfile"],
    recordIds: ["projectContextRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "web-app-worker-profile-preview",
    href: "/web-app-worker-profile-preview",
    phase: "Phase 1582",
    title: "Web App Worker Profile Preview",
    commandLabel: "Go to Web App Worker Profile Preview",
    summary: "Previews web app worker fit without web server starts, installs, deploys, or commands.",
    markerPhrases: [
      "Web app worker profile preview",
      "Web app worker profile preview does not start web servers install packages deploy or run commands from the UI",
      "Web app worker profile preview requires explicit operator approval",
      "Web app worker profile preview covers routes components styles build validation evidence result audit recovery and denied web app actions",
      "Denied web app worker paths remain blocked",
      "Web app worker profile checklist",
    ],
    profileIds: ["webAppWorkerProfile"],
    recordIds: ["projectContextRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "docs-worker-profile-preview",
    href: "/docs-worker-profile-preview",
    phase: "Phase 1583",
    title: "Docs Worker Profile Preview",
    commandLabel: "Go to Docs Worker Profile Preview",
    summary: "Previews docs worker fit without publishing docs or mutating files from the UI.",
    markerPhrases: [
      "Docs worker profile preview",
      "Docs worker profile preview does not publish docs or mutate files from the UI",
      "Docs worker profile preview requires explicit operator approval",
      "Docs worker profile preview covers README docs specs handoff changelog evidence result audit and denied docs actions",
      "Denied docs worker paths remain blocked",
      "Docs worker profile checklist",
    ],
    profileIds: ["docsWorkerProfile"],
    recordIds: ["goalRef", "projectContextRef", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "data-worker-profile-preview",
    href: "/data-worker-profile-preview",
    phase: "Phase 1584",
    title: "Data Worker Profile Preview",
    commandLabel: "Go to Data Worker Profile Preview",
    summary: "Previews data worker fit without database, connector, file, or network access from the UI.",
    markerPhrases: [
      "Data worker profile preview",
      "Data worker profile preview does not access databases connectors files or networks from the UI",
      "Data worker profile preview requires explicit operator approval",
      "Data worker profile preview covers dataset shape schema validation transform evidence result audit privacy and denied data actions",
      "Denied data worker paths remain blocked",
      "Data worker profile checklist",
    ],
    profileIds: ["dataWorkerProfile"],
    recordIds: ["projectContextRef", "providerApprovalRef", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "creative-worker-profile-preview",
    href: "/creative-worker-profile-preview",
    phase: "Phase 1585",
    title: "Creative Worker Profile Preview",
    commandLabel: "Go to Creative Worker Profile Preview",
    summary: "Previews creative worker fit without media generation, provider calls, or file writes from the UI.",
    markerPhrases: [
      "Creative worker profile preview",
      "Creative worker profile preview does not generate media call providers or write files from the UI",
      "Creative worker profile preview requires explicit operator approval",
      "Creative worker profile preview covers concept art copy narrative branding image video handoff evidence result audit and denied creative actions",
      "Denied creative worker paths remain blocked",
      "Creative worker profile checklist",
    ],
    profileIds: ["creativeWorkerProfile"],
    recordIds: ["modelRouterRef", "providerApprovalRef", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-worker-profile-preview",
    href: "/video-worker-profile-preview",
    phase: "Phase 1586",
    title: "Video Worker Profile Preview",
    commandLabel: "Go to Video Worker Profile Preview",
    summary: "Previews video worker fit without rendering, provider calls, tool starts, or media writes.",
    markerPhrases: [
      "Video worker profile preview",
      "Video worker profile preview does not render video call providers start tools or write media from the UI",
      "Video worker profile preview requires explicit operator approval",
      "Video worker profile preview covers storyboard script shot list asset needs render plan evidence result audit and denied video actions",
      "Denied video worker paths remain blocked",
      "Video worker profile checklist",
    ],
    profileIds: ["videoWorkerProfile"],
    recordIds: ["modelRouterRef", "providerApprovalRef", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "trading-analysis-worker-profile-preview",
    href: "/trading-analysis-worker-profile-preview",
    phase: "Phase 1587",
    title: "Trading Analysis Worker Profile Preview",
    commandLabel: "Go to Trading Analysis Worker Profile Preview",
    summary: "Previews trading analysis worker fit without financial advice, trades, or broker connector calls.",
    markerPhrases: [
      "Trading analysis worker profile preview",
      "Trading analysis worker profile preview does not provide financial advice place trades or call broker connectors from the UI",
      "Trading analysis worker profile preview requires explicit operator approval",
      "Trading analysis worker profile preview covers market data needs risk notes analysis evidence result audit disclaimers and denied trading actions",
      "Denied trading analysis worker paths remain blocked",
      "Trading analysis worker profile checklist",
    ],
    profileIds: ["tradingAnalysisWorkerProfile"],
    recordIds: ["providerApprovalRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "qa-validation-worker-profile-preview",
    href: "/qa-validation-worker-profile-preview",
    phase: "Phase 1588",
    title: "QA Validation Worker Profile Preview",
    commandLabel: "Go to QA Validation Worker Profile Preview",
    summary: "Previews QA validation worker fit without tests or commands from the UI.",
    markerPhrases: [
      "QA validation worker profile preview",
      "QA validation worker profile preview does not run tests or commands from the UI",
      "QA validation worker profile preview requires explicit operator approval",
      "QA validation worker profile preview covers build smoke lint test hygiene domain validation evidence result audit and denied validation actions",
      "Denied QA validation worker paths remain blocked",
      "QA validation worker profile checklist",
    ],
    profileIds: ["qaValidationWorkerProfile"],
    recordIds: ["projectContextRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "audit-worker-profile-preview",
    href: "/audit-worker-profile-preview",
    phase: "Phase 1589",
    title: "Audit Worker Profile Preview",
    commandLabel: "Go to Audit Worker Profile Preview",
    summary: "Previews audit worker fit without audit persistence from the UI.",
    markerPhrases: [
      "Audit worker profile preview",
      "Audit worker profile preview does not persist audit logs from the UI",
      "Audit worker profile preview requires backend-owned audit capture",
      "Audit worker profile preview covers goal context compiler proposal approval queue transaction command evidence result recovery memory denied paths and operator timeline",
      "Denied audit worker paths remain blocked",
      "Audit worker profile checklist",
    ],
    profileIds: ["auditWorkerProfile"],
    recordIds: ["goalRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "recovery-worker-profile-preview",
    href: "/recovery-worker-profile-preview",
    phase: "Phase 1590",
    title: "Recovery Worker Profile Preview",
    commandLabel: "Go to Recovery Worker Profile Preview",
    summary: "Previews recovery worker fit without rollback, retry, restore, or recovery execution from the UI.",
    markerPhrases: [
      "Recovery worker profile preview",
      "Recovery worker profile preview does not execute rollback retry restore or recovery from the UI",
      "Recovery worker profile preview requires explicit operator approval",
      "Recovery worker profile preview covers rollback retry restore stop explain-failure manual-review safety-stop partial recovery evidence result audit and denied recovery actions",
      "Denied recovery worker paths remain blocked",
      "Recovery worker profile checklist",
    ],
    profileIds: ["recoveryWorkerProfile"],
    recordIds: ["workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "worker-routing-fit-preview",
    href: "/worker-routing-fit-preview",
    phase: "Phase 1591",
    title: "Worker Routing Fit Preview",
    commandLabel: "Go to Worker Routing Fit Preview",
    summary: "Previews specialist worker routing fit without dispatching workers.",
    markerPhrases: [
      "Worker routing fit preview",
      "Worker routing fit preview does not dispatch workers",
      "Worker routing fit preview requires explicit operator approval",
      "Worker routing fit preview matches goal domain task type capability privacy cost model route provider approval local model bridge evidence and denied worker paths",
      "Denied worker routing fit paths remain blocked",
      "Worker routing fit checklist",
    ],
    profileIds: ALL_PROFILE_IDS,
    recordIds: ["goalRef", "modelRouterRef", "providerApprovalRef", "localModelBridgeRef", "workerRoutingFit", "deniedWorkerBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-specialist-worker-summary",
    href: "/cockpit-specialist-worker-summary",
    phase: "Cockpit diagnostics",
    title: "Cockpit Specialist Worker Summary",
    commandLabel: "Go to Cockpit Specialist Worker Summary",
    summary: "Shows the cockpit-centered specialist worker summary while keeping phase pages dev test diagnostics only.",
    markerPhrases: [
      "Cockpit specialist worker summary",
      "Cockpit specialist worker summary keeps the cockpit as the normal user surface",
      "No worker dispatch from the cockpit",
      "No model calls from the cockpit",
      "No provider calls from the cockpit",
      "No connector calls from the cockpit",
      "No command execution from the cockpit",
      "Backend-owned worker routing remains required",
      "Explicit operator approval remains required",
      "Cockpit specialist worker checklist",
    ],
    profileIds: ALL_PROFILE_IDS,
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "first-specialist-worker-registry-candidate",
    href: "/first-specialist-worker-registry-candidate",
    phase: "Phase 1592",
    title: "First Specialist Worker Registry Candidate",
    commandLabel: "Go to First Specialist Worker Registry Candidate",
    summary: "Combines the first specialist worker registry candidate across all worker profiles and routing fit.",
    markerPhrases: [
      "First specialist worker registry candidate",
      "First specialist worker registry candidate does not dispatch workers from the UI",
      "First specialist worker registry candidate requires explicit operator approval",
      "Candidate combines coding research game server web app docs data creative video trading QA audit recovery worker profiles and routing fit",
      "Denied first specialist worker registry paths remain blocked",
      "First specialist worker registry checklist",
    ],
    profileIds: ALL_PROFILE_IDS,
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-specialist-worker-registry-release-candidate",
    href: "/controlled-specialist-worker-registry-release-candidate",
    phase: "Phase 1593",
    title: "Controlled Specialist Worker Registry Release Candidate",
    commandLabel: "Go to Controlled Specialist Worker Registry Release Candidate",
    summary:
      "Controlled specialist worker registry release candidate prepares CodexForge for backend-owned specialist worker routing without frontend worker execution.",
    markerPhrases: [
      "Controlled specialist worker registry release candidate",
      "Controlled specialist worker registry release candidate does not dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled specialist worker registry release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned specialist worker routing without frontend worker execution",
      "Denied controlled specialist worker registry paths remain blocked",
      "Controlled specialist worker registry release checklist",
    ],
    profileIds: ALL_PROFILE_IDS,
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
];

export function listSpecialistWorkerRegistryRouteDefinitions(): readonly SpecialistWorkerRegistryRouteDefinition[] {
  return ROUTES;
}

export function getSpecialistWorkerRegistryRouteDefinition(
  slug: SpecialistWorkerRegistryRouteSlug
): SpecialistWorkerRegistryRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildSpecialistWorkerRegistryRouteModel(
  slug: SpecialistWorkerRegistryRouteSlug = "codexforge-cockpit"
): SpecialistWorkerRegistryRouteModel {
  const route = getSpecialistWorkerRegistryRouteDefinition(slug);
  const profiles = route.profileIds.map((profileId) => PROFILE_LOOKUP[profileId]).filter(Boolean);
  const records = route.recordIds.map((recordId) => RECORD_LOOKUP[recordId]).filter(Boolean);

  return {
    route,
    specialistWorkerRegistry: SPECIALIST_WORKER_REGISTRY_MODEL,
    profiles,
    records,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: SPECIALIST_WORKER_REGISTRY_COCKPIT_MARKERS,
    summary: summarizeSpecialistWorkerRegistryRoute(route, profiles, records),
  };
}

export function buildSpecialistWorkerRegistryModel(): SpecialistWorkerRegistryRouteModel {
  return buildSpecialistWorkerRegistryRouteModel("codexforge-cockpit");
}

export function summarizeSpecialistWorkerRegistryRoute(
  route: SpecialistWorkerRegistryRouteDefinition,
  profiles: readonly SpecialistWorkerProfile[],
  records: readonly SpecialistWorkerRegistryRecord[]
): string {
  return `${route.title} keeps ${profiles.length} worker profiles and ${records.length} registry records static, deterministic, preview-only, review-only, approval-required, backend-owned, and blocked from frontend worker dispatch, model calls, local model calls, provider calls, connector calls, prompt sending, command execution, runtime starts, file mutation, persistence, and recovery execution.`;
}

export function buildSpecialistWorkerRegistryStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
