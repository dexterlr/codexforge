export type GoalCompilerRouteSlug =
  | "codexforge-cockpit"
  | "goal-compiler-boundary"
  | "raw-goal-intake-packet"
  | "goal-domain-classifier-preview"
  | "task-type-classifier-preview"
  | "target-artifact-preview"
  | "context-requirement-preview"
  | "file-impact-expectation-preview"
  | "command-expectation-preview"
  | "risk-level-preview"
  | "approval-scope-preview"
  | "evidence-requirement-preview"
  | "done-criteria-preview"
  | "goal-recovery-implication-preview"
  | "model-tool-routing-hint-preview"
  | "first-goal-compiler-candidate"
  | "controlled-goal-compiler-release-candidate";

export type GoalCompilerKind =
  | "goal-compiler-v1"
  | "goal-compiler-boundary"
  | "raw-goal-intake-packet"
  | "goal-domain-classifier-preview"
  | "task-type-classifier-preview"
  | "target-artifact-preview"
  | "context-requirement-preview"
  | "file-impact-expectation-preview"
  | "command-expectation-preview"
  | "risk-level-preview"
  | "approval-scope-preview"
  | "evidence-requirement-preview"
  | "done-criteria-preview"
  | "goal-recovery-implication-preview"
  | "model-tool-routing-hint-preview"
  | "goal-compiler-candidate"
  | "goal-compiler-release-candidate";

export type GoalCompilerState = "preview-only" | "inferred" | "expected" | "needs-approval" | "blocked";

export type GoalCompilerItem = {
  id: string;
  label: string;
  detail: string;
  state: GoalCompilerState;
};

export type GoalCompilerSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: GoalCompilerState;
  items: readonly GoalCompilerItem[];
};

export type GoalCompilerModel = {
  goalCompilerId: string;
  goalCompilerKind: GoalCompilerKind;
  rawGoal: string;
  normalizedGoal: string;
  goalDomain: GoalCompilerSection;
  taskType: GoalCompilerSection;
  targetArtifact: GoalCompilerSection;
  contextRequirements: GoalCompilerSection;
  fileImpactExpectations: GoalCompilerSection;
  commandExpectations: GoalCompilerSection;
  riskLevel: GoalCompilerSection;
  approvalScope: GoalCompilerSection;
  evidenceRequirements: GoalCompilerSection;
  doneCriteria: GoalCompilerSection;
  recoveryImplications: GoalCompilerSection;
  modelToolRoutingHints: GoalCompilerSection;
  deniedIntentBoundaries: GoalCompilerSection;
  cockpitSummary: readonly GoalCompilerItem[];
  explicitSafetyLimits: readonly string[];
};

export type GoalCompilerRouteDefinition = {
  slug: GoalCompilerRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type GoalCompilerRouteModel = {
  route: GoalCompilerRouteDefinition;
  goalCompiler: GoalCompilerModel;
  sections: readonly GoalCompilerSection[];
  diagnosticRoutes: readonly GoalCompilerRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const GOAL_COMPILER_COCKPIT_MARKERS = [
  "Goal Compiler v1",
  "Goal",
  "Domain",
  "Task",
  "Target",
  "Context",
  "Files",
  "Commands",
  "Risk",
  "Approval",
  "Evidence",
  "Done",
  "Recovery",
  "Model Tool Hints",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "No goal execution from the cockpit",
  "No automatic memory promotion from the cockpit",
  "Backend-owned goal compilation remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Goal Compiler v1 is preview-only.",
  "It does not call models.",
  "It does not call providers.",
  "It does not call connectors.",
  "It does not execute the goal.",
  "It does not scaffold projects.",
  "It does not write files.",
  "It does not run commands.",
  "It does not persist approvals.",
  "It does not promote memory automatically.",
  "It prepares a future backend/model-assisted goal compilation path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const RAW_GOAL =
  "Create Goal Compiler v1 as a cockpit-centered preview layer that prepares CodexForge to understand and structure operator goals before planning or execution.";

const NORMALIZED_GOAL =
  "Add deterministic, review-only Goal Compiler v1 surfaces that turn an operator goal into a structured intent packet for future backend-owned and model-assisted compilation.";

const GOAL_DOMAIN: GoalCompilerSection = {
  id: "goal-domain",
  label: "Domain",
  title: "Goal domain classifier preview",
  summary:
    "Goal domain classifier preview keeps broad operator domains visible without calling a model or provider.",
  state: "preview-only",
  items: [
    {
      id: "domain-primary",
      label: "Primary domain",
      detail: "Local project and product cockpit work are the strongest deterministic domain signals.",
      state: "inferred",
    },
    {
      id: "domain-broad",
      label: "Broad domains",
      detail: "App, website, dashboard, game server, research, creative, trading, data, docs, integration, and local project domains remain preview candidates.",
      state: "preview-only",
    },
    {
      id: "domain-no-model",
      label: "No classifier call",
      detail: "The classifier preview does not call models, providers, connectors, or backend routing.",
      state: "blocked",
    },
  ],
};

const TASK_TYPE: GoalCompilerSection = {
  id: "task-type",
  label: "Task",
  title: "Task type classifier preview",
  summary:
    "Task type classifier preview labels likely work shape before planning, while execution remains blocked.",
  state: "preview-only",
  items: [
    {
      id: "task-primary",
      label: "Primary task",
      detail: "Build a deterministic preview feature and wire it into existing cockpit diagnostics.",
      state: "inferred",
    },
    {
      id: "task-candidates",
      label: "Task candidates",
      detail: "Build, fix, refactor, generate, research, analyze, configure, test, document, and automate remain visible task type candidates.",
      state: "preview-only",
    },
    {
      id: "task-no-execution",
      label: "No task execution",
      detail: "Task labels do not run tasks, apply changes, run validation, or unlock backend execution.",
      state: "blocked",
    },
  ],
};

const TARGET_ARTIFACT: GoalCompilerSection = {
  id: "target-artifact",
  label: "Target",
  title: "Target artifact preview",
  summary:
    "Target artifact preview identifies expected results without creating artifacts from the frontend.",
  state: "preview-only",
  items: [
    {
      id: "target-intent-packet",
      label: "Intent packet",
      detail: "The expected artifact is a structured intent packet containing goal, domain, task, target, context, files, commands, risk, approval, evidence, done, recovery, and routing hints.",
      state: "expected",
    },
    {
      id: "target-surfaces",
      label: "Expected surfaces",
      detail: "Files, app surfaces, reports, configs, dashboards, game server plans, docs, or creative packs can be named as future target types.",
      state: "preview-only",
    },
    {
      id: "target-no-create",
      label: "No artifact creation",
      detail: "No scaffold, project, file, package, deployment, or generated artifact is created by the preview.",
      state: "blocked",
    },
  ],
};

const CONTEXT_REQUIREMENTS: GoalCompilerSection = {
  id: "context-requirements",
  label: "Context",
  title: "Context requirement preview",
  summary:
    "Context requirement preview lists what a future guarded compiler would need before planning or execution.",
  state: "preview-only",
  items: [
    {
      id: "context-needed",
      label: "Needed context",
      detail: "Workspace, project, stack, files, command candidates, risks, evidence, and confidence needs are expected inputs.",
      state: "expected",
    },
    {
      id: "context-approval",
      label: "Approval boundary",
      detail: "Backend-owned context inspection needs explicit operator approval before real file or project discovery.",
      state: "needs-approval",
    },
    {
      id: "context-no-browse",
      label: "No UI browsing",
      detail: "The preview does not browse arbitrary files, read secrets, display environment values, or crawl local paths from the UI.",
      state: "blocked",
    },
  ],
};

const FILE_IMPACT_EXPECTATIONS: GoalCompilerSection = {
  id: "file-impact-expectations",
  label: "Files",
  title: "File impact expectation preview",
  summary:
    "File impact expectation preview describes likely new, modified, reviewed, blocked, and rollback-relevant files without writing files.",
  state: "preview-only",
  items: [
    {
      id: "file-likely",
      label: "Likely impact",
      detail: "Future compilation may name new, modified, reviewed, blocked, and rollback-relevant files.",
      state: "expected",
    },
    {
      id: "file-review",
      label: "Review only",
      detail: "File expectations are planning hints and do not imply that a patch or file mutation happened.",
      state: "preview-only",
    },
    {
      id: "file-no-write",
      label: "No writes",
      detail: "Direct frontend file mutation, broad apply, scaffold creation, and rollback execution stay blocked.",
      state: "blocked",
    },
  ],
};

const COMMAND_EXPECTATIONS: GoalCompilerSection = {
  id: "command-expectations",
  label: "Commands",
  title: "Command expectation preview",
  summary:
    "Command expectation preview lists likely command candidates without running them.",
  state: "preview-only",
  items: [
    {
      id: "command-candidates",
      label: "Command candidates",
      detail: "Build, smoke, validation, lint, test, and hygiene command candidates can be listed as review-only expectations.",
      state: "expected",
    },
    {
      id: "command-approval",
      label: "Approval needed",
      detail: "Future guarded command execution requires explicit operator approval, command guards, evidence, and result capture.",
      state: "needs-approval",
    },
    {
      id: "command-no-run",
      label: "No command run",
      detail: "The compiler preview does not run shell, git, test, build, smoke, install, deploy, runtime, or process commands.",
      state: "blocked",
    },
  ],
};

const RISK_LEVEL: GoalCompilerSection = {
  id: "risk-level",
  label: "Risk",
  title: "Risk level preview",
  summary:
    "Risk level preview classifies low, medium, high, and blocked risks across execution-sensitive boundaries.",
  state: "preview-only",
  items: [
    {
      id: "risk-classification",
      label: "Risk classes",
      detail: "Low, medium, high, and blocked risk levels can apply across files, commands, models, providers, connectors, runtimes, secrets, installs, deploys, persistence, and recovery.",
      state: "preview-only",
    },
    {
      id: "risk-current",
      label: "Current risk",
      detail: "Current Goal Compiler v1 risk is blocked for real execution and preview-only for classification.",
      state: "blocked",
    },
    {
      id: "risk-no-scan",
      label: "No safety scan",
      detail: "The UI does not execute safety scans or validate the workspace.",
      state: "blocked",
    },
  ],
};

const APPROVAL_SCOPE: GoalCompilerSection = {
  id: "approval-scope",
  label: "Approval",
  title: "Approval scope preview",
  summary:
    "Approval scope preview defines what a future explicit human approval would need to cover.",
  state: "preview-only",
  items: [
    {
      id: "approval-contents",
      label: "Approval contents",
      detail: "Operator identity, scope, expiry, touched files, command candidates, model/tool needs, and denied paths are expected approval topics.",
      state: "expected",
    },
    {
      id: "approval-human",
      label: "Human approval",
      detail: "Explicit human operator approval remains required before real compilation output can feed execution.",
      state: "needs-approval",
    },
    {
      id: "approval-no-persist",
      label: "No persistence",
      detail: "The frontend does not persist approvals, approval decisions, queues, evidence, results, audit, or operator signoff.",
      state: "blocked",
    },
  ],
};

const EVIDENCE_REQUIREMENTS: GoalCompilerSection = {
  id: "evidence-requirements",
  label: "Evidence",
  title: "Evidence requirement preview",
  summary:
    "Evidence requirement preview names the records needed before any future action can be trusted.",
  state: "preview-only",
  items: [
    {
      id: "evidence-categories",
      label: "Evidence categories",
      detail: "Diff, command stdout, stderr, exit code, approval, result, audit, and recovery evidence are expected categories.",
      state: "expected",
    },
    {
      id: "evidence-review",
      label: "Review evidence",
      detail: "Evidence requirements are listed as needed records, not captured or persisted from the UI.",
      state: "preview-only",
    },
    {
      id: "evidence-no-persist",
      label: "No evidence persistence",
      detail: "No evidence, result, audit, queue, approval, or recovery record is persisted from the frontend.",
      state: "blocked",
    },
  ],
};

const DONE_CRITERIA: GoalCompilerSection = {
  id: "done-criteria",
  label: "Done",
  title: "Done criteria preview",
  summary:
    "Done criteria preview defines expected outcomes without claiming execution happened.",
  state: "preview-only",
  items: [
    {
      id: "done-outcomes",
      label: "Outcome states",
      detail: "Success, blocked, denied, failed, manual-review, retryable, recovered, and operator-accepted outcomes are expected.",
      state: "preview-only",
    },
    {
      id: "done-evidence",
      label: "Evidence based",
      detail: "Done can only be claimed after backend-owned evidence exists for the approved action.",
      state: "needs-approval",
    },
    {
      id: "done-no-claim",
      label: "No execution claim",
      detail: "Goal Compiler v1 does not claim the compiled goal was executed, validated, or accepted.",
      state: "blocked",
    },
  ],
};

const RECOVERY_IMPLICATIONS: GoalCompilerSection = {
  id: "recovery-implications",
  label: "Recovery",
  title: "Goal recovery implication preview",
  summary:
    "Goal recovery implication preview explains possible recovery paths without running recovery.",
  state: "preview-only",
  items: [
    {
      id: "recovery-paths",
      label: "Recovery paths",
      detail: "Rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery implications remain visible.",
      state: "preview-only",
    },
    {
      id: "recovery-approval",
      label: "Approval needed",
      detail: "Recovery actions require explicit operator approval and backend-owned evidence before execution.",
      state: "needs-approval",
    },
    {
      id: "recovery-no-run",
      label: "No recovery execution",
      detail: "The frontend does not execute rollback, retry, restore, stop, partial recovery, or recovery automation.",
      state: "blocked",
    },
  ],
};

const MODEL_TOOL_ROUTING_HINTS: GoalCompilerSection = {
  id: "model-tool-routing-hints",
  label: "Model/Tool Hints",
  title: "Model tool routing hint preview",
  summary:
    "Model tool routing hint preview explains possible future routing without calling models, providers, connectors, or tools.",
  state: "preview-only",
  items: [
    {
      id: "routing-hints",
      label: "Routing hints",
      detail: "Cheapest capable, local, private, paid, pro, specialist, and domain-fit routing hints can be shown as review-only labels.",
      state: "preview-only",
    },
    {
      id: "routing-future",
      label: "Future path",
      detail: "Future backend/model-assisted compilation can use these hints after explicit operator approval.",
      state: "needs-approval",
    },
    {
      id: "routing-no-call",
      label: "No calls",
      detail: "No model, provider, connector, local runtime, tool, adapter, browser, or network call happens from this preview.",
      state: "blocked",
    },
  ],
};

const DENIED_INTENT_BOUNDARIES: GoalCompilerSection = {
  id: "denied-intent-boundaries",
  label: "Denied",
  title: "Denied intent boundaries",
  summary:
    "Denied intent boundaries keep the compiler from becoming an executor, scaffold, browser, provider, connector, or persistence surface.",
  state: "blocked",
  items: [
    {
      id: "denied-execution",
      label: "Execution denied",
      detail: "Goal execution, broad backend execution, adapter execution, runtime starts, process spawning, port binding, deploys, installs, scaffolds, and commands stay blocked.",
      state: "blocked",
    },
    {
      id: "denied-mutation",
      label: "Mutation denied",
      detail: "Direct frontend file mutation, approval persistence, queue persistence, evidence/result/audit persistence, and automatic memory promotion stay blocked.",
      state: "blocked",
    },
    {
      id: "denied-external",
      label: "External calls denied",
      detail: "Models, providers, connectors, arbitrary browsing, secret reads, environment value display, and API key storage stay blocked.",
      state: "blocked",
    },
  ],
};

const COCKPIT_SUMMARY: readonly GoalCompilerItem[] = [
  {
    id: "cockpit-goal",
    label: "Goal",
    detail: `Operator goal: ${RAW_GOAL}`,
    state: "preview-only",
  },
  {
    id: "cockpit-domain",
    label: "Domain",
    detail: "CodexForge thinks this belongs to local project and cockpit product work, with broad domain candidates visible.",
    state: "inferred",
  },
  {
    id: "cockpit-task",
    label: "Task",
    detail: "The task appears to be a build/configure/document review feature, not an execution request.",
    state: "inferred",
  },
  {
    id: "cockpit-target",
    label: "Target",
    detail: "Expected result is a structured intent packet plus cockpit and diagnostic preview surfaces.",
    state: "expected",
  },
  {
    id: "cockpit-context",
    label: "Context",
    detail: "Context needs include workspace, project, stack, relevant files, command candidates, risks, evidence, and confidence.",
    state: "expected",
  },
  {
    id: "cockpit-files",
    label: "Files",
    detail: "File impact is a review-only expectation across likely new, modified, reviewed, blocked, and rollback-relevant files.",
    state: "preview-only",
  },
  {
    id: "cockpit-commands",
    label: "Commands",
    detail: "Command expectations cover likely build, smoke, validation, lint, test, and hygiene commands without running them.",
    state: "blocked",
  },
  {
    id: "cockpit-risk",
    label: "Risk",
    detail: "Risk is blocked for real execution and preview-only for classification.",
    state: "blocked",
  },
  {
    id: "cockpit-approval",
    label: "Approval",
    detail: "Approval scope would cover operator identity, scope, expiry, files, commands, model/tool needs, and denied paths.",
    state: "needs-approval",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Evidence needs include diff, stdout, stderr, exit code, approval, result, audit, and recovery records.",
    state: "expected",
  },
  {
    id: "cockpit-done",
    label: "Done",
    detail: "Done criteria include success, blocked, denied, failed, manual-review, retryable, recovered, and operator-accepted states.",
    state: "preview-only",
  },
  {
    id: "cockpit-recovery",
    label: "Recovery",
    detail: "Recovery implications include rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial recovery.",
    state: "preview-only",
  },
  {
    id: "cockpit-routing",
    label: "Model/Tool Hints",
    detail: "Routing hints are visible as review-only cheapest capable, local, private, paid, pro, specialist, and domain-fit labels.",
    state: "preview-only",
  },
];

const GOAL_COMPILER: GoalCompilerModel = {
  goalCompilerId: "codexforge-goal-compiler-v1-1418-1433",
  goalCompilerKind: "goal-compiler-v1",
  rawGoal: RAW_GOAL,
  normalizedGoal: NORMALIZED_GOAL,
  goalDomain: GOAL_DOMAIN,
  taskType: TASK_TYPE,
  targetArtifact: TARGET_ARTIFACT,
  contextRequirements: CONTEXT_REQUIREMENTS,
  fileImpactExpectations: FILE_IMPACT_EXPECTATIONS,
  commandExpectations: COMMAND_EXPECTATIONS,
  riskLevel: RISK_LEVEL,
  approvalScope: APPROVAL_SCOPE,
  evidenceRequirements: EVIDENCE_REQUIREMENTS,
  doneCriteria: DONE_CRITERIA,
  recoveryImplications: RECOVERY_IMPLICATIONS,
  modelToolRoutingHints: MODEL_TOOL_ROUTING_HINTS,
  deniedIntentBoundaries: DENIED_INTENT_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  GOAL_DOMAIN,
  TASK_TYPE,
  TARGET_ARTIFACT,
  CONTEXT_REQUIREMENTS,
  FILE_IMPACT_EXPECTATIONS,
  COMMAND_EXPECTATIONS,
  RISK_LEVEL,
  APPROVAL_SCOPE,
  EVIDENCE_REQUIREMENTS,
  DONE_CRITERIA,
  RECOVERY_IMPLICATIONS,
  MODEL_TOOL_ROUTING_HINTS,
  DENIED_INTENT_BOUNDARIES,
] as const;

const ROUTES: readonly GoalCompilerRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Goal Compiler v1",
    title: "Cockpit goal compiler summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered Goal Compiler v1 summary for normal users.",
    markerPhrases: GOAL_COMPILER_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "goal-compiler-boundary",
    href: "/goal-compiler-boundary",
    phase: "Phase 1418",
    title: "Goal compiler boundary",
    commandLabel: "Go to Goal Compiler Boundary",
    summary: "Goal compiler boundary prepares structured intent without broad execution.",
    markerPhrases: [
      "Goal compiler boundary",
      "Goal compiler boundary does not call models",
      "Goal compiler requires explicit operator approval before execution",
      "Goal compiler prepares structured intent without broad execution",
      "Denied goal compiler paths remain blocked",
      "Goal compiler checklist",
    ],
    sectionIds: ["denied-intent-boundaries", "goal-domain", "task-type"],
    devOnly: true,
  },
  {
    slug: "raw-goal-intake-packet",
    href: "/raw-goal-intake-packet",
    phase: "Phase 1419",
    title: "Raw goal intake packet",
    commandLabel: "Go to Raw Goal Intake Packet",
    summary: "Raw goal intake packet normalizes operator goal text into a review-only packet.",
    markerPhrases: [
      "Raw goal intake packet",
      "Raw goal intake packet does not execute the goal",
      "Raw goal intake packet requires explicit operator approval before execution",
      "Raw goal intake normalizes operator goal text into a review-only packet",
      "Denied raw goal intake paths remain blocked",
      "Raw goal intake checklist",
    ],
    sectionIds: ["goal-domain", "task-type", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "goal-domain-classifier-preview",
    href: "/goal-domain-classifier-preview",
    phase: "Phase 1420",
    title: "Goal domain classifier preview",
    commandLabel: "Go to Goal Domain Classifier Preview",
    summary: "Goal domain classifier preview labels broad domain candidates without model calls.",
    markerPhrases: [
      "Goal domain classifier preview",
      "Goal domain classifier preview does not call models",
      "Goal domain classifier preview requires explicit operator approval before execution",
      "Goal domain classifier previews app website dashboard game server research creative trading data docs integration and local project domains",
      "Denied goal domain classifier paths remain blocked",
      "Goal domain classifier checklist",
    ],
    sectionIds: ["goal-domain", "context-requirements", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "task-type-classifier-preview",
    href: "/task-type-classifier-preview",
    phase: "Phase 1421",
    title: "Task type classifier preview",
    commandLabel: "Go to Task Type Classifier Preview",
    summary: "Task type classifier preview labels likely work shape without task execution.",
    markerPhrases: [
      "Task type classifier preview",
      "Task type classifier preview does not execute tasks",
      "Task type classifier preview requires explicit operator approval before execution",
      "Task type classifier previews build fix refactor generate research analyze configure test document and automate task types",
      "Denied task type classifier paths remain blocked",
      "Task type classifier checklist",
    ],
    sectionIds: ["task-type", "target-artifact", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "target-artifact-preview",
    href: "/target-artifact-preview",
    phase: "Phase 1422",
    title: "Target artifact preview",
    commandLabel: "Go to Target Artifact Preview",
    summary: "Target artifact preview identifies expected artifacts without creating them.",
    markerPhrases: [
      "Target artifact preview",
      "Target artifact preview does not create artifacts",
      "Target artifact preview requires explicit operator approval before execution",
      "Target artifact preview identifies expected files app surfaces reports configs dashboards game server plans docs or creative packs",
      "Denied target artifact paths remain blocked",
      "Target artifact checklist",
    ],
    sectionIds: ["target-artifact", "file-impact-expectations", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "context-requirement-preview",
    href: "/context-requirement-preview",
    phase: "Phase 1423",
    title: "Context requirement preview",
    commandLabel: "Go to Context Requirement Preview",
    summary: "Context requirement preview lists future workspace and confidence needs.",
    markerPhrases: [
      "Context requirement preview",
      "Context requirement preview does not browse arbitrary files from the UI",
      "Context requirement preview requires explicit operator approval",
      "Context requirement preview lists workspace project stack files commands risks evidence and confidence needs",
      "Denied context requirement paths remain blocked",
      "Context requirement checklist",
    ],
    sectionIds: ["context-requirements", "goal-domain", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "file-impact-expectation-preview",
    href: "/file-impact-expectation-preview",
    phase: "Phase 1424",
    title: "File impact expectation preview",
    commandLabel: "Go to File Impact Expectation Preview",
    summary: "File impact expectation preview describes likely file impact without writing files.",
    markerPhrases: [
      "File impact expectation preview",
      "File impact expectation preview does not write files",
      "File impact expectation preview requires explicit operator approval",
      "File impact expectation preview describes likely new modified reviewed blocked and rollback-relevant files",
      "Denied file impact expectation paths remain blocked",
      "File impact expectation checklist",
    ],
    sectionIds: ["file-impact-expectations", "target-artifact", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "command-expectation-preview",
    href: "/command-expectation-preview",
    phase: "Phase 1425",
    title: "Command expectation preview",
    commandLabel: "Go to Command Expectation Preview",
    summary: "Command expectation preview lists likely command candidates without running commands.",
    markerPhrases: [
      "Command expectation preview",
      "Command expectation preview does not run commands",
      "Command expectation preview requires explicit operator approval",
      "Command expectation preview lists likely build smoke validation lint test and hygiene command candidates as review-only expectations",
      "Denied command expectation paths remain blocked",
      "Command expectation checklist",
    ],
    sectionIds: ["command-expectations", "approval-scope", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "risk-level-preview",
    href: "/risk-level-preview",
    phase: "Phase 1426",
    title: "Risk level preview",
    commandLabel: "Go to Risk Level Preview",
    summary: "Risk level preview classifies low, medium, high, and blocked risks.",
    markerPhrases: [
      "Risk level preview",
      "Risk level preview does not execute safety scans from the UI",
      "Risk level preview requires explicit operator approval",
      "Risk level preview classifies low medium high and blocked risks across files commands models providers connectors runtimes secrets installs deploys persistence and recovery",
      "Denied risk level paths remain blocked",
      "Risk level checklist",
    ],
    sectionIds: ["risk-level", "denied-intent-boundaries", "evidence-requirements"],
    devOnly: true,
  },
  {
    slug: "approval-scope-preview",
    href: "/approval-scope-preview",
    phase: "Phase 1427",
    title: "Approval scope preview",
    commandLabel: "Go to Approval Scope Preview",
    summary: "Approval scope preview defines approval topics without persisting approvals.",
    markerPhrases: [
      "Approval scope preview",
      "Approval scope preview does not persist approvals",
      "Approval scope preview requires explicit human approval",
      "Approval scope preview defines operator identity scope expiry touched files command candidates model/tool needs and denied paths",
      "Denied approval scope paths remain blocked",
      "Approval scope checklist",
    ],
    sectionIds: ["approval-scope", "risk-level", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-requirement-preview",
    href: "/evidence-requirement-preview",
    phase: "Phase 1428",
    title: "Evidence requirement preview",
    commandLabel: "Go to Evidence Requirement Preview",
    summary: "Evidence requirement preview lists required records without evidence persistence.",
    markerPhrases: [
      "Evidence requirement preview",
      "Evidence requirement preview does not persist evidence from the UI",
      "Evidence requirement preview requires explicit operator approval",
      "Evidence requirement preview lists required diff command stdout stderr exit code approval result audit and recovery evidence",
      "Denied evidence requirement paths remain blocked",
      "Evidence requirement checklist",
    ],
    sectionIds: ["evidence-requirements", "done-criteria", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "done-criteria-preview",
    href: "/done-criteria-preview",
    phase: "Phase 1429",
    title: "Done criteria preview",
    commandLabel: "Go to Done Criteria Preview",
    summary: "Done criteria preview defines result states without claiming execution happened.",
    markerPhrases: [
      "Done criteria preview",
      "Done criteria preview does not claim execution happened",
      "Done criteria preview requires explicit operator approval before execution",
      "Done criteria preview defines expected success blocked denied failed manual-review retryable recovered and operator-accepted outcomes",
      "Denied done criteria paths remain blocked",
      "Done criteria checklist",
    ],
    sectionIds: ["done-criteria", "evidence-requirements", "recovery-implications"],
    devOnly: true,
  },
  {
    slug: "goal-recovery-implication-preview",
    href: "/goal-recovery-implication-preview",
    phase: "Phase 1430",
    title: "Goal recovery implication preview",
    commandLabel: "Go to Goal Recovery Implication Preview",
    summary: "Goal recovery implication preview explains recovery implications without execution.",
    markerPhrases: [
      "Goal recovery implication preview",
      "Goal recovery implication preview does not execute recovery",
      "Goal recovery implication preview requires explicit operator approval",
      "Goal recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications",
      "Denied goal recovery implication paths remain blocked",
      "Goal recovery implication checklist",
    ],
    sectionIds: ["recovery-implications", "done-criteria", "risk-level"],
    devOnly: true,
  },
  {
    slug: "model-tool-routing-hint-preview",
    href: "/model-tool-routing-hint-preview",
    phase: "Phase 1431",
    title: "Model tool routing hint preview",
    commandLabel: "Go to Model Tool Routing Hint Preview",
    summary: "Model tool routing hint preview explains routing hints without calling models or tools.",
    markerPhrases: [
      "Model tool routing hint preview",
      "Model tool routing hint preview does not call models providers or tools",
      "Model tool routing hint preview requires explicit operator approval",
      "Model tool routing hint preview explains cheapest capable local private paid pro specialist and domain-fit routing hints without executing calls",
      "Denied model tool routing hint paths remain blocked",
      "Model tool routing hint checklist",
    ],
    sectionIds: ["model-tool-routing-hints", "approval-scope", "denied-intent-boundaries"],
    devOnly: true,
  },
  {
    slug: "first-goal-compiler-candidate",
    href: "/first-goal-compiler-candidate",
    phase: "Phase 1432",
    title: "First goal compiler candidate",
    commandLabel: "Go to First Goal Compiler Candidate",
    summary: "First goal compiler candidate combines the structured intent packet.",
    markerPhrases: [
      "First goal compiler candidate",
      "First goal compiler candidate does not execute compiled goals",
      "First goal compiler candidate requires explicit operator approval",
      "Candidate combines raw goal domain task target context files commands risk approval evidence done recovery and routing hints",
      "Denied first goal compiler paths remain blocked",
      "First goal compiler checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-goal-compiler-release-candidate",
    href: "/controlled-goal-compiler-release-candidate",
    phase: "Phase 1433",
    title: "Controlled goal compiler release candidate",
    commandLabel: "Go to Controlled Goal Compiler Release Candidate",
    summary: "Controlled goal compiler release candidate prepares backend-owned and model-assisted goal compilation without broad execution.",
    markerPhrases: [
      "Controlled goal compiler release candidate",
      "Controlled goal compiler release candidate does not call models providers connectors write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend",
      "Controlled goal compiler release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned and model-assisted goal compilation without broad execution",
      "Denied controlled goal compiler paths remain blocked",
      "Controlled goal compiler release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildGoalCompilerStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listGoalCompilerRouteDefinitions(): readonly GoalCompilerRouteDefinition[] {
  return ROUTES;
}

export function getGoalCompilerRouteDefinition(slug: GoalCompilerRouteSlug): GoalCompilerRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildGoalCompilerModel(): GoalCompilerModel {
  return GOAL_COMPILER;
}

export function buildGoalCompilerRouteModel(
  slug: GoalCompilerRouteSlug = "codexforge-cockpit"
): GoalCompilerRouteModel {
  const route = getGoalCompilerRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is GoalCompilerSection => Boolean(section));

  return {
    route,
    goalCompiler: GOAL_COMPILER,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: GOAL_COMPILER_COCKPIT_MARKERS,
    summary: summarizeGoalCompilerRoute(route),
  };
}

export function summarizeGoalCompilerRouteModel(model: GoalCompilerRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.goalCompiler.goalCompilerId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
  ].join(" | ");
}

function summarizeGoalCompilerRoute(route: GoalCompilerRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
